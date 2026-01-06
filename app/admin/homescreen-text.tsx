"use client";
import Sidebar from "../../components/Sidebar";
import { useEffect, useState } from "react";

export default function AdminHomeScreenTextPage() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch("/api/admin/homescreen-text")
      .then((res) => res.json())
      .then((data) => {
        setText(data.text || "");
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    await fetch("/api/admin/homescreen-text", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    setSuccess(true);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar active="Admin" />
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-semibold mb-4">Edit Home Screen Text</h2>
        <div className="bg-white rounded-xl shadow-sm border p-6 max-w-md">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <textarea
                className="border rounded p-2 min-h-[100px]"
                value={text}
                onChange={e => setText(e.target.value)}
                required
              />
              <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">Save</button>
              {success && <p className="text-green-600">Text updated!</p>}
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
