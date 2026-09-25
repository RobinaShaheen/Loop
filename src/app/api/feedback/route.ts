import { NextResponse } from "next/server";

import { feedbackItems } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json({
    data: feedbackItems,
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

    const created = {
      id: Math.max(0, ...feedbackItems.map((item) => item.id)) + 1,
      customer: customerName,
      email,
      message,
      sentiment: validSentiment as (typeof feedbackItems)[number]["sentiment"],
      category,
      priority: validPriority as (typeof feedbackItems)[number]["priority"],
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    };

    feedbackItems.unshift(created);

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
