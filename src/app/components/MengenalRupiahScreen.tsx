import { useState } from "react";
import { MascotWithBubble } from "./shared/Mascot";
import { FloatingClouds } from "./shared/FloatingDecor";

interface MengenalRupiahScreenProps {
  avatar: "boy" | "girl";
  onBack: () => void;
  onComplete: (score: number) => void;
}

// Accurate TE 2022 data sourced from Bank Indonesia (bi.go.id)
const BANKNOTES = [
  {
    value: "Rp 1.000",
    numValue: 1000,
    bgColor: "#2E7D32",
    textColor: "#E8F5E9",
    accentColor: "#81C784",
    hero: "Tjut Meutia",
    heroDesc: "Pahlawan Nasional dari Aceh",
    dance: "Tari Tifa",
    danceOrigin: "Maluku & Papua",
    landmark: "Banda Neira",
    landmarkRegion: "Maluku",
    flower: "Anggrek Larat",
    flowerLatin: "Dendrobium phalaenopsis",
    size: "121 × 65 mm",
    fact: "Tjut Meutia adalah pahlawan perempuan dari Aceh yang berjuang melawan kolonial Belanda! Di sisi belakang ada Tari Tifa dari Maluku dan keindahan Banda Neira! 🌺",
    emoji: "🌿",
    year: "2022",
    imageUrl: "https://www.bi.go.id/Gambar%20Uang/TE2022/TE-2022-1000-depan.JPG",
    imageBackUrl: "https://www.bi.go.id/Gambar%20Uang/TE2022/TE-2022-1000-belakang.JPG",
  },
  {
    value: "Rp 2.000",
    numValue: 2000,
    bgColor: "#546E7A",
    textColor: "#CFD8DC",
    accentColor: "#B0BEC5",
    hero: "Mohammad Hoesni Thamrin",
    heroDesc: "Pahlawan Nasional dari Jakarta",
    dance: "Tari Piring",
    danceOrigin: "Sumatera Barat",
    landmark: "Ngarai Sianok",
    landmarkRegion: "Sumatera Barat",
    flower: "Bunga Jeumpa",
    flowerLatin: "Michelia champaca",
    size: "126 × 65 mm",
    fact: "M. H. Thamrin berjuang keras untuk hak rakyat Indonesia di parlemen Belanda! Sisi belakang menampilkan Tari Piring yang memukau dari Minangkabau! 🕺",
    emoji: "🏞️",
    year: "2022",
    imageUrl: "https://www.bi.go.id/Gambar%20Uang/TE2022/TE-2022-2000-depan.JPG",
    imageBackUrl: "https://www.bi.go.id/Gambar%20Uang/TE2022/TE-2022-2000-belakang.JPG",
  },
  {
    value: "Rp 5.000",
    numValue: 5000,
    bgColor: "#5D4037",
    textColor: "#D7CCC8",
    accentColor: "#BCAAA4",
    hero: "Dr. K.H. Idham Chalid",
    heroDesc: "Ulama & Pahlawan Nasional",
    dance: "Tari Gambyong",
    danceOrigin: "Jawa Tengah",
    landmark: "Gunung Bromo",
    landmarkRegion: "Jawa Timur",
    flower: "Bunga Sedap Malam",
    flowerLatin: "Polianthes tuberosa",
    size: "131 × 65 mm",
    fact: "Dr. K.H. Idham Chalid adalah ulama besar sekaligus politisi terkemuka Indonesia! Sisi belakang ada Tari Gambyong yang anggun dan megahnya Gunung Bromo! 🌋",
    emoji: "🌋",
    year: "2022",
    imageUrl: "https://www.bi.go.id/Gambar%20Uang/TE2022/TE-2022-5000-depan.JPG",
    imageBackUrl: "https://www.bi.go.id/Gambar%20Uang/TE2022/TE-2022-5000-belakang.JPG",
  },
  {
    value: "Rp 10.000",
    numValue: 10000,
    bgColor: "#6A1B9A",
    textColor: "#E1BEE7",
    accentColor: "#CE93D8",
    hero: "Frans Kaisiepo",
    heroDesc: "Pahlawan Nasional dari Papua",
    dance: "Tari Pakarena",
    danceOrigin: "Sulawesi Selatan",
    landmark: "Taman Nasional Wakatobi",
    landmarkRegion: "Sulawesi Tenggara",
    flower: "Bunga Cempaka Hutan Kasar",
    flowerLatin: "Elmerrillia ovalis",
    size: "136 × 65 mm",
    fact: "Frans Kaisiepo berjuang menyatukan Papua ke pangkuan NKRI! Uang ini menampilkan motif Asmat Papua di depan dan Tari Pakarena dari Sulawesi Selatan di belakang! 🦜",
    emoji: "💜",
    year: "2022",
    imageUrl: "https://www.bi.go.id/Gambar%20Uang/TE2022/TE-2022-10000-depan.JPG",
    imageBackUrl: "https://www.bi.go.id/Gambar%20Uang/TE2022/TE-2022-10000-belakang.JPG",
  },
  {
    value: "Rp 20.000",
    numValue: 20000,
    bgColor: "#2E7D32",
    textColor: "#C8E6C9",
    accentColor: "#A5D6A7",
    hero: "Dr. G.S.S.J. Ratulangi",
    heroDesc: "Pahlawan Nasional dari Sulawesi Utara",
    dance: "Tari Gong",
    danceOrigin: "Kalimantan Timur",
    landmark: "Kepulauan Derawan",
    landmarkRegion: "Kalimantan Timur",
    flower: "Anggrek Hitam",
    flowerLatin: "Coelogyne pandurata",
    size: "141 × 65 mm",
    fact: "Dr. G.S.S.J. Ratulangi adalah \"Bintang Timur\" — tokoh pejuang dan intelektual dari Sulawesi Utara! Anggrek Hitam adalah langka dan hanya ada di Kalimantan! 🌿",
    emoji: "🌿",
    year: "2022",
    imageUrl: "https://www.bi.go.id/Gambar%20Uang/TE2022/TE-2022-20000-depan.JPG",
    imageBackUrl: "https://www.bi.go.id/Gambar%20Uang/TE2022/TE-2022-20000-belakang.JPG",
  },
  {
    value: "Rp 50.000",
    numValue: 50000,
    bgColor: "#1565C0",
    textColor: "#BBDEFB",
    accentColor: "#90CAF9",
    hero: "Ir. H. Djuanda Kartawidjaja",
    heroDesc: "Perdana Menteri ke-10 Indonesia",
    dance: "Tari Legong",
    danceOrigin: "Bali",
    landmark: "Taman Nasional Komodo",
    landmarkRegion: "Nusa Tenggara Timur",
    flower: "Bunga Jepun Bali",
    flowerLatin: "Plumeria sp.",
    size: "146 × 65 mm",
    fact: "Djuanda Kartawidjaja mencetuskan Deklarasi Djuanda 1957 yang menegaskan wilayah perairan Indonesia! Komodo Dragon hanya ada di pulau Komodo dan sekitarnya! 🦎",
    emoji: "🦎",
    year: "2022",
    imageUrl: "https://www.bi.go.id/Gambar%20Uang/TE2022/TE-2022-50000-depan.JPG",
    imageBackUrl: "https://www.bi.go.id/Gambar%20Uang/TE2022/TE-2022-50000-belakang.JPG",
  },
  {
    value: "Rp 100.000",
    numValue: 100000,
    bgColor: "#B71C1C",
    textColor: "#FFCDD2",
    accentColor: "#FF8A80",
    hero: "Soekarno & Hatta",
    heroDesc: "Proklamator Kemerdekaan Indonesia",
    dance: "Tari Topeng Betawi",
    danceOrigin: "Jakarta",
    landmark: "Raja Ampat",
    landmarkRegion: "Papua Barat",
    flower: "Anggrek Bulan",
    flowerLatin: "Phalaenopsis amabilis",
    size: "151 × 65 mm",
    fact: "Soekarno & Hatta memproklamasikan kemerdekaan Indonesia pada 17 Agustus 1945! Anggrek Bulan adalah \"Puspa Pesona\" — lambang keanggunan bunga Indonesia! 🌸",
    emoji: "🇮🇩",
    year: "2022",
    imageUrl: "https://www.bi.go.id/Gambar%20Uang/TE2022/TE-2022-100000-depan.JPG",
    imageBackUrl: "https://www.bi.go.id/Gambar%20Uang/TE2022/TE-2022-100000-belakang.JPG",
  },
];

