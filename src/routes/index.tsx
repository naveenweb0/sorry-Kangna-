import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, MotionConfig, useScroll, useSpring } from "framer-motion";
import {
  ChevronDown,
  Heart,
  Volume2,
  VolumeX,
  HandHeart,
  Footprints,
  Sparkles,
  Coffee,
  ShieldCheck,
  Music,
  ArrowUp,
  Smile,
} from "lucide-react";
import { Envelope, Flower, GiftFlower, Petals, Star } from "@/components/kangna/art";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "For Kangna 🌸 | A Sincere Letter" },
      {
        name: "description",
        content: "Some things are better said with sincerity. A little letter, just for Kangna.",
      },
      { property: "og:title", content: "For Kangna 🌸 | A Sincere Letter" },
      {
        property: "og:description",
        content: "Some things are better said with sincerity. A heartfelt letter and apology.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

/* Shared button styling */
const btnBase =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 py-3 text-base font-medium transition-all duration-300 active:scale-95 cursor-pointer select-none";
const btnPrimary = `${btnBase} bg-foreground text-background shadow-soft hover:-translate-y-0.5 hover:shadow-card-hover`;
const btnOutline = `${btnBase} border border-border bg-card/80 backdrop-blur text-foreground hover:bg-secondary/60 hover:-translate-y-0.5`;

/* Section Ornament */
function Ornament() {
  return (
    <div className="flex items-center justify-center gap-4 py-8" aria-hidden>
      <span className="h-px w-16 bg-gradient-to-r from-transparent via-primary/50 to-primary sm:w-32" />
      <Star size={10} className="text-gold animate-twinkle" />
      <Flower size={22} className="animate-spin-slow text-rose-deep" />
      <Star size={10} className="text-gold animate-twinkle" />
      <span className="h-px w-16 bg-gradient-to-l from-transparent via-primary/50 to-primary sm:w-32" />
    </div>
  );
}

/* Staggered in-view reveal */
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-secondary/50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-rose-deep backdrop-blur-sm">
      <Sparkles size={12} className="text-gold" />
      {children}
    </p>
  );
}

/* Ethereal harmonic pentatonic ambient chime synthesizer */
function useAmbientSound(on: boolean) {
  const ctx = useRef<AudioContext | null>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!on) {
      if (timer.current) clearInterval(timer.current);
      ctx.current?.close();
      ctx.current = null;
      return;
    }

    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ac = new AudioCtx();
    ctx.current = ac;

    // Harmonic pentatonic frequencies (warm music-box vibe: C, D, E, G, A)
    const notes = [
      261.63, 329.63, 392.0, 440.0, 523.25, 659.25, 783.99, 880.0, 587.33,
    ];
    let step = 0;

    const playChime = () => {
      if (ac.state === "suspended") {
        ac.resume();
      }

      const now = ac.currentTime;
      const baseFreq = notes[step % notes.length] ?? 440;
      step++;

      // Dual oscillator for rich, warm chime harmonics
      const osc1 = ac.createOscillator();
      const osc2 = ac.createOscillator();
      const gainNode = ac.createGain();
      const filter = ac.createBiquadFilter();

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1400, now);

      osc1.type = "sine";
      osc1.frequency.setValueAtTime(baseFreq, now);

      osc2.type = "sine";
      osc2.frequency.setValueAtTime(baseFreq * 2, now); // soft octave overtone

      const osc2Gain = ac.createGain();
      osc2Gain.gain.setValueAtTime(0.2, now);

      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.045, now + 0.15);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);

      osc1.connect(filter);
      osc2.connect(osc2Gain);
      osc2Gain.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ac.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 3.3);
      osc2.stop(now + 3.3);
    };

    playChime();
    timer.current = setInterval(playChime, 2100);

    return () => {
      if (timer.current) clearInterval(timer.current);
      ac.close();
    };
  }, [on]);
}

