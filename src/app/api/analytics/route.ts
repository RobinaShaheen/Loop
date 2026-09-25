import { NextResponse } from "next/server";

import { analyticsRangeData } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json({ data: analyticsRangeData });
}
