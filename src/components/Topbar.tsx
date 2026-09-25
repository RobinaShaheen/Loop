// // "use client";

// // import { Bell, Search } from "lucide-react";

// // export default function Topbar() {
// //   return (
// //     <header className="fixed left-0 right-0 top-0 z-30 h-16 border-b border-gray-200 bg-white md:left-64">
// //       <div className="flex h-full items-center justify-between px-4 sm:px-6">
// //         {/* Search */}
// //         <div className="relative w-full max-w-md">
// //           <Search
// //             size={18}
// //             className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
// //           />

// //           <input
// //             type="text"
// //             placeholder="Search..."
// //             className="w-full rounded-xl border text-black border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-gray-400 focus:bg-white"
// //           />
// //         </div>

// //         {/* Right Side */}
// //         <div className="ml-4 flex items-center gap-4">
// //           <button
// //             type="button"
// //             className="relative rounded-xl p-2 text-gray-500 hover:bg-gray-100"
// //           >
// //             <Bell size={19} />

// //             <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
// //           </button>

// //           <div className="hidden items-center gap-3 sm:flex">
// //             <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-sm font-semibold text-white">
// //               R
// //             </div>

// //             <div className="leading-tight">
// //               <p className="text-sm font-semibold text-gray-900">Robina</p>
// //               <p className="text-xs text-gray-500">Administrator</p>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </header>
// //   );
// // }

// // ```tsx
// "use client";

// import Link from "next/link";
// import { useEffect, useRef, useState } from "react";
// import {
//   Bell,
//   ChevronDown,
//   HelpCircle,
//   LayoutDashboard,
//   MessageSquare,
//   Search,
//   Settings,
//   Users,
//   X,
//   BarChart3,
//   Brain,
//   FileText,
//   Check,
// } from "lucide-react";

// const searchItems = [
//   {
//     name: "Overview",
//     description: "Dashboard and workspace summary",
//     href: "/dashboard",
//     icon: LayoutDashboard,
//   },
//   {
//     name: "Feedback",
//     description: "Manage customer feedback",
//     href: "/feedback",
//     icon: MessageSquare,
//   },
//   {
//     name: "Customers",
//     description: "Manage customer profiles",
//     href: "/customers",
//     icon: Users,
//   },
//   {
//     name: "AI Insights",
//     description: "AI-powered feedback insights",
//     href: "/insights",
//     icon: Brain,
//   },
//   {
//     name: "Analytics",
//     description: "Feedback analytics and trends",
//     href: "/analytics",
//     icon: BarChart3,
//   },
//   {
//     name: "Reports",
//     description: "Create and manage reports",
//     href: "/reports",
//     icon: FileText,
//   },
//   {
//     name: "Settings",
//     description: "Manage account settings",
//     href: "/settings",
//     icon: Settings,
//   },
//   {
//     name: "Help & Support",
//     description: "Get help and contact support",
//     href: "/help",
//     icon: HelpCircle,
//   },
// ];

// const notifications = [
//   {
//     id: 1,
//     title: "New feedback received",
//     description: "A new customer feedback entry was added.",
//     time: "5 min ago",
//   },
//   {
//     id: 2,
//     title: "AI analysis completed",
//     description: "Your latest feedback analysis is ready.",
//     time: "18 min ago",
//   },
//   {
//     id: 3,
//     title: "Weekly report ready",
//     description: "Your latest feedback report is available.",
//     time: "1 hour ago",
//   },
// ];

// export default function Topbar() {
//   const [search, setSearch] = useState("");
//   const [showSearchResults, setShowSearchResults] = useState(false);
//   const [showNotifications, setShowNotifications] = useState(false);
//   const [showProfile, setShowProfile] = useState(false);
//   const [notificationsRead, setNotificationsRead] = useState(false);

//   const searchRef = useRef<HTMLDivElement>(null);
//   const notificationRef = useRef<HTMLDivElement>(null);
//   const profileRef = useRef<HTMLDivElement>(null);

