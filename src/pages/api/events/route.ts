import { query } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const result = await query('SELECT * FROM events ORDER BY date, hour');
    return NextResponse.json(result.rows);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { title, date, hour, meeting_link, map_link, description } = await request.json();

    const result = await query(
      `INSERT INTO events (title, date, hour, meeting_link, map_link, description)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [title, date, hour, meeting_link, map_link, description]
    );

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
