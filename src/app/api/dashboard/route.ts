import { NextResponse } from "next/server";

import { ensureDatabase, getSql } from "@/lib/neon";

export async function GET() {
  await ensureDatabase();
  const sql = getSql();
  const [feedbackCount, customerCount, positiveCount, responseCount] = await Promise.all([
    sql`SELECT COUNT(*)::int AS count FROM feedback`,
    sql`SELECT COUNT(*)::int AS count FROM customers`,
    sql`SELECT COUNT(*)::int AS count FROM feedback WHERE sentiment = 'Positive'`,
    sql`SELECT COUNT(*)::int AS count FROM feedback WHERE priority <> 'High'`,
  ]);
  const total = Number(feedbackCount[0]?.count ?? 0);
  const customers = Number(customerCount[0]?.count ?? 0);
  const positive = Number(positiveCount[0]?.count ?? 0);
  const response = Number(responseCount[0]?.count ?? 0);
  const percentage = (value: number) => `${total ? Math.round((value / total) * 100) : 0}%`;

  return NextResponse.json({ data: {
    stats: [
      { title: "Total Feedback", value: total.toLocaleString(), change: "" },
      { title: "Customers", value: customers.toLocaleString(), change: "" },
      { title: "Positive Sentiment", value: percentage(positive), change: "" },
      { title: "Response Rate", value: percentage(response), change: "" },
    ],
    chartData: [],
    sentimentBreakdown: [
      { label: "Positive", value: percentage(positive) },
      { label: "Neutral", value: percentage(total - positive) },
      { label: "Negative", value: percentage(0) },
    ],
  } });
}
