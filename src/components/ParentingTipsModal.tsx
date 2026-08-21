"use client";

interface ParentingTipsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ParentingTipsModal({ isOpen, onClose }: ParentingTipsModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-fade-in backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[500px] max-h-[80vh] overflow-y-auto rounded-[2rem] bg-surface p-6 shadow-2xl animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-surface-card text-text-muted shadow-sm hover:bg-gray-100"
        >
          ✕
        </button>

        <div className="flex flex-col items-center py-4">
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-mint-light text-5xl shadow-button">
            💡
          </div>
          <h2 className="text-2xl font-black text-center text-text-primary">
            Parenting Guidelines
          </h2>
          <p className="mt-2 text-center text-sm font-bold text-mint drop-shadow-sm">
            Dari Senior Volunteer Parenting Advisor
          </p>

          <div className="mt-6 space-y-6 w-full px-2 text-sm text-text-secondary">
            <p className="leading-relaxed font-medium">
              Aplikasi ini dirancang bukan sekadar sebagai daftar tugas harian anak, tetapi sebagai alat bantu untuk mendekatkan hubungan ayah, ibu, dan buah hati tercinta. Berikut adalah prinsip-prinsip utama yang perlu diingat:
            </p>

            <div className="rounded-xl bg-orange-light/30 border border-orange/20 p-4">
              <h3 className="font-bold text-orange text-base mb-2">1. Jadikan Sebuah Permainan 🎲</h3>
              <p className="leading-relaxed">
                Anak belajar paling baik saat mereka bermain. Jangan gunakan nada memerintah. Ubah tugas seperti &quot;Rapikan mainanmu&quot; menjadi misi &quot;Yuk, kita lihat siapa yang bisa melempar mainan ke keranjang paling banyak!&quot;.
              </p>
            </div>

            <div className="rounded-xl bg-sky-light/30 border border-sky/20 p-4">
              <h3 className="font-bold text-sky text-base mb-2">2. Fokus pada Usaha, Bukan Hasil 🌟</h3>
              <p className="leading-relaxed">
                Saat anak mencoba menyapu atau melipat selimut, hasilnya mungkin tidak akan sempurna. Puji niat dan usahanya (&quot;Wah, Ibu senang sekali adik mau bantu!&quot;), bukan mengkritik hasil kerjanya.
              </p>
            </div>

            <div className="rounded-xl bg-lavender-light/30 border border-lavender/20 p-4">
              <h3 className="font-bold text-lavender text-base mb-2">3. Momen Koneksi Hati ❤️</h3>
              <p className="leading-relaxed">
                Jadikan waktu rutin seperti sikat gigi atau mandi sebagai waktu untuk mengobrol. Tanyakan &quot;Apa hal paling lucu yang adik alami hari ini?&quot;. Waktu kebersamaan tanpa distraksi gadget sangat berharga.
              </p>
            </div>

            <div className="rounded-xl bg-sunshine-light/30 border border-sunshine/20 p-4">
              <h3 className="font-bold text-[#8A5A19] text-base mb-2">4. Rayakan Kemenangan Kecil 🎉</h3>
              <p className="leading-relaxed">
                Setiap kali mereka mencentang tugas di aplikasi ini, rayakan bersama mereka. Tepuk tangan, beri pelukan hangat, atau high-five. Kegembiraan Anda akan membuat mereka ketagihan melakukan hal baik.
              </p>
            </div>

            <p className="text-center font-bold text-mint italic mt-4">
              &quot;Keluarga yang kuat dibangun dari kebiasaan-kebiasaan kecil penuh cinta yang dilakukan setiap hari.&quot;
            </p>
          </div>

          <button
            onClick={onClose}
            className="mt-8 w-full rounded-2xl bg-mint px-6 py-4 text-lg font-black text-white shadow-button active:scale-95 transition-transform"
          >
            Mengerti!
          </button>
        </div>
      </div>
    </div>
  );
}
