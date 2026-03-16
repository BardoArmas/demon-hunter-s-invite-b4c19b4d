import { useEffect, useMemo, useState } from "react";
import contadorPng from "@/assets/Contador.png";

interface PartyCardProps {
  isVisible: boolean;
  onClose: () => void;
}

export const PartyCard = ({ isVisible, onClose }: PartyCardProps) => {
  const goldGradientText = useMemo(
    () => ({
      background: "linear-gradient(90deg, #8b6b1f 0%, #ffd86b 25%, #b8860b 55%, #b8860b 80%, #fff2b0 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    }),
    [],
  );

  const goldGradientLine = useMemo(
    () => ({
      background:
        "linear-gradient(90deg, transparent, #8b6b1f 10%, #ffd86b 35%, #b8860b 55%, #b8860b 75%, transparent)",
    }),
    [],
  );
  const goldSparkles = useMemo(
    () => [
      { left: "8%", top: "12%", size: 10, delay: 0.2, duration: 2.8 },
      { left: "18%", top: "32%", size: 8, delay: 1.1, duration: 2.5 },
      { left: "42%", top: "18%", size: 9, delay: 0.8, duration: 3.0 },
      { left: "62%", top: "28%", size: 8, delay: 1.6, duration: 2.7 },
      { left: "86%", top: "14%", size: 10, delay: 0.5, duration: 2.9 },
      { left: "12%", top: "64%", size: 9, delay: 1.9, duration: 3.1 },
      { left: "78%", top: "62%", size: 8, delay: 2.2, duration: 2.6 },
      { left: "90%", top: "78%", size: 10, delay: 1.3, duration: 2.8 },
    ],
    [],
  );

  const targetDate = useMemo(() => new Date(2026, 3, 16, 16, 0, 0), []);
  const [nowMs, setNowMs] = useState(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setNowMs(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const countdown = useMemo(() => {
    const diffSeconds = Math.max(0, Math.floor((targetDate.getTime() - nowMs) / 1000));
    const hours = Math.floor(diffSeconds / 3600);
    const minutes = Math.floor((diffSeconds % 3600) / 60);
    const seconds = diffSeconds % 60;
    const hh = String(hours).padStart(2, "0");
    const mm = String(minutes).padStart(2, "0");
    const ss = String(seconds).padStart(2, "0");
    return `${hh}:${mm}:${ss}`;
  }, [nowMs, targetDate]);

  if (!isVisible) return null;

  return (
    <div className="animate-card-reveal mt-8 pointer-events-auto w-full px-4 md:px-0">
      <div 
        className="relative w-full max-w-lg mx-auto p-6 md:p-10 rounded-2xl overflow-hidden shadow-2xl bg-white"
        style={{
          border: "3px solid #b8860b",
          boxShadow:
            "0 18px 40px rgba(0,0,0,0.12), inset 0 0 0 1px rgba(255,242,176,0.7), inset 0 0 0 2px rgba(184,134,11,0.25)",
        }}
      >
        <div className="absolute inset-0 pointer-events-none z-10">
          {goldSparkles.map((s, i) => (
            <span
              key={i}
              className="gold-sparkle"
              style={{
                left: s.left,
                top: s.top,
                width: s.size,
                height: s.size,
                animationDelay: `${s.delay}s`,
                animationDuration: `${s.duration}s`,
              }}
            />
          ))}
        </div>
        {/* Close button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 z-20"
          style={{
            background:
              "linear-gradient(135deg, #8b6b1f 0%, #ffd86b 30%, #b8860b 55%, #b8860b 85%, #fff2b0 100%)",
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
          }}
        >
          <span className="text-white text-sm font-bold">✕</span>
        </button>

        {/* Decorative corners (Gold & Lilac) */}
        <div className="absolute top-0 left-0 w-16 h-16 md:w-24 md:h-24 border-t-4 border-l-4 border-[#b8860b] rounded-tl-2xl opacity-80" />
        <div className="absolute top-0 right-0 w-16 h-16 md:w-24 md:h-24 border-t-4 border-r-4 border-[#B19CD9] rounded-tr-2xl opacity-80" />
        <div className="absolute bottom-0 left-0 w-16 h-16 md:w-24 md:h-24 border-b-4 border-l-4 border-[#B19CD9] rounded-bl-2xl opacity-80" />
        <div className="absolute bottom-0 right-0 w-16 h-16 md:w-24 md:h-24 border-b-4 border-r-4 border-[#b8860b] rounded-br-2xl opacity-80" />

        {/* Header */}
        <div className="text-center mb-8">
          <p 
            className="text-[10px] sm:text-xs md:text-sm tracking-[0.4em] mb-3 font-bold"
            style={goldGradientText}
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
          <p className="text-gray-700 text-sm sm:text-base md:text-lg font-semibold mt-2">
            Una celebración muy especial está por llegar… ¡la princesa Dayana Michelle cumple 3 añitos!
          </p>
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
          style={goldGradientLine}
        />

        <div className="space-y-5">
          <a
            href="https://maps.app.goo.gl/rjJhPC6eEc72SfxZA?g_st=aw"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 rounded-xl border border-[#B19CD9]/30 bg-[#F8F4FF] transition-all hover:bg-[#F0E8FF] hover:border-[#8A2BE2]/50 group"
          >
            <span className="text-2xl md:text-3xl transition-transform group-hover:scale-110">⛪</span>
            <div>
              <p className="text-[#8A2BE2] text-xs tracking-widest font-bold">IGLESIA (Ver mapa 🗺️)</p>
              <p className="text-gray-800 font-bold text-base md:text-lg">Av. Pitágoras 62, Valle del Sol</p>
              <p className="text-gray-600 text-sm">72565 Heroica Puebla de Zaragoza, Pue.</p>
            </div>
          </a>

          <div className="flex items-center gap-4 p-4 rounded-xl border border-[#b8860b]/30 bg-[#FFFDF5]">
            <span className="text-2xl md:text-3xl">🕯️</span>
            <div>
              <p className="text-xs tracking-widest font-bold" style={goldGradientText}>MISA</p>
              <p className="text-gray-800 font-bold text-base md:text-lg">4:00 PM</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-xl border border-[#B19CD9]/30 bg-[#F8F4FF]">
            <span className="text-2xl md:text-3xl">📅</span>
            <div>
              <p className="text-[#8A2BE2] text-xs tracking-widest font-bold">FECHA</p>
              <p className="text-gray-800 font-bold text-base md:text-lg">Sabado 16 de Abril del 2026</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl border border-[#b8860b]/30 bg-[#FFFDF5]">
            <span className="text-2xl md:text-3xl">🕗</span>
            <div>
              <p className="text-xs tracking-widest font-bold" style={goldGradientText}>FIESTA</p>
              <p className="text-gray-800 font-bold text-base md:text-lg">6:00 PM</p>
              <p className="text-gray-600 text-sm font-semibold">Empieza la pachanga a las 6:00 PM</p>
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
            background: 'linear-gradient(90deg, transparent, #B19CD9, #b8860b, transparent)',
          }}
        />

        {/* Dress Code */}
        <div className="text-center">
          <p className="text-[#b8860b] text-xs md:text-sm tracking-[0.3em] mb-2 font-bold">Esta invitación es valida como tu pase</p>
          <div className="relative mt-5 w-full overflow-hidden rounded-2xl shadow-lg aspect-[3/1]">
            <img
              src={contadorPng}
              alt="Contador"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div className="absolute top-[56%] left-[10%] right-[10%] z-10">
              <div className="flex flex-col items-center">
                <div className="text-[10px] sm:text-xs tracking-[0.3em] font-bold text-black/75">
                  FALTAN
                </div>
                <div className="w-full font-mono text-2xl sm:text-3xl font-extrabold text-black tracking-[0.35em] text-center">
                  {countdown}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p 
            className="font-display text-lg sm:text-xl tracking-[0.2em] font-bold"
            style={{
              color: '#b8860b',
            }}
          >
            ✦ Te esperamos !! ✦
          </p>
        </div>

        {/* WhatsApp Confirmation Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            const phoneNumber = "522211502178";
            const message = encodeURIComponent("Confirmado ✨💜 ¡Estaré presente en tu gran dia!");
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
          className="mt-4 w-full py-4 rounded-xl font-bold tracking-widest text-sm transition-all duration-300 hover:scale-[1.02] border-2 border-[#b8860b]/50"
          style={{
            background: '#fff',
            color: '#b8860b',
          }}
        >
          🔄 VOLVER AL INICIO
        </button>
      </div>
    </div>
  );
};
