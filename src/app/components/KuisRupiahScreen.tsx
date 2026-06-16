import { useState, useEffect, useCallback, useRef } from "react";
import { HeartBar, ScoreCounter, TimerBar } from "./shared/HUDBadge";
import { MascotWithBubble } from "./shared/Mascot";
import { ConfettiPieces } from "./shared/FloatingDecor";
import { playSound } from "../audioManager";

interface KuisRupiahScreenProps {
  avatar: "boy" | "girl";
  onBack: () => void;
  onGameOver: (score: number, stars: number, reason: "win" | "lose") => void;
}

const QUESTIONS = [
  {
    question: "Budi punya uang Rp 10.000. Ia membeli permen seharga Rp 3.500. Berapa kembalian yang diterima Budi?",
    choices: ["Rp 5.500", "Rp 6.500", "Rp 7.500", "Rp 4.500"],
    correct: 1,
    emoji: "🍬",
  },
  {
    question: "Harga satu buku tulis adalah Rp 5.000. Siti membeli 3 buku. Berapa total uang yang harus dibayar Siti?",
    choices: ["Rp 10.000", "Rp 12.000", "Rp 15.000", "Rp 18.000"],
    correct: 2,
    emoji: "📚",
  },
  {
    question: "Andi memiliki 2 lembar Rp 50.000 dan 3 lembar Rp 10.000. Berapa total uang Andi?",
    choices: ["Rp 120.000", "Rp 130.000", "Rp 100.000", "Rp 110.000"],
    correct: 1,
    emoji: "💰",
  },
  {
    question: "Dina membeli es krim Rp 8.500. Ia membayar dengan Rp 10.000. Kembalian yang benar adalah?",
    choices: ["Rp 1.500", "Rp 2.500", "Rp 1.000", "Rp 2.000"],
    correct: 0,
    emoji: "🍦",
  },
  {
    question: "Sebuah mainan dijual seharga Rp 35.000. Roni memiliki uang Rp 20.000 dan Rp 10.000. Berapa kekurangannya?",
    choices: ["Rp 10.000", "Rp 5.000", "Rp 15.000", "Rp 8.000"],
    correct: 1,
    emoji: "🧸",
  },
  {
    question: "Ibu membeli sayur seharga Rp 12.000 dan buah seharga Rp 23.000. Berapa total belanjaannya?",
    choices: ["Rp 34.000", "Rp 35.000", "Rp 36.000", "Rp 33.000"],
    correct: 1,
    emoji: "🛒",
  },
  {
    question: "Harga pensil Rp 2.500 dan penggaris Rp 4.500. Berapa uang kembalian dari Rp 10.000?",
    choices: ["Rp 3.000", "Rp 2.500", "Rp 4.000", "Rp 3.500"],
    correct: 0,
    emoji: "✏️",
  },
];

const TOTAL_SECONDS = 60;

