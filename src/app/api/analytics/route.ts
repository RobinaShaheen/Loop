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
  const sentimentRows = await sql`
    SELECT sentiment AS name, COUNT(*)::int AS value
    FROM feedback GROUP BY sentiment
  `;
  const themeRows = await sql`
    SELECT category AS name, COUNT(*)::int AS value
    FROM feedback GROUP BY category ORDER BY value DESC
  `;
  const trendRows = await sql`
    SELECT
      TO_CHAR(DATE_TRUNC('day', created_at), 'Mon DD') AS name,
      COUNT(*)::int AS feedback,
      COUNT(*) FILTER (WHERE sentiment = 'Positive')::int AS positive
    FROM feedback
    WHERE created_at >= NOW() - INTERVAL '90 days'
    GROUP BY DATE_TRUNC('day', created_at)
    ORDER BY DATE_TRUNC('day', created_at)
  `;

  const total = Number(feedbackCount[0]?.count ?? 0);
  const customers = Number(customerCount[0]?.count ?? 0);
  const positive = Number(positiveCount[0]?.count ?? 0);
  const response = Number(responseCount[0]?.count ?? 0);
  const percentage = (value: number) => `${total ? Math.round((value / total) * 100) : 0}%`;
  const makeRange = (label: string) => ({
    label,
    trend: trendRows,
    totalFeedback: total.toLocaleString(),
    feedbackChange: "",
    customers: customers.toLocaleString(),
    customerChange: "",
    positiveSentiment: percentage(positive),
    sentimentChange: "",
    responseRate: percentage(response),
    responseChange: "",
  });

  return NextResponse.json({
    data: {
      "7d": makeRange("Last 7 days"),
      "30d": makeRange("Last 30 days"),
      "90d": makeRange("Last 90 days"),
    },
    sentimentData: sentimentRows,
    themeData: themeRows,
  });
}
