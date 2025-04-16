// src/pages/api/events.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { getAllEvents, createEvent } from '@/lib/events';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const events = await getAllEvents();
    return res.status(200).json(events);
  }

  if (req.method === 'POST') {
    const { title, date, time, location, link, description } = req.body;

    if (!title || !date || !time || !location || !link || !description) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    const newEvent = await createEvent({ title, date, time, location, link, description });
    return res.status(201).json(newEvent);
  }

  return res.status(405).json({ message: 'Método não permitido.' });
}
