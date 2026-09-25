"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  BarChart3,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  MessageSquare,
  RefreshCw,
  Target,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

type RangeKey = "7d" | "30d" | "90d";

type DetailData = {
  title: string;
  value: string;
  description: string;
};

const rangeData: Record<
  RangeKey,
  {
    label: string;
    trend: { name: string; feedback: number; positive: number }[];
    totalFeedback: string;
    feedbackChange: string;
    customers: string;
    customerChange: string;
    positiveSentiment: string;
    sentimentChange: string;
    responseRate: string;
    responseChange: string;
  }
> = {
  "7d": {
    label: "Last 7 days",
    trend: [
      { name: "Mon", feedback: 86, positive: 68 },
      { name: "Tue", feedback: 112, positive: 88 },
      { name: "Wed", feedback: 96, positive: 74 },
      { name: "Thu", feedback: 128, positive: 101 },
      { name: "Fri", feedback: 116, positive: 91 },
      { name: "Sat", feedback: 92, positive: 72 },
      { name: "Sun", feedback: 104, positive: 82 },
    ],
    totalFeedback: "2,847",
    feedbackChange: "+12.8%",
    customers: "1,284",
    customerChange: "+8.4%",
    positiveSentiment: "78.4%",
    sentimentChange: "+5.2%",
    responseRate: "64.8%",
    responseChange: "+3.7%",
  },
  "30d": {
    label: "Last 30 days",
    trend: [
      { name: "Week 1", feedback: 522, positive: 394 },
      { name: "Week 2", feedback: 618, positive: 482 },
      { name: "Week 3", feedback: 704, positive: 556 },
      { name: "Week 4", feedback: 812, positive: 637 },
    ],
    totalFeedback: "2,847",
    feedbackChange: "+12.8%",
    customers: "1,284",
    customerChange: "+8.4%",
    positiveSentiment: "78.4%",
    sentimentChange: "+5.2%",
    responseRate: "64.8%",
    responseChange: "+3.7%",
  },
  "90d": {
    label: "Last 90 days",
    trend: [
      { name: "Jan", feedback: 820, positive: 612 },
      { name: "Feb", feedback: 940, positive: 708 },
      { name: "Mar", feedback: 1087, positive: 852 },
    ],
    totalFeedback: "2,847",
    feedbackChange: "+12.8%",
    customers: "1,284",
    customerChange: "+8.4%",
    positiveSentiment: "78.4%",
    sentimentChange: "+5.2%",
    responseRate: "64.8%",
    responseChange: "+3.7%",
  },
};

const sentimentData = [
  { name: "Positive", value: 78.4 },
  { name: "Neutral", value: 14.2 },
  { name: "Negative", value: 7.4 },
];

const themeData = [
  { name: "Product Experience", value: 842 },
  { name: "Customer Support", value: 674 },
  { name: "Pricing", value: 521 },
  { name: "User Interface", value: 463 },
  { name: "Performance", value: 347 },
];

const sentimentDetails: Record<string, DetailData> = {
  Positive: {
    title: "Positive Sentiment",
    value: "78.4%",
    description:
      "Most customer feedback is positive. Customers frequently mention product usefulness, reliability, and overall experience.",
  },
  Neutral: {
    title: "Neutral Sentiment",
    value: "14.2%",
    description:
      "Neutral feedback generally contains suggestions, factual comments, or experiences without a strong positive or negative tone.",
  },
  Negative: {
    title: "Negative Sentiment",
    value: "7.4%",
    description:
      "Negative feedback is concentrated around support response times, usability issues, and selected pricing concerns.",
  },
};

