import { useState } from 'react';
import confetti from 'canvas-confetti';
import { Envelope } from '@/components/Envelope';
import { PartyCard } from '@/components/PartyCard';
import { useBalloonsCanvas } from '@/hooks/useBalloonsCanvas';
import backgroundImage from '@/assets/background.jpg';

const confettiColors = ['#ff00cc', '#00ffff', '#ffffff', '#5f27cd', '#ff1493', '#ffd700'];

const Index = () => {
  const [isOpen, setIsOpen] = useState(false);
  const canvasRef = useBalloonsCanvas(isOpen);

  const handleOpen = () => {
    if (!isOpen) {
      setIsOpen(true);
      
      // Big confetti explosion
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.5, x: 0.5 },
        colors: confettiColors,
      });

      // Side bursts
      setTimeout(() => {
        confetti({
          particleCount: 80,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.6 },
          colors: confettiColors,
        });
        confetti({
          particleCount: 80,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.6 },
          colors: confettiColors,
        });
      }, 200);
    }
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden"
      style={{
        background: 'radial-gradient(circle at top, #301934 0%, #120016 50%, #05010a 100%)',
      }}
    >
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Gradient overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, rgba(5, 1, 10, 0.8) 100%)',
        }}
      />

      {/* Balloons Canvas */}
      <canvas
        ref={canvasRef}
        className={`fixed inset-0 z-[1] transition-opacity duration-1000 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center">
        <Envelope onOpen={handleOpen} isOpen={isOpen} />
        <PartyCard isVisible={isOpen} />
      </div>

      {/* Ambient particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 2 + Math.random() * 3,
              height: 2 + Math.random() * 3,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: i % 2 === 0 ? 'rgba(255, 0, 204, 0.3)' : 'rgba(0, 255, 255, 0.3)',
              animation: `float ${4 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Corner decorations */}
      <div className="fixed top-4 left-4 text-pink-500/40 text-3xl animate-pulse">✦</div>
      <div className="fixed top-4 right-4 text-cyan-400/40 text-3xl animate-pulse" style={{ animationDelay: '0.5s' }}>✦</div>
      <div className="fixed bottom-4 left-4 text-cyan-400/40 text-3xl animate-pulse" style={{ animationDelay: '1s' }}>✦</div>
      <div className="fixed bottom-4 right-4 text-pink-500/40 text-3xl animate-pulse" style={{ animationDelay: '1.5s' }}>✦</div>
    </div>
  );
};

export default Index;
