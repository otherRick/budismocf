import type { NextApiRequest, NextApiResponse } from 'next';
import { query } from '@/lib/db';
import { hash } from 'bcryptjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Verificar chave secreta para permitir apenas você a criar o admin
  const { username, password, secretKey } = req.body;

  if (secretKey !== process.env.ADMIN_REGISTER_SECRET) {
    return res.status(403).json({ error: 'Não autorizado' });
  }

  try {
    // Verificar se já existe algum admin
    const countResult = await query('SELECT COUNT(*) FROM admin_users');

    // Opcional: permitir apenas um admin
    if (parseInt(countResult.rows[0].count) > 0) {
      return res.status(403).json({ error: 'Já existe um administrador registrado' });
    }

    // Hash da senha
    const passwordHash = await hash(password, 12);

    // Inserir usuário
    const result = await query(
      'INSERT INTO admin_users (username, password_hash) VALUES ($1, $2) RETURNING id, username',
      [username, passwordHash]
    );

    res.status(201).json({ success: true, user: result.rows[0] });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Erro ao registrar administrador' });
  }
}
