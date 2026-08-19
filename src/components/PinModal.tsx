"use client";

import { useState } from "react";
import { useAudio } from "@/hooks/useAudio";

interface PinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  title?: string;
}

export default function PinModal({ isOpen, onClose, onSuccess, title = "Masukkan PIN Admin" }: PinModalProps) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const { playAudio } = useAudio();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPin = process.env.NEXT_PUBLIC_ADMIN_PIN;
    
    if (pin === correctPin) {
      setError(false);
      setPin("");
      onSuccess();
    } else {
      setError(true);
      playAudio('click'); // maybe an error sound later, click for now
      setPin("");
    }
  };

  const handleClose = () => {
    setPin("");
    setError(false);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-text-primary/60 p-4 backdrop-blur-sm animate-fade-in"
      onClick={handleClose}
    >
      <div 
        className="relative w-full max-w-[320px] overflow-hidden rounded-[2rem] bg-surface p-6 shadow-2xl animate-pop"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-surface-card text-text-muted shadow-sm hover:bg-gray-100"
        >
          ✕
        </button>

        <div className="flex flex-col items-center py-2">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-light text-3xl shadow-sm">
            🔒
          </div>
          <h2 className="text-xl font-black text-center text-text-primary">
            {title}
          </h2>
          <p className="mt-2 text-center text-xs font-bold text-text-secondary">
            Minta bantuan Papa/Mama untuk verifikasi ya!
          </p>

          <form onSubmit={handleSubmit} className="mt-6 w-full">
            <input
              type="password"
              inputMode="numeric"
              pattern="[0-9]*"
              value={pin}
              onChange={(e) => {
                setPin(e.target.value);
                if (error) setError(false);
              }}
              placeholder="••••••••"
              autoFocus
              className={`w-full rounded-xl border-4 bg-white px-4 py-3 text-center text-2xl font-black tracking-[0.5em] text-text-primary outline-none transition-colors ${error ? 'border-pink text-pink' : 'border-lavender-light focus:border-mint'}`}
            />
            {error && (
              <p className="mt-2 text-center text-xs font-bold text-pink animate-wiggle">
                PIN salah. Coba lagi!
              </p>
            )}

            <button
              type="submit"
              className="mt-6 w-full rounded-xl bg-gradient-to-r from-sunshine to-orange px-6 py-3 text-lg font-black text-white shadow-button active:scale-95 transition-transform"
            >
              Verifikasi
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