export function KuisRupiahScreen({ avatar, onBack, onGameOver }: KuisRupiahScreenProps) {
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [seconds, setSeconds] = useState(TOTAL_SECONDS);
  const [selected, setSelected] = useState<number | null>(null);
  const [answerState, setAnswerState] = useState<"idle" | "correct" | "wrong">("idle");
  const [showConfetti, setShowConfetti] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const question = QUESTIONS[qIdx % QUESTIONS.length];

  const endGame = useCallback((finalScore: number, finalLives: number, finalSeconds: number) => {
    if (isGameOver) return;
    setIsGameOver(true);
    if (timerRef.current) clearInterval(timerRef.current);
    const stars = finalLives <= 0 ? 1 : finalSeconds > 20 ? 3 : 2;
    const reason: "win" | "lose" = finalLives <= 0 ? "lose" : "win";
    setTimeout(() => onGameOver(finalScore, stars, reason), 800);
  }, [isGameOver, onGameOver]);

  useEffect(() => {
    if (isGameOver) return;
    timerRef.current = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          clearInterval(timerRef.current!);
          endGame(score, lives, 0);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isGameOver]);

  const handleAnswer = (choiceIdx: number) => {
    if (selected !== null || isGameOver) return;
    playSound("click", 0.45);
    setSelected(choiceIdx);

    if (choiceIdx === question.correct) {
      playSound("correct");
      const pts = Math.max(50, Math.round(seconds * 3.5));
      setScore((s) => s + pts);
      setAnswerState("correct");
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 1200);
      setTimeout(() => {
        const nextIdx = qIdx + 1;
        if (nextIdx >= QUESTIONS.length) {
          endGame(score + pts, lives, seconds);
        } else {
          setQIdx(nextIdx);
          setSelected(null);
          setAnswerState("idle");
        }
      }, 1200);
    } else {
      playSound("wrong");
      const newLives = lives - 1;
      setLives(newLives);
      setAnswerState("wrong");
      setTimeout(() => {
        if (newLives <= 0) {
          endGame(score, 0, seconds);
        } else {
          setQIdx((i) => i + 1);
          setSelected(null);
          setAnswerState("idle");
        }
      }, 1200);
    }
  };

  const mascotMsg =
    answerState === "correct" ? "Hebat banget! Jawaban kamu benar! 🎉" :
    answerState === "wrong" ? "Oops! Jangan menyerah ya! Coba lagi! 💪" :
    seconds <= 15 ? "Cepat! Waktu hampir habis! ⏰" :
    "Baca soalnya baik-baik ya! Pasti bisa! 😊";

  return (
    <div
      className="relative w-full h-full flex flex-col overflow-hidden"
      style={{ background: "linear-gradient(180deg, #4A148C 0%, #7B1FA2 35%, #CE93D8 70%, #F3E5F5 100%)" }}
    >
      {showConfetti && <ConfettiPieces />}

      {/* TOP HUD */}
      <div
        className="relative z-20 flex items-center justify-between px-6 py-3"
        style={{
          background: "linear-gradient(180deg, rgba(40,10,80,0.95) 0%, rgba(40,10,80,0.75) 100%)",
          borderBottom: "4px solid #FFD93D",
          flexShrink: 0,
        }}
      >
        <div className="flex items-center gap-3">
          <button className="game-btn-yellow" onClick={onBack} style={{ padding: "6px 16px", fontSize: "0.9rem" }}>
            ← Keluar
          </button>
          <HeartBar lives={lives} />
        </div>

        <div>
          <h2 style={{ fontFamily: "Fredoka One, cursive", fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)", color: "#FFD93D", textShadow: "2px 2px 0 #E65100", margin: 0, textAlign: "center" }}>
            🧮 Kuis Rupiah!
          </h2>
          <div style={{ textAlign: "center", fontFamily: "Nunito, sans-serif", fontSize: "0.8rem", fontWeight: 700, color: "#CE93D8" }}>
            Soal {(qIdx % QUESTIONS.length) + 1} dari {QUESTIONS.length}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <TimerBar seconds={seconds} totalSeconds={TOTAL_SECONDS} />
          <ScoreCounter score={score} />
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ height: 6, background: "rgba(255,255,255,0.2)", flexShrink: 0 }}>
        <div
          style={{
            height: "100%",
            width: `${((qIdx % QUESTIONS.length) / QUESTIONS.length) * 100}%`,
            background: "#FFD93D",
            transition: "width 0.5s ease",
            boxShadow: "0 0 8px #FFD93D",
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-8 py-4 gap-8">

        {/* LEFT: Mascot */}
        <div style={{ flexShrink: 0, alignSelf: "flex-end" }}>
          <MascotWithBubble
            avatar={avatar}
            bubbleText={mascotMsg}
            mascotSize={110}
          />
        </div>

        {/* CENTER: Question + Choices */}
        <div className="flex-1 flex flex-col gap-5" style={{ maxWidth: 700 }}>

          {/* Question card - chalkboard style */}
          <div
            className="animate-slide-up"
            style={{
              background: "linear-gradient(135deg, #1B1B1B 0%, #2D2D2D 100%)",
              border: "5px solid #555",
              borderRadius: 24,
              padding: "clamp(16px, 2.5vw, 28px)",
              boxShadow: "6px 6px 0 rgba(0,0,0,0.5), inset 0 0 40px rgba(255,255,255,0.03)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Chalk texture lines */}
            <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 28px, rgba(255,255,255,0.03) 28px, rgba(255,255,255,0.03) 29px)", borderRadius: "inherit", pointerEvents: "none" }} />

            <div style={{ display: "flex", alignItems: "flex-start", gap: 16, position: "relative" }}>
              <div style={{ fontSize: "clamp(2rem, 4vw, 3rem)", flexShrink: 0 }}>{question.emoji}</div>
              <div>
                <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "0.75rem", fontWeight: 800, color: "#888", letterSpacing: "0.1em", marginBottom: 6 }}>
                  PERTANYAAN {(qIdx % QUESTIONS.length) + 1}
                </div>
                <p
                  style={{
                    fontFamily: "'Nunito', sans-serif",
                    fontSize: "clamp(1rem, 2vw, 1.3rem)",
                    fontWeight: 800,
                    color: "#F5F5F5",
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {question.question}
                </p>
              </div>
            </div>
          </div>

          {/* 2x2 answer grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 14,
            }}
          >
            {question.choices.map((choice, ci) => {
              let btnClass = "quiz-choice-btn";
              if (selected !== null) {
                if (ci === question.correct) btnClass += " correct";
                else if (ci === selected && answerState === "wrong") btnClass += " wrong";
              }

              return (
                <button
                  key={`${qIdx}-${ci}`}
                  className={btnClass}
                  onClick={() => handleAnswer(ci)}
                  disabled={selected !== null}
                  style={{
                    animationDelay: `${ci * 0.08}s`,
                    fontSize: "clamp(1rem, 1.8vw, 1.25rem)",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    textAlign: "left" as const,
                  }}
                >
                  <span
                    style={{
                      background: "rgba(255,255,255,0.3)",
                      border: "2px solid rgba(255,255,255,0.5)",
                      borderRadius: "50%",
                      width: 32,
                      height: 32,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "Fredoka One, cursive",
                      fontSize: "1rem",
                      flexShrink: 0,
                    }}
                  >
                    {["A", "B", "C", "D"][ci]}
                  </span>
                  {choice}
                </button>
              );
            })}
          </div>

          {/* Bonus score indicator */}
          <div style={{ textAlign: "center", fontFamily: "Nunito, sans-serif", fontSize: "0.85rem", fontWeight: 700, color: "rgba(255,255,255,0.6)" }}>
            ⚡ Jawab cepat dapat lebih banyak poin! Maksimal {Math.max(50, Math.round(seconds * 3.5))} poin tersedia
          </div>
        </div>
      </div>
    </div>
  );
}
