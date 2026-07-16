"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Headphones, 
  ChevronDown, 
  Loader2,
  FileText,
  Target,
  Activity,
  Trash2,
  Plus,
  CloudRain,
  Coffee,
  Flame,
  Keyboard,
  Bell,
  RotateCcw
} from "lucide-react";
import { cn } from "@/lib/utils";
import { track } from "@vercel/analytics";

type ChannelType = "lofi" | "synthwave";
type TabType = "radio" | "notes" | "goals" | "posture";
type AmbientType = "rain" | "cafe" | "fire" | "keyboard";

interface ChannelConfig {
  name: string;
  url: string;
  genre: string;
  icon: string;
}

interface Goal {
  id: string;
  text: string;
  completed: boolean;
}

const trackRadioEvent = (action: string, channel: string) => {
  try {
    track("radio_interaction", { action, channel });
  } catch {
    // Falha silenciosa
  }

  try {
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

const AMBIENT_SOUNDS: Record<AmbientType, { name: string; url: string; icon: React.ReactNode }> = {
  rain: {
    name: "Chuva",
    url: "https://raw.githubusercontent.com/HeaLthyDrugs/justwrite/master/public/sounds/ambient/rain.mp3",
    icon: <CloudRain className="w-3.5 h-3.5" />,
  },
  cafe: {
    name: "Cafeteria",
    url: "https://raw.githubusercontent.com/HeaLthyDrugs/justwrite/master/public/sounds/ambient/cafe.mp3",
    icon: <Coffee className="w-3.5 h-3.5" />,
  },
  fire: {
    name: "Lareira",
    url: "https://raw.githubusercontent.com/johanvts/emacs-fireplace/master/fireplace.mp3",
    icon: <Flame className="w-3.5 h-3.5" />,
  },
  keyboard: {
    name: "Teclado",
    url: "https://raw.githubusercontent.com/NicAtlas/CatTypingGame/main/keyboard.mp3",
    icon: <Keyboard className="w-3.5 h-3.5" />,
  },
};

const STRETCHES = [
  {
    title: "Alongamento de Punho",
    description: "Estique o braço para a frente com a palma voltada para cima. Use a outra mão para puxar suavemente os dedos para baixo.",
    image: "🖐️",
  },
  {
    title: "Correção de Postura",
    description: "Alinhe os ombros para trás e para baixo. Mantenha os pés apoiados no chão e a tela do computador na altura dos olhos.",
    image: "🧘‍♂️",
  },
  {
    title: "Alongamento de Pescoço",
    description: "Incline suavemente a cabeça em direção ao ombro esquerdo, segurando com a mão por 15 segundos. Depois, repita no lado direito.",
    image: "💆‍♂️",
  },
  {
    title: "Descanso Ocular (Regra 20-20-20)",
    description: "A cada 20 minutos, olhe para um objeto a pelo menos 6 metros de distância por 20 segundos para relaxar os olhos.",
    image: "👀",
  },
];

export function RadioPlayer() {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("radio");

  // Rádio ativa e volume principal
  const [activeChannel, setActiveChannel] = useState<ChannelType>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("devthru-radio-channel");
      return (saved === "lofi" || saved === "synthwave") ? saved : "lofi";
    }
    return "lofi";
  });

  const [volume, setVolume] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("devthru-radio-volume");
      return saved ? parseFloat(saved) : 0.3;
    }
    return 0.3;
  });

  // Sons ambientes individuais
  const [ambientVolumes, setAmbientVolumes] = useState<Record<AmbientType, number>>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("devthru-ambient-volumes");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // Fallback
        }
      }
    }
    return { rain: 0, cafe: 0, fire: 0, keyboard: 0 };
  });

  // Bloco de Notas (Scratchpad)
  const [notes, setNotes] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("devthru_scratchpad") || "";
    }
    return "";
  });

  // Metas do dia
  const [goals, setGoals] = useState<Goal[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("devthru_goals");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // Fallback
        }
      }
    }
    return [];
  });
  const [newGoalText, setNewGoalText] = useState("");

  // Timer de Postura
  const [postureTimeLeft, setPostureTimeLeft] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("devthru-posture-time");
      return saved ? parseInt(saved, 10) : 3000;
    }
    return 3000;
  });
  const [postureAlertActive, setPostureAlertActive] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("devthru-posture-alert") === "true";
    }
    return false;
  });
  const [activeStretchIndex, setActiveStretchIndex] = useState(0);

  // Refs de áudio
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const rainAudioRef = useRef<HTMLAudioElement | null>(null);
  const cafeAudioRef = useRef<HTMLAudioElement | null>(null);
  const fireAudioRef = useRef<HTMLAudioElement | null>(null);
  const keyboardAudioRef = useRef<HTMLAudioElement | null>(null);

  // Inicialização no Cliente
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
    
    audioRef.current = new Audio();
    audioRef.current.volume = volume;
    audioRef.current.muted = isMuted;

    rainAudioRef.current = new Audio();
    rainAudioRef.current.loop = true;

    cafeAudioRef.current = new Audio();
    cafeAudioRef.current.loop = true;

    fireAudioRef.current = new Audio();
    fireAudioRef.current.loop = true;

    keyboardAudioRef.current = new Audio();
    keyboardAudioRef.current.loop = true;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      [rainAudioRef, cafeAudioRef, fireAudioRef, keyboardAudioRef].forEach((ref) => {
        if (ref.current) {
          ref.current.pause();
          ref.current.src = "";
          ref.current = null;
        }
      });
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Sincronização e Salvamento no localStorage
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

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("devthru-ambient-volumes", JSON.stringify(ambientVolumes));
    }
  }, [ambientVolumes, isMounted]);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("devthru_scratchpad", notes);
    }
  }, [notes, isMounted]);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("devthru_goals", JSON.stringify(goals));
    }
  }, [goals, isMounted]);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("devthru-posture-alert", postureAlertActive.toString());
    }
  }, [postureAlertActive, isMounted]);

  // Função para reproduzir som de bip leve (Web Audio API) offline
  const playNotificationSound = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(523.25, audioCtx.currentTime); // Nota Dó (C5)
      gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);

      oscillator.start(audioCtx.currentTime);
      oscillator.stop(audioCtx.currentTime + 0.5);
    } catch (err) {
      console.warn("Erro ao reproduzir som de notificação:", err);
    }
  };

  // Gerenciamento e Escalonamento dos Volumes dos Sons Ambientes
  const updateAmbientAudioSettings = useCallback(() => {
    const mainVol = isMuted ? 0 : volume;
    const audios: Record<AmbientType, React.MutableRefObject<HTMLAudioElement | null>> = {
      rain: rainAudioRef,
      cafe: cafeAudioRef,
      fire: fireAudioRef,
      keyboard: keyboardAudioRef,
    };

    (Object.keys(AMBIENT_SOUNDS) as AmbientType[]).forEach((key) => {
      const audio = audios[key].current;
      if (!audio) return;

      const targetVol = ambientVolumes[key] * mainVol;
      audio.volume = Math.max(0, Math.min(1, targetVol));

      if (ambientVolumes[key] > 0 && !isMuted) {
        if (audio.paused) {
          if (!audio.src) {
            audio.src = AMBIENT_SOUNDS[key].url;
            audio.load();
          }
          audio.play().catch((err) => console.warn(`Erro ao tocar som ${key}:`, err));
        }
      } else {
        if (!audio.paused) {
          audio.pause();
        }
      }
    });
  }, [ambientVolumes, volume, isMuted]);

  useEffect(() => {
    if (isMounted) {
      updateAmbientAudioSettings();
    }
  }, [isMounted, ambientVolumes, volume, isMuted, updateAmbientAudioSettings]);

  // Contagem Regressiva do Timer de Postura
  useEffect(() => {
    if (!isMounted || postureAlertActive) return;

    const interval = setInterval(() => {
      setPostureTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setPostureAlertActive(true);
          playNotificationSound();
          return 0;
        }
        const next = prev - 1;
        localStorage.setItem("devthru-posture-time", next.toString());
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isMounted, postureAlertActive]);

  // Sorteia alongamento no alerta
  useEffect(() => {
    if (postureAlertActive) {
      setActiveStretchIndex(Math.floor(Math.random() * STRETCHES.length));
    }
  }, [postureAlertActive]);

  // Sincroniza estado de reprodução da rádio principal
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleCanPlay = () => setIsLoading(false);
    const handleWaiting = () => setIsLoading(true);
    const handlePlaying = () => {
      setIsLoading(false);
      setIsPlaying(true);
    };
    const handlePause = () => setIsPlaying(false);
    const handleError = (e: Event) => {
      console.warn("Erro no stream:", e);
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

  // Play / Pause da Rádio
  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      audio.src = "";
      audio.load();
      setIsPlaying(false);
      trackRadioEvent("pause", activeChannel);
    } else {
      audio.src = CHANNELS[activeChannel].url;
      audio.load();
      setIsLoading(true);
      trackRadioEvent("play", activeChannel);
      audio.play().catch((err) => {
        console.warn("Erro ao reproduzir rádio:", err);
        setIsPlaying(false);
        setIsLoading(false);
      });
    }
  }, [isPlaying, activeChannel]);

  // Mutar / Desmutar
  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      if (audioRef.current) {
        audioRef.current.muted = next;
      }
      return next;
    });
  }, []);

  // Alterna o canal da rádio
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
        console.warn("Erro ao reproduzir canal:", err);
        setIsPlaying(false);
        setIsLoading(false);
      });
    } else {
      audio.src = "";
      audio.load();
      trackRadioEvent("select_channel", channel);
    }
  };

  // Modifica volume principal
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

  // Atalhos de Teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      if (activeEl && (activeEl.tagName === "INPUT" || activeEl.tagName === "TEXTAREA" || activeEl.getAttribute("contenteditable") === "true")) {
        return;
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

  // Lógica do Bloco de Notas
  const clearNotes = () => {
    if (window.confirm("Deseja realmente limpar todas as suas notas rápidas?")) {
      setNotes("");
    }
  };

  // Lógica das Metas (Foco)
  const addGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoalText.trim()) return;
    if (goals.length >= 3) return;

    const newGoal: Goal = {
      id: Math.random().toString(36).substring(2, 9),
      text: newGoalText.trim(),
      completed: false,
    };
    setGoals((prev) => [...prev, newGoal]);
    setNewGoalText("");
  };

  const toggleGoal = (id: string) => {
    setGoals((prev) =>
      prev.map((g) => (g.id === id ? { ...g, completed: !g.completed } : g))
    );
  };

  const clearCompletedGoals = () => {
    setGoals((prev) => prev.filter((g) => !g.completed));
  };

  // Resetar Timer de Postura
  const resetPostureTimer = () => {
    setPostureAlertActive(false);
    setPostureTimeLeft(3000);
    localStorage.setItem("devthru-posture-time", "3000");
  };

  // Formatação de Tempo para o Timer
  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

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
          height: 8px;
          animation: eqBar 0.8s ease-in-out infinite;
        }
        .eq-bar-anim:nth-child(2) { animation-delay: 0.15s; }
        .eq-bar-anim:nth-child(3) { animation-delay: 0.3s; }
        .eq-bar-anim:nth-child(4) { animation-delay: 0.45s; }
      `}} />

      {isOpen ? (
        /* ESTADO EXPANDIDO - Central de Foco */
        <div 
          className="w-86 p-4 rounded-xl border border-border/60 bg-background/85 backdrop-blur-md shadow-2xl transition-all duration-300 flex flex-col space-y-4 text-foreground"
          role="dialog"
          aria-label="Deep Work Companion DevThru"
        >
          {/* Cabeçalho de Abas e Controle */}
          <div className="flex items-center justify-between border-b border-border/40 pb-2">
            <div className="flex space-x-1.5">
              <button 
                onClick={() => setActiveTab("radio")}
                className={cn(
                  "p-2 rounded-md transition-colors relative", 
                  activeTab === "radio" ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
                title="Rádio & Mixer"
              >
                <Headphones className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setActiveTab("notes")}
                className={cn(
                  "p-2 rounded-md transition-colors", 
                  activeTab === "notes" ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
                title="Notas Rápidas"
              >
                <FileText className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setActiveTab("goals")}
                className={cn(
                  "p-2 rounded-md transition-colors", 
                  activeTab === "goals" ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
                title="Metas de Foco"
              >
                <Target className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setActiveTab("posture")}
                className={cn(
                  "p-2 rounded-md transition-colors relative", 
                  activeTab === "posture" ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground",
                  postureAlertActive && "text-destructive animate-pulse"
                )}
                title="Ergonomia & Postura"
              >
                <Activity className="w-4 h-4" />
                {postureAlertActive && (
                  <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-destructive" />
                )}
              </button>
            </div>
            
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-md hover:bg-muted/60 transition-colors text-muted-foreground hover:text-foreground"
              aria-label="Minimizar painel"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* ABA 1: Rádio e Mixer */}
          {activeTab === "radio" && (
            <div className="flex flex-col space-y-3.5">
              {/* Info do Canal Ativo */}
              <div className="flex flex-col space-y-0.5">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Tocando agora</span>
                <span className="text-sm font-bold truncate">{CHANNELS[activeChannel].name}</span>
                <span className="text-[11px] text-muted-foreground">{CHANNELS[activeChannel].genre}</span>
              </div>

              {/* Seleção de Canal */}
              <div className="grid grid-cols-2 gap-2 bg-muted/40 p-1 rounded-lg">
                <button
                  onClick={() => changeChannel("lofi")}
                  className={cn(
                    "py-1.5 text-xs font-medium rounded-md transition-all",
                    activeChannel === "lofi" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  🎧 Lofi Focus
                </button>
                <button
                  onClick={() => changeChannel("synthwave")}
                  className={cn(
                    "py-1.5 text-xs font-medium rounded-md transition-all",
                    activeChannel === "synthwave" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  ⚡ Synthwave
                </button>
              </div>

              {/* Player Principal e Controle de Volume */}
              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={togglePlay}
                  disabled={isLoading}
                  className={cn(
                    "w-11 h-11 rounded-full flex items-center justify-center text-primary-foreground transition-all duration-300 hover:scale-105 shadow-md shrink-0",
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

                <div className="flex items-center space-x-2 bg-muted/20 px-3 py-2 rounded-lg flex-1 ml-3 border border-border/20">
                  <button
                    onClick={toggleMute}
                    className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
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

              {/* Mixer de Sons Ambientes */}
              <div className="flex flex-col space-y-2.5 pt-3 border-t border-border/40">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Mixer de Sons Ambiente</span>
                <div className="grid grid-cols-1 gap-2.5">
                  {(Object.keys(AMBIENT_SOUNDS) as AmbientType[]).map((key) => {
                    const sound = AMBIENT_SOUNDS[key];
                    const vol = ambientVolumes[key];
                    return (
                      <div key={key} className="flex items-center justify-between space-x-2 bg-muted/20 px-2.5 py-1.5 rounded-lg border border-border/10">
                        <div className={cn(
                          "flex items-center space-x-2 text-xs transition-colors shrink-0", 
                          vol > 0 && !isMuted ? "text-foreground font-semibold" : "text-muted-foreground/60"
                        )}>
                          {sound.icon}
                          <span className="w-14 truncate">{sound.name}</span>
                        </div>
                        <div className="flex items-center space-x-1.5 flex-1 justify-end">
                          {vol === 0 || isMuted ? (
                            <VolumeX className="w-3.5 h-3.5 text-destructive shrink-0" />
                          ) : (
                            <Volume2 className="w-3.5 h-3.5 text-muted-foreground/80 shrink-0" />
                          )}
                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.05"
                            value={vol}
                            onChange={(e) => {
                              const val = parseFloat(e.target.value);
                              setAmbientVolumes((prev) => ({ ...prev, [key]: val }));
                            }}
                            className="w-24 h-1 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                            aria-label={`Volume de ${sound.name}`}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ABA 2: Bloco de Notas */}
          {activeTab === "notes" && (
            <div className="flex flex-col space-y-2 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-muted-foreground">Rascunho do Desenvolvedor</span>
                <button 
                  onClick={clearNotes}
                  className="text-[10px] flex items-center space-x-1 text-muted-foreground hover:text-destructive transition-colors"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Limpar Tudo</span>
                </button>
              </div>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Cole JSONs, querys SQL, chaves de API temporárias ou rascunhos rápidos aqui. O conteúdo é salvo automaticamente e guardado localmente..."
                className="w-full h-44 p-2 text-xs rounded-md bg-muted/40 border border-border/40 focus:border-primary/45 focus:outline-none resize-none font-mono leading-relaxed"
              />
            </div>
          )}

          {/* ABA 3: Metas de Foco */}
          {activeTab === "goals" && (
            <div className="flex flex-col space-y-2.5 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-muted-foreground">Foco do Dia (Máximo 3)</span>
                {goals.some(g => g.completed) && (
                  <button 
                    onClick={clearCompletedGoals}
                    className="text-[10px] flex items-center space-x-1 text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Remover Concluídas</span>
                  </button>
                )}
              </div>
              
              {goals.length < 3 ? (
                <form onSubmit={addGoal} className="flex space-x-1.5">
                  <input
                    type="text"
                    value={newGoalText}
                    onChange={(e) => setNewGoalText(e.target.value)}
                    placeholder="Adicionar meta do dia..."
                    maxLength={60}
                    className="flex-1 px-2.5 py-1.5 text-xs rounded-md bg-muted/40 border border-border/40 focus:border-primary/45 focus:outline-none"
                  />
                  <button 
                    type="submit"
                    className="px-2.5 bg-primary text-primary-foreground rounded-md text-xs font-semibold hover:bg-primary/95 transition-colors flex items-center justify-center shrink-0"
                    title="Adicionar"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </form>
              ) : (
                <div className="text-[10px] text-muted-foreground/80 italic text-center py-1 bg-muted/30 rounded border border-border/20">
                  Limite de 3 metas atingido. Conclua uma meta antes de criar outra!
                </div>
              )}

              <div className="flex flex-col space-y-1.5 pt-1 max-h-40 overflow-y-auto">
                {goals.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground/60 space-y-1">
                    <Target className="w-7 h-7 text-muted-foreground/40 stroke-1" />
                    <span className="text-xs italic">Nenhum foco definido para hoje.</span>
                  </div>
                ) : (
                  goals.map((goal) => (
                    <div 
                      key={goal.id} 
                      className="flex items-center space-x-2.5 p-2 rounded-md hover:bg-muted/20 transition-colors text-xs border border-transparent hover:border-border/30"
                    >
                      <input
                        type="checkbox"
                        checked={goal.completed}
                        onChange={() => toggleGoal(goal.id)}
                        className="w-4 h-4 rounded border-border text-primary focus:ring-primary cursor-pointer shrink-0"
                      />
                      <span className={cn(
                        "flex-1 truncate leading-normal", 
                        goal.completed ? "line-through text-muted-foreground/60" : "text-foreground font-medium"
                      )}>
                        {goal.text}
                      </span>
                      <button 
                        onClick={() => setGoals(prev => prev.filter(g => g.id !== goal.id))}
                        className="text-muted-foreground/40 hover:text-destructive transition-colors shrink-0"
                        title="Deletar"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* ABA 4: Postura e Ergonomia */}
          {activeTab === "posture" && (
            <div className="flex flex-col space-y-3 flex-1 text-xs">
              <span className="text-xs font-semibold text-muted-foreground">Assistente de Ergonomia</span>
              
              {/* Temporizador */}
              <div className="flex items-center justify-between bg-muted/30 p-3 rounded-lg border border-border/20">
                <div className="flex flex-col">
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Próxima Pausa</span>
                  <span className="text-2xl font-bold font-mono tracking-wider text-foreground">{formatTime(postureTimeLeft)}</span>
                </div>
                <button 
                  onClick={resetPostureTimer}
                  className="p-1.5 rounded-md hover:bg-muted/60 transition-colors text-muted-foreground hover:text-foreground shrink-0"
                  title="Reiniciar timer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              {/* Alerta / Dica */}
              {postureAlertActive ? (
                <div className="flex flex-col space-y-2.5 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-xs">
                  <div className="flex items-center space-x-1.5 text-destructive font-bold">
                    <Bell className="w-4 h-4 animate-bounce" />
                    <span>Lembrete de Saúde!</span>
                  </div>
                  <div className="flex items-start space-x-2.5 pt-1">
                    <span className="text-3xl shrink-0">{STRETCHES[activeStretchIndex].image}</span>
                    <div className="flex flex-col space-y-0.5">
                      <span className="font-bold text-foreground text-xs">{STRETCHES[activeStretchIndex].title}</span>
                      <span className="text-[11px] text-muted-foreground leading-normal">{STRETCHES[activeStretchIndex].description}</span>
                    </div>
                  </div>
                  <button
                    onClick={resetPostureTimer}
                    className="w-full mt-1.5 py-2 bg-primary text-primary-foreground rounded-md text-xs font-bold hover:bg-primary/90 transition-colors shadow-sm"
                  >
                    Entendi e alonguei!
                  </button>
                </div>
              ) : (
                <div className="flex items-start space-x-2.5 p-3 rounded-lg bg-muted/20 border border-border/20 text-muted-foreground">
                  <span className="text-xl shrink-0">🧘‍♂️</span>
                  <span className="text-[11px] leading-relaxed">
                    A cada 50 minutos de código, sugerimos fazer alongamentos nos punhos e pescoço, piscar os olhos e tomar água. Cuidar do corpo é essencial para programar melhor!
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Rodapé de Atalhos */}
          <div className="text-[10px] text-muted-foreground/50 text-center flex justify-center space-x-3 pt-1 border-t border-border/30">
            <span>Alt+P: play/pause rádio</span>
            <span>Alt+M: mute global</span>
          </div>
        </div>
      ) : (
        /* ESTADO MINIMIZADO - Ícone Dinâmico */
        <button
          onClick={() => setIsOpen(true)}
          className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center border border-border/50 bg-background/85 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-foreground hover:border-primary/45 relative",
            (isPlaying || Object.values(ambientVolumes).some(v => v > 0)) && !isMuted && "border-primary/30"
          )}
          aria-label="Abrir central de foco"
        >
          {/* Badge Vermelho de Alerta de Postura */}
          {postureAlertActive && (
            <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-destructive border-2 border-background animate-pulse z-10" />
          )}

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
            /* Ícone dinâmico com base na última aba aberta */
            <>
              {activeTab === "radio" && (
                <Headphones className="w-5 h-5 text-zinc-600 dark:text-zinc-300 hover:text-primary transition-colors" />
              )}
              {activeTab === "notes" && (
                <FileText className="w-5 h-5 text-zinc-600 dark:text-zinc-300 hover:text-primary transition-colors" />
              )}
              {activeTab === "goals" && (
                <Target className="w-5 h-5 text-zinc-600 dark:text-zinc-300 hover:text-primary transition-colors" />
              )}
              {activeTab === "posture" && (
                <Activity className="w-5 h-5 text-zinc-600 dark:text-zinc-300 hover:text-primary transition-colors" />
              )}
            </>
          )}
        </button>
      )}
    </div>
  );
}
