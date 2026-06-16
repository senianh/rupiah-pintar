import { useState, useCallback } from "react";
import { WelcomeScreen } from "./components/WelcomeScreen";
import { LevelSelectScreen } from "./components/LevelSelectScreen";
import { MengenalRupiahScreen } from "./components/MengenalRupiahScreen";
import { TukarUangScreen } from "./components/TukarUangScreen";
import { KuisRupiahScreen } from "./components/KuisRupiahScreen";
import { BayarBelanjaScreen } from "./components/BayarBelanjaScreen";
import { GameOverModal } from "./components/GameOverModal";

type Screen = "welcome" | "levels" | "mengenal" | "tukar" | "kuis" | "bayar";

interface GameState {
  playerName: string;
  avatar: "boy" | "girl";
  highscore: number;
  musicOn: boolean;
  currentScore: number;
  lastStars: number;
  lastGameType: "win" | "lose";
  currentLevel: 1 | 2 | 3 | 4;
  showGameOver: boolean;
}

const LEVEL_NAMES: Record<1 | 2 | 3 | 4, string> = {
  1: "Mengenal Rupiah",
  2: "Tukar Uang",
  3: "Kuis Rupiah",
  4: "Kasir Belanja",
};

export default function App() {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [game, setGame] = useState<GameState>({
    playerName: "Pemain",
    avatar: "boy",
    highscore: 0,
    musicOn: true,
    currentScore: 0,
    lastStars: 3,
    lastGameType: "win",
    currentLevel: 1,
    showGameOver: false,
  });

  const handleStart = useCallback((name: string, avatar: "boy" | "girl") => {
    setGame((g) => ({ ...g, playerName: name, avatar }));
    setScreen("levels");
  }, []);

  const handleSelectLevel = useCallback((level: 1 | 2 | 3 | 4) => {
    const screenMap: Record<1 | 2 | 3 | 4, Screen> = {
      1: "mengenal",
      2: "tukar",
      3: "kuis",
      4: "bayar",
    };
    setGame((g) => ({ ...g, currentLevel: level, currentScore: 0 }));
    setScreen(screenMap[level]);
  }, []);

  const handleComplete = useCallback((score: number, stars = 3, type: "win" | "lose" = "win") => {
    setGame((g) => ({
      ...g,
      currentScore: score,
      lastStars: stars,
      lastGameType: type,
      highscore: Math.max(g.highscore, score),
      showGameOver: true,
    }));
  }, []);

  const handleGameOverPlayAgain = useCallback(() => {
    setGame((g) => ({ ...g, showGameOver: false, currentScore: 0 }));
    handleSelectLevel(game.currentLevel);
  }, [game.currentLevel, handleSelectLevel]);

  const handleGameOverExit = useCallback(() => {
    setGame((g) => ({ ...g, showGameOver: false, currentScore: 0 }));
    setScreen("levels");
  }, []);

  const handleBack = useCallback(() => {
    setGame((g) => ({ ...g, showGameOver: false }));
    setScreen("levels");
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
        fontFamily: "'Nunito', sans-serif",
      }}
    >
      {/* Screens */}
      {screen === "welcome" && (
        <WelcomeScreen onStart={handleStart} />
      )}

      {screen === "levels" && (
        <LevelSelectScreen
          playerName={game.playerName}
          avatar={game.avatar}
          highscore={game.highscore}
          musicOn={game.musicOn}
          onToggleMusic={() => setGame((g) => ({ ...g, musicOn: !g.musicOn }))}
          onSelectLevel={handleSelectLevel}
        />
      )}

      {screen === "mengenal" && (
        <MengenalRupiahScreen
          avatar={game.avatar}
          onBack={handleBack}
          onComplete={(score) => handleComplete(score, 3, "win")}
        />
      )}

      {screen === "tukar" && (
        <TukarUangScreen
          avatar={game.avatar}
          onBack={handleBack}
          onComplete={(score) => handleComplete(score, score >= 500 ? 3 : 2, "win")}
        />
      )}

      {screen === "kuis" && (
        <KuisRupiahScreen
          avatar={game.avatar}
          onBack={handleBack}
          onGameOver={(score, stars, type) => handleComplete(score, stars, type)}
        />
      )}

      {screen === "bayar" && (
        <BayarBelanjaScreen
          avatar={game.avatar}
          onBack={handleBack}
          onComplete={(score) => handleComplete(score, score >= 400 ? 3 : 2, "win")}
        />
      )}

      {/* Game Over Modal — overlays any screen */}
      {game.showGameOver && (
        <GameOverModal
          type={game.lastGameType}
          score={game.currentScore}
          stars={game.lastStars}
          playerName={game.playerName}
          avatar={game.avatar}
          levelName={LEVEL_NAMES[game.currentLevel]}
          onPlayAgain={handleGameOverPlayAgain}
          onExit={handleGameOverExit}
        />
      )}
    </div>
  );
}