//   const filteredItems = searchItems.filter((item) =>
//     `${item.name} ${item.description}`
//       .toLowerCase()
//       .includes(search.toLowerCase().trim())
//   );

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       const target = event.target as Node;

//       if (
//         searchRef.current &&
//         !searchRef.current.contains(target)
//       ) {
//         setShowSearchResults(false);
//       }

//       if (
//         notificationRef.current &&
//         !notificationRef.current.contains(target)
//       ) {
//         setShowNotifications(false);
//       }

//       if (
//         profileRef.current &&
//         !profileRef.current.contains(target)
//       ) {
//         setShowProfile(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const handleSearchChange = (value: string) => {
//     setSearch(value);
//     setShowSearchResults(value.trim().length > 0);
//   };

//   const clearSearch = () => {
//     setSearch("");
//     setShowSearchResults(false);
//   };

//   const handleNotificationClick = () => {
//     setShowNotifications((current) => !current);
//     setShowProfile(false);
//   };

//   const handleProfileClick = () => {
//     setShowProfile((current) => !current);
//     setShowNotifications(false);
//   };

//   return (
//     <header className="fixed left-0 right-0 top-0 z-30 h-16 border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 md:left-64">
//       <div className="flex h-full items-center justify-between px-4 sm:px-6">
//         {/* Search */}
//         <div
//           ref={searchRef}
//           className="relative w-full max-w-md"
//         >
//           <Search
//             size={18}
//             className="absolute left-3 top-1/2 z-10 -translate-y-1/2 text-gray-400"
//           />

//           <input
//             type="text"
//             value={search}
//             onChange={(event) =>
//               handleSearchChange(event.target.value)
//             }
//             onFocus={() => {
//               if (search.trim()) {
//                 setShowSearchResults(true);
//               }
//             }}
//             placeholder="Search LOOP..."
//             className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-10 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-gray-600 dark:focus:bg-gray-800"
//           />

//           {search && (
//             <button
//               type="button"
//               onClick={clearSearch}
//               aria-label="Clear search"
//               className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-1 text-gray-400 transition hover:bg-gray-200 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-white"
//             >
//               <X size={16} />
//             </button>
//           )}

//           {/* Search Results */}
//           {showSearchResults && (
//             <div className="absolute left-0 right-0 top-full mt-2 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-900">
//               {filteredItems.length > 0 ? (
//                 <div className="max-h-96 overflow-y-auto p-2">
//                   <p className="px-3 py-2 text-xs font-medium uppercase tracking-wider text-gray-400">
//                     Quick Navigation
//                   </p>

//                   {filteredItems.map((item) => {
//                     const Icon = item.icon;

//                     return (
//                       <Link
//                         key={item.href}
//                         href={item.href}
//                         onClick={clearSearch}
//                         className="flex items-center gap-3 rounded-xl px-3 py-3 transition hover:bg-gray-50 dark:hover:bg-gray-800"
//                       >
//                         <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200">
//                           <Icon size={17} />
//                         </div>

//                         <div className="min-w-0">
//                           <p className="text-sm font-medium text-gray-900 dark:text-white">
//                             {item.name}
//                           </p>

//                           <p className="truncate text-xs text-gray-500 dark:text-gray-400">
//                             {item.description}
//                           </p>
//                         </div>
//                       </Link>
//                     );
//                   })}
//                 </div>
//               ) : (
//                 <div className="px-5 py-8 text-center">
//                   <Search
//                     size={22}
//                     className="mx-auto mb-2 text-gray-400"
//                   />

//                   <p className="text-sm font-medium text-gray-900 dark:text-white">
//                     No results found
//                   </p>

//                   <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
//                     Try searching for Feedback, Analytics, Customers, or
//                     Settings.
//                   </p>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Right Side */}
//         <div className="ml-4 flex items-center gap-2 sm:gap-3">
//           {/* Notifications */}
//           <div
//             ref={notificationRef}
//             className="relative"
//           >
//             <button
//               type="button"
//               onClick={handleNotificationClick}
//               aria-label="Notifications"
//               aria-expanded={showNotifications}
//               className="relative rounded-xl p-2.5 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
//             >
//               <Bell size={19} />

