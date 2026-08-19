import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  // Delete old missions
  await supabase.from('missions').delete().neq('id', '0');

  const today = new Date().toISOString().split('T')[0];

  const newMissions = [
    {
      id: "m1",
      type: "Basic English",
      target_text: "Menghafal Frasa Bahasa Inggris",
      description: "Coba hafalkan 3 kata bahasa Inggris hari ini bersama Papa/Mama ya!",
      emoji: "🇬🇧",
      duration_minutes: 10,
      assigned_date: today,
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
      assigned_date: today,
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
      assigned_date: today,
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
      assigned_date: today,
      start_time: "18:00",
      end_time: "20:00",
      is_active: true
    }
  ];

  const { error } = await supabase.from('missions').insert(newMissions);
  console.log("Insert result:", error ? error : "Success");
}
main();
