import bgmLoop from "../assets/audio/background-music.mp3";
import clickSound from "../assets/audio/click-sound.mp3";

export type SoundEffect = "click" | "correct" | "wrong" | "money" | "payment";

const sfxMap: Record<SoundEffect, string> = {
  click: clickSound,
  correct: clickSound,
  wrong: clickSound,
  money: clickSound,
  payment: clickSound,
};

let music: HTMLAudioElement | null = null;
let musicEnabled = true;

const getMusic = () => {
  if (!music) {
    music = new Audio(bgmLoop);
    music.loop = true;
    music.volume = 1;
    music.preload = "auto";
  }
  return music;
};

export const startBackgroundMusic = async () => {
  musicEnabled = true;
  const player = getMusic();
  try {
    await player.play();
  } catch {
    // Browsers may require a user gesture; the next click/toggle will retry.
  }
};

export const stopBackgroundMusic = () => {
  musicEnabled = false;
  if (!music) return;
  music.pause();
};

export const isBackgroundMusicEnabled = () => musicEnabled;

export const playSound = (effect: SoundEffect, volume = 0.7) => {
  const audio = new Audio(sfxMap[effect]);
  audio.volume = volume;
  audio.play().catch(() => undefined);
};
