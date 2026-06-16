import { useState, useCallback } from "react";
import { MascotWithBubble } from "./shared/Mascot";
import { FloatingClouds } from "./shared/FloatingDecor";

interface TukarUangScreenProps {
  avatar: "boy" | "girl";
  onBack: () => void;
  onComplete: (score: number) => void;
}

const MONEY_CHIPS = [
  { value: 1000, label: "Rp 1.000", bg: "#C62828", text: "#FFCDD2", emoji: "🔴", count: 5 },
  { value: 2000, label: "Rp 2.000", bg: "#546E7A", text: "#CFD8DC", emoji: "⚫", count: 5 },
  { value: 5000, label: "Rp 5.000", bg: "#5D4037", text: "#D7CCC8", emoji: "🟤", count: 5 },
  { value: 10000, label: "Rp 10.000", bg: "#6A1B9A", text: "#E1BEE7", emoji: "🟣", count: 3 },
  { value: 20000, label: "Rp 20.000", bg: "#2E7D32", text: "#C8E6C9", emoji: "🟢", count: 3 },
  { value: 50000, label: "Rp 50.000", bg: "#1565C0", text: "#BBDEFB", emoji: "🔵", count: 3 },
];

const CHALLENGES = [
  { target: 50000, label: "Rp 50.000", hint: "Misalnya: 5 lembar Rp 10.000!" },
  { target: 100000, label: "Rp 100.000", hint: "Misalnya: 2 lembar Rp 50.000!" },
  { target: 25000, label: "Rp 25.000", hint: "Misalnya: 1 lembar Rp 20.000 + 1 lembar Rp 5.000!" },
  { target: 75000, label: "Rp 75.000", hint: "Misalnya: 1 lembar Rp 50.000 + 5 lembar Rp 5.000!" },
  { target: 30000, label: "Rp 30.000", hint: "Misalnya: 3 lembar Rp 10.000!" },
];

interface TrayBill {
  id: string;
  value: number;
  label: string;
  bg: string;
  text: string;
  emoji: string;
}

