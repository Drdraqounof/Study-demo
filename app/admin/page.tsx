"use client";
import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

export default function AdminPage() {
  const [visits, setVisits] = useState<number | null>(null);
  const [visitsData, setVisitsData] = useState<any[]>([]);
  const [studyStats, setStudyStats] = useState<{ hours: number; minutes: number } | null>(null);
  const [homeScreenText, setHomeScreenText] = useState<string>("");

  useEffect(() => {
    // Fetch visits data
    fetch("/api/visits")
      .then(res => res.json())
      .then(data => {
        setVisits(data.total);
        setVisitsData(data.visits);
      });

    // Fetch study stats
    fetch("/api/admin/study-stats")
      .then(res => res.json())
      .then(data => {
        setStudyStats({ hours: data.hours, minutes: data.minutes });
      });

    // Fetch home screen text
    fetch("/api/admin/homescreen-text")
      .then(res => res.json())
      .then(data => {
        setHomeScreenText(data.text);
      });
  }, []);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800 text-white px-4 py-2 rounded-lg shadow-xl border border-slate-700">
          <p className="font-semibold">{payload[0].payload.date}</p>
          <p className="text-indigo-300">{payload[0].value} visits</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Sidebar active="Admin" />
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-slate-800 mb-2">Admin Dashboard</h2>
            <p className="text-slate-600">Overview of your platform analytics</p>
            {homeScreenText && (
              <div className="mt-4 p-4 bg-indigo-100 border border-indigo-200 rounded-xl">
                <p className="text-indigo-800 text-lg font-medium">{homeScreenText}</p>
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Total Visits Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white/80 text-sm font-medium mb-1">Total Visits</h3>
                    <p className="text-4xl font-bold text-white">
                      {visits !== null ? visits.toLocaleString() : "Loading..."}
                    </p>
                  </div>
                  <div className="bg-white/20 p-4 rounded-xl">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h4 className="text-sm font-semibold text-slate-700 mb-4">Visit Trends</h4>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={visitsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 12 }} />
                    <YAxis allowDecimals={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="visits" fill="url(#colorGradient)" radius={[8, 8, 0, 0]} />
                    <defs>
                      <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6366f1" stopOpacity={1} />
                        <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.8} />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Total Study Time Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white/80 text-sm font-medium mb-1">Total Study Time</h3>
                    <p className="text-4xl font-bold text-white">
                      {studyStats !== null ? `${studyStats.hours}h ${studyStats.minutes}m` : "Loading..."}
                    </p>
                  </div>
                  <div className="bg-white/20 p-4 rounded-xl">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 font-medium">Hours Logged</p>
                      <p className="text-2xl font-bold text-slate-800">{studyStats?.hours || 0}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 font-medium">Minutes Logged</p>
                      <p className="text-2xl font-bold text-slate-800">{studyStats?.minutes || 0}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}