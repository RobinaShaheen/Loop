import { NextResponse } from "next/server";

import { ensureDatabase, getSql } from "@/lib/neon";

export async function GET() {
  await ensureDatabase();
  const sql = getSql();
  const messages = await sql`
    SELECT id, name, email, message, status, created_at AS "createdAt"
    FROM support_messages
    ORDER BY created_at DESC
    LIMIT 20
  `;

  return NextResponse.json({ data: messages });
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const name = String(payload.name ?? "").trim();
    const email = String(payload.email ?? "").trim();
    const message = String(payload.message ?? "").trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Please complete all fields before sending." },
        { status: 400 },
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    await ensureDatabase();
    const sql = getSql();
    const [created] = await sql`
      INSERT INTO support_messages (name, email, message)
      VALUES (${name}, ${email}, ${message})
      RETURNING id, status
    `;

    return NextResponse.json({ data: created, success: true }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Unable to send your support message." },
      { status: 500 },
    );
  }
}