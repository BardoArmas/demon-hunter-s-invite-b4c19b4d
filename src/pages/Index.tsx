import { useState, useCallback, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { PartyCard } from '@/components/PartyCard';
import { useBalloonsCanvas } from '@/hooks/useBalloonsCanvas';
import backgroundImage from '@/assets/background.webp';
import goldenMp3 from '@/assets/Golden.mp3';
import vidMp4 from '@/assets/VID.mp4';
import kpopPng from '@/assets/kpop.png';

const confettiColors = ['#ff00cc', '#00ffff', '#ffffff', '#5f27cd', '#ff1493', '#ffd700'];

const Index = () => {
  const [step, setStep] = useState<'welcome' | 'video' | 'card'>('welcome');
  const [videoNeedsTap, setVideoNeedsTap] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [videoAutoPlay, setVideoAutoPlay] = useState(true);
  const [prefetchedVideoSrc, setPrefetchedVideoSrc] = useState<string | null>(null);
  const [isPrefetchingVideo, setIsPrefetchingVideo] = useState(false);
  const canvasRef = useBalloonsCanvas(step === 'card' || step === 'welcome');
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const prefetchedObjectUrlRef = useRef<string | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(goldenMp3);
    audioRef.current.volume = 0.5;
    audioRef.current.load();
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const connection = (navigator as unknown as { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    const effectiveType = connection?.effectiveType ?? '';
    const shouldPrefetch = !(connection?.saveData || effectiveType.includes('2g') || effectiveType.includes('3g'));

    if (!shouldPrefetch) {
      setIsPrefetchingVideo(false);
      return;
    }
    if (prefetchedVideoSrc) return;

    const timeoutId = window.setTimeout(() => {
      setIsPrefetchingVideo(true);
      fetch(vidMp4)
        .then((r) => r.blob())
        .then((blob) => {
          const objectUrl = URL.createObjectURL(blob);
          prefetchedObjectUrlRef.current = objectUrl;
          setPrefetchedVideoSrc(objectUrl);
          setIsPrefetchingVideo(false);
        })
        .catch(() => {
          setIsPrefetchingVideo(false);
        });
    }, 900);

    return () => window.clearTimeout(timeoutId);
  }, [prefetchedVideoSrc]);

  useEffect(() => {
    return () => {
      if (prefetchedObjectUrlRef.current) {
        URL.revokeObjectURL(prefetchedObjectUrlRef.current);
        prefetchedObjectUrlRef.current = null;
      }
    };
  }, []);

  const fireConfetti = useCallback(() => {
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.5, x: 0.5 },
      colors: confettiColors,
    });

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

  const handleStart = () => {
    const connection = (navigator as unknown as { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    const effectiveType = connection?.effectiveType ?? '';
    const shouldAutoPlay = !(connection?.saveData || effectiveType.includes('2g'));

    setVideoAutoPlay(shouldAutoPlay);
    setStep('video');
    setVideoNeedsTap(!shouldAutoPlay);
    setVideoFailed(false);
    if (audioRef.current) {
      audioRef.current.play().catch(console.error);
    }
  };

  const handleVideoEnd = () => {
    setStep('card');
    fireConfetti();
  };

  useEffect(() => {
    const video = videoRef.current;
    if (step !== 'video') {
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
      return;
    }

    if (!video) return;

    video.muted = true;
    video.playsInline = true;
    video.load();

    if (!videoAutoPlay) return;

    const playPromise = video.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {
        setVideoNeedsTap(true);
      });
    }
  }, [step, videoAutoPlay]);

  const handleVideoTapToPlay = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.playsInline = true;
    video.play()
      .then(() => setVideoNeedsTap(false))
      .catch(() => setVideoFailed(true));
  };

  const handleSkipVideo = () => {
    setStep('card');
    fireConfetti();
  };

  const handleClose = useCallback(() => {
    setStep('welcome');
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, []);

  return (
    <div 
      className={`min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden transition-colors duration-1000 ${
        step === 'welcome' ? 'bg-white' : ''
      }`}
      style={step !== 'welcome' ? {
        background: 'radial-gradient(circle at top, #301934 0%, #120016 50%, #05010a 100%)',
      } : {}}
    >
      {/* Welcome Screen */}
      {step === 'welcome' && (
        <>
          <div className="z-50 flex flex-col items-center text-center space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-[#8A2BE2] drop-shadow-sm">
                Cumpleaños de Dayana Michelle
              </h1>
              <p className="text-xl md:text-2xl text-[#6A5ACD] animate-pulse">
                Presione para ver su invitación ✨
              </p>
              {isPrefetchingVideo && (
                <p className="text-sm md:text-base text-[#8A2BE2] font-semibold mt-2 animate-pulse">
                  Cargando video…
                </p>
              )}
            </div>
            
            <button 
              onClick={handleStart}
              className="group relative transition-transform hover:scale-105 active:scale-95"
            >
              <img 
                src={kpopPng} 
                alt="K-pop celebration" 
                className="w-64 md:w-96 drop-shadow-2xl rounded-2xl relative z-10"
              />
            </button>
          </div>
        </>
      )}

      {/* Video Screen */}
      {step === 'video' && (
        <div className="fixed inset-0 z-40 bg-black flex items-center justify-center">
          <video
            ref={videoRef}
            src={prefetchedVideoSrc ?? vidMp4}
            autoPlay={videoAutoPlay}
            muted
            playsInline
            webkit-playsinline="true"
            onEnded={handleVideoEnd}
            onError={() => setVideoFailed(true)}
            poster={kpopPng}
            preload="metadata"
            className="w-[130%] h-full object-cover"
          />
          {(videoNeedsTap || videoFailed) && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[1px]">
              <div className="flex flex-col items-center gap-4 px-6 py-5 rounded-2xl bg-white/90 text-gray-900 shadow-xl">
                <div className="text-center">
                  <div className="text-sm font-bold tracking-widest text-[#8A2BE2]">VIDEO</div>
                  <div className="text-base font-semibold">
                    {videoFailed ? 'No se pudo reproducir en este dispositivo.' : 'Toque para reproducir.'}
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleVideoTapToPlay}
                    className="px-5 py-3 rounded-xl font-bold tracking-widest text-sm text-white"
                    style={{ background: 'linear-gradient(135deg, #8b6b1f 0%, #ffd86b 30%, #b8860b 85%, #fff2b0 100%)' }}
                  >
                    ▶ REPRODUCIR
                  </button>
                  <button
                    onClick={handleSkipVideo}
                    className="px-5 py-3 rounded-xl font-bold tracking-widest text-sm border-2 border-[#b8860b]/50 text-[#b8860b]"
                    style={{ background: '#fff' }}
                  >
                    CONTINUAR
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Background image for card stage */}
      {step === 'card' && (
        <div 
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
      )}

      {/* Gradient overlay for card stage */}
      {step === 'card' && (
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at center, transparent 0%, rgba(5, 1, 10, 0.8) 100%)',
          }}
        />
      )}

      {/* Balloons Canvas */}
      <canvas
        ref={canvasRef}
        className={`fixed inset-0 z-[1] transition-opacity duration-1000 ${
          (step === 'card' || step === 'welcome') ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Main content (PartyCard) */}
      <div 
        className={`relative z-40 flex flex-col items-center h-[90vh] md:h-auto overflow-y-auto w-full transition-all duration-1000 scrollbar-thin ${
          step === 'card' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
      >
        <div className="w-full py-4 md:py-8 pb-32 md:pb-40">
          <PartyCard isVisible={step === 'card'} onClose={handleClose} />
        </div>
      </div>

      {/* Ambient particles for non-welcome stages */}
      {step !== 'welcome' && (
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
      )}

      {/* Corner decorations */}
      {step !== 'welcome' && (
        <>
          <div className="fixed top-4 left-4 text-pink-500/40 text-3xl animate-pulse">✦</div>
          <div className="fixed top-4 right-4 text-cyan-400/40 text-3xl animate-pulse" style={{ animationDelay: '0.5s' }}>✦</div>
          <div className="fixed bottom-4 left-4 text-cyan-400/40 text-3xl animate-pulse" style={{ animationDelay: '1s' }}>✦</div>
          <div className="fixed bottom-4 right-4 text-pink-500/40 text-3xl animate-pulse" style={{ animationDelay: '1.5s' }}>✦</div>
        </>
      )}
    </div>
  );
};

export default Index;