export function TukarUangScreen({ avatar, onBack, onComplete }: TukarUangScreenProps) {
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [trayBills, setTrayBills] = useState<TrayBill[]>([]);
  const [feedback, setFeedback] = useState<"idle" | "correct" | "over" | "hint">("idle");
  const [score, setScore] = useState(0);
  const [chipCounts, setChipCounts] = useState<Record<number, number>>(
    Object.fromEntries(MONEY_CHIPS.map((c) => [c.value, c.count]))
  );
  const [showHint, setShowHint] = useState(false);

  const challenge = CHALLENGES[challengeIdx];
  const trayTotal = trayBills.reduce((s, b) => s + b.value, 0);

  const handleAddBill = useCallback((chip: typeof MONEY_CHIPS[0]) => {
    if (chipCounts[chip.value] <= 0) return;
    if (trayTotal + chip.value > challenge.target) {
      setFeedback("over");
      setTimeout(() => setFeedback("idle"), 1200);
      return;
    }
    setTrayBills((prev) => [
      ...prev,
      { id: `${chip.value}-${Date.now()}`, value: chip.value, label: chip.label, bg: chip.bg, text: chip.text, emoji: chip.emoji },
    ]);
    setChipCounts((prev) => ({ ...prev, [chip.value]: prev[chip.value] - 1 }));

    const newTotal = trayTotal + chip.value;
    if (newTotal === challenge.target) {
      setFeedback("correct");
      const pts = 200 + Math.max(0, 100 - trayBills.length * 10);
      setScore((s) => s + pts);
      setTimeout(() => {
        if (challengeIdx < CHALLENGES.length - 1) {
          setChallengeIdx((i) => i + 1);
          setTrayBills([]);
          setFeedback("idle");
          setShowHint(false);
          setChipCounts(Object.fromEntries(MONEY_CHIPS.map((c) => [c.value, c.count])));
        } else {
          onComplete(score + pts);
        }
      }, 1500);
    }
  }, [trayTotal, chipCounts, challenge.target, trayBills.length, challengeIdx, score, onComplete]);

  const handleClearTray = () => {
    setTrayBills([]);
    setChipCounts(Object.fromEntries(MONEY_CHIPS.map((c) => [c.value, c.count])));
    setFeedback("idle");
  };

  const handleRemoveLast = () => {
    if (trayBills.length === 0) return;
    const last = trayBills[trayBills.length - 1];
    setTrayBills((prev) => prev.slice(0, -1));
    setChipCounts((prev) => ({ ...prev, [last.value]: prev[last.value] + 1 }));
  };

  const isCorrect = feedback === "correct";
  const isOver = feedback === "over";

  return (
    <div
      className="relative w-full h-full flex flex-col overflow-hidden"
      style={{ background: "linear-gradient(180deg, #1565C0 0%, #1976D2 30%, #42A5F5 70%, #B3E5FC 100%)" }}
    >
      <FloatingClouds />

      {/* Header */}
      <div
        className="relative z-20 flex items-center justify-between px-6 py-3"
        style={{
          background: "linear-gradient(180deg, rgba(21,27,100,0.92) 0%, rgba(21,27,100,0.7) 100%)",
          borderBottom: "4px solid #FFD93D",
          flexShrink: 0,
        }}
      >
        <button className="game-btn-yellow" onClick={onBack} style={{ padding: "8px 20px", fontSize: "1rem" }}>
          ← Kembali
        </button>
        <h2 style={{ fontFamily: "Fredoka One, cursive", fontSize: "clamp(1.4rem, 2.8vw, 2rem)", color: "#FFD93D", textShadow: "2px 2px 0 #E65100", margin: 0 }}>
          🔄 Tukar Uang 🔄
        </h2>
        <div className="hud-badge">
          <span style={{ fontFamily: "Fredoka One, cursive", fontSize: "1.1rem", color: "#FFD93D" }}>⭐ {score} Poin</span>
        </div>
      </div>

      {/* Main layout */}
      <div className="flex-1 flex flex-col z-10 relative px-6 py-4 gap-4 overflow-hidden">

        {/* TOP: Challenge display */}
        <div
          className="game-card flex items-center justify-between px-6 py-4"
          style={{
            background: isCorrect
              ? "linear-gradient(135deg, #A5D6A7, #66BB6A)"
              : isOver
              ? "linear-gradient(135deg, #FFCDD2, #EF9A9A)"
              : "linear-gradient(135deg, #FFD93D, #FFC107)",
            borderColor: isCorrect ? "#2E7D32" : isOver ? "#B71C1C" : "#E65100",
            boxShadow: isCorrect ? "6px 6px 0 #1B5E20" : isOver ? "6px 6px 0 #8B0000" : "6px 6px 0 #E65100",
            transition: "all 0.3s ease",
            flexShrink: 0,
          }}
        >
          <div>
            <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "0.85rem", fontWeight: 800, color: "rgba(0,0,0,0.6)" }}>
              {isCorrect ? "✅ BENAR! LUAR BIASA!" : isOver ? "❌ MELEBIHI TARGET!" : `Soal ${challengeIdx + 1} / ${CHALLENGES.length}`}
            </div>
            <div style={{ fontFamily: "Fredoka One, cursive", fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", color: "#2D1B69", lineHeight: 1.1 }}>
              {isCorrect ? "🎉 Sempurna!" : isOver ? "Hapus dan coba lagi!" : `Tukar Uang ${challenge.label}`}
            </div>
          </div>

          {/* Tray total progress */}
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "Fredoka One, cursive", fontSize: "1rem", color: "#2D1B69", marginBottom: 4 }}>
              Total di Nampan:
            </div>
            <div
              style={{
                fontFamily: "Fredoka One, cursive",
                fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                color: trayTotal > challenge.target ? "#FF5252" : trayTotal === challenge.target ? "#2E7D32" : "#2D1B69",
              }}
            >
              Rp {trayTotal.toLocaleString("id-ID")}
            </div>
            <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "0.8rem", fontWeight: 700, color: "#555" }}>
              dari {challenge.label}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={() => setShowHint(!showHint)}
              style={{
                background: "rgba(255,255,255,0.7)",
                border: "3px solid #4A148C",
                borderRadius: 12,
                padding: "8px 14px",
                fontFamily: "Fredoka One, cursive",
                fontSize: "0.9rem",
                cursor: "pointer",
              }}
            >
              💡 Petunjuk
            </button>
            <button
              onClick={handleRemoveLast}
              style={{
                background: "rgba(255,255,255,0.7)",
                border: "3px solid #F44336",
                borderRadius: 12,
                padding: "8px 14px",
                fontFamily: "Fredoka One, cursive",
                fontSize: "0.9rem",
                cursor: "pointer",
              }}
            >
              ↩ Hapus
            </button>
            <button
              onClick={handleClearTray}
              style={{
                background: "rgba(255,255,255,0.7)",
                border: "3px solid #FF5252",
                borderRadius: 12,
                padding: "8px 14px",
                fontFamily: "Fredoka One, cursive",
                fontSize: "0.9rem",
                cursor: "pointer",
              }}
            >
              🗑️ Reset
            </button>
          </div>
        </div>

        {showHint && (
          <div
            className="animate-slide-in"
            style={{
              background: "#FFF9C4",
              border: "3px solid #F9A825",
              borderRadius: 16,
              padding: "10px 20px",
              fontFamily: "Nunito, sans-serif",
              fontWeight: 700,
              color: "#5D4037",
              fontSize: "0.95rem",
              boxShadow: "3px 3px 0 #F57F17",
              flexShrink: 0,
            }}
          >
            💡 Petunjuk: {challenge.hint}
          </div>
        )}

        {/* CENTER: Money tray */}
        <div
          style={{
            flex: 1,
            background: isCorrect
              ? "linear-gradient(135deg, #E8F5E9, #C8E6C9)"
              : "linear-gradient(135deg, #FFF8E1, #FFF3E0)",
            border: `4px solid ${isCorrect ? "#2E7D32" : "#4A148C"}`,
            borderRadius: 24,
            boxShadow: `6px 6px 0 ${isCorrect ? "#1B5E20" : "#3D1A78"}`,
            display: "flex",
            flexDirection: "column" as const,
            overflow: "hidden",
            minHeight: 100,
            position: "relative" as const,
          }}
        >
          <div
            style={{
              background: isCorrect ? "rgba(46,125,50,0.15)" : "rgba(74,20,140,0.08)",
              padding: "8px 16px",
              borderBottom: `2px solid ${isCorrect ? "#2E7D32" : "#4A148C"}33`,
              fontFamily: "Fredoka One, cursive",
              fontSize: "0.9rem",
              color: "#2D1B69",
            }}
          >
            🧺 Nampan Uang {trayBills.length > 0 ? `(${trayBills.length} lembar)` : ""}
          </div>

          {trayBills.length === 0 ? (
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column" as const,
                gap: 8,
                color: "#aaa",
              }}
            >
              <span style={{ fontSize: "3rem" }}>💼</span>
              <span style={{ fontFamily: "Nunito, sans-serif", fontWeight: 700, fontSize: "1rem" }}>
                Klik uang di bawah untuk ditaruh di nampan!
              </span>
            </div>
          ) : (
            <div
              style={{
                flex: 1,
                display: "flex",
                flexWrap: "wrap" as const,
                gap: 8,
                padding: "12px 16px",
                alignContent: "flex-start",
                overflowY: "auto",
              }}
            >
              {trayBills.map((bill, i) => (
                <div
                  key={bill.id}
                  className="animate-pop-in"
                  style={{
                    background: bill.bg,
                    border: "3px solid rgba(0,0,0,0.3)",
                    borderRadius: 10,
                    padding: "4px 12px",
                    fontFamily: "Fredoka One, cursive",
                    fontSize: "0.8rem",
                    color: bill.text,
                    boxShadow: "2px 3px 6px rgba(0,0,0,0.25)",
                    animationDelay: `${i * 0.04}s`,
                    whiteSpace: "nowrap",
                  }}
                >
                  {bill.emoji} {bill.label}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* BOTTOM: Money dock */}
        <div
          style={{
            flexShrink: 0,
            display: "flex",
            gap: 12,
            justifyContent: "center",
            alignItems: "center",
            background: "rgba(0,0,0,0.25)",
            borderRadius: 20,
            padding: "12px 16px",
            border: "3px solid rgba(255,255,255,0.3)",
          }}
        >
          <MascotWithBubble
            avatar={avatar}
            bubbleText={isCorrect ? "Waaah keren banget! 🎉" : isOver ? "Kebanyakan nih, hapus dulu ya! ↩️" : "Klik uangnya buat ditaruh di nampan! 💰"}
            mascotSize={70}
            className="flex-shrink-0"
          />
          <div style={{ flex: 1, display: "flex", gap: 10, flexWrap: "wrap" as const, justifyContent: "center" }}>
            {MONEY_CHIPS.map((chip) => (
              <button
                key={chip.value}
                onClick={() => handleAddBill(chip)}
                disabled={chipCounts[chip.value] <= 0 || isCorrect}
                className="money-chip"
                style={{
                  background: chipCounts[chip.value] <= 0 ? "#999" : chip.bg,
                  color: chip.text,
                  padding: "8px 14px",
                  opacity: chipCounts[chip.value] <= 0 ? 0.45 : 1,
                  cursor: chipCounts[chip.value] <= 0 ? "not-allowed" : "pointer",
                  position: "relative" as const,
                  minWidth: 90,
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "0.95rem", lineHeight: 1.2 }}>{chip.label}</div>
                <div
                  style={{
                    position: "absolute",
                    top: -8,
                    right: -8,
                    background: "#FF6B9D",
                    border: "2px solid #C2185B",
                    borderRadius: "50%",
                    width: 22,
                    height: 22,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "Fredoka One, cursive",
                    fontSize: "0.7rem",
                    color: "white",
                  }}
                >
                  {chipCounts[chip.value]}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
