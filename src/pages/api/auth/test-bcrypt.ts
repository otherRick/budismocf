import type { NextApiRequest, NextApiResponse } from 'next';
import { hash, compare } from 'bcryptjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Criar um hash de teste
    const testPassword = 'senha_teste';
    const hashedPassword = await hash(testPassword, 12);

    // Testar comparação com senha correta
    const correctComparison = await compare(testPassword, hashedPassword);

    // Testar comparação com senha incorreta
    const incorrectComparison = await compare('senha_errada', hashedPassword);

    res.status(200).json({
      success: true,
      message: 'Teste de bcryptjs funcionando',
      hashedPassword,
      correctComparison,
      incorrectComparison
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
      stack: error instanceof Error ? error.stack : undefined
    });
  }
}
