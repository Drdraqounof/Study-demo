"use client";

import { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, Music } from "lucide-react";
import Sidebar from "../../components/Sidebar";

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
};

// Mock Timer Context for demo
const useTimer = () => {
  const [mode, setMode] = useState<"focus" | "break" | "vibe">("focus");
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [totalTime, setTotalTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [musicOn, setMusicOn] = useState(false);

  useEffect(() => {
    // Load timer state from localStorage on mount
    const savedState = localStorage.getItem("timerState");
    if (savedState) {
      const { mode, timeLeft, totalTime, isRunning, musicOn } = JSON.parse(savedState);
      setMode(mode);
      setTimeLeft(timeLeft);
      setTotalTime(totalTime);
      setIsRunning(isRunning);
      setMusicOn(musicOn);
    }
  }, []);

  useEffect(() => {
    // Save timer state to localStorage whenever it changes
    const timerState = { mode, timeLeft, totalTime, isRunning, musicOn };
    localStorage.setItem("timerState", JSON.stringify(timerState));
  }, [mode, timeLeft, totalTime, isRunning, musicOn]);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setTimeLeft((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning]);

  const startTimer = (newMode: "focus" | "break" | "vibe", duration: number) => {
    setMode(newMode);
    setTimeLeft(duration);
    setTotalTime(duration);
    setIsRunning(true);
  };

  const pauseTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(totalTime);
  };

  return { mode, timeLeft, totalTime, isRunning, musicOn, setMusicOn, startTimer, pauseTimer, resetTimer };
};

export default function StudySessionsPage() {
  const { mode, timeLeft, totalTime, isRunning, musicOn, setMusicOn, startTimer, pauseTimer, resetTimer } = useTimer();

  const progress = totalTime > 0 ? ((totalTime - timeLeft) / totalTime) * 100 : 0;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar active="Study Sessions" />
      <main className="flex-1 p-8 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-2">Study Sessions</h2>
        <p className="text-gray-500 mb-8">
          Focus, break, or vibe — your timer keeps running in the background.
        </p>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-10 max-w-lg mx-auto">
          {/* Timer Display */}
          <div className="text-center mb-8">
            <p className="text-sm text-gray-500 mb-2 uppercase tracking-wide">{mode} mode</p>
            <h1 className="text-7xl font-bold text-gray-900 mb-1">{formatTime(timeLeft)}</h1>
          </div>

          {/* Progress Bar */}
          <div className="relative h-2 bg-gray-100 rounded-full mb-8 overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-gray-900 rounded-full transition-all duration-1000 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Wave Animation (when music is on) */}
          {musicOn && (
            <div className="flex items-center justify-center gap-1.5 h-16 mb-6">
              {[...Array(7)].map((_, i) => {
                const colors = ['bg-purple-400', 'bg-purple-500', 'bg-purple-600', 'bg-indigo-500', 'bg-purple-600', 'bg-purple-500', 'bg-purple-400'];
                return (
                  <div
                    key={i}
                    className={`w-1.5 ${colors[i]} rounded-full animate-wave`}
                    style={{
                      animation: `wave ${0.8 + (i * 0.1)}s ease-in-out infinite`,
                      animationDelay: `${i * 0.1}s`,
                      height: '100%'
                    }}
                  />
                );
              })}
              <style jsx>{`
                @keyframes wave {
                  0%, 100% { transform: scaleY(0.2); }
                  50% { transform: scaleY(1); }
                }
              `}</style>
            </div>
          )}

          {/* Mode Selection */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={() => startTimer("focus", 25 * 60)}
              className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
                mode === "focus" 
                  ? "bg-gray-900 text-white" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Focus
            </button>

            <button
              onClick={() => startTimer("break", 5 * 60)}
              className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
                mode === "break" 
                  ? "bg-gray-900 text-white" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Break
            </button>

            <button
              onClick={() => startTimer("vibe", 30 * 60)}
              className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
                mode === "vibe" 
                  ? "bg-gray-900 text-white" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Vibe
            </button>
          </div>

          {/* Controls */}
          <div className="flex gap-3">
            <button
              onClick={isRunning ? pauseTimer : () => startTimer(mode, timeLeft || 25 * 60)}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              {isRunning ? (
                <>
                  <Pause size={18} />
                  Pause
                </>
              ) : (
                <>
                  <Play size={18} />
                  Start
                </>
              )}
            </button>

            <button
              onClick={resetTimer}
              className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              title="Reset"
            >
              <RotateCcw size={18} />
            </button>

            <button
              onClick={() => setMusicOn(!musicOn)}
              className={`px-4 py-3 rounded-lg transition-colors ${
                musicOn 
                  ? "bg-gray-900 text-white" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              title="Toggle Music"
            >
              <Music size={18} />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}