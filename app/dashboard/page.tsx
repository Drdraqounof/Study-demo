"use client";
import { Card, CardContent } from "../../components/ui/card";
import { BookOpen, Clock, TrendingUp } from "lucide-react";
import Sidebar from "../../components/Sidebar";
import Link from "next/link";

const notesCount = 4;
const studyHours = 47;
const weeklyProgress = "+15%";
const minutesStudied = 120; // Assuming this is the value for minutes studied this week

const recentActivities = [
  {
    title: "Introduction to React Hooks",
    type: "Note",
    time: "2 hours ago",
  },
  {
    title: "Database Design Principles",
    type: "Research",
    time: "5 hours ago",
  },
  {
    title: "Algorithm Complexity Notes",
    type: "Note",
    time: "Yesterday",
  },
];

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar active="Dashboard" />
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-semibold">Welcome back!</h2>
        <p className="text-gray-500 mb-6">Here's what's happening with your studies today.</p>
        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard icon={<BookOpen />} label="Total Notes" value={notesCount} />
          <StatCard icon={<Clock />} label="Minutes Studied This Week" value={minutesStudied} />
          <StatCard icon={<Clock />} label="Study Hours" value={studyHours} />
          <StatCard icon={<TrendingUp />} label="Weekly Progress" value={weeklyProgress} />
        </div>
        {/* Lower Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <Card className="lg:col-span-2">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Recent Activity</h3>
              {recentActivities.map((activity, index) => (
                <ActivityItem
                  key={index}
                  title={activity.title}
                  type={activity.type}
                  time={activity.time}
                />
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

type NavItemProps = {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  href: string;
};
function NavItem({ icon, label, active, href }: NavItemProps) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer ${
        active ? "bg-indigo-50 text-indigo-600" : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}

type StatCardProps = {
  icon: React.ReactNode;
  label: string;
  value: string | number;
};
function StatCard({ icon, label, value }: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-6 flex items-center gap-4">
        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">{icon}</div>
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="text-xl font-semibold">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}

type ActivityItemProps = {
  title: string;
  type: string;
  time: string;
  status?: string;
};
function ActivityItem({ title, type, time, status }: ActivityItemProps) {
  return (
    <div className="flex justify-between items-center py-3 border-b last:border-none">
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-gray-500">{type} • {time}</p>
      </div>
      {status && (
        <span className="text-xs px-3 py-1 rounded-full bg-purple-100 text-purple-600">
          {status}
        </span>
      )}
    </div>
  );
}

type TaskItemProps = {
  title: string;
  date: string;
  priority: string;
};
function TaskItem({ title, date, priority }: TaskItemProps) {
  const color = priority === "High" ? "bg-red-100 text-red-600" : "bg-yellow-100 text-yellow-600";

  return (
    <div className="border rounded-xl p-4 mb-3">
      <p className="font-medium">{title}</p>
      <div className="flex justify-between items-center mt-2">
        <span className="text-sm text-gray-500">{date}</span>
        <span className={`text-xs px-3 py-1 rounded-full ${color}`}>{priority}</span>
      </div>
    </div>
  );
}