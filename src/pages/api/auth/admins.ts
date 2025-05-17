import type { NextApiRequest, NextApiResponse } from 'next';
import { query } from '@/lib/db';
import { verify } from 'jsonwebtoken';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Verificar se o usuário atual é um admin master
  const token = req.cookies.admin_token;
  if (!token) {
    return res.status(401).json({ error: 'Não autenticado' });
  }

  try {
    // Verificar JWT
    const decoded = verify(token, process.env.JWT_SECRET || 'fallback_secret') as {
      id: number;
      username: string;
    };

    // Verificar se o usuário é um admin master
    const adminCheck = await query('SELECT is_master FROM admin_users WHERE id = $1', [
      decoded.id
    ]);

    if (adminCheck.rows.length === 0 || !adminCheck.rows[0].is_master) {
      return res
        .status(403)
        .json({ error: 'Apenas admin master pode visualizar administradores' });
    }

    // Buscar todos os administradores
    const result = await query(
      'SELECT id, username, is_master, last_login FROM admin_users ORDER BY is_master DESC, username ASC'
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('List admins error:', error);
    res.status(500).json({ error: 'Erro ao listar administradores' });
  }
}
