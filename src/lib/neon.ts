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