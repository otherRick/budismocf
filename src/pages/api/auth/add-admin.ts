import type { NextApiRequest, NextApiResponse } from 'next';
import { query } from '@/lib/db';
import { hash } from 'bcryptjs';
import { verify } from 'jsonwebtoken';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
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
      isMaster?: boolean;
    };

    // Verificar se o usuário é um admin master
    const adminCheck = await query('SELECT is_master FROM admin_users WHERE id = $1', [
      decoded.id
    ]);

    if (adminCheck.rows.length === 0 || !adminCheck.rows[0].is_master) {
      return res.status(403).json({ error: 'Apenas admin master pode adicionar novos admins' });
    }

    // Extrair dados do novo admin
    const { username, password } = req.body;

    // Verificar se o username já existe
    const userCheck = await query('SELECT id FROM admin_users WHERE username = $1', [username]);

    if (userCheck.rows.length > 0) {
      return res.status(400).json({ error: 'Nome de usuário já existe' });
    }

    // Hash da senha
    const passwordHash = await hash(password, 12);

    // Inserir novo admin (não master)
    const result = await query(
      'INSERT INTO admin_users (username, password_hash, is_master) VALUES ($1, $2, false) RETURNING id, username',
      [username, passwordHash]
    );

    res.status(201).json({ success: true, user: result.rows[0] });
  } catch (error) {
    console.error('Add admin error:', error);
    res.status(500).json({ error: 'Erro ao adicionar administrador' });
  }
}
