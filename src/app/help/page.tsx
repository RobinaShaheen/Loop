"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  HelpCircle,
  Mail,
  MessageCircle,
  MessageSquare,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  X,
} from "lucide-react";

import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

type Category = {
  title: string;
  description: string;
  icon: typeof BookOpen;
};

type FAQ = {
  question: string;
  answer: string;
  category: string;
};

const categories: Category[] = [
  {
    title: "Getting Started",
    description: "Learn the basics of LOOP and set up your workspace.",
    icon: BookOpen,
  },
  {
    title: "Feedback",
    description: "Manage, search, filter, and understand customer feedback.",
    icon: MessageSquare,
  },
  {
    title: "AI Insights",
    description: "Learn how AI analyzes feedback and identifies patterns.",
    icon: Sparkles,
  },
  {
    title: "Analytics",
    description: "Understand trends, sentiment, themes, and reports.",
    icon: BarChart3,
  },
  {
    title: "Customers",
    description: "Manage customer profiles and feedback history.",
    icon: Users,
  },
  {
    title: "Account & Security",
    description: "Manage your profile, notifications, and account security.",
    icon: ShieldCheck,
  },
];

const faqs: FAQ[] = [
  {
    question: "What is LOOP?",
    answer:
      "LOOP is an AI-powered customer feedback intelligence platform designed to help teams collect, organize, analyze, and understand customer feedback.",
    category: "Getting Started",
  },
  {
    question: "How do I add customer feedback?",
    answer:
      "Go to the Feedback section from the sidebar and select Add Feedback. You can then enter the customer, feedback content, rating, and other relevant information.",
    category: "Feedback",
  },
  {
    question: "How does AI Insights work?",
    answer:
      "AI Insights analyzes feedback to identify sentiment, recurring themes, important patterns, and potential areas for improvement.",
    category: "AI Insights",
  },
  {
    question: "Can I view feedback by customer?",
    answer:
      "Yes. Open the Customers section and select a customer to view their profile information, feedback history, sentiment, and customer score.",
    category: "Customers",
  },
  {
    question: "How can I generate reports?",
    answer:
      "Open Reports from the sidebar. From there you can select a report type and review available report information. Report generation will be connected to real data in a later version.",
    category: "Analytics",
  },
  {
    question: "Where can I manage my account settings?",
    answer:
      "Open Settings from the bottom of the sidebar. You can manage profile information, notifications, security settings, and appearance preferences.",
    category: "Account & Security",
  },
];

const documentationSections = [
  {
    title: "Getting Started",
    description: "Learn the basic LOOP workspace and navigation.",
  },
  {
    title: "Managing Feedback",
    description: "Add, search, filter, and review customer feedback.",
  },
  {
    title: "AI Insights",
    description: "Understand sentiment, themes, and AI-generated insights.",
  },
  {
    title: "Analytics & Reports",
    description: "Explore trends and create useful feedback reports.",
  },
];

