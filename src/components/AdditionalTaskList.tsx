"use client";

import { useMemo } from "react";
import { usePlayerState } from "@/providers/PlayerProvider";
import RoutineCard from "./RoutineCard";

export default function AdditionalTaskList() {
  const { routines, completedRoutineIds } = usePlayerState();

  const additionalTasks = useMemo(() => {
    return routines.filter(r => r.is_active && r.is_additional_task);
  }, [routines]);

  if (additionalTasks.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        {additionalTasks.map((task, i) => (
          <RoutineCard
            key={task.id}
            routine={task}
            index={i}
            isCompleted={completedRoutineIds.has(task.id)}
          />
        ))}
      </div>
    </div>
  );
}
