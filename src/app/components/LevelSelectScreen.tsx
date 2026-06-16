import { FloatingClouds, FloatingCoins } from "./shared/FloatingDecor";
import { HUDBadge } from "./shared/HUDBadge";
import { MascotAvatar } from "./shared/Mascot";

interface LevelSelectScreenProps {
  playerName: string;
  avatar: "boy" | "girl";
  highscore: number;
  musicOn: boolean;
  onToggleMusic: () => void;
  onSelectLevel: (level: 1 | 2 | 3 | 4) => void;
}

const LEVELS = [
  {
    id: 1 as const,
    title: "Mengenal\nRupiah",
    icon: "💵",
    desc: "Kenali semua pecahan uang Rupiah Indonesia!",
    color: "#FF6B9D",
    borderColor: "#C2185B",
    shadowColor: "#880E4F",
    bg: "linear-gradient(135deg, #FF8FB1 0%, #FF6B9D 100%)",
    decorations: ["💴", "💶", "💷"],
    stars: 3,
    badge: "STARTER",
    badgeBg: "#4CAF50",
  },
  {
    id: 2 as const,
    title: "Tukar\nUang",
    icon: "🔄",
    desc: "Tukarkan uang besar menjadi pecahan yang benar!",
    color: "#2196F3",
    borderColor: "#0D47A1",
    shadowColor: "#0a3580",
    bg: "linear-gradient(135deg, #64B5F6 0%, #2196F3 100%)",
    decorations: ["💰", "🪙", "💸"],
    stars: 2,
    badge: "FUN",
    badgeBg: "#FF9800",
  },
  {
    id: 3 as const,
    title: "Kuis\nRupiah",
    icon: "🧮",
    desc: "Jawab soal matematika uang dan raih skor tertinggi!",
    color: "#9C27B0",
    borderColor: "#6A1B9A",
    shadowColor: "#4A148C",
    bg: "linear-gradient(135deg, #CE93D8 0%, #9C27B0 100%)",
    decorations: ["❓", "⭐", "🏆"],
    stars: 2,
    badge: "QUIZ",
    badgeBg: "#9C27B0",
  },
  {
    id: 4 as const,
    title: "Kasir\nBelanja",
    icon: "🛒",
    desc: "Jadi kasir supermarket dan hitung kembalian!",
    color: "#4CAF50",
    borderColor: "#1B5E20",
    shadowColor: "#145A18",
    bg: "linear-gradient(135deg, #81C784 0%, #4CAF50 100%)",
    decorations: ["🛍️", "🧾", "🏪"],
    stars: 3,
    badge: "TYCOON",
    badgeBg: "#FF5252",
  },
];

export function LevelSelectScreen({
  playerName,
  avatar,
  highscore,
  musicOn,
  onToggleMusic,
  onSelectLevel,
}: LevelSelectScreenProps) {
  return (
    <div
      className="relative w-full h-full flex flex-col overflow-hidden"
      style={{ background: "linear-gradient(180deg, #1E90FF 0%, #87CEEB 40%, #C1E8FF 75%, #E8F7FF 100%)" }}
    >
      <FloatingClouds />
      <FloatingCoins count={6} />

      {/* TOP HUD */}
      <div
        className="relative z-20 flex items-center justify-between px-8 py-4"
        style={{
          background: "linear-gradient(180deg, rgba(30,80,160,0.85) 0%, rgba(30,80,160,0.6) 100%)",
          borderBottom: "4px solid #FFD93D",
        }}
      >
        <div className="flex items-center gap-4">
          <MascotAvatar avatar={avatar} size={52} animate={false} />
          <HUDBadge icon="👤" label="Pemain" value={playerName} />
          <HUDBadge icon="🏆" label="Highscore" value={`${highscore.toLocaleString()} Poin`} color="#E65100" />
        </div>

        <div
          className="text-center"
          style={{
            fontFamily: "Fredoka One, cursive",
            fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
            color: "#FFD93D",
            textShadow: "3px 3px 0 #E65100",
          }}
        >
          🗺️ Pilih Level Petualangan!
        </div>

        {/* Music toggle */}
        <div className="flex items-center gap-3">
          <div className="hud-badge flex items-center gap-3">
            <span style={{ fontSize: "1.3rem" }}>{musicOn ? "🎵" : "🔇"}</span>
            <div
              onClick={onToggleMusic}
              style={{
                width: 52,
                height: 28,
                background: musicOn ? "#4CAF50" : "#999",
                borderRadius: 14,
                border: "3px solid rgba(0,0,0,0.3)",
                cursor: "pointer",
                position: "relative",
                transition: "background 0.2s",
                boxShadow: "inset 0 2px 4px rgba(0,0,0,0.2)",
              }}
            >
              <div
                style={{
                  width: 20,
                  height: 20,
                  background: "white",
                  borderRadius: "50%",
                  position: "absolute",
                  top: 1,
                  left: musicOn ? 27 : 3,
                  transition: "left 0.2s",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
                }}
              />
            </div>
            <span
              style={{
                fontFamily: "Fredoka One, cursive",
                fontSize: "0.9rem",
                color: "#2D1B69",
              }}
            >
              Musik
            </span>
          </div>
        </div>
      </div>

      {/* LEVEL GRID */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-12 py-6">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(16px, 2.5vw, 32px)",
            width: "100%",
            maxWidth: 1100,
          }}
        >
          {LEVELS.map((level, i) => (
            <LevelCard
              key={level.id}
              level={level}
              onSelect={() => onSelectLevel(level.id)}
              animDelay={i * 0.08}
            />
          ))}
        </div>
      </div>

      {/* Bottom grass */}
      <div
        className="absolute bottom-0 left-0 right-0 z-0"
        style={{
          height: "7%",
          background: "linear-gradient(180deg, #66BB6A 0%, #388E3C 100%)",
          borderTop: "4px solid #2E7D32",
        }}
      />
    </div>
  );
}

