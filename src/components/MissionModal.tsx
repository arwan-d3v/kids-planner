"use client";

import { useState } from "react";
import { Mission } from "@/lib/supabase/types";
import VisualTimer from "./VisualTimer";
import { useAudio } from "@/hooks/useAudio";
import { useConfetti } from "@/hooks/useConfetti";
import { usePlayerState } from "@/providers/PlayerProvider";
import PinModal from "./PinModal";

interface MissionModalProps {
  mission: Mission;
  isOpen: boolean;
  onClose: () => void;
}

export default function MissionModal({ mission, isOpen, onClose }: MissionModalProps) {
  const [state, setState] = useState<"idle" | "running" | "completed">("idle");
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const { playAudio } = useAudio();
  const { triggerEpicConfetti } = useConfetti();
  const { completeMission } = usePlayerState();

  if (!isOpen) return null;

  const handleStart = () => {
    playAudio('click');
    setState("running");
  };

  const handleCompleteRequest = () => {
    // Show PIN modal instead of completing immediately
    setIsPinModalOpen(true);
  };

  const handlePinSuccess = () => {
    setIsPinModalOpen(false);
    if (state === "completed") return; // Prevent double trigger
    setState("completed");
    playAudio('mission_done');
    triggerEpicConfetti();
    completeMission(mission.id);
  };

  const handleClose = () => {
    playAudio('click');
    onClose();
    // Reset state after animation
    setTimeout(() => setState("idle"), 300);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-end justify-center bg-text-primary/60 p-4 sm:items-center animate-fade-in backdrop-blur-sm"
      onClick={handleClose}
    >
      <div 
        className="relative w-full max-w-[500px] overflow-hidden rounded-[2rem] bg-surface p-6 shadow-2xl animate-slide-up mt-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-surface-card text-text-muted shadow-sm hover:bg-gray-100"
        >
          ✕
        </button>

        {state === "completed" ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <span className="text-6xl animate-bounce-soft">🎉</span>
            <h2 className="mt-6 text-3xl font-black text-sunshine animate-celebration drop-shadow-md">
              Kamu Hebat!
            </h2>
            <p className="mt-3 text-sm font-bold text-text-secondary">
              Kamu berhasil menyelesaikan misi rahasia hari ini!
            </p>
            <div className="mt-8 flex items-center justify-center gap-2 rounded-full bg-sunshine-light px-6 py-2 text-orange font-black">
              <span>+5</span>
              <span className="text-xl">⭐</span>
            </div>
            <button
              onClick={handleClose}
              className="mt-8 w-full rounded-2xl bg-gradient-to-r from-mint to-sky px-6 py-4 text-lg font-black text-white shadow-button active:scale-95 transition-transform"
            >
              Tutup
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center py-4">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-sunshine-light text-5xl shadow-button">
              {mission.emoji}
            </div>
            <h2 className="text-2xl font-black text-center text-text-primary">
              {mission.type}
            </h2>
            <p className="mt-2 text-center text-base font-bold text-sky drop-shadow-sm">
              &quot;{mission.target_text}&quot;
            </p>
            <p className="mt-4 text-center text-sm font-medium text-text-secondary leading-relaxed px-4">
              {mission.description}
            </p>

            {mission.parenting_guide && (
              <div className="mt-6 w-full rounded-xl bg-orange-light/30 border border-orange/20 p-4 text-left shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">💡</span>
                  <span className="text-sm font-bold text-orange">Tips Untuk Orang Tua</span>
                </div>
                <p className="text-xs text-[#8A5A19] font-medium leading-relaxed">
                  {mission.parenting_guide}
                </p>
              </div>
            )}

            {state === "idle" ? (
              <div className="mt-10 w-full space-y-4">
                <div className="flex items-center justify-center gap-2 text-sm font-bold text-text-muted">
                  <span>⏱️ Waktu Misi: {mission.duration_minutes} Menit</span>
                </div>
                <button
                  onClick={handleStart}
                  className="w-full rounded-2xl bg-gradient-to-r from-sunshine to-orange px-6 py-4 text-lg font-black text-white shadow-button active:scale-95 transition-transform"
                >
                  Mulai Misi! 🚀
                </button>
              </div>
            ) : (
              <div className="mt-6 w-full flex flex-col items-center">
                <VisualTimer 
                  durationSeconds={mission.duration_minutes * 60} 
                  isActive={true} 
                  onComplete={handleCompleteRequest} 
                />
                <button
                  onClick={handleCompleteRequest}
                  className="mt-6 w-full rounded-2xl bg-mint px-6 py-4 text-lg font-black text-white shadow-button active:scale-95 transition-transform"
                >
                  Misi Selesai! ✅
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      <PinModal 
        isOpen={isPinModalOpen} 
        onClose={() => setIsPinModalOpen(false)} 
        onSuccess={handlePinSuccess}
        title="Konfirmasi Selesai Misi"
      />
    </div>
  );
}
