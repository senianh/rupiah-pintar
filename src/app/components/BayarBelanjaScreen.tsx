import { useState, useCallback } from "react";
import { MascotWithBubble } from "./shared/Mascot";
import { ConfettiPieces } from "./shared/FloatingDecor";

interface BayarBelanjaScreenProps {
  avatar: "boy" | "girl";
  onBack: () => void;
  onComplete: (score: number) => void;
}

const SHOP_ITEMS = [
  { name: "Susu UHT 1L", price: 8500, emoji: "🥛", color: "#BBDEFB" },
  { name: "Roti Tawar", price: 6000, emoji: "🍞", color: "#FFF9C4" },
  { name: "Mainan Mobil", price: 12000, emoji: "🚗", color: "#FCE4EC" },
  { name: "Pensil Warna", price: 9500, emoji: "✏️", color: "#E8F5E9" },
  { name: "Minuman Soda", price: 4500, emoji: "🥤", color: "#F3E5F5" },
];

const WALLET_BILLS = [
  { value: 1000, label: "Rp 1.000", bg: "#C62828", text: "#FFCDD2", count: 5 },
  { value: 2000, label: "Rp 2.000", bg: "#546E7A", text: "#CFD8DC", count: 3 },
  { value: 5000, label: "Rp 5.000", bg: "#5D4037", text: "#D7CCC8", count: 4 },
  { value: 10000, label: "Rp 10.000", bg: "#6A1B9A", text: "#E1BEE7", count: 3 },
  { value: 20000, label: "Rp 20.000", bg: "#2E7D32", text: "#C8E6C9", count: 3 },
  { value: 50000, label: "Rp 50.000", bg: "#1565C0", text: "#BBDEFB", count: 2 },
];

interface WalletBill {
  id: string;
  value: number;
  label: string;
  bg: string;
  text: string;
}

