"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function QuestionsPage() {
  const [aiUsed, setAiUsed] = useState("");
  const [appsUsed, setAppsUsed] = useState("");
  const [educationLevel, setEducationLevel] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (submitted) {
      localStorage.setItem("surveyDone", "true");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    }
  }, [submitted, router]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    // You can handle storing or sending answers here
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* <Sidebar active="Questions" /> */}
      <main className="flex-1 p-8 flex flex-col items-center justify-center">
        <div className="bg-white rounded-xl shadow-sm border p-8 max-w-md w-full">
          <h2 className="text-2xl font-semibold mb-6 text-center">Quick Questions</h2>
          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div>
                <label htmlFor="study-challenges" className="font-medium mb-2 block">
                  Do you find it challenging to manage your time effectively?
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="study-challenges" value="yes" required /> Yes
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="study-challenges" value="no" required /> No
                  </label>
                </div>
              </div>

              <div>
                <label htmlFor="organize-materials" className="font-medium mb-2 block">
                  Do you currently use any tools to organize your study materials?
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="organize-materials" value="yes" required /> Yes
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="organize-materials" value="no" required /> No
                  </label>
                </div>
              </div>

              <div>
                <label htmlFor="productivity-apps" className="font-medium mb-2 block">
                  Have you used any productivity or study apps before?
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="productivity-apps" value="yes" required /> Yes
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="productivity-apps" value="no" required /> No
                  </label>
                </div>
              </div>

              <div>
                <label htmlFor="ai-assistant" className="font-medium mb-2 block">
                  Do you think an AI assistant could help you with your studies?
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="ai-assistant" value="yes" required /> Yes
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="ai-assistant" value="no" required /> No
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
              >
                Submit
              </button>
            </form>
          ) : (
            <div className="text-center">
              <h3 className="text-lg font-medium mb-2">Thank you for your responses!</h3>
              <p className="text-gray-500">Redirecting to login...</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
