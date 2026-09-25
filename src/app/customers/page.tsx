"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Users,
  MessageSquare,
  Star,
  X,
  Mail,
  Calendar,
  Eye,
  Plus,
  CheckCircle2,
} from "lucide-react";

import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

type Customer = {
  id: number;
  name: string;
  email: string;
  company: string;
  feedback: number;
  sentiment: "Positive" | "Neutral" | "Negative";
  score: number;
  lastFeedback: string;
  status: "Active" | "Inactive";
};

const initialCustomers: Customer[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    company: "Acme Inc.",
    feedback: 24,
    sentiment: "Positive",
    score: 92,
    lastFeedback: "Sep 15, 2026",
    status: "Active",
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael.chen@example.com",
    company: "TechFlow",
    feedback: 18,
    sentiment: "Positive",
    score: 87,
    lastFeedback: "Sep 14, 2026",
    status: "Active",
  },
  {
    id: 3,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    company: "Bright Labs",
    feedback: 15,
    sentiment: "Neutral",
    score: 71,
    lastFeedback: "Sep 13, 2026",
    status: "Active",
  },
  {
    id: 4,
    name: "James Wilson",
    email: "james.wilson@example.com",
    company: "Nova Systems",
    feedback: 11,
    sentiment: "Negative",
    score: 43,
    lastFeedback: "Sep 12, 2026",
    status: "Active",
  },
  {
    id: 5,
    name: "Olivia Brown",
    email: "olivia.brown@example.com",
    company: "CloudBase",
    feedback: 9,
    sentiment: "Positive",
    score: 95,
    lastFeedback: "Sep 11, 2026",
    status: "Active",
  },
  {
    id: 6,
    name: "Daniel Miller",
    email: "daniel.miller@example.com",
    company: "Vertex Digital",
    feedback: 7,
    sentiment: "Neutral",
    score: 68,
    lastFeedback: "Sep 10, 2026",
    status: "Inactive",
  },
  {
    id: 7,
    name: "Sophia Taylor",
    email: "sophia.taylor@example.com",
    company: "PixelWorks",
    feedback: 21,
    sentiment: "Positive",
    score: 89,
    lastFeedback: "Sep 9, 2026",
    status: "Active",
  },
  {
    id: 8,
    name: "William Anderson",
    email: "william.anderson@example.com",
    company: "DataCore",
    feedback: 13,
    sentiment: "Negative",
    score: 48,
    lastFeedback: "Sep 8, 2026",
    status: "Inactive",
  },
];

