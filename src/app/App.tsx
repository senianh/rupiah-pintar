import { useState, useCallback, useEffect } from "react";
import { WelcomeScreen } from "./components/WelcomeScreen";
import { LevelSelectScreen } from "./components/LevelSelectScreen";
import { MengenalRupiahScreen } from "./components/MengenalRupiahScreen";
import { TukarUangScreen } from "./components/TukarUangScreen";
import { KuisRupiahScreen } from "./components/KuisRupiahScreen";
import { BayarBelanjaScreen } from "./components/BayarBelanjaScreen";
import { GameOverModal } from "./components/GameOverModal";
import { playSound, startBackgroundMusic, stopBackgroundMusic } from "./audioManager";

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
  playSession: number;
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
    playSession: 0,
  });

  useEffect(() => {
    return () => stopBackgroundMusic();
  }, []);

  useEffect(() => {
    if (screen === "levels" && game.musicOn) startBackgroundMusic();
    if (!game.musicOn || screen === "welcome") stopBackgroundMusic();
  }, [game.musicOn, screen]);

  const handleStart = useCallback((name: string, avatar: "boy" | "girl") => {
    setGame((g) => ({ ...g, playerName: name, avatar }));
    setScreen("levels");
    if (game.musicOn) startBackgroundMusic();
  }, [game.musicOn]);

  const handleToggleMusic = useCallback(() => {
    playSound("click", 0.45);
    setGame((g) => {
      if (g.musicOn) {
        stopBackgroundMusic();
      } else {
        startBackgroundMusic();
      }
      return { ...g, musicOn: !g.musicOn };
    });
  }, []);

  const handleSelectLevel = useCallback((level: 1 | 2 | 3 | 4) => {
    playSound("click");
    const screenMap: Record<1 | 2 | 3 | 4, Screen> = {
      1: "mengenal",
      2: "tukar",
      3: "kuis",
      4: "bayar",
    };
    setGame((g) => ({ ...g, currentLevel: level, currentScore: 0, playSession: g.playSession + 1 }));
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
    playSound("click");
    setGame((g) => ({ ...g, showGameOver: false, currentScore: 0 }));
    handleSelectLevel(game.currentLevel);
  }, [game.currentLevel, handleSelectLevel]);

  const handleGameOverExit = useCallback(() => {
    playSound("click");
    setGame((g) => ({ ...g, showGameOver: false, currentScore: 0 }));
    setScreen("levels");
  }, []);

  const handleBack = useCallback(() => {
    playSound("click");
    setGame((g) => ({ ...g, showGameOver: false }));
    setScreen("levels");
  }, []);

  const handleExitToWelcome = useCallback(() => {
    playSound("click");
    stopBackgroundMusic();
    setGame((g) => ({ ...g, showGameOver: false, currentScore: 0 }));
    setScreen("welcome");
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
          onToggleMusic={handleToggleMusic}
          onSelectLevel={handleSelectLevel}
          onExit={handleExitToWelcome}
        />
      )}

      {screen === "mengenal" && (
        <MengenalRupiahScreen
          key={`mengenal-${game.playSession}`}
          avatar={game.avatar}
          onBack={handleBack}
          onComplete={(score) => handleComplete(score, 3, "win")}
        />
      )}

      {screen === "tukar" && (
        <TukarUangScreen
          key={`tukar-${game.playSession}`}
          avatar={game.avatar}
          onBack={handleBack}
          onComplete={(score) => handleComplete(score, score >= 500 ? 3 : 2, "win")}
        />
      )}

      {screen === "kuis" && (
        <KuisRupiahScreen
          key={`kuis-${game.playSession}`}
          avatar={game.avatar}
          onBack={handleBack}
          onGameOver={(score, stars, type) => handleComplete(score, stars, type)}
        />
      )}

      {screen === "bayar" && (
        <BayarBelanjaScreen
          key={`bayar-${game.playSession}`}
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
