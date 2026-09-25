import { NextResponse } from "next/server";

import { ensureDatabase, getSql } from "@/lib/neon";

type CustomerRow = {
  id: number;
  name: string;
  email: string;
  company: string;
  feedback: number;
  sentiment: "Positive" | "Neutral" | "Negative";
  score: number;
  lastFeedback: string;
  status: "Active" | "Inactive";
};

export async function GET() {
  await ensureDatabase();
  const sql = getSql();
  const customers = (await sql`
    SELECT id, name, email, company, feedback, sentiment, score,
      last_feedback AS "lastFeedback", status
    FROM customers
    ORDER BY created_at DESC, id DESC
  `) as CustomerRow[];

  return NextResponse.json({
    data: customers,
  });
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    const name = String(payload.name ?? "").trim();
    const email = String(payload.email ?? "").trim();
    const company = String(payload.company ?? "").trim();
    const status = String(payload.status ?? "Active").trim();

    if (!name || !email || !company) {
      return NextResponse.json(
        { error: "Please complete all required fields." },
        { status: 400 }
      );
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    await ensureDatabase();
    const sql = getSql();
    const [created] = (await sql`
      INSERT INTO customers (name, email, company, status)
      VALUES (${name}, ${email}, ${company}, ${status === "Inactive" ? "Inactive" : "Active"})
      RETURNING id, name, email, company, feedback, sentiment, score,
        last_feedback AS "lastFeedback", status
    `) as CustomerRow[];

    return NextResponse.json(
      {
        data: created,
        success: true,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to create customer." },
      { status: 500 }
    );
  }
}
