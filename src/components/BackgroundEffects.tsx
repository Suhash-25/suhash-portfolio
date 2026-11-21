import React, { useEffect, useRef } from 'react';

interface BackgroundEffectsProps {
  theme: 'dark' | 'light';
  isMeteorShowerActive: boolean;
}

export const BackgroundEffects: React.FC<BackgroundEffectsProps> = ({ theme, isMeteorShowerActive }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const isDark = theme === 'dark';

    // Particles configuration
    const particleCount = Math.min(Math.floor((width * height) / 9500), 95);
    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      baseAlpha: number;
      twinkleSpeed: number;
      twinklePhase: number;
      color: string;
    }[] = [];

    // Colors tailored for Dark vs Light mode
    const lightPalette = [
      '#2563eb', // Royal Blue
      '#0284c7', // Sky Cyan
      '#4f46e5', // Indigo
      '#0891b2', // Teal
      '#d97706', // Amber Sunbeam
    ];

    const darkPalette = [
      '#e2e8f0', // Slate 200
      '#93c5fd', // Light Blue
      '#cbd5e1', // Slate 300
      '#fde047', // Solar Gold
      '#38bdf8', // Cyan
    ];

    const currentPalette = isDark ? darkPalette : lightPalette;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: isDark ? Math.random() * 1.6 + 0.9 : Math.random() * 2.2 + 1.6,
        baseAlpha: isDark ? Math.random() * 0.5 + 0.35 : Math.random() * 0.4 + 0.55,
        twinkleSpeed: Math.random() * 0.025 + 0.015,
        twinklePhase: Math.random() * Math.PI * 2,
        color: currentPalette[Math.floor(Math.random() * currentPalette.length)],
      });
    }

    // Meteorites / Solar Streaks
    interface Meteor {
      x: number;
      y: number;
      length: number;
      speed: number;
      angle: number;
      alpha: number;
      color: string;
      glowColor: string;
    }

    const meteors: Meteor[] = [];

    const spawnMeteor = (isShower: boolean = false) => {
      const angle = Math.PI / 4 + (Math.random() - 0.5) * 0.2; // ~45 degrees
      const meteorColorsDark = ['#FDE047', '#38BDF8', '#FFFFFF', '#60A5FA'];
      const meteorColorsLight = ['#2563EB', '#0284C7', '#D97706', '#4F46E5'];
      const chosenColor = isDark
        ? meteorColorsDark[Math.floor(Math.random() * meteorColorsDark.length)]
        : meteorColorsLight[Math.floor(Math.random() * meteorColorsLight.length)];

      meteors.push({
        x: Math.random() * (width + 300) - 150,
        y: -60,
        length: isShower ? Math.random() * 110 + 80 : Math.random() * 70 + 50,
        speed: Math.random() * 10 + 14,
        angle,
        alpha: 1,
        color: chosenColor,
        glowColor: isDark ? '#38BDF8' : '#2563EB',
      });
    };

    let meteorSpawnCounter = 0;
    let ambientShootingStarTimer = 0;
    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Periodic ambient shooting star (happens in both light and dark mode so the background is always lively!)
      ambientShootingStarTimer++;
      if (ambientShootingStarTimer > 160) {
        spawnMeteor(false);
        ambientShootingStarTimer = 0;
      }

      // High-intensity shower trigger
      if (isMeteorShowerActive) {
        meteorSpawnCounter++;
        if (meteorSpawnCounter % 6 === 0) {
          spawnMeteor(true);
        }
      }

      // Render drifting celestial nodes & constellation lines
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        p.twinklePhase += p.twinkleSpeed;
        const currentAlpha = Math.max(0.2, p.baseAlpha + Math.sin(p.twinklePhase) * 0.3);

        // Draw particle node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = currentAlpha;
        ctx.fill();

        // Subtle glowing halo around larger particles
        if (p.radius > 2.0) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = currentAlpha * 0.25;
          ctx.fill();
        }

        ctx.globalAlpha = 1.0;

        // Connect with nearby particles (Constellation mesh)
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const maxDist = isDark ? 120 : 135;
          if (dist < maxDist) {
            const lineOpacity = isDark
              ? 0.12 * (1 - dist / maxDist)
              : 0.35 * (1 - dist / maxDist); // Significantly higher contrast in light mode!

            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = isDark ? `rgba(148, 163, 184, ${lineOpacity})` : `rgba(37, 99, 235, ${lineOpacity})`;
            ctx.lineWidth = isDark ? 0.8 : 1.2;
            ctx.stroke();
          }
        }

        // Mouse connection line (Interactive cursor illumination)
        const mdx = p.x - mouseX;
        const mdy = p.y - mouseY;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 150) {
          const mouseOpacity = isDark
            ? 0.25 * (1 - mdist / 150)
            : 0.55 * (1 - mdist / 150);

          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouseX, mouseY);
          ctx.strokeStyle = isDark ? `rgba(203, 213, 225, ${mouseOpacity})` : `rgba(37, 99, 235, ${mouseOpacity})`;
          ctx.lineWidth = isDark ? 1.2 : 1.6;
          ctx.stroke();
        }
      }

      // Render Meteorites / Celestial Streaks
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.x += Math.cos(m.angle) * m.speed;
        m.y += Math.sin(m.angle) * m.speed;
        m.alpha -= 0.009;

        const tailX = m.x - Math.cos(m.angle) * m.length;
        const tailY = m.y - Math.sin(m.angle) * m.length;

        const grad = ctx.createLinearGradient(m.x, m.y, tailX, tailY);
        grad.addColorStop(0, isDark ? `rgba(255, 255, 255, ${m.alpha})` : `${m.color}`);
        grad.addColorStop(0.3, isDark ? `rgba(253, 224, 71, ${m.alpha * 0.9})` : `rgba(37, 99, 235, ${m.alpha * 0.85})`);
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = grad;
        ctx.lineWidth = isDark ? 2.5 : 3.0;
        ctx.lineCap = 'round';
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(m.x, m.y, isDark ? 3.0 : 3.5, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? `rgba(255, 255, 255, ${m.alpha})` : `${m.color}`;
        ctx.shadowColor = m.glowColor;
        ctx.shadowBlur = isDark ? 12 : 8;
        ctx.fill();
        ctx.shadowBlur = 0;

        if (m.y > height + 100 || m.x > width + 100 || m.alpha <= 0) {
          meteors.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme, isMeteorShowerActive]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden transition-colors duration-500">
      {theme === 'dark' ? (
        <>
          {/* Deep twilight nocturnal gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F19] via-[#0D1424] to-[#0B0F19]" />
          {/* Gentle cosmic dust */}
          <div className="absolute inset-0 bg-celestial-dust opacity-35" />
        </>
      ) : (
        <>
          {/* Crisp, elegant daylight sky background */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#F8FAFC] via-[#EDF2F7] to-[#F1F5F9]" />
          {/* Blueprint Engineering Paper dot grid */}
          <div className="absolute inset-0 bg-[radial-gradient(#64748b_1.2px,transparent_1.2px)] [background-size:24px_24px] opacity-30" />
        </>
      )}

      {/* Shared animated canvas with full opacity and high visibility */}
      <canvas ref={canvasRef} className="absolute inset-0 opacity-100" />
    </div>
  );
};
