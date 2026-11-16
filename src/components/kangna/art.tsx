import type React from "react";
import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export function Flower({ className = "", size = 24 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" className={className} aria-hidden>
      {[0, 72, 144, 216, 288].map((r) => (
        <ellipse
          key={r}
          cx="20"
          cy="10"
          rx="6"
          ry="9"
          fill="var(--primary)"
          opacity=".88"
          transform={`rotate(${r} 20 20)`}
        />
      ))}
      <circle cx="20" cy="20" r="4.5" fill="var(--gold)" />
      <circle cx="20" cy="20" r="2.2" fill="color-mix(in oklab, var(--gold) 80%, black)" />
    </svg>
  );
}

export function Star({
  className = "",
  size = 14,
  style,
}: {
  className?: string;
  size?: number;
  style?: React.CSSProperties;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" className={className} style={style} aria-hidden>
      <path d="M10 0 L12.5 7.5 L20 10 L12.5 12.5 L10 20 L7.5 12.5 L0 10 L7.5 7.5 Z" fill="var(--gold)" />
    </svg>
  );
}

export function Sparkle({
  className = "",
  size = 12,
  style,
}: {
  className?: string;
  size?: number;
  style?: React.CSSProperties;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} style={style} aria-hidden>
      <path
        d="M12 2L13.8 8.8L20 10.2L14.8 14.4L16.2 21L12 17.4L7.8 21L9.2 14.4L4 10.2L10.2 8.8L12 2Z"
        fill="var(--gold)"
        opacity="0.9"
      />
    </svg>
  );
}

export function Petals({ count = 14 }: { count?: number }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {Array.from({ length: count }).map((_, i) => {
        const leftPercent = (i * 97) % 100;
        const duration = 12 + (i % 6) * 2.5;
        const delay = -i * 1.8;
        const width = 11 + (i % 4) * 3;
        const height = 9 + (i % 3) * 3;
        const opacity = 0.5 + (i % 4) * 0.12;

        return (
          <span
            key={`petal-${i}`}
            className="animate-petal absolute top-0 block rounded-[65%_0_65%_0] bg-gradient-to-br from-primary via-rose-soft to-primary/40 shadow-sm"
            style={{
              left: `${leftPercent}%`,
              width,
              height,
              opacity,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
              filter: "blur(0.2px)",
            }}
          />
        );
      })}
      {Array.from({ length: 10 }).map((_, i) => (
        <Star
          key={`star-${i}`}
          size={7 + (i % 4) * 2.5}
          className="animate-twinkle absolute"
          style={{
            top: `${(i * 31 + 7) % 92}%`,
            left: `${(i * 47 + 11) % 92}%`,
            animationDelay: `${i * 0.35}s`,
            animationDuration: `${2.8 + (i % 3) * 0.8}s`,
          }}
        />
      ))}
      {Array.from({ length: 6 }).map((_, i) => (
        <span
          key={`orb-${i}`}
          className="animate-pulse-glow absolute block rounded-full bg-gold/25 blur-sm"
          style={{
            top: `${(i * 43 + 15) % 85}%`,
            left: `${(i * 59 + 8) % 88}%`,
            width: 14 + (i % 3) * 8,
            height: 14 + (i % 3) * 8,
            animationDelay: `${i * 0.7}s`,
            animationDuration: `${4 + i}s`,
          }}
        />
      ))}
    </div>
  );
}

