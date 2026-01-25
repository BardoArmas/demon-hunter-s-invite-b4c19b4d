interface PartyCardProps {
  isVisible: boolean;
  onClose: () => void;
}

export const PartyCard = ({ isVisible, onClose }: PartyCardProps) => {
  if (!isVisible) return null;

  return (
    <div className="animate-card-reveal mt-8">
      <div 
        className="relative max-w-lg mx-auto p-8 md:p-10 rounded-2xl overflow-hidden backdrop-blur-sm"
        style={{
          background: 'linear-gradient(135deg, rgba(75, 0, 130, 0.9), rgba(45, 27, 78, 0.95))',
          border: '2px solid rgba(255, 0, 204, 0.5)',
          boxShadow: '0 0 40px rgba(255, 0, 204, 0.4), 0 0 80px rgba(0, 255, 255, 0.2), inset 0 0 60px rgba(0, 0, 0, 0.4)',
        }}
      >
        {/* Close button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 z-20"
          style={{
            background: 'linear-gradient(135deg, #ff1493, #ff00cc)',
            boxShadow: '0 0 15px rgba(255, 0, 204, 0.6)',
          }}
        >
          <span className="text-white text-xl font-bold">✕</span>
        </button>

        {/* Glowing corners */}
        <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-cyan-400 rounded-tl-2xl opacity-70" />
        <div className="absolute top-0 right-0 w-24 h-24 border-t-2 border-r-2 border-pink-500 rounded-tr-2xl opacity-70" />
        <div className="absolute bottom-0 left-0 w-24 h-24 border-b-2 border-l-2 border-pink-500 rounded-bl-2xl opacity-70" />
        <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-cyan-400 rounded-br-2xl opacity-70" />

        {/* Header */}
        <div className="text-center mb-8">
          <p 
            className="text-sm tracking-[0.4em] mb-3 font-medium"
            style={{ color: '#00ffff' }}
          >
            ESTÁS INVITAD@ A
          </p>
          <h1 
            className="font-display text-4xl md:text-5xl font-bold mb-2"
            style={{
              background: 'linear-gradient(180deg, #ff00cc, #ff1493)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 10px rgba(255, 0, 204, 0.5))',
            }}
          >
            DEMON HUNTER
          </h1>
          <h2 
            className="font-display text-2xl md:text-3xl"
            style={{
              background: 'linear-gradient(180deg, #00ffff, #00d4ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 8px rgba(0, 255, 255, 0.5))',
            }}
          >
            K-POP PARTY
          </h2>
          <div className="flex justify-center items-center gap-3 mt-4 text-2xl">
            <span className="animate-pulse">👹</span>
            <span className="animate-bounce">🎤</span>
            <span className="animate-pulse delay-100">⚔️</span>
            <span className="animate-bounce delay-200">💜</span>
            <span className="animate-pulse delay-300">🔥</span>
          </div>
        </div>

        {/* Neon divider */}
        <div 
          className="w-full h-[2px] my-6"
          style={{
            background: 'linear-gradient(90deg, transparent, #ff00cc, #00ffff, transparent)',
            boxShadow: '0 0 10px rgba(255, 0, 204, 0.5)',
          }}
        />

        {/* Event Details */}
        <div className="space-y-5">
          <div className="flex items-center gap-4 p-3 rounded-xl" style={{ background: 'rgba(0, 0, 0, 0.3)' }}>
            <span className="text-3xl">📅</span>
            <div>
              <p className="text-cyan-400 text-xs tracking-widest font-medium">FECHA</p>
              <p className="text-white font-bold text-lg">15 de Febrero, 2025</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-3 rounded-xl" style={{ background: 'rgba(0, 0, 0, 0.3)' }}>
            <span className="text-3xl">🕗</span>
            <div>
              <p className="text-pink-400 text-xs tracking-widest font-medium">HORA</p>
              <p className="text-white font-bold text-lg">8:00 PM</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-3 rounded-xl" style={{ background: 'rgba(0, 0, 0, 0.3)' }}>
            <span className="text-3xl">📍</span>
            <div>
              <p className="text-purple-400 text-xs tracking-widest font-medium">LUGAR</p>
              <p className="text-white font-bold text-lg">Club Underworld</p>
              <p className="text-gray-400 text-sm">Calle Oscura #666</p>
            </div>
          </div>
        </div>

        {/* Neon divider */}
        <div 
          className="w-full h-[2px] my-6"
          style={{
            background: 'linear-gradient(90deg, transparent, #00ffff, #ff00cc, transparent)',
            boxShadow: '0 0 10px rgba(0, 255, 255, 0.5)',
          }}
        />

        {/* Dress Code */}
        <div className="text-center">
          <p className="text-pink-400 text-sm tracking-[0.3em] mb-2 font-medium">DRESS CODE</p>
          <p className="text-white text-lg">
            <span className="text-pink-500 font-bold">Dark</span> & <span className="text-cyan-400 font-bold">K-pop</span> Style
          </p>
          <p className="text-gray-400 text-sm mt-2">
            ¡Ven vestido como tu idol favorito versión demon hunter!
          </p>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p 
            className="font-display text-xl tracking-[0.2em]"
            style={{
              background: 'linear-gradient(90deg, #ffd700, #ff8c00)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 6px rgba(255, 215, 0, 0.6))',
            }}
          >
            ✦ 악마 사냥꾼 ✦
          </p>
          <p className="text-gray-500 text-xs mt-3">
            🎵 Click en los globos para explotarlos 🎵
          </p>
        </div>

        {/* Reset button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="mt-6 w-full py-3 rounded-xl font-bold tracking-widest text-sm transition-all duration-300 hover:scale-[1.02]"
          style={{
            background: 'linear-gradient(135deg, #5a189a, #7b2cbf)',
            border: '1px solid rgba(255, 0, 204, 0.5)',
            color: '#fff',
            boxShadow: '0 0 20px rgba(90, 24, 154, 0.5)',
          }}
        >
          🔄 CERRAR INVITACIÓN
        </button>
      </div>
    </div>
  );
};
