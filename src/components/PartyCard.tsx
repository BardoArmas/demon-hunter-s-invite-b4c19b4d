interface PartyCardProps {
  isVisible: boolean;
}

export const PartyCard = ({ isVisible }: PartyCardProps) => {
  if (!isVisible) return null;

  return (
    <div className="animate-card-reveal">
      <div 
        className="relative max-w-md mx-auto p-8 rounded-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, hsl(0 0% 8% / 0.95), hsl(270 50% 10% / 0.95))',
          border: '2px solid hsl(330 100% 65% / 0.5)',
          boxShadow: 'var(--shadow-neon), inset 0 0 50px hsl(0 0% 0% / 0.5)',
        }}
      >
        {/* Decorative corners */}
        <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-gold rounded-tl-2xl" />
        <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-gold rounded-tr-2xl" />
        <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-gold rounded-bl-2xl" />
        <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-gold rounded-br-2xl" />

        {/* Header */}
        <div className="text-center mb-6">
          <p className="text-accent text-sm tracking-[0.3em] mb-2">YOU ARE INVITED TO</p>
          <h1 className="font-display text-3xl md:text-4xl text-glow-pink text-foreground font-bold mb-2">
            DEMON HUNTER
          </h1>
          <h2 className="font-display text-2xl md:text-3xl text-glow-gold text-gold">
            K-POP PARTY
          </h2>
          <div className="flex justify-center items-center gap-2 mt-3">
            <span className="text-primary">👹</span>
            <span className="text-accent">🎤</span>
            <span className="text-gold">⚔️</span>
            <span className="text-neon-blue">💜</span>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-accent to-transparent my-6" />

        {/* Event Details */}
        <div className="space-y-4 text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="text-2xl">📅</span>
            <div>
              <p className="text-muted-foreground text-sm">FECHA</p>
              <p className="text-foreground font-semibold text-lg">15 de Febrero, 2025</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <span className="text-2xl">🕗</span>
            <div>
              <p className="text-muted-foreground text-sm">HORA</p>
              <p className="text-foreground font-semibold text-lg">8:00 PM</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <span className="text-2xl">📍</span>
            <div>
              <p className="text-muted-foreground text-sm">LUGAR</p>
              <p className="text-foreground font-semibold text-lg">Club Underworld</p>
              <p className="text-muted-foreground text-sm">Calle Oscura #666</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent my-6" />

        {/* Dress Code */}
        <div className="text-center">
          <p className="text-accent text-sm tracking-widest mb-2">DRESS CODE</p>
          <p className="text-foreground">
            <span className="text-primary font-bold">Dark</span> & <span className="text-accent font-bold">K-pop</span> Style
          </p>
          <p className="text-muted-foreground text-sm mt-1">
            ¡Ven vestido como tu idol favorito versión demon hunter!
          </p>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-gold font-display text-lg tracking-widest">
            ✦ 악마 사냥꾼 ✦
          </p>
          <p className="text-muted-foreground text-xs mt-2">
            #DemonHunterParty #KpopNight
          </p>
        </div>
      </div>
    </div>
  );
};
