import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET() {
  const [insights, themes, recommendations] = await Promise.all([
    prisma.insight.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.theme.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.recommendation.findMany({ orderBy: { createdAt: "desc" } }),
  ]);

  return NextResponse.json({
    data: {
      insights: insights.map((item) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        confidence: item.confidence,
        category: item.category,
        icon: item.category,
      })),
      themes: themes.map((item) => ({
        id: item.id,
        name: item.name,
        percentage: item.percentage,
        feedbackCount: item.feedbackCount,
      })),
      recommendations: recommendations.map((item) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        priority: item.priority,
        applied: item.applied,
      })),
    },
  });
}
