import { Routine, Mission, Hero, TimeCategory } from "@/lib/supabase/types";

export const defaultRoutines: Routine[] = [
  { id: "r1", title: "Bangun Pagi", icon: "🌅", time_category: "Pagi", is_active: true, weekend_only: false, sort_order: 1 },
  { id: "r2", title: "Mandi Pagi", icon: "🛁", time_category: "Pagi", is_active: true, weekend_only: false, sort_order: 2 },
  { id: "r3", title: "Sikat Gigi Pagi", icon: "🦷", time_category: "Pagi", is_active: true, weekend_only: false, sort_order: 3 },
  { id: "r4", title: "Sholat Subuh", icon: "🕌", time_category: "Pagi", is_active: true, weekend_only: false, sort_order: 4 },
  { id: "r5", title: "Sholat Dzuhur", icon: "🕌", time_category: "Siang", is_active: true, weekend_only: false, sort_order: 5 },
  { id: "r6", title: "Tidur Siang", icon: "😴", time_category: "Siang", is_active: true, weekend_only: false, sort_order: 6 },
  { id: "r7", title: "Main Lego", icon: "🧱", time_category: "Siang", is_active: true, weekend_only: false, sort_order: 7 },
  { id: "r8", title: "Bereskan Mainan", icon: "🧸", time_category: "Sore", is_active: true, weekend_only: false, sort_order: 8 },
  { id: "r9", title: "Mandi Sore", icon: "🚿", time_category: "Sore", is_active: true, weekend_only: false, sort_order: 9 },
  { id: "r10", title: "Sholat Ashar", icon: "🕌", time_category: "Sore", is_active: true, weekend_only: false, sort_order: 10 },
  { id: "r11", title: "Sholat Maghrib", icon: "🕌", time_category: "Malam", is_active: true, weekend_only: false, sort_order: 11 },
  { id: "r12", title: "Cuci Piring Bekas Makan", icon: "🍽️", time_category: "Malam", is_active: true, weekend_only: false, sort_order: 12 },
  { id: "r13", title: "Sholat Isya", icon: "🕌", time_category: "Malam", is_active: true, weekend_only: false, sort_order: 13 },
  { id: "r14", title: "Sikat Gigi Malam", icon: "🦷", time_category: "Malam", is_active: true, weekend_only: false, sort_order: 14 },
  { id: "r15", title: "Jalan-jalan Keluarga", icon: "🚶", time_category: "Sore", is_active: true, weekend_only: true, sort_order: 15 },
];

export const defaultHeroes: Hero[] = [
  { id: "h1", name: "Blaze Jr.", element: "Api", emoji: "🔥", color: "orange", unlock_stars: 15, sort_order: 1, silhouette_url: "/heroes/blaze.png", revealed_url: "/heroes/blaze.png", is_active: true },
  { id: "h2", name: "Aqua Jr.", element: "Air", emoji: "💧", color: "sky", unlock_stars: 40, sort_order: 2, silhouette_url: null, revealed_url: null, is_active: true },
  { id: "h3", name: "Thorn Jr.", element: "Tumbuhan", emoji: "🌱", color: "mint", unlock_stars: 75, sort_order: 3, silhouette_url: null, revealed_url: null, is_active: true },
  { id: "h4", name: "Thunderbolt", element: "Petir", emoji: "⚡", color: "sunshine", unlock_stars: 120, sort_order: 4, silhouette_url: null, revealed_url: null, is_active: true },
  { id: "h5", name: "Gale Jr.", element: "Angin", emoji: "🌪️", color: "lavender", unlock_stars: 180, sort_order: 5, silhouette_url: null, revealed_url: null, is_active: true },
  { id: "h6", name: "Solar Jr.", element: "Cahaya", emoji: "☀️", color: "sunshine", unlock_stars: 250, sort_order: 6, silhouette_url: null, revealed_url: null, is_active: true },
  { id: "h7", name: "Frost", element: "Es", emoji: "❄️", color: "sky", unlock_stars: 350, sort_order: 7, silhouette_url: null, revealed_url: null, is_active: true },
];

export const defaultMissions: Mission[] = [
  {
    id: "m1",
    type: "Basic English",
    target_text: "Menghafal Frasa Bahasa Inggris",
    description: "Coba hafalkan 3 kata bahasa Inggris hari ini bersama Papa/Mama ya!",
    emoji: "🇬🇧",
    duration_minutes: 10,
    assigned_date: new Date().toISOString().split('T')[0],
    start_time: "09:00",
    end_time: "12:00",
    is_active: true
  },
  {
    id: "m2",
    type: "Menulis Huruf",
    target_text: "Menulis Kata Baru",
    description: "Ambil pensil dan bukumuu! Yuk belajar menulis 2 kata baru hari ini.",
    emoji: "✍️",
    duration_minutes: 15,
    assigned_date: new Date().toISOString().split('T')[0],
    start_time: "13:00",
    end_time: "15:00",
    is_active: true
  },
  {
    id: "m3",
    type: "Poster Hijaiyah",
    target_text: "Mengenal Huruf Hijaiyah",
    description: "Tunjuk dan sebutkan 3 huruf Hijaiyah di poster!",
    emoji: "🕋",
    duration_minutes: 5,
    assigned_date: new Date().toISOString().split('T')[0],
    start_time: "15:00",
    end_time: "17:00",
    is_active: true
  },
  {
    id: "m4",
    type: "Membaca",
    target_text: "Membaca Tanpa Terbata",
    description: "Baca 1 kalimat pendek dari buku ceritamu dengan lantang dan lancar!",
    emoji: "📖",
    duration_minutes: 10,
    assigned_date: new Date().toISOString().split('T')[0],
    start_time: "18:00",
    end_time: "20:00",
    is_active: true
  }
];
