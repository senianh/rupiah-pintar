import { useCallback, useMemo, useState } from "react";
import { MascotWithBubble } from "./shared/Mascot";
import { ConfettiPieces } from "./shared/FloatingDecor";
import { MoneyVisual } from "./MoneyVisual";
import { formatRupiah, getMoneyAsset } from "./moneyAssets";
import { playSound } from "../audioManager";

interface BayarBelanjaScreenProps {
  avatar: "boy" | "girl";
  onBack: () => void;
  onComplete: (score: number) => void;
}

const WALLET_VALUES = [
  { value: 100, count: 5 },
  { value: 200, count: 5 },
  { value: 500, count: 8 },
  { value: 1000, count: 6 },
  { value: 2000, count: 5 },
  { value: 5000, count: 5 },
  { value: 10000, count: 4 },
  { value: 20000, count: 3 },
  { value: 50000, count: 2 },
  { value: 100000, count: 1 },
];

const CUSTOMERS = [
  {
    name: "Siti",
    items: [
      { name: "Susu UHT", price: 8500, icon: "S", color: "#BBDEFB" },
      { name: "Roti Tawar", price: 6000, icon: "R", color: "#FFF9C4" },
    ],
  },
  {
    name: "Bima",
    items: [
      { name: "Pensil Warna", price: 9500, icon: "P", color: "#E8F5E9" },
      { name: "Penghapus", price: 2500, icon: "H", color: "#F3E5F5" },
      { name: "Buku Tulis", price: 7000, icon: "B", color: "#E0F7FA" },
    ],
  },
  {
    name: "Rani",
    items: [
      { name: "Air Mineral", price: 3500, icon: "A", color: "#E3F2FD" },
      { name: "Biskuit", price: 12500, icon: "K", color: "#FFE0B2" },
      { name: "Apel", price: 8000, icon: "A", color: "#FFCDD2" },
    ],
  },
  {
    name: "Dika",
    items: [
      { name: "Mainan Mobil", price: 12000, icon: "M", color: "#FCE4EC" },
      { name: "Jus Jeruk", price: 5500, icon: "J", color: "#FFF3E0" },
      { name: "Permen", price: 1500, icon: "P", color: "#F8BBD0" },
    ],
  },
];

interface PaidMoney {
  id: string;
  value: number;
}

