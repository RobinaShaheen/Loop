import { neon } from "@neondatabase/serverless";

export function getSql() {
  const connectionString =
    process.env.POSTGRES_URL ?? process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error(
      "Missing Neon connection string. Set POSTGRES_URL or DATABASE_URL in Vercel."
    );
  }

  return neon(connectionString);
}

export async function ensureDatabase() {
  const sql = getSql();

  await sql`
    CREATE TABLE IF NOT EXISTS customers (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      company TEXT NOT NULL,
      feedback INTEGER NOT NULL DEFAULT 0,
      sentiment TEXT NOT NULL DEFAULT 'Neutral',
      score INTEGER NOT NULL DEFAULT 0,
      last_feedback TEXT NOT NULL DEFAULT 'No feedback yet',
      status TEXT NOT NULL DEFAULT 'Active',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS feedback (
      id SERIAL PRIMARY KEY,
      customer TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      sentiment TEXT NOT NULL,
      category TEXT NOT NULL,
      priority TEXT NOT NULL,
      date TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS insights (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      confidence INTEGER NOT NULL,
      category TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS themes (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      percentage INTEGER NOT NULL,
      feedback_count INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS recommendations (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      priority TEXT NOT NULL,
      applied BOOLEAN NOT NULL DEFAULT FALSE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS reports (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      type TEXT NOT NULL,
      date_range TEXT NOT NULL,
      created_at TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'Ready',
      description TEXT NOT NULL
    )
  `;
}