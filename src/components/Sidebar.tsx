// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import {
//   BarChart3,
//   Brain,
//   FileText,
//   LayoutDashboard,
//   MessageSquare,
//   Settings,
//   Users,
//   HelpCircle,
// } from "lucide-react";

// const navigation = [
//   {
//     name: "Overview",
//     href: "/dashboard",
//     icon: LayoutDashboard,
//   },
//   {
//     name: "Feedback",
//     href: "/feedback",
//     icon: MessageSquare,
//   },
//   {
//     name: "Customers",
//     href: "/customers",
//     icon: Users,
//   },
//   {
//     name: "AI Insights",
//     href: "/insights",
//     icon: Brain,
//   },
//   {
//     name: "Analytics",
//     href: "/analytics",
//     icon: BarChart3,
//   },
//   {
//     name: "Reports",
//     href: "/reports",
//     icon: FileText,
//   },
// ];

// export default function Sidebar() {
//   const pathname = usePathname();

//   return (
//     <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-slate-800 bg-slate-950 text-white md:flex">
//       {/* Logo */}
//       <div className="flex h-16 shrink-0 items-center border-b border-slate-800 px-6">
//         <Link href="/" className="flex items-center gap-3">
//           <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white font-bold text-slate-950">
//             L
//           </div>

//           <div>
//             <p className="font-bold tracking-wide">LOOP</p>
//             <p className="text-[10px] text-slate-500">
//               FEEDBACK INTELLIGENCE
//             </p>
//           </div>
//         </Link>
//       </div>

//       {/* Main Navigation */}
//       <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-6">
//         <p className="mb-3 px-3 text-xs font-medium uppercase tracking-wider text-slate-500">
//           Workspace
//         </p>

//         {navigation.map((item) => {
//           const Icon = item.icon;

//           const active =
//             pathname === item.href ||
//             (item.href !== "/dashboard" &&
//               pathname.startsWith(`${item.href}/`));

//           return (
//             <Link
//               key={item.name}
//               href={item.href}
//               className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-md transition ${
//                 active
//                   ? "bg-slate-800 text-white"
//                   : "text-slate-400 hover:bg-slate-900 hover:text-white"
//               }`}
//             >
//               <Icon size={18} />
//               {item.name}
//             </Link>
//           );
//         })}
//       </nav>

//       {/* Bottom Navigation */}
//       <div className="shrink-0 space-y-1 border-t border-slate-800 p-4">
//         <Link
//           href="/settings"
//           className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
//             pathname === "/settings"
//               ? "bg-slate-800 text-white"
//               : "text-slate-400 hover:bg-slate-900 hover:text-white"
//           }`}
//         >
//           <Settings size={18} />
//           Settings
//         </Link>

//         <Link
//           href="/help"
//           className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
//             pathname === "/help"
//               ? "bg-slate-800 text-white"
//               : "text-slate-400 hover:bg-slate-900 hover:text-white"
//           }`}
//         >
//           <HelpCircle size={18} />
//           Help & Support
//         </Link>
//       </div>
//     </aside>
//   );
// }


// ```tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  BarChart3,
  Brain,
  FileText,
  HelpCircle,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Users,
  X,
} from "lucide-react";
import { usePathname } from "next/navigation";

const navItems = [
  {
    name: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Feedback",
    href: "/feedback",
    icon: MessageSquare,
  },
  {
    name: "Customers",
    href: "/customers",
    icon: Users,
  },
  {
    name: "AI Insights",
    href: "/insights",
    icon: Brain,
  },
  {
    name: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    name: "Reports",
    href: "/reports",
    icon: FileText,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
  {
    name: "Help & Support",
    href: "/help",
    icon: HelpCircle,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Listen for the mobile menu button from Topbar
  useEffect(() => {
    const openMenu = () => setMobileOpen(true);

    window.addEventListener("loop-open-mobile-menu", openMenu);

    return () => {
      window.removeEventListener("loop-open-mobile-menu", openMenu);
    };
  }, []);

  // Close mobile menu when navigating
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const sidebarContent = (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b border-slate-800 px-6">
        {/* <Link
          href="/"
          className="text-2xl font-bold tracking-tight text-white"
        >
          LOOP
        </Link> */}
        <div className="flex h-16 shrink-0 items-center border-b border-slate-800 px-6">
         <Link href="/" className="flex items-center gap-3">
           <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white font-bold text-slate-950">
             L
           </div>

          <div>
            <p className="font-bold tracking-wide">LOOP</p>
             <p className="text-[10px] text-slate-500">
               FEEDBACK INTELLIGENCE
             </p>
           </div>
         </Link>
       </div>

        {/* Close button - mobile only */}
        <button
          type="button"
          onClick={() => setMobileOpen(false)}
          className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white md:hidden"
          aria-label="Close menu"
        >
          <X size={21} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-5">
        {navItems.map((item) => {
          const Icon = item.icon;

          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" &&
              pathname.startsWith(`${item.href}/`));

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-white text-slate-900"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Icon size={19} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="border-t border-slate-800 p-4">
        <div className="rounded-xl bg-slate-900 p-4">
          <p className="text-sm font-semibold text-white">
            AI Feedback Intelligence
          </p>

          <p className="mt-1 text-xs leading-5 text-slate-400">
            Turn customer feedback into actionable insights.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-slate-800 bg-slate-950 text-white md:flex">
        {sidebarContent}
      </aside>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close menu overlay"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-950 text-white shadow-2xl transition-transform duration-300 md:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
