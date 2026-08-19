"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { Player, Routine, Mission, Hero, DailyProgress } from "@/lib/supabase/types";
import { defaultRoutines, defaultHeroes, defaultMissions } from "@/data/default-data";
import { createClient } from "@/lib/supabase/client";

interface PlayerState {
  player: Player | null;
  routines: Routine[];
  heroes: Hero[];
  todayMissions: Mission[];
  completedRoutineIds: Set<string>;
  unlockedHeroIds: Set<string>;
  isLoading: boolean;
  totalStars: number;
  completedMissionIds: Set<string>;
}

const initialState: PlayerState = {
  player: null,
  routines: defaultRoutines,
  heroes: defaultHeroes,
  todayMissions: defaultMissions,
  completedRoutineIds: new Set(),
  unlockedHeroIds: new Set(),
  isLoading: true,
  totalStars: 0,
  completedMissionIds: new Set(),
};

interface PlayerActions {
  toggleRoutine: (routineId: string) => Promise<void>;
  completeMission: (missionId: string) => Promise<void>;
  unlockHero: (heroId: string) => Promise<void>;
}

const PlayerContext = createContext<(PlayerState & PlayerActions) | null>(null);

function getTodayDateStr() {
  return new Date().toISOString().split('T')[0];
}

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<PlayerState>({
    ...initialState,
    player: { id: "p1", name: "Jagoan", avatar_url: null, total_stars: 0, current_streak: 0, longest_streak: 0, has_seen_onboarding: false },
  });

  const supabase = createClient();

  useEffect(() => {
    // 1. Read from localStorage for instant UI
    const today = getTodayDateStr();
    const cachedStr = localStorage.getItem("kids-planner-v2");
    
    if (cachedStr) {
      try {
        const cached = JSON.parse(cachedStr);
        // Check if date changed
        if (cached.todayDate !== today) {
          // Reset daily stats
          cached.completedRoutineIds = [];
          cached.completedMissionIds = [];
          cached.todayDate = today;
        }
        setState(prev => ({
          ...prev,
          totalStars: cached.totalStars || 0,
          completedRoutineIds: new Set(cached.completedRoutineIds || []),
          unlockedHeroIds: new Set(cached.unlockedHeroIds || []),
          completedMissionIds: new Set(cached.completedMissionIds || []),
          isLoading: false
        }));
      } catch (e) {
        console.error("Failed to parse cache", e);
      }
    } else {
      setState(prev => ({ ...prev, isLoading: false }));
    }

    // Interval to check day rollover when app is open
    const interval = setInterval(() => {
      const nowToday = getTodayDateStr();
      setState(prev => {
        // We need to read current date. The easiest way is check against nowToday.
        // But since we can't easily access the stored date inside interval without ref,
        // We can just rely on the effect below. Actually let's just do a simple check.
        // We will just do it on visibilitychange instead, much cleaner.
        return prev;
      });
    }, 60000);

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        const nowToday = getTodayDateStr();
        const storedStr = localStorage.getItem("kids-planner-v2");
        if (storedStr) {
           const stored = JSON.parse(storedStr);
           if (stored.todayDate !== nowToday) {
             // Day rolled over, reload page to reset everything cleanly
             window.location.reload();
           }
        }
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // 2. Async fetch from Supabase (graceful degradation)
    async function fetchRemote() {
      try {
        const { data: routines } = await supabase.from('routines').select('*').order('sort_order');
        const { data: heroes } = await supabase.from('heroes').select('*').order('sort_order');
        const { data: missions } = await supabase.from('missions').select('*').eq('assigned_date', today);
        
        // Temporarily comment out Supabase routines fetch to use our updated default routines
        // if (routines && routines.length > 0) {
        //   setState(prev => ({ ...prev, routines: routines as Routine[] }));
        // }
        if (heroes && heroes.length > 0) {
          setState(prev => ({ ...prev, heroes: heroes as Hero[] }));
        }
        // Temporarily comment out Supabase missions fetch to use our default 4 time-gated missions
        // if (missions && missions.length > 0) {
        //   setState(prev => ({ ...prev, todayMissions: missions as Mission[] }));
        // }
      } catch (error) {
        console.warn("Supabase fetch failed, continuing with local data", error);
      }
    }

    fetchRemote();

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (state.isLoading) return;
    
    const cacheData = {
      todayDate: getTodayDateStr(),
      totalStars: state.totalStars,
      completedRoutineIds: Array.from(state.completedRoutineIds),
      unlockedHeroIds: Array.from(state.unlockedHeroIds),
      completedMissionIds: Array.from(state.completedMissionIds),
    };
    localStorage.setItem("kids-planner-v2", JSON.stringify(cacheData));
  }, [state.totalStars, state.completedRoutineIds, state.unlockedHeroIds, state.isLoading, state.completedMissionIds]);

  const toggleRoutine = useCallback(async (routineId: string) => {
    setState(prev => {
      const newSet = new Set(prev.completedRoutineIds);
      let newStars = prev.totalStars;
      
      if (newSet.has(routineId)) {
        newSet.delete(routineId);
        newStars = Math.max(0, newStars - 1);
      } else {
        newSet.add(routineId);
        newStars += 1;
      }
      
      return { ...prev, completedRoutineIds: newSet, totalStars: newStars };
    });

    // TODO: Supabase async sync upsert here
  }, []);

  const completeMission = useCallback(async (missionId: string) => {
    setState(prev => {
      // Enforce max 2 limit per day
      if (prev.completedMissionIds.size >= 2 || prev.completedMissionIds.has(missionId)) {
        return prev;
      }
      
      const newSet = new Set(prev.completedMissionIds);
      newSet.add(missionId);

      return {
        ...prev,
        totalStars: prev.totalStars + 5,
        completedMissionIds: newSet
      };
    });
  }, []);

  const unlockHero = useCallback(async (heroId: string) => {
    setState(prev => {
      const newSet = new Set(prev.unlockedHeroIds);
      newSet.add(heroId);
      return { ...prev, unlockedHeroIds: newSet };
    });
  }, []);

  return (
    <PlayerContext.Provider value={{ ...state, toggleRoutine, completeMission, unlockHero }}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayerState() {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayerState must be used within PlayerProvider");
  }
  return context;
}