export function BayarBelanjaScreen({ avatar, onBack, onComplete }: BayarBelanjaScreenProps) {
  const [customerIdx, setCustomerIdx] = useState(0);
  const [paidMoney, setPaidMoney] = useState<PaidMoney[]>([]);
  const [counts, setCounts] = useState<Record<number, number>>(Object.fromEntries(WALLET_VALUES.map((money) => [money.value, money.count])));
  const [payState, setPayState] = useState<"idle" | "exact" | "change" | "insufficient">("idle");
  const [score, setScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const customer = CUSTOMERS[customerIdx];
  const total = customer.items.reduce((sum, item) => sum + item.price, 0);
  const paidTotal = paidMoney.reduce((sum, money) => sum + money.value, 0);
  const change = paidTotal - total;

  const remainingText = useMemo(() => {
    if (paidTotal < total) return `Kurang ${formatRupiah(total - paidTotal)}`;
    if (paidTotal === total) return "Uang pas";
    return `Kembalian ${formatRupiah(change)}`;
  }, [change, paidTotal, total]);

  const addMoney = useCallback((value: number) => {
    if (payState !== "idle" || counts[value] <= 0) return;
    playSound("money", 0.52);
    setPaidMoney((current) => [...current, { id: `${value}-${Date.now()}-${current.length}`, value }]);
    setCounts((current) => ({ ...current, [value]: current[value] - 1 }));
  }, [counts, payState]);

  const removeLast = () => {
    if (payState !== "idle" || paidMoney.length === 0) return;
    playSound("click", 0.45);
    const last = paidMoney[paidMoney.length - 1];
    setPaidMoney((current) => current.slice(0, -1));
    setCounts((current) => ({ ...current, [last.value]: current[last.value] + 1 }));
  };

  const resetPayment = () => {
    if (payState !== "idle") return;
    playSound("click", 0.45);
    setPaidMoney([]);
    setCounts(Object.fromEntries(WALLET_VALUES.map((money) => [money.value, money.count])));
  };

  const pay = () => {
    if (paidMoney.length === 0) return;
    if (paidTotal < total) {
      playSound("wrong");
      setPayState("insufficient");
      setTimeout(() => setPayState("idle"), 900);
      return;
    }

    const roundScore = Math.max(150, 350 + (paidTotal === total ? 150 : 0) - Math.floor(Math.max(0, change) / 500) * 4);
    playSound("payment");
    setScore((current) => current + roundScore);
    setPayState(paidTotal === total ? "exact" : "change");
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 1600);
  };

  const nextCustomer = () => {
    if (customerIdx < CUSTOMERS.length - 1) {
      playSound("click");
      setCustomerIdx((idx) => idx + 1);
      setPaidMoney([]);
      setCounts(Object.fromEntries(WALLET_VALUES.map((money) => [money.value, money.count])));
      setPayState("idle");
    } else {
      playSound("correct");
      onComplete(score);
    }
  };

  const mascotMsg =
    payState === "exact"
      ? "Pas sekali! Kamu membayar tanpa kembalian."
      : payState === "change"
      ? `Benar, kembaliannya ${formatRupiah(change)}.`
      : payState === "insufficient"
      ? "Uangnya masih kurang, pilih pecahan lagi ya."
      : `Pelanggan ${customer.name} belanja ${formatRupiah(total)}. Bayar dengan uang pas atau lebih.`;

  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden" style={{ background: "linear-gradient(180deg, #1B5E20 0%, #388E3C 46%, #A5D6A7 100%)" }}>
      {showConfetti && <ConfettiPieces />}

      <div className="relative z-20 flex items-center justify-between px-6 py-3" style={{ background: "linear-gradient(180deg, rgba(10,40,10,0.95), rgba(10,40,10,0.72))", borderBottom: "4px solid #FFD93D", flexShrink: 0 }}>
        <button className="game-btn-yellow" onClick={onBack} style={{ padding: "8px 20px", fontSize: "1rem" }}>Kembali</button>
        <h2 style={{ fontFamily: "Fredoka One, cursive", fontSize: "clamp(1.35rem, 2.8vw, 2rem)", color: "#FFD93D", textShadow: "2px 2px 0 #E65100", margin: 0 }}>Kasir Supermarket</h2>
        <div className="hud-badge">
          <span style={{ fontFamily: "Fredoka One, cursive", fontSize: "1.1rem", color: "#FFD93D" }}>{score} Poin</span>
        </div>
      </div>

      <div className="flex-1 flex gap-5 px-5 py-4 z-10 relative overflow-hidden">
        <div className="flex flex-col gap-4" style={{ flex: "0 0 58%", overflow: "hidden" }}>
          <div className="led-screen px-5 py-3 flex items-center justify-between" style={{ flexShrink: 0 }}>
            <div>
              <div style={{ fontSize: "0.7rem", letterSpacing: "0.15em", opacity: 0.7, marginBottom: 2 }}>SUPERMARKET RUPIAH PINTAR</div>
              <div style={{ fontSize: "0.95rem", opacity: 0.9 }}>Pelanggan {customerIdx + 1}/{CUSTOMERS.length}: {customer.name}</div>
            </div>
            <div>
              <div style={{ fontSize: "0.7rem", letterSpacing: "0.15em", opacity: 0.7, textAlign: "right" }}>TOTAL BAYAR</div>
              <div style={{ fontSize: "clamp(1.55rem, 2.7vw, 2.15rem)", fontWeight: 900, letterSpacing: "0.04em", textAlign: "right" }}>{formatRupiah(total)}</div>
            </div>
          </div>

          <div style={{ fontFamily: "Fredoka One, cursive", color: "#fff", textShadow: "1px 1px 0 #1B5E20" }}>Daftar Belanja Pelanggan</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 12, flexShrink: 0 }}>
            {customer.items.map((item) => (
              <div key={item.name} style={{ background: item.color, border: "3px solid rgba(0,0,0,0.25)", borderRadius: 14, padding: "12px 14px", minHeight: 116, boxShadow: "0 5px 0 rgba(0,0,0,0.2)" }}>
                <div style={{ width: 38, height: 38, borderRadius: "50%", background: "#fff", border: "2px solid rgba(0,0,0,0.18)", display: "grid", placeItems: "center", fontFamily: "Fredoka One, cursive", color: "#2D1B69", marginBottom: 8 }}>{item.icon}</div>
                <div style={{ fontFamily: "Fredoka One, cursive", color: "#2D1B69", fontSize: "0.95rem", lineHeight: 1.2 }}>{item.name}</div>
                <div style={{ fontFamily: "Fredoka One, cursive", color: "#1565C0", fontSize: "1rem", marginTop: 5 }}>{formatRupiah(item.price)}</div>
              </div>
            ))}
          </div>

          <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
            <div style={{ fontFamily: "Fredoka One, cursive", color: "#fff", textShadow: "1px 1px 0 #1B5E20", marginBottom: 6 }}>Uang yang Dibayarkan</div>
            <div style={{ flex: 1, background: "rgba(255,255,255,0.92)", border: "4px solid #4A148C", borderRadius: 16, boxShadow: "4px 4px 0 #3D1A78", padding: 12, overflowY: "auto", display: "flex", gap: 9, flexWrap: "wrap", alignContent: "flex-start" }}>
              {paidMoney.length === 0 ? (
                <div style={{ margin: "auto", color: "#888", fontFamily: "Nunito, sans-serif", fontWeight: 800, textAlign: "center" }}>Pilih uang dari dompet di sebelah kanan.</div>
              ) : (
                paidMoney.map((money) => <MoneyVisual key={money.id} money={getMoneyAsset(money.value)} size="small" animated={getMoneyAsset(money.value).kind === "coin"} />)
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4" style={{ flex: "1 1 0", minWidth: 0 }}>
          <MascotWithBubble avatar={avatar} bubbleText={mascotMsg} mascotSize={76} reverse />

          <div className="wallet-card flex-1 flex flex-col" style={{ padding: 16, overflow: "hidden" }}>
            <div style={{ fontFamily: "Fredoka One, cursive", fontSize: "1.1rem", color: "#FFD93D", textShadow: "1px 1px 0 rgba(0,0,0,0.5)", marginBottom: 8, textAlign: "center" }}>Dompet Rupiah</div>

            <div style={{ textAlign: "center", marginBottom: 10, background: "rgba(0,0,0,0.24)", borderRadius: 12, padding: "8px 10px" }}>
              <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "0.72rem", fontWeight: 800, color: "#ddd" }}>Dibayar</div>
              <div style={{ fontFamily: "Fredoka One, cursive", fontSize: "1.45rem", color: paidTotal < total ? "#FFAB91" : paidTotal === total ? "#69F0AE" : "#FFD93D" }}>{formatRupiah(paidTotal)}</div>
              <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "0.85rem", fontWeight: 900, color: paidTotal < total ? "#FFAB91" : "#69F0AE" }}>{remainingText}</div>
            </div>

            <div style={{ flex: 1, overflowY: "auto", display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 8, alignContent: "start", paddingRight: 2 }}>
              {WALLET_VALUES.map(({ value }) => {
                const money = getMoneyAsset(value);
                return (
                  <button key={value} onClick={() => addMoney(value)} disabled={counts[value] <= 0 || payState !== "idle"} style={{ border: "2px solid rgba(255,255,255,0.35)", borderRadius: 10, background: counts[value] <= 0 ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.92)", padding: 5, cursor: counts[value] <= 0 || payState !== "idle" ? "not-allowed" : "pointer", opacity: counts[value] <= 0 ? 0.45 : 1, position: "relative", display: "grid", placeItems: "center" }}>
                    <MoneyVisual money={money} size="tiny" animated={money.kind === "coin"} />
                    <span style={{ position: "absolute", top: -6, right: -6, width: 20, height: 20, borderRadius: "50%", background: "#FF6B9D", color: "#fff", border: "1px solid #C2185B", display: "grid", placeItems: "center", fontFamily: "Fredoka One, cursive", fontSize: "0.65rem" }}>{counts[value]}</span>
                  </button>
                );
              })}
            </div>

            <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
              <button onClick={removeLast} style={{ flex: 1, background: "rgba(255,255,255,0.15)", border: "2px solid rgba(255,255,255,0.35)", borderRadius: 10, padding: "7px 0", fontFamily: "Fredoka One, cursive", color: "#fff", cursor: "pointer" }}>Hapus</button>
              <button onClick={resetPayment} style={{ flex: 1, background: "rgba(255,255,255,0.15)", border: "2px solid rgba(255,255,255,0.35)", borderRadius: 10, padding: "7px 0", fontFamily: "Fredoka One, cursive", color: "#fff", cursor: "pointer" }}>Reset</button>
              {payState === "idle" ? (
                <button className="game-btn-yellow" onClick={pay} disabled={paidMoney.length === 0} style={{ flex: 2, padding: "8px 0", fontSize: "1rem", opacity: paidMoney.length === 0 ? 0.55 : 1 }}>Bayar</button>
              ) : (
                <button className="game-btn-green" onClick={nextCustomer} style={{ flex: 2, padding: "8px 0", fontSize: "0.95rem" }}>{customerIdx < CUSTOMERS.length - 1 ? "Pelanggan Lanjut" : "Selesai"}</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