//               {!notificationsRead && (
//                 <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
//               )}
//             </button>

//             {/* Notification Dropdown */}
//             {showNotifications && (
//               <div className="absolute right-0 top-full mt-2 w-80 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-900 sm:w-96">
//                 <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3 dark:border-gray-800">
//                   <div>
//                     <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
//                       Notifications
//                     </h3>

//                     <p className="text-xs text-gray-500 dark:text-gray-400">
//                       Recent activity in your workspace
//                     </p>
//                   </div>

//                   <button
//                     type="button"
//                     onClick={() => setNotificationsRead(true)}
//                     className="flex items-center gap-1 text-xs font-medium text-gray-600 hover:underline dark:text-gray-300"
//                   >
//                     <Check size={14} />
//                     Mark read
//                   </button>
//                 </div>

//                 <div className="divide-y divide-gray-100 dark:divide-gray-800">
//                   {notifications.map((notification) => (
//                     <button
//                       key={notification.id}
//                       type="button"
//                       className="flex w-full gap-3 px-4 py-4 text-left transition hover:bg-gray-50 dark:hover:bg-gray-800"
//                     >
//                       <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-gray-900 dark:bg-white" />

//                       <div className="min-w-0">
//                         <p className="text-sm font-medium text-gray-900 dark:text-white">
//                           {notification.title}
//                         </p>

//                         <p className="mt-1 text-xs leading-5 text-gray-500 dark:text-gray-400">
//                           {notification.description}
//                         </p>

//                         <p className="mt-1.5 text-[11px] text-gray-400">
//                           {notification.time}
//                         </p>
//                       </div>
//                     </button>
//                   ))}
//                 </div>

//                 <div className="border-t border-gray-100 p-3 dark:border-gray-800">
//                   <button
//                     type="button"
//                     onClick={() => setNotificationsRead(true)}
//                     className="w-full rounded-xl py-2 text-center text-xs font-medium text-gray-600 transition hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
//                   >
//                     Mark all as read
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Profile */}
//           <div
//             ref={profileRef}
//             className="relative"
//           >
//             <button
//               type="button"
//               onClick={handleProfileClick}
//               aria-label="Open profile menu"
//               aria-expanded={showProfile}
//               className="flex items-center gap-2 rounded-xl p-1.5 transition hover:bg-gray-100 dark:hover:bg-gray-800 sm:gap-3 sm:pr-2"
//             >
//               <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-sm font-semibold text-white dark:bg-white dark:text-gray-900">
//                 R
//               </div>

//               <div className="hidden text-left leading-tight sm:block">
//                 <p className="text-sm font-semibold text-gray-900 dark:text-white">
//                   Robina
//                 </p>

//                 <p className="text-xs text-gray-500 dark:text-gray-400">
//                   Administrator
//                 </p>
//               </div>

//               <ChevronDown
//                 size={16}
//                 className={`hidden text-gray-400 transition sm:block ${
//                   showProfile ? "rotate-180" : ""
//                 }`}
//               />
//             </button>

//             {/* Profile Dropdown */}
//             {showProfile && (
//               <div className="absolute right-0 top-full mt-2 w-64 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-900">
//                 <div className="border-b border-gray-100 p-4 dark:border-gray-800">
//                   <div className="flex items-center gap-3">
//                     <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-900 text-sm font-semibold text-white dark:bg-white dark:text-gray-900">
//                       R
//                     </div>

//                     <div className="min-w-0">
//                       <p className="text-sm font-semibold text-gray-900 dark:text-white">
//                         Robina Shaheen
//                       </p>

//                       <p className="truncate text-xs text-gray-500 dark:text-gray-400">
//                         Administrator
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="p-2">
//                   <Link
//                     href="/settings"
//                     onClick={() => setShowProfile(false)}
//                     className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-gray-700 transition hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
//                   >
//                     <Settings size={17} />
//                     Account Settings
//                   </Link>

