import type { NextApiRequest, NextApiResponse } from 'next';
import * as Cookie from 'cookie';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Limpar o cookie admin_token
    res.setHeader(
      'Set-Cookie',
      Cookie.serialize('admin_token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: new Date(0), // Data no passado para expirar imediatamente
        path: '/',
        sameSite: 'strict'
      })
    );

    res.status(200).json({ success: true, message: 'Logout realizado com sucesso' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ error: 'Erro ao realizar logout' });
  }
}
