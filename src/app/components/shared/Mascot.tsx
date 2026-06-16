interface MascotProps {
  avatar: "boy" | "girl";
  size?: number;
  className?: string;
  animate?: boolean;
}

export function MascotAvatar({ avatar, size = 120, className = "", animate = true }: MascotProps) {
  const isBoy = avatar === "boy";

  return (
    <div
      className={`${animate ? "animate-bobble" : ""} ${className}`}
      style={{ width: size, height: size * 1.3, flexShrink: 0 }}
    >
      {isBoy ? <BoyMascot size={size} /> : <GirlMascot size={size} />}
    </div>
  );
}

function BoyMascot({ size }: { size: number }) {
  const s = size;
  return (
    <svg width={s} height={s * 1.3} viewBox="0 0 100 130" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Body */}
      <rect x="28" y="68" width="44" height="42" rx="12" fill="#4FC3F7" stroke="#0277BD" strokeWidth="2.5" />
      {/* Arms */}
      <rect x="10" y="70" width="18" height="10" rx="5" fill="#4FC3F7" stroke="#0277BD" strokeWidth="2" />
      <rect x="72" y="70" width="18" height="10" rx="5" fill="#4FC3F7" stroke="#0277BD" strokeWidth="2" />
      {/* Legs */}
      <rect x="32" y="100" width="14" height="26" rx="7" fill="#1565C0" stroke="#0D47A1" strokeWidth="2" />
      <rect x="54" y="100" width="14" height="26" rx="7" fill="#1565C0" stroke="#0D47A1" strokeWidth="2" />
      {/* Shoes */}
      <ellipse cx="39" cy="126" rx="11" ry="6" fill="#212121" />
      <ellipse cx="61" cy="126" rx="11" ry="6" fill="#212121" />
      {/* Neck */}
      <rect x="42" y="60" width="16" height="12" rx="4" fill="#FFCC80" />
      {/* Head */}
      <circle cx="50" cy="46" r="28" fill="#FFCC80" stroke="#E65100" strokeWidth="2.5" />
      {/* Hair */}
      <path d="M22 36 Q26 14 50 16 Q74 14 78 36 Q70 22 50 24 Q30 22 22 36Z" fill="#5D4037" />
      {/* Eyes */}
      <circle cx="40" cy="46" r="5.5" fill="white" />
      <circle cx="60" cy="46" r="5.5" fill="white" />
      <circle cx="41" cy="47" r="3.2" fill="#1A1A2E" />
      <circle cx="61" cy="47" r="3.2" fill="#1A1A2E" />
      <circle cx="42.5" cy="45.5" r="1.2" fill="white" />
      <circle cx="62.5" cy="45.5" r="1.2" fill="white" />
      {/* Smile */}
      <path d="M40 56 Q50 64 60 56" stroke="#E65100" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* Rosy cheeks */}
      <circle cx="32" cy="52" r="5" fill="#FF8A80" opacity="0.5" />
      <circle cx="68" cy="52" r="5" fill="#FF8A80" opacity="0.5" />
      {/* School bag strap */}
      <rect x="18" y="72" width="6" height="36" rx="3" fill="#FF7043" stroke="#E64A19" strokeWidth="1.5" />
      {/* Rupiah coin in hand */}
      <circle cx="8" cy="76" r="7" fill="#FFD93D" stroke="#F57F17" strokeWidth="2" />
      <text x="8" y="79" textAnchor="middle" fontSize="5" fill="#E65100" fontWeight="bold">Rp</text>
    </svg>
  );
}