//                   <Link
//                     href="/help"
//                     onClick={() => setShowProfile(false)}
//                     className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-gray-700 transition hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
//                   >
//                     <HelpCircle size={17} />
//                     Help & Support
//                   </Link>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }
// // ```

"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  BarChart3,
  Bell,
  Brain,
  Check,
  ChevronDown,
  FileText,
  HelpCircle,
  LayoutDashboard,
  Menu,
  MessageSquare,
  Search,
  Settings,
  Users,
  X,
} from "lucide-react";

const searchItems = [
  {
    name: "Overview",
    description: "Dashboard and workspace summary",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Feedback",
    description: "Manage customer feedback",
    href: "/feedback",
    icon: MessageSquare,
  },
  {
    name: "Customers",
    description: "Manage customer profiles",
    href: "/customers",
    icon: Users,
  },
  {
    name: "AI Insights",
    description: "AI-powered feedback insights",
    href: "/insights",
    icon: Brain,
  },
  {
    name: "Analytics",
    description: "Feedback analytics and trends",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    name: "Reports",
    description: "Create and manage reports",
    href: "/reports",
    icon: FileText,
  },
  {
    name: "Settings",
    description: "Manage account settings",
    href: "/settings",
    icon: Settings,
  },
  {
    name: "Help & Support",
    description: "Get help and contact support",
    href: "/help",
    icon: HelpCircle,
  },
];

type SupportNotification = {
  id: number;
  name: string;
  email: string;
  message: string;
  status: string;
  createdAt: string;
};

