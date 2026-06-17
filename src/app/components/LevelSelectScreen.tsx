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
  onBelajar: () => void;
  onExit: () => void;
}

const LEVELS = [
  {
    id: 1 as const,
    title: "Mengenal Rupiah",
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
    title: "Tukar Uang",
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
    title: "Kuis Rupiah",
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
    title: "Kasir Belanja",
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
  onBelajar,
  onExit,
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
          <button
            className="game-btn-yellow"
            onClick={onExit}
            style={{ padding: "8px 16px", fontSize: "0.9rem" }}
          >
            Exit
          </button>
        </div>
      </div>

      {/* LEVEL GRID */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-12 py-6">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(16px, 2vw, 28px)",
            width: "100%",
            maxWidth: 1300,
          }}
        >
          {/* BANNER BELAJAR RUPIAH */}
          <div
            onClick={onBelajar}
            className="cursor-pointer"
            style={{
              gridColumn: "1 / span 2",
              background: "linear-gradient(135deg, #FFD54F 0%, #FFA726 100%)",
              border: "5px solid #F57C00",
              borderRadius: 24,
              boxShadow: "8px 8px 0px #E65100",
              padding: "clamp(14px, 1.8vw, 22px)",
              display: "flex",
              alignItems: "center",
              gap: 18,
              position: "relative",
              overflow: "hidden",
              transition: "transform 0.15s ease, box-shadow 0.15s ease",
              minHeight: 90,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px) scale(1.01)";
              (e.currentTarget as HTMLDivElement).style.boxShadow = "10px 12px 0px #E65100";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = "translateY(0) scale(1)";
              (e.currentTarget as HTMLDivElement).style.boxShadow = "8px 8px 0px #E65100";
            }}
          >
            <div
              style={{
                position: "absolute",
                top: -30,
                right: -30,
                width: 100,
                height: 100,
                background: "rgba(255,255,255,0.22)",
                borderRadius: "50%",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: -20,
                left: "40%",
                width: 60,
                height: 60,
                background: "rgba(255,255,255,0.14)",
                borderRadius: "50%",
              }}
            />

            <div
              style={{
                width: "clamp(60px, 6vw, 80px)",
                height: "clamp(60px, 6vw, 80px)",
                background: "rgba(255,255,255,0.92)",
                border: "4px solid #F57C00",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                flexShrink: 0,
                boxShadow: "3px 3px 0 rgba(0,0,0,0.2)",
                animation: "float 3s ease-in-out infinite",
              }}
            >
              📚
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                <h2
                  style={{
                    fontFamily: "Fredoka One, cursive",
                    fontSize: "clamp(1.2rem, 2.2vw, 1.8rem)",
                    color: "#ffffff",
                    textShadow: "2px 2px 0 rgba(0,0,0,0.25)",
                    margin: 0,
                    lineHeight: 1.15,
                  }}
                >
                  Belajar Rupiah Dulu Yuk!
                </h2>
                <span
                  style={{
                    background: "#FF5252",
                    color: "#fff",
                    fontFamily: "Fredoka One, cursive",
                    fontSize: "0.65rem",
                    padding: "3px 12px",
                    borderRadius: 20,
                    border: "2px solid rgba(255,255,255,0.5)",
                    letterSpacing: "0.08em",
                    whiteSpace: "nowrap",
                    alignSelf: "center",
                  }}
                >
                  EDUKASI
                </span>
              </div>
              <p
                style={{
                  fontFamily: "Nunito, sans-serif",
                  fontSize: "clamp(0.7rem, 1.1vw, 0.85rem)",
                  color: "rgba(255,255,255,0.95)",
                  fontWeight: 700,
                  margin: 0,
                  lineHeight: 1.3,
                }}
              >
                Kenali uang kertas dan koin Indonesia sebelum memulai petualanganmu!
              </p>
            </div>

            <div
              style={{
                width: 40,
                height: 40,
                background: "rgba(255,255,255,0.9)",
                border: "3px solid #F57C00",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.1rem",
                flexShrink: 0,
                boxShadow: "2px 2px 0 rgba(0,0,0,0.2)",
                color: "#F57C00",
                fontWeight: "bold",
              }}
            >
              ▶
            </div>
          </div>

          {/* MAIN GAME LEVELS */}
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

      {/* BOTTOM GRASS */}
      <div
        className="absolute bottom-0 left-0 right-0 z-0"
        style={{
          height: "6%",
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
        border: `4px solid ${level.borderColor}`,
        borderRadius: 22,
        boxShadow: `6px 6px 0px ${level.shadowColor}`,
        padding: "clamp(12px, 1.6vw, 20px)",
        display: "flex",
        alignItems: "center",
        gap: 16,
        position: "relative",
        overflow: "hidden",
        transition: "transform 0.15s ease, box-shadow 0.15s ease",
        animationDelay: `${animDelay}s`,
        minHeight: 100,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px) scale(1.02)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = `8px 10px 0px ${level.shadowColor}`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0) scale(1)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = `6px 6px 0px ${level.shadowColor}`;
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -20,
          right: -20,
          width: 80,
          height: 80,
          background: "rgba(255,255,255,0.15)",
          borderRadius: "50%",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -15,
          left: "30%",
          width: 50,
          height: 50,
          background: "rgba(255,255,255,0.10)",
          borderRadius: "50%",
        }}
      />

      <div
        style={{
          width: "clamp(56px, 5.5vw, 76px)",
          height: "clamp(56px, 5.5vw, 76px)",
          background: "rgba(255,255,255,0.92)",
          border: `4px solid ${level.borderColor}`,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
          flexShrink: 0,
          boxShadow: "3px 3px 0 rgba(0,0,0,0.2)",
          animation: "float 3s ease-in-out infinite",
        }}
      >
        {level.icon}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <h3
            style={{
              fontFamily: "Fredoka One, cursive",
              fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
              color: "#ffffff",
              textShadow: "2px 2px 0 rgba(0,0,0,0.3)",
              lineHeight: 1.1,
              margin: 0,
              whiteSpace: "nowrap",
            }}
          >
            {level.title}
          </h3>
          <span
            style={{
              background: level.badgeBg,
              color: "#fff",
              fontFamily: "Fredoka One, cursive",
              fontSize: "0.6rem",
              padding: "3px 10px",
              borderRadius: 16,
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
            fontSize: "clamp(0.65rem, 1vw, 0.8rem)",
            color: "rgba(255,255,255,0.92)",
            fontWeight: 700,
            margin: 0,
            lineHeight: 1.3,
          }}
        >
          {level.desc}
        </p>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 8 }}>
          <div>
            {[...Array(3)].map((_, si) => (
              <span
                key={si}
                style={{
                  fontSize: "0.9rem",
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
                  fontSize: "1rem",
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

      <div
        style={{
          width: 38,
          height: 38,
          background: "rgba(255,255,255,0.9)",
          border: `3px solid ${level.borderColor}`,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1rem",
          flexShrink: 0,
          boxShadow: "2px 2px 0 rgba(0,0,0,0.2)",
          color: level.borderColor,
          fontWeight: "bold",
        }}
      >
        ▶
      </div>
    </div>
  );
}