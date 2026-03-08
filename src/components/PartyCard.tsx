interface PartyCardProps {
  isVisible: boolean;
  onClose: () => void;
}

export const PartyCard = ({ isVisible, onClose }: PartyCardProps) => {
  if (!isVisible) return null;

  return (
    <div className="animate-card-reveal mt-8 pointer-events-auto w-full px-4 md:px-0">
      <div 
        className="relative w-full max-w-lg mx-auto p-6 md:p-10 rounded-2xl overflow-hidden shadow-2xl bg-white"
        style={{
          border: '3px solid #D4AF37', // Gold border
        }}
      >
        {/* Close button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 z-20"
          style={{
            background: 'linear-gradient(135deg, #D4AF37, #C5A028)',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
          }}
        >
          <span className="text-white text-sm font-bold">✕</span>
        </button>

        {/* Decorative corners (Gold & Lilac) */}
        <div className="absolute top-0 left-0 w-16 h-16 md:w-24 md:h-24 border-t-4 border-l-4 border-[#D4AF37] rounded-tl-2xl opacity-80" />
        <div className="absolute top-0 right-0 w-16 h-16 md:w-24 md:h-24 border-t-4 border-r-4 border-[#B19CD9] rounded-tr-2xl opacity-80" />
        <div className="absolute bottom-0 left-0 w-16 h-16 md:w-24 md:h-24 border-b-4 border-l-4 border-[#B19CD9] rounded-bl-2xl opacity-80" />
        <div className="absolute bottom-0 right-0 w-16 h-16 md:w-24 md:h-24 border-b-4 border-r-4 border-[#D4AF37] rounded-br-2xl opacity-80" />

        {/* Header */}
        <div className="text-center mb-8">
          <p 
            className="text-[10px] sm:text-xs md:text-sm tracking-[0.4em] mb-3 font-bold"
            style={{ color: '#D4AF37' }}
          >
            ESTÁS INVITAD@ AL CUMPLEAÑOS DE
          </p>
          <h1 
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-2"
            style={{
              color: '#8A2BE2', // Lilac/Purple
              textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            Dayana Michelle
          </h1>
          <h2 
            className="font-display text-xl sm:text-2xl md:text-3xl font-semibold"
            style={{
              color: '#D4AF37',
            }}
          >
            K-POP PARTY
          </h2>
          <div className="flex justify-center items-center gap-3 mt-4 text-2xl">
            <span className="animate-pulse">✨</span>
            <span className="animate-bounce">🎤</span>
            <span className="animate-pulse delay-100">👑</span>
            <span className="animate-bounce delay-200">🎤</span>
            <span className="animate-pulse delay-300">✨</span>
          </div>
        </div>

        {/* Elegant divider */}
        <div 
          className="w-full h-[2px] my-6"
          style={{
            background: 'linear-gradient(90deg, transparent, #D4AF37, #B19CD9, transparent)',
          }}
        />

        {/* Event Details */}
        <div className="space-y-5">
          <div className="flex items-center gap-4 p-4 rounded-xl border border-[#B19CD9]/30 bg-[#F8F4FF]">
            <span className="text-2xl md:text-3xl">📅</span>
            <div>
              <p className="text-[#8A2BE2] text-xs tracking-widest font-bold">FECHA</p>
              <p className="text-gray-800 font-bold text-base md:text-lg">Sabado 16 de Abril del 2026</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl border border-[#D4AF37]/30 bg-[#FFFDF5]">
            <span className="text-2xl md:text-3xl">🕗</span>
            <div>
              <p className="text-[#D4AF37] text-xs tracking-widest font-bold">HORA</p>
              <p className="text-gray-800 font-bold text-base md:text-lg">6:00 PM</p>
            </div>
          </div>

          <a 
            href="https://maps.app.goo.gl/ZKyQ7gkBGDGfkuCu7" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 rounded-xl border border-[#B19CD9]/30 bg-[#F8F4FF] transition-all hover:bg-[#F0E8FF] hover:border-[#8A2BE2]/50 group"
          >
            <span className="text-2xl md:text-3xl transition-transform group-hover:scale-110">📍</span>
            <div>
              <p className="text-[#8A2BE2] text-xs tracking-widest font-bold">LUGAR (Ver mapa 🗺️)</p>
              <p className="text-gray-800 font-bold text-base md:text-lg">Salon de fiestas Alfredos</p>
              <p className="text-gray-600 text-sm">C. 20 de Noviembre 5717, San Baltazar Campeche, 72550 Heroica Puebla de Zaragoza, Pue.</p>
            </div>
          </a>
        </div>

        {/* Elegant divider */}
        <div 
          className="w-full h-[2px] my-6"
          style={{
            background: 'linear-gradient(90deg, transparent, #B19CD9, #D4AF37, transparent)',
          }}
        />

        {/* Dress Code */}
        <div className="text-center">
          <p className="text-[#D4AF37] text-xs md:text-sm tracking-[0.3em] mb-2 font-bold">Esta invitación es valida como tu pase</p>
          <p className="text-gray-800 text-base md:text-lg">
            <span className="text-[#8A2BE2] font-bold">Valido para 3 - 4 personas</span>
          </p>
          <p className="text-gray-500 text-xs md:text-sm mt-2">
            ¡Ven vestido como tu idol favorito con un toque de gala!
          </p>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p 
            className="font-display text-lg sm:text-xl tracking-[0.2em] font-bold"
            style={{
              color: '#D4AF37',
            }}
          >
            ✦ Te esperamos !! ✦
          </p>
        </div>

        {/* WhatsApp Confirmation Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            const phoneNumber = "522228440643";
            const message = encodeURIComponent("Confirmado ✨💜 ¡Estaré presente en tu gran noche!");
            window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
          }}
          className="mt-6 w-full py-4 rounded-xl font-bold tracking-widest text-sm transition-all duration-300 hover:scale-[1.02] shadow-md"
          style={{
            background: 'linear-gradient(135deg, #25D366, #128C7E)',
            color: '#fff',
          }}
        >
          📱 CONFIRMA TU ASISTENCIA
        </button>

        {/* Close button at bottom */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="mt-4 w-full py-4 rounded-xl font-bold tracking-widest text-sm transition-all duration-300 hover:scale-[1.02] border-2 border-[#D4AF37]/50"
          style={{
            background: '#fff',
            color: '#D4AF37',
          }}
        >
          🔄 VOLVER AL INICIO
        </button>
      </div>
    </div>
  );
};
