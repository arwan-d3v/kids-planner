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

  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <>
      <div className="relative group">
        {routine.parenting_guide && (
          <div
            className="absolute -top-3 -right-3 z-20"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(!showTooltip);
            }}
          >
            <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white text-base shadow-md border-2 border-mint hover:scale-110 transition-transform">
              💡
            </div>
            {showTooltip && (
              <div className="absolute top-10 right-0 w-48 rounded-xl bg-white p-3 shadow-lg border-2 border-mint text-xs font-medium text-text-secondary z-30 animate-fade-in pointer-events-none">
                <div className="absolute -top-2 right-3 h-4 w-4 rotate-45 border-l-2 border-t-2 border-mint bg-white"></div>
                <p className="relative z-10">{routine.parenting_guide}</p>
              </div>
            )}
          </div>
        )}
      <button
        onClick={handleCardClick}
        className={`
          w-full group/btn relative animate-pop flex flex-col items-center justify-center gap-3
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
          ${!isCompleted ? 'group-hover/btn:scale-110 group-hover/btn:rotate-6' : ''}
        `}
      >
        {routine.icon}
      </div>

      {/* Title */}
      <span className="text-center text-sm font-black leading-tight text-text-primary drop-shadow-sm">
        {routine.title}
      </span>
    </button>
    </div>
    <PinModal 
      isOpen={isPinModalOpen} 
      onClose={() => setIsPinModalOpen(false)} 
      onSuccess={handlePinSuccess}
      title="Konfirmasi Tugas"
    />
    </>
  );
}
