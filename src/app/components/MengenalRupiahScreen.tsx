import { useState } from "react";
import { MascotWithBubble } from "./shared/Mascot";
import { FloatingClouds } from "./shared/FloatingDecor";
import { MoneyVisual } from "./MoneyVisual";
import { MONEY_ASSETS } from "./moneyAssets";
import { playSound } from "../audioManager";

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

interface CoinDetail {
  value: string;
  numValue: number;
  bgColor: string;
  accentColor: string;
  hero: string;
  heroDesc: string;
  material: string;
  shape: string;
  weight: string;
  diameter: string;
  thickness: string;
  edge: string;
  frontDesign: string;
  backDesign: string;
  year: string;
  fact: string;
  sourceUrl: string;
}

const COIN_DETAILS: CoinDetail[] = [
  {
    value: "Rp 100",
    numValue: 100,
    bgColor: "#8F98A8",
    accentColor: "#D7DBE2",
    hero: "Prof. Dr. Ir. Herman Johannes",
    heroDesc: "Pahlawan Nasional dari Nusa Tenggara Timur",
    material: "Aluminium",
    shape: "Bulat",
    weight: "1,79 gram",
    diameter: "23,00 mm",
    thickness: "2,00 mm",
    edge: "Rata",
    frontDesign: "Garuda Pancasila, teks REPUBLIK INDONESIA, dan gambar Prof. Dr. Ir. Herman Johannes.",
    backDesign: "Nominal 100, teks BANK INDONESIA, dan tahun emisi 2016.",
    year: "2016",
    fact: "Herman Johannes dikenal sebagai ilmuwan dan pejuang kemerdekaan. Koin Rp100 TE 2016 berbahan aluminium dan berwarna perak.",
    sourceUrl: "https://www.bi.go.id/id/rupiah/gambar-uang/Detail-Uang.aspx?Bahan=Logam&ID=1",
  },
  {
    value: "Rp 200",
    numValue: 200,
    bgColor: "#9AA8BA",
    accentColor: "#E7EDF4",
    hero: "Dr. Tjipto Mangoenkoesoemo",
    heroDesc: "Tokoh pergerakan nasional Indonesia",
    material: "Aluminium",
    shape: "Bulat",
    weight: "2,38 gram",
    diameter: "25,00 mm",
    thickness: "2,20 mm",
    edge: "Rata",
    frontDesign: "Garuda Pancasila, teks REPUBLIK INDONESIA, dan gambar Dr. Tjipto Mangoenkoesoemo.",
    backDesign: "Nominal 200, teks BANK INDONESIA, dan tahun emisi 2016.",
    year: "2016",
    fact: "Tjipto Mangoenkoesoemo adalah tokoh Tiga Serangkai yang berperan penting dalam pergerakan nasional Indonesia.",
    sourceUrl: "https://www.bi.go.id/id/rupiah/gambar-uang/Detail-Uang.aspx?Bahan=Logam&ID=2",
  },
  {
    value: "Rp 500",
    numValue: 500,
    bgColor: "#B7822F",
    accentColor: "#F2D27D",
    hero: "Letjen TNI T. B. Simatupang",
    heroDesc: "Pahlawan Nasional dan tokoh militer Indonesia",
    material: "Aluminium",
    shape: "Bulat",
    weight: "3,10 gram",
    diameter: "27,20 mm",
    thickness: "2,35 mm",
    edge: "Rata",
    frontDesign: "Garuda Pancasila, teks REPUBLIK INDONESIA, dan gambar Letjen TNI T. B. Simatupang.",
    backDesign: "Nominal 500, teks BANK INDONESIA, dan tahun emisi 2016.",
    year: "2016",
    fact: "T. B. Simatupang adalah tokoh militer dan pemikir strategis Indonesia. Koin Rp500 penting untuk transaksi dengan nominal lima ratus rupiah.",
    sourceUrl: "https://www.bi.go.id/id/rupiah/gambar-uang/Detail-Uang.aspx?Bahan=Logam&ID=3",
  },
];

