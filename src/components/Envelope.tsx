import { useState } from 'react';

interface EnvelopeProps {
  onOpen: () => void;
  isOpen: boolean;
}

export const Envelope = ({ onOpen, isOpen }: EnvelopeProps) => {
  const [isHovered, setIsHovered] = useState(false);

  if (isOpen) return null;

  return (
    <div
      className={`cursor-pointer transition-all duration-300 ${
        isHovered ? 'scale-110' : 'scale-100'
      } ${!isOpen ? 'animate-float' : ''}`}
      onClick={onOpen}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 -z-10 blur-3xl opacity-60 bg-gradient-to-r from-accent to-primary rounded-full scale-150" />
      
      {/* Envelope container */}
      <div className="relative perspective-1000">
        {/* Envelope body */}
        <div className="relative w-72 h-48 md:w-96 md:h-64">
          {/* Back of envelope */}
          <div 
            className="absolute inset-0 rounded-lg"
            style={{
              background: 'linear-gradient(135deg, hsl(0 0% 15%), hsl(0 0% 8%))',
              border: '2px solid hsl(330 100% 65% / 0.5)',
              boxShadow: 'var(--shadow-neon)',
            }}
          />
          
          {/* Envelope flap */}
          <div 
            className={`absolute top-0 left-0 right-0 origin-top transform-style-3d transition-transform duration-500 ${
              isHovered ? 'animate-envelope-shake' : ''
            }`}
            style={{
              height: '50%',
              clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
              background: 'linear-gradient(180deg, hsl(0 85% 40%), hsl(0 85% 25%))',
              border: '2px solid hsl(330 100% 65% / 0.5)',
              borderBottom: 'none',
            }}
          />
          
          {/* Seal */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center z-10"
            style={{
              background: 'var(--gradient-gold)',
              boxShadow: 'var(--shadow-gold)',
            }}
          >
            <span className="text-2xl md:text-3xl">👹</span>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute bottom-3 left-3 text-accent text-xl">✦</div>
          <div className="absolute bottom-3 right-3 text-accent text-xl">✦</div>
          <div className="absolute top-3 left-3 text-primary text-sm opacity-60">悪魔</div>
          <div className="absolute top-3 right-3 text-primary text-sm opacity-60">파티</div>
        </div>
      </div>
      
      {/* Click instruction */}
      <p className="text-center mt-6 text-accent animate-pulse font-medium tracking-widest text-sm">
        ✧ CLICK TO OPEN ✧
      </p>
    </div>
  );
};
