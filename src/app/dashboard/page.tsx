// import {
//   Activity,
//   ArrowUpRight,
//   MessageSquare,
//   Smile,
//   Users,
// } from "lucide-react";

// import Sidebar from "@/components/Sidebar";
// import Topbar from "@/components/Topbar";

// const stats = [
//   {
//     title: "Total Feedback",
//     value: "2,847",
//     change: "+12.5%",
//     icon: MessageSquare,
//   },
//   {
//     title: "Customers",
//     value: "1,284",
//     change: "+8.2%",
//     icon: Users,
//   },
//   {
//     title: "Positive Sentiment",
//     value: "78.4%",
//     change: "+4.6%",
//     icon: Smile,
//   },
//   {
//     title: "Response Rate",
//     value: "64.8%",
//     change: "+7.1%",
//     icon: Activity,
//   },
// ];

// export default function Dashboard() {
//   return (
//     <div className="min-h-screen bg-slate-950 text-white">
//         <Sidebar />

//         <Topbar />

//         <div className="min-h-screen pt-16 md:ml-64">
//             <main className="p-4 sm:p-6 lg:p-8">
//                 <div className="mx-auto max-w-7xl">
//                 <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
//                     <div>
//                     <p className="text-sm text-slate-500">Overview</p>

//                     <h1 className="mt-1 text-3xl font-bold tracking-tight">
//                         Dashboard
//                     </h1>

//                     <p className="mt-2 text-sm text-slate-400">
//                         Here's what's happening with your customer feedback.
//                     </p>
//                     </div>

//                     <button className="rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-slate-200">
//                     + Add Feedback
//                     </button>
//                 </div>

//                 <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
//                     {stats.map((stat) => {
//                     const Icon = stat.icon;

//                     return (
//                         <div
//                         key={stat.title}
//                         className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
//                         >
//                         <div className="flex items-center justify-between">
//                             <div className="rounded-xl bg-slate-800 p-2.5">
//                             <Icon size={18} />
//                             </div>

//                             <span className="text-xs font-medium text-emerald-400">
//                             {stat.change}
//                             </span>
//                         </div>

//                         <p className="mt-5 text-sm text-slate-500">
//                             {stat.title}
//                         </p>

//                         <p className="mt-1 text-2xl font-bold">
//                             {stat.value}
//                         </p>
//                         </div>
//                     );
//                     })}
//                 </section>

//                 <section className="mt-6 grid gap-6 xl:grid-cols-3">
//                     <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 xl:col-span-2">
//                     <div className="flex items-start justify-between">
//                         <div>
//                         <h2 className="font-semibold">Feedback Overview</h2>

//                         <p className="mt-1 text-sm text-slate-500">
//                             Customer feedback activity over the last 6 months
//                         </p>
//                         </div>

//                         <button className="flex items-center gap-1 text-sm text-slate-400 hover:text-white">
//                         Details
//                         <ArrowUpRight size={15} />
//                         </button>
//                     </div>

//                     <div className="mt-8 flex h-72 items-end gap-4 border-b border-slate-800 px-4 pb-0">
//                         {[42, 58, 48, 72, 64, 86, 78, 94, 70, 82, 90, 96].map(
//                         (height, index) => (
//                             <div
//                             key={index}
//                             className="group flex h-full flex-1 items-end"
//                             >
//                             <div
//                                 className="w-full rounded-t-lg bg-slate-700 transition group-hover:bg-slate-500"
//                                 style={{ height: `${height}%` }}
//                             />
//                             </div>
//                         ),
//                         )}
//                     </div>

//                     <div className="mt-3 flex justify-between px-2 text-xs text-slate-600">
//                         <span>Apr</span>
//                         <span>May</span>
//                         <span>Jun</span>
//                         <span>Jul</span>
//                         <span>Aug</span>
//                         <span>Sep</span>
//                     </div>
//                     </div>

//                     <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
//                     <h2 className="font-semibold">Sentiment</h2>

//                     <p className="mt-1 text-sm text-slate-500">
//                         Overall customer sentiment
//                     </p>

//                     <div className="mt-8 flex justify-center">
//                         <div className="flex h-40 w-40 items-center justify-center rounded-full border-[18px] border-slate-700">
//                         <div className="text-center">
//                             <p className="text-3xl font-bold">78.4%</p>
//                             <p className="mt-1 text-xs text-emerald-400">
//                             Positive
//                             </p>
//                         </div>
//                         </div>
//                     </div>

//                     <div className="mt-8 space-y-4">
//                         <Sentiment
//                         label="Positive"
//                         value="78%"
//                         width="78%"
//                         />

