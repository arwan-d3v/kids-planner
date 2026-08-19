// ── Mock Data: Kids Daily Planner ──

export interface Task {
  id: string;
  title: string;
  emoji: string;
  description: string;
  completed: boolean;
  color: "sunshine" | "sky" | "mint" | "pink" | "lavender" | "orange";
}

export interface Routine {
  id: string;
  title: string;
  emoji: string;
  time: string;
  color: "sunshine" | "sky" | "mint" | "pink" | "lavender" | "orange";
  done: boolean;
}

export const tasks: Task[] = [
  {
    id: "task-1",
    title: "Rapikan tempat tidur",
    emoji: "🛏️",
    description: "Lipat selimut dan tata bantal",
    completed: false,
    color: "sky",
  },
  {
    id: "task-2",
    title: "Siram tanaman",
    emoji: "🌱",
    description: "Beri air untuk bunga di teras",
    completed: true,
    color: "mint",
  },
  {
    id: "task-3",
    title: "Baca 1 cerita",
    emoji: "📖",
    description: "Pilih buku cerita favoritmu",
    completed: false,
    color: "lavender",
  },
];

export const routines: Routine[] = [
  {
    id: "routine-1",
    title: "Bangun Tidur",
    emoji: "🌅",
    time: "06:00",
    color: "sunshine",
    done: true,
  },
  {
    id: "routine-2",
    title: "Mandi Pagi",
    emoji: "🛁",
    time: "06:30",
    color: "sky",
    done: true,
  },
  {
    id: "routine-3",
    title: "Sarapan",
    emoji: "🥞",
    time: "07:00",
    color: "orange",
    done: true,
  },
  {
    id: "routine-4",
    title: "Bermain",
    emoji: "🧸",
    time: "08:00",
    color: "pink",
    done: false,
  },
  {
    id: "routine-5",
    title: "Makan Siang",
    emoji: "🍱",
    time: "12:00",
    color: "mint",
    done: false,
  },
  {
    id: "routine-6",
    title: "Tidur Siang",
    emoji: "😴",
    time: "13:00",
    color: "lavender",
    done: false,
  },
  {
    id: "routine-7",
    title: "Mandi Sore",
    emoji: "🚿",
    time: "16:00",
    color: "sky",
    done: false,
  },
  {
    id: "routine-8",
    title: "Tidur Malam",
    emoji: "🌙",
    time: "20:00",
    color: "lavender",
    done: false,
  },
];
