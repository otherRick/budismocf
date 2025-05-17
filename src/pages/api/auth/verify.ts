import type { NextApiRequest, NextApiResponse } from 'next';
import { verify } from 'jsonwebtoken';
import { query } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Obter token do cookie
    const token = req.cookies.admin_token;

    if (!token) {
      return res.status(401).json({ authenticated: false });
    }

    // Verificar JWT
    const decoded = verify(token, process.env.JWT_SECRET || 'fallback_secret') as {
      id: number;
      username: string;
    };

    // Verificar se o usuário ainda existe no banco
    const result = await query('SELECT id, is_master FROM admin_users WHERE id = $1', [
      decoded.id
    ]);

    if (result.rows.length === 0) {
      return res.status(401).json({ authenticated: false });
    }

    // Usuário autenticado
    return res.status(200).json({
      authenticated: true,
      user: {
        id: decoded.id,
        username: decoded.username,
        isMaster: result.rows[0].is_master
      }
    });
  } catch (error) {
    console.error('Auth verification error:', error);
    return res.status(401).json({ authenticated: false });
  }
}
