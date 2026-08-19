"use client";

import Image from "next/image";
import { Hero } from "@/lib/supabase/types";

interface HeroCardProps {
  hero: Hero;
  isUnlocked: boolean;
  canUnlock: boolean;
  onUnlockClick: () => void;
}

const colorStyles: Record<string, { bg: string, border: string, text: string }> = {
  sunshine: { bg: "to-sunshine-light", border: "border-sunshine", text: "text-sunshine" },
  sky: { bg: "to-sky-light", border: "border-sky", text: "text-sky" },
  mint: { bg: "to-mint-light", border: "border-mint", text: "text-mint" },
  pink: { bg: "to-pink-light", border: "border-pink", text: "text-pink" },
  lavender: { bg: "to-lavender-light", border: "border-lavender", text: "text-lavender" },
  orange: { bg: "to-orange-light", border: "border-orange", text: "text-orange" },
};

export default function HeroCard({ hero, isUnlocked, canUnlock, onUnlockClick }: HeroCardProps) {
  const imageUrl = hero.revealed_url || hero.silhouette_url || "";
  const styles = colorStyles[hero.color] || colorStyles.sunshine;

  if (isUnlocked) {
    return (
      <div className={`relative flex flex-col items-center justify-center overflow-hidden rounded-[2rem] bg-gradient-to-b from-white ${styles.bg} p-4 shadow-card border-4 ${styles.border}`}>
        <div className="absolute left-2 top-2 rounded-full bg-white px-2 py-1 text-xs font-black text-mint shadow-sm">
          ✅
        </div>
        <div className="absolute right-2 top-2 text-xl">
          {hero.emoji}
        </div>
        
        <div className="relative mt-2 h-32 w-32 animate-[float_4s_ease-in-out_infinite] flex items-center justify-center">
          {imageUrl ? (
            <Image src={imageUrl} alt={hero.name} fill className="object-contain drop-shadow-md" />
          ) : (
            <span className="text-[5rem] leading-none drop-shadow-md">{hero.emoji}</span>
          )}
        </div>
        
        <h3 className="mt-4 text-lg font-black text-text-primary text-center leading-tight">
          {hero.name}
        </h3>
        <span className={`text-[10px] font-black uppercase tracking-widest ${styles.text}`}>
          {hero.element}
        </span>
      </div>
    );
  }

  // Locked State
  return (
    <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-[2rem] bg-surface p-4 shadow-sm border-4 border-dashed border-text-muted">
      <div className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-surface-card px-2 py-1 text-xs font-black text-orange shadow-sm z-10">
        <span>⭐</span>
        <span>{hero.unlock_stars}</span>
      </div>
      
      <div className="relative mt-2 h-32 w-32 flex items-center justify-center">
        {imageUrl ? (
           <Image 
             src={imageUrl} 
             alt="???" 
             fill 
             className={`object-contain transition-all duration-1000 ${canUnlock ? 'brightness-0 drop-shadow-[0_0_15px_rgba(255,217,61,0.8)] animate-pulse' : 'brightness-0 opacity-40'}`} 
           />
        ) : (
           <span className={`text-[5rem] leading-none transition-all duration-1000 ${canUnlock ? 'grayscale drop-shadow-[0_0_15px_rgba(255,217,61,0.8)] animate-pulse' : 'grayscale opacity-40'}`}>
             {hero.emoji}
           </span>
        )}
      </div>
      
      <h3 className="mt-4 text-lg font-black text-text-muted text-center leading-tight">
        ???
      </h3>

      {canUnlock && (
        <button
          onClick={onUnlockClick}
          className="absolute bottom-4 rounded-full bg-gradient-to-r from-sunshine to-orange px-4 py-2 text-sm font-black text-white shadow-button animate-bounce-soft z-10"
        >
          Buka! 🔓
        </button>
      )}
    </div>
  );
}
