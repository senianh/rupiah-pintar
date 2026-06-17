interface Props {
  onBack: () => void;
}

export function BelajarRupiahScreen({ onBack }: Props) {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center gap-6"
      style={{
        background:
          "linear-gradient(180deg, #1E90FF 0%, #87CEEB 40%, #C1E8FF 75%, #E8F7FF 100%)",
      }}
    >
      <h1
        style={{
          fontSize: "2.5rem",
          color: "#FFD93D",
          fontFamily: "Fredoka One, cursive",
        }}
      >
        📚 Belajar Rupiah
      </h1>

      <iframe
        width="800"
        height="450"
        src="https://www.youtube.com/embed/ex3LfZu85UU"
        title="Belajar Rupiah"
        allowFullScreen
        style={{
          borderRadius: "20px",
          border: "5px solid #FFD93D",
        }}
      />

      <button
        onClick={onBack}
        style={{
          padding: "12px 24px",
          background: "#4CAF50",
          color: "white",
          borderRadius: "12px",
          border: "none",
          cursor: "pointer",
          fontSize: "1.1rem",
          fontWeight: "bold",
        }}
      >
        🎮 Mulai Bermain
      </button>
    </div>
  );
}