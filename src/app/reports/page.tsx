"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  BarChart3,
  CalendarDays,
  Download,
  Eye,
  FileBarChart,
  FileText,
  MessageSquare,
  Plus,
  Search,
  Trash2,
  Users,
  X,
} from "lucide-react";

import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

type Report = {
  id: number;
  name: string;
  type: string;
  dateRange: string;
  createdAt: string;
  status: "Ready" | "Processing";
  description: string;
};

const reportTypes = [
  {
    name: "Feedback",
    description: "Customer feedback and response activity",
    icon: MessageSquare,
    href: "/feedback",
  },
  {
    name: "Sentiment",
    description: "Positive, neutral, and negative sentiment",
    icon: FileBarChart,
    href: "/insights",
  },
  {
    name: "Customer",
    description: "Customer activity and engagement",
    icon: Users,
    href: "/customers",
  },
  {
    name: "Analytics",
    description: "Trends, themes, and performance metrics",
    icon: BarChart3,
    href: "/analytics",
  },
];

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [reportToDelete, setReportToDelete] = useState<Report | null>(null);

  const [newReport, setNewReport] = useState({
    name: "",
    type: "Feedback",
    dateRange: "Last 30 days",
  });

  useEffect(() => {
    fetch("/api/reports")
      .then((response) => response.json())
      .then((result) => setReports(Array.isArray(result?.data) ? result.data : []))
      .catch(() => setReports([]));
  }, []);

  const filteredReports = useMemo(() => {
    return reports.filter((report) => {
      const matchesSearch =
        report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.type.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType =
        selectedType === "All" || report.type === selectedType;

      return matchesSearch && matchesType;
    });
  }, [reports, searchTerm, selectedType]);

  const showSuccess = (message: string) => {
    setSuccessMessage(message);

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const handleCreateReport = async () => {
    if (!newReport.name.trim()) {
      return;
    }

    const response = await fetch("/api/reports", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newReport),
    });
    const result = await response.json();

    if (!response.ok) {
      showSuccess(result?.error ?? "Unable to create report.");
      return;
    }

    setReports((current) => [result.data, ...current]);

    setNewReport({
      name: "",
      type: "Feedback",
      dateRange: "Last 30 days",
    });

    setShowCreateModal(false);
    showSuccess("Report created successfully.");
  };

  const handleDeleteReport = async (id: number) => {
    const response = await fetch(`/api/reports?id=${id}`, { method: "DELETE" });

    if (!response.ok) {
      showSuccess("Unable to delete report.");
      return;
    }

    setReports((current) => current.filter((report) => report.id !== id));

    if (selectedReport?.id === id) {
      setSelectedReport(null);
    }

    showSuccess("Report deleted successfully.");
  };

  const handleDownloadReport = (report: Report) => {
    /*
     * Convert a value into a valid CSV cell.
     *
     * If a value contains:
     * - comma
     * - quotation mark
     * - line break
     *
     * it is wrapped in double quotes and internal quotes
     * are escaped according to the CSV standard.
     */
    const escapeCsvValue = (value: string | number) => {
      const stringValue = String(value);

      if (
        stringValue.includes(",") ||
        stringValue.includes('"') ||
        stringValue.includes("\n") ||
        stringValue.includes("\r")
      ) {
        return `"${stringValue.replace(/"/g, '""')}"`;
      }

      return stringValue;
    };

    /*
     * Proper CSV structure:
     *
     * Row 1 = column headers
     * Row 2 = selected report's data
     *
     * This means the downloaded file opens as a normal
     * spreadsheet table in Excel / Google Sheets.
     */
    const rows = [
      [
        "Report Name",
        "Report Type",
        "Date Range",
        "Created",
        "Status",
        "Total Feedback",
        "Customers",
        "Positive Sentiment",
        "Response Rate",
      ],
      [
        report.name,
        report.type,
        report.dateRange,
        report.createdAt,
        report.status,
        "0",
        "0",
        "0%",
        "0%",
      ],
    ];

    const csvContent = rows
      .map((row) => row.map(escapeCsvValue).join(","))
      .join("\r\n");

    /*
     * UTF-8 BOM improves compatibility with Microsoft Excel,
     * especially when opening the CSV directly.
     */
    const blob = new Blob(["\uFEFF", csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;

    link.download = `${report.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")}.csv`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    showSuccess("Report downloaded successfully.");
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
              <p className="mb-1 text-sm font-medium text-gray-500">
                Workspace
              </p>

              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Reports
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Create, view, and download customer intelligence reports.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              <Plus size={18} />
              Create Report
            </button>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
              {successMessage}
            </div>
          )}

          {/* Stats */}
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-gray-200 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md">
              <div className="mb-4 flex items-center justify-between">
                <div className="rounded-xl bg-gray-100 p-2.5">
                  <FileText size={20} className="text-gray-700" />
                </div>

                <span className="text-xs font-medium text-gray-400">
                  Total
                </span>
              </div>

              <p className="text-2xl font-bold text-gray-900">
                {reports.length}
              </p>

              <p className="mt-1 text-sm text-gray-500">Generated reports</p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md">
              <div className="mb-4 flex items-center justify-between">
                <div className="rounded-xl bg-gray-100 p-2.5">
                  <MessageSquare size={20} className="text-gray-700" />
                </div>

                <span className="text-xs font-medium text-gray-400">
                  Reports
                </span>
              </div>

              <p className="text-2xl font-bold text-gray-900">
                {reports.filter((r) => r.type === "Feedback").length}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Feedback reports
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md">
              <div className="mb-4 flex items-center justify-between">
                <div className="rounded-xl bg-gray-100 p-2.5">
                  <BarChart3 size={20} className="text-gray-700" />
                </div>

                <span className="text-xs font-medium text-gray-400">
                  Insights
                </span>
              </div>

              <p className="text-2xl font-bold text-gray-900">
                {
                  reports.filter(
                    (r) => r.type === "Analytics" || r.type === "Sentiment"
                  ).length
                }
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Intelligence reports
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md">
              <div className="mb-4 flex items-center justify-between">
                <div className="rounded-xl bg-gray-100 p-2.5">
                  <Download size={20} className="text-gray-700" />
                </div>

                <span className="text-xs font-medium text-gray-400">
                  Status
                </span>
              </div>

              <p className="text-2xl font-bold text-gray-900">
                {reports.filter((r) => r.status === "Ready").length}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Ready to download
              </p>
            </div>
          </div>

          {/* Report Types */}
          <section className="mb-8">
            <div className="mb-4">
              <h2 className="text-lg font-bold text-gray-900">
                Report Types
              </h2>

              <p className="text-sm text-gray-500">
                Choose a report category to explore related data.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {reportTypes.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="group rounded-2xl border border-gray-200 bg-white p-5 transition hover:-translate-y-1 hover:border-gray-300 hover:shadow-md"
                  >
                    <div className="mb-5 flex items-center justify-between">
                      <div className="rounded-xl bg-gray-100 p-3 transition group-hover:bg-gray-900">
                        <Icon
                          size={21}
                          className="text-gray-700 transition group-hover:text-white"
                        />
                      </div>

                      <span className="text-gray-300 transition group-hover:text-gray-600">
                        →
                      </span>
                    </div>

                    <h3 className="font-semibold text-gray-900">
                      {item.name}
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-gray-500">
                      {item.description}
                    </p>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Recent Reports */}
          <section className="rounded-2xl border border-gray-200 bg-white">
            <div className="border-b border-gray-200 p-5 sm:p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    Recent Reports
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Manage your previously generated reports.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  {/* Search */}
                  <div className="relative">
                    <Search
                      size={17}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search reports..."
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-9 pr-4 text-sm outline-none transition focus:border-gray-400 focus:bg-white sm:w-56"
                    />
                  </div>

                  {/* Filter */}
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-gray-400"
                  >
                    <option value="All">All Types</option>
                    <option value="Feedback">Feedback</option>
                    <option value="Sentiment">Sentiment</option>
                    <option value="Customer">Customer</option>
                    <option value="Analytics">Analytics</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Desktop Table */}
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50 text-left">
                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Report
                    </th>

                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Type
                    </th>

                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Date Range
                    </th>

                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Created
                    </th>

                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Status
                    </th>

                    <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredReports.map((report) => (
                    <tr
                      key={report.id}
                      className="border-b border-gray-100 transition hover:bg-gray-50"
                    >
                      <td className="px-5 py-4">
                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            {report.name}
                          </p>

                          <p className="mt-1 max-w-xs truncate text-xs text-gray-500">
                            {report.description}
                          </p>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                          {report.type}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-600">
                        {report.dateRange}
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-600">
                        {report.createdAt}
                      </td>

                      <td className="px-5 py-4">
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-600">
                          <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                          {report.status}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            type="button"
                            onClick={() => setSelectedReport(report)}
                            title="View"
                            aria-label={`View ${report.name}`}
                            className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                          >
                            <Eye size={21} />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDownloadReport(report)}
                            title="Download"
                            aria-label={`Download ${report.name}`}
                            className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                          >
                            <Download size={20} />
                          </button>

                          <button
                            type="button"
                            onClick={() => setReportToDelete(report)}
                            title="Delete"
                            aria-label={`Delete ${report.name}`}
                            className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-red-600"
                          >
                            <Trash2 size={19} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="space-y-3 p-4 md:hidden">
              {filteredReports.map((report) => (
                <div
                  key={report.id}
                  className="rounded-xl border border-gray-200 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">
                        {report.name}
                      </h3>

                      <p className="mt-1 text-xs text-gray-500">
                        {report.description}
                      </p>
                    </div>

                    <span className="shrink-0 rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-medium text-gray-700">
                      {report.type}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <p className="text-gray-400">Date Range</p>
                      <p className="mt-1 font-medium text-gray-700">
                        {report.dateRange}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-400">Created</p>
                      <p className="mt-1 font-medium text-gray-700">
                        {report.createdAt}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                      Ready
                    </span>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => setSelectedReport(report)}
                        title="View"
                        className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                      >
                        <Eye size={20} />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDownloadReport(report)}
                        title="Download"
                        className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                      >
                        <Download size={19} />
                      </button>

                      <button
                        type="button"
                        onClick={() => setReportToDelete(report)}
                        title="Delete"
                        className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-red-600"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {filteredReports.length === 0 && (
                <div className="py-10 text-center">
                  <FileText
                    size={28}
                    className="mx-auto text-gray-300"
                  />

                  <p className="mt-3 text-sm font-medium text-gray-700">
                    No reports found
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    Try changing your search or filter.
                  </p>
                </div>
              )}
            </div>

            {/* Desktop Empty State */}
            {filteredReports.length === 0 && (
              <div className="hidden py-12 text-center md:block">
                <FileText
                  size={30}
                  className="mx-auto text-gray-300"
                />

                <p className="mt-3 text-sm font-medium text-gray-700">
                  No reports found
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  Try changing your search or filter.
                </p>
              </div>
            )}
          </section>
        </main>
      </div>

      {/* Create Report Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 p-5">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Create Report
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Generate a new intelligence report.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-5 p-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Report Name
                </label>

                <input
                  type="text"
                  value={newReport.name}
                  onChange={(e) =>
                    setNewReport({
                      ...newReport,
                      name: e.target.value,
                    })
                  }
                  placeholder="e.g. Weekly Customer Feedback Report"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-gray-400 focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Report Type
                </label>

                <select
                  value={newReport.type}
                  onChange={(e) =>
                    setNewReport({
                      ...newReport,
                      type: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-gray-400"
                >
                  <option value="Feedback">Feedback</option>
                  <option value="Sentiment">Sentiment</option>
                  <option value="Customer">Customer</option>
                  <option value="Analytics">Analytics</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Date Range
                </label>

                <div className="relative">
                  <CalendarDays
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <select
                    value={newReport.dateRange}
                    onChange={(e) =>
                      setNewReport({
                        ...newReport,
                        dateRange: e.target.value,
                      })
                    }
                    className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm outline-none focus:border-gray-400"
                  >
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                    <option>Last 90 days</option>
                    <option>Last 6 months</option>
                    <option>This year</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-gray-100 p-5">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleCreateReport}
                disabled={!newReport.name.trim()}
                className="rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Generate Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Report Modal */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-gray-100 p-5">
              <div>
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100">
                  <FileText size={21} className="text-gray-700" />
                </div>

                <h2 className="text-lg font-bold text-gray-900">
                  {selectedReport.name}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {selectedReport.description}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedReport(null)}
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 p-5 sm:grid-cols-4">
              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs text-gray-400">Type</p>
                <p className="mt-1 text-sm font-semibold text-gray-900">
                  {selectedReport.type}
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs text-gray-400">Date Range</p>
                <p className="mt-1 text-sm font-semibold text-gray-900">
                  {selectedReport.dateRange}
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs text-gray-400">Created</p>
                <p className="mt-1 text-sm font-semibold text-gray-900">
                  {selectedReport.createdAt}
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs text-gray-400">Status</p>
                <p className="mt-1 text-sm font-semibold text-green-600">
                  {selectedReport.status}
                </p>
              </div>
            </div>

            <div className="mx-5 mb-5 rounded-xl border border-gray-200 p-5">
              <h3 className="mb-4 text-sm font-bold text-gray-900">
                Report Preview
              </h3>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div>
                  <p className="text-xs text-gray-400">Feedback</p>
                  <p className="mt-1 text-xl font-bold text-gray-900">
                    0
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-400">Customers</p>
                  <p className="mt-1 text-xl font-bold text-gray-900">
                    0
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-400">Positive</p>
                  <p className="mt-1 text-xl font-bold text-gray-900">
                    0%
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-400">Response</p>
                  <p className="mt-1 text-xl font-bold text-gray-900">
                    0%
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-gray-100 p-5">
              <button
                type="button"
                onClick={() => setReportToDelete(selectedReport)}
                className="mr-auto rounded-xl px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50"
              >
                Delete
              </button>

              <button
                type="button"
                onClick={() => handleDownloadReport(selectedReport)}
                className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-gray-800"
              >
                <Download size={17} />
                Download CSV
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {reportToDelete && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">
            <div className="p-6">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
                <Trash2 size={22} className="text-red-600" />
              </div>

              <h2 className="text-lg font-bold text-gray-900">
                Delete Report
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Are you sure you want to delete this report?
              </p>

              <div className="mt-4 rounded-xl bg-gray-50 p-4">
                <p className="text-sm font-semibold text-gray-900">
                  {reportToDelete.name}
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  {reportToDelete.type} · {reportToDelete.dateRange}
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-gray-100 p-5">
              <button
                type="button"
                onClick={() => setReportToDelete(null)}
                className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => {
                  handleDeleteReport(reportToDelete.id);
                  setReportToDelete(null);
                }}
                className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                Delete Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}