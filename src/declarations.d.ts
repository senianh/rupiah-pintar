declare module 'canvas-confetti' {
  interface ConfettiOptions {
    particleCount?: number;
    spread?: number;
    origin?: { x?: number; y?: number };
    colors?: string[];
    scalar?: number;
    gravity?: number;
    drift?: number;
    ticks?: number;
    angle?: number;
    startVelocity?: number;
    decay?: number;
    shapes?: string[];
  }
  function confetti(options?: ConfettiOptions): Promise<null> | null;
  export = confetti;
}

declare module "*.mp3" {
  const src: string;
  export default src;
}
