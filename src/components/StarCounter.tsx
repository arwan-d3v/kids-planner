"use client";

import { usePlayerState } from "@/providers/PlayerProvider";

export default function StarCounter() {
  const { totalStars } = usePlayerState();

  return (
    <div className="flex items-center gap-1.5 rounded-full bg-sunshine-light px-3 py-1.5 shadow-sm ring-2 ring-sunshine">
      <span className="text-xl animate-bounce-soft">⭐</span>
      <span className="text-sm font-extrabold text-orange">{totalStars}</span>
    </div>
  );
}
