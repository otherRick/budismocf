import type { NextApiRequest, NextApiResponse } from 'next';
import { query } from '@/lib/db';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import cookie from 'cookie';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { username, password } = req.body;

    // Buscar usuário no banco de dados
    const result = await query(
      'SELECT id, username, password_hash FROM admin_users WHERE username = $1',
      [username]
    );

    const user = result.rows[0];

    // Verificar se o usuário existe
    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Verificar senha
    const passwordValid = await compare(password, user.password_hash);

    if (!passwordValid) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Atualizar último login
    await query('UPDATE admin_users SET last_login = NOW() WHERE id = $1', [user.id]);

    // Gerar JWT
    const token = sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '7d' }
    );

    // Definir cookie
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('admin_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // 7 dias
        path: '/',
        sameSite: 'strict'
      })
    );

    // Responder com sucesso
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}
