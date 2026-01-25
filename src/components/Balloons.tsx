import { useEffect, useState } from 'react';

interface Balloon {
  id: number;
  left: number;
  delay: number;
  duration: number;
  color: string;
  size: number;
}

const balloonColors = [
  'hsl(330, 100%, 65%)', // neon pink
  'hsl(0, 85%, 50%)',    // demon red
  'hsl(270, 80%, 50%)',  // purple
  'hsl(200, 100%, 60%)', // blue
  'hsl(0, 0%, 10%)',     // black
];

export const Balloons = ({ active }: { active: boolean }) => {
  const [balloons, setBalloons] = useState<Balloon[]>([]);

  useEffect(() => {
    if (active) {
      const newBalloons: Balloon[] = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        left: 5 + Math.random() * 90,
        delay: Math.random() * 1.5,
        duration: 4 + Math.random() * 3,
        color: balloonColors[Math.floor(Math.random() * balloonColors.length)],
        size: 40 + Math.random() * 30,
      }));
      setBalloons(newBalloons);
    }
  }, [active]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-40">
      {balloons.map((balloon) => (
        <div
          key={balloon.id}
          className="absolute bottom-0"
          style={{
            left: `${balloon.left}%`,
            animation: `balloon-rise ${balloon.duration}s ease-out ${balloon.delay}s forwards`,
          }}
        >
          {/* Balloon */}
          <div
            className="relative"
            style={{
              width: balloon.size,
              height: balloon.size * 1.2,
            }}
          >
            <div
              className="w-full h-full rounded-full"
              style={{
                backgroundColor: balloon.color,
                boxShadow: `inset -10px -10px 20px rgba(0,0,0,0.3), 0 0 20px ${balloon.color}50`,
              }}
            />
            {/* Balloon knot */}
            <div
              className="absolute left-1/2 -translate-x-1/2"
              style={{
                bottom: -5,
                width: 8,
                height: 8,
                backgroundColor: balloon.color,
                clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
              }}
            />
            {/* String */}
            <div
              className="absolute left-1/2 -translate-x-1/2"
              style={{
                bottom: -50,
                width: 1,
                height: 50,
                backgroundColor: 'hsl(0, 0%, 60%)',
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