export function MengenalRupiahScreen({ avatar, onBack, onComplete }: MengenalRupiahScreenProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [flipped, setFlipped] = useState<Set<number>>(new Set());
  const [viewed, setViewed] = useState<Set<number>>(new Set());
  const [showingBack, setShowingBack] = useState<Set<number>>(new Set());

  const handleBillClick = (i: number) => {
    if (flipped.has(i)) return;
    setFlipped(new Set([...flipped, i]));
    setViewed(new Set([...viewed, i]));
    setSelected(i);

    const isBack = showingBack.has(i);
    if (isBack) {
      const next = new Set(showingBack);
      next.delete(i);
      setShowingBack(next);
    } else {
      setShowingBack(new Set([...showingBack, i]));
    }

    setTimeout(() => {
      const next = new Set(flipped);
      next.delete(i);
      setFlipped(next);
    }, 700);
  };

  const mascotText =
    selected !== null
      ? BANKNOTES[selected].fact
      : "Klik uangnya untuk melihat fakta seru! Yuk kenali semua pecahan Rupiah! 🎉";

  const progressPct = Math.round((viewed.size / BANKNOTES.length) * 100);

  return (
    <div
      className="relative w-full h-full flex flex-col overflow-hidden"
      style={{ background: "linear-gradient(180deg, #1E90FF 0%, #87CEEB 40%, #C1E8FF 100%)" }}
    >
      <FloatingClouds />

      {/* Header */}
      <div
        className="relative z-20 flex items-center justify-between px-6 py-3"
        style={{
          background: "linear-gradient(180deg, rgba(26,35,126,0.92) 0%, rgba(26,35,126,0.75) 100%)",
          borderBottom: "4px solid #FFD93D",
          flexShrink: 0,
        }}
      >
        <button
          className="game-btn-yellow"
          onClick={onBack}
          style={{ padding: "8px 20px", fontSize: "1rem" }}
        >
          ← Kembali
        </button>

        <h2
          style={{
            fontFamily: "Fredoka One, cursive",
            fontSize: "clamp(1.4rem, 2.8vw, 2rem)",
            color: "#FFD93D",
            textShadow: "2px 2px 0 #E65100",
            margin: 0,
          }}
        >
          💵 Mengenal Rupiah Indonesia 💵
        </h2>

        {/* Progress */}
        <div className="hud-badge flex items-center gap-3" style={{ minWidth: 200 }}>
          <span style={{ fontSize: "1.2rem" }}>📊</span>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontFamily: "Fredoka One, cursive",
                fontSize: "0.75rem",
                color: "#888",
                marginBottom: 3,
              }}
            >
              Progress: {viewed.size}/{BANKNOTES.length}
            </div>
            <div
              style={{
                height: 10,
                background: "#e0e0e0",
                borderRadius: 6,
                border: "2px solid #4A148C",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${progressPct}%`,
                  background: "#4CAF50",
                  borderRadius: 4,
                  transition: "width 0.4s ease",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex gap-6 px-6 py-4 overflow-hidden">

        {/* LEFT: Mascot */}
        <div className="flex flex-col items-center justify-end" style={{ width: 200, flexShrink: 0 }}>
          <MascotWithBubble
            avatar={avatar}
            bubbleText={mascotText}
            mascotSize={130}
            className="animate-slide-in"
          />
        </div>

        {/* CENTER: Banknote gallery */}
        <div className="flex-1 flex flex-col gap-4 overflow-hidden">
          <div
            style={{
              display: "flex",
              gap: 16,
              overflowX: "auto",
              paddingBottom: 12,
              paddingTop: 8,
              flex: 1,
              alignItems: "flex-end",
            }}
          >
            {BANKNOTES.map((bill, i) => (
              <BanknoteCard
                key={i}
                bill={bill}
                index={i}
                isSelected={selected === i}
                isFlipping={flipped.has(i)}
                isViewed={viewed.has(i)}
                showBack={showingBack.has(i)}
                onClick={() => handleBillClick(i)}
              />
            ))}
          </div>

          {/* Complete button */}
          {viewed.size >= 5 && (
            <div className="flex justify-center mt-2">
              <button
                className="game-btn-green animate-pop-in"
                style={{ padding: "14px 48px", fontSize: "1.3rem" }}
                onClick={() => onComplete(viewed.size * 100)}
              >
                🎉 Lanjut ke Menu! (+{viewed.size * 100} Poin)
              </button>
            </div>
          )}
        </div>

        {/* RIGHT: Selected bill detail */}
        {selected !== null && (
          <div className="flex flex-col gap-3" style={{ width: 240, flexShrink: 0 }}>
            <BillDetailPanel bill={BANKNOTES[selected]} showBack={showingBack.has(selected)} />
          </div>
        )}
      </div>
    </div>
  );
}

interface BanknoteCardProps {
  bill: typeof BANKNOTES[0];
  index: number;
  isSelected: boolean;
  isFlipping: boolean;
  isViewed: boolean;
  showBack: boolean;
  onClick: () => void;
}

function BanknoteCard({
  bill,
  index,
  isSelected,
  isFlipping,
  isViewed,
  showBack,
  onClick,
}: BanknoteCardProps) {
  const cardHeight = 155;
  const cardWidth = 270;
  const [imgError, setImgError] = useState(false);

  const currentImg = showBack ? bill.imageBackUrl : bill.imageUrl;

  return (
    <div
      onClick={onClick}
      className="banknote-card"
      style={{
        width: cardWidth,
        height: cardHeight,
        flexShrink: 0,
        background: showBack
          ? `linear-gradient(135deg, ${bill.bgColor}99, ${bill.bgColor})`
          : `linear-gradient(135deg, ${bill.bgColor}, ${bill.accentColor}55)`,
        border: `4px solid rgba(0,0,0,0.35)`,
        position: "relative",
        cursor: "pointer",
        transform: isFlipping
          ? "perspective(600px) rotateY(90deg)"
          : isSelected
          ? "scale(1.06) translateY(-10px)"
          : "scale(1)",
        transition: isFlipping
          ? "transform 0.3s ease"
          : "transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        boxShadow: isSelected
          ? `0 0 0 4px ${bill.accentColor}, 6px 10px 20px rgba(0,0,0,0.4)`
          : "4px 6px 14px rgba(0,0,0,0.3)",
        animationDelay: `${index * 0.08}s`,
        overflow: "hidden",
      }}
    >
      {/* Viewed badge */}
      {isViewed && (
        <div
          style={{
            position: "absolute",
            top: -8,
            right: -8,
            background: "#4CAF50",
            border: "2px solid #1B5E20",
            borderRadius: "50%",
            width: 26,
            height: 26,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.9rem",
            zIndex: 10,
            boxShadow: "2px 2px 4px rgba(0,0,0,0.3)",
          }}
        >
          ✓
        </div>
      )}

      {/* Sisi label badge */}
      <div
        style={{
          position: "absolute",
          top: 6,
          left: 8,
          background: "rgba(0,0,0,0.55)",
          color: "#fff",
          borderRadius: 5,
          padding: "2px 7px",
          fontSize: "0.58rem",
          fontFamily: "Fredoka One, cursive",
          letterSpacing: "0.08em",
          zIndex: 5,
        }}
      >
        {showBack ? "SISI BELAKANG" : "SISI DEPAN"}
      </div>

      {/* Gambar asli dari Bank Indonesia */}
      {!imgError ? (
        <img
          key={currentImg}
          src={currentImg}
          alt={`${bill.value} ${showBack ? "belakang" : "depan"}`}
          onError={() => setImgError(true)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            display: "block",
          }}
        />
      ) : (
        /* Fallback jika gambar BI tidak bisa dimuat (CORS/hotlink block) */
        <div
          style={{
            padding: "12px 14px",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div
                style={{
                  fontFamily: "Fredoka One, cursive",
                  fontSize: "0.62rem",
                  color: bill.textColor,
                  opacity: 0.75,
                  letterSpacing: "0.12em",
                }}
              >
                BANK INDONESIA
              </div>
              <div
                style={{
                  fontFamily: "Fredoka One, cursive",
                  fontSize: "clamp(1.1rem, 2vw, 1.45rem)",
                  color: "#FFFFFF",
                  textShadow: "1px 1px 0 rgba(0,0,0,0.5)",
                  lineHeight: 1.1,
                }}
              >
                {bill.value}
              </div>
            </div>
            <div style={{ fontSize: "1.6rem", filter: "drop-shadow(1px 1px 2px rgba(0,0,0,0.4))" }}>
              {bill.emoji}
            </div>
          </div>
          <div style={{ background: "rgba(0,0,0,0.28)", borderRadius: 8, padding: "5px 10px" }}>
            <div
              style={{
                fontFamily: "Nunito, sans-serif",
                fontWeight: 800,
                fontSize: "0.8rem",
                color: bill.textColor,
                lineHeight: 1.25,
                textAlign: "center",
              }}
            >
              {showBack ? bill.dance : bill.hero}
            </div>
            <div
              style={{
                fontFamily: "Nunito, sans-serif",
                fontWeight: 600,
                fontSize: "0.65rem",
                color: bill.textColor,
                opacity: 0.75,
                textAlign: "center",
                marginTop: 1,
              }}
            >
              {showBack ? bill.danceOrigin : bill.heroDesc}
            </div>
          </div>
          <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
            <div style={{ flex: 1, height: 4, background: bill.accentColor, borderRadius: 3, opacity: 0.7 }} />
            <div
              style={{
                fontFamily: "Fredoka One, cursive",
                fontSize: "0.62rem",
                color: bill.textColor,
                opacity: 0.65,
              }}
            >
              TE {bill.year} · {bill.size}
            </div>
            <div style={{ flex: 1, height: 4, background: bill.accentColor, borderRadius: 3, opacity: 0.7 }} />
          </div>
        </div>
      )}
    </div>
  );
}

function BillDetailPanel({ bill, showBack }: { bill: typeof BANKNOTES[0]; showBack: boolean }) {
  return (
    <div
      className="game-card animate-slide-in"
      style={{ padding: "14px 16px", height: "fit-content" }}
    >
      {/* Denomination title */}
      <div
        style={{
          fontFamily: "Fredoka One, cursive",
          fontSize: "1.5rem",
          color: bill.bgColor,
          textAlign: "center",
          marginBottom: 10,
        }}
      >
        {bill.value}
      </div>

      {/* Info rows */}
      {[
        { icon: "👤", label: "Pahlawan", value: bill.hero, sub: bill.heroDesc },
        { icon: "💃", label: "Tarian", value: bill.dance, sub: bill.danceOrigin },
        { icon: "🏔️", label: "Destinasi", value: bill.landmark, sub: bill.landmarkRegion },
        { icon: "🌺", label: "Bunga", value: bill.flower, sub: bill.flowerLatin, italic: true },
      ].map(({ icon, label, value, sub, italic }) => (
        <div
          key={label}
          style={{
            background: `${bill.bgColor}18`,
            border: `2px solid ${bill.bgColor}55`,
            borderRadius: 10,
            padding: "6px 10px",
            marginBottom: 7,
            display: "flex",
            gap: 8,
            alignItems: "flex-start",
          }}
        >
          <span style={{ fontSize: "1rem", flexShrink: 0, marginTop: 1 }}>{icon}</span>
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                fontFamily: "Nunito, sans-serif",
                fontSize: "0.65rem",
                fontWeight: 700,
                color: "#888",
                letterSpacing: "0.08em",
                marginBottom: 1,
              }}
            >
              {label.toUpperCase()}
            </div>
            <div
              style={{
                fontFamily: "Fredoka One, cursive",
                fontSize: "0.88rem",
                color: "#2D1B69",
                fontStyle: italic ? "italic" : "normal",
                lineHeight: 1.2,
              }}
            >
              {value}
            </div>
            {sub && (
              <div
                style={{
                  fontFamily: "Nunito, sans-serif",
                  fontSize: "0.65rem",
                  fontWeight: 600,
                  color: "#888",
                  fontStyle: italic ? "italic" : "normal",
                }}
              >
                {sub}
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Size badge */}
      <div
        style={{
          textAlign: "center",
          fontFamily: "Nunito, sans-serif",
          fontSize: "0.7rem",
          color: "#aaa",
          marginTop: 4,
          marginBottom: 6,
        }}
      >
        📏 Ukuran: {bill.size} · Kertas Katun
      </div>

      {/* Flip hint */}
      <div
        style={{
          textAlign: "center",
          fontFamily: "Nunito, sans-serif",
          fontSize: "0.73rem",
          color: "#888",
          background: "#f5f5f5",
          borderRadius: 8,
          padding: "4px 8px",
        }}
      >
        Klik lagi untuk lihat sisi{" "}
        <span style={{ fontWeight: 700, color: bill.bgColor }}>
          {showBack ? "depan" : "belakang"}
        </span>
        ! 🔄
      </div>
    </div>
  );
}
