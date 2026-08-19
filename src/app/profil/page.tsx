"use client";

import Image from "next/image";
import { usePlayerState } from "@/providers/PlayerProvider";

export default function ProfilPage() {
  const { player, totalStars, unlockedHeroIds, heroes, completedRoutineIds } = usePlayerState();
  const name = player?.name || "Jagoan";
  const streak = player?.current_streak || 0;
  
  // Calculate level based on total stars (every 50 stars = 1 level)
  const currentLevel = Math.floor(totalStars / 50) + 1;
  const starsNextLevel = currentLevel * 50;
  const progressPercent = ((totalStars % 50) / 50) * 100;

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[600px] flex-col bg-surface pb-32">
      {/* ── Header ── */}
      <header className="sticky top-0 z-30 flex items-center justify-center bg-white/80 px-6 py-4 shadow-sm backdrop-blur-md">
        <h1 className="text-xl font-black text-text-primary">Profilku 👤</h1>
      </header>

      {/* ── Main Content ── */}
      <main className="flex-1 px-6 py-8">
        
        {/* Profile Card */}
        <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-[2rem] bg-gradient-to-br from-mint via-sky to-lavender p-8 shadow-card border-4 border-white">
          <div className="pointer-events-none absolute -right-6 -top-6 h-32 w-32 animate-float rounded-full bg-white/20 mix-blend-overlay" />
          <div className="pointer-events-none absolute -left-8 bottom-8 h-20 w-20 animate-bounce-soft rounded-full bg-white/20 mix-blend-overlay" />

          <div className="relative flex h-32 w-32 items-center justify-center overflow-hidden rounded-[2rem] border-4 border-white bg-white shadow-lg">
            <Image
              src="/avatar.png"
              alt="Avatar Jagoan"
              fill
              className="object-cover"
            />
          </div>
          
          <h2 className="mt-4 text-3xl font-black text-white drop-shadow-md">
            {name}
          </h2>
          
          <div className="mt-2 flex items-center gap-2 rounded-full bg-white/30 px-4 py-1 backdrop-blur-sm">
            <span className="text-sm font-bold text-white">Level {currentLevel}</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center justify-center rounded-[1.5rem] bg-sunshine-light p-6 shadow-sm border-2 border-sunshine">
            <span className="text-4xl animate-wiggle">⭐</span>
            <span className="mt-2 text-3xl font-black text-orange">{totalStars}</span>
            <span className="text-xs font-bold text-[#A67123] uppercase tracking-wider">Total Bintang</span>
          </div>
          
          <div className="flex flex-col items-center justify-center rounded-[1.5rem] bg-orange-light p-6 shadow-sm border-2 border-orange">
            <span className="text-4xl animate-bounce-soft">🔥</span>
            <span className="mt-2 text-3xl font-black text-orange">{streak}</span>
            <span className="text-xs font-bold text-[#A67123] uppercase tracking-wider">Hari Beruntun</span>
          </div>

          <div className="flex flex-col items-center justify-center rounded-[1.5rem] bg-mint-light p-6 shadow-sm border-2 border-mint">
            <span className="text-4xl">🦸</span>
            <span className="mt-2 text-3xl font-black text-mint">{unlockedHeroIds.size} / {heroes.length}</span>
            <span className="text-xs font-bold text-mint uppercase tracking-wider">Hero Terbuka</span>
          </div>

          <div className="flex flex-col items-center justify-center rounded-[1.5rem] bg-sky-light p-6 shadow-sm border-2 border-sky">
            <span className="text-4xl">✅</span>
            <span className="mt-2 text-3xl font-black text-sky">{completedRoutineIds.size}</span>
            <span className="text-xs font-bold text-sky uppercase tracking-wider">Misi Hari Ini</span>
          </div>
        </div>

        {/* Level Progress */}
        <div className="mt-8 rounded-[1.5rem] bg-white p-6 shadow-card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-black text-text-primary">Menuju Level {currentLevel + 1}</span>
            <span className="text-sm font-bold text-text-muted">{totalStars % 50} / 50 ⭐</span>
          </div>
          <div className="h-4 overflow-hidden rounded-full bg-surface shadow-inner border border-lavender-light">
            <div
              className="h-full rounded-full bg-gradient-to-r from-lavender to-pink transition-all duration-1000 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

      </main>
    </div>
  );
}
