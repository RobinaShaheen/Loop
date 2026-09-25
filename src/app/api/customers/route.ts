import { NextResponse } from "next/server";

import { customerRecords } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json({
    data: customerRecords,
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

    const created = {
      id: Math.max(0, ...customerRecords.map((customer) => customer.id)) + 1,
      name,
      email,
      company,
      feedback: 0,
      sentiment: "Neutral" as const,
      score: 0,
      lastFeedback: "No feedback yet",
      status: status === "Inactive" ? ("Inactive" as const) : ("Active" as const),
    };

    customerRecords.unshift(created);

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
