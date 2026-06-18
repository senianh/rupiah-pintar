import { useEffect, useState } from "react";
import { ConfettiPieces } from "./shared/FloatingDecor";
import { MascotAvatar } from "./shared/Mascot";

interface GameOverModalProps {
  type: "win" | "lose";
  score: number;
  stars: number;
  playerName: string;
  avatar: "boy" | "girl";
  levelName: string;
  onPlayAgain: () => void;
  onExit: () => void;
}

export function GameOverModal({
  type,
  score,
  stars,
  playerName,
  avatar,
  levelName,
  onPlayAgain,
  onExit,
}: GameOverModalProps) {
  const [showStars, setShowStars] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowStars(1), 400);
    const t2 = setTimeout(() => setShowStars(2), 700);
    const t3 = setTimeout(() => setShowStars(3), 1000);
    const t4 = setTimeout(() => setShowScore(true), 1200);
    const t5 = setTimeout(() => setShowButtons(true), 1500);
    return () => { [t1, t2, t3, t4, t5].forEach(clearTimeout); };
  }, []);

  const isWin = type === "win";

  const title = isWin
    ? stars >= 3 ? "SEMPURNA! 🏆" : stars >= 2 ? "HEBAT! 🎉" : "BAGUS! 👏"
    : "JANGAN MENYERAH! 💪";

  const subtitle = isWin
    ? stars >= 3 ? "Kamu luar biasa! Nilai sempurna!" : stars >= 2 ? "Kamu sangat pintar!" : "Terus berlatih ya!"
    : "Kamu sudah berani mencoba! Coba lagi ya!";

  const messages = isWin
    ? ["Waaah kamu keren banget!", "Rupiah Pintar banget nih!", "Terus belajar ya! 📚"]
    : ["Jangan sedih, coba lagi!", "Latihan membuat sempurna!", "Kamu pasti bisa! 💪"];

  const bgGradient = isWin
    ? "linear-gradient(135deg, #FF6B9D 0%, #FFD93D 50%, #4ECDC4 100%)"
    : "linear-gradient(135deg, #FF5252 0%, #FF8A80 50%, #FFAB91 100%)";

  const cardBg = isWin
    ? "linear-gradient(180deg, #FFFDE7 0%, #FFF9C4 100%)"
    : "linear-gradient(180deg, #FFF0F0 0%, #FFE0E0 100%)";

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.75)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
        backdropFilter: "blur(4px)",
      }}
    >
      {isWin && <ConfettiPieces />}

      <div
        className="animate-pop-in"
        style={{
          background: cardBg,
          border: `6px solid ${isWin ? "#4A148C" : "#B71C1C"}`,
          borderRadius: 36,
          boxShadow: `0 0 0 4px ${isWin ? "#FFD93D" : "#FF8A80"}, 12px 12px 0 ${isWin ? "#3D1A78" : "#8B0000"}`,
          padding: "40px 48px",
          width: "min(640px, 90vw)",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -80,
            width: 240,
            height: 240,
            background: isWin ? "rgba(255,215,0,0.15)" : "rgba(255,82,82,0.1)",
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -60,
            left: -60,
            width: 180,
            height: 180,
            background: isWin ? "rgba(78,205,196,0.15)" : "rgba(255,128,128,0.1)",
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />

        <div style={{ display: "flex", justifyContent: "center", marginBottom: -10 }}>
          <MascotAvatar avatar={avatar} size={100} animate />
        </div>

        <div
          style={{
            background: isWin
              ? "linear-gradient(135deg, #FF6B9D, #FFD93D)"
              : "linear-gradient(135deg, #FF5252, #FF8A80)",
            border: `4px solid ${isWin ? "#C2185B" : "#B71C1C"}`,
            borderRadius: 20,
            padding: "10px 24px",
            marginBottom: 16,
            display: "inline-block",
            boxShadow: `4px 4px 0 ${isWin ? "#880E4F" : "#8B0000"}`,
          }}
        >
          <div style={{ fontFamily: "Fredoka One, cursive", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "#ffffff", textShadow: "2px 2px 0 rgba(0,0,0,0.3)", lineHeight: 1 }}>
            {title}
          </div>
        </div>

        <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "1rem", fontWeight: 700, color: "#4A148C", marginBottom: 20 }}>
          {subtitle}
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 20, minHeight: 56 }}>
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={s <= showStars ? "animate-star-pop" : ""}
              style={{
                fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
                opacity: s <= showStars ? 1 : 0.25,
                filter: s <= stars && s <= showStars
                  ? "drop-shadow(0 0 12px #FFD700)"
                  : "grayscale(1)",
                animationDelay: `${(s - 1) * 0.3}s`,
                display: "inline-block",
                transform: s <= showStars ? "scale(1)" : "scale(0.5)",
                transition: "opacity 0.3s, transform 0.3s",
              }}
            >
              ⭐
            </div>
          ))}
        </div>

        {showScore && (
          <div
            className="animate-slide-up"
            style={{
              background: "rgba(74,20,140,0.08)",
              border: "3px solid #4A148C",
              borderRadius: 20,
              padding: "16px 24px",
              marginBottom: 20,
            }}
          >
            <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "0.8rem", fontWeight: 800, color: "#888", letterSpacing: "0.1em", marginBottom: 4 }}>
              {playerName} · {levelName}
            </div>
            <div style={{ fontFamily: "Fredoka One, cursive", fontSize: "clamp(2rem, 4vw, 2.8rem)", color: "#FFD93D", textShadow: "2px 2px 0 #E65100", lineHeight: 1 }}>
              {score.toLocaleString()} Poin
            </div>
            <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "0.85rem", fontWeight: 700, color: "#666", marginTop: 4 }}>
              {messages[Math.floor(Math.random() * messages.length)]}
            </div>
          </div>
        )}

        {showButtons && (
          <div className="flex gap-4 justify-center animate-slide-up">
            <button
              className="game-btn-primary"
              onClick={onPlayAgain}
              style={{ fontSize: "clamp(1rem, 2vw, 1.3rem)", padding: "14px 28px", minWidth: 160 }}
            >
              🔄 Main Lagi!
            </button>
            <button
              className="game-btn-blue"
              onClick={onExit}
              style={{ fontSize: "clamp(1rem, 2vw, 1.3rem)", padding: "14px 28px", minWidth: 160 }}
            >
              🏠 Menu Utama
            </button>
          </div>
        )}

        <div
          style={{
            position: "absolute",
            top: 12,
            right: 16,
            background: isWin ? "#4CAF50" : "#FF9800",
            border: "2px solid rgba(0,0,0,0.2)",
            borderRadius: 20,
            padding: "3px 12px",
            fontFamily: "Fredoka One, cursive",
            fontSize: "0.75rem",
            color: "#fff",
          }}
        >
          {levelName}
        </div>
      </div>
    </div>
  );
}