export function BayarBelanjaScreen({ avatar, onBack, onComplete }: BayarBelanjaScreenProps) {
  const [cart, setCart] = useState<typeof SHOP_ITEMS>([]);
  const [walletBills, setWalletBills] = useState<WalletBill[]>([]);
  const [billCounts, setBillCounts] = useState<Record<number, number>>(
    Object.fromEntries(WALLET_BILLS.map((b) => [b.value, b.count]))
  );
  const [payState, setPayState] = useState<"idle" | "exact" | "change" | "insufficient">("idle");
  const [changeAmount, setChangeAmount] = useState(0);
  const [score, setScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [conveyor, setConveyor] = useState<typeof SHOP_ITEMS>(SHOP_ITEMS.slice(0, 3));

  const cartTotal = cart.reduce((s, item) => s + item.price, 0);
  const walletTotal = walletBills.reduce((s, b) => s + b.value, 0);
  const isConveyorEmpty = conveyor.length === 0;

  const addToCart = (item: typeof SHOP_ITEMS[0]) => {
    if (payState !== "idle") return;
    setCart((prev) => [...prev, item]);
  };

  const removeFromCart = (idx: number) => {
    if (payState !== "idle") return;
    setCart((prev) => prev.filter((_, i) => i !== idx));
  };

  const addBillToWallet = useCallback((bill: typeof WALLET_BILLS[0]) => {
    if (billCounts[bill.value] <= 0 || payState !== "idle") return;
    setWalletBills((prev) => [...prev, { id: `${bill.value}-${Date.now()}`, value: bill.value, label: bill.label, bg: bill.bg, text: bill.text }]);
    setBillCounts((prev) => ({ ...prev, [bill.value]: prev[bill.value] - 1 }));
  }, [billCounts, payState]);

  const removeBill = () => {
    if (walletBills.length === 0) return;
    const last = walletBills[walletBills.length - 1];
    setWalletBills((prev) => prev.slice(0, -1));
    setBillCounts((prev) => ({ ...prev, [last.value]: prev[last.value] + 1 }));
  };

  const handlePay = () => {
    if (cart.length === 0) return;
    if (walletTotal < cartTotal) {
      setPayState("insufficient");
      return;
    }
    const change = walletTotal - cartTotal;
    setChangeAmount(change);
    if (change === 0) {
      setPayState("exact");
    } else {
      setPayState("change");
    }
    const pts = 300 + (change === 0 ? 100 : 0) - Math.floor(change / 1000) * 5;
    setScore((s) => s + Math.max(100, pts));
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000);
  };

  const handleNextRound = () => {
    setCart([]);
    setWalletBills([]);
    setBillCounts(Object.fromEntries(WALLET_BILLS.map((b) => [b.value, b.count])));
    setPayState("idle");
    setChangeAmount(0);
    const nextItems = SHOP_ITEMS.slice(2, 5);
    setConveyor(nextItems);
    if (score > 0) {
      setTimeout(() => onComplete(score), 100);
    }
  };

  const mascotMsg =
    payState === "exact" ? "TEPAT SEKALI! Uang pas tanpa kembalian! 🏆" :
    payState === "change" ? `Kembalian kamu: Rp ${changeAmount.toLocaleString("id-ID")}! 💰` :
    payState === "insufficient" ? "Uangnya kurang nih! Tambah lagi ya! 😅" :
    cart.length === 0 ? "Klik barang dari ban berjalan untuk dimasukkan ke keranjang! 🛒" :
    "Sekarang pilih uang dari dompet untuk membayar! 💳";

  return (
    <div
      className="relative w-full h-full flex flex-col overflow-hidden"
      style={{ background: "linear-gradient(180deg, #1B5E20 0%, #2E7D32 20%, #4CAF50 50%, #A5D6A7 100%)" }}
    >
      {showConfetti && <ConfettiPieces />}

      {/* Header */}
      <div
        className="relative z-20 flex items-center justify-between px-6 py-3"
        style={{
          background: "linear-gradient(180deg, rgba(10,40,10,0.95) 0%, rgba(10,40,10,0.7) 100%)",
          borderBottom: "4px solid #FFD93D",
          flexShrink: 0,
        }}
      >
        <button className="game-btn-yellow" onClick={onBack} style={{ padding: "8px 20px", fontSize: "1rem" }}>← Kembali</button>
        <h2 style={{ fontFamily: "Fredoka One, cursive", fontSize: "clamp(1.4rem, 2.8vw, 2rem)", color: "#FFD93D", textShadow: "2px 2px 0 #E65100", margin: 0 }}>
          🛒 Kasir Supermarket! 🛒
        </h2>
        <div className="hud-badge">
          <span style={{ fontFamily: "Fredoka One, cursive", fontSize: "1.1rem", color: "#FFD93D" }}>⭐ {score} Poin</span>
        </div>
      </div>

      {/* Main split layout */}
      <div className="flex-1 flex gap-5 px-5 py-4 z-10 relative overflow-hidden">

        {/* LEFT 60%: Supermarket side */}
        <div className="flex flex-col gap-4" style={{ flex: "0 0 60%", overflow: "hidden" }}>

          {/* LED billing screen */}
          <div className="led-screen px-5 py-3 flex items-center justify-between" style={{ flexShrink: 0 }}>
            <div>
              <div style={{ fontSize: "0.7rem", letterSpacing: "0.15em", opacity: 0.7, marginBottom: 2 }}>SUPERMARKET RUPIAH PINTAR</div>
              <div style={{ fontSize: "0.85rem", opacity: 0.8 }}>
                {cart.length > 0 ? `${cart.length} item dalam keranjang` : "Kosong — pilih barang dari ban berjalan"}
              </div>
            </div>
            <div>
              <div style={{ fontSize: "0.7rem", letterSpacing: "0.15em", opacity: 0.7, textAlign: "right" }}>TOTAL BAYAR</div>
              <div style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", fontWeight: 900, letterSpacing: "0.05em", textAlign: "right" }}>
                Rp {cartTotal.toLocaleString("id-ID")}
              </div>
            </div>
          </div>

          {/* Conveyor belt */}
          <div style={{ flexShrink: 0 }}>
            <div style={{ fontFamily: "Fredoka One, cursive", fontSize: "0.9rem", color: "#fff", textShadow: "1px 1px 0 #1B5E20", marginBottom: 6 }}>
              🏪 Ban Berjalan — Klik barang untuk ditambah ke keranjang:
            </div>
            <div
              className="conveyor-belt py-3 px-4 flex gap-4 overflow-x-auto"
              style={{ minHeight: 90 }}
            >
              {conveyor.map((item, i) => (
                <div
                  key={`${item.name}-${i}`}
                  onClick={() => addToCart(item)}
                  className="cursor-pointer"
                  style={{
                    background: item.color,
                    border: "3px solid rgba(0,0,0,0.25)",
                    borderRadius: 14,
                    padding: "8px 14px",
                    textAlign: "center",
                    flexShrink: 0,
                    boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
                    transition: "transform 0.15s ease",
                    animation: `float ${2 + i * 0.3}s ease-in-out ${i * 0.2}s infinite`,
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "scale(1.08) translateY(-4px)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = ""; }}
                >
                  <div style={{ fontSize: "2rem" }}>{item.emoji}</div>
                  <div style={{ fontFamily: "Fredoka One, cursive", fontSize: "0.8rem", color: "#2D1B69", lineHeight: 1.2 }}>{item.name}</div>
                  <div style={{ fontFamily: "Fredoka One, cursive", fontSize: "0.9rem", color: "#1565C0" }}>
                    Rp {item.price.toLocaleString("id-ID")}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shopping cart */}
          <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
            <div style={{ fontFamily: "Fredoka One, cursive", fontSize: "0.9rem", color: "#fff", textShadow: "1px 1px 0 #1B5E20", marginBottom: 6 }}>
              🛍️ Keranjang Belanja:
            </div>
            <div
              style={{
                background: "rgba(255,255,255,0.9)",
                border: "4px solid #4A148C",
                borderRadius: 16,
                padding: "10px 12px",
                flex: 1,
                overflowY: "auto",
                boxShadow: "4px 4px 0 #3D1A78",
              }}
            >
              {cart.length === 0 ? (
                <div style={{ textAlign: "center", color: "#aaa", fontFamily: "Nunito, sans-serif", fontWeight: 700, paddingTop: 16 }}>
                  Belum ada barang... Klik dari ban berjalan! 👆
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {cart.map((item, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: item.color, borderRadius: 10, padding: "6px 12px", border: "2px solid rgba(0,0,0,0.1)" }}>
                      <span style={{ fontSize: "1.2rem" }}>{item.emoji}</span>
                      <span style={{ fontFamily: "Nunito, sans-serif", fontSize: "0.9rem", fontWeight: 700, color: "#2D1B69", flex: 1, paddingLeft: 8 }}>{item.name}</span>
                      <span style={{ fontFamily: "Fredoka One, cursive", fontSize: "0.95rem", color: "#1565C0" }}>Rp {item.price.toLocaleString("id-ID")}</span>
                      <button
                        onClick={() => removeFromCart(i)}
                        style={{ marginLeft: 8, background: "#FF5252", border: "none", borderRadius: "50%", width: 22, height: 22, color: "#fff", cursor: "pointer", fontSize: "0.7rem", flexShrink: 0 }}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <div style={{ borderTop: "2px dashed #4A148C", paddingTop: 6, display: "flex", justifyContent: "flex-end" }}>
                    <span style={{ fontFamily: "Fredoka One, cursive", fontSize: "1.1rem", color: "#4A148C" }}>
                      TOTAL: Rp {cartTotal.toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT 40%: Wallet side */}
        <div className="flex flex-col gap-4" style={{ flex: "0 0 38%" }}>

          {/* Mascot */}
          <MascotWithBubble
            avatar={avatar}
            bubbleText={mascotMsg}
            mascotSize={80}
            reverse
          />

          {/* Digital Wallet */}
          <div className="wallet-card flex-1 flex flex-col" style={{ padding: 16, overflow: "hidden" }}>
            <div style={{ fontFamily: "Fredoka One, cursive", fontSize: "1.1rem", color: "#FFD93D", textShadow: "1px 1px 0 rgba(0,0,0,0.5)", marginBottom: 8, textAlign: "center" }}>
              👛 Dompet Digital
            </div>

            {/* Bills in wallet */}
            <div
              style={{
                background: "rgba(0,0,0,0.3)",
                borderRadius: 12,
                padding: 10,
                flex: 1,
                overflowY: "auto",
                marginBottom: 10,
                minHeight: 80,
              }}
            >
              {walletBills.length === 0 ? (
                <div style={{ color: "#ccc", fontFamily: "Nunito, sans-serif", fontWeight: 700, fontSize: "0.85rem", textAlign: "center", paddingTop: 12 }}>
                  Pilih uang dari bawah untuk dimasukkan ke dompet! ↓
                </div>
              ) : (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {walletBills.map((bill, i) => (
                    <div
                      key={bill.id}
                      className="animate-pop-in"
                      style={{
                        background: bill.bg,
                        borderRadius: 8,
                        padding: "3px 10px",
                        fontFamily: "Fredoka One, cursive",
                        fontSize: "0.75rem",
                        color: bill.text,
                        border: "2px solid rgba(255,255,255,0.3)",
                        animationDelay: `${i * 0.04}s`,
                      }}
                    >
                      {bill.label}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Wallet total */}
            <div style={{ textAlign: "center", marginBottom: 8 }}>
              <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "0.7rem", fontWeight: 700, color: "#aaa" }}>Uang di Dompet:</div>
              <div style={{ fontFamily: "Fredoka One, cursive", fontSize: "1.4rem", color: walletTotal < cartTotal ? "#FF8A80" : walletTotal > cartTotal ? "#FFD93D" : "#69F0AE" }}>
                Rp {walletTotal.toLocaleString("id-ID")}
              </div>
              {cartTotal > 0 && (
                <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "0.8rem", fontWeight: 700, color: walletTotal >= cartTotal ? "#69F0AE" : "#FF8A80" }}>
                  {walletTotal >= cartTotal
                    ? walletTotal === cartTotal ? "✅ Pas!" : `💸 Kembalian: Rp ${(walletTotal - cartTotal).toLocaleString("id-ID")}`
                    : `❌ Kurang: Rp ${(cartTotal - walletTotal).toLocaleString("id-ID")}`
                  }
                </div>
              )}
            </div>

            {/* Bill selector */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
              {WALLET_BILLS.map((bill) => (
                <button
                  key={bill.value}
                  onClick={() => addBillToWallet(bill)}
                  disabled={billCounts[bill.value] <= 0}
                  style={{
                    background: billCounts[bill.value] <= 0 ? "#555" : bill.bg,
                    color: bill.text,
                    border: "2px solid rgba(255,255,255,0.3)",
                    borderRadius: 8,
                    padding: "4px 10px",
                    fontFamily: "Fredoka One, cursive",
                    fontSize: "0.72rem",
                    cursor: billCounts[bill.value] <= 0 ? "not-allowed" : "pointer",
                    opacity: billCounts[bill.value] <= 0 ? 0.4 : 1,
                    position: "relative",
                    boxShadow: "0 3px 0 rgba(0,0,0,0.3)",
                    transition: "transform 0.1s",
                  }}
                >
                  {bill.label}
                  <span style={{ position: "absolute", top: -6, right: -6, background: "#FF6B9D", borderRadius: "50%", width: 16, height: 16, fontSize: "0.6rem", display: "flex", alignItems: "center", justifyContent: "center", color: "white", border: "1px solid #C2185B" }}>
                    {billCounts[bill.value]}
                  </span>
                </button>
              ))}
            </div>

            {/* Action buttons */}
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={removeBill}
                style={{
                  flex: 1,
                  background: "rgba(255,255,255,0.15)",
                  border: "2px solid rgba(255,255,255,0.3)",
                  borderRadius: 10,
                  padding: "6px 0",
                  fontFamily: "Fredoka One, cursive",
                  fontSize: "0.8rem",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                ↩ Hapus
              </button>

              {payState === "idle" ? (
                <button
                  className="game-btn-yellow"
                  onClick={handlePay}
                  disabled={cart.length === 0 || walletBills.length === 0}
                  style={{ flex: 2, padding: "8px 0", fontSize: "1rem", opacity: cart.length === 0 || walletBills.length === 0 ? 0.5 : 1 }}
                >
                  💳 Bayar Sekarang!
                </button>
              ) : (
                <button
                  className="game-btn-green"
                  onClick={handleNextRound}
                  style={{ flex: 2, padding: "8px 0", fontSize: "0.95rem" }}
                >
                  🎉 Selesai! Lanjut →
                </button>
              )}
            </div>

            {/* Payment feedback */}
            {payState !== "idle" && (
              <div
                className="animate-pop-in"
                style={{
                  marginTop: 8,
                  background: payState === "insufficient" ? "rgba(255,82,82,0.3)" : "rgba(76,175,80,0.3)",
                  border: `2px solid ${payState === "insufficient" ? "#FF5252" : "#4CAF50"}`,
                  borderRadius: 10,
                  padding: "8px 12px",
                  textAlign: "center",
                  fontFamily: "Fredoka One, cursive",
                  fontSize: "0.9rem",
                  color: "#fff",
                }}
              >
                {payState === "exact" && "✅ Uang pas! Tidak ada kembalian! Keren! 🌟"}
                {payState === "change" && `💰 Kembalian: Rp ${changeAmount.toLocaleString("id-ID")}!`}
                {payState === "insufficient" && `❌ Uang kurang Rp ${(cartTotal - walletTotal).toLocaleString("id-ID")}!`}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