export default function AnalyticsPage() {
  const [range, setRange] = useState<RangeKey>("30d");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("Just now");
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedDetail, setSelectedDetail] = useState<DetailData | null>(
    null
  );
  const [analyticsData, setAnalyticsData] = useState(rangeData);

  useEffect(() => {
    let isMounted = true;

    fetch("/api/analytics")
      .then((response) => response.json())
      .then((result) => {
        if (!isMounted || !result?.data) return;
        setAnalyticsData(result.data);
      })
      .catch(() => {
        if (isMounted) {
          setAnalyticsData(rangeData);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const currentData = analyticsData[range];

  const totalTrend = useMemo(() => {
    return currentData.trend.reduce((sum, item) => sum + item.feedback, 0);
  }, [currentData]);

  const handleRefresh = () => {
    if (isRefreshing) return;

    setIsRefreshing(true);
    setSuccessMessage("");

    setTimeout(() => {
      setIsRefreshing(false);
      setLastUpdated("Just now");
      setSuccessMessage("Analytics refreshed successfully.");

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    }, 1200);
  };

  const handleRangeChange = (newRange: RangeKey) => {
    setRange(newRange);
    setSuccessMessage(
      `Analytics updated to ${rangeData[newRange].label.toLowerCase()}.`
    );

    setTimeout(() => {
      setSuccessMessage("");
    }, 2500);
  };

  const openDetail = (detail: DetailData) => {
    setSelectedDetail(detail);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Topbar />

      <div className="min-h-screen pt-16 md:ml-64">
        <main className="p-4 sm:p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
                <BarChart3 size={16} />
                Analytics
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Analytics
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Track feedback trends, sentiment, customers, and key themes.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              {/* Date Range */}
              <div className="relative">
                <CalendarDays
                  size={17}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <select
                  value={range}
                  onChange={(e) =>
                    handleRangeChange(e.target.value as RangeKey)
                  }
                  className="appearance-none rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-10 text-sm font-medium text-gray-700 outline-none transition hover:border-gray-300 focus:border-gray-400"
                >
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 90 days</option>
                </select>
              </div>

              {/* Refresh */}
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
                {isRefreshing ? "Refreshing..." : "Refresh Analytics"}
              </button>
            </div>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="mb-6 flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
              <CheckCircle2 size={17} />
              {successMessage}
            </div>
          )}

          {/* KPI Cards */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <button
              type="button"
              onClick={() =>
                openDetail({
                  title: "Total Feedback",
                  value: currentData.totalFeedback,
                  description:
                    "Total customer feedback currently available in the LOOP workspace.",
                })
              }
              className="group rounded-2xl border border-gray-200 bg-white p-5 text-left transition hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
                  <MessageSquare size={19} className="text-gray-700" />
                </div>

                <span className="text-xs font-medium text-green-600">
                  {currentData.feedbackChange}
                </span>
              </div>

              <p className="text-sm text-gray-500">Total Feedback</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">
                {currentData.totalFeedback}
              </p>

              <p className="mt-2 text-xs text-gray-400">
                Click to view details
              </p>
            </button>

            <button
              type="button"
              onClick={() =>
                openDetail({
                  title: "Customers",
                  value: currentData.customers,
                  description:
                    "Total customers represented across the feedback dataset.",
                })
              }
              className="group rounded-2xl border border-gray-200 bg-white p-5 text-left transition hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
                  <Users size={19} className="text-gray-700" />
                </div>

                <span className="text-xs font-medium text-green-600">
                  {currentData.customerChange}
                </span>
              </div>

              <p className="text-sm text-gray-500">Customers</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">
                {currentData.customers}
              </p>

              <p className="mt-2 text-xs text-gray-400">
                Click to view details
              </p>
            </button>

            <button
              type="button"
              onClick={() =>
                openDetail({
                  title: "Positive Sentiment",
                  value: currentData.positiveSentiment,
                  description:
                    "Percentage of analyzed feedback classified as positive by the current sentiment analysis.",
                })
              }
              className="group rounded-2xl border border-gray-200 bg-white p-5 text-left transition hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
                  <TrendingUp size={19} className="text-gray-700" />
                </div>

                <span className="text-xs font-medium text-green-600">
                  {currentData.sentimentChange}
                </span>
              </div>

              <p className="text-sm text-gray-500">Positive Sentiment</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">
                {currentData.positiveSentiment}
              </p>

              <p className="mt-2 text-xs text-gray-400">
                Click to view details
              </p>
            </button>

            <button
              type="button"
              onClick={() =>
                openDetail({
                  title: "Response Rate",
                  value: currentData.responseRate,
                  description:
                    "Percentage of feedback entries that have received a recorded response.",
                })
              }
              className="group rounded-2xl border border-gray-200 bg-white p-5 text-left transition hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
                  <Target size={19} className="text-gray-700" />
                </div>

                <span className="text-xs font-medium text-green-600">
                  {currentData.responseChange}
                </span>
              </div>

              <p className="text-sm text-gray-500">Response Rate</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">
                {currentData.responseRate}
              </p>

              <p className="mt-2 text-xs text-gray-400">
                Click to view details
              </p>
            </button>
          </div>

          {/* Main Charts */}
          <div className="grid gap-6 xl:grid-cols-3">
            {/* Feedback Trend */}
            <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 xl:col-span-2">
              <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="font-semibold text-gray-900">
                    Feedback Trend
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Feedback volume and positive feedback over{" "}
                    {currentData.label.toLowerCase()}.
                  </p>
                </div>

                <div className="rounded-lg bg-gray-50 px-3 py-1.5 text-xs text-gray-500">
                  {totalTrend.toLocaleString()} shown
                </div>
              </div>

              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={currentData.trend}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#e5e7eb"
                    />

                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: "#6b7280" }}
                    />

                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: "#6b7280" }}
                    />

                    <Tooltip
                      contentStyle={{
                        borderRadius: 12,
                        border: "1px solid #e5e7eb",
                        boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
                      }}
                    />

                    <Line
                      type="monotone"
                      dataKey="feedback"
                      name="Feedback"
                      stroke="#111827"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />

                    <Line
                      type="monotone"
                      dataKey="positive"
                      name="Positive"
                      stroke="#9ca3af"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={{ r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </section>

            {/* Sentiment */}
            <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
              <div className="mb-4">
                <h2 className="font-semibold text-gray-900">
                  Sentiment Distribution
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Overall customer sentiment.
                </p>
              </div>

              <div className="h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sentimentData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={62}
                      outerRadius={88}
                      paddingAngle={3}
                      onClick={(data) => {
                        const name = data.name as string;

                        if (sentimentDetails[name]) {
                          openDetail(sentimentDetails[name]);
                        }
                      }}
                      className="cursor-pointer outline-none"
                    >
                      {sentimentData.map((item) => (
                        <Cell
                          key={item.name}
                          fill={
                            item.name === "Positive"
                              ? "#111827"
                              : item.name === "Neutral"
                              ? "#9ca3af"
                              : "#d1d5db"
                          }
                        />
                      ))}
                    </Pie>

                    <Tooltip
                      formatter={(value) => [`${value}%`, "Sentiment"]}
                      contentStyle={{
                        borderRadius: 12,
                        border: "1px solid #e5e7eb",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-2">
                {sentimentData.map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => openDetail(sentimentDetails[item.name])}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left transition hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${
                          item.name === "Positive"
                            ? "bg-gray-900"
                            : item.name === "Neutral"
                            ? "bg-gray-400"
                            : "bg-gray-300"
                        }`}
                      />

                      <span className="text-sm text-gray-600">
                        {item.name}
                      </span>
                    </div>

                    <span className="text-sm font-semibold text-gray-900">
                      {item.value}%
                    </span>
                  </button>
                ))}
              </div>
            </section>
          </div>

          {/* Themes */}
          <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="font-semibold text-gray-900">
                  Feedback by Theme
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Most frequently detected topics across customer feedback.
                </p>
              </div>

              <Link
                href="/feedback"
                className="inline-flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                View Feedback
                <ChevronRight size={16} />
              </Link>
            </div>

            <div className="h-[330px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={themeData}
                  layout="vertical"
                  margin={{ top: 0, right: 20, left: 20, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    horizontal={false}
                    stroke="#e5e7eb"
                  />

                  <XAxis
                    type="number"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                  />

                  <YAxis
                    type="category"
                    dataKey="name"
                    width={125}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#4b5563" }}
                  />

                  <Tooltip
                    cursor={{ fill: "#f9fafb" }}
                    formatter={(value) => [
                      `${Number(value).toLocaleString()} feedback`,
                      "Count",
                    ]}
                    contentStyle={{
                      borderRadius: 12,
                      border: "1px solid #e5e7eb",
                    }}
                  />

                  <Bar
                    dataKey="value"
                    radius={[0, 8, 8, 0]}
                    barSize={28}
                    onClick={(data) => {
                      const item = themeData.find(
                        (theme) => theme.name === data.name
                      );

                      if (item) {
                        openDetail({
                          title: item.name,
                          value: item.value.toLocaleString(),
                          description: `${item.value.toLocaleString()} feedback entries are currently associated with the ${item.name.toLowerCase()} theme.`,
                        });
                      }
                    }}
                    className="cursor-pointer"
                  >
                    {themeData.map((item) => (
                      <Cell key={item.name} fill="#111827" />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* Summary */}
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
                  <TrendingUp size={19} className="text-gray-700" />
                </div>

                <div>
                  <h2 className="font-semibold text-gray-900">
                    Analytics Summary
                  </h2>
                  <p className="text-xs text-gray-500">
                    Current workspace overview
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2
                    size={18}
                    className="mt-0.5 shrink-0 text-gray-700"
                  />

                  <p className="text-sm leading-6 text-gray-600">
                    Positive sentiment currently represents{" "}
                    <strong className="text-gray-900">78.4%</strong> of
                    analyzed feedback.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <Clock3
                    size={18}
                    className="mt-0.5 shrink-0 text-gray-700"
                  />

                  <p className="text-sm leading-6 text-gray-600">
                    Response rate is currently{" "}
                    <strong className="text-gray-900">64.8%</strong>, leaving
                    room to improve customer follow-up.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <Target
                    size={18}
                    className="mt-0.5 shrink-0 text-gray-700"
                  />

                  <p className="text-sm leading-6 text-gray-600">
                    Product Experience is the most frequently detected theme
                    with <strong className="text-gray-900">842</strong>{" "}
                    feedback entries.
                  </p>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-gray-200 bg-gray-900 p-5 text-white sm:p-6">
              <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                <BarChart3 size={19} />
              </div>

              <h2 className="text-lg font-semibold">
                Continue analyzing your feedback
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-400">
                Use AI Insights to identify patterns and recommendations, or
                open Feedback to review individual customer responses.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/insights"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-gray-900 transition hover:bg-gray-100"
                >
                  AI Insights
                  <ChevronRight size={16} />
                </Link>

                <Link
                  href="/feedback"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-700 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
                >
                  View Feedback
                  <MessageSquare size={16} />
                </Link>
              </div>

              <div className="mt-6 flex items-center gap-2 border-t border-gray-800 pt-4 text-xs text-gray-500">
                <RefreshCw size={13} />
                Last updated: {lastUpdated}
              </div>
            </section>
          </div>
        </main>
      </div>

      {/* Detail Modal */}
      {selectedDetail && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setSelectedDetail(null)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-5 flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">Analytics Detail</p>
                <h2 className="mt-1 text-xl font-bold text-gray-900">
                  {selectedDetail.title}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setSelectedDetail(null)}
                className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                aria-label="Close"
                title="Close"
              >
                <X size={19} />
              </button>
            </div>

            <div className="rounded-xl bg-gray-50 p-5">
              <p className="text-3xl font-bold text-gray-900">
                {selectedDetail.value}
              </p>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                {selectedDetail.description}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setSelectedDetail(null)}
              className="mt-5 w-full rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
