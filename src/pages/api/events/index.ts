import { query } from '@/lib/db';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return handleGet(req, res);
    case 'POST':
      return handlePost(req, res);
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  try {
    const result = await query('SELECT * FROM events ORDER BY date, hour');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { title, date, hour, meeting_link, map_link, description } = req.body;

    const result = await query(
      `INSERT INTO events (title, date, hour, meeting_link, map_link, description)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [title, date, hour, meeting_link, map_link, description]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}
