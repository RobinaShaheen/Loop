"use client";

import { useEffect, useState } from "react";
import {
  Bell,
  Check,
  Eye,
  EyeOff,
  Lock,
  Monitor,
  Moon,
  Palette,
  Save,
  Shield,
  Sun,
  User,
  X,
} from "lucide-react";

import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

type SettingsSection =
  | "profile"
  | "notifications"
  | "security"
  | "appearance";

type Theme = "light" | "dark" | "system";

export default function SettingsPage() {
  const [activeSection, setActiveSection] =
    useState<SettingsSection>("profile");

  const [firstName, setFirstName] = useState("Robina");
  const [lastName, setLastName] = useState("Shaheen");
  const [email, setEmail] = useState("robina@example.com");
  const [company, setCompany] = useState("LOOP Workspace");

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(true);
  const [aiInsightAlerts, setAiInsightAlerts] = useState(true);

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const [appearance, setAppearance] = useState<Theme>("system");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [successMessage, setSuccessMessage] = useState("");

  /*
   * Apply theme to the entire platform.
   */
  const applyTheme = (theme: Theme) => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
      return;
    }

    if (theme === "light") {
      root.classList.remove("dark");
      return;
    }

    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (prefersDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  };

  /*
   * Load saved appearance when Settings opens.
   */
  useEffect(() => {
    const savedTheme = localStorage.getItem("loop-theme") as Theme | null;

    if (
      savedTheme === "light" ||
      savedTheme === "dark" ||
      savedTheme === "system"
    ) {
      setAppearance(savedTheme);
      applyTheme(savedTheme);
    } else {
      applyTheme("system");
    }
  }, []);

  /*
   * Listen for OS appearance changes while System is selected.
   */
  useEffect(() => {
    if (appearance !== "system") {
      return;
    }

    const mediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );

    const handleChange = () => {
      applyTheme("system");
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [appearance]);

  const handleAppearanceChange = (theme: Theme) => {
    setAppearance(theme);

    localStorage.setItem("loop-theme", theme);
    applyTheme(theme);

    const themeName =
      theme === "system"
        ? "System"
        : theme === "dark"
        ? "Dark"
        : "Light";

    showSuccess(`${themeName} appearance applied to LOOP.`);
  };

  const showSuccess = (message: string) => {
    setSuccessMessage(message);

    window.setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const handleSaveChanges = () => {
    localStorage.setItem("loop-theme", appearance);

    applyTheme(appearance);

    showSuccess("Your settings have been saved successfully.");
  };

  const handlePasswordChange = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      showSuccess("Please complete all password fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      showSuccess("New password and confirmation do not match.");
      return;
    }

    if (newPassword.length < 8) {
      showSuccess("Password must contain at least 8 characters.");
      return;
    }

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

    showSuccess("Password changed successfully.");
  };

  const handleTwoFactor = () => {
    const nextValue = !twoFactorEnabled;

    setTwoFactorEnabled(nextValue);

    showSuccess(
      nextValue
        ? "Two-factor authentication has been enabled."
        : "Two-factor authentication has been disabled."
    );
  };

  const sections = [
    {
      id: "profile" as SettingsSection,
      name: "Profile",
      description: "Manage your personal information",
      icon: User,
    },
    {
      id: "notifications" as SettingsSection,
      name: "Notifications",
      description: "Control your notification preferences",
      icon: Bell,
    },
    {
      id: "security" as SettingsSection,
      name: "Security",
      description: "Manage password and account security",
      icon: Shield,
    },
    {
      id: "appearance" as SettingsSection,
      name: "Appearance",
      description: "Customize your workspace appearance",
      icon: Palette,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 transition-colors duration-200 dark:bg-slate-950 dark:text-white">
      <Sidebar />
      <Topbar />

      <div className="min-h-screen pt-16 md:ml-64">
        <main className="p-4 sm:p-6 lg:p-8">
          {/* Success Message */}
          {successMessage && (
            <div className="fixed right-4 top-20 z-50 flex max-w-sm items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-lg dark:border-slate-700 dark:bg-slate-900">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400">
                <Check size={17} />
              </div>

              <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                {successMessage}
              </p>

              <button
                type="button"
                onClick={() => setSuccessMessage("")}
                className="ml-2 text-gray-400 hover:text-gray-700 dark:hover:text-white"
                aria-label="Close message"
              >
                <X size={17} />
              </button>
            </div>
          )}

          {/* Header */}
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
                Settings
              </h1>

              <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
                Manage your LOOP workspace and account preferences.
              </p>
            </div>

            <button
              type="button"
              onClick={handleSaveChanges}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
            >
              <Save size={17} />
              Save Changes
            </button>
          </div>

          <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
            {/* Settings Navigation */}
            <aside className="h-fit rounded-2xl border border-gray-200 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-3 px-3 py-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-slate-500">
                  Account Settings
                </p>
              </div>

              <div className="space-y-1">
                {sections.map((section) => {
                  const Icon = section.icon;
                  const active = activeSection === section.id;

                  return (
                    <button
                      key={section.id}
                      type="button"
                      onClick={() => setActiveSection(section.id)}
                      className={`flex w-full items-start gap-3 rounded-xl px-3 py-3 text-left transition ${
                        active
                          ? "bg-gray-900 text-white dark:bg-white dark:text-slate-950"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                      }`}
                    >
                      <Icon
                        size={18}
                        className={`mt-0.5 shrink-0 ${
                          active
                            ? "text-current"
                            : "text-gray-400 dark:text-slate-500"
                        }`}
                      />

                      <div className="min-w-0">
                        <p className="text-sm font-semibold">
                          {section.name}
                        </p>

                        <p
                          className={`mt-0.5 text-xs leading-5 ${
                            active
                              ? "text-gray-300 dark:text-slate-600"
                              : "text-gray-400 dark:text-slate-500"
                          }`}
                        >
                          {section.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </aside>

            {/* Settings Content */}
            <section className="min-w-0">
              {/* PROFILE */}
              {activeSection === "profile" && (
                <div className="space-y-6">
                  <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
                    <div className="mb-6">
                      <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                        Profile Information
                      </h2>

                      <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
                        Update the information associated with your LOOP
                        workspace.
                      </p>
                    </div>

                    <div className="mb-8 flex items-center gap-4">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-900 text-xl font-bold text-white dark:bg-white dark:text-slate-950">
                        R
                      </div>

                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {firstName} {lastName}
                        </p>

                        <p className="text-sm text-gray-500 dark:text-slate-400">
                          Frontend Workspace Administrator
                        </p>
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="firstName"
                          className="mb-2 block text-sm font-medium text-gray-700 dark:text-slate-300"
                        >
                          First Name
                        </label>

                        <input
                          id="firstName"
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 outline-none transition focus:border-gray-400 focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-slate-500 dark:focus:bg-slate-800"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="lastName"
                          className="mb-2 block text-sm font-medium text-gray-700 dark:text-slate-300"
                        >
                          Last Name
                        </label>

                        <input
                          id="lastName"
                          type="text"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 outline-none transition focus:border-gray-400 focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-slate-500 dark:focus:bg-slate-800"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="mb-2 block text-sm font-medium text-gray-700 dark:text-slate-300"
                        >
                          Email Address
                        </label>

                        <input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 outline-none transition focus:border-gray-400 focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-slate-500 dark:focus:bg-slate-800"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="company"
                          className="mb-2 block text-sm font-medium text-gray-700 dark:text-slate-300"
                        >
                          Company / Workspace
                        </label>

                        <input
                          id="company"
                          type="text"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 outline-none transition focus:border-gray-400 focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-slate-500 dark:focus:bg-slate-800"
                        />
                      </div>
                    </div>

                    <div className="mt-6 flex justify-end">
                      <button
                        type="button"
                        onClick={handleSaveChanges}
                        className="rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
                      >
                        Save Profile
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* NOTIFICATIONS */}
              {activeSection === "notifications" && (
                <div className="space-y-6">
                  <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
                    <div className="mb-6">
                      <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                        Notification Preferences
                      </h2>

                      <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
                        Choose which updates and alerts you want to receive.
                      </p>
                    </div>

                    <div className="divide-y divide-gray-100 dark:divide-slate-800">
                      {/* Email */}
                      <div className="flex items-center justify-between gap-4 py-5 first:pt-0">
                        <div className="flex items-start gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-700 dark:bg-slate-800 dark:text-slate-300">
                            <Bell size={18} />
                          </div>

                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white">
                              Email Notifications
                            </p>

                            <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
                              Receive important workspace updates by email.
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            setEmailNotifications(!emailNotifications)
                          }
                          className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                            emailNotifications
                              ? "bg-gray-900 dark:bg-white"
                              : "bg-gray-300 dark:bg-slate-700"
                          }`}
                        >
                          <span
                            className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
                              emailNotifications
                                ? "left-6 dark:bg-slate-950"
                                : "left-1"
                            }`}
                          />
                        </button>
                      </div>

                      {/* Weekly */}
                      <div className="flex items-center justify-between gap-4 py-5">
                        <div className="flex items-start gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-700 dark:bg-slate-800 dark:text-slate-300">
                            <Monitor size={18} />
                          </div>

                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white">
                              Weekly Reports
                            </p>

                            <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
                              Get a weekly summary of feedback and analytics.
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => setWeeklyReports(!weeklyReports)}
                          className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                            weeklyReports
                              ? "bg-gray-900 dark:bg-white"
                              : "bg-gray-300 dark:bg-slate-700"
                          }`}
                        >
                          <span
                            className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
                              weeklyReports
                                ? "left-6 dark:bg-slate-950"
                                : "left-1"
                            }`}
                          />
                        </button>
                      </div>

                      {/* AI */}
                      <div className="flex items-center justify-between gap-4 py-5 last:pb-0">
                        <div className="flex items-start gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-700 dark:bg-slate-800 dark:text-slate-300">
                            <Shield size={18} />
                          </div>

                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white">
                              AI Insight Alerts
                            </p>

                            <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
                              Get notified when important AI insights are
                              detected.
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            setAiInsightAlerts(!aiInsightAlerts)
                          }
                          className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                            aiInsightAlerts
                              ? "bg-gray-900 dark:bg-white"
                              : "bg-gray-300 dark:bg-slate-700"
                          }`}
                        >
                          <span
                            className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
                              aiInsightAlerts
                                ? "left-6 dark:bg-slate-950"
                                : "left-1"
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    <div className="mt-6 flex justify-end">
                      <button
                        type="button"
                        onClick={handleSaveChanges}
                        className="rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
                      >
                        Save Preferences
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* SECURITY */}
              {activeSection === "security" && (
                <div className="space-y-6">
                  <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
                    <div className="mb-6">
                      <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                        Change Password
                      </h2>

                      <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
                        Update your account password to keep your workspace
                        secure.
                      </p>
                    </div>

                    <div className="space-y-5">
                      <div>
                        <label
                          htmlFor="currentPassword"
                          className="mb-2 block text-sm font-medium text-gray-700 dark:text-slate-300"
                        >
                          Current Password
                        </label>

                        <div className="relative">
                          <input
                            id="currentPassword"
                            type={showCurrentPassword ? "text" : "password"}
                            value={currentPassword}
                            onChange={(e) =>
                              setCurrentPassword(e.target.value)
                            }
                            placeholder="Enter current password"
                            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 pr-11 text-sm text-gray-900 outline-none transition focus:border-gray-400 focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-slate-500"
                          />

                          <button
                            type="button"
                            onClick={() =>
                              setShowCurrentPassword(!showCurrentPassword)
                            }
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 dark:hover:text-white"
                          >
                            {showCurrentPassword ? (
                              <EyeOff size={18} />
                            ) : (
                              <Eye size={18} />
                            )}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="newPassword"
                          className="mb-2 block text-sm font-medium text-gray-700 dark:text-slate-300"
                        >
                          New Password
                        </label>

                        <div className="relative">
                          <input
                            id="newPassword"
                            type={showNewPassword ? "text" : "password"}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Enter new password"
                            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 pr-11 text-sm text-gray-900 outline-none transition focus:border-gray-400 focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-slate-500"
                          />

                          <button
                            type="button"
                            onClick={() =>
                              setShowNewPassword(!showNewPassword)
                            }
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 dark:hover:text-white"
                          >
                            {showNewPassword ? (
                              <EyeOff size={18} />
                            ) : (
                              <Eye size={18} />
                            )}
                          </button>
                        </div>

                        <p className="mt-1.5 text-xs text-gray-400 dark:text-slate-500">
                          Password must contain at least 8 characters.
                        </p>
                      </div>

                      <div>
                        <label
                          htmlFor="confirmPassword"
                          className="mb-2 block text-sm font-medium text-gray-700 dark:text-slate-300"
                        >
                          Confirm New Password
                        </label>

                        <div className="relative">
                          <input
                            id="confirmPassword"
                            type={
                              showConfirmPassword ? "text" : "password"
                            }
                            value={confirmPassword}
                            onChange={(e) =>
                              setConfirmPassword(e.target.value)
                            }
                            placeholder="Confirm new password"
                            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 pr-11 text-sm text-gray-900 outline-none transition focus:border-gray-400 focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-slate-500"
                          />

                          <button
                            type="button"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 dark:hover:text-white"
                          >
                            {showConfirmPassword ? (
                              <EyeOff size={18} />
                            ) : (
                              <Eye size={18} />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex justify-end">
                      <button
                        type="button"
                        onClick={handlePasswordChange}
                        className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
                      >
                        <Lock size={16} />
                        Change Password
                      </button>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
                    <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                      <div className="flex items-start gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-700 dark:bg-slate-800 dark:text-slate-300">
                          <Shield size={20} />
                        </div>

                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h2 className="font-bold text-gray-900 dark:text-white">
                              Two-Factor Authentication
                            </h2>

                            <span
                              className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                                twoFactorEnabled
                                  ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
                                  : "bg-gray-100 text-gray-600 dark:bg-slate-800 dark:text-slate-400"
                              }`}
                            >
                              {twoFactorEnabled ? "Enabled" : "Disabled"}
                            </span>
                          </div>

                          <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
                            Add an extra layer of security to your account.
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleTwoFactor}
                        className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                          twoFactorEnabled
                            ? "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                            : "bg-gray-900 text-white hover:bg-gray-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
                        }`}
                      >
                        {twoFactorEnabled ? "Disable" : "Enable"}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* APPEARANCE */}
              {activeSection === "appearance" && (
                <div className="space-y-6">
                  <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
                    <div className="mb-6">
                      <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                        Appearance
                      </h2>

                      <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
                        Choose how the entire LOOP platform should appear.
                      </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                      {/* LIGHT */}
                      <button
                        type="button"
                        onClick={() => handleAppearanceChange("light")}
                        className={`rounded-2xl border p-4 text-left transition ${
                          appearance === "light"
                            ? "border-gray-900 bg-gray-50 ring-2 ring-gray-900 dark:border-white dark:bg-slate-800 dark:ring-white"
                            : "border-gray-200 hover:border-gray-400 dark:border-slate-700 dark:hover:border-slate-500"
                        }`}
                      >
                        <div className="mb-4 flex h-24 items-center justify-center rounded-xl border border-gray-200 bg-white dark:border-slate-700">
                          <Sun size={30} className="text-gray-700" />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white">
                              Light
                            </p>

                            <p className="mt-1 text-xs text-gray-500 dark:text-slate-400">
                              Bright interface
                            </p>
                          </div>

                          {appearance === "light" && (
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-white dark:bg-white dark:text-slate-950">
                              <Check size={14} />
                            </div>
                          )}
                        </div>
                      </button>

                      {/* DARK */}
                      <button
                        type="button"
                        onClick={() => handleAppearanceChange("dark")}
                        className={`rounded-2xl border p-4 text-left transition ${
                          appearance === "dark"
                            ? "border-gray-900 bg-gray-50 ring-2 ring-gray-900 dark:border-white dark:bg-slate-800 dark:ring-white"
                            : "border-gray-200 hover:border-gray-400 dark:border-slate-700 dark:hover:border-slate-500"
                        }`}
                      >
                        <div className="mb-4 flex h-24 items-center justify-center rounded-xl bg-gray-900 dark:bg-black">
                          <Moon size={30} className="text-white" />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white">
                              Dark
                            </p>

                            <p className="mt-1 text-xs text-gray-500 dark:text-slate-400">
                              Dark interface
                            </p>
                          </div>

                          {appearance === "dark" && (
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-white dark:bg-white dark:text-slate-950">
                              <Check size={14} />
                            </div>
                          )}
                        </div>
                      </button>

                      {/* SYSTEM */}
                      <button
                        type="button"
                        onClick={() => handleAppearanceChange("system")}
                        className={`rounded-2xl border p-4 text-left transition ${
                          appearance === "system"
                            ? "border-gray-900 bg-gray-50 ring-2 ring-gray-900 dark:border-white dark:bg-slate-800 dark:ring-white"
                            : "border-gray-200 hover:border-gray-400 dark:border-slate-700 dark:hover:border-slate-500"
                        }`}
                      >
                        <div className="mb-4 flex h-24 items-center justify-center rounded-xl bg-gradient-to-r from-white to-gray-900 dark:from-slate-800 dark:to-black">
                          <Monitor size={30} className="text-gray-500 dark:text-slate-300" />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white">
                              System
                            </p>

                            <p className="mt-1 text-xs text-gray-500 dark:text-slate-400">
                              Follow device settings
                            </p>
                          </div>

                          {appearance === "system" && (
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-white dark:bg-white dark:text-slate-950">
                              <Check size={14} />
                            </div>
                          )}
                        </div>
                      </button>
                    </div>

                    {/* Current Theme */}
                    <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-slate-700 dark:bg-slate-800">
                      <div className="flex items-start gap-3">
                        <Palette
                          size={18}
                          className="mt-0.5 shrink-0 text-gray-500 dark:text-slate-400"
                        />

                        <div>
                          <p className="text-sm font-semibold text-gray-800 dark:text-white">
                            Current appearance
                          </p>

                          <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
                            {appearance === "system"
                              ? "LOOP follows your device appearance setting."
                              : `LOOP is using ${appearance} appearance across the platform.`}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex justify-end">
                      <button
                        type="button"
                        onClick={handleSaveChanges}
                        className="rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
                      >
                        Save Appearance
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
