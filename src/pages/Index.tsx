import { useState } from 'react';
import { Envelope } from '@/components/Envelope';
import { Confetti } from '@/components/Confetti';
import { Balloons } from '@/components/Balloons';
import { PartyCard } from '@/components/PartyCard';
import backgroundImage from '@/assets/background.jpg';

const Index = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showEffects, setShowEffects] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    setShowEffects(true);
    
    // Stop effects after a while to clean up
    setTimeout(() => {
      setShowEffects(false);
    }, 5000);
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Dark overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background/80"
        style={{
          backdropFilter: 'blur(2px)',
        }}
      />

      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-accent/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Effects */}
      <Confetti active={showEffects} />
      <Balloons active={showEffects} />

      {/* Main content */}
      <div className="relative z-10">
        {!isOpen && <Envelope onOpen={handleOpen} isOpen={isOpen} />}
        <PartyCard isVisible={isOpen} />
      </div>

      {/* Corner decorations */}
      <div className="fixed top-4 left-4 text-accent/50 text-2xl animate-pulse">✦</div>
      <div className="fixed top-4 right-4 text-primary/50 text-2xl animate-pulse delay-100">✦</div>
      <div className="fixed bottom-4 left-4 text-gold/50 text-2xl animate-pulse delay-200">✦</div>
      <div className="fixed bottom-4 right-4 text-accent/50 text-2xl animate-pulse delay-300">✦</div>
    </div>
  );
};

export default Index;