/* Floating click particle effect */
function ClickSparkles() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; text: string }>>([]);

  const handleClick = (e: React.MouseEvent) => {
    // Only spawn occasionally or on certain targets to remain subtle & elegant
    const target = e.target as HTMLElement;
    if (target.closest("button") || target.closest("article") || target.closest(".interactive-card")) {
      const symbols = ["🌸", "✨", "🤍", "🌷", "⭐"];
      const symbol = symbols[Math.floor(Math.random() * symbols.length)] ?? "✨";
      const newParticle = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        text: symbol,
      };
      setParticles((prev) => [...prev.slice(-10), newParticle]);
    }
  };

  useEffect(() => {
    if (particles.length === 0) return;
    const timeout = setTimeout(() => {
      setParticles((prev) => prev.slice(1));
    }, 1200);
    return () => clearTimeout(timeout);
  }, [particles]);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" onClick={handleClick}>
      <AnimatePresence>
        {particles.map((p) => (
          <motion.span
            key={p.id}
            initial={{ opacity: 1, scale: 0.6, y: p.y - 10, x: p.x }}
            animate={{ opacity: 0, scale: 1.2, y: p.y - 70, x: p.x + (Math.random() * 40 - 20) }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="fixed select-none text-xl"
            style={{ left: 0, top: 0 }}
          >
            {p.text}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}

/* Navigation */
function Nav() {
  const [sound, setSound] = useState(false);
  useAmbientSound(sound);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="group flex items-center gap-2.5 transition">
          <Flower size={24} className="transition-transform duration-500 group-hover:rotate-45" />
          <span className="font-serif text-lg font-medium italic tracking-wide text-foreground">
            For Kangna
          </span>
          <span className="hidden rounded-full bg-rose-soft/40 px-2 py-0.5 text-[11px] font-medium text-rose-deep sm:inline-block">
            A Sincere Note
          </span>
        </a>

        <div className="flex items-center gap-3">
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <a href="#letter" className="transition hover:text-foreground">
              Letter
            </a>
            <a href="#reflections" className="transition hover:text-foreground">
              Reflections
            </a>
            <a href="#appreciation" className="transition hover:text-foreground">
              Appreciation
            </a>
            <a href="#gift" className="transition hover:text-foreground">
              A Gift
            </a>
          </nav>

          {/* Sound Toggle Button with Animated Waveform */}
          <button
            onClick={() => setSound((s) => !s)}
            aria-label={sound ? "Turn ambient soundtrack off" : "Turn ambient soundtrack on"}
            className="flex items-center gap-2 rounded-full border border-border bg-card/90 px-3 py-1.5 text-xs font-medium text-foreground shadow-sm transition hover:bg-secondary/70 active:scale-95"
          >
            {sound ? (
              <>
                <Volume2 size={16} className="text-rose-deep animate-pulse" />
                <span className="hidden sm:inline">Ambient On</span>
                <span className="flex items-end gap-0.5" aria-hidden>
                  <span className="h-3 w-0.5 rounded-full bg-rose-deep animate-pulse" />
                  <span className="h-4 w-0.5 rounded-full bg-rose-deep animate-bounce" />
                  <span className="h-2 w-0.5 rounded-full bg-rose-deep animate-pulse" />
                </span>
              </>
            ) : (
              <>
                <VolumeX size={16} className="text-muted-foreground" />
                <span className="hidden sm:inline">Sound Off</span>
              </>
            )}
          </button>
        </div>
      </div>
      {/* Scroll progress bar with warm gradient */}
      <motion.div
        className="h-0.5 origin-left bg-gradient-to-r from-primary via-rose-deep to-gold"
        style={{ scaleX }}
      />
    </header>
  );
}

/* Hero Section */
function Hero() {
  const [open, setOpen] = useState(false);

  const handleOpenLetter = () => {
    setOpen(true);
    setTimeout(() => {
      document.getElementById("letter")?.scrollIntoView({ behavior: "smooth" });
    }, 1200);
  };

  return (
    <section
      id="top"
      className="relative flex min-h-svh items-center justify-center overflow-hidden px-5 pb-20 pt-28 transition-colors duration-1000"
      style={{
        background: open
          ? "radial-gradient(circle at 50% 30%, color-mix(in oklab, var(--secondary) 60%, var(--background)), var(--background))"
          : undefined,
      }}
    >
      <Petals count={15} />

      <div className="relative z-10 mx-auto max-w-xl text-center">
        <Reveal>
          <Eyebrow>Made with sincere regret &amp; deep respect</Eyebrow>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="mt-6 font-serif text-6xl font-medium tracking-tight sm:text-8xl">
            Hey, Kangna.
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-5 font-serif text-xl italic text-foreground/90 sm:text-2xl">
            I have something I wanted to say properly.
          </p>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground sm:text-base">
            No pressure, no expectations, and no excuses. Just an honest, heartfelt message from me.
          </p>
        </Reveal>

        <Reveal delay={0.3} className="mt-16 sm:mt-20">
          <Envelope open={open} onOpen={handleOpenLetter} />
        </Reveal>

        <Reveal delay={0.4} className="mt-10">
          <button onClick={handleOpenLetter} className={btnPrimary}>
            {open ? "Reading letter... 💌" : "Open your letter 💌"}
          </button>
          {!open && (
            <p className="mt-3 text-xs text-muted-foreground italic">
              (Click the wax seal or button to open)
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}

/* Sincere Letter */
const LETTER = [
  "I want to sincerely apologise for what happened today.",
  "Slapping you was completely wrong. I shouldn't have done that, no matter what the situation was or how I was feeling in that moment.",
  "I understand that I crossed a boundary, and I take full responsibility for my actions.",
  "You deserve to feel comfortable, safe and respected around me. I should have respected your personal space instead of reacting the way I did.",
  "I don't want to justify what happened or make excuses. I genuinely regret hurting you.",
  "I know that just saying sorry doesn't undo what happened. I need to show through my actions that I understand my mistake and that it won't happen again.",
  "I value our friendship, but more importantly, I respect you and your feelings.",
  "You don't have to forgive me immediately or pretend everything is okay.",
  "I just wanted to apologise properly.",
  "I'm genuinely sorry, Kangna.",
];

function Letter() {
  return (
    <section id="letter" className="scroll-mt-16 px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-2xl">
        <Reveal className="text-center">
          <Eyebrow>Personal Letter</Eyebrow>
          <h2 className="mt-4 font-serif text-4xl sm:text-5xl">First, I'm genuinely sorry.</h2>
          <p className="mt-2 text-sm text-muted-foreground">Written with full honesty and care.</p>
        </Reveal>

        <Reveal delay={0.15}>
          <article className="paper relative mt-12 rotate-[-0.5deg] rounded-lg border border-border/80 px-6 py-10 shadow-paper sm:px-14 sm:py-16 transition-transform hover:rotate-0 duration-500">
            {/* Washi tape on top */}
            <div
              className="absolute -top-3.5 left-1/2 h-7 w-28 -translate-x-1/2 rotate-1 bg-secondary/80 backdrop-blur-sm shadow-xs border border-primary/20"
              aria-hidden
            />

            {/* Vintage postal stamp watermark */}
            <div
              className="absolute right-6 top-6 select-none rounded-sm border-2 border-dashed border-rose-deep/30 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-rose-deep/40 rotate-6"
              aria-hidden
            >
              Air Mail • Sincerely
            </div>

            <p className="font-hand text-3xl font-bold text-rose-deep sm:text-4xl">
              Hey Kangna,
            </p>

            <div className="mt-6 space-y-4 font-hand text-2xl leading-[42px] sm:text-[1.75rem] text-foreground/90">
              {LETTER.map((line, idx) => (
                <p
                  key={idx}
                  className="transition-colors hover:text-rose-deep duration-200"
                >
                  {line}
                </p>
              ))}
            </div>

            <div className="mt-12 flex flex-col items-end gap-1 border-t border-primary/20 pt-6">
              <p className="font-hand text-2xl font-bold text-rose-deep sm:text-3xl flex items-center gap-2">
                — Your occasionally annoying friend. <Flower size={26} />
              </p>
              <p className="text-xs uppercase tracking-wider text-muted-foreground font-sans">
                Written with sincerity
              </p>
            </div>
          </article>
        </Reveal>

        <div className="mt-12 flex justify-center text-muted-foreground">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ChevronDown size={22} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* Three Core Commitments */
const COMMITMENTS = [
  {
    n: "01",
    tag: "Respect",
    title: "Your boundaries matter.",
    body: "Your personal space deserves complete respect. I should never cross that boundary, no matter what.",
    reflection:
      "Comfort and emotional safety should never be compromised in any friendship. You will always have full space and respect.",
    Icon: Heart,
    bg: "bg-secondary",
  },
  {
    n: "02",
    tag: "Responsibility",
    title: "My reactions are my responsibility.",
    body: "Whatever I feel, I am accountable for how I handle it. Reacting impulsively is never an acceptable excuse.",
    reflection:
      "True maturity means managing our own emotions without taking them out on others. I hold myself to this standard.",
    Icon: HandHeart,
    bg: "bg-accent",
  },
  {
    n: "03",
    tag: "Actions",
    title: "Actions matter more than words.",
    body: "Apologies are only as good as the changed behavior that follows. I want my actions to prove my words.",
    reflection:
      "Trust is rebuilt with consistent respect over time. I intend to prove every word through how I treat you.",
    Icon: Footprints,
    bg: "bg-muted",
  },
];

function Remember() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section id="reflections" className="scroll-mt-16 px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <Reveal className="text-center">
          <Eyebrow>Commitment &amp; Understanding</Eyebrow>
          <h2 className="mt-4 font-serif text-4xl sm:text-5xl">
            Three things I will always remember.
          </h2>
          <p className="mt-3 text-muted-foreground">
            Clear principles I'm holding myself accountable to.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {COMMITMENTS.map(({ n, tag, title, body, reflection, Icon, bg }, i) => {
            const isExp = expanded === i;
            return (
              <Reveal key={n} delay={i * 0.12}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="interactive-card flex h-full flex-col justify-between rounded-3xl border border-border/70 bg-card p-7 shadow-soft transition-shadow hover:shadow-card-hover"
                >
                  <div>
                    <div
                      className={`grid h-14 w-14 place-items-center rounded-2xl ${bg} shadow-xs`}
                    >
                      <Icon className="text-rose-deep" size={24} />
                    </div>
                    <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                      {n} — {tag}
                    </p>
                    <h3 className="mt-3 font-serif text-2xl leading-snug font-medium text-foreground">
                      {title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {body}
                    </p>

                    <AnimatePresence>
                      {isExp && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-4 overflow-hidden rounded-xl border border-primary/20 bg-secondary/30 p-3.5 text-xs text-foreground/80 leading-relaxed italic"
                        >
                          "{reflection}"
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <button
                    onClick={() => setExpanded(isExp ? null : i)}
                    className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-rose-deep transition hover:underline"
                  >
                    {isExp ? "Show less" : "Read deeper reflection →"}
                  </button>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* Appreciation Notes with Interactive Reactions */
interface NoteItem {
  id: number;
  text: string;
  className: string;
  defaultEmoji: string;
}

const APPRECIATION_NOTES: NoteItem[] = [
  {
    id: 1,
    text: "You're one of those rare people who can make an ordinary day feel a little less ordinary.",
    className: "bg-secondary -rotate-2",
    defaultEmoji: "✨",
  },
  {
    id: 2,
    text: "Your energy, random conversations, funny moments and mastikhor nature make our friendship truly special.",
    className: "bg-accent rotate-1",
    defaultEmoji: "🌸",
  },
  {
    id: 3,
    text: "I'm genuinely glad I got to know you. You have a good heart and you deserve people who respect that.",
    className: "bg-card rotate-2",
    defaultEmoji: "🤍",
  },
  {
    id: 4,
    text: "And yes, I know I can be annoying sometimes. Probably way more than sometimes. 😂",
    className: "bg-muted -rotate-1",
    defaultEmoji: "😂",
  },
];

function Appreciation() {
  const [reactions, setReactions] = useState<Record<number, number>>({
    1: 4,
    2: 7,
    3: 5,
    4: 9,
  });

  const handleReact = (id: number) => {
    setReactions((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
  };

  return (
    <section id="appreciation" className="relative scroll-mt-16 overflow-hidden bg-soft px-5 py-24 sm:py-32">
      <Star className="absolute left-[8%] top-20 text-gold animate-twinkle" size={20} />
      <Star className="absolute right-[12%] top-36 text-gold animate-twinkle" size={16} />
      <Flower className="absolute bottom-16 left-[6%] opacity-60 animate-spin-slow" size={44} />

      <div className="relative mx-auto max-w-4xl">
        <Reveal className="text-center">
          <Eyebrow>A little appreciation</Eyebrow>
          <h2 className="mt-4 font-serif text-4xl italic sm:text-5xl">
            Something I don't say enough...
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            A few honest thoughts on what makes you such a great person.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8 sm:grid-cols-2">
          {APPRECIATION_NOTES.map((note, i) => (
            <Reveal key={note.id} delay={i * 0.1}>
              <motion.div
                whileHover={{ scale: 1.02, rotate: 0 }}
                transition={{ type: "spring", stiffness: 280, damping: 20 }}
                className={`interactive-card relative rounded-2xl border border-border/80 p-7 shadow-soft backdrop-blur-sm ${note.className}`}
              >
                {/* Washi tape pin */}
                <div
                  className="absolute -top-3 left-6 h-5 w-16 bg-primary/40 backdrop-blur-xs shadow-xs"
                  aria-hidden
                />
                <p className="font-serif text-lg leading-relaxed text-foreground/95 sm:text-xl">
                  {note.text}
                </p>

                {/* Reaction badge */}
                <div className="mt-6 flex items-center justify-between border-t border-border/40 pt-4">
                  <span className="text-xs text-muted-foreground font-hand text-lg">
                    Tap to react:
                  </span>
                  <button
                    onClick={() => handleReact(note.id)}
                    className="flex items-center gap-1.5 rounded-full bg-background/80 px-3 py-1 text-xs font-semibold text-rose-deep shadow-xs transition hover:scale-110 active:scale-95"
                    aria-label="React to this note"
                  >
                    <span>{note.defaultEmoji}</span>
                    <span>{reactions[note.id]}</span>
                  </button>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <p className="mt-10 text-center font-hand text-2xl text-rose-deep">
            ↑ all 100% true, no exaggeration ✦
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* Interactive Gift Selector */
type GiftOption = "flower" | "coffee" | "promise" | "music";

function Gift() {
  const [open, setOpen] = useState(false);
  const [selectedGift, setSelectedGift] = useState<GiftOption>("flower");

  return (
    <section id="gift" className="scroll-mt-16 px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-xl text-center">
        <Reveal>
          <Eyebrow>A little virtual gift</Eyebrow>
          <h2 className="mt-4 font-serif text-4xl sm:text-5xl">Something small for you.</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            A humble token of sincere apology &amp; goodwill.
          </p>
        </Reveal>

        {/* Gift Mode Tabs */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              setSelectedGift("flower");
              setOpen(true);
            }}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
              selectedGift === "flower"
                ? "bg-rose-deep text-primary-foreground shadow-sm"
                : "bg-secondary/60 text-muted-foreground hover:bg-secondary"
            }`}
          >
            🌷 Blooming Peony
          </button>
          <button
            onClick={() => {
              setSelectedGift("coffee");
              setOpen(true);
            }}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
              selectedGift === "coffee"
                ? "bg-rose-deep text-primary-foreground shadow-sm"
                : "bg-secondary/60 text-muted-foreground hover:bg-secondary"
            }`}
          >
            ☕ Peace Coffee
          </button>
          <button
            onClick={() => {
              setSelectedGift("promise");
              setOpen(true);
            }}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
              selectedGift === "promise"
                ? "bg-rose-deep text-primary-foreground shadow-sm"
                : "bg-secondary/60 text-muted-foreground hover:bg-secondary"
            }`}
          >
            🕊️ Space Promise
          </button>
        </div>

        <Reveal delay={0.15} className="mt-10">
          <div className="rounded-3xl border border-border/70 bg-card/60 p-6 sm:p-8 shadow-soft backdrop-blur-sm">
            {selectedGift === "flower" && (
              <>
                <GiftFlower open={open} />
                <AnimatePresence mode="wait">
                  {!open ? (
                    <motion.div key="b" exit={{ opacity: 0 }} className="mt-6">
                      <button onClick={() => setOpen(true)} className={btnPrimary}>
                        Bloom your flower 🌷
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="m"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7, duration: 0.8 }}
                      className="mt-6 space-y-4 font-hand text-2xl leading-snug sm:text-3xl text-foreground/90"
                    >
                      <p>
                        No matter how random or chaotic our conversations get, I hope you always
                        feel respected, appreciated, and comfortable around me.
                      </p>
                      <p className="font-bold text-rose-deep">Take care, Kangna. ❤️</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}

            {selectedGift === "coffee" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-6 text-center space-y-4"
              >
                <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-accent/80 text-rose-deep shadow-sm">
                  <Coffee size={40} />
                </div>
                <h3 className="font-serif text-2xl font-medium">Perpetual Coffee Treaty ☕</h3>
                <p className="font-hand text-2xl leading-relaxed text-foreground/90 max-w-md mx-auto">
                  Redeemable whenever you feel ready. 1 warm iced latte, cold brew, or whatever you
                  like — on me, with zero drama and only good laughs.
                </p>
                <div className="inline-block rounded-full bg-secondary/80 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  No Expiration Date • Strictly Zero Guilt
                </div>
              </motion.div>
            )}

            {selectedGift === "promise" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-6 text-center space-y-4"
              >
                <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-secondary text-rose-deep shadow-sm">
                  <ShieldCheck size={40} />
                </div>
                <h3 className="font-serif text-2xl font-medium">Unconditional Space Promise 🕊️</h3>
                <p className="font-hand text-2xl leading-relaxed text-foreground/90 max-w-md mx-auto">
                  No awkward pressure, no guilt trips, and no rush. Your comfort and pace are
                  what matter most. Take all the time you need.
                </p>
                <div className="inline-block rounded-full bg-primary/20 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-rose-deep">
                  Guaranteed Comfort First
                </div>
              </motion.div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* Zero-Pressure Sentiment / Peace Treaty Check */
function PeaceTreaty() {
  const [response, setResponse] = useState<string | null>(null);

  return (
    <section className="px-5 py-20 bg-secondary/30 border-y border-border/40">
      <div className="mx-auto max-w-xl text-center">
        <Reveal>
          <Eyebrow>Zero Pressure Check-in</Eyebrow>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl">How are you feeling right now?</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Be 100% honest. There are no right or wrong answers.
          </p>
        </Reveal>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() =>
              setResponse(
                "Completely understood. Take all the time and space you need. I respect that completely, and I will be here whenever you feel like talking. 🤍",
              )
            }
            className={btnOutline}
          >
            I need some time &amp; space 🕊️
          </button>
          <button
            onClick={() =>
              setResponse(
                "Thank you for reading through this. It genuinely means the world to me. I'll continue showing you through my actions that you can count on my respect. 🌸",
              )
            }
            className={btnOutline}
          >
            A little better now 🤍
          </button>
          <button
            onClick={() =>
              setResponse(
                "Peace treaty accepted! 🤝 Thank you, Kangna. I promise to be a better, more thoughtful friend who always respects your boundaries. Coffee's on me! ☕✨",
              )
            }
            className={`${btnBase} bg-rose-deep text-primary-foreground shadow-soft hover:shadow-card-hover`}
          >
            Accept Peace Treaty 🕊️✨
          </button>
        </div>

        <AnimatePresence>
          {response && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="mt-8 rounded-2xl border border-primary/30 bg-card p-6 shadow-paper"
            >
              <p className="font-hand text-2xl text-rose-deep leading-relaxed sm:text-3xl">
                {response}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* Closing Section */
function Closing() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="relative flex min-h-svh flex-col justify-between overflow-hidden bg-soft px-5">
      <Petals count={9} />

      <div className="relative z-10 mx-auto flex max-w-xl flex-1 flex-col justify-center py-28 text-center">
        <Reveal>
          <h2 className="font-serif text-5xl sm:text-6xl text-foreground">That's all, Kangna.</h2>
        </Reveal>

        <Reveal delay={0.15} className="mt-8 space-y-5 text-lg leading-relaxed text-muted-foreground">
          <p>I don't expect everything to magically become normal just because I made a website.</p>
          <p>
            Take your time. If you need space, I'll respect that with zero complaints.
          </p>
          <p>
            I just wanted to make sure you truly knew that I understand my mistake, and that I'm
            genuinely, deeply sorry.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-14 inline-block">
            <p className="font-hand text-3xl leading-tight text-rose-deep sm:text-4xl">
              With all my sincerity,
              <br />
              <span className="font-bold">Your occasionally annoying friend.</span>
            </p>
            <div className="mt-4 flex justify-center text-rose-deep">
              <Heart size={28} className="animate-pulse fill-rose-deep/30 text-rose-deep" />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.4} className="mt-12">
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/90 px-5 py-2 text-xs font-semibold text-muted-foreground shadow-xs transition hover:text-foreground hover:shadow-soft"
          >
            <ArrowUp size={14} /> Back to top
          </button>
        </Reveal>
      </div>

      <footer className="relative z-10 border-t border-border/40 py-8 text-center text-sm text-muted-foreground">
        Crafted with care, sincerity, and respect — just for Kangna. ♡
      </footer>
    </section>
  );
}

function Index() {
  return (
    <MotionConfig reducedMotion="user">
      <ClickSparkles />
      <Nav />
      <main>
        <Hero />
        <Letter />
        <Ornament />
        <Remember />
        <Appreciation />
        <Gift />
        <PeaceTreaty />
        <Closing />
      </main>
    </MotionConfig>
  );
}
