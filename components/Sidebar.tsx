"use client";
import { LayoutDashboard, Notebook, Search, BarChart2, Clock, Lock } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const navItems = [
	{ icon: <LayoutDashboard />, label: "Dashboard", href: "/dashboard" },
	{ icon: <Notebook />, label: "Notes", href: "/notes" },
	{ icon: <Search />, label: "Research", href: "/research" },
	{ icon: <Clock />, label: "Study Sessions", href: "/study-sessions" },
];

export default function Sidebar({ active }: { active?: string }) {
	const [isAdmin, setIsAdmin] = useState(false);
	useEffect(() => {
    if (typeof window !== "undefined") {
      setIsAdmin(localStorage.getItem("isAdmin") === "true");
    }
  }, []);

  return (
    <aside className="w-64 bg-white border-r p-6 flex flex-col justify-between min-h-screen">
      <div>
        <h1 className="text-xl font-bold text-indigo-600">StudyFrame</h1>
        <p className="text-sm text-gray-500 mb-6">AI-Powered Learning</p>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer ${
                active === item.label ? "bg-indigo-50 text-indigo-600" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
          {isAdmin && (
            <>
              <Link
                key="Admin"
                href="/admin"
                className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer ${
                  active === "Admin" ? "bg-indigo-50 text-indigo-600" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Lock size={16} />
                <span>Admin Panel</span>
              </Link>
            </>
          )}
        </nav>
      </div>
    </aside>
  );
}
