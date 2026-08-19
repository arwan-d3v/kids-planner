"use client";

import { useState } from "react";
import { usePlayerState } from "@/providers/PlayerProvider";
import HeroCard from "@/components/HeroCard";
import HeroRevealModal from "@/components/HeroRevealModal";
import StarCounter from "@/components/StarCounter";
import { Hero } from "@/lib/supabase/types";

export default function KoleksiPage() {
  const { heroes, totalStars, unlockedHeroIds } = usePlayerState();
  const [selectedHero, setSelectedHero] = useState<Hero | null>(null);

  // Group heroes into a grid (we just display them in order of unlock_stars)
  const sortedHeroes = [...heroes].sort((a, b) => a.unlock_stars - b.unlock_stars);

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[600px] flex-col bg-surface pb-32">
      {/* ── Header ── */}
      <header className="sticky top-0 z-30 flex items-center justify-between bg-white/80 px-6 py-4 shadow-sm backdrop-blur-md">
        <h1 className="text-xl font-black text-text-primary">Koleksi Hero 🏆</h1>
        <StarCounter />
      </header>

      {/* ── Main Content ── */}
      <main className="flex-1 px-6 py-8">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-black text-text-primary">
            Kumpulkan Semua Hero!
          </h2>
          <p className="mt-2 text-sm font-bold text-text-secondary">
            Selesaikan misi dan rutinitas untuk mengumpulkan bintang dan membuka hero baru.
          </p>
        </div>

        {/* Hero Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {sortedHeroes.map((hero) => {
            const isUnlocked = unlockedHeroIds.has(hero.id);
            const canUnlock = !isUnlocked && totalStars >= hero.unlock_stars;

            return (
              <HeroCard
                key={hero.id}
                hero={hero}
                isUnlocked={isUnlocked}
                canUnlock={canUnlock}
                onUnlockClick={() => setSelectedHero(hero)}
              />
            );
          })}
        </div>
      </main>

      {/* Hero Reveal Modal */}
      <HeroRevealModal
        hero={selectedHero}
        isOpen={!!selectedHero}
        onClose={() => setSelectedHero(null)}
      />
    </div>
  );
}
