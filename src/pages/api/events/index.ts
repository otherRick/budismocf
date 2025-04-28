import { query } from '@/lib/db';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return handleGet(req, res);
    case 'POST':
      return handlePost(req, res);
    case 'PUT':
      return handlePut(req, res);
    case 'DELETE':
      return handleDelete(req, res);
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}

// Modify your handleGet function
async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { page = 1, limit = 5, date, location, type } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    let queryString = 'SELECT * FROM events WHERE 1=1';
    let countString = 'SELECT COUNT(*) FROM events WHERE 1=1';
    const params = [];

    if (date) {
      queryString += ` AND date = $${params.length + 1}`;
      countString += ` AND date = $${params.length + 1}`;
      params.push(date);
    }

    if (location) {
      queryString += ` AND (address->>'city' = $${params.length + 1} OR meeting_link IS NOT NULL)`;
      countString += ` AND (address->>'city' = $${params.length + 1} OR meeting_link IS NOT NULL)`;
      params.push(location);
    }

    if (type === 'online') {
      queryString += ` AND meeting_link IS NOT NULL`;
      countString += ` AND meeting_link IS NOT NULL`;
    } else if (type === 'in-person') {
      queryString += ` AND meeting_link IS NULL`;
      countString += ` AND meeting_link IS NULL`;
    }

    queryString += ` ORDER BY date, hour LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;

    const events = await query(queryString, [...params, limit, offset] as string[]);
    const countResult = await query(countString, params as string[]);
    const total = Number(countResult.rows[0].count);

    res.status(200).json({ events: events.rows, total });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { title, date, hour, meeting_link, description, address } = req.body;

    const result = await query(
      `INSERT INTO events (title, date, hour, meeting_link, description, address)
   VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [title, date, hour, meeting_link, description, JSON.stringify(address)]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}

async function handlePut(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id, title, date, hour, meeting_link, description, address } = req.body;

    const result = await query(
      `UPDATE events SET 
        title = $1, 
        date = $2, 
        hour = $3, 
        meeting_link = $4, 
        description = $5,
        address = $6
       WHERE id = $7 RETURNING *`,
      [title, date, hour, meeting_link, description, address, id]
    );

    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}

async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;
    await query('DELETE FROM events WHERE id = $1', [id] as string[]);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}
