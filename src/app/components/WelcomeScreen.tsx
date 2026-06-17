import { useState } from "react";
import { FloatingClouds, FloatingCoins, Stars } from "./shared/FloatingDecor";
import { MascotAvatar } from "./shared/Mascot";

interface WelcomeScreenProps {
  onStart: (name: string, avatar: "boy" | "girl") => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState<"boy" | "girl" | null>(null);
  const [nameError, setNameError] = useState(false);
  const [avatarError, setAvatarError] = useState(false);

  const handleStart = () => {
    const trimmed = name.trim();
    let hasError = false;
    if (!trimmed) { setNameError(true); hasError = true; } else setNameError(false);
    if (!avatar) { setAvatarError(true); hasError = true; } else setAvatarError(false);
    if (hasError) return;
    onStart(trimmed, avatar!);
  };

  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(180deg, #1E90FF 0%, #87CEEB 35%, #B5DFFF 65%, #E8F7FF 100%)" }}
    >
      <FloatingClouds />
      <Stars count={8} />

      {/* Grass floor */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: "14%",
          background: "linear-gradient(180deg, #66BB6A 0%, #388E3C 100%)",
          borderTop: "5px solid #2E7D32",
          zIndex: 1,
        }}
      >
        {/* Decorative flowers */}
        {["10%", "22%", "38%", "55%", "68%", "80%", "92%"].map((l, i) => (
          <div key={i} className="absolute bottom-3" style={{ left: l }}>
            <span style={{ fontSize: i % 2 === 0 ? "1.5rem" : "1.2rem" }}>
              {["🌸", "🌼", "🌺", "🌻", "🌷", "🌸", "🌼"][i]}
            </span>
          </div>
        ))}
      </div>

      {/* Floating coins in background */}
      <FloatingCoins count={12} />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-5xl px-8">

        {/* GAME LOGO */}
        <div
          className="animate-float-slow"
          style={{
            fontFamily: "Fredoka One, cursive",
            fontSize: "clamp(3rem, 7vw, 5.5rem)",
            color: "#FFD93D",
            textShadow: "4px 4px 0 #E65100, 8px 8px 0 #FF6B9D, -2px -2px 0 #FF6B9D",
            letterSpacing: "0.04em",
            lineHeight: 1,
            textAlign: "center",
            filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.3))",
          }}
        >
          💰 RUPIAH PINTAR 💰
        </div>
        <div
          style={{
            fontFamily: "Fredoka One, cursive",
            fontSize: "clamp(1rem, 2.2vw, 1.5rem)",
            color: "#ffffff",
            textShadow: "2px 2px 0 #4A148C",
            letterSpacing: "0.12em",
            marginTop: "-12px",
          }}
        >
          🎓 Belajar Uang Rupiah Seru & Menyenangkan! 🎓
        </div>

        {/* Content Row */}
        <div className="flex items-end gap-8 w-full justify-center mt-2">

          {/* LEFT: Boy avatar option */}
          <AvatarCard
            type="boy"
            selected={avatar === "boy"}
            onSelect={() => { setAvatar("boy"); setAvatarError(false); }}
            error={avatarError && avatar !== "boy"}
          />

          {/* CENTER: Input + Start button */}
          <div className="flex flex-col items-center gap-5" style={{ minWidth: 340 }}>
            {/* Name input card */}
            <div
              className="game-card w-full px-6 py-5"
              style={{
                boxShadow: nameError ? "6px 6px 0px #B71C1C" : "6px 6px 0px #3D1A78",
                borderColor: nameError ? "#FF5252" : "#4A148C",
              }}
            >
              <label
                style={{
                  fontFamily: "Fredoka One, cursive",
                  fontSize: "1.1rem",
                  color: "#4A148C",
                  display: "block",
                  marginBottom: 8,
                  textAlign: "center",
                }}
              >
                ✏️ Masukkan Nama Kamu!
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => { setName(e.target.value); setNameError(false); }}
                placeholder="Nama kamu di sini..."
                maxLength={20}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: 16,
                  border: `3px solid ${nameError ? "#FF5252" : "#9C27B0"}`,
                  background: nameError ? "#FFF0F0" : "#ffffff",
                  fontFamily: "Nunito, sans-serif",
                  fontSize: "1.15rem",
                  fontWeight: 700,
                  color: "#2D1B69",
                  outline: "none",
                  textAlign: "center",
                  boxShadow: "inset 2px 2px 4px rgba(0,0,0,0.08)",
                }}
              />
              {nameError && (
                <p style={{ fontFamily: "Nunito, sans-serif", fontSize: "0.85rem", color: "#FF5252", fontWeight: 700, textAlign: "center", marginTop: 6 }}>
                  ⚠️ Masukkan namamu dulu yuk!
                </p>
              )}
            </div>

            {avatarError && (
              <p
                style={{
                  fontFamily: "Nunito, sans-serif",
                  fontSize: "0.9rem",
                  color: "#FF5252",
                  fontWeight: 700,
                  background: "#FFF0F0",
                  border: "2px solid #FF5252",
                  borderRadius: 12,
                  padding: "6px 16px",
                }}
              >
                ⚠️ Pilih karaktermu dulu!
              </p>
            )}

            {/* START BUTTON */}
            <button
              className="game-btn-yellow animate-pulse-glow"
              onClick={handleStart}
              style={{
                width: "100%",
                padding: "18px 0",
                fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)",
                letterSpacing: "0.05em",
              }}
            >
              🚀 MULAI BERMAIN!
            </button>

            {/* Small credits */}
            <p style={{ fontFamily: "Nunito, sans-serif", fontSize: "0.8rem", color: "#fff", opacity: 0.75, fontWeight: 600 }}>
              Multimedia Final Project © 2026
            </p>
          </div>

          {/* RIGHT: Girl avatar option */}
          <AvatarCard
            type="girl"
            selected={avatar === "girl"}
            onSelect={() => { setAvatar("girl"); setAvatarError(false); }}
            error={avatarError && avatar !== "girl"}
          />
        </div>
      </div>

      {/* Bottom decorative coins row */}
      <div className="absolute bottom-14 left-0 right-0 flex justify-around items-end z-0 pointer-events-none">
        {["Rp 1.000", "Rp 5.000", "Rp 10.000", "Rp 50.000", "Rp 100.000"].map((v, i) => (
          <SmallBillDecor key={i} value={v} index={i} />
        ))}
      </div>
    </div>
  );
}

