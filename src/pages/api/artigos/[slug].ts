// src/pages/api/artigos/[slug].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from '@neondatabase/serverless';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query;

  if (!slug || typeof slug !== 'string') {
    return res.status(400).json({ error: 'Slug inválido.' });
  }

  if (req.method === 'PUT') {
    const { title, description, content, image_url } = req.body;
    try {
      const result = await pool.query(
        `UPDATE articles 
         SET title = $1, description = $2, content = $3, image_url = $4, updated_at = NOW()
         WHERE slug = $5 RETURNING *`,
        [title, description, content, image_url, slug]
      );
      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar artigo.' });
    }
  } else if (req.method === 'DELETE') {
    try {
      await pool.query('DELETE FROM articles WHERE slug = $1', [slug]);
      res.status(204).end();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao deletar artigo.' });
    }
  } else {
    res.status(405).json({ error: 'Método não permitido' });
  }
}