export default function CustomersPage() {
  const [customers, setCustomers] =
    useState<Customer[]>(initialCustomers);

  useEffect(() => {
    let isMounted = true;

    fetch("/api/customers")
      .then((response) => response.json())
      .then((result) => {
        if (!isMounted || !Array.isArray(result?.data)) return;
        setCustomers(result.data);
      })
      .catch(() => {
        if (isMounted) {
          setCustomers(initialCustomers);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const [search, setSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] =
    useState<Customer | null>(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [emailError, setEmailError] = useState("");

  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    company: "",
    status: "Active" as "Active" | "Inactive",
  });

  const filteredCustomers = useMemo(() => {
    const value = search.toLowerCase().trim();

    if (!value) return customers;

    return customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(value) ||
        customer.email.toLowerCase().includes(value) ||
        customer.company.toLowerCase().includes(value)
    );
  }, [search, customers]);

  const activeCustomers = customers.filter(
    (customer) => customer.status === "Active"
  ).length;

  const totalFeedback = customers.reduce(
    (total, customer) => total + customer.feedback,
    0
  );

  const averageScore =
    customers.length > 0
      ? Math.round(
          customers.reduce(
            (total, customer) => total + customer.score,
            0
          ) / customers.length
        )
      : 0;

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.com$/i.test(email.trim());
  };

  const handleEmailChange = (value: string) => {
    setNewCustomer({
      ...newCustomer,
      email: value,
    });

    if (!value.trim()) {
      setEmailError("");
      return;
    }

    if (!isValidEmail(value)) {
      setEmailError("Please enter a valid email");
    } else {
      setEmailError("");
    }
  };

  const handleAddCustomer = () => {
    if (
      !newCustomer.name.trim() ||
      !newCustomer.email.trim() ||
      !newCustomer.company.trim()
    ) {
      return;
    }

    if (!isValidEmail(newCustomer.email)) {
      setEmailError("Please enter a valid email");
      return;
    }

    const customer: Customer = {
      id: Date.now(),
      name: newCustomer.name.trim(),
      email: newCustomer.email.trim(),
      company: newCustomer.company.trim(),
      feedback: 0,
      sentiment: "Neutral",
      score: 0,
      lastFeedback: "No feedback yet",
      status: newCustomer.status,
    };

    setCustomers((current) => [customer, ...current]);

    setNewCustomer({
      name: "",
      email: "",
      company: "",
      status: "Active",
    });

    setEmailError("");
    setShowAddModal(false);
    setSuccessMessage("Customer added successfully.");

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Topbar />

      <div className="min-h-screen pt-16 md:ml-64">
        <main className="p-4 sm:p-6 lg:p-8">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                Customers
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Manage and understand your customer relationships.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              <Plus size={17} />
              Add Customer
            </button>
          </div>

          {successMessage && (
            <div className="mb-6 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
              <CheckCircle2 size={18} />
              {successMessage}
            </div>
          )}

          {/* Stats */}
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              {
                icon: Users,
                label: "Total Customers",
                value: customers.length,
                text: "+8.2% from last month",
              },
              {
                icon: Users,
                label: "Active Customers",
                value: activeCustomers,
                text: "Currently engaging",
              },
              {
                icon: MessageSquare,
                label: "Recent Feedback",
                value: totalFeedback,
                text: "From displayed customers",
              },
              {
                icon: Star,
                label: "Average Score",
                value: `${averageScore}%`,
                text: "Customer sentiment score",
              },
            ].map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.label}
                  className="cursor-default rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-200 hover:-translate-y-1 hover:border-gray-300 hover:shadow-md"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
                    <Icon size={20} className="text-gray-700" />
                  </div>

                  <p className="text-sm text-gray-500">
                    {stat.label}
                  </p>

                  <p className="mt-1 text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    {stat.text}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Customer List */}
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
            <div className="flex flex-col gap-4 border-b border-gray-200 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-semibold text-gray-900">
                  Customer Directory
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  {filteredCustomers.length} customers shown
                </p>
              </div>

              <div className="relative w-full sm:w-80">
                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search customers..."
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-gray-400 focus:bg-white"
                />
              </div>
            </div>

            {/* Desktop Table */}
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/70 text-left">
                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Customer
                    </th>

                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Company
                    </th>

                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Feedback
                    </th>

                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Sentiment
                    </th>

                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Score
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
                  {filteredCustomers.map((customer) => (
                    <tr
                      key={customer.id}
                      className="border-b border-gray-100 transition last:border-0 hover:bg-gray-50"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-sm font-semibold text-white">
                            {customer.name.charAt(0)}
                          </div>

                          <div>
                            <p className="text-sm font-semibold text-gray-900">
                              {customer.name}
                            </p>

                            <p className="text-xs text-gray-500">
                              {customer.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-600">
                        {customer.company}
                      </td>

                      <td className="px-5 py-4">
                        <span className="text-sm font-medium text-gray-900">
                          {customer.feedback}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                            customer.sentiment === "Positive"
                              ? "bg-green-50 text-green-700"
                              : customer.sentiment === "Neutral"
                                ? "bg-gray-100 text-gray-600"
                                : "bg-red-50 text-red-700"
                          }`}
                        >
                          {customer.sentiment}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span className="text-sm font-semibold text-gray-900">
                          {customer.score}%
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 text-xs font-medium ${
                            customer.status === "Active"
                              ? "text-green-700"
                              : "text-gray-500"
                          }`}
                        >
                          <span
                            className={`h-2 w-2 rounded-full ${
                              customer.status === "Active"
                                ? "bg-green-500"
                                : "bg-gray-400"
                            }`}
                          />

                          {customer.status}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-right">
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedCustomer(customer)
                          }
                          title="View"
                          aria-label={`View ${customer.name}`}
                          className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                        >
                          <Eye size={22} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="divide-y divide-gray-100 md:hidden">
              {filteredCustomers.map((customer) => (
                <button
                  key={customer.id}
                  type="button"
                  onClick={() => setSelectedCustomer(customer)}
                  className="w-full p-5 text-left transition hover:bg-gray-50"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-900 text-sm font-semibold text-white">
                        {customer.name.charAt(0)}
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {customer.name}
                        </p>

                        <p className="text-xs text-gray-500">
                          {customer.company}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        customer.sentiment === "Positive"
                          ? "bg-green-50 text-green-700"
                          : customer.sentiment === "Neutral"
                            ? "bg-gray-100 text-gray-600"
                            : "bg-red-50 text-red-700"
                      }`}
                    >
                      {customer.sentiment}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-3">
                    <div>
                      <p className="text-xs text-gray-400">
                        Feedback
                      </p>

                      <p className="mt-1 text-sm font-semibold text-gray-900">
                        {customer.feedback}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-400">
                        Score
                      </p>

                      <p className="mt-1 text-sm font-semibold text-gray-900">
                        {customer.score}%
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-400">
                        Status
                      </p>

                      <p className="mt-1 text-sm font-medium text-gray-700">
                        {customer.status}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {filteredCustomers.length === 0 && (
              <div className="px-5 py-16 text-center">
                <Users
                  size={32}
                  className="mx-auto text-gray-300"
                />

                <p className="mt-3 text-sm font-medium text-gray-900">
                  No customers found
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Try searching with a different name, email, or company.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Add Customer Modal */}
      {showAddModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setShowAddModal(false)}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-gray-200 p-5">
              <div>
                <h2 className="font-semibold text-gray-900">
                  Add Customer
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  Add a new customer to your workspace.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-5 p-6">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Name
                </label>

                <input
                  type="text"
                  value={newCustomer.name}
                  onChange={(e) =>
                    setNewCustomer({
                      ...newCustomer,
                      name: e.target.value,
                    })
                  }
                  placeholder="Enter customer name"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none transition focus:border-gray-400 focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Email
                </label>

                <input
                  type="email"
                  value={newCustomer.email}
                  onChange={(e) =>
                    handleEmailChange(e.target.value)
                  }
                  placeholder="customer@example.com"
                  className={`w-full rounded-xl border bg-gray-50 px-4 py-2.5 text-sm outline-none transition focus:bg-white ${
                    emailError
                      ? "border-red-300 focus:border-red-400"
                      : "border-gray-200 focus:border-gray-400"
                  }`}
                />

                {emailError ? (
                  <p className="mt-1.5 text-xs text-red-600">
                    {emailError}
                  </p>
                ) : (
                  <p className="mt-1.5 text-xs text-gray-400">
                    Email must contain @ and end with .com
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Company
                </label>

                <input
                  type="text"
                  value={newCustomer.company}
                  onChange={(e) =>
                    setNewCustomer({
                      ...newCustomer,
                      company: e.target.value,
                    })
                  }
                  placeholder="Enter company name"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none transition focus:border-gray-400 focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Status
                </label>

                <select
                  value={newCustomer.status}
                  onChange={(e) =>
                    setNewCustomer({
                      ...newCustomer,
                      status: e.target.value as
                        | "Active"
                        | "Inactive",
                    })
                  }
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none transition focus:border-gray-400 focus:bg-white"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-gray-200 p-5">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleAddCustomer}
                disabled={
                  !newCustomer.name.trim() ||
                  !newCustomer.email.trim() ||
                  !newCustomer.company.trim() ||
                  !isValidEmail(newCustomer.email)
                }
                className="rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Add Customer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Customer Detail Modal */}
      {selectedCustomer && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setSelectedCustomer(null)}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-gray-200 p-5">
              <h2 className="font-semibold text-gray-900">
                Customer Details
              </h2>

              <button
                type="button"
                onClick={() => setSelectedCustomer(null)}
                className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-900 text-lg font-semibold text-white">
                  {selectedCustomer.name.charAt(0)}
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {selectedCustomer.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {selectedCustomer.company}
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-3">
                  <Mail size={17} className="text-gray-400" />

                  <span className="text-sm text-gray-700">
                    {selectedCustomer.email}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar size={17} className="text-gray-400" />

                  <span className="text-sm text-gray-700">
                    Last feedback: {selectedCustomer.lastFeedback}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 pt-2">
                  <div className="rounded-xl bg-gray-50 p-4">
                    <p className="text-xs text-gray-500">
                      Feedback
                    </p>

                    <p className="mt-1 text-lg font-bold text-gray-900">
                      {selectedCustomer.feedback}
                    </p>
                  </div>

                  <div className="rounded-xl bg-gray-50 p-4">
                    <p className="text-xs text-gray-500">
                      Score
                    </p>

                    <p className="mt-1 text-lg font-bold text-gray-900">
                      {selectedCustomer.score}%
                    </p>
                  </div>

                  <div className="rounded-xl bg-gray-50 p-4">
                    <p className="text-xs text-gray-500">
                      Sentiment
                    </p>

                    <p className="mt-1 text-sm font-semibold text-gray-900">
                      {selectedCustomer.sentiment}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end border-t border-gray-200 p-5">
              <button
                type="button"
                onClick={() => setSelectedCustomer(null)}
                className="rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
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
