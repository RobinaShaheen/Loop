import { NextResponse } from "next/server";

import { ensureDatabase, getSql } from "@/lib/neon";

export async function GET() {
  await ensureDatabase();
  const sql = getSql();
  const insights = (await sql`
    SELECT id, title, description, confidence, category
    FROM insights ORDER BY created_at DESC, id DESC
  `) as Array<Record<string, unknown>>;
  const themes = (await sql`
    SELECT id, name, percentage, feedback_count AS "feedbackCount"
    FROM themes ORDER BY created_at DESC, id DESC
  `) as Array<Record<string, unknown>>;
  const recommendations = (await sql`
    SELECT id, title, description, priority, applied
    FROM recommendations ORDER BY created_at DESC, id DESC
  `) as Array<Record<string, unknown>>;
  const feedbackCount = await sql`
    SELECT COUNT(*)::int AS count FROM feedback
  `;

  return NextResponse.json({
    data: {
      insights: insights.map((item) => ({ ...item, icon: item.category })),
      themes,
      recommendations,
    },
    feedbackCount: Number(feedbackCount[0]?.count ?? 0),
  });
}
