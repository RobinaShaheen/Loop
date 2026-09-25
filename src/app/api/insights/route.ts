import { NextResponse } from "next/server";

import {
  insightItems,
  recommendationItems,
  themeItems,
} from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json({
    data: {
      insights: insightItems.map((item) => ({
        ...item,
        title: item.title,
        description: item.description,
        confidence: item.confidence,
        category: item.category,
        icon: item.category,
      })),
      themes: themeItems,
      recommendations: recommendationItems,
    },
  });
}
