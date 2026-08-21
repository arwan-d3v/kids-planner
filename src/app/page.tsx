"use client";

import Header from "@/components/Header";
import DailyMissionCard from "@/components/DailyMissionCard";
import DailyRoutineList from "@/components/DailyRoutineList";
import AdditionalTaskList from "@/components/AdditionalTaskList";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { usePlayerState } from "@/providers/PlayerProvider";

export default function HomePage() {
  const { isLoading } = usePlayerState();

  if (isLoading) {
    return (
      <div className="mx-auto flex min-h-dvh w-full max-w-[600px] flex-col bg-surface pb-32">
        <LoadingSkeleton />
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[600px] flex-col bg-surface pb-32">
      {/* ── Header ── */}
      <Header />

      {/* ── Main Content ── */}
      <main className="flex flex-1 flex-col gap-10 px-6 py-8">
        
        {/* ═══ Section: Misi Rahasia ═══ */}
        <section>
          <DailyMissionCard />
        </section>

        {/* ═══ Divider ═══ */}
        <div className="flex items-center gap-4 px-4 opacity-70">
          <div className="h-1 flex-1 rounded-full bg-gradient-to-r from-transparent via-lavender to-transparent" />
          <span className="text-2xl animate-pulse">✨</span>
          <div className="h-1 flex-1 rounded-full bg-gradient-to-r from-transparent via-lavender to-transparent" />
        </div>

        {/* ═══ Section: Jadwal Aku ═══ */}
        <section>
          <div className="mb-5 flex items-center gap-3">
            <span className="text-3xl animate-bounce-soft">📅</span>
            <h2 className="text-xl font-black text-text-primary">
              Jadwal Aku Hari Ini
            </h2>
          </div>

          <DailyRoutineList />
        </section>

        {/* ═══ Divider ═══ */}
        <div className="flex items-center gap-4 px-4 opacity-70">
          <div className="h-1 flex-1 rounded-full bg-gradient-to-r from-transparent via-mint to-transparent" />
          <span className="text-2xl animate-spin-slow">🌟</span>
          <div className="h-1 flex-1 rounded-full bg-gradient-to-r from-transparent via-mint to-transparent" />
        </div>

        {/* ═══ Section: Tugas Tambahan ═══ */}
        <section>
          <div className="mb-5 flex items-center gap-3">
            <span className="text-3xl animate-wiggle">💪</span>
            <h2 className="text-xl font-black text-text-primary">
              Tugas Tambahan
            </h2>
          </div>
          <p className="mb-4 text-sm font-medium text-text-secondary">
            Bantu ayah dan ibu melakukan hal-hal baik ini, yuk!
          </p>
          <AdditionalTaskList />
        </section>
      </main>

    </div>
  );
}
