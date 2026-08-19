import confetti from 'canvas-confetti';

export function useConfetti() {
  const triggerConfetti = () => {
    // Basic burst
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFD93D', '#6EC6FF', '#7DDBA3', '#FF9BB3', '#C3AEF5']
    });
  };

  const triggerEpicConfetti = () => {
    // Epic burst for hero unlocks
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FFD93D', '#6EC6FF']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#FF9BB3', '#7DDBA3']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  return { triggerConfetti, triggerEpicConfetti };
}