export default function HelpPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const [submitted, setSubmitted] = useState(false);
  const [supportName, setSupportName] = useState("");
  const [supportEmail, setSupportEmail] = useState("");
  const [supportMessage, setSupportMessage] = useState("");
  const [supportError, setSupportError] = useState("");

  const [showDocumentation, setShowDocumentation] = useState(false);
  const [showStatus, setShowStatus] = useState(false);

  const normalizedSearch = search.trim().toLowerCase();

  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesCategory =
        !activeCategory || faq.category === activeCategory;

      const matchesSearch =
        !normalizedSearch ||
        `${faq.question} ${faq.answer} ${faq.category}`
          .toLowerCase()
          .includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, normalizedSearch]);

  const handleCategoryClick = (category: string) => {
    setActiveCategory((current) =>
      current === category ? null : category
    );
    setSearch("");
    setOpenFaq(0);

    setTimeout(() => {
      document
        .getElementById("faq-section")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setActiveCategory(null);
    setOpenFaq(0);
  };

  const handleSupportSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setSupportError("");

    if (
      !supportName.trim() ||
      !supportEmail.trim() ||
      !supportMessage.trim()
    ) {
      setSupportError("Please complete all fields before sending.");
      return;
    }

    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      supportEmail.trim()
    );

    if (!emailIsValid) {
      setSupportError("Please enter a valid email address.");
      return;
    }

    const response = await fetch("/api/support", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: supportName.trim(),
        email: supportEmail.trim(),
        message: supportMessage.trim(),
      }),
    });

    if (!response.ok) {
      const result = await response.json().catch(() => null);
      setSupportError(result?.error ?? "Unable to send your support message.");
      return;
    }

    setSubmitted(true);

    setSupportName("");
    setSupportEmail("");
    setSupportMessage("");

    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  };

  const scrollToSupport = () => {
    document
      .getElementById("contact-support")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar />
      <Topbar />

      <div className="min-h-screen pt-16 md:ml-64">
        <main className="p-4 sm:p-6 lg:p-8">
          {/* Header */}
          <div className="mb-6">
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300">
                  <HelpCircle size={14} />
                  Support Center
                </div>

                <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
                  Help & Support
                </h1>

                <p className="mt-2 max-w-2xl text-sm text-gray-500 dark:text-gray-400 sm:text-base">
                  Find answers, learn how LOOP works, or contact our support
                  team for assistance.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowStatus(true)}
                className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-left transition hover:border-gray-300 hover:shadow-sm dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700"
              >
                <CheckCircle2
                  size={18}
                  className="text-gray-700 dark:text-gray-300"
                />

                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    System Status
                  </p>

                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    All systems operational
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* Support Team — Top */}
          <section className="mb-6 rounded-2xl bg-slate-950 p-6 text-white shadow-sm sm:p-7">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-slate-950">
                  L
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                    Need more help?
                  </p>

                  <h2 className="mt-1 text-xl font-semibold">
                    Our support team is here for you.
                  </h2>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                    Get assistance with your workspace, feedback data,
                    analytics, reports, or account settings.
                  </p>

                  <p className="mt-3 text-xs text-slate-500">
                    LOOP Support · Available for assistance
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={scrollToSupport}
                className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-medium text-slate-950 transition hover:bg-slate-200"
              >
                Contact Support
                <ArrowRight size={16} />
              </button>
            </div>
          </section>

          {/* Search Help */}
          <section className="mb-8 rounded-2xl bg-slate-950 p-6 text-white shadow-sm sm:p-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="mb-2 text-sm font-medium text-slate-400">
                HELP CENTER
              </p>

              <h2 className="text-2xl font-bold sm:text-3xl">
                How can we help you?
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                Search our frequently asked questions and support resources.
              </p>

              <div className="relative mt-6">
                <Search
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(event) =>
                    handleSearchChange(event.target.value)
                  }
                  placeholder="Search for help..."
                  className="w-full rounded-xl border border-slate-700 bg-white py-3.5 pl-11 pr-12 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-white"
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => handleSearchChange("")}
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                  >
                    <X size={17} />
                  </button>
                )}
              </div>

              {(search || activeCategory) && (
                <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                  {activeCategory && (
                    <button
                      type="button"
                      onClick={() => setActiveCategory(null)}
                      className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-white/20"
                    >
                      {activeCategory} ×
                    </button>
                  )}

                  {search && (
                    <p className="text-xs text-slate-400">
                      Showing {filteredFaqs.length} result
                      {filteredFaqs.length === 1 ? "" : "s"}
                    </p>
                  )}
                </div>
              )}
            </div>
          </section>

          {/* Help Categories */}
          <section className="mb-8">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Browse Help Topics
              </h2>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Select a category to see related questions.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {categories.map((category) => {
                const Icon = category.icon;
                const isActive = activeCategory === category.title;

                return (
                  <button
                    key={category.title}
                    type="button"
                    onClick={() => handleCategoryClick(category.title)}
                    className={`group rounded-2xl border p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
                      isActive
                        ? "border-gray-900 bg-gray-900 text-white dark:border-white dark:bg-white dark:text-gray-900"
                        : "border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900"
                    }`}
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                          isActive
                            ? "bg-white/10 text-white dark:bg-gray-900/10 dark:text-gray-900"
                            : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200"
                        }`}
                      >
                        <Icon size={19} />
                      </div>

                      <ArrowRight
                        size={17}
                        className={`transition group-hover:translate-x-1 ${
                          isActive
                            ? "text-white/60 dark:text-gray-500"
                            : "text-gray-300 group-hover:text-gray-600 dark:text-gray-600 dark:group-hover:text-gray-300"
                        }`}
                      />
                    </div>

                    <h3
                      className={`font-semibold ${
                        isActive
                          ? "text-white dark:text-gray-900"
                          : "text-gray-900 dark:text-white"
                      }`}
                    >
                      {category.title}
                    </h3>

                    <p
                      className={`mt-2 text-sm leading-6 ${
                        isActive
                          ? "text-gray-300 dark:text-gray-600"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      {category.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </section>

          {/* FAQ */}
          <section
            id="faq-section"
            className="mb-8 scroll-mt-24 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-6"
          >
            <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Frequently Asked Questions
                </h2>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {activeCategory
                    ? `Questions about ${activeCategory}.`
                    : "Quick answers to common questions about LOOP."}
                </p>
              </div>

              {activeCategory && (
                <button
                  type="button"
                  onClick={() => setActiveCategory(null)}
                  className="text-sm font-medium text-gray-700 hover:underline dark:text-gray-300"
                >
                  Show all questions
                </button>
              )}
            </div>

            <div className="space-y-3">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq, index) => {
                  const isOpen = openFaq === index;

                  return (
                    <div
                      key={faq.question}
                      className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800"
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setOpenFaq(isOpen ? null : index)
                        }
                        className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left transition hover:bg-gray-50 dark:hover:bg-gray-800/50"
                      >
                        <div>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {faq.question}
                          </span>

                          <span className="mt-1 block text-xs text-gray-400">
                            {faq.category}
                          </span>
                        </div>

                        <ChevronDown
                          size={18}
                          className={`shrink-0 text-gray-400 transition ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {isOpen && (
                        <div className="border-t border-gray-100 px-4 pb-4 pt-3 dark:border-gray-800">
                          <p className="text-sm leading-6 text-gray-500 dark:text-gray-400">
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="rounded-xl border border-dashed border-gray-300 px-5 py-10 text-center dark:border-gray-700">
                  <Search
                    size={24}
                    className="mx-auto mb-3 text-gray-400"
                  />

                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    No results found
                  </p>

                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Try searching with different keywords or choose another
                    help topic.
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setSearch("");
                      setActiveCategory(null);
                      setOpenFaq(0);
                    }}
                    className="mt-4 text-sm font-medium text-gray-900 hover:underline dark:text-white"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* Contact + Documentation */}
          <section className="grid gap-6 lg:grid-cols-2">
            {/* Contact Support */}
            <div
              id="contact-support"
              className="scroll-mt-24 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200">
                <MessageCircle size={21} />
              </div>

              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Contact Support
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
                Can't find what you're looking for? Send us a message and our
                support team can help.
              </p>

              {submitted ? (
                <div className="mt-5 rounded-xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-800 dark:bg-gray-800/50">
                  <CheckCircle2
                    size={28}
                    className="mb-3 text-gray-700 dark:text-gray-200"
                  />

                  <p className="font-semibold text-gray-900 dark:text-white">
                    Message sent successfully
                  </p>

                  <p className="mt-1 text-sm leading-6 text-gray-500 dark:text-gray-400">
                    Thanks for contacting LOOP Support. Your request has been
                    received.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSupportSubmit}
                  className="mt-5 space-y-4"
                >
                  <input
                    required
                    type="text"
                    value={supportName}
                    onChange={(event) =>
                      setSupportName(event.target.value)
                    }
                    placeholder="Your name"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-gray-500 dark:focus:bg-gray-800"
                  />

                  <input
                    required
                    type="email"
                    value={supportEmail}
                    onChange={(event) =>
                      setSupportEmail(event.target.value)
                    }
                    placeholder="Your email"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-gray-800"
                  />

                  <textarea
                    required
                    rows={4}
                    value={supportMessage}
                    onChange={(event) =>
                      setSupportMessage(event.target.value)
                    }
                    placeholder="Describe your issue..."
                    className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-gray-500 dark:focus:bg-gray-800"
                  />

                  {supportError && (
                    <p className="text-sm text-red-600 dark:text-red-400">
                      {supportError}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
                  >
                    <Mail size={17} />
                    Send Message
                  </button>
                </form>
              )}
            </div>

            {/* Documentation */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200">
                    <BookOpen size={21} />
                  </div>

                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Documentation
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
                    Learn how to use LOOP's feedback management, analytics,
                    AI insights, and reporting features.
                  </p>
                </div>

                <ExternalLink
                  size={18}
                  className="shrink-0 text-gray-400"
                />
              </div>

              <button
                type="button"
                onClick={() => setShowDocumentation(true)}
                className="mt-5 flex items-center gap-2 text-sm font-medium text-gray-900 hover:underline dark:text-white"
              >
                View Documentation
                <ArrowRight size={15} />
              </button>
              <div className="mt-8 rounded-2xl bg-slate-950 p-6 text-white shadow-sm sm:p-7">
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                    Need more help?
                  </p>

                  <h2 className="mt-1 text-xl font-semibold">
                    Our support team is here for you.
                  </h2>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                    Get assistance with your workspace, feedback data,
                    analytics, reports, or account settings.
                  </p>

                  <p className="mt-3 text-xs text-slate-500">
                    LOOP Support · Available for assistance
                  </p>
                </div>
            </div>
          </section>
        </main>
      </div>

      {/* Documentation Modal */}
      {showDocumentation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl rounded-2xl border border-gray-200 bg-white shadow-xl dark:border-gray-800 dark:bg-gray-900">
            <div className="flex items-start justify-between border-b border-gray-100 p-5 dark:border-gray-800">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  LOOP Documentation
                </h2>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Explore the main areas of the LOOP platform.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowDocumentation(false)}
                aria-label="Close documentation"
                className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-800 dark:hover:text-white"
              >
                <X size={19} />
              </button>
            </div>

            <div className="grid gap-3 p-5 sm:grid-cols-2">
              {documentationSections.map((section) => (
                <div
                  key={section.title}
                  className="rounded-xl border border-gray-200 p-4 dark:border-gray-800"
                >
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                    {section.title}
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-gray-500 dark:text-gray-400">
                    {section.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex justify-end border-t border-gray-100 p-5 dark:border-gray-800">
              <button
                type="button"
                onClick={() => setShowDocumentation(false)}
                className="rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* System Status Modal */}
      {showStatus && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white shadow-xl dark:border-gray-800 dark:bg-gray-900">
            <div className="flex items-start justify-between border-b border-gray-100 p-5 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                  <CheckCircle2
                    size={20}
                    className="text-gray-700 dark:text-gray-200"
                  />
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    System Status
                  </h2>

                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Current platform status
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowStatus(false)}
                aria-label="Close system status"
                className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-800 dark:hover:text-white"
              >
                <X size={19} />
              </button>
            </div>

            <div className="p-5">
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-800/50">
                <div className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-green-500" />

                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      All systems operational
                    </p>

                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Dashboard, feedback, analytics, reports, and account
                      services are available.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end border-t border-gray-100 p-5 dark:border-gray-800">
              <button
                type="button"
                onClick={() => setShowStatus(false)}
                className="rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
// ```
