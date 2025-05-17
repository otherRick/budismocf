import type { NextApiRequest, NextApiResponse } from 'next';
import { query } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Testar conexão com o banco
    const result = await query('SELECT NOW() as time');
    res.status(200).json({
      success: true,
      message: 'Conexão com o banco de dados funcionando',
      time: result.rows[0].time
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
      stack: error instanceof Error ? error.stack : undefined
    });
  }
}
