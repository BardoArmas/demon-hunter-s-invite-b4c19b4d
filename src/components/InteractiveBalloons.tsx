import React, { useState, useEffect, useCallback, useRef } from 'react';
import confetti from 'canvas-confetti';

interface Balloon {
  id: number;
  x: number;
  y: number;
  r: number;
  speed: number;
  color: string;
  offset: number;
}

const colors = ['#ff00cc', '#00ffff', '#ffffff', '#5f27cd', '#ff1493', '#00d4ff'];

export const InteractiveBalloons = () => {
  const [balloons, setBalloons] = useState<Balloon[]>([]);
  const animationRef = useRef<number | null>(null);

  const createBalloon = useCallback((id: number): Balloon => ({
    id,
    x: Math.random() * 100,
    y: 110 + Math.random() * 100,
    r: 30 + Math.random() * 20,
    speed: 0.5 + Math.random() * 1.5,
    color: colors[Math.floor(Math.random() * colors.length)],
    offset: Math.random() * 100,
  }), []);

  useEffect(() => {
    const initialBalloons = Array.from({ length: 15 }).map((_, i) => createBalloon(i));
    setBalloons(initialBalloons);

    const animate = () => {
      setBalloons(prev => prev.map(b => ({
        ...b,
        y: b.y - b.speed,
        x: b.x + Math.sin((b.y + b.offset) * 0.015) * 0.1,
        // Reset balloon if it goes off screen
        ...(b.y < -20 ? createBalloon(b.id) : {})
      })));
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [createBalloon]);

  const popBalloon = (id: number, x: number, y: number, color: string) => {
    // Explode confetti
    confetti({
      particleCount: 40,
      spread: 60,
      startVelocity: 25,
      origin: {
        x: x / 100,
        y: y / 100
      },
      colors: [color, '#ffffff', '#ff00cc']
    });

    // Reset balloon
    setBalloons(prev => prev.map(b => b.id === id ? { ...createBalloon(id), y: 110 } : b));
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {balloons.map(balloon => (
        <div
          key={balloon.id}
          onClick={(e) => {
            e.stopPropagation();
            popBalloon(balloon.id, balloon.x, balloon.y, balloon.color);
          }}
          className="absolute cursor-pointer pointer-events-auto transition-transform active:scale-150 group"
          style={{
            left: `${balloon.x}%`,
            top: `${balloon.y}%`,
            width: balloon.r * 2,
            height: balloon.r * 2.4,
            transform: `translate(-50%, -50%) rotate(${Math.sin(balloon.y / 20) * 10}deg)`,
          }}
        >
          {/* Balloon Body */}
          <div 
            className="w-full h-full rounded-full relative shadow-lg"
            style={{
              backgroundColor: balloon.color,
              borderRadius: '50% 50% 50% 50% / 40% 40% 60% 60%',
              boxShadow: `inset -10px -10px 20px rgba(0,0,0,0.2), 0 0 15px ${balloon.color}44`,
            }}
          >
            {/* Highlight */}
            <div className="absolute top-[15%] left-[20%] w-[25%] h-[20%] bg-white/30 rounded-full blur-[2px]" />
            
            {/* Balloon Knot */}
            <div 
              className="absolute bottom-[-5px] left-1/2 -translate-x-1/2 w-4 h-3"
              style={{
                backgroundColor: balloon.color,
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)'
              }}
            />
          </div>

          {/* Balloon String */}
          <div 
            className="absolute bottom-[-40px] left-1/2 w-[1px] h-[50px] bg-white/40 origin-top"
            style={{ 
              transform: `translateX(-50%) rotate(${Math.sin(balloon.y / 10) * 5}deg)`,
              filter: 'drop-shadow(0 0 2px rgba(255,255,255,0.2))'
            }}
          />
        </div>
      ))}
    </div>
  );
};
