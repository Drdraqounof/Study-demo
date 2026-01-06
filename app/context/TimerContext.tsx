"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";

type TimerMode = "focus" | "break" | "vibe";

interface TimerContextType {
	mode: TimerMode;
	timeLeft: number;
	isRunning: boolean;
	startTimer: (mode: TimerMode, duration: number) => void;
	pauseTimer: () => void;
	resetTimer: () => void;
}

const TimerContext = createContext<TimerContextType | null>(null);

export function TimerProvider({ children }: { children: React.ReactNode }) {
	const [mode, setMode] = useState<TimerMode>("focus");
	const [timeLeft, setTimeLeft] = useState(0);
	const [isRunning, setIsRunning] = useState(false);

	const intervalRef = useRef<NodeJS.Timeout | null>(null);
	const audioRef = useRef<HTMLAudioElement | null>(null);

	/* Restore timer on refresh */
	useEffect(() => {
		const saved = localStorage.getItem("study-timer");
		if (saved) {
			const data = JSON.parse(saved);
			setMode(data.mode);
			setTimeLeft(data.timeLeft);
			setIsRunning(data.isRunning);
		}
	}, []);

	/* Persist state */
	useEffect(() => {
		localStorage.setItem(
			"study-timer",
			JSON.stringify({ mode, timeLeft, isRunning })
		);
	}, [mode, timeLeft, isRunning]);

	/* Timer tick */
	useEffect(() => {
		if (!isRunning) return;

		intervalRef.current = setInterval(() => {
			setTimeLeft((prev) => {
				if (prev <= 1) {
					clearInterval(intervalRef.current!);
					setIsRunning(false);
					audioRef.current?.pause();
					return 0;
				}
				return prev - 1;
			});
		}, 1000);

		return () => clearInterval(intervalRef.current!);
	}, [isRunning]);

	const playSound = (mode: TimerMode) => {
		if (!audioRef.current) return;

		const sounds = {
			focus: "/sounds/focus.mp3",
			break: "/sounds/break.mp3",
			vibe: "/sounds/vibe.mp3",
		};

		audioRef.current.src = sounds[mode];
		audioRef.current.loop = true;
		audioRef.current.play();
	};

	const startTimer = (newMode: TimerMode, duration: number) => {
		setMode(newMode);
		setTimeLeft(duration);
		setIsRunning(true);
		playSound(newMode);
	};

	const pauseTimer = () => {
		setIsRunning(false);
		audioRef.current?.pause();
	};

	const resetTimer = () => {
		setIsRunning(false);
		setTimeLeft(0);
		audioRef.current?.pause();
	};

	return (
		<TimerContext.Provider
			value={{ mode, timeLeft, isRunning, startTimer, pauseTimer, resetTimer }}
		>
			{children}
			<audio ref={audioRef} />
		</TimerContext.Provider>
	);
}

export function useTimer() {
	const context = useContext(TimerContext);
	if (!context) throw new Error("useTimer must be used inside TimerProvider");
	return context;
}