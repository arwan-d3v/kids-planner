"use client";

import { useState } from "react";
import Image from "next/image";
import { Hero } from "@/lib/supabase/types";
import { useAudio } from "@/hooks/useAudio";
import { useConfetti } from "@/hooks/useConfetti";
import { usePlayerState } from "@/providers/PlayerProvider";

interface HeroRevealModalProps {
  hero: Hero | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function HeroRevealModal({ hero, isOpen, onClose }: HeroRevealModalProps) {
  const [phase, setPhase] = useState<"intro" | "revealing" | "revealed">("intro");
  const { playAudio } = useAudio();
  const { triggerEpicConfetti } = useConfetti();
  const { unlockHero } = usePlayerState();

  if (!isOpen || !hero) return null;

  const handleReveal = () => {
    playAudio('click');
    setPhase("revealing");
    
    // Sequence of animations
    setTimeout(() => {
      setPhase("revealed");
      playAudio('hero_reveal');
      triggerEpicConfetti();
      unlockHero(hero.id);
    }, 2500); // 2.5s buildup
  };

  const handleClose = () => {
    playAudio('click');
    onClose();
    setTimeout(() => setPhase("intro"), 300);
  };

  const imageUrl = hero.revealed_url || hero.silhouette_url || "/avatar.png";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md animate-fade-in">
      <div className="relative flex w-full max-w-[400px] flex-col items-center">
        
        {phase === "intro" && (
          <div className="flex flex-col items-center animate-slide-up">
            <h2 className="text-2xl font-black text-white text-center drop-shadow-md">
              Hero Baru Menanti!
            </h2>
            <div className="relative mt-8 h-64 w-64">
              <Image 
                src={imageUrl} 
                alt="Silhouette" 
                fill 
                className="object-contain brightness-0 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" 
              />
            </div>
            <button
              onClick={handleReveal}
              className="mt-12 rounded-full bg-gradient-to-r from-sunshine to-orange px-8 py-4 text-xl font-black text-white shadow-[0_0_20px_rgba(255,217,61,0.6)] animate-pulse hover:scale-105 active:scale-95 transition-all"
            >
              BUKA SEKARANG! 🌟
            </button>
          </div>
        )}

        {phase === "revealing" && (
          <div className="flex flex-col items-center">
            <div className="relative h-64 w-64 animate-[wiggle_0.2s_ease-in-out_infinite]">
              <Image 
                src={imageUrl} 
                alt="Silhouette Glowing" 
                fill 
                className="object-contain brightness-0 drop-shadow-[0_0_30px_rgba(255,255,255,0.8)]" 
              />
            </div>
            <div className="absolute inset-0 z-10 animate-[fade-in_2.5s_ease-in_forwards] bg-white mix-blend-overlay"></div>
          </div>
        )}

        {phase === "revealed" && (
          <div className="flex flex-col items-center animate-[pop_0.5s_ease-out_forwards]">
            <div className="absolute inset-0 -z-10 animate-star-spin opacity-50 text-6xl flex items-center justify-center">
              ✨
            </div>
            
            <span className="text-4xl animate-bounce-soft">{hero.emoji}</span>
            <h2 className="mt-2 text-4xl font-black text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
              {hero.name}
            </h2>
            <span className={`mt-2 rounded-full px-4 py-1 text-sm font-black uppercase tracking-widest text-white shadow-sm bg-${hero.color}`}>
              Elemen {hero.element}
            </span>

            <div className="relative mt-8 h-64 w-64 animate-[float_3s_ease-in-out_infinite]">
              <Image 
                src={imageUrl} 
                alt={hero.name} 
                fill 
                className="object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]" 
              />
            </div>

            <button
              onClick={handleClose}
              className="mt-12 rounded-full bg-white px-8 py-4 text-xl font-black text-text-primary shadow-lg hover:scale-105 active:scale-95 transition-all"
            >
              Luar Biasa! 👏
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