interface AvatarCardProps {
  type: "boy" | "girl";
  selected: boolean;
  onSelect: () => void;
  error: boolean;
}

function AvatarCard({ type, selected, onSelect, error }: AvatarCardProps) {
  const isBoy = type === "boy";

  return (
    <div
      onClick={onSelect}
      className="cursor-pointer"
      style={{
        background: selected
          ? isBoy ? "linear-gradient(180deg, #BBDEFB 0%, #90CAF9 100%)"
            : "linear-gradient(180deg, #F8BBD9 0%, #F48FB1 100%)"
          : "rgba(255,255,255,0.88)",
        border: `5px solid ${error ? "#FF5252" : selected ? (isBoy ? "#1565C0" : "#C2185B") : "#4A148C"}`,
        borderRadius: 28,
        boxShadow: selected
          ? `0 0 0 5px ${isBoy ? "#64B5F6" : "#F48FB1"}, 8px 8px 0px ${isBoy ? "#0D47A1" : "#880E4F"}`
          : "6px 6px 0px #3D1A78",
        padding: "20px 24px 12px",
        display: "flex",
        flexDirection: "column" as const,
        alignItems: "center",
        gap: 8,
        transform: selected ? "translateY(-8px) scale(1.04)" : "translateY(0) scale(1)",
        transition: "all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        minWidth: 160,
      }}
    >
      <MascotAvatar avatar={type} size={110} animate={selected} />
      <div
        style={{
          fontFamily: "Fredoka One, cursive",
          fontSize: "1.25rem",
          color: selected ? (isBoy ? "#1565C0" : "#C2185B") : "#4A148C",
        }}
      >
        {isBoy ? "👦 Anak Laki-Laki" : "👧 Anak Perempuan"}
      </div>
      {selected && (
        <div
          style={{
            fontFamily: "Fredoka One, cursive",
            fontSize: "0.9rem",
            background: isBoy ? "#1565C0" : "#C2185B",
            color: "#fff",
            borderRadius: 20,
            padding: "3px 14px",
          }}
        >
          ✓ Dipilih!
        </div>
      )}
    </div>
  );
}

function SmallBillDecor({ value, index }: { value: string; index: number }) {
  const colors = [
    { bg: "#C62828", text: "#FFCDD2" },
    { bg: "#795548", text: "#D7CCC8" },
    { bg: "#6A1B9A", text: "#E1BEE7" },
    { bg: "#1565C0", text: "#BBDEFB" },
    { bg: "#B71C1C", text: "#FFCDD2" },
  ];
  const c = colors[index % colors.length];

  return (
    <div
      style={{
        background: c.bg,
        border: "3px solid rgba(0,0,0,0.3)",
        borderRadius: 10,
        padding: "4px 12px",
        fontFamily: "Fredoka One, cursive",
        fontSize: "0.8rem",
        color: c.text,
        opacity: 0.7,
        transform: `rotate(${(index % 3) - 1}deg)`,
        boxShadow: "2px 2px 6px rgba(0,0,0,0.3)",
      }}
    >
      {value}
    </div>
  );
}
