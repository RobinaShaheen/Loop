import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET() {
  const [feedbackCount, customerCount, positiveCount, responseRate] = await Promise.all([
    prisma.feedback.count(),
    prisma.customer.count(),
    prisma.feedback.count({ where: { sentiment: "Positive" } }),
    prisma.feedback.count({ where: { priority: { not: "High" } } }),
  ]);

  const total = feedbackCount || 1;
  const resolvedResponseRate = Math.round((responseRate / total) * 100);

  return NextResponse.json({
    data: {
      stats: [
        { title: "Total Feedback", value: feedbackCount.toLocaleString(), change: "+12.5%" },
        { title: "Customers", value: customerCount.toLocaleString(), change: "+8.2%" },
        { title: "Positive Sentiment", value: `${Math.round((positiveCount / total) * 100) || 0}%`, change: "+4.6%" },
        { title: "Response Rate", value: `${resolvedResponseRate}%`, change: "+7.1%" },
      ],
      chartData: [
        { month: "Apr", height: 42 },
        { month: "May", height: 58 },
        { month: "Jun", height: 48 },
        { month: "Jul", height: 72 },
        { month: "Aug", height: 64 },
        { month: "Sep", height: 86 },
        { month: "", height: 78 },
        { month: "", height: 94 },
        { month: "", height: 70 },
        { month: "", height: 82 },
        { month: "", height: 90 },
        { month: "", height: 96 },
      ],
      sentimentBreakdown: [
        { label: "Positive", value: `${Math.round((positiveCount / total) * 100) || 0}%` },
        { label: "Neutral", value: "14%" },
        { label: "Negative", value: "8%" },
      ],
    },
  });
}
