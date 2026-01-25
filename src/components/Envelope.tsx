import { useState } from 'react';

interface EnvelopeProps {
  onToggle: () => void;
  isOpen: boolean;
}

export const Envelope = ({ onToggle, isOpen }: EnvelopeProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`cursor-pointer transition-all duration-300 z-10 relative scale-90 sm:scale-100 ${
        isHovered && !isOpen ? 'translate-y-[-4px] scale-[0.92] sm:scale-[1.02]' : ''
      } ${!isOpen ? 'animate-float' : ''}`}
      onClick={onToggle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        filter: isHovered && !isOpen 
          ? 'drop-shadow(0 0 25px rgba(255, 0, 204, 0.7))' 
          : 'drop-shadow(0 0 15px rgba(255, 0, 204, 0.4))',
      }}
    >
      {/* Envelope container - exactly 300x200 like original */}
      <div 
        className="relative w-[300px] h-[200px]"
        style={{
          perspective: '1000px',
        }}
      >
        {/* Envelope base background */}
        <div 
          className="absolute inset-0 rounded-[5px]"
          style={{
            background: 'linear-gradient(135deg, #4b0082, #2d1b4e)',
            boxShadow: '0 0 35px rgba(255, 0, 204, 0.75), 0 0 18px rgba(0, 255, 255, 0.5)',
          }}
        />

        {/* Letter inside - z-index changes based on open state */}
        <div 
          className={`absolute left-1/2 -translate-x-1/2 w-[260px] h-[180px] rounded-[5px] flex flex-col justify-center items-center text-center p-3 transition-all duration-600 ease-in-out`}
          style={{
            background: 'linear-gradient(135deg, #00d2ff 0%, #3a7bd5 50%, #ff00cc 100%)',
            boxShadow: '0 -5px 15px rgba(0, 255, 255, 0.3)',
            bottom: isOpen ? '100px' : '0px',
            zIndex: isOpen ? 4 : 1,
            transitionDuration: '0.6s',
          }}
        >
          <h2 
            className="text-[26px] font-display font-bold uppercase tracking-[3px] m-0"
            style={{
              background: 'linear-gradient(180deg, #fff, #e0e0e0)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 2px rgba(255,255,255,0.5))',
            }}
          >
            Globos, pastel y diversión…
          </h2>
          <p className="text-white font-bold text-sm drop-shadow-md">
           ¡te espero en mi fiesta de cumpleaños!
          </p>
          
          {/* Demon Eye */}
          <div 
            className="w-10 h-10 rounded-full mt-3 relative"
            style={{
              backgroundColor: '#ff1744',
              boxShadow: '0 0 16px rgba(255, 23, 68, 0.9)',
              animation: 'eyePulse 1.4s infinite alternate',
            }}
          >
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[10px] h-[25px] bg-black rounded-full"
            />
          </div>
        </div>

        {/* Bottom pocket */}
        <div 
          className="absolute bottom-0 left-0 w-0 h-0 z-[3]"
          style={{
            borderLeft: '150px solid transparent',
            borderRight: '150px solid transparent',
            borderBottom: '100px solid #7b2cbf',
          }}
        />

        {/* Left pocket */}
        <div 
          className="absolute top-0 left-0 w-0 h-0 z-[2]"
          style={{
            borderTop: '100px solid transparent',
            borderBottom: '100px solid transparent',
            borderLeft: '150px solid #5a189a',
          }}
        />

        {/* Right pocket */}
        <div 
          className="absolute top-0 right-0 w-0 h-0 z-[2]"
          style={{
            borderTop: '100px solid transparent',
            borderBottom: '100px solid transparent',
            borderRight: '150px solid #5a189a',
          }}
        />

        {/* Flap - the triangular top */}
        <div 
          className="absolute top-0 left-0 w-0 h-0 origin-top transition-all duration-600 ease-in-out"
          style={{
            borderLeft: '150px solid transparent',
            borderRight: '150px solid transparent',
            borderTop: '110px solid #ff1493',
            filter: 'drop-shadow(0 -5px 5px rgba(255, 20, 147, 0.5))',
            transform: isOpen ? 'rotateX(180deg)' : 'rotateX(0deg)',
            zIndex: isOpen ? 0 : 5,
            transitionDuration: '0.6s',
          }}
        />

        {/* Seal - only visible when closed */}
        <div 
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full flex items-center justify-center z-[6] transition-opacity duration-300 ${
            isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
          style={{
            background: 'linear-gradient(135deg, #ffd700, #ff8c00)',
            boxShadow: '0 0 20px rgba(255, 215, 0, 0.7)',
            animation: !isOpen ? 'pulse 2s infinite' : 'none',
          }}
        >
          <span className="text-2xl">💜</span>
        </div>
      </div>

      {/* Click instruction */}
      <p className={`text-center mt-4 font-medium tracking-[0.15em] text-sm transition-all duration-300 ${
        isOpen ? 'text-cyan-400' : 'text-pink-400 animate-pulse'
      }`}>
        {isOpen ? '✧ CLICK PARA CERRAR ✧' : '✧ CLICK PARA ABRIR ✧'}
      </p>
    </div>
  );
};
