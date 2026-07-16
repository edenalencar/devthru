"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Play, Pause, Volume2, VolumeX, Headphones, ChevronDown, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { track } from "@vercel/analytics";

type ChannelType = "lofi" | "synthwave";

interface ChannelConfig {
  name: string;
  url: string;
  genre: string;
  icon: string;
}

// Função utilitária para medir o uso da rádio via Analytics
const trackRadioEvent = (action: string, channel: string) => {
  try {
    // 1. Registro no Vercel Analytics (Eventos Customizados)
    track("radio_interaction", { action, channel });
  } catch {
    // Falha silenciosa em dev/produção se bloqueado
  }

  try {
    // 2. Registro no Google Tag Manager / Google Analytics (dataLayer)
    if (typeof window !== "undefined") {
      const win = window as unknown as { dataLayer?: Array<Record<string, unknown>> };
      if (win.dataLayer) {
        win.dataLayer.push({
          event: "radio_interaction",
          radio_action: action,
          radio_channel: channel,
        });
      }
    }
  } catch {
    // Falha silenciosa
  }
};

const CHANNELS: Record<ChannelType, ChannelConfig> = {
  lofi: {
    name: "Lofi Focus Beats",
    url: "https://play.streamafrica.net/lofiradio",
    genre: "Chill / study / relax",
    icon: "🎧",
  },
  synthwave: {
    name: "Retro Synthwave",
    url: "https://stream.nightride.fm/chillsynth.mp3",
    genre: "Energy / code / focus",
    icon: "⚡",
  },
};

