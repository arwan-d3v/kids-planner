export type TimeCategory = "Pagi" | "Siang" | "Sore" | "Malam";
export type MissionType = "Menulis Huruf" | "Membaca" | "Poster Perkalian" | "Poster Hijaiyah" | "Basic English" | "Cerita Baru";

export interface Player {
  id: string;
  name: string;
  avatar_url: string | null;
  total_stars: number;
  current_streak: number;
  longest_streak: number;
  has_seen_onboarding: boolean;
}

export interface Routine {
  id: string;
  title: string;
  icon: string;
  time_category: TimeCategory;
  is_active: boolean;
  weekend_only: boolean;
  sort_order: number;
  parenting_guide?: string;
  is_additional_task?: boolean;
}

export interface Mission {
  id: string;
  type: MissionType;
  target_text: string;
  description: string;
  emoji: string;
  duration_minutes: number;
  assigned_date: string | null;
  start_time?: string; // Format "HH:mm" e.g., "09:00"
  end_time?: string;   // Format "HH:mm" e.g., "12:00"
  is_active: boolean;
  parenting_guide?: string;
}

export interface Hero {
  id: string;
  name: string;
  element: string;
  emoji: string;
  color: string;
  unlock_stars: number;
  sort_order: number;
  silhouette_url: string | null;
  revealed_url: string | null;
  is_active: boolean;
}

export interface DailyProgress {
  id: string;
  player_id: string;
  progress_date: string;
  stars_earned: number;
  all_routines_done: boolean;
  mission_done: boolean;
  bonus_awarded: boolean;
}

export interface RoutineCompletion {
  id: string;
  daily_progress_id: string;
  routine_id: string;
  completed_at: string;
}

export interface PlayerHero {
  id: string;
  player_id: string;
  hero_id: string;
  unlocked_at: string;
}
