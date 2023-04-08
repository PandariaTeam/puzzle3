import confetti from 'canvas-confetti';

// go Buckeyes!
const colors = ['#bb0000', '#ffffff'];

export function frame() {
  const end = Date.now() + 3 * 1000;
  const innerFrame = () => {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors
    });
    if (Date.now() < end) {
      requestAnimationFrame(innerFrame);
    }
  };
  innerFrame();
}
