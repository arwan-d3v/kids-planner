"use client";

import { useState, useEffect } from "react";
import MissionModal from "./MissionModal";
import { usePlayerState } from "@/providers/PlayerProvider";
import { Mission } from "@/lib/supabase/types";

export default function DailyMissionCard() {
  const { todayMissions, completedMissionIds } = usePlayerState();
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [currentTime, setCurrentTime] = useState<string>("00:00");

  useEffect(() => {
    // Update time every minute to check time gates
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  if (!todayMissions || todayMissions.length === 0) return null;

  const handleMissionClick = (mission: Mission, status: string) => {
    if (status === "active") {
      setSelectedMission(mission);
    }
  };

  const isMaxLimitReached = completedMissionIds.size >= 2;

  return (
    <div className="w-full">
      <div className="mb-4 flex items-center justify-between px-2">
        <h2 className="text-xl font-black text-text-primary">Misi Spesial Hari Ini 🌟</h2>
        <span className="text-xs font-bold text-mint bg-mint-light px-2 py-1 rounded-full">
          Selesai: {completedMissionIds.size}/2
        </span>
      </div>

      <div className="flex flex-col gap-4">
        {todayMissions.map((mission, index) => {
          const isCompleted = completedMissionIds.has(mission.id);
          
          // Determine time status
          let status: "completed" | "locked" | "active" | "expired" | "max_reached" = "locked";
          let statusText = "Belum Waktunya 🔒";
          let bgClass = "bg-surface-card opacity-50 grayscale";
          
          if (isCompleted) {
            status = "completed";
            statusText = "Selesai ✅";
            bgClass = "bg-mint-light border-mint";
          } else if (isMaxLimitReached) {
            status = "max_reached";
            statusText = "Limit Penuh 🔒";
            bgClass = "bg-surface-card opacity-50 grayscale";
          } else if (!mission.start_time || !mission.end_time) {
            status = "active";
            statusText = "Siap Dikerjakan! 🚀";
            bgClass = "bg-gradient-to-r from-sunshine to-orange-light text-[#8A5A19]";
          } else {
            if (currentTime < mission.start_time) {
              status = "locked";
              statusText = `Mulai jam ${mission.start_time} 🔒`;
              bgClass = "bg-surface-card opacity-50 grayscale";
            } else if (currentTime > mission.end_time) {
              status = "expired";
              statusText = "Waktu Habis ⏳";
              bgClass = "bg-surface-card opacity-50 grayscale";
            } else {
              status = "active";
              statusText = "Siap Dikerjakan! 🚀";
              bgClass = "bg-gradient-to-r from-sunshine to-orange-light text-[#8A5A19] shadow-card animate-pulse-soft";
            }
          }

          return (
            <button
              key={mission.id}
              onClick={() => handleMissionClick(mission, status)}
              className={`w-full relative overflow-hidden rounded-[2rem] p-5 border-4 border-transparent transition-all duration-300 text-left ${bgClass} ${status === 'active' ? 'hover:-translate-y-1 hover:shadow-card-hover active:scale-95' : 'cursor-not-allowed'}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/30 text-4xl shadow-inner backdrop-blur-sm">
                  {mission.emoji}
                </div>
                <div className="flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-black uppercase tracking-wider opacity-90 drop-shadow-sm">
                      {statusText}
                    </span>
                    {(mission.start_time && mission.end_time) && (
                      <span className="text-[10px] font-bold opacity-80 bg-black/10 px-2 py-0.5 rounded-full">
                        {mission.start_time} - {mission.end_time}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-black drop-shadow-sm leading-tight">
                    {mission.target_text}
                  </h3>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {selectedMission && (
        <MissionModal 
          mission={selectedMission} 
          isOpen={true} 
          onClose={() => setSelectedMission(null)} 
        />
      )}
    </div>
  );
}
