import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET() {
  const items = await prisma.feedback.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({
    data: items.map((item) => ({
      id: item.id,
      customer: item.customerName,
      email: item.email,
      message: item.message,
      sentiment: item.sentiment,
      category: item.category,
      priority: item.priority,
      date: item.date,
    })),
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

    const created = await prisma.feedback.create({
      data: {
        customerName,
        email,
        message,
        sentiment: validSentiment,
        category,
        priority: validPriority,
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      },
    });

    return NextResponse.json(
      {
        data: {
          id: created.id,
          customer: created.customerName,
          email: created.email,
          message: created.message,
          sentiment: created.sentiment,
          category: created.category,
          priority: created.priority,
          date: created.date,
        },
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
