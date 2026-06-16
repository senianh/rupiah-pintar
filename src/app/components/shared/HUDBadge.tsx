interface HUDBadgeProps {
  icon: string;
  label: string;
  value: string | number;
  color?: string;
}

export function HUDBadge({ icon, label, value, color = "#4A148C" }: HUDBadgeProps) {
  return (
    <div
      className="hud-badge flex items-center gap-2"
      style={{ borderColor: color }}
    >
      <span style={{ fontSize: "1.3rem" }}>{icon}</span>
      <div>
        <div style={{ fontSize: "0.6rem", fontFamily: "Nunito, sans-serif", fontWeight: 700, color: "#888", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          {label}
        </div>
        <div style={{ fontFamily: "Fredoka One, cursive", fontSize: "1.05rem", color: "#2D1B69", lineHeight: 1 }}>
          {value}
        </div>
      </div>
    </div>
  );
}

interface HeartBarProps {
  lives: number;
  maxLives?: number;
}

export function HeartBar({ lives, maxLives = 3 }: HeartBarProps) {
  return (
    <div className="hud-badge flex items-center gap-1">
      {Array.from({ length: maxLives }, (_, i) => (
        <span
          key={i}
          style={{
            fontSize: "1.6rem",
            filter: i < lives ? "none" : "grayscale(1) opacity(0.35)",
            animation: i < lives ? `heartbeat 1.4s ease-in-out ${i * 0.2}s infinite` : "none",
            display: "inline-block",
          }}
        >
          ❤️
        </span>
      ))}
    </div>
  );
}

interface ScoreCounterProps {
  score: number;
  label?: string;
}

export function ScoreCounter({ score, label = "Poin" }: ScoreCounterProps) {
  return (
    <div className="hud-badge flex items-center gap-2">
      <span style={{ fontSize: "1.4rem" }}>⭐</span>
      <div>
        <div style={{ fontSize: "0.6rem", fontFamily: "Nunito, sans-serif", fontWeight: 700, color: "#888", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          {label}
        </div>
        <div style={{ fontFamily: "Fredoka One, cursive", fontSize: "1.2rem", color: "#FFD93D", textShadow: "1px 1px 0 #E65100", lineHeight: 1 }}>
          {score.toLocaleString()}
        </div>
      </div>
    </div>
  );
}

interface TimerBarProps {
  seconds: number;
  totalSeconds: number;
}

export function TimerBar({ seconds, totalSeconds }: TimerBarProps) {
  const pct = (seconds / totalSeconds) * 100;
  const isUrgent = seconds <= 10;
  const barColor = pct > 60 ? "#4CAF50" : pct > 30 ? "#FFD93D" : "#FF5252";

  return (
    <div className="hud-badge flex items-center gap-3" style={{ minWidth: 220 }}>
      <span
        style={{
          fontSize: "1.5rem",
          display: "inline-block",
          animation: isUrgent ? "timerPulse 0.5s ease-in-out infinite" : "none",
        }}
      >
        ⏱️
      </span>
      <div style={{ flex: 1 }}>
        <div
          style={{
            height: 14,
            background: "#e0e0e0",
            borderRadius: 8,
            border: "2px solid #4A148C",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${pct}%`,
              background: barColor,
              borderRadius: 6,
              transition: "width 1s linear, background 0.5s ease",
              boxShadow: `0 0 8px ${barColor}80`,
            }}
          />
        </div>
        <div
          style={{
            fontFamily: "Fredoka One, cursive",
            fontSize: "1.1rem",
            color: isUrgent ? "#FF5252" : "#2D1B69",
            textAlign: "center",
            lineHeight: 1.2,
            animation: isUrgent ? "timerPulse 0.5s ease-in-out infinite" : "none",
          }}
        >
          {seconds}s
        </div>
      </div>
    </div>
  );
}