export function Envelope({ open, onOpen }: { open: boolean; onOpen?: () => void }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-120, 120], [8, -8]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-120, 120], [-8, 8]), { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      className="relative mx-auto h-48 w-72 cursor-pointer select-none sm:h-56 sm:w-88"
      style={{ perspective: 1100, rotateX, rotateY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onOpen}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      {/* Ambient background glow behind envelope */}
      <div
        className="pointer-events-none absolute -inset-6 rounded-3xl bg-gradient-to-r from-primary/20 via-accent/25 to-secondary/30 blur-2xl transition-opacity duration-700"
        style={{ opacity: open ? 0.9 : 0.45 }}
      />

      {/* Parchment letter sliding out */}
      <motion.div
        className="paper-envelope absolute inset-x-5 bottom-4 h-40 rounded-xl border border-border/80 p-5 shadow-paper sm:h-48"
        initial={false}
        animate={open ? { y: -110, scale: 1.04, opacity: 1 } : { y: 0, scale: 0.98, opacity: 0.95 }}
        transition={{ duration: 1, delay: open ? 0.4 : 0, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center justify-between border-b border-primary/20 pb-2">
          <p className="font-hand text-2xl font-bold tracking-wide text-rose-deep sm:text-3xl">Dear Kangna,</p>
          <span className="rounded-full bg-secondary/80 px-2.5 py-0.5 text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
            Special Delivery
          </span>
        </div>
        <div className="mt-3 space-y-2.5">
          <div className="h-1.5 w-11/12 rounded-full bg-muted/90" />
          <div className="h-1.5 w-4/5 rounded-full bg-muted/80" />
          <div className="h-1.5 w-3/5 rounded-full bg-muted/70" />
        </div>
        <p className="mt-4 font-hand text-lg text-rose-deep/80 italic">— A sincere message awaits below ↓</p>
      </motion.div>

      {/* Main envelope back pocket */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-accent to-secondary shadow-soft" />

      {/* Envelope interior lining pattern */}
      <svg className="absolute inset-0 h-full w-full rounded-2xl" viewBox="0 0 320 208" preserveAspectRatio="none" aria-hidden>
        <path d="M0 0 L160 120 L320 0 L320 208 L0 208 Z" fill="var(--secondary)" />
        <path d="M0 208 L160 105 L320 208 Z" fill="color-mix(in oklab, var(--accent) 75%, var(--primary))" />
        <path d="M0 0 L160 105 L0 208 Z" fill="color-mix(in oklab, var(--secondary) 90%, var(--background))" opacity="0.65" />
        <path d="M320 0 L160 105 L320 208 Z" fill="color-mix(in oklab, var(--secondary) 85%, var(--background))" opacity="0.65" />
      </svg>

      {/* Vintage Air Mail striped border accent */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-2.5 overflow-hidden rounded-b-2xl opacity-40">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, var(--rose-deep) 0, var(--rose-deep) 10px, transparent 10px, transparent 18px, var(--leaf) 18px, var(--leaf) 28px, transparent 28px, transparent 36px)",
          }}
        />
      </div>

      {/* Animated Top Flap */}
      <motion.svg
        className="absolute inset-x-0 top-0 h-1/2 w-full origin-top drop-shadow-md"
        viewBox="0 0 320 104"
        preserveAspectRatio="none"
        initial={false}
        animate={{
          rotateX: open ? 180 : 0,
          zIndex: open ? 0 : 20,
        }}
        transition={{ duration: 0.65, ease: [0.33, 1, 0.68, 1] }}
        aria-hidden
      >
        <path d="M0 0 L320 0 L160 104 Z" fill="var(--primary)" />
      </motion.svg>

      {/* Embossed Wax Seal Badge */}
      {!open ? (
        <motion.div
          className="absolute left-1/2 top-1/2 z-30 grid h-13 w-13 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-rose-deep shadow-paper ring-4 ring-rose-soft/50 sm:h-14 sm:w-14"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="grid h-10 w-10 place-items-center rounded-full border border-gold/60 bg-gradient-to-br from-rose-deep to-rose-deep/80 text-primary-foreground sm:h-11 sm:w-11">
            <span className="text-base select-none">💌</span>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ scale: 1, opacity: 1 }}
          animate={{ scale: 1.6, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute left-1/2 top-1/2 z-30 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gold/50 blur-sm"
        />
      )}
    </motion.div>
  );
}

export function GiftFlower({ open }: { open: boolean }) {
  const petals = [0, 36, 72, 108, 144, 180, 216, 252, 288, 324];
  return (
    <div className="relative mx-auto flex h-72 w-64 items-center justify-center">
      {/* Halo glow when blooming */}
      <motion.div
        className="pointer-events-none absolute h-60 w-60 rounded-full bg-gradient-to-r from-primary/30 via-rose-soft/20 to-gold/30 blur-2xl"
        initial={false}
        animate={{ scale: open ? [1, 1.15, 1] : 0.6, opacity: open ? 0.9 : 0.2 }}
        transition={{ duration: 3.5, repeat: open ? Infinity : 0, ease: "easeInOut" }}
      />

      <svg viewBox="0 0 200 240" className="relative z-10 h-full w-full" aria-label="A blooming flower for Kangna">
        {/* Stem */}
        <motion.path
          d="M100 115 C100 165 95 195 100 236"
          stroke="var(--leaf)"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
          initial={false}
          animate={{ pathLength: open ? 1 : 0.8 }}
          transition={{ duration: 1 }}
        />

        {/* Leaves */}
        <motion.path
          d="M100 190 q-36 -8 -48 -36 q32 2 48 36"
          fill="var(--leaf)"
          initial={false}
          animate={{ scale: open ? 1.05 : 0.6, rotate: open ? 0 : -10 }}
          style={{ originX: "100px", originY: "190px" }}
          transition={{ duration: 0.9, delay: 0.2 }}
        />
        <motion.path
          d="M100 168 q36 -8 48 -36 q-32 2 -48 36"
          fill="var(--leaf)"
          initial={false}
          animate={{ scale: open ? 1.05 : 0.6, rotate: open ? 0 : 10 }}
          style={{ originX: "100px", originY: "168px" }}
          transition={{ duration: 0.9, delay: 0.3 }}
        />

        {/* Layer 1 - Outer Petals */}
        {petals.map((r, i) => (
          <motion.ellipse
            key={`outer-${r}`}
            cx="100"
            cy="70"
            rx="15"
            ry="32"
            fill={i % 2 === 0 ? "var(--primary)" : "color-mix(in oklab, var(--primary) 70%, var(--accent))"}
            style={{ originX: "100px", originY: "100px" }}
            initial={false}
            animate={
              open
                ? { rotate: r, scale: 1, opacity: 0.95 }
                : { rotate: (i - 4.5) * 5, scale: 0.5, opacity: i % 2 ? 0.9 : 0.3 }
            }
            transition={{ duration: 1.2, delay: open ? i * 0.05 : 0, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}

        {/* Layer 2 - Inner Petals */}
        {petals.filter((_, i) => i % 2 === 0).map((r, i) => (
          <motion.ellipse
            key={`inner-${r}`}
            cx="100"
            cy="80"
            rx="11"
            ry="22"
            fill="color-mix(in oklab, var(--rose-soft) 80%, white)"
            style={{ originX: "100px", originY: "100px" }}
            initial={false}
            animate={
              open
                ? { rotate: r + 18, scale: 0.9, opacity: 0.9 }
                : { rotate: 0, scale: 0.3, opacity: 0 }
            }
            transition={{ duration: 1.1, delay: open ? 0.4 + i * 0.06 : 0, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}

        {/* Center Golden Core */}
        <motion.circle
          cx="100"
          cy="100"
          fill="var(--gold)"
          stroke="color-mix(in oklab, var(--gold) 75%, black)"
          strokeWidth="1.5"
          initial={false}
          animate={{ r: open ? 14 : 4 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
        />
        <motion.circle
          cx="100"
          cy="100"
          fill="color-mix(in oklab, var(--gold) 85%, white)"
          initial={false}
          animate={{ r: open ? 6 : 0 }}
          transition={{ delay: 0.7 }}
        />
      </svg>
    </div>
  );
}
