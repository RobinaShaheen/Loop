"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Brain,
  CheckCircle2,
  ChevronRight,
  Lightbulb,
  MessageSquare,
  RefreshCw,
  Sparkles,
  TrendingUp,
  Users,
  X,
} from "lucide-react";

import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

type Insight = {
  id: number;
  title: string;
  description: string;
  confidence: number;
  category: string;
  icon: typeof TrendingUp;
};

type Theme = {
  id: number;
  name: string;
  percentage: number;
  feedbackCount: number;
};

type Recommendation = {
  id: number;
  title: string;
  description: string;
  priority: "High" | "Medium" | "Low";
  applied: boolean;
};

export default function AIInsightsPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("Just now");
  const [successMessage, setSuccessMessage] = useState("");
  const [insightsData, setInsightsData] = useState<Insight[]>([]);
  const [themesData, setThemesData] = useState<Theme[]>([]);
  const [analyzedFeedback, setAnalyzedFeedback] = useState(0);

  useEffect(() => {
    let isMounted = true;

    fetch("/api/insights")
      .then((response) => response.json())
      .then((result) => {
        if (!isMounted || !result?.data) return;

        setAnalyzedFeedback(Number(result.feedbackCount ?? 0));

        if (Array.isArray(result.data.insights)) {
          setInsightsData(result.data.insights);
        }

        if (Array.isArray(result.data.themes)) {
          setThemesData(result.data.themes);
        }

        if (Array.isArray(result.data.recommendations)) {
          setRecommendations(result.data.recommendations);
        }
      })
      .catch(() => {
        if (isMounted) {
          setInsightsData([]);
          setThemesData([]);
          setRecommendations([]);
          setAnalyzedFeedback(0);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const [selectedInsight, setSelectedInsight] = useState<Insight | null>(
    null
  );

  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);

  const [showRelatedFeedback, setShowRelatedFeedback] = useState(false);

  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  const handleRefresh = () => {
    if (isRefreshing) return;

    setIsRefreshing(true);
    setSuccessMessage("");

    setTimeout(() => {
      setIsRefreshing(false);
      setLastUpdated("A few seconds ago");
      setSuccessMessage("AI analysis refreshed successfully.");

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    }, 1500);
  };

  const handleApplyRecommendation = (id: number) => {
    setRecommendations((current) =>
      current.map((recommendation) =>
        recommendation.id === id
          ? {
              ...recommendation,
              applied: !recommendation.applied,
            }
          : recommendation
      )
    );

    const recommendation = recommendations.find((item) => item.id === id);

    if (recommendation) {
      setSuccessMessage(
        recommendation.applied
          ? "Recommendation marked as pending."
          : "Recommendation marked as applied."
      );

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Topbar />

      <div className="min-h-screen pt-16 md:ml-64">
        <main className="p-4 sm:p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-900 text-white">
                  <Brain size={22} />
                </div>

                <div>
                  <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                    AI Insights
                  </h1>

                  <p className="mt-1 text-sm text-gray-500">
                    Turn customer feedback into actionable insights.
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <RefreshCw
                size={17}
                className={isRefreshing ? "animate-spin" : ""}
              />

              {isRefreshing ? "Analyzing..." : "Refresh Analysis"}
            </button>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="mb-6 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
              <CheckCircle2 size={18} />
              {successMessage}
            </div>
          )}

          {/* AI Status */}
          <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100">
                  <Sparkles size={22} className="text-gray-700" />
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-semibold text-gray-900">
                      AI Analysis Status
                    </h2>

                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                        isRefreshing
                          ? "bg-yellow-50 text-yellow-700"
                          : "bg-green-50 text-green-700"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          isRefreshing ? "bg-yellow-500" : "bg-green-500"
                        }`}
                      />

                      {isRefreshing ? "Processing" : "Active"}
                    </span>
                  </div>

                  <p className="mt-1 text-sm text-gray-500">
                    {isRefreshing
                      ? "Analyzing your latest customer feedback..."
                      : `Last analysis: ${lastUpdated}`}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-500">
                <MessageSquare size={17} />
                <span>{analyzedFeedback.toLocaleString()} feedback items analyzed</span>
              </div>
            </div>
          </div>

          {/* AI Summary */}
          <section className="mb-8">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                AI Summary
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                A quick overview of what your customers are saying.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100">
                  <Brain size={20} className="text-gray-700" />
                </div>

                <div>
                  <p className="text-sm leading-7 text-gray-600">
                    Overall customer sentiment is positive, with customers
                    showing strong satisfaction around the product experience.
                    The analysis also identifies customer support response time
                    and usability as areas that deserve additional attention.
                  </p>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <div className="rounded-xl bg-gray-50 px-4 py-3">
                      <p className="text-xs text-gray-500">
                        Overall Sentiment
                      </p>
                      <p className="mt-1 text-sm font-semibold text-gray-900">
                        Positive
                      </p>
                    </div>

                    <div className="rounded-xl bg-gray-50 px-4 py-3">
                      <p className="text-xs text-gray-500">Confidence</p>
                      <p className="mt-1 text-sm font-semibold text-gray-900">
                        91%
                      </p>
                    </div>

                    <div className="rounded-xl bg-gray-50 px-4 py-3">
                      <p className="text-xs text-gray-500">Key Themes</p>
                      <p className="mt-1 text-sm font-semibold text-gray-900">
                        5 detected
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Key Insights */}
          <section className="mb-8">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Key Insights
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Important patterns detected from customer feedback.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              {insightsData.map((insight) => {
                const Icon = insight.icon;

                return (
                  <button
                    key={insight.id}
                    type="button"
                    onClick={() => setSelectedInsight(insight)}
                    className="group rounded-2xl border border-gray-200 bg-white p-5 text-left shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-gray-300 hover:shadow-md"
                  >
                    <div className="mb-5 flex items-start justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
                        <Icon size={20} className="text-gray-700" />
                      </div>

                      <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
                        {insight.category}
                      </span>
                    </div>

                    <h3 className="font-semibold text-gray-900">
                      {insight.title}
                    </h3>

                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-500">
                      {insight.description}
                    </p>

                    <div className="mt-5 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-400">Confidence</p>

                        <p className="mt-1 text-sm font-semibold text-gray-900">
                          {insight.confidence}%
                        </p>
                      </div>

                      <span className="flex items-center gap-1 text-sm font-medium text-gray-500 transition group-hover:text-gray-900">
                        View
                        <ChevronRight size={16} />
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Detected Themes */}
          <section className="mb-8">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Detected Themes
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Topics appearing most frequently across your feedback.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="space-y-6">
                {themesData.map((theme) => (
                  <button
                    key={theme.id}
                    type="button"
                    onClick={() => setSelectedTheme(theme)}
                    className="group block w-full text-left"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-800">
                          {theme.name}
                        </span>

                        <span className="text-xs text-gray-400">
                          {theme.feedbackCount} feedback
                        </span>
                      </div>

                      <span className="text-sm font-semibold text-gray-900">
                        {theme.percentage}%
                      </span>
                    </div>

                    <div className="h-2.5 overflow-hidden rounded-full bg-gray-100">
                      <div
                        className="h-full rounded-full bg-gray-900 transition-all duration-500 group-hover:bg-gray-700"
                        style={{
                          width: `${theme.percentage}%`,
                        }}
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Recommendations */}
          <section className="mb-8">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                AI Recommendations
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Suggested actions based on the detected patterns.
              </p>
            </div>

            <div className="space-y-4">
              {recommendations.map((recommendation) => (
                <div
                  key={recommendation.id}
                  className={`rounded-2xl border bg-white p-5 shadow-sm transition ${
                    recommendation.applied
                      ? "border-green-200 bg-green-50/40"
                      : "border-gray-200"
                  }`}
                >
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100">
                        <Lightbulb size={20} className="text-gray-700" />
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-semibold text-gray-900">
                            {recommendation.title}
                          </h3>

                          <span
                            className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                              recommendation.priority === "High"
                                ? "bg-red-50 text-red-700"
                                : recommendation.priority === "Medium"
                                  ? "bg-yellow-50 text-yellow-700"
                                  : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {recommendation.priority} Priority
                          </span>
                        </div>

                        <p className="mt-2 text-sm leading-6 text-gray-500">
                          {recommendation.description}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        handleApplyRecommendation(recommendation.id)
                      }
                      className={`shrink-0 rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                        recommendation.applied
                          ? "border border-green-200 bg-white text-green-700 hover:bg-green-50"
                          : "bg-gray-900 text-white hover:bg-gray-800"
                      }`}
                    >
                      {recommendation.applied ? "Applied" : "Apply"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Bottom Action */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100">
                  <MessageSquare size={21} className="text-gray-700" />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">
                    Explore the feedback behind these insights
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Review individual customer responses and their sentiment.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowRelatedFeedback(true)}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                View Related Feedback
                <ChevronRight size={17} />
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Insight Detail Modal */}
      {selectedInsight && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setSelectedInsight(null)}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-white shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-gray-200 p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
                  <selectedInsight.icon
                    size={20}
                    className="text-gray-700"
                  />
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    {selectedInsight.category}
                  </p>

                  <h2 className="font-semibold text-gray-900">
                    Insight Details
                  </h2>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedInsight(null)}
                className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900">
                {selectedInsight.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-gray-600">
                {selectedInsight.description}
              </p>

              <div className="mt-6 rounded-xl bg-gray-50 p-4">
                <p className="text-xs text-gray-500">AI Confidence</p>

                <div className="mt-2 flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">
                    {selectedInsight.confidence}%
                  </span>

                  <span className="text-xs font-medium text-green-700">
                    High confidence
                  </span>
                </div>

                <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="h-full rounded-full bg-gray-900"
                    style={{
                      width: `${selectedInsight.confidence}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end border-t border-gray-200 p-5">
              <button
                type="button"
                onClick={() => setSelectedInsight(null)}
                className="rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Theme Detail Modal */}
      {selectedTheme && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setSelectedTheme(null)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-gray-200 p-5">
              <div>
                <p className="text-xs text-gray-500">Detected Theme</p>

                <h2 className="font-semibold text-gray-900">
                  {selectedTheme.name}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setSelectedTheme(null)}
                className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-xs text-gray-500">Theme Frequency</p>

                  <p className="mt-1 text-2xl font-bold text-gray-900">
                    {selectedTheme.percentage}%
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-xs text-gray-500">Feedback Items</p>

                  <p className="mt-1 text-2xl font-bold text-gray-900">
                    {selectedTheme.feedbackCount}
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-xl border border-gray-200 p-4">
                <div className="flex items-center gap-3">
                  <Users size={18} className="text-gray-500" />

                  <p className="text-sm text-gray-600">
                    This theme was detected across{" "}
                    <span className="font-semibold text-gray-900">
                      {selectedTheme.feedbackCount}
                    </span>{" "}
                    customer feedback items.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-gray-200 p-5">
              <button
                type="button"
                onClick={() => setSelectedTheme(null)}
                className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                Close
              </button>

              <Link
                href="/feedback"
                className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
              >
                View Feedback
                <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Related Feedback Modal */}
      {showRelatedFeedback && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setShowRelatedFeedback(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-gray-200 p-5">
              <div>
                <h2 className="font-semibold text-gray-900">
                  Related Feedback
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  Explore the customer feedback behind the AI analysis.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowRelatedFeedback(false)}
                className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 p-6">
              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-sm text-gray-700">
                  “The product is easy to use and the interface feels much
                  cleaner than before.”
                </p>

                <p className="mt-2 text-xs text-gray-400">
                  Product Experience · Positive
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-sm text-gray-700">
                  “I had to wait longer than expected to receive a response
                  from support.”
                </p>

                <p className="mt-2 text-xs text-gray-400">
                  Customer Support · Negative
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-sm text-gray-700">
                  “The dashboard is simple to understand and easy to navigate.”
                </p>

                <p className="mt-2 text-xs text-gray-400">
                  User Interface · Positive
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-gray-200 p-5 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setShowRelatedFeedback(false)}
                className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                Close
              </button>

              <Link
                href="/feedback"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
              >
                Open Feedback
                <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
