"use client";

import { useMemo } from "react";
import { usePlayerState } from "@/providers/PlayerProvider";
import RoutineCard from "./RoutineCard";
import { Routine, TimeCategory } from "@/lib/supabase/types";

const categoryOrder: TimeCategory[] = ["Pagi", "Siang", "Sore", "Malam"];

const categoryIcons: Record<TimeCategory, string> = {
  Pagi: "☀️",
  Siang: "🌤️",
  Sore: "🌇",
  Malam: "🌙"
};

export default function DailyRoutineList() {
  const { routines, completedRoutineIds } = usePlayerState();

  // Filter out weekend_only items on weekdays
  const isWeekend = useMemo(() => {
    const day = new Date().getDay();
    return day === 0 || day === 6; // 0 = Sunday, 6 = Saturday
  }, []);

  const activeRoutines = useMemo(() => {
    return routines.filter(r => r.is_active && !r.is_additional_task && (!r.weekend_only || isWeekend));
  }, [routines, isWeekend]);

  // Group by category
  const grouped = useMemo(() => {
    const groups: Record<string, Routine[]> = {
      Pagi: [], Siang: [], Sore: [], Malam: []
    };
    
    activeRoutines.forEach(r => {
      groups[r.time_category]?.push(r);
    });
    
    return groups;
  }, [activeRoutines]);

  return (
    <div className="flex flex-col gap-8">
      {categoryOrder.map(cat => {
        const catRoutines = grouped[cat];
        if (!catRoutines || catRoutines.length === 0) return null;
        
        return (
          <div key={cat} className="flex flex-col gap-4">
            <h3 className="flex items-center gap-2 text-lg font-black text-text-primary">
              <span className="text-2xl">{categoryIcons[cat]}</span>
              {cat}
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              {catRoutines.map((routine, i) => (
                <RoutineCard 
                  key={routine.id} 
                  routine={routine} 
                  index={i} 
                  isCompleted={completedRoutineIds.has(routine.id)} 
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