export function RadioPlayer() {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  
  // Recupera canal ativo do localStorage ou inicia com lofi
  const [activeChannel, setActiveChannel] = useState<ChannelType>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("devthru-radio-channel");
      return (saved === "lofi" || saved === "synthwave") ? saved : "lofi";
    }
    return "lofi";
  });

  // Recupera volume do localStorage ou inicia com 30%
  const [volume, setVolume] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("devthru-radio-volume");
      return saved ? parseFloat(saved) : 0.3;
    }
    return 0.3;
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Garante que o componente só seja renderizado no cliente
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
    audioRef.current = new Audio();
    audioRef.current.volume = volume;
    audioRef.current.muted = isMuted;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Salva preferências no localStorage
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("devthru-radio-channel", activeChannel);
    }
  }, [activeChannel, isMounted]);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("devthru-radio-volume", volume.toString());
    }
  }, [volume, isMounted]);

  // Sincroniza estado de reprodução do HTMLAudioElement
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleCanPlay = () => {
      setIsLoading(false);
    };
    const handleWaiting = () => {
      setIsLoading(true);
    };
    const handlePlaying = () => {
      setIsLoading(false);
      setIsPlaying(true);
    };
    const handlePause = () => {
      setIsPlaying(false);
    };
    const handleError = (e: Event) => {
      console.warn("Erro no carregamento do stream:", e);
      setIsLoading(false);
      setIsPlaying(false);
    };

    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("waiting", handleWaiting);
    audio.addEventListener("playing", handlePlaying);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("waiting", handleWaiting);
      audio.removeEventListener("playing", handlePlaying);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("error", handleError);
    };
  }, [isMounted]);

  // Função para dar Play / Pause
  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      // Limpa o src para fechar a conexão de rede da transmissão ao vivo
      audio.src = "";
      audio.load();
      setIsPlaying(false);
      trackRadioEvent("pause", activeChannel);
    } else {
      // Define a URL da rádio ativa somente ao dar play
      audio.src = CHANNELS[activeChannel].url;
      audio.load();
      setIsLoading(true);
      trackRadioEvent("play", activeChannel);
      audio.play().catch((err) => {
        console.warn("Erro ao iniciar reprodução:", err);
        setIsPlaying(false);
        setIsLoading(false);
      });
    }
  }, [isPlaying, activeChannel]);

  // Função para Mutar / Desmutar
  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      if (audioRef.current) {
        audioRef.current.muted = next;
      }
      return next;
    });
  }, []);

  // Alterna o canal de rádio
  const changeChannel = (channel: ChannelType) => {
    if (channel === activeChannel) return;
    
    setActiveChannel(channel);
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();

    if (isPlaying) {
      audio.src = CHANNELS[channel].url;
      audio.load();
      setIsLoading(true);
      trackRadioEvent("switch_channel", channel);
      audio.play().catch((err) => {
        console.warn("Erro ao reproduzir novo canal:", err);
        setIsPlaying(false);
        setIsLoading(false);
      });
    } else {
      audio.src = "";
      audio.load();
      trackRadioEvent("select_channel", channel);
    }
  };

  // Altera o volume do áudio
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
      if (val > 0 && isMuted) {
        setIsMuted(false);
        audioRef.current.muted = false;
      }
    }
  };

  // Configura atalhos globais de teclado (Alt+P e Alt+M)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Evita atalhos se o foco estiver em elementos interativos específicos
      const activeEl = document.activeElement;
      if (activeEl && (activeEl.tagName === "INPUT" || activeEl.tagName === "TEXTAREA" || activeEl.getAttribute("contenteditable") === "true")) {
        // Deixa prosseguir exceto se for a combinação exata de atalho de sistema
      }

      if (e.altKey && e.key.toLowerCase() === "p") {
        e.preventDefault();
        togglePlay();
      }
      if (e.altKey && e.key.toLowerCase() === "m") {
        e.preventDefault();
        toggleMute();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [togglePlay, toggleMute]);

  if (!isMounted) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans select-none antialiased">
      {/* Estilos do Equalizador Hoistados pelo React 19 */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes eqBar {
          0%, 100% { height: 4px; }
          50% { height: 16px; }
        }
        .eq-bar-anim {
          height: 8px; /* Altura de fallback se a animação pausar/falhar */
          animation: eqBar 0.8s ease-in-out infinite;
        }
        .eq-bar-anim:nth-child(2) { animation-delay: 0.15s; }
        .eq-bar-anim:nth-child(3) { animation-delay: 0.3s; }
        .eq-bar-anim:nth-child(4) { animation-delay: 0.45s; }
      `}} />

      {isOpen ? (
        /* Estado Expandido */
        <div 
          className="w-72 p-4 rounded-xl border border-border/60 bg-background/85 backdrop-blur-md shadow-2xl transition-all duration-300 flex flex-col space-y-4"
          role="dialog"
          aria-label="Player de Rádio DevThru"
        >
          {/* Header do Player */}
          <div className="flex items-center justify-between pb-2 border-b border-border/40">
            <div className="flex items-center space-x-2">
              <Headphones className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">DevThru Radio</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-md hover:bg-muted/60 transition-colors text-muted-foreground hover:text-foreground"
              aria-label="Minimizar rádio"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Info do Canal Ativo */}
          <div className="flex flex-col space-y-1">
            <span className="text-sm font-bold truncate">{CHANNELS[activeChannel].name}</span>
            <span className="text-xs text-muted-foreground">{CHANNELS[activeChannel].genre}</span>
          </div>

          {/* Seleção de Rádio (Abas) */}
          <div className="grid grid-cols-2 gap-2 bg-muted/40 p-1 rounded-lg">
            <button
              onClick={() => changeChannel("lofi")}
              className={cn(
                "py-1.5 text-xs font-medium rounded-md transition-all",
                activeChannel === "lofi"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              🎧 Lofi
            </button>
            <button
              onClick={() => changeChannel("synthwave")}
              className={cn(
                "py-1.5 text-xs font-medium rounded-md transition-all",
                activeChannel === "synthwave"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              ⚡ Synthwave
            </button>
          </div>

          {/* Controles Principais */}
          <div className="flex items-center justify-between pt-1">
            {/* Play / Pause / Loading */}
            <button
              onClick={togglePlay}
              disabled={isLoading}
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center text-primary-foreground transition-all duration-300 hover:scale-105 shadow-md",
                isPlaying ? "bg-destructive hover:bg-destructive/90" : "bg-primary hover:bg-primary/90",
                isLoading && "opacity-75 cursor-wait"
              )}
              aria-label={isPlaying ? "Pausar música" : "Tocar música"}
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : isPlaying ? (
                <Pause className="w-5 h-5 fill-current" />
              ) : (
                <Play className="w-5 h-5 fill-current ml-0.5" />
              )}
            </button>

            {/* Controle de Volume */}
            <div className="flex items-center space-x-2 bg-muted/20 px-3 py-2 rounded-lg flex-1 ml-4 border border-border/20">
              <button
                onClick={toggleMute}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label={isMuted ? "Desmutar" : "Mutar"}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-4 h-4 text-destructive" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-full h-1 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                aria-label="Volume da rádio"
              />
            </div>
          </div>

          {/* Atalhos de Teclado Helper */}
          <div className="text-[10px] text-muted-foreground/60 text-center flex justify-center space-x-3 pt-1">
            <span>Alt+P: play/pause</span>
            <span>Alt+M: mute</span>
          </div>
        </div>
      ) : (
        /* Estado Minimizado */
        <button
          onClick={() => setIsOpen(true)}
          className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center border border-border/50 bg-background/85 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-foreground hover:border-primary/40",
            isPlaying && !isLoading && "border-primary/30"
          )}
          aria-label="Abrir rádio"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin text-primary" />
          ) : isPlaying ? (
            /* Equalizador visual animado */
            <div className="flex items-end justify-center gap-0.5 h-4 w-4 text-primary">
              <div 
                className="w-0.5 bg-current eq-bar-anim" 
                style={{ animationPlayState: isPlaying ? "running" : "paused" }} 
              />
              <div 
                className="w-0.5 bg-current eq-bar-anim" 
                style={{ animationPlayState: isPlaying ? "running" : "paused" }} 
              />
              <div 
                className="w-0.5 bg-current eq-bar-anim" 
                style={{ animationPlayState: isPlaying ? "running" : "paused" }} 
              />
              <div 
                className="w-0.5 bg-current eq-bar-anim" 
                style={{ animationPlayState: isPlaying ? "running" : "paused" }} 
              />
            </div>
          ) : (
            <Headphones className="w-5 h-5 text-zinc-600 dark:text-zinc-300 hover:text-primary transition-colors" />
          )}
        </button>
      )}
    </div>
  );
}
