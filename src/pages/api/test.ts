import { query } from '@/lib/db';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const result = await query('SELECT NOW() as current_time');
    res.status(200).json({ success: true, time: result.rows[0].current_time });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: (error as Error).message,
      hint: 'Check your DATABASE_URL in Vercel environment variables'
    });
  }
}
