import { useState } from "react";
import { FloatingClouds, FloatingCoins, Stars } from "./shared/FloatingDecor";
import { MascotAvatar } from "./shared/Mascot";
import { playSound } from "../audioManager";

interface WelcomeScreenProps {
  onStart: (name: string, avatar: "boy" | "girl") => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState<"boy" | "girl" | null>(null);
  const [nameError, setNameError] = useState(false);
  const [avatarError, setAvatarError] = useState(false);

  const handleStart = () => {
    playSound("click");
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
      style={{ 
        background: "linear-gradient(180deg, #1E90FF 0%, #4FC3F7 30%, #B3E5FC 60%, #E1F5FE 100%)" 
      }}
    >
      {/* Dekorasi Latar Belakang */}
      <FloatingClouds />
      <Stars count={8} />
      <FloatingCoins count={12} />

      {/* Rumput Bawah */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: "12%",
          background: "linear-gradient(180deg, #81C784 0%, #388E3C 60%, #1B5E20 100%)",
          borderTop: "6px solid #2E7D32",
          zIndex: 1,
        }}
      >
        {/* Bunga-bunga Dekoratif */}
        {["8%", "20%", "35%", "50%", "65%", "78%", "92%"].map((pos, i) => (
          <div key={i} className="absolute" style={{ bottom: "8px", left: pos }}>
            <span style={{ 
              fontSize: i % 2 === 0 ? "1.8rem" : "1.3rem",
              filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
              animation: `float ${2 + (i % 3)}s ease-in-out ${i * 0.3}s infinite`,
              display: "inline-block",
            }}>
              {["🌸", "🌼", "🌺", "🌻", "🌷", "🌸", "🌼"][i]}
            </span>
          </div>
        ))}
        
        {/* Semak-semak Kecil */}
        {["5%", "30%", "55%", "80%"].map((pos, i) => (
          <div key={`bush-${i}`} className="absolute" style={{ bottom: "2px", left: pos }}>
            <span style={{ fontSize: "2rem", opacity: 0.7 }}>🌿</span>
          </div>
        ))}
      </div>

      {/* Konten Utama */}
      <div className="relative z-10 flex flex-col items-center gap-4 w-full max-w-6xl px-4 md:px-8">

        {/* Logo Game */}
        <div
          className="animate-float-slow text-center"
          style={{
            fontFamily: "Fredoka One, cursive",
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            color: "#FFD93D",
            textShadow: "4px 4px 0 #E65100, 8px 8px 0 #FF6B9D, 0 12px 24px rgba(0,0,0,0.3)",
            letterSpacing: "0.04em",
            lineHeight: 1.1,
            filter: "drop-shadow(0 8px 20px rgba(0,0,0,0.2))",
          }}
        >
          💰 RUPIAH PINTAR 💰
        </div>
        
        {/* Subtitle */}
        <div
          style={{
            fontFamily: "Fredoka One, cursive",
            fontSize: "clamp(0.9rem, 2vw, 1.4rem)",
            color: "#ffffff",
            textShadow: "2px 2px 0 #4A148C, 0 4px 8px rgba(0,0,0,0.3)",
            letterSpacing: "0.1em",
            marginTop: "-8px",
            background: "rgba(74,20,140,0.3)",
            padding: "4px 20px",
            borderRadius: 30,
            backdropFilter: "blur(4px)",
            border: "2px solid rgba(255,255,255,0.2)",
          }}
        >
          🎓 Belajar Uang Rupiah Seru & Menyenangkan! 🎓
        </div>

        {/* Card Utama - Avatar Selection + Input */}
        <div 
          className="w-full max-w-4xl mt-2"
          style={{
            background: "rgba(255,255,255,0.92)",
            borderRadius: "32px",
            padding: "24px 28px",
            boxShadow: "0 16px 48px rgba(0,0,0,0.15), 0 4px 0 #4A148C",
            border: "3px solid #4A148C",
            backdropFilter: "blur(8px)",
          }}
        >
          {/* Judul Card */}
          <div className="text-center mb-6">
            <h3 style={{
              fontFamily: "Fredoka One, cursive",
              fontSize: "clamp(1.2rem, 2.2vw, 1.8rem)",
              color: "#4A148C",
              margin: 0,
            }}>
              🎮 Pilih Karakter & Mulai Petualangan!
            </h3>
            <p style={{
              fontFamily: "Nunito, sans-serif",
              fontSize: "0.85rem",
              color: "#888",
              marginTop: 4,
            }}>
              Siapkan dirimu untuk belajar tentang Rupiah dengan cara yang menyenangkan!
            </p>
          </div>

          {/* Row Avatar + Input */}
          <div className="flex flex-col md:flex-row items-center gap-6 justify-center">
            
            {/* Avatar Selection - Boy & Girl */}
            <div className="flex gap-4 flex-shrink-0">
              <AvatarCard
                type="boy"
                selected={avatar === "boy"}
                onSelect={() => { playSound("click"); setAvatar("boy"); setAvatarError(false); }}
                error={avatarError && avatar !== "boy"}
              />
              <AvatarCard
                type="girl"
                selected={avatar === "girl"}
                onSelect={() => { playSound("click"); setAvatar("girl"); setAvatarError(false); }}
                error={avatarError && avatar !== "girl"}
              />
            </div>

            {/* Divider */}
            <div style={{ 
              width: "2px", 
              height: "120px", 
              background: "linear-gradient(180deg, transparent, #4A148C33, transparent)",
              flexShrink: 0,
            }} className="hidden md:block" />

            {/* Input Nama & Tombol Start */}
            <div className="flex-1 min-w-[200px] w-full md:w-auto">
              <div style={{ marginBottom: 12 }}>
                <label
                  style={{
                    fontFamily: "Fredoka One, cursive",
                    fontSize: "0.95rem",
                    color: "#4A148C",
                    display: "block",
                    marginBottom: 6,
                  }}
                >
                  ✏️ Nama Pemain
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => { setName(e.target.value); setNameError(false); }}
                  placeholder="Ketik namamu di sini..."
                  maxLength={20}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: 14,
                    border: `3px solid ${nameError ? "#FF5252" : "#9C27B0"}`,
                    background: nameError ? "#FFF0F0" : "#f8f4ff",
                    fontFamily: "Nunito, sans-serif",
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: "#2D1B69",
                    outline: "none",
                    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                    boxShadow: nameError 
                      ? "0 0 0 4px rgba(255,82,82,0.2)" 
                      : "inset 2px 2px 6px rgba(0,0,0,0.06)",
                  }}
                  onFocus={(e) => {
                    if (!nameError) {
                      e.target.style.borderColor = "#6A1B9A";
                      e.target.style.boxShadow = "0 0 0 4px rgba(106,27,154,0.15)";
                    }
                  }}
                  onBlur={(e) => {
                    if (!nameError) {
                      e.target.style.borderColor = "#9C27B0";
                      e.target.style.boxShadow = "inset 2px 2px 6px rgba(0,0,0,0.06)";
                    }
                  }}
                />
                {nameError && (
                  <p style={{ 
                    fontFamily: "Nunito, sans-serif", 
                    fontSize: "0.8rem", 
                    color: "#FF5252", 
                    fontWeight: 700, 
                    marginTop: 4,
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}>
                    ⚠️ Masukkan namamu dulu yuk!
                  </p>
                )}
              </div>

              {avatarError && (
                <p style={{
                  fontFamily: "Nunito, sans-serif",
                  fontSize: "0.8rem",
                  color: "#FF5252",
                  fontWeight: 700,
                  marginTop: -6,
                  marginBottom: 8,
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}>
                  ⚠️ Pilih salah satu karakter di samping!
                </p>
              )}

              {/* Tombol Start */}
              <button
                className="game-btn-yellow animate-pulse-glow"
                onClick={handleStart}
                style={{
                  width: "100%",
                  padding: "14px 0",
                  fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)",
                  letterSpacing: "0.05em",
                  borderRadius: 14,
                  boxShadow: "0 6px 0 #E65100, 0 8px 20px rgba(255,193,7,0.4)",
                }}
              >
                🚀 MULAI BERMAIN!
              </button>
            </div>
          </div>
        </div>

        {/* Footer Credit */}
        <p style={{ 
          fontFamily: "Nunito, sans-serif", 
          fontSize: "0.75rem", 
          color: "rgba(255,255,255,0.8)", 
          fontWeight: 600,
          textShadow: "0 2px 4px rgba(0,0,0,0.3)",
          marginTop: 4,
        }}>
          🎯 Multimedia Final Project © 2026
        </p>
      </div>

    </div>
  );
}

// ============ KOMPONEN AVATAR CARD ============
interface AvatarCardProps {
  type: "boy" | "girl";
  selected: boolean;
  onSelect: () => void;
  error: boolean;
}

function AvatarCard({ type, selected, onSelect, error }: AvatarCardProps) {
  const isBoy = type === "boy";
  const isSelected = selected && !error;

  return (
    <div
      onClick={onSelect}
      className="cursor-pointer transition-all duration-300"
      style={{
        background: isSelected
          ? isBoy 
            ? "linear-gradient(145deg, #BBDEFB 0%, #64B5F6 100%)" 
            : "linear-gradient(145deg, #F8BBD9 0%, #F06292 100%)"
          : "linear-gradient(145deg, #f5f5f5 0%, #e8e8e8 100%)",
        border: `4px solid ${
          error ? "#FF5252" : 
          isSelected ? (isBoy ? "#1565C0" : "#C2185B") : 
          "#BDBDBD"
        }`,
        borderRadius: 20,
        boxShadow: isSelected
          ? `0 0 0 4px ${isBoy ? "#90CAF9" : "#F48FB1"}, 0 8px 24px rgba(0,0,0,0.2)`
          : "0 4px 12px rgba(0,0,0,0.08)",
        padding: "16px 20px 12px",
        display: "flex",
        flexDirection: "column" as const,
        alignItems: "center",
        gap: 6,
        transform: isSelected ? "translateY(-4px) scale(1.02)" : "translateY(0) scale(1)",
        transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        minWidth: 120,
        position: "relative",
      }}
    >
      {/* Badge "Terpilih" */}
      {isSelected && (
        <div
          style={{
            position: "absolute",
            top: -10,
            right: -10,
            background: isBoy ? "#1565C0" : "#C2185B",
            color: "#fff",
            fontFamily: "Fredoka One, cursive",
            fontSize: "0.6rem",
            padding: "2px 10px",
            borderRadius: 20,
            border: "2px solid #fff",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
          }}
        >
          ✓ Terpilih
        </div>
      )}
      
      {/* Avatar */}
      <MascotAvatar avatar={type} size={80} animate={isSelected} />
      
      {/* Label */}
      <div
        style={{
          fontFamily: "Fredoka One, cursive",
          fontSize: "0.85rem",
          color: isSelected ? (isBoy ? "#0D47A1" : "#880E4F") : "#757575",
          marginTop: 4,
        }}
      >
        {isBoy ? "👦 Laki-laki" : "👧 Perempuan"}
      </div>
      
      {/* Indikator Status */}
      <div style={{
        width: 10,
        height: 10,
        borderRadius: "50%",
        background: isSelected ? "#4CAF50" : error ? "#FF5252" : "#BDBDBD",
        transition: "background 0.3s ease",
      }} />
    </div>
  );
}

// ============ KOMPONEN DEKORASI UANG ============
function SmallBillDecor({ value, index }: { value: string; index: number }) {
  const colors = [
    { bg: "#2E7D32", text: "#E8F5E9", border: "#1B5E20" },
    { bg: "#546E7A", text: "#ECEFF1", border: "#37474F" },
    { bg: "#6A1B9A", text: "#F3E5F5", border: "#4A148C" },
    { bg: "#1565C0", text: "#E3F2FD", border: "#0D47A1" },
    { bg: "#E65100", text: "#FFF3E0", border: "#BF360C" },
    { bg: "#B71C1C", text: "#FFEBEE", border: "#880E4F" },
  ];
  const c = colors[index % colors.length];

  return (
    <div
      style={{
        background: `linear-gradient(135deg, ${c.bg}, ${c.bg}dd)`,
        border: `2px solid ${c.border}`,
        borderRadius: 8,
        padding: "3px 10px",
        fontFamily: "Fredoka One, cursive",
        fontSize: "clamp(0.5rem, 0.8vw, 0.7rem)",
        color: c.text,
        opacity: 0.6,
        transform: `rotate(${(index % 5) - 2}deg) translateY(${Math.sin(index) * 4}px)`,
        boxShadow: "2px 3px 8px rgba(0,0,0,0.2)",
        letterSpacing: "0.03em",
        animation: `float ${3 + (index % 2)}s ease-in-out ${index * 0.2}s infinite`,
        display: "inline-block",
      }}
    >
      {value}
    </div>
  );
}