"use client";

import { useState } from "react";
import { Routine } from "@/lib/supabase/types";
import { usePlayerState } from "@/providers/PlayerProvider";
import { useAudio } from "@/hooks/useAudio";
import { useConfetti } from "@/hooks/useConfetti";
import PinModal from "./PinModal";

const categoryStyles: Record<string, { bg: string, border: string }> = {
  Pagi: { bg: "bg-sunshine-light", border: "border-sunshine" },
  Siang: { bg: "bg-sky-light", border: "border-sky" },
  Sore: { bg: "bg-orange-light", border: "border-orange" },
  Malam: { bg: "bg-lavender-light", border: "border-lavender" },
};

interface RoutineCardProps {
  routine: Routine;
  index: number;
  isCompleted: boolean;
}

export default function RoutineCard({ routine, index, isCompleted }: RoutineCardProps) {
  const { toggleRoutine } = usePlayerState();
  const { playAudio } = useAudio();
  const { triggerConfetti } = useConfetti();
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);

  const styles = categoryStyles[routine.time_category] || categoryStyles["Pagi"];

  const handleCardClick = () => {
    // If not completed, we require PIN. If completed and they want to un-toggle, maybe also PIN?
    // Let's require PIN for any state change to prevent cheating or accidental unchecks.
    setIsPinModalOpen(true);
  };

  const handlePinSuccess = () => {
    setIsPinModalOpen(false);
    toggleRoutine(routine.id);
    
    // Haptic feedback
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(50);
    }

    if (!isCompleted) {
      playAudio('success');
      triggerConfetti();
    } else {
      playAudio('click'); // untoggle sound
    }
  };

  return (
    <>
      <button
        onClick={handleCardClick}
        className={`
          group relative animate-pop flex flex-col items-center justify-center gap-3
          rounded-[2rem] border-4 ${styles.border} ${styles.bg}
          p-5 shadow-card transition-all duration-300
          hover:-translate-y-1 hover:shadow-card-hover
          active:scale-95
          ${isCompleted ? 'opacity-50 grayscale-[20%]' : 'opacity-100'}
        `}
        style={{ animationDelay: `${index * 80}ms`, animationFillMode: "both" }}
      >
        {/* Huge Checkmark Overlay */}
        {isCompleted && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/40 rounded-[1.8rem] backdrop-blur-[1px] animate-fade-in">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-mint text-4xl shadow-button animate-checkmark-pop">
              ✅
            </div>
          </div>
        )}

      {/* Emoji bubble */}
      <div
        className={`
          flex h-16 w-16 items-center justify-center
          rounded-[1.5rem] bg-white/60 text-4xl shadow-inner
          transition-transform duration-300
          ${!isCompleted ? 'group-hover:scale-110 group-hover:rotate-6' : ''}
        `}
      >
        {routine.icon}
      </div>

      {/* Title */}
      <span className="text-center text-sm font-black leading-tight text-text-primary drop-shadow-sm">
        {routine.title}
      </span>
    </button>
    <PinModal 
      isOpen={isPinModalOpen} 
      onClose={() => setIsPinModalOpen(false)} 
      onSuccess={handlePinSuccess}
      title="Konfirmasi Tugas"
    />
    </>
  );
}
