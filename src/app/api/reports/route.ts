import { NextResponse } from "next/server";

import { ensureDatabase, getSql } from "@/lib/neon";

type ReportRow = {
  id: number;
  name: string;
  type: string;
  dateRange: string;
  createdAt: string;
  status: "Ready" | "Processing";
  description: string;
};

export async function GET() {
  await ensureDatabase();
  const sql = getSql();
  const reports = (await sql`
    SELECT id, name, type, date_range AS "dateRange", created_at AS "createdAt",
      status, description
    FROM reports
    ORDER BY id DESC
  `) as ReportRow[];

  return NextResponse.json({ data: reports });
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const name = String(payload.name ?? "").trim();
    const type = String(payload.type ?? "Feedback").trim();
    const dateRange = String(payload.dateRange ?? "Last 30 days").trim();

    if (!name) {
      return NextResponse.json({ error: "Report name is required." }, { status: 400 });
    }

    await ensureDatabase();
    const sql = getSql();
    const [report] = (await sql`
      INSERT INTO reports (name, type, date_range, created_at, description)
      VALUES (
        ${name}, ${type}, ${dateRange},
        ${new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })},
        ${`${type} report generated for ${dateRange}.`}
      )
      RETURNING id, name, type, date_range AS "dateRange", created_at AS "createdAt",
        status, description
    `) as ReportRow[];

    return NextResponse.json({ data: report, success: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Unable to create report." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const id = Number(new URL(request.url).searchParams.get("id"));

  if (!Number.isInteger(id)) {
    return NextResponse.json({ error: "A valid report id is required." }, { status: 400 });
  }

  await ensureDatabase();
  const sql = getSql();
  await sql`DELETE FROM reports WHERE id = ${id}`;

  return NextResponse.json({ success: true });
}