import React, { useRef, useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

interface MiniSuhash3DProps {
  charState: 'standing' | 'running';
  runSpeed: number;
  facingAngle: number; // in radians (-PI to PI)
  isWaving: boolean;
  onCharacterClick: () => void;
  scale?: number;
}

export const MiniSuhash3D: React.FC<MiniSuhash3DProps> = ({
  charState,
  runSpeed,
  facingAngle,
  isWaving,
  onCharacterClick,
  scale = 1.0,
}) => {
  const [smoothAngle, setSmoothAngle] = useState(0);
  const [stepPhase, setStepPhase] = useState(0);
  const [idlePhase, setIdlePhase] = useState(0);

  const angleRef = useRef(0);
  const targetAngleRef = useRef(facingAngle);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    targetAngleRef.current = facingAngle;
  }, [facingAngle]);

  // Smooth 360-degree rotation and natural limb/bounce clock
  useEffect(() => {
    let prevTime = performance.now();

    const loop = (time: number) => {
      const dt = Math.min((time - prevTime) / 1000, 0.1);
      prevTime = time;

      // Shortest path angular interpolation (360 degrees)
      let diff = targetAngleRef.current - angleRef.current;
      while (diff < -Math.PI) diff += Math.PI * 2;
      while (diff > Math.PI) diff -= Math.PI * 2;

      // Gentle smooth turn rate (~0.5s to turn around)
      angleRef.current += diff * 0.08;
      setSmoothAngle(angleRef.current);

      if (charState === 'running') {
        // Slow, gentle cartoon jogging rhythm
        setStepPhase((prev) => prev + Math.max(runSpeed, 1.2) * dt * 4.2);
      } else {
        // Natural calm breathing rhythm
        setIdlePhase((prev) => prev + dt * 2.2);
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [charState, runSpeed]);

  // Convert radians to degrees
  const angleDeg = (smoothAngle * 180) / Math.PI;

  // Running physics: gentle vertical bounce and forward lean
  const isRunning = charState === 'running';
  const runBounce = isRunning ? Math.abs(Math.sin(stepPhase)) * 5.5 : 0;
  const idleBob = !isRunning ? Math.sin(idlePhase) * 2.2 : 0;

  // Forward tilt into movement direction
  const tiltX = isRunning ? 7 : 0;
  // Subtle banking roll when turning
  const rollZ = isRunning ? Math.max(-5, Math.min(5, Math.sin(smoothAngle) * 4)) : 0;

  return (
    <div
      onClick={onCharacterClick}
      className="relative cursor-pointer select-none group flex flex-col items-center"
      style={{
        width: '130px',
        height: '180px',
        transform: `scale(${scale})`,
        transformOrigin: 'bottom center',
        perspective: '900px',
      }}
      title="Mini Suhash - 3D Companion (Tap to interact)"
    >
      {/* 3D Rotating Character Container (360 Degree preserve-3d) */}
      <div
        className="relative w-full h-full transition-transform duration-75 ease-out"
        style={{
          transformStyle: 'preserve-3d',
          transform: `translate3d(0, ${-runBounce + idleBob}px, 0) rotateY(${angleDeg}deg) rotateX(${tiltX}deg) rotateZ(${rollZ}deg)`,
        }}
      >
        {/* FRONT FACE: The EXACT Cartoon Character from the photo */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'translateZ(5px)',
          }}
        >
          <img
            src="/images/mini-suhash.png"
            alt="Mini Suhash Front"
            className="w-full h-full object-contain filter drop-shadow-[0_10px_16px_rgba(0,0,0,0.35)]"
            draggable={false}
          />

          {/* Twinkling Star Sparkle on Waving Hand (Only when standing/waving) */}
          {isWaving && (
            <div className="absolute top-8 right-2 text-amber-400 dark:text-amber-300 animate-pulse pointer-events-none">
              <Sparkles className="w-4 h-4 drop-shadow" />
            </div>
          )}
        </div>

        {/* 3D DEPTH SLICES (Volumetric Extrusion Layers for 360° Realism) */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none opacity-40 filter blur-[0.6px]"
          style={{
            transform: 'translateZ(2px)',
          }}
        >
          <img
            src="/images/mini-suhash.png"
            alt="Mini Suhash Depth 1"
            className="w-full h-full object-contain brightness-90"
            draggable={false}
          />
        </div>
        <div
          className="absolute inset-0 w-full h-full pointer-events-none opacity-30 filter blur-[0.8px]"
          style={{
            transform: 'translateZ(-2px)',
          }}
        >
          <img
            src="/images/mini-suhash-back.png"
            alt="Mini Suhash Depth 2"
            className="w-full h-full object-contain brightness-85"
            draggable={false}
          />
        </div>

        {/* BACK FACE: Matching 360° Rear View (Suit, Hair Fade, Trousers) */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg) translateZ(5px)',
          }}
        >
          <img
            src="/images/mini-suhash-back.png"
            alt="Mini Suhash Back"
            className="w-full h-full object-contain filter drop-shadow-[0_10px_16px_rgba(0,0,0,0.35)]"
            draggable={false}
          />
        </div>
      </div>

      {/* 3D Ground Contact Shadow */}
      <div
        className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-3 bg-black/30 dark:bg-black/60 rounded-full blur-[2px] transition-all duration-100 pointer-events-none"
        style={{
          transform: `scale(${1 - runBounce / 14})`,
          opacity: 0.35 + (1 - runBounce / 10) * 0.35,
        }}
      />
    </div>
  );
};
