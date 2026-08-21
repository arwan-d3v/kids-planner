import { Routine, Mission, Hero, TimeCategory } from "@/lib/supabase/types";

export const defaultRoutines: Routine[] = [
  { id: "r1", title: "Bangun Pagi", icon: "🌅", time_category: "Pagi", is_active: true, weekend_only: false, sort_order: 1, parenting_guide: "Sambut anak dengan senyuman hangat dan pelukan saat bangun. Hindari menyuruh anak dengan nada tinggi di pagi hari agar mood mereka terjaga sepanjang hari." },
  { id: "r2", title: "Mandi Pagi", icon: "🛁", time_category: "Pagi", is_active: true, weekend_only: false, sort_order: 2, parenting_guide: "Jadikan waktu mandi menyenangkan, ajak bernyanyi atau bermain air sejenak. Berikan pujian saat mereka mandiri menyabuni tubuh." },
  { id: "r3", title: "Sikat Gigi Pagi", icon: "🦷", time_category: "Pagi", is_active: true, weekend_only: false, sort_order: 3, parenting_guide: "Beri contoh menyikat gigi yang benar secara langsung. Lomba sikat gigi bersama bisa meningkatkan antusiasme anak!" },
  { id: "r4", title: "Sholat Subuh", icon: "🕌", time_category: "Pagi", is_active: true, weekend_only: false, sort_order: 4, parenting_guide: "Ajak anak beribadah bersama dengan lembut. Jangan paksa jika masih mengantuk, biarkan mereka melihat dan meniru kebiasaan baik Anda." },
  { id: "r5", title: "Sholat Dzuhur", icon: "🕌", time_category: "Siang", is_active: true, weekend_only: false, sort_order: 5, parenting_guide: "Diskusikan tentang rasa syukur saat beribadah bersama di tengah hari. Jadikan ini waktu jeda yang menenangkan bagi anak." },
  { id: "r6", title: "Tidur Siang", icon: "😴", time_category: "Siang", is_active: true, weekend_only: false, sort_order: 6, parenting_guide: "Ciptakan suasana redup dan nyaman. Bacakan cerita pendek agar anak merasa rileks sebelum tertidur." },
  { id: "r7", title: "Main Lego", icon: "🧱", time_category: "Siang", is_active: true, weekend_only: false, sort_order: 7, parenting_guide: "Bermain bersama adalah investasi emosional. Ikuti alur cerita mereka saat menyusun balok tanpa terlalu banyak mengarahkan." },
  { id: "r8", title: "Bereskan Mainan", icon: "🧸", time_category: "Sore", is_active: true, weekend_only: false, sort_order: 8, parenting_guide: "Lakukan seperti sebuah misi! 'Yuk lihat siapa yang bisa memasukkan mainan lebih cepat ke dalam kotak!'" },
  { id: "r9", title: "Mandi Sore", icon: "🚿", time_category: "Sore", is_active: true, weekend_only: false, sort_order: 9, parenting_guide: "Tanyakan hal paling menyenangkan yang mereka alami hari ini sambil membantu (jika perlu) mereka membersihkan diri." },
  { id: "r10", title: "Sholat Ashar", icon: "🕌", time_category: "Sore", is_active: true, weekend_only: false, sort_order: 10, parenting_guide: "Apresiasi usaha anak ketika mulai mengambil wudhu sendiri. Berikan senyuman penuh kebanggaan." },
  { id: "r11", title: "Sholat Maghrib", icon: "🕌", time_category: "Malam", is_active: true, weekend_only: false, sort_order: 11, parenting_guide: "Sesi ibadah malam sangat baik untuk membangun rasa damai di keluarga. Akhiri dengan doa kebaikan untuk anak agar terdengar olehnya." },
  { id: "r12", title: "Cuci Piring Bekas Makan", icon: "🍽️", time_category: "Malam", is_active: true, weekend_only: false, sort_order: 12, parenting_guide: "Biarkan mereka mencuci piring plastik/melamin mereka sendiri. Tumbuhkan rasa tanggung jawab, jangan hiraukan sedikit air yang tumpah." },
  { id: "r13", title: "Sholat Isya", icon: "🕌", time_category: "Malam", is_active: true, weekend_only: false, sort_order: 13, parenting_guide: "Jika anak kelelahan, tetap apresiasi kehadirannya meski hanya duduk di samping Anda saat beribadah." },
  { id: "r14", title: "Sikat Gigi Malam", icon: "🦷", time_category: "Malam", is_active: true, weekend_only: false, sort_order: 14, parenting_guide: "Jadikan ritual penutup sebelum tidur. Ceritakan tentang kuman-kuman nakal yang lari saat melihat sikat giginya yang hebat!" },
  { id: "r15", title: "Jalan-jalan Keluarga", icon: "🚶", time_category: "Sore", is_active: true, weekend_only: true, sort_order: 15, parenting_guide: "Lepaskan gadget, fokus 100% pada anak. Dengarkan celoteh mereka dan berikan tanggapan yang antusias." },

  // Additional Tasks (Tugas Tambahan Opsional)
  { id: "a1", title: "Membantu Menyapu", icon: "🧹", time_category: "Sore", is_active: true, weekend_only: false, sort_order: 16, is_additional_task: true, parenting_guide: "Berikan sapu kecil jika ada. Puji usahanya meski belum bersih, fokus pada kemauan dan niat baiknya membantu orang tua." },
  { id: "a2", title: "Bantu Siram Tanaman", icon: "🪴", time_category: "Pagi", is_active: true, weekend_only: false, sort_order: 17, is_additional_task: true, parenting_guide: "Ajak anak mengamati daun atau bunga sambil menyiram. Ajarkan empati merawat makhluk hidup lainnya." },
  { id: "a3", title: "Merapikan Meja", icon: "🧽", time_category: "Malam", is_active: true, weekend_only: false, sort_order: 18, is_additional_task: true, parenting_guide: "Libatkan dengan tugas ringan seperti mengelap meja. Ucapkan 'Terima kasih atas bantuanmu, Ibu sangat terbantu!'" },
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
    is_active: true,
    parenting_guide: "Jangan jadikan ini beban hafalan. Gunakan gerakan tubuh (TPR) atau nyanyian saat mengenalkan kata baru. Fokus pada keceriaan, bukan sekadar benar salah."
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
    is_active: true,
    parenting_guide: "Pastikan cara memegang pensil tidak membuat tangan anak kaku. Beri jeda istirahat jika anak tampak mulai frustrasi. Pujilah hasil coretannya sebagai sebuah karya."
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
    is_active: true,
    parenting_guide: "Bermain tebak-tebakan huruf bisa sangat seru. 'Wah, huruf yang ada titiknya di atas namanya apa ya?'. Biarkan anak yang menjadi 'guru' sesekali."
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
    is_active: true,
    parenting_guide: "Kesabaran adalah kunci. Jangan memotong terlalu cepat saat anak mengeja. Beri senyuman, tatap matanya, dan beri semangat: 'Kamu pasti bisa!'"
  }
];
