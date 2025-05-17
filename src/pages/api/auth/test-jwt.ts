import type { NextApiRequest, NextApiResponse } from 'next';
import { sign, verify } from 'jsonwebtoken';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Obter o segredo JWT
    const secret = process.env.JWT_SECRET || 'fallback_secret';

    // Criar um token de teste
    const payload = { id: 123, username: 'test_user' };
    const token = sign(payload, secret, { expiresIn: '1h' });

    // Verificar o token
    const decoded = verify(token, secret);

    res.status(200).json({
      success: true,
      message: 'Teste de JWT funcionando',
      secret:
        secret === 'fallback_secret'
          ? 'Usando fallback (não recomendado)'
          : 'Usando variável de ambiente',
      token,
      decoded
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
      stack: error instanceof Error ? error.stack : undefined
    });
  }
}