export default function Topbar() {
  const [search, setSearch] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [notificationsRead, setNotificationsRead] = useState(false);
  const [supportNotifications, setSupportNotifications] = useState<SupportNotification[]>([]);

  const searchRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const filteredSearchItems = search.trim()
    ? searchItems.filter(
        (item) =>
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.description.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  useEffect(() => {
    fetch("/api/support")
      .then((response) => response.json())
      .then((result) => {
        if (Array.isArray(result?.data)) {
          setSupportNotifications(result.data);
        }
      })
      .catch(() => setSupportNotifications([]));
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        searchRef.current &&
        !searchRef.current.contains(target)
      ) {
        setShowSearchResults(false);
      }

      if (
        notificationRef.current &&
        !notificationRef.current.contains(target)
      ) {
        setShowNotifications(false);
      }

      if (
        profileRef.current &&
        !profileRef.current.contains(target)
      ) {
        setShowProfile(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const openMobileMenu = () => {
    window.dispatchEvent(new Event("loop-open-mobile-menu"));
  };

  const handleMarkAllRead = () => {
    setNotificationsRead(true);
  };

  const unreadCount = notificationsRead
    ? 0
    : supportNotifications.filter((item) => item.status === "New").length;

  return (
    <header className="fixed left-0 right-0 top-0 z-30 h-16 border-b border-gray-200 bg-white dark:border-slate-800 dark:bg-slate-950 md:left-64">
      <div className="flex h-full items-center justify-between px-3 sm:px-6">
        {/* Left side */}
        <div className="flex min-w-0 flex-1 items-center gap-3">
          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={openMobileMenu}
            className="rounded-xl p-2 text-gray-600 transition hover:bg-gray-100 hover:text-gray-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white md:hidden"
            aria-label="Open menu"
          >
            <Menu size={23} />
          </button>

          {/* Search */}
          <div
            ref={searchRef}
            className="relative w-full max-w-md"
          >
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setShowSearchResults(true);
              }}
              onFocus={() => {
                if (search.trim()) {
                  setShowSearchResults(true);
                }
              }}
              placeholder="Search modules..."
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-white dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-slate-500 dark:focus:bg-slate-900"
            />

            {/* Search Results */}
            {showSearchResults && search.trim() && (
              <div className="absolute left-0 right-0 top-12 z-50 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900">
                {filteredSearchItems.length > 0 ? (
                  <div className="p-2">
                    {filteredSearchItems.map((item) => {
                      const Icon = item.icon;

                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => {
                            setSearch("");
                            setShowSearchResults(false);
                          }}
                          className="flex items-center gap-3 rounded-lg px-3 py-3 transition hover:bg-gray-100 dark:hover:bg-slate-800"
                        >
                          <div className="rounded-lg bg-gray-100 p-2 text-gray-600 dark:bg-slate-800 dark:text-slate-300">
                            <Icon size={17} />
                          </div>

                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">
                              {item.name}
                            </p>

                            <p className="truncate text-xs text-gray-500 dark:text-slate-400">
                              {item.description}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                ) : (
                  <div className="px-4 py-6 text-center text-sm text-gray-500 dark:text-slate-400">
                    No matching module found.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Side */}
        <div className="ml-3 flex items-center gap-1 sm:gap-3">
          {/* Notifications */}
          <div ref={notificationRef} className="relative">
            <button
              type="button"
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowProfile(false);
                setShowSearchResults(false);
              }}
              className="relative rounded-xl p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
              aria-label="Notifications"
            >
              <Bell size={20} />

              {unreadCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 top-12 z-50 w-80 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900 sm:w-96">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3 dark:border-slate-800">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                      Notifications
                    </h3>

                    <p className="text-xs text-gray-500 dark:text-slate-400">
                      Recent activity in LOOP
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleMarkAllRead}
                    className="text-xs font-medium text-gray-600 hover:text-gray-900 dark:text-slate-400 dark:hover:text-white"
                  >
                    <span className="flex items-center gap-1">
                      <Check size={14} />
                      Mark all read
                    </span>
                  </button>
                </div>

                {/* Notification items */}
                <div className="max-h-96 overflow-y-auto">
                  {supportNotifications.length > 0 ? supportNotifications.map((notification) => (
                    <Link
                      key={notification.id}
                      href="/help"
                      onClick={() => {
                        setShowNotifications(false);
                        setNotificationsRead(true);
                      }}
                      className="block border-b border-gray-100 px-4 py-4 transition hover:bg-gray-50 dark:border-slate-800 dark:hover:bg-slate-800/70"
                    >
                      <div className="flex gap-3">
                        <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-blue-500" />
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">
                            Support message from {notification.name}
                          </p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500 dark:text-slate-400">
                            {notification.message}
                          </p>
                          <p className="mt-1.5 text-[11px] text-gray-400 dark:text-slate-500">
                            {new Date(notification.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </Link>
                  )) : (
                    <p className="px-4 py-8 text-center text-sm text-gray-500 dark:text-slate-400">
                      No support messages yet.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div ref={profileRef} className="relative">
            <button
              type="button"
              onClick={() => {
                setShowProfile(!showProfile);
                setShowNotifications(false);
                setShowSearchResults(false);
              }}
              className="flex items-center gap-2 rounded-xl p-1.5 transition hover:bg-gray-100 dark:hover:bg-slate-800"
              aria-label="Open profile menu"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-sm font-semibold text-white dark:bg-white dark:text-slate-900">
                R
              </div>

              <div className="hidden text-left leading-tight sm:block">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  Robina
                </p>

                <p className="text-xs text-gray-500 dark:text-slate-400">
                  Administrator
                </p>
              </div>

              <ChevronDown
                size={15}
                className="hidden text-gray-400 sm:block"
              />
            </button>

            {showProfile && (
              <div className="absolute right-0 top-12 z-50 w-64 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900">
                <div className="border-b border-gray-100 px-4 py-4 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 font-semibold text-white dark:bg-white dark:text-slate-900">
                      R
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        Robina Shaheen
                      </p>

                      <p className="text-xs text-gray-500 dark:text-slate-400">
                        Administrator
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-2">
                  <Link
                    href="/settings"
                    onClick={() => setShowProfile(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 transition hover:bg-gray-100 dark:text-slate-300 dark:hover:bg-slate-800"
                  >
                    <Settings size={17} />
                    Account Settings
                  </Link>

                  <Link
                    href="/help"
                    onClick={() => setShowProfile(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 transition hover:bg-gray-100 dark:text-slate-300 dark:hover:bg-slate-800"
                  >
                    <HelpCircle size={17} />
                    Help & Support
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}