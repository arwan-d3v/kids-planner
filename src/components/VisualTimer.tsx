"use client";

import { useEffect, useState } from "react";

interface VisualTimerProps {
  durationSeconds: number;
  onComplete: () => void;
  isActive: boolean;
}

export default function VisualTimer({ durationSeconds, onComplete, isActive }: VisualTimerProps) {
  const [timeLeft, setTimeLeft] = useState(durationSeconds);
  const total = durationSeconds;

  useEffect(() => {
    if (!isActive || timeLeft <= 0) return;

    const intervalId = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(intervalId);
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isActive, timeLeft, onComplete]);

  // Calculate circular progress
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const progress = timeLeft / total;
  const strokeDashoffset = circumference - progress * circumference;

  // Determine color based on time left
  const getStrokeColor = () => {
    const minutesLeft = timeLeft / 60;
    if (minutesLeft > 5) return "#7DDBA3"; // mint
    if (minutesLeft > 2) return "#FFD93D"; // sunshine
    return "#FF9BB3"; // pink/red
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeString = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  return (
    <div className="relative flex items-center justify-center py-6">
      <svg width="280" height="280" viewBox="0 0 280 280" className="-rotate-90 transform">
        {/* Background track */}
        <circle
          cx="140"
          cy="140"
          r={radius}
          stroke="var(--color-surface)"
          strokeWidth="16"
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx="140"
          cy="140"
          r={radius}
          stroke={getStrokeColor()}
          strokeWidth="16"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1000 ease-linear"
        />
      </svg>

      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-sm font-bold text-text-secondary">Sisa Waktu</span>
        <span className="text-4xl font-black tabular-nums text-text-primary" style={{ color: getStrokeColor() }}>
          {timeString}
        </span>
      </div>
    </div>
  );
}
