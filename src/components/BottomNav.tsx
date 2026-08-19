"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlayerState } from "@/providers/PlayerProvider";

export default function BottomNav() {
  const pathname = usePathname();
  const { totalStars, heroes, unlockedHeroIds } = usePlayerState();
  
  // Calculate if there are heroes that can be unlocked but aren't yet
  const canUnlockAny = heroes.some(h => totalStars >= h.unlock_stars && !unlockedHeroIds.has(h.id));

  return (
    <nav className="fixed bottom-0 left-1/2 z-40 flex w-full max-w-[600px] -translate-x-1/2 items-center justify-around bg-white/90 px-6 py-4 pb-safe shadow-[0_-4px_24px_rgba(0,0,0,0.06)] backdrop-blur-md">
      
      <Link href="/" className={`flex flex-col items-center gap-1 transition-transform ${pathname === '/' ? 'scale-110 text-orange' : 'text-text-muted hover:text-text-secondary'}`}>
        <span className="text-2xl">🏠</span>
        <span className="text-[10px] font-black uppercase tracking-wider">Home</span>
      </Link>

      <Link href="/koleksi" className={`relative flex flex-col items-center gap-1 transition-transform ${pathname === '/koleksi' ? 'scale-110 text-orange' : 'text-text-muted hover:text-text-secondary'}`}>
        <div className="relative">
          <span className="text-2xl">🏆</span>
          {canUnlockAny && (
            <span className="absolute -right-1 -top-1 flex h-3 w-3 animate-ping rounded-full bg-mint" />
          )}
          {canUnlockAny && (
            <span className="absolute -right-1 -top-1 flex h-3 w-3 rounded-full bg-mint" />
          )}
        </div>
        <span className="text-[10px] font-black uppercase tracking-wider">Koleksi</span>
      </Link>

      <Link href="/profil" className={`flex flex-col items-center gap-1 transition-transform ${pathname === '/profil' ? 'scale-110 text-orange' : 'text-text-muted hover:text-text-secondary'}`}>
        <span className="text-2xl">👤</span>
        <span className="text-[10px] font-black uppercase tracking-wider">Profil</span>
      </Link>

    </nav>
  );
}
