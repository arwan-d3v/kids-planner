"use client";

import Image from "next/image";
import { usePlayerState } from "@/providers/PlayerProvider";
import { useEffect, useState } from "react";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour >= 4 && hour < 11) return "Selamat Pagi";
  if (hour >= 11 && hour < 15) return "Selamat Siang";
  if (hour >= 15 && hour < 18) return "Selamat Sore";
  return "Selamat Malam";
}

export default function Header() {
  const { player, totalStars, routines, completedRoutineIds, heroes, unlockedHeroIds } = usePlayerState();
  const [greeting, setGreeting] = useState("Selamat Datang");

  useEffect(() => {
    setGreeting(getGreeting());
  }, []);

  const totalRoutines = routines.filter(r => r.is_active).length;
  const completedRoutines = Array.from(completedRoutineIds).length;
  const progressPercent = totalRoutines === 0 ? 0 : (completedRoutines / totalRoutines) * 100;

  // Find next hero to unlock
  const nextHero = [...heroes].sort((a, b) => a.unlock_stars - b.unlock_stars).find(h => !unlockedHeroIds.has(h.id));

  return (
    <header className="relative overflow-hidden rounded-b-[2rem] bg-gradient-to-br from-sunshine via-[#FFE57F] to-orange-light px-4 pb-4 pt-10 shadow-sm">
      {/* Decorative floating shapes */}
      <div className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 animate-float rounded-full bg-sky/20 mix-blend-multiply" />
      <div className="pointer-events-none absolute -left-4 bottom-8 h-16 w-16 animate-bounce-soft rounded-full bg-pink/20 mix-blend-multiply" />
      <div className="pointer-events-none absolute right-8 top-8 text-2xl animate-star-spin opacity-80">⭐</div>

      <div className="relative flex items-center justify-between gap-3">
        {/* Avatar & Greeting */}
        <div className="flex items-center gap-3">
          <div className="relative flex-shrink-0">
            <div className="h-14 w-14 overflow-hidden rounded-2xl border-4 border-white shadow-card bg-white rotate-[-3deg] transition-transform hover:rotate-0">
              <Image
                src="/avatar.png"
                alt="Avatar Jagoan"
                width={56}
                height={56}
                className="h-full w-full object-cover"
                priority
              />
            </div>
            {/* Online-style badge */}
            <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-mint text-[10px] shadow-button border-2 border-white animate-bounce-soft">
              🌟
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-[10px] font-black text-[#A67123] uppercase tracking-wider">
              {greeting} 👋
            </span>
            <h1 className="text-2xl font-black tracking-tight text-[#8A5A19] drop-shadow-sm leading-none mt-0.5">
              Halo, {player?.name || "Jagoan"}!
            </h1>
          </div>
        </div>

        {/* Progress ribbon (Inline) */}
        <div className="flex flex-col items-end gap-1 text-right">
          <div className="flex items-center gap-1 rounded-xl bg-white/70 px-2 py-1 shadow-sm backdrop-blur-md border border-white">
            <span className="text-base animate-wiggle">🏆</span>
            <span className="text-sm font-black text-mint">{completedRoutines}/{totalRoutines}</span>
          </div>
        </div>
      </div>

      {nextHero && (
        <div className="relative mt-3 flex items-center gap-2 rounded-xl bg-white/40 px-3 py-1.5 backdrop-blur-sm">
          <span className="text-xs font-bold text-[#A67123]">
            Buka hero <span className="text-sm">{nextHero.emoji}</span> dengan {nextHero.unlock_stars - totalStars} ⭐ lagi!
          </span>
        </div>
      )}
    </header>
  );
}
