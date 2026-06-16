import { useMemo } from "react";

interface Cloud {
  id: number;
  top: number;
  width: number;
  opacity: number;
  duration: number;
  delay: number;
}

export function FloatingClouds() {
  const clouds: Cloud[] = useMemo(() => [
    { id: 1, top: 5, width: 180, opacity: 0.9, duration: 28, delay: 0 },
    { id: 2, top: 12, width: 120, opacity: 0.75, duration: 38, delay: -12 },
    { id: 3, top: 20, width: 200, opacity: 0.85, duration: 45, delay: -6 },
    { id: 4, top: 8, width: 150, opacity: 0.8, duration: 32, delay: -20 },
  ], []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {clouds.map((c) => (
        <div
          key={c.id}
          className="absolute"
          style={{
            top: `${c.top}%`,
            opacity: c.opacity,
            animation: `cloudDrift ${c.duration}s linear ${c.delay}s infinite`,
          }}
        >
          <CloudShape width={c.width} />
        </div>
      ))}
    </div>
  );
}

function CloudShape({ width }: { width: number }) {
  const h = width * 0.45;
  return (
    <svg width={width} height={h} viewBox={`0 0 ${width} ${h}`} fill="none">
      <ellipse cx={width * 0.5} cy={h * 0.7} rx={width * 0.45} ry={h * 0.35} fill="white" />
      <circle cx={width * 0.3} cy={h * 0.55} r={h * 0.3} fill="white" />
      <circle cx={width * 0.55} cy={h * 0.42} r={h * 0.36} fill="white" />
      <circle cx={width * 0.72} cy={h * 0.55} r={h * 0.26} fill="white" />
    </svg>
  );
}

interface FloatingCoinsProps {
  count?: number;
  className?: string;
}

export function FloatingCoins({ count = 8, className = "" }: FloatingCoinsProps) {
  const coins = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      left: 5 + (i * 12) % 90,
      top: 10 + (i * 17) % 75,
      size: 28 + (i * 5) % 22,
      delay: (i * 0.6) % 4,
      duration: 2.5 + (i * 0.4) % 2,
    })),
  [count]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {coins.map((c) => (
        <div
          key={c.id}
          className="absolute"
          style={{
            left: `${c.left}%`,
            top: `${c.top}%`,
            animation: `float ${c.duration}s ease-in-out ${c.delay}s infinite`,
          }}
        >
          <CoinSVG size={c.size} />
        </div>
      ))}
    </div>
  );
}

function CoinSVG({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40">
      <circle cx="20" cy="20" r="19" fill="#FFD93D" stroke="#F57F17" strokeWidth="2.5" />
      <circle cx="20" cy="20" r="14" fill="#FFC107" stroke="#FF8F00" strokeWidth="1.5" />
      <text x="50%" y="54%" textAnchor="middle" dominantBaseline="middle" fontSize="13" fontWeight="bold" fill="#E65100" fontFamily="Fredoka One, cursive">Rp</text>
    </svg>
  );
}

export function Stars({ count = 6 }: { count?: number }) {
  const stars = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      left: 8 + (i * 15) % 84,
      top: 5 + (i * 13) % 60,
      size: 14 + (i * 4) % 14,
      delay: (i * 0.4) % 3,
    })),
  [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute animate-twinkle"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            animationDelay: `${s.delay}s`,
          }}
        >
          <span style={{ fontSize: s.size, lineHeight: 1 }}>⭐</span>
        </div>
      ))}
    </div>
  );
}

export function ConfettiPieces() {
  const pieces = useMemo(() =>
    Array.from({ length: 20 }, (_, i) => {
      const colors = ["#FF6B9D", "#FFD93D", "#4ECDC4", "#FF5252", "#9C27B0", "#4CAF50"];
      return {
        id: i,
        left: (i * 5.2) % 100,
        color: colors[i % colors.length],
        size: 8 + (i * 3) % 12,
        duration: 1.5 + (i * 0.2) % 2,
        delay: (i * 0.15) % 1.5,
        shape: i % 3,
      };
    }),
  []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-50">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.left}%`,
            top: "-20px",
            width: p.size,
            height: p.size,
            background: p.color,
            borderRadius: p.shape === 0 ? "50%" : p.shape === 1 ? "2px" : "0",
            transform: `rotate(${p.id * 18}deg)`,
            animation: `confettiFall ${p.duration}s ease-in ${p.delay}s forwards`,
          }}
        />
      ))}
    </div>
  );
}
