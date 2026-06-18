import { FloatingClouds } from "./shared/FloatingDecor";

interface Props {
  onBack: () => void;
}

export function BelajarRupiahScreen({ onBack }: Props) {
  return (
    <div
      className="relative w-full h-full flex flex-col overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #1E90FF 0%, #87CEEB 40%, #C1E8FF 100%)",
      }}
    >
      <FloatingClouds />

      <div
        className="relative z-20 flex items-center justify-between px-6 py-3"
        style={{
          background:
            "linear-gradient(180deg, rgba(26,35,126,0.92) 0%, rgba(26,35,126,0.75) 100%)",
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
          📚 Video Belajar Rupiah 📚
        </h2>

        <div style={{ width: 110 }} className="hidden md:block" />
      </div>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-6 gap-6 overflow-y-auto">
        <div
          className="game-card animate-pop-in shadow-2xl"
          style={{
            background: "#FFF",
            padding: "12px",
            borderRadius: "24px",
            border: "5px solid #FFD93D",
            maxWidth: "100%",
            maxHeight: "calc(100% - 80px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <iframe
            className="w-full aspect-video"
            style={{
              width: "min(800px, 75vw)",
              height: "auto",
              aspectRatio: "16/9",
              borderRadius: "16px",
            }}
            src="https://www.youtube.com/embed/ex3LfZu85UU"
            title="Belajar Rupiah"
            allowFullScreen
          />
        </div>

        <button
          onClick={onBack}
          className="game-btn-green animate-pop-in"
          style={{
            padding: "14px 48px",
            fontSize: "1.25rem",
            boxShadow: "0 6px 0 #1B5E20, 0 10px 20px rgba(0,0,0,0.3)",
          }}
        >
          🎮 Mulai Bermain!
        </button>
      </div>
    </div>
  );
}