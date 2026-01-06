import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Ensure the user_logins table exists
async function ensureTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS user_logins (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);
}

export async function POST(req: NextRequest) {
  await ensureTable();
  const { email } = await req.json();
  if (!email) {
    return NextResponse.json({ error: 'Email required' }, { status: 400 });
  }
  // Try to insert the user, ignore if already exists
  const result = await pool.query(
    'INSERT INTO user_logins (email) VALUES ($1) ON CONFLICT (email) DO NOTHING RETURNING id',
    [email]
  );
  const isNew = (result.rowCount ?? 0) > 0;
  return NextResponse.json({ newUser: isNew });
}
