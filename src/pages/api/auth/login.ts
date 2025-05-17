import type { NextApiRequest, NextApiResponse } from 'next';
import { query } from '@/lib/db';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
// Importar o cookie de forma diferente
import * as Cookie from 'cookie';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('Login attempt started');
    const { username, password } = req.body;

    // Verificar se as credenciais foram fornecidas
    if (!username || !password) {
      return res.status(400).json({
        error: 'Credenciais incompletas',
        details: 'Username e password são obrigatórios'
      });
    }

    console.log('Login credentials received:', { username, passwordProvided: !!password });

    let result;
    try {
      // Buscar usuário no banco de dados
      console.log('Querying database for user');
      result = await query(
        'SELECT id, username, password_hash FROM admin_users WHERE username = $1',
        [username]
      );
      console.log('Database query completed, rows found:', result.rows.length);
    } catch (dbError) {
      console.error('Database error:', dbError);
      return res.status(500).json({
        error: 'Erro no banco de dados',
        details: dbError instanceof Error ? dbError.message : 'Erro desconhecido'
      });
    }

    const user = result.rows[0];

    // Verificar se o usuário existe
    if (!user) {
      console.log('User not found in database');
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Verificar senha
    console.log('Comparing password');
    const passwordValid = await compare(password, user.password_hash);
    console.log('Password comparison result:', passwordValid);

    if (!passwordValid) {
      console.log('Invalid password');
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Atualizar último login
    console.log('Updating last login timestamp');
    await query('UPDATE admin_users SET last_login = NOW() WHERE id = $1', [user.id]);

    // Gerar JWT
    console.log('Generating JWT token');
    const token = sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '7d' }
    );
    console.log('JWT token generated successfully');

    // Definir cookie
    console.log('Setting cookie');
    res.setHeader(
      'Set-Cookie',
      Cookie.serialize('admin_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // 7 dias
        path: '/',
        sameSite: 'strict'
      })
    );

    // Responder com sucesso
    console.log('Login successful');
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(
      'Login error details:',
      error instanceof Error ? error.message : 'Unknown error',
      error
    );
    // Retornar mais detalhes sobre o erro
    return res.status(500).json({
      error: 'Erro interno do servidor',
      details: error instanceof Error ? error.message : 'Erro desconhecido',
      stack: error instanceof Error ? error.stack : undefined
    });
  }
}
