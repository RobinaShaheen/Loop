import { NextResponse } from "next/server";

import { dashboardSummary } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json({ data: dashboardSummary });
}
