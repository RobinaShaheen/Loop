import { NextResponse } from "next/server";

import { ensureDatabase, getSql } from "@/lib/neon";

type FeedbackRow = {
  id: number;
  customer: string;
  email: string;
  message: string;
  sentiment: "Positive" | "Neutral" | "Negative";
  category: string;
  priority: "High" | "Medium" | "Low";
  date: string;
};

export async function GET() {
  await ensureDatabase();
  const sql = getSql();

  const items = (await sql`
    SELECT
      id,
      customer,
      email,
      message,
      sentiment,
      category,
      priority,
      date
    FROM feedback
    ORDER BY created_at DESC, id DESC
  `) as FeedbackRow[];

  return NextResponse.json({
    data: items,
  });
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    const customerName = String(payload.customer ?? "").trim();
    const email = String(payload.email ?? "").trim();
    const message = String(payload.message ?? "").trim();
    const sentiment = String(payload.sentiment ?? "").trim();
    const category = String(payload.category ?? "").trim();
    const priority = String(payload.priority ?? "").trim();

    if (!customerName || !email || !message || !sentiment || !category || !priority) {
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

    const validSentiment = ["Positive", "Neutral", "Negative"].includes(sentiment)
      ? sentiment
      : "Neutral";

    const validPriority = ["High", "Medium", "Low"].includes(priority)
      ? priority
      : "Medium";

    await ensureDatabase();
    const sql = getSql();

    const [created] = (await sql`
      INSERT INTO feedback (customer, email, message, sentiment, category, priority, date)
      VALUES (
        ${customerName},
        ${email},
        ${message},
        ${validSentiment},
        ${category},
        ${validPriority},
        ${new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      )
      RETURNING id, customer, email, message, sentiment, category, priority, date
    `) as FeedbackRow[];

    return NextResponse.json(
      {
        data: created,
        success: true,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to create feedback." },
      { status: 500 }
    );
  }
}
