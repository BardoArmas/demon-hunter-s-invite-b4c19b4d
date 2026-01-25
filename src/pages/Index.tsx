import { useState, useCallback, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Envelope } from '@/components/Envelope';
import { PartyCard } from '@/components/PartyCard';
import { useBalloonsCanvas } from '@/hooks/useBalloonsCanvas';
import backgroundImage from '@/assets/background.webp';
import goldenMp3 from '@/assets/Golden.mp3';

const confettiColors = ['#ff00cc', '#00ffff', '#ffffff', '#5f27cd', '#ff1493', '#ffd700'];

const Index = () => {
  const [isOpen, setIsOpen] = useState(false);
  const canvasRef = useBalloonsCanvas(isOpen);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(goldenMp3);
    audioRef.current.volume = 0.5; // Ajustar volumen inicial si es necesario
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (isOpen) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(error => {
          console.log("Audio playback failed:", error);
        });
      } else {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  }, [isOpen]);

  const fireConfetti = useCallback(() => {
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
  }, []);

  const handleToggle = useCallback(() => {
    const newState = !isOpen;
    setIsOpen(newState);
    
    if (newState) {
      fireConfetti();
    }
  }, [isOpen, fireConfetti]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

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

      {/* Envelope Container - Absolute Centered */}
      <div 
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-1000 ease-in-out ${
            isOpen ? 'opacity-0 pointer-events-none scale-110' : 'opacity-100 scale-100'
          }`}
          style={{ transitionDelay: isOpen ? '1s' : '0s' }}
      >
        <Envelope onToggle={handleToggle} isOpen={isOpen} />
      </div>

      {/* Main content */}
      <div 
        className={`relative z-10 flex flex-col items-center max-h-screen overflow-y-auto w-full transition-all duration-300 ${
          isOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        <div className="w-full py-8 pb-40">
          <PartyCard isVisible={isOpen} onClose={handleClose} />
        </div>
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
