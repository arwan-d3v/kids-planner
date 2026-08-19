"use client";

import { useCallback } from "react";

type AudioType = 'click' | 'success' | 'mission_done' | 'hero_reveal';

export function useAudio() {
  const playAudio = useCallback((type: AudioType) => {
    // We create a new Audio object each time so overlapping sounds play correctly
    const audio = new Audio(`/audio/${type}.mp3`);
    audio.volume = 0.5; // default volume
    
    // Play the audio and catch any errors (e.g. if file missing or browser blocked)
    audio.play().catch((err) => {
      console.warn(`Could not play audio ${type}:`, err);
    });
  }, []);

  return { playAudio };
}
