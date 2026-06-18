import { useCallback, useMemo, useState } from "react";
import { MascotWithBubble } from "./shared/Mascot";
import { FloatingClouds } from "./shared/FloatingDecor";
import { MoneyVisual } from "./MoneyVisual";
import { MONEY_ASSETS, formatRupiah, getMoneyAsset } from "./moneyAssets";
import { playSound } from "../audioManager";

interface TukarUangScreenProps {
  avatar: "boy" | "girl";
  onBack: () => void;
  onComplete: (score: number) => void;
}

const SELECTABLE_VALUES = [100, 200, 500, 1000, 2000, 5000, 10000, 20000, 50000];

const CHALLENGES = [
  { source: 50000, targetDenom: 10000, needed: 5 },
  { source: 100000, targetDenom: 50000, needed: 2 },
  { source: 10000, targetDenom: 500, needed: 20 },
  { source: 20000, targetDenom: 2000, needed: 10 },
  { source: 5000, targetDenom: 1000, needed: 5 },
  { source: 2000, targetDenom: 200, needed: 10 },
];

interface TrayMoney {
  id: string;
  value: number;
}

export function TukarUangScreen({ avatar, onBack, onComplete }: TukarUangScreenProps) {
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [tray, setTray] = useState<TrayMoney[]>([]);
  const [feedback, setFeedback] = useState<"idle" | "correct" | "wrong" | "over">("idle");
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(true);

  const challenge = CHALLENGES[challengeIdx];
  const sourceMoney = getMoneyAsset(challenge.source);
  const targetMoney = getMoneyAsset(challenge.targetDenom);
  const trayTotal = tray.reduce((sum, money) => sum + money.value, 0);
  const selectedTargetCount = tray.filter((money) => money.value === challenge.targetDenom).length;
  const wrongPickCount = tray.filter((money) => money.value !== challenge.targetDenom).length;
  const isCorrect = selectedTargetCount === challenge.needed && wrongPickCount === 0;

  const counts = useMemo(() => {
    return SELECTABLE_VALUES.reduce<Record<number, number>>((acc, value) => {
      acc[value] = tray.filter((money) => money.value === value).length;
      return acc;
    }, {});
  }, [tray]);

  const goNext = useCallback((pts: number) => {
    setTimeout(() => {
      if (challengeIdx < CHALLENGES.length - 1) {
        setChallengeIdx((idx) => idx + 1);
        setTray([]);
        setFeedback("idle");
        setShowHint(true);
      } else {
        onComplete(score + pts);
      }
    }, 1200);
  }, [challengeIdx, onComplete, score]);

  const handleAddMoney = useCallback((value: number) => {
    if (feedback === "correct") return;
    const nextTotal = trayTotal + value;

    if (nextTotal > challenge.source) {
      playSound("wrong");
      setFeedback("over");
      setTimeout(() => setFeedback("idle"), 900);
      return;
    }

    const nextTray = [...tray, { id: `${value}-${Date.now()}-${tray.length}`, value }];
    const nextTargetCount = nextTray.filter((money) => money.value === challenge.targetDenom).length;
    const nextWrongCount = nextTray.filter((money) => money.value !== challenge.targetDenom).length;

    setTray(nextTray);
    playSound("money", 0.52);

    if (nextWrongCount > 0) {
      playSound("wrong");
      setFeedback("wrong");
      setTimeout(() => setFeedback("idle"), 900);
      return;
    }

    if (nextTargetCount === challenge.needed) {
      const pts = 250 + Math.max(0, 120 - nextTray.length * 5);
      playSound("correct");
      setFeedback("correct");
      setScore((current) => current + pts);
      goNext(pts);
    }
  }, [challenge, feedback, goNext, tray, trayTotal]);

  const handleRemoveLast = () => {
    if (tray.length === 0 || feedback === "correct") return;
    playSound("click", 0.45);
    setTray((current) => current.slice(0, -1));
    setFeedback("idle");
  };

  const resetTray = () => {
    if (feedback === "correct") return;
    playSound("click", 0.45);
    setTray([]);
    setFeedback("idle");
  };

  const mascotText =
    feedback === "correct"
      ? "Benar! Jumlah dan pecahannya sudah pas."
      : feedback === "wrong"
      ? `Pilih pecahan ${targetMoney.label}, bukan pecahan lain.`
      : feedback === "over"
      ? "Totalnya sudah melebihi uang yang mau ditukar."
      : `Tukar ${sourceMoney.label} menjadi ${challenge.needed} ${targetMoney.kind === "coin" ? "koin" : "lembar"} ${targetMoney.label}.`;

  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden" style={{ background: "linear-gradient(180deg, #1565C0 0%, #1976D2 38%, #80D8FF 100%)" }}>
      <FloatingClouds />

      <div className="relative z-20 flex items-center justify-between px-6 py-3" style={{ background: "linear-gradient(180deg, rgba(21,27,100,0.95), rgba(21,27,100,0.72))", borderBottom: "4px solid #FFD93D", flexShrink: 0 }}>
        <button
          className="game-btn-yellow"
          onClick={onBack}
          style={{ padding: "8px 20px", fontSize: "1rem" }}
        >
          ← Kembali
        </button>
        <h2 style={{ fontFamily: "Fredoka One, cursive", fontSize: "clamp(1.35rem, 2.8vw, 2rem)", color: "#FFD93D", textShadow: "2px 2px 0 #E65100", margin: 0 }}>Tukar Uang</h2>
        <div className="hud-badge">
          <span style={{ fontFamily: "Fredoka One, cursive", fontSize: "1.1rem", color: "#FFD93D" }}>{score} Poin</span>
        </div>
      </div>

      <div className="flex-1 z-10 relative px-6 py-4 flex flex-col gap-4 overflow-hidden">
        <div className="game-card flex items-center justify-between gap-5 px-6 py-4" style={{ background: feedback === "correct" ? "linear-gradient(135deg, #C8E6C9, #81C784)" : feedback === "wrong" || feedback === "over" ? "linear-gradient(135deg, #FFCDD2, #FFAB91)" : "linear-gradient(135deg, #FFF59D, #FFD54F)", borderColor: feedback === "correct" ? "#2E7D32" : "#E65100", boxShadow: "6px 6px 0 rgba(0,0,0,0.25)", flexShrink: 0 }}>
          <div>
            <div style={{ fontFamily: "Nunito, sans-serif", fontWeight: 900, color: "rgba(0,0,0,0.6)", fontSize: "0.82rem", letterSpacing: "0.08em" }}>SOAL {challengeIdx + 1} / {CHALLENGES.length}</div>
            <div style={{ fontFamily: "Fredoka One, cursive", color: "#2D1B69", fontSize: "clamp(1.45rem, 3.1vw, 2.2rem)", lineHeight: 1.15 }}>
              Tukar {sourceMoney.label} menjadi {challenge.needed} x {targetMoney.label}
            </div>
            <div style={{ fontFamily: "Nunito, sans-serif", fontWeight: 800, color: "#5D4037", marginTop: 5 }}>
              Total harus sama dengan {formatRupiah(challenge.source)} dan semua pilihan harus pecahan {targetMoney.label}.
            </div>
          </div>
          <MoneyVisual money={sourceMoney} size="medium" animated={sourceMoney.kind === "coin"} />
          <div style={{ textAlign: "right", minWidth: 165 }}>
            <div style={{ fontFamily: "Nunito, sans-serif", fontWeight: 900, color: "#5D4037" }}>Nampan</div>
            <div style={{ fontFamily: "Fredoka One, cursive", color: trayTotal === challenge.source ? "#2E7D32" : "#2D1B69", fontSize: "1.8rem" }}>{formatRupiah(trayTotal)}</div>
            <div style={{ fontFamily: "Nunito, sans-serif", fontWeight: 800, color: wrongPickCount ? "#B71C1C" : "#555" }}>
              {selectedTargetCount}/{challenge.needed} pecahan benar
            </div>
          </div>
        </div>

        {showHint && (
          <div className="animate-slide-in" style={{ background: "#FFFDE7", border: "3px solid #F9A825", borderRadius: 16, padding: "10px 18px", fontFamily: "Nunito, sans-serif", fontWeight: 800, color: "#5D4037", flexShrink: 0 }}>
            Petunjuk: klik {challenge.needed} kali pada {targetMoney.label}. Pecahan lain dianggap salah.
            <button onClick={() => setShowHint(false)} style={{ marginLeft: 12, border: "none", background: "transparent", fontFamily: "Fredoka One, cursive", color: "#6A1B9A", cursor: "pointer" }}>Tutup</button>
          </div>
        )}

        <div style={{ flex: 1, minHeight: 130, background: "rgba(255,255,255,0.9)", border: "4px solid #4A148C", borderRadius: 20, boxShadow: "6px 6px 0 #3D1A78", overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "9px 16px", borderBottom: "2px solid rgba(74,20,140,0.2)", fontFamily: "Fredoka One, cursive", color: "#2D1B69" }}>Nampan Penukaran</div>
          <div style={{ flex: 1, padding: 14, display: "flex", flexWrap: "wrap", gap: 10, alignContent: "flex-start", overflowY: "auto" }}>
            {tray.length === 0 ? (
              <div style={{ margin: "auto", textAlign: "center", color: "#888", fontFamily: "Nunito, sans-serif", fontWeight: 800 }}>Pilih pecahan uang dari bawah.</div>
            ) : (
              tray.map((money, index) => <MoneyVisual key={`${money.id}-${index}`} money={getMoneyAsset(money.value)} size="small" animated={getMoneyAsset(money.value).kind === "coin"} />)
            )}
          </div>
        </div>

        <div style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: 14, background: "rgba(0,0,0,0.28)", border: "3px solid rgba(255,255,255,0.35)", borderRadius: 20, padding: "12px 16px" }}>
          <MascotWithBubble avatar={avatar} bubbleText={mascotText} mascotSize={70} className="flex-shrink-0" />
          <div style={{ flex: 1, display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center", alignItems: "center" }}>
            {SELECTABLE_VALUES.map((value) => {
              const money = getMoneyAsset(value);
              return (
                <button key={value} onClick={() => handleAddMoney(value)} disabled={feedback === "correct"} style={{ border: value === challenge.targetDenom ? "3px solid #FFD93D" : "2px solid rgba(255,255,255,0.5)", borderRadius: 12, background: "rgba(255,255,255,0.9)", padding: 6, cursor: feedback === "correct" ? "not-allowed" : "pointer", position: "relative" }}>
                  <MoneyVisual money={money} size="tiny" animated={money.kind === "coin"} />
                  <span style={{ position: "absolute", top: -8, right: -8, minWidth: 22, height: 22, borderRadius: 12, background: "#FF6B9D", color: "#fff", border: "2px solid #C2185B", fontFamily: "Fredoka One, cursive", fontSize: "0.7rem", display: "grid", placeItems: "center" }}>{counts[value] || 0}</span>
                </button>
              );
            })}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <button onClick={handleRemoveLast} style={{ background: "#fff", border: "3px solid #F44336", borderRadius: 12, padding: "8px 14px", fontFamily: "Fredoka One, cursive", cursor: "pointer" }}>Hapus</button>
            <button onClick={resetTray} style={{ background: "#fff", border: "3px solid #4A148C", borderRadius: 12, padding: "8px 14px", fontFamily: "Fredoka One, cursive", cursor: "pointer" }}>Reset</button>
          </div>
        </div>
      </div>
    </div>
  );
}
