import { useState } from 'react';

interface EnvelopeProps {
  onOpen: () => void;
  isOpen: boolean;
}

export const Envelope = ({ onOpen, isOpen }: EnvelopeProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`cursor-pointer transition-all duration-300 z-10 relative ${
        isHovered && !isOpen ? 'scale-105' : 'scale-100'
      } ${!isOpen ? 'animate-float' : ''}`}
      onClick={onOpen}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        filter: isHovered && !isOpen 
          ? 'drop-shadow(0 0 25px rgba(255, 0, 204, 0.7))' 
          : 'drop-shadow(0 0 15px rgba(255, 0, 204, 0.4))',
      }}
    >
      {/* Envelope container */}
      <div className="relative w-[300px] h-[200px] md:w-[340px] md:h-[230px]">
        {/* Envelope base */}
        <div 
          className="absolute inset-0 rounded-lg"
          style={{
            background: 'linear-gradient(135deg, #4b0082, #2d1b4e)',
            boxShadow: '0 0 35px rgba(255, 0, 204, 0.75), 0 0 18px rgba(0, 255, 255, 0.5)',
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

        {/* Bottom pocket */}
        <div 
          className="absolute bottom-0 left-0 w-0 h-0 z-[3]"
          style={{
            borderLeft: '150px solid transparent',
            borderRight: '150px solid transparent',
            borderBottom: '100px solid #7b2cbf',
          }}
        />

        {/* Letter inside */}
        <div 
          className={`absolute left-1/2 -translate-x-1/2 w-[260px] md:w-[300px] h-[180px] md:h-[200px] rounded-lg flex flex-col justify-center items-center text-center p-4 transition-all duration-700 ease-out ${
            isOpen ? 'z-[4]' : 'z-[1]'
          }`}
          style={{
            background: 'linear-gradient(135deg, #00d2ff 0%, #3a7bd5 50%, #ff00cc 100%)',
            boxShadow: '0 -5px 25px rgba(0, 255, 255, 0.4)',
            bottom: isOpen ? '110px' : '0',
          }}
        >
          <h2 
            className="text-xl md:text-2xl font-display font-bold uppercase tracking-[3px] mb-1"
            style={{
              background: 'linear-gradient(180deg, #fff, #e0e0e0)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.6))',
            }}
          >
            DEMON HUNTER
          </h2>
          <p className="text-white font-bold text-sm tracking-wider drop-shadow-lg">
            🎤 K-Pop Party 🎤
          </p>
          
          {/* Demon Eye */}
          <div 
            className="w-10 h-10 rounded-full mt-3 relative animate-pulse"
            style={{
              backgroundColor: '#ff1744',
              boxShadow: '0 0 20px rgba(255, 23, 68, 0.9)',
            }}
          >
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-7 bg-black rounded-full"
            />
          </div>

          <p className="text-white/80 text-xs mt-2 font-medium">
            ✦ Click para abrir ✦
          </p>
        </div>

        {/* Flap */}
        <div 
          className={`absolute top-0 left-0 w-0 h-0 transition-all duration-700 ease-in-out origin-top ${
            isOpen ? 'z-[0]' : 'z-[5]'
          }`}
          style={{
            borderLeft: '150px solid transparent',
            borderRight: '150px solid transparent',
            borderTop: '110px solid #ff1493',
            filter: 'drop-shadow(0 -5px 10px rgba(255, 20, 147, 0.5))',
            transform: isOpen ? 'rotateX(180deg)' : 'rotateX(0deg)',
            transformStyle: 'preserve-3d',
          }}
        />

        {/* Seal */}
        {!isOpen && (
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center z-[6] animate-pulse"
            style={{
              background: 'linear-gradient(135deg, #ffd700, #ff8c00)',
              boxShadow: '0 0 20px rgba(255, 215, 0, 0.7)',
            }}
          >
            <span className="text-2xl md:text-3xl">👹</span>
          </div>
        )}
      </div>

      {/* Click instruction */}
      {!isOpen && (
        <p className="text-center mt-6 text-accent animate-pulse font-medium tracking-[0.2em] text-sm">
          ✧ CLICK PARA ABRIR ✧
        </p>
      )}
    </div>
  );
};