//                         <Sentiment
//                         label="Neutral"
//                         value="14%"
//                         width="14%"
//                         />

//                         <Sentiment
//                         label="Negative"
//                         value="8%"
//                         width="8%"
//                         />
//                     </div>
//                     </div>
//                 </section>
//                 </div>
//             </main>
//         </div>
//     </div>
//   );
// }

// function Sentiment({
//   label,
//   value,
//   width,
// }: {
//   label: string;
//   value: string;
//   width: string;
// }) {
//   return (
//     <div>
//       <div className="mb-2 flex justify-between text-sm">
//         <span className="text-slate-400">{label}</span>
//         <span className="font-medium">{value}</span>
//       </div>

//       <div className="h-2 overflow-hidden rounded-full bg-slate-800">
//         <div
//           className="h-full rounded-full bg-slate-400"
//           style={{ width }}
//         />
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  MessageSquare,
  Smile,
  Users,
} from "lucide-react";

import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

const stats = [
  {
    title: "Total Feedback",
    value: "2,847",
    change: "+12.5%",
    icon: MessageSquare,
    href: "/feedback",
  },
  {
    title: "Customers",
    value: "1,284",
    change: "+8.2%",
    icon: Users,
    href: "/customers",
  },
  {
    title: "Positive Sentiment",
    value: "78.4%",
    change: "+4.6%",
    icon: Smile,
    href: "/insights",
  },
  {
    title: "Response Rate",
    value: "64.8%",
    change: "+7.1%",
    icon: Activity,
    href: "/analytics",
  },
];

const chartData = [
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
];

export default function Dashboard() {
  const [summary, setSummary] = useState({
    stats,
    chartData,
    sentimentBreakdown: [
      { label: "Positive", value: "78%" },
      { label: "Neutral", value: "14%" },
      { label: "Negative", value: "8%" },
    ],
  });

  useEffect(() => {
    let isMounted = true;

    fetch("/api/dashboard")
      .then((response) => response.json())
      .then((result) => {
        if (!isMounted || !result?.data) return;

        setSummary({
          stats: result.data.stats ?? stats,
          chartData: result.data.chartData ?? chartData,
          sentimentBreakdown:
            result.data.sentimentBreakdown ??
            [
              { label: "Positive", value: "78%" },
              { label: "Neutral", value: "14%" },
              { label: "Negative", value: "8%" },
            ],
        });
      })
      .catch(() => {
        if (isMounted) {
          setSummary({
            stats,
            chartData,
            sentimentBreakdown: [
              { label: "Positive", value: "78%" },
              { label: "Neutral", value: "14%" },
              { label: "Negative", value: "8%" },
            ],
          });
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Sidebar />

      <Topbar />

      <div className="min-h-screen pt-16 md:ml-64">
        <main className="p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">

            {/* Header */}
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm text-slate-500">Overview</p>

                <h1 className="mt-1 text-3xl font-bold tracking-tight">
                  Dashboard
                </h1>

                <p className="mt-2 text-sm text-slate-400">
                  Here's what's happening with your customer feedback.
                </p>
              </div>

              <Link
                href="/feedback"
                className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
              >
                + Add Feedback
              </Link>
            </div>

            {/* KPI Cards */}
            <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {summary.stats.map((stat) => {
                const Icon = stat.icon ?? MessageSquare;

                return (
                  <Link
                    key={stat.title}
                    href={stat.href}
                    className="group rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:-translate-y-0.5 hover:border-slate-600 hover:bg-slate-800"
                  >
                    <div className="flex items-center justify-between">
                      <div className="rounded-xl bg-slate-800 p-2.5 transition group-hover:bg-slate-700">
                        <Icon size={18} />
                      </div>

                      <div className="flex items-center gap-1">
                        <span className="text-xs font-medium text-emerald-400">
                          {stat.change}
                        </span>

                        <ArrowUpRight
                          size={14}
                          className="text-slate-600 transition group-hover:text-slate-300"
                        />
                      </div>
                    </div>

                    <p className="mt-5 text-sm text-slate-500">
                      {stat.title}
                    </p>

                    <p className="mt-1 text-2xl font-bold">
                      {stat.value}
                    </p>
                  </Link>
                );
              })}
            </section>

            {/* Main Dashboard Content */}
            <section className="mt-6 grid gap-6 xl:grid-cols-3">

              {/* Feedback Overview */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 xl:col-span-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="font-semibold">Feedback Overview</h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Customer feedback activity over the last 6 months
                    </p>
                  </div>

                  <Link
                    href="/analytics"
                    className="flex items-center gap-1 text-sm text-slate-400 transition hover:text-white"
                  >
                    Details
                    <ArrowUpRight size={15} />
                  </Link>
                </div>

                <div className="mt-8 flex h-72 items-end gap-2 border-b border-slate-800 px-2 sm:gap-4 sm:px-4">
                  {summary.chartData.map((item, index) => (
                    <Link
                      key={index}
                      href="/analytics"
                      className="group flex h-full flex-1 items-end"
                      aria-label={`View analytics for ${item.month || "this period"}`}
                    >
                      <div
                        className="w-full rounded-t-lg bg-slate-700 transition-all duration-200 group-hover:bg-slate-400 group-hover:opacity-100"
                        style={{ height: `${item.height}%` }}
                      />
                    </Link>
                  ))}
                </div>

                <div className="mt-3 flex justify-between px-2 text-xs text-slate-600">
                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun</span>
                  <span>Jul</span>
                  <span>Aug</span>
                  <span>Sep</span>
                </div>

                <div className="mt-6">
                  <Link
                    href="/analytics"
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-slate-500 hover:text-white"
                  >
                    View Full Analytics
                    <ArrowUpRight size={15} />
                  </Link>
                </div>
              </div>

              {/* Sentiment */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="font-semibold">Sentiment</h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Overall customer sentiment
                    </p>
                  </div>

                  <Link
                    href="/insights"
                    className="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-800 hover:text-white"
                    aria-label="View AI insights"
                  >
                    <ArrowUpRight size={17} />
                  </Link>
                </div>

                <Link
                  href="/insights"
                  className="mt-8 flex justify-center"
                >
                  <div className="flex h-40 w-40 items-center justify-center rounded-full border-[18px] border-slate-700 transition hover:border-slate-500">
                    <div className="text-center">
                      <p className="text-3xl font-bold">78.4%</p>

                      <p className="mt-1 text-xs text-emerald-400">
                        Positive
                      </p>
                    </div>
                  </div>
                </Link>

                <div className="mt-8 space-y-4">
                  {summary.sentimentBreakdown.map((item) => (
                    <Sentiment
                      key={item.label}
                      label={item.label}
                      value={item.value}
                      width={item.value.replace("%", "") + "%"}
                      href="/insights"
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* Quick Actions */}
            <section className="mt-6">
              <div className="mb-4">
                <h2 className="font-semibold">Quick Actions</h2>

                <p className="mt-1 text-sm text-slate-500">
                  Quickly access the most commonly used areas.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <Link
                  href="/feedback"
                  className="group rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:border-slate-600 hover:bg-slate-800"
                >
                  <MessageSquare
                    size={20}
                    className="text-slate-400 transition group-hover:text-white"
                  />

                  <p className="mt-4 font-medium">
                    Manage Feedback
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    View and manage customer feedback.
                  </p>

                  <div className="mt-4 flex items-center gap-1 text-sm text-slate-400 group-hover:text-white">
                    Open Feedback
                    <ArrowUpRight size={14} />
                  </div>
                </Link>

                <Link
                  href="/insights"
                  className="group rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:border-slate-600 hover:bg-slate-800"
                >
                  <Smile
                    size={20}
                    className="text-slate-400 transition group-hover:text-white"
                  />

                  <p className="mt-4 font-medium">
                    AI Insights
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Explore sentiment and AI-generated insights.
                  </p>

                  <div className="mt-4 flex items-center gap-1 text-sm text-slate-400 group-hover:text-white">
                    View Insights
                    <ArrowUpRight size={14} />
                  </div>
                </Link>

                <Link
                  href="/reports"
                  className="group rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:border-slate-600 hover:bg-slate-800"
                >
                  <Activity
                    size={20}
                    className="text-slate-400 transition group-hover:text-white"
                  />

                  <p className="mt-4 font-medium">
                    Reports
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    View and manage customer feedback reports.
                  </p>

                  <div className="mt-4 flex items-center gap-1 text-sm text-slate-400 group-hover:text-white">
                    Open Reports
                    <ArrowUpRight size={14} />
                  </div>
                </Link>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

function Sentiment({
  label,
  value,
  width,
  href,
}: {
  label: string;
  value: string;
  width: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group block rounded-lg p-1 transition hover:bg-slate-800/60"
    >
      <div className="mb-2 flex justify-between text-sm">
        <span className="text-slate-400 transition group-hover:text-white">
          {label}
        </span>

        <span className="font-medium">{value}</span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-slate-400 transition group-hover:bg-slate-300"
          style={{ width }}
        />
      </div>
    </Link>
  );
}