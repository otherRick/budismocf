// src/pages/api/artigos/index.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from '@neondatabase/serverless';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const result = await pool.query('SELECT * FROM articles ORDER BY created_at DESC');
      res.status(200).json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar artigos.' });
    }
  } else if (req.method === 'POST') {
    const { title, slug, description, content, image_url } = req.body;

    try {
      const result = await pool.query(
        `INSERT INTO articles (title, slug, description, content, image_url)
        VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [title, slug, description, content, image_url]
      );

      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao criar artigo.' });
    }
  } else {
    res.status(405).json({ error: 'Método não permitido' });
  }
}