interface LevelCardProps {
  level: typeof LEVELS[0];
  onSelect: () => void;
  animDelay: number;
}

function LevelCard({ level, onSelect, animDelay }: LevelCardProps) {
  return (
    <div
      onClick={onSelect}
      className="cursor-pointer"
      style={{
        background: level.bg,
        border: `5px solid ${level.borderColor}`,
        borderRadius: 28,
        boxShadow: `8px 8px 0px ${level.shadowColor}`,
        padding: "clamp(16px, 2.5vw, 28px)",
        display: "flex",
        alignItems: "center",
        gap: 20,
        position: "relative",
        overflow: "hidden",
        transition: "transform 0.15s ease, box-shadow 0.15s ease",
        animationDelay: `${animDelay}s`,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-6px) scale(1.02)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = `10px 14px 0px ${level.shadowColor}`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0) scale(1)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = `8px 8px 0px ${level.shadowColor}`;
      }}
    >
      {/* Background decoration burst */}
      <div
        style={{
          position: "absolute",
          top: -30,
          right: -30,
          width: 130,
          height: 130,
          background: "rgba(255,255,255,0.18)",
          borderRadius: "50%",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -20,
          left: "30%",
          width: 80,
          height: 80,
          background: "rgba(255,255,255,0.12)",
          borderRadius: "50%",
        }}
      />

      {/* Icon circle */}
      <div
        style={{
          width: "clamp(70px, 8vw, 96px)",
          height: "clamp(70px, 8vw, 96px)",
          background: "rgba(255,255,255,0.92)",
          border: `4px solid ${level.borderColor}`,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "clamp(2rem, 4vw, 3rem)",
          flexShrink: 0,
          boxShadow: "3px 3px 0 rgba(0,0,0,0.2)",
          animation: "float 3s ease-in-out infinite",
        }}
      >
        {level.icon}
      </div>

      {/* Text content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
          <h3
            style={{
              fontFamily: "Fredoka One, cursive",
              fontSize: "clamp(1.3rem, 2.5vw, 1.9rem)",
              color: "#ffffff",
              textShadow: "2px 2px 0 rgba(0,0,0,0.3)",
              lineHeight: 1.15,
              margin: 0,
              whiteSpace: "pre-line",
            }}
          >
            {level.title}
          </h3>
          <span
            style={{
              background: level.badgeBg,
              color: "#fff",
              fontFamily: "Fredoka One, cursive",
              fontSize: "0.7rem",
              padding: "2px 10px",
              borderRadius: 20,
              border: "2px solid rgba(255,255,255,0.5)",
              letterSpacing: "0.08em",
              whiteSpace: "nowrap",
              alignSelf: "flex-start",
            }}
          >
            {level.badge}
          </span>
        </div>
        <p
          style={{
            fontFamily: "Nunito, sans-serif",
            fontSize: "clamp(0.75rem, 1.3vw, 0.95rem)",
            color: "rgba(255,255,255,0.92)",
            fontWeight: 700,
            margin: 0,
            lineHeight: 1.4,
          }}
        >
          {level.desc}
        </p>

        {/* Star rating and floating decorations */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 10 }}>
          <div>
            {[...Array(3)].map((_, si) => (
              <span
                key={si}
                style={{
                  fontSize: "1.1rem",
                  filter: si < level.stars ? "none" : "grayscale(1) opacity(0.4)",
                }}
              >
                ⭐
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            {level.decorations.map((d, di) => (
              <span
                key={di}
                style={{
                  fontSize: "1.2rem",
                  animation: `float ${2 + di * 0.4}s ease-in-out ${di * 0.3}s infinite`,
                  display: "inline-block",
                }}
              >
                {d}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Arrow button */}
      <div
        style={{
          width: 44,
          height: 44,
          background: "rgba(255,255,255,0.9)",
          border: `3px solid ${level.borderColor}`,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.3rem",
          flexShrink: 0,
          boxShadow: "2px 2px 0 rgba(0,0,0,0.2)",
        }}
      >
        ▶
      </div>
    </div>
  );
}