export function MengenalRupiahScreen({ avatar, onBack, onComplete }: MengenalRupiahScreenProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [selectedCoin, setSelectedCoin] = useState<number | null>(null);
  const [flipped, setFlipped] = useState<Set<number>>(new Set());
  const [viewed, setViewed] = useState<Set<number>>(new Set());
  const [coinViewed, setCoinViewed] = useState<Set<number>>(new Set());
  const [showingBack, setShowingBack] = useState<Set<number>>(new Set());
  const coins = MONEY_ASSETS.filter((money) => money.kind === "coin");

  const handleBillClick = (i: number) => {
    if (flipped.has(i)) return;
    playSound("money", 0.45);
    setFlipped(new Set([...flipped, i]));
    setViewed(new Set([...viewed, i]));
    setSelected(i);
    setSelectedCoin(null);

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

  const handleCoinClick = (value: number) => {
    playSound("money", 0.45);
    setSelected(null);
    setSelectedCoin(value);
    setCoinViewed(new Set([...coinViewed, value]));
  };

  const selectedCoinDetail = selectedCoin ? COIN_DETAILS.find((coin) => coin.numValue === selectedCoin) : null;
  const totalItems = BANKNOTES.length + coins.length;
  const viewedItems = viewed.size + coinViewed.size;

  const mascotText =
    selected !== null
      ? BANKNOTES[selected].fact
      : selectedCoinDetail
      ? selectedCoinDetail.fact
      : "Klik uang kertas atau koin untuk melihat fakta seru! Yuk kenali semua pecahan Rupiah!";

  const progressPct = Math.round((viewedItems / totalItems) * 100);

  return (
    <div
      className="relative w-full h-full flex flex-col overflow-hidden"
      style={{ background: "linear-gradient(180deg, #1E90FF 0%, #87CEEB 40%, #C1E8FF 100%)" }}
    >
      <FloatingClouds />

      {/* Header */}
      <div
        className="relative z-20 flex items-center justify-between px-4 md:px-6 py-3 flex-wrap gap-2"
        style={{
          background: "linear-gradient(180deg, rgba(26,35,126,0.92) 0%, rgba(26,35,126,0.75) 100%)",
          borderBottom: "4px solid #FFD93D",
          flexShrink: 0,
        }}
      >
        <button
          className="game-btn-yellow"
          onClick={onBack}
          style={{ padding: "6px 16px", fontSize: "0.85rem" }}
        >
          ← Kembali
        </button>

        <h2
          style={{
            fontFamily: "Fredoka One, cursive",
            fontSize: "clamp(1rem, 2.2vw, 1.6rem)",
            color: "#FFD93D",
            textShadow: "2px 2px 0 #E65100",
            margin: 0,
            textAlign: "center",
          }}
        >
          💵 Mengenal Rupiah Indonesia
        </h2>

        <div className="hud-badge flex items-center gap-2" style={{ minWidth: 130 }}>
          <span style={{ fontSize: "0.9rem" }}>📊</span>
          <div style={{ flex: 1, minWidth: 70 }}>
            <div
              style={{
                fontFamily: "Fredoka One, cursive",
                fontSize: "0.6rem",
                color: "#888",
                marginBottom: 2,
              }}
            >
              {viewedItems}/{totalItems}
            </div>
            <div
              style={{
                height: 8,
                background: "#e0e0e0",
                borderRadius: 4,
                border: "2px solid #4A148C",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${progressPct}%`,
                  background: progressPct === 100 ? "#4CAF50" : "#FFD93D",
                  borderRadius: 4,
                  transition: "width 0.4s ease",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col gap-2 px-3 md:px-6 py-3 overflow-hidden">
        {/* Mascot */}
        <div className="flex-shrink-0 flex items-center justify-center gap-4" style={{ minHeight: 100 }}>
          <MascotWithBubble
            avatar={avatar}
            bubbleText={mascotText}
            mascotSize={80}
            className="animate-slide-in"
          />
        </div>

        {/* Uang Kertas + Logam + Detail */}
        <div className="flex-1 flex flex-row gap-3 min-h-0">
          <div className="flex-1 flex flex-col gap-2 min-h-0">
            {/* Label Uang Kertas */}
            <div style={{ 
              fontFamily: "Fredoka One, cursive", 
              fontSize: "0.75rem", 
              color: "#2D1B69",
              background: "rgba(255,255,255,0.7)",
              padding: "2px 12px",
              borderRadius: 10,
              display: "inline-block",
              width: "fit-content",
              border: "2px solid #4A148C",
            }}>
              💵 Uang Kertas
            </div>

            {/* Grid Uang Kertas - 4 kolom tetap, tinggi dibatasi */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gridTemplateRows: "1fr 1fr",
                gap: 5,
                minHeight: 0,
                maxHeight: "64%", // <-- Dikecilkan tinggi maksimum
                flexShrink: 1,
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
              {BANKNOTES.length % 4 !== 0 &&
                Array.from({ length: 4 - (BANKNOTES.length % 4) }).map((_, idx) => (
                  <div key={`placeholder-${idx}`} style={{ visibility: "hidden" }} />
                ))}
            </div>

            {/* Uang Logam */}
            <div
              style={{
                background: "rgba(255,255,255,0.92)",
                border: "3px solid #4A148C",
                borderRadius: 12,
                padding: "5px 12px",
                display: "flex",
                alignItems: "center",
                gap: 10,
                flexShrink: 0,
                boxShadow: "3px 3px 0 #3D1A78",
                flexWrap: "wrap",
              }}
            >
              <span style={{ 
                fontFamily: "Fredoka One, cursive", 
                color: "#2D1B69", 
                fontSize: "0.75rem",
                background: "rgba(255,255,255,0.7)",
                padding: "2px 12px",
                borderRadius: 10,
                border: "2px solid #4A148C",
              }}>
                🪙 Logam
              </span>
              <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                {coins.map((coin) => (
                  <button
                    key={coin.value}
                    onClick={() => handleCoinClick(coin.value)}
                    style={{
                      border: selectedCoin === coin.value ? "3px solid #FF6B9D" : "2px solid rgba(0,0,0,0.1)",
                      borderRadius: 10,
                      background: "#fff",
                      padding: 3,
                      cursor: "pointer",
                      position: "relative",
                      transition: "transform 0.15s ease, border-color 0.15s ease",
                      transform: selectedCoin === coin.value ? "scale(1.08)" : "scale(1)",
                    }}
                  >
                    <MoneyVisual money={coin} size="tiny" animated />
                    {coinViewed.has(coin.value) && (
                      <span style={{ position: "absolute", top: -4, right: -4, width: 14, height: 14, borderRadius: "50%", background: "#4CAF50", color: "#fff", border: "2px solid #1B5E20", fontFamily: "Fredoka One, cursive", fontSize: "0.4rem", display: "grid", placeItems: "center" }}>✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Detail Panel */}
          <div className="flex flex-col gap-2" style={{ width: 220, flexShrink: 0, maxHeight: "100%" }}>
            {(selected !== null || selectedCoinDetail) ? (
              <>
                {selected !== null && (
                  <BillDetailPanel bill={BANKNOTES[selected]} showBack={showingBack.has(selected)} />
                )}
                {selectedCoinDetail && (
                  <CoinDetailPanel coin={selectedCoinDetail} />
                )}
              </>
            ) : (
              <div 
                className="flex-1 flex items-center justify-center"
                style={{
                  background: "rgba(255,255,255,0.7)",
                  borderRadius: 14,
                  border: "3px dashed #4A148C",
                  padding: "12px 16px",
                  textAlign: "center",
                }}
              >
                <p style={{ 
                  fontFamily: "Nunito, sans-serif", 
                  fontWeight: 700, 
                  color: "#4A148C",
                  fontSize: "0.9rem",
                }}>
                  👆 Klik uang<br/>untuk lihat detail
                </p>
              </div>
            )}
            
            {viewedItems >= 7 && (
              <button
                className="game-btn-green animate-pop-in"
                style={{ padding: "5px 14px", fontSize: "0.7rem", width: "100%" }}
                onClick={() => {
                  playSound("correct");
                  onComplete(viewedItems * 100);
                }}
              >
                ✅ Lanjut! +{viewedItems * 100}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// BanknoteCard - ukuran seragam karena grid cell yang seragam
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
  const [imgError, setImgError] = useState(false);
  const currentImg = showBack ? bill.imageBackUrl : bill.imageUrl;

  return (
    <div
      onClick={onClick}
      className="banknote-card cursor-pointer"
      style={{
        width: "100%",
        height: "100%",
        background: showBack
          ? `linear-gradient(135deg, ${bill.bgColor}99, ${bill.bgColor})`
          : `linear-gradient(135deg, ${bill.bgColor}, ${bill.accentColor}55)`,
        border: `3px solid ${isSelected ? bill.accentColor : "rgba(0,0,0,0.2)"}`,
        borderRadius: 8,
        position: "relative",
        transform: isFlipping
          ? "perspective(600px) rotateY(90deg)"
          : isSelected
          ? "scale(1.04) translateY(-3px)"
          : "scale(1)",
        transition: isFlipping
          ? "transform 0.3s ease"
          : "transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275), border-color 0.2s ease",
        boxShadow: isSelected
          ? `0 0 0 3px ${bill.accentColor}, 3px 6px 12px rgba(0,0,0,0.3)`
          : "2px 3px 8px rgba(0,0,0,0.2)",
        overflow: "hidden",
      }}
    >
      {isViewed && (
        <div
          style={{
            position: "absolute",
            top: -2,
            right: -2,
            background: "#4CAF50",
            border: "2px solid #1B5E20",
            borderRadius: "50%",
            width: 16,
            height: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.5rem",
            zIndex: 10,
            boxShadow: "2px 2px 4px rgba(0,0,0,0.3)",
          }}
        >
          ✓
        </div>
      )}

      <div
        style={{
          position: "absolute",
          top: 2,
          left: 4,
          background: "rgba(0,0,0,0.5)",
          color: "#fff",
          borderRadius: 3,
          padding: "1px 4px",
          fontSize: "0.35rem",
          fontFamily: "Fredoka One, cursive",
          zIndex: 5,
        }}
      >
        {showBack ? "🔙" : "🔵"}
      </div>

      {!imgError ? (
        <img
          key={currentImg}
          src={currentImg}
          alt={bill.value}
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
        <div
          style={{
            padding: "4px 6px",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontFamily: "Fredoka One, cursive",
              fontSize: "clamp(0.5rem, 0.8vw, 0.65rem)",
              color: "#FFFFFF",
              textShadow: "1px 1px 0 rgba(0,0,0,0.4)",
              textAlign: "center",
            }}
          >
            {bill.value}
          </div>
          <div
            style={{
              fontFamily: "Nunito, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(0.35rem, 0.5vw, 0.45rem)",
              color: bill.textColor,
              textAlign: "center",
              background: "rgba(0,0,0,0.15)",
              borderRadius: 3,
              padding: "1px 4px",
              marginTop: 1,
            }}
          >
            {showBack ? bill.dance : bill.hero}
          </div>
        </div>
      )}
    </div>
  );
}

// BillDetailPanel (teks lebih besar)
function BillDetailPanel({ bill, showBack }: { bill: typeof BANKNOTES[0]; showBack: boolean }) {
  const details = showBack
    ? [
        { icon: "💃", label: "Tarian", value: bill.dance, sub: bill.danceOrigin },
        { icon: "🏔️", label: "Destinasi", value: bill.landmark, sub: bill.landmarkRegion },
        { icon: "🌺", label: "Bunga", value: bill.flower, sub: bill.flowerLatin },
      ]
    : [
        { icon: "👤", label: "Pahlawan", value: bill.hero, sub: bill.heroDesc },
        { icon: "📏", label: "Ukuran", value: bill.size, sub: `TE ${bill.year}` },
      ];

  return (
    <div
      className="animate-slide-in"
      style={{ 
        padding: "8px 12px", 
        flex: 1,
        overflowY: "auto",
        background: "rgba(255,255,255,0.95)",
        border: `3px solid ${bill.bgColor}`,
        borderRadius: 12,
        boxShadow: "2px 2px 0 rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        minHeight: 0,
      }}
    >
      <div
        style={{
          fontFamily: "Fredoka One, cursive",
          fontSize: "1rem",
          color: bill.bgColor,
          textAlign: "center",
          marginBottom: 6,
          flexShrink: 0,
        }}
      >
        {bill.value}
      </div>

      <div style={{ flex: 1, overflowY: "auto", minHeight: 0 }}>
        {details.map(({ icon, label, value, sub }) => (
          <div
            key={label}
            style={{
              background: `${bill.bgColor}10`,
              border: `1px solid ${bill.bgColor}30`,
              borderRadius: 6,
              padding: "4px 10px",
              marginBottom: 4,
              display: "flex",
              gap: 8,
              alignItems: "flex-start",
            }}
          >
            <span style={{ fontSize: "1rem", flexShrink: 0 }}>{icon}</span>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div
                style={{
                  fontFamily: "Nunito, sans-serif",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  color: "#888",
                  letterSpacing: "0.05em",
                }}
              >
                {label}
              </div>
              <div
                style={{
                  fontFamily: "Fredoka One, cursive",
                  fontSize: "0.9rem",
                  color: "#2D1B69",
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
                    color: "#999",
                  }}
                >
                  {sub}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          textAlign: "center",
          fontFamily: "Nunito, sans-serif",
          fontSize: "0.6rem",
          color: "#aaa",
          background: "#f5f5f5",
          borderRadius: 4,
          padding: "2px 6px",
          marginTop: 4,
          flexShrink: 0,
        }}
      >
        Klik untuk lihat sisi {showBack ? "depan" : "belakang"} 🔄
      </div>
    </div>
  );
}

// CoinDetailPanel (teks lebih besar)
function CoinDetailPanel({ coin }: { coin: CoinDetail }) {
  const rows = [
    { label: "Pahlawan", value: coin.hero, sub: coin.heroDesc },
    { label: "Bahan", value: coin.material, sub: coin.shape },
    { label: "Ukuran", value: coin.diameter, sub: `Tebal ${coin.thickness}` },
    { label: "Berat", value: coin.weight, sub: `Emisi ${coin.year}` },
  ];

  return (
    <div
      className="animate-slide-in"
      style={{ 
        padding: "8px 12px", 
        flex: 1,
        overflowY: "auto",
        background: "rgba(255,255,255,0.95)",
        border: `3px solid ${coin.bgColor}`,
        borderRadius: 12,
        boxShadow: "2px 2px 0 rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        minHeight: 0,
      }}
    >
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 6, flexShrink: 0 }}>
        <MoneyVisual money={MONEY_ASSETS.find((m) => m.value === coin.numValue)!} size="tiny" animated />
      </div>

      <div
        style={{
          fontFamily: "Fredoka One, cursive",
          fontSize: "1rem",
          color: coin.bgColor,
          textAlign: "center",
          marginBottom: 6,
          flexShrink: 0,
        }}
      >
        {coin.value}
      </div>

      <div style={{ flex: 1, overflowY: "auto", minHeight: 0 }}>
        {rows.map(({ label, value, sub }) => (
          <div
            key={label}
            style={{
              background: `${coin.accentColor}30`,
              border: `1px solid ${coin.bgColor}30`,
              borderRadius: 6,
              padding: "4px 10px",
              marginBottom: 4,
            }}
          >
            <div
              style={{
                fontFamily: "Nunito, sans-serif",
                fontSize: "0.7rem",
                fontWeight: 700,
                color: "#777",
                letterSpacing: "0.05em",
              }}
            >
              {label}
            </div>
            <div
              style={{
                fontFamily: "Fredoka One, cursive",
                fontSize: "0.9rem",
                color: "#2D1B69",
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
                }}
              >
                {sub}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}