"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Plus,
  Filter,
  Eye,
  MessageSquare,
  Smile,
  Meh,
  Frown,
  Star,
  X,
  CheckCircle2,
} from "lucide-react";

import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

type Sentiment = "Positive" | "Neutral" | "Negative";
type Priority = "High" | "Medium" | "Low";

type Feedback = {
  id: number;
  customer: string;
  email: string;
  message: string;
  sentiment: Sentiment;
  category: string;
  priority: Priority;
  date: string;
};

const categories = [
  "Product",
  "Performance",
  "UX",
  "Support",
  "Mobile",
  "Account",
  "Pricing",
  "Other",
];

export default function FeedbackPage() {
  const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);

  useEffect(() => {
    let isMounted = true;

    fetch("/api/feedback")
      .then((response) => response.json())
      .then((result) => {
        if (!isMounted || !Array.isArray(result?.data)) return;
        setFeedbackList(result.data);
      })
      .catch(() => {
        if (isMounted) {
          setFeedbackList([]);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const [search, setSearch] = useState("");
  const [sentiment, setSentiment] = useState("All");
  const [category, setCategory] = useState("All");

  const [selectedFeedback, setSelectedFeedback] =
    useState<Feedback | null>(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [formError, setFormError] = useState("");

  const [newFeedback, setNewFeedback] = useState({
    customer: "",
    email: "",
    message: "",
    sentiment: "Positive" as Sentiment,
    category: "Product",
    priority: "Medium" as Priority,
  });

  const filteredFeedback = useMemo(() => {
    return feedbackList.filter((item) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        item.customer.toLowerCase().includes(searchValue) ||
        item.email.toLowerCase().includes(searchValue) ||
        item.message.toLowerCase().includes(searchValue);

      const matchesSentiment =
        sentiment === "All" || item.sentiment === sentiment;

      const matchesCategory =
        category === "All" || item.category === category;

      return matchesSearch && matchesSentiment && matchesCategory;
    });
  }, [feedbackList, search, sentiment, category]);

  const stats = useMemo(() => {
    const total = feedbackList.length;

    const positive = feedbackList.filter(
      (item) => item.sentiment === "Positive",
    ).length;

    const needsAttention = feedbackList.filter(
      (item) =>
        item.sentiment === "Negative" || item.priority === "High",
    ).length;

    const responseRate =
      total > 0
        ? Math.round(
            (feedbackList.filter((item) => item.priority !== "High").length /
              total) *
              100,
          )
        : 0;

    return {
      total,
      positive,
      needsAttention,
      responseRate,
    };
  }, [feedbackList]);

  function clearFilters() {
    setSearch("");
    setSentiment("All");
    setCategory("All");
  }

  function resetForm() {
    setNewFeedback({
      customer: "",
      email: "",
      message: "",
      sentiment: "Positive",
      category: "Product",
      priority: "Medium",
    });

    setFormError("");
  }

  function openAddModal() {
    resetForm();
    setShowAddModal(true);
  }

  function closeAddModal() {
    setShowAddModal(false);
    setFormError("");
  }

  async function handleAddFeedback(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const customer = newFeedback.customer.trim();
    const email = newFeedback.email.trim();
    const message = newFeedback.message.trim();

    if (!customer || !email || !message) {
      setFormError("Please complete all required fields.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      setFormError("Please enter a valid email address.");
      return;
    }

    const response = await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newFeedback),
    });

    if (!response.ok) {
      const result = await response.json().catch(() => null);
      setFormError(result?.error ?? "Unable to add feedback.");
      return;
    }

    const result = await response.json();
    setFeedbackList((current) => [result.data, ...current]);

    closeAddModal();
    resetForm();

    setSuccessMessage("Feedback added successfully.");

    window.setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  }

  function sentimentIcon(value: Sentiment) {
    if (value === "Positive") {
      return <Smile size={16} />;
    }

    if (value === "Negative") {
      return <Frown size={16} />;
    }

    return <Meh size={16} />;
  }

  function sentimentClass(value: Sentiment) {
    if (value === "Positive") {
      return "bg-emerald-50 text-emerald-700";
    }

    if (value === "Negative") {
      return "bg-red-50 text-red-700";
    }

    return "bg-amber-50 text-amber-700";
  }

  function priorityClass(value: Priority) {
    if (value === "High") {
      return "bg-red-50 text-red-700";
    }

    if (value === "Medium") {
      return "bg-amber-50 text-amber-700";
    }

    return "bg-slate-100 text-slate-600";
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Sidebar />
      <Topbar />

      <div className="min-h-screen pt-16 md:ml-64">
        <main className="p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            {/* Header */}
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm text-gray-500">Workspace</p>

                <h1 className="mt-1 text-3xl font-bold tracking-tight">
                  Feedback
                </h1>

                <p className="mt-2 text-sm text-gray-500">
                  Collect, review, and manage customer feedback.
                </p>
              </div>

              <button
                type="button"
                onClick={openAddModal}
                className="flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800"
              >
                <Plus size={17} />
                Add Feedback
              </button>
            </div>

            {/* Success Message */}
            {successMessage && (
              <div className="mt-5 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                <CheckCircle2 size={18} />
                {successMessage}
              </div>
            )}

            {/* Stats */}
            <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard
                title="Total Feedback"
                value={stats.total.toString()}
                icon={<MessageSquare size={18} />}
              />

              <StatCard
                title="Positive Feedback"
                value={stats.positive.toString()}
                icon={<Smile size={18} />}
              />

              <StatCard
                title="Needs Attention"
                value={stats.needsAttention.toString()}
                icon={<Frown size={18} />}
              />

              <StatCard
                title="Response Rate"
                value={`${stats.responseRate}%`}
                icon={<Star size={18} />}
              />
            </section>

            {/* Filters */}
            <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                <div className="relative flex-1">
                  <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search feedback, customer, or email..."
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-gray-400 focus:bg-white"
                  />
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <div className="relative">
                    <Filter
                      size={16}
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <select
                      value={sentiment}
                      onChange={(event) => setSentiment(event.target.value)}
                      className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-9 pr-9 text-sm outline-none focus:border-gray-400 sm:w-40"
                    >
                      <option value="All">All Sentiments</option>
                      <option value="Positive">Positive</option>
                      <option value="Neutral">Neutral</option>
                      <option value="Negative">Negative</option>
                    </select>
                  </div>

                  <select
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                    className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:border-gray-400"
                  >
                    <option value="All">All Categories</option>

                    {categories.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>

                  {(search || sentiment !== "All" || category !== "All") && (
                    <button
                      type="button"
                      onClick={clearFilters}
                      className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-100"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>
            </section>

            {/* Feedback List */}
            <section className="mt-6 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
                <div>
                  <h2 className="font-semibold text-gray-900">
                    Recent Feedback
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    {filteredFeedback.length} feedback item
                    {filteredFeedback.length === 1 ? "" : "s"} found
                  </p>
                </div>
              </div>

              {filteredFeedback.length === 0 ? (
                <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100">
                    <MessageSquare size={24} className="text-gray-400" />
                  </div>

                  <h3 className="mt-4 font-semibold text-gray-900">
                    No feedback found
                  </h3>

                  <p className="mt-1 max-w-sm text-sm text-gray-500">
                    Try changing your search or filters, or add a new
                    feedback item.
                  </p>

                  <button
                    type="button"
                    onClick={openAddModal}
                    className="mt-5 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-gray-800"
                  >
                    Add Feedback
                  </button>
                </div>
              ) : (
                <>
                  {/* Desktop Table */}
                  <div className="hidden overflow-x-auto md:block">
                    <table className="w-full text-left">
                      <thead className="border-b border-gray-200 bg-gray-50">
                        <tr>
                          <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                            Customer
                          </th>

                          <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                            Feedback
                          </th>

                          <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                            Sentiment
                          </th>

                          <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                            Category
                          </th>

                          <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                            Priority
                          </th>

                          <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                            Date
                          </th>

                          <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                            Action
                          </th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-gray-100">
                        {filteredFeedback.map((item) => (
                          <tr
                            key={item.id}
                            className="transition hover:bg-gray-50"
                          >
                            <td className="px-5 py-4">
                              <div>
                                <p className="text-sm font-semibold text-gray-900">
                                  {item.customer}
                                </p>

                                <p className="mt-1 text-xs text-gray-500">
                                  {item.email}
                                </p>
                              </div>
                            </td>

                            <td className="max-w-sm px-5 py-4">
                              <p className="truncate text-sm text-gray-600">
                                {item.message}
                              </p>
                            </td>

                            <td className="px-5 py-4">
                              <span
                                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${sentimentClass(
                                  item.sentiment,
                                )}`}
                              >
                                {sentimentIcon(item.sentiment)}
                                {item.sentiment}
                              </span>
                            </td>

                            <td className="px-5 py-4">
                              <span className="rounded-lg bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
                                {item.category}
                              </span>
                            </td>

                            <td className="px-5 py-4">
                              <span
                                className={`rounded-full px-2.5 py-1 text-xs font-medium ${priorityClass(
                                  item.priority,
                                )}`}
                              >
                                {item.priority}
                              </span>
                            </td>

                            <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-500">
                              {item.date}
                            </td>

                            <td className="px-5 py-4 text-right">
                                <button
                                    type="button"
                                    title="view"
                                    onClick={() => setSelectedFeedback(item)}
                                    className="group relative rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                                    aria-label={`View ${item.customer} feedback`}
                                >
                                    <Eye size={26}/>

                                </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Cards */}
                  <div className="divide-y divide-gray-100 md:hidden">
                    {filteredFeedback.map((item) => (
                      <div key={item.id} className="p-5">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-semibold text-gray-900">
                              {item.customer}
                            </p>

                            <p className="mt-1 text-xs text-gray-500">
                              {item.email}
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() => setSelectedFeedback(item)}
                            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-slate-100 hover:text-slate-900"
                            >
                            <Eye size={16} className="text-slate-700" />
                            View
                          </button>
                        </div>

                        <p className="mt-4 text-sm leading-6 text-gray-600">
                          {item.message}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-2">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${sentimentClass(
                              item.sentiment,
                            )}`}
                          >
                            {sentimentIcon(item.sentiment)}
                            {item.sentiment}
                          </span>

                          <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
                            {item.category}
                          </span>

                          <span
                            className={`rounded-full px-2.5 py-1 text-xs font-medium ${priorityClass(
                              item.priority,
                            )}`}
                          >
                            {item.priority}
                          </span>
                        </div>

                        <p className="mt-4 text-xs text-gray-400">
                          {item.date}
                        </p>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </section>
          </div>
        </main>
      </div>

      {/* Add Feedback Modal */}
      {showAddModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeAddModal();
            }
          }}
        >
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Add Feedback
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Add a new customer feedback record.
                </p>
              </div>

              <button
                type="button"
                onClick={closeAddModal}
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                aria-label="Close"
              >
                <X size={19} />
              </button>
            </div>

            <form onSubmit={handleAddFeedback} className="space-y-5 p-6">
              {formError && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {formError}
                </div>
              )}

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Customer Name *
                  </label>

                  <input
                    type="text"
                    value={newFeedback.customer}
                    onChange={(event) =>
                      setNewFeedback((current) => ({
                        ...current,
                        customer: event.target.value,
                      }))
                    }
                    placeholder="e.g. John Smith"
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-gray-400"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Email *
                  </label>

                  <input
                    type="email"
                    value={newFeedback.email}
                    onChange={(event) =>
                      setNewFeedback((current) => ({
                        ...current,
                        email: event.target.value,
                      }))
                    }
                    placeholder="john@example.com"
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-gray-400"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Feedback Message *
                </label>

                <textarea
                  value={newFeedback.message}
                  onChange={(event) =>
                    setNewFeedback((current) => ({
                      ...current,
                      message: event.target.value,
                    }))
                  }
                  rows={4}
                  placeholder="Write the customer's feedback..."
                  className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-gray-400"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-3">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Sentiment
                  </label>

                  <select
                    value={newFeedback.sentiment}
                    onChange={(event) =>
                      setNewFeedback((current) => ({
                        ...current,
                        sentiment: event.target.value as Sentiment,
                      }))
                    }
                    className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gray-400"
                  >
                    <option value="Positive">Positive</option>
                    <option value="Neutral">Neutral</option>
                    <option value="Negative">Negative</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Category
                  </label>

                  <select
                    value={newFeedback.category}
                    onChange={(event) =>
                      setNewFeedback((current) => ({
                        ...current,
                        category: event.target.value,
                      }))
                    }
                    className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gray-400"
                  >
                    {categories.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Priority
                  </label>

                  <select
                    value={newFeedback.priority}
                    onChange={(event) =>
                      setNewFeedback((current) => ({
                        ...current,
                        priority: event.target.value as Priority,
                      }))
                    }
                    className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gray-400"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeAddModal}
                  className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-gray-800"
                >
                  Add Feedback
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Feedback Details Modal */}
      {selectedFeedback && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedFeedback(null);
            }
          }}
        >
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Feedback Details
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Customer feedback information.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedFeedback(null)}
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                aria-label="Close"
              >
                <X size={19} />
              </button>
            </div>

            <div className="space-y-5 p-6">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Customer
                </p>

                <p className="mt-1 font-semibold text-gray-900">
                  {selectedFeedback.customer}
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  {selectedFeedback.email}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Feedback
                </p>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {selectedFeedback.message}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                <div>
                  <p className="text-xs text-gray-400">Sentiment</p>

                  <span
                    className={`mt-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${sentimentClass(
                      selectedFeedback.sentiment,
                    )}`}
                  >
                    {sentimentIcon(selectedFeedback.sentiment)}
                    {selectedFeedback.sentiment}
                  </span>
                </div>

                <div>
                  <p className="text-xs text-gray-400">Category</p>

                  <p className="mt-2 text-sm font-medium text-gray-700">
                    {selectedFeedback.category}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-400">Priority</p>

                  <span
                    className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${priorityClass(
                      selectedFeedback.priority,
                    )}`}
                  >
                    {selectedFeedback.priority}
                  </span>
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-400">Submitted</p>

                <p className="mt-1 text-sm text-gray-600">
                  {selectedFeedback.date}
                </p>
              </div>

              <div className="flex justify-end border-t border-gray-100 pt-5">
                <button
                  type="button"
                  onClick={() => setSelectedFeedback(null)}
                  className="rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-gray-800"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-center justify-between">
        <div className="rounded-xl bg-gray-100 p-2.5 text-gray-700">
          {icon}
        </div>
      </div>

      <p className="mt-5 text-sm text-gray-500">{title}</p>

      <p className="mt-1 text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
}
// ```
