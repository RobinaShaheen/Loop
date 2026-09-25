import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET() {
  const customers = await prisma.customer.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({
    data: customers.map((customer) => ({
      id: customer.id,
      name: customer.name,
      email: customer.email,
      company: customer.company,
      feedback: customer.feedbackCount,
      sentiment: customer.sentiment,
      score: customer.score,
      lastFeedback: customer.lastFeedback ?? "No feedback yet",
      status: customer.status,
    })),
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

    const created = await prisma.customer.create({
      data: {
        name,
        email,
        company,
        status: status === "Active" || status === "Inactive" ? status : "Active",
        sentiment: "Neutral",
      },
    });

    return NextResponse.json(
      {
        data: {
          id: created.id,
          name: created.name,
          email: created.email,
          company: created.company,
          feedback: created.feedbackCount,
          sentiment: created.sentiment,
          score: created.score,
          lastFeedback: created.lastFeedback ?? "No feedback yet",
          status: created.status,
        },
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