function GirlMascot({ size }: { size: number }) {
  const s = size;
  return (
    <svg width={s} height={s * 1.3} viewBox="0 0 100 130" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Dress */}
      <path d="M26 68 Q20 90 22 110 L78 110 Q80 90 74 68 Z" fill="#F48FB1" stroke="#C2185B" strokeWidth="2.5" />
      {/* Body top */}
      <rect x="30" y="66" width="40" height="28" rx="8" fill="#F48FB1" stroke="#C2185B" strokeWidth="2.5" />
      {/* Arms */}
      <rect x="10" y="68" width="20" height="10" rx="5" fill="#FFCC80" stroke="#E65100" strokeWidth="2" />
      <rect x="70" y="68" width="20" height="10" rx="5" fill="#FFCC80" stroke="#E65100" strokeWidth="2" />
      {/* Legs */}
      <rect x="33" y="106" width="13" height="22" rx="6" fill="#FFCC80" stroke="#E65100" strokeWidth="2" />
      <rect x="54" y="106" width="13" height="22" rx="6" fill="#FFCC80" stroke="#E65100" strokeWidth="2" />
      {/* Shoes */}
      <ellipse cx="39" cy="127" rx="11" ry="5" fill="#E91E63" />
      <ellipse cx="60" cy="127" rx="11" ry="5" fill="#E91E63" />
      {/* Neck */}
      <rect x="42" y="58" width="16" height="12" rx="4" fill="#FFCC80" />
      {/* Head */}
      <circle cx="50" cy="44" r="28" fill="#FFCC80" stroke="#E65100" strokeWidth="2.5" />
      {/* Hair */}
      <path d="M22 32 Q24 10 50 12 Q76 10 78 32 Q72 18 50 20 Q28 18 22 32Z" fill="#4A148C" />
      <path d="M22 32 Q18 50 22 68 Q26 60 28 52" fill="#4A148C" />
      <path d="M78 32 Q82 50 78 68 Q74 60 72 52" fill="#4A148C" />
      {/* Hair pigtails */}
      <circle cx="22" cy="34" r="8" fill="#9C27B0" stroke="#6A1B9A" strokeWidth="2" />
      <circle cx="78" cy="34" r="8" fill="#9C27B0" stroke="#6A1B9A" strokeWidth="2" />
      {/* Hair bow */}
      <path d="M38 14 Q50 8 62 14 Q50 20 38 14Z" fill="#FF6B9D" stroke="#C2185B" strokeWidth="1.5" />
      <circle cx="50" cy="14" r="4" fill="#FF4081" />
      {/* Eyes */}
      <circle cx="40" cy="44" r="5.5" fill="white" />
      <circle cx="60" cy="44" r="5.5" fill="white" />
      <circle cx="41" cy="45" r="3.2" fill="#1A1A2E" />
      <circle cx="61" cy="45" r="3.2" fill="#1A1A2E" />
      <circle cx="42.5" cy="43.5" r="1.2" fill="white" />
      <circle cx="62.5" cy="43.5" r="1.2" fill="white" />
      {/* Eyelashes */}
      <line x1="36" y1="40" x2="34" y2="37" stroke="#1A1A2E" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="40" y1="39" x2="40" y2="36" stroke="#1A1A2E" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="44" y1="40" x2="46" y2="37" stroke="#1A1A2E" strokeWidth="1.5" strokeLinecap="round" />
      {/* Smile */}
      <path d="M40 54 Q50 62 60 54" stroke="#E65100" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* Rosy cheeks */}
      <circle cx="32" cy="50" r="5" fill="#FF8A80" opacity="0.5" />
      <circle cx="68" cy="50" r="5" fill="#FF8A80" opacity="0.5" />
      {/* Book in hand */}
      <rect x="4" y="69" width="12" height="16" rx="2" fill="#FF7043" stroke="#E64A19" strokeWidth="1.5" />
      <line x1="10" y1="69" x2="10" y2="85" stroke="#E64A19" strokeWidth="1" />
    </svg>
  );
}

interface SpeechBubbleProps {
  text: string;
  direction?: "left" | "right";
  className?: string;
}

export function SpeechBubble({ text, direction = "left", className = "" }: SpeechBubbleProps) {
  return (
    <div
      className={`speech-bubble px-5 py-3 max-w-xs ${className}`}
      style={{
        fontFamily: "'Nunito', sans-serif",
        fontWeight: 700,
        fontSize: "0.95rem",
        lineHeight: "1.5",
        color: "#2D1B69",
        ...(direction === "right" ? {
          borderRadius: "20px",
        } : {}),
      }}
    >
      {text}
    </div>
  );
}

interface MascotWithBubbleProps {
  avatar: "boy" | "girl";
  bubbleText: string;
  mascotSize?: number;
  reverse?: boolean;
  className?: string;
}

export function MascotWithBubble({
  avatar,
  bubbleText,
  mascotSize = 110,
  reverse = false,
  className = "",
}: MascotWithBubbleProps) {
  return (
    <div className={`flex items-end gap-3 ${reverse ? "flex-row-reverse" : ""} ${className}`}>
      <MascotAvatar avatar={avatar} size={mascotSize} />
      <div className="mb-6">
        <SpeechBubble text={bubbleText} direction={reverse ? "right" : "left"} />
      </div>
    </div>
  );
}
