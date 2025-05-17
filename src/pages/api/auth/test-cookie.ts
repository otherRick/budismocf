import type { NextApiRequest, NextApiResponse } from 'next';
import * as Cookie from 'cookie';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Criar um cookie de teste
    res.setHeader(
      'Set-Cookie',
      Cookie.serialize('test_cookie', 'test_value', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60, // 1 hora
        path: '/',
        sameSite: 'strict'
      })
    );

    res.status(200).json({
      success: true,
      message: 'Cookie de teste definido',
      environment: process.env.NODE_ENV || 'development'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
      stack: error instanceof Error ? error.stack : undefined
    });
  }
}
