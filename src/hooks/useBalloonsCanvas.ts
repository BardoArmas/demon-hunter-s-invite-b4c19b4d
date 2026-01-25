import { useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';

interface Balloon {
  x: number;
  y: number;
  r: number;
  speed: number;
  color: string;
  offset: number;
}

const colors = ['#ff00cc', '#00ffff', '#ffffff', '#5f27cd', '#ff1493', '#00d4ff'];

export const useBalloonsCanvas = (active: boolean) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const balloonsRef = useRef<Balloon[]>([]);
  const animationRef = useRef<number | null>(null);

  const createBalloon = useCallback((canvasWidth: number, canvasHeight: number): Balloon => ({
    x: Math.random() * canvasWidth,
    y: canvasHeight + Math.random() * 200,
    r: 20 + Math.random() * 20,
    speed: 0.8 + Math.random() * 1.2,
    color: colors[Math.floor(Math.random() * colors.length)],
    offset: Math.random() * 100,
  }), []);

  const resetBalloon = useCallback((balloon: Balloon, canvasWidth: number, canvasHeight: number) => {
    balloon.x = Math.random() * canvasWidth;
    balloon.y = canvasHeight + Math.random() * 200;
    balloon.r = 20 + Math.random() * 20;
    balloon.speed = 0.8 + Math.random() * 1.2;
    balloon.color = colors[Math.floor(Math.random() * colors.length)];
    balloon.offset = Math.random() * 100;
  }, []);

  const drawBalloon = useCallback((ctx: CanvasRenderingContext2D, balloon: Balloon) => {
    // Balloon body with gradient
    const gradient = ctx.createRadialGradient(
      balloon.x - balloon.r * 0.3,
      balloon.y - balloon.r * 0.3,
      0,
      balloon.x,
      balloon.y,
      balloon.r
    );
    gradient.addColorStop(0, 'rgba(255,255,255,0.4)');
    gradient.addColorStop(0.5, balloon.color);
    gradient.addColorStop(1, balloon.color);

    ctx.beginPath();
    ctx.ellipse(balloon.x, balloon.y, balloon.r * 0.85, balloon.r, 0, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    // Glow effect
    ctx.shadowColor = balloon.color;
    ctx.shadowBlur = 15;
    ctx.fill();
    ctx.shadowBlur = 0;

    // Balloon knot
    ctx.beginPath();
    ctx.moveTo(balloon.x - 4, balloon.y + balloon.r);
    ctx.lineTo(balloon.x, balloon.y + balloon.r + 8);
    ctx.lineTo(balloon.x + 4, balloon.y + balloon.r);
    ctx.fillStyle = balloon.color;
    ctx.fill();

    // String
    ctx.beginPath();
    ctx.moveTo(balloon.x, balloon.y + balloon.r + 8);
    ctx.bezierCurveTo(
      balloon.x - 5, balloon.y + balloon.r + 30,
      balloon.x + 5, balloon.y + balloon.r + 50,
      balloon.x, balloon.y + balloon.r + 60
    );
    ctx.strokeStyle = 'rgba(200, 200, 200, 0.6)';
    ctx.lineWidth = 1;
    ctx.stroke();
  }, []);

  const handleClick = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    balloonsRef.current.forEach(balloon => {
      const distance = Math.hypot(mx - balloon.x, my - balloon.y);
      if (distance < balloon.r) {
        // Explode confetti at balloon position
        confetti({
          particleCount: 40,
          spread: 60,
          startVelocity: 25,
          origin: {
            x: balloon.x / canvas.width,
            y: balloon.y / canvas.height
          },
          colors: [balloon.color, '#ffffff', '#ff00cc']
        });
        // Reset balloon
        resetBalloon(balloon, canvas.width, canvas.height);
      }
    });
  }, [resetBalloon]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    if (active) {
      // Initialize balloons
      balloonsRef.current = Array.from({ length: 18 }, () => 
        createBalloon(canvas.width, canvas.height)
      );

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        balloonsRef.current.forEach(balloon => {
          balloon.y -= balloon.speed;
          balloon.x += Math.sin((balloon.y + balloon.offset) * 0.015) * 0.8;

          if (balloon.y < -100) {
            resetBalloon(balloon, canvas.width, canvas.height);
          }

          drawBalloon(ctx, balloon);
        });

        animationRef.current = requestAnimationFrame(animate);
      };

      animate();
      canvas.addEventListener('click', handleClick);
    }

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('click', handleClick);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [active, createBalloon, resetBalloon, drawBalloon, handleClick]);

  return canvasRef;
};
