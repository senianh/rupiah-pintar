import { useState } from "react";
import { MoneyAsset } from "./moneyAssets";

interface MoneyVisualProps {
  money: MoneyAsset;
  side?: "front" | "back";
  size?: "tiny" | "small" | "medium" | "large";
  animated?: boolean;
}

const noteSizes = {
  tiny: { width: 88, height: 42 },
  small: { width: 122, height: 58 },
  medium: { width: 170, height: 82 },
  large: { width: 260, height: 126 },
};

const coinSizes = {
  tiny: 42,
  small: 56,
  medium: 76,
  large: 104,
};

export function MoneyVisual({ money, side = "front", size = "small", animated = false }: MoneyVisualProps) {
  const [imageFailed, setImageFailed] = useState(false);

  if (money.kind === "coin") {
    const diameter = coinSizes[size];
    return (
      <div
        aria-label={money.label}
        style={{
          width: diameter,
          height: diameter,
          borderRadius: "50%",
          background: `radial-gradient(circle at 34% 28%, #fff7 0 12%, ${money.color} 24%, ${money.accent} 72%, #5f4522 100%)`,
          border: `${Math.max(3, Math.round(diameter / 16))}px solid ${money.accent}`,
          boxShadow: "inset -8px -10px 16px rgba(0,0,0,0.18), inset 5px 5px 8px rgba(255,255,255,0.45), 0 5px 0 rgba(0,0,0,0.25)",
          display: "grid",
          placeItems: "center",
          position: "relative",
          animation: animated ? "coin-spin 3s linear infinite" : undefined,
          transformStyle: "preserve-3d",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: "74%",
            height: "74%",
            borderRadius: "50%",
            border: "2px dashed rgba(0,0,0,0.22)",
            display: "grid",
            placeItems: "center",
            color: money.textColor,
            fontFamily: "Fredoka One, cursive",
            lineHeight: 1,
            textAlign: "center",
          }}
        >
          <span style={{ fontSize: diameter < 60 ? "0.72rem" : "0.95rem" }}>{money.shortLabel}</span>
        </div>
      </div>
    );
  }

  const dimensions = noteSizes[size];
  const image = side === "back" ? money.imageBack : money.imageFront;

  return (
    <div
      aria-label={`${money.label} ${side === "back" ? "belakang" : "depan"}`}
      style={{
        width: dimensions.width,
        height: dimensions.height,
        borderRadius: 8,
        border: "2px solid rgba(0,0,0,0.28)",
        overflow: "hidden",
        background: `linear-gradient(135deg, ${money.color}, ${money.accent})`,
        boxShadow: "0 5px 0 rgba(0,0,0,0.25), 0 8px 16px rgba(0,0,0,0.2)",
        position: "relative",
        flexShrink: 0,
      }}
    >
      {image && !imageFailed ? (
        <img
          src={image}
          alt={`${money.label} ${side === "back" ? "belakang" : "depan"}`}
          onError={() => setImageFailed(true)}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      ) : (
        <div
          style={{
            width: "100%",
            height: "100%",
            padding: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "#fff",
            fontFamily: "Fredoka One, cursive",
            textShadow: "1px 1px 0 rgba(0,0,0,0.35)",
          }}
        >
          <span style={{ fontSize: size === "tiny" ? "0.62rem" : "0.78rem" }}>BANK INDONESIA</span>
          <span style={{ fontSize: size === "tiny" ? "0.95rem" : "1.15rem" }}>{money.label}</span>
        </div>
      )}
    </div>
  );
}
