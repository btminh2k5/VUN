import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Eye, EyeOff, Palette } from 'lucide-react';

interface CulturalAnimatedBackgroundProps {
  theme?: 'spring' | 'lotus' | 'royal';
}

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  color: string;
}

export const CulturalAnimatedBackground: React.FC<CulturalAnimatedBackgroundProps> = ({
  theme = 'spring'
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [animationsEnabled, setAnimationsEnabled] = useState<boolean>(true);
  const [activeTheme, setActiveTheme] = useState<'spring' | 'lotus' | 'royal'>(theme);

  useEffect(() => {
    if (!animationsEnabled) return;

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

    // Color palettes for petals
    const themeColors: Record<string, string[]> = {
      spring: ['#F472B6', '#FB7185', '#FDA4AF', '#FECDD3', '#FEE2E2'], // Hoa đào, hoa mai
      lotus: ['#F43F5E', '#FB7185', '#FBCFE8', '#FDF2F8', '#34D399'], // Cánh sen hồng & búp sen
      royal: ['#FBBF24', '#F59E0B', '#FDE68A', '#FEF3C7', '#CA8A04']  // Hoàng gia hoa văn vàng
    };

    const colors = themeColors[activeTheme] || themeColors.spring;

    // Create 32 delicate floating petals
    const petalCount = 32;
    const petals: Petal[] = [];

    for (let i = 0; i < petalCount; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 8 + 6,
        speedY: Math.random() * 0.8 + 0.4,
        speedX: Math.random() * 0.6 - 0.2,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 1.2,
        opacity: Math.random() * 0.4 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.01;

      petals.forEach((p) => {
        // Wind wave effect
        p.x += p.speedX + Math.sin(time + p.y * 0.005) * 0.6;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        // Wrap around boundaries
        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        // Draw delicate stylized petal
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;

        ctx.beginPath();
        // Petal shape curve
        ctx.moveTo(0, -p.size);
        ctx.bezierCurveTo(p.size * 0.8, -p.size * 0.4, p.size * 0.6, p.size * 0.6, 0, p.size);
        ctx.bezierCurveTo(-p.size * 0.6, p.size * 0.6, -p.size * 0.8, -p.size * 0.4, 0, -p.size);
        ctx.fill();

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [animationsEnabled, activeTheme]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Background Gradient Ambiance */}
      <div
        className={`absolute inset-0 transition-colors duration-1000 ${
          activeTheme === 'spring'
            ? 'bg-gradient-to-b from-stone-100/90 via-rose-50/20 to-amber-50/30'
            : activeTheme === 'lotus'
            ? 'bg-gradient-to-b from-stone-100/90 via-emerald-50/20 to-rose-50/20'
            : 'bg-gradient-to-b from-stone-100/90 via-amber-50/25 to-stone-100/80'
        }`}
      />

      {/* Floating Silk Ribbon Wave (CSS Animated) */}
      {animationsEnabled && (
        <div className="absolute inset-0 opacity-15 overflow-hidden">
          <div className="absolute -top-1/4 -left-1/4 w-[150%] h-[150%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-300/40 via-rose-300/20 to-transparent blur-3xl animate-pulse duration-10000" />
        </div>
      )}

      {/* Rotating Majestic Dong Son Bronze Drum Watermark (Họa tiết Trống Đồng Đông Sơn) */}
      <div className="absolute -top-32 -right-32 sm:w-[650px] sm:h-[650px] w-[380px] h-[380px] opacity-[0.06] text-amber-900 pointer-events-none">
        <svg
          viewBox="0 0 500 500"
          className={`w-full h-full fill-current ${animationsEnabled ? 'animate-spin-slow' : ''}`}
          style={{ animationDuration: '140s' }}
        >
          {/* Central sun rays */}
          <circle cx="250" cy="250" r="240" fill="none" stroke="currentColor" strokeWidth="3" />
          <circle cx="250" cy="250" r="220" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="6,4" />
          <circle cx="250" cy="250" r="190" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="250" cy="250" r="160" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="8,6" />
          <circle cx="250" cy="250" r="120" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="250" cy="250" r="80" fill="none" stroke="currentColor" strokeWidth="3" />
          <circle cx="250" cy="250" r="30" fill="currentColor" opacity="0.4" />

          {/* 14 Sun rays */}
          {[...Array(14)].map((_, i) => {
            const angle = (i * 360) / 14;
            return (
              <polygon
                key={i}
                points="250,170 245,245 255,245"
                transform={`rotate(${angle} 250 250)`}
                fill="currentColor"
              />
            );
          })}

          {/* Flying Bird Motifs (Chim Lạc bay ngược chiều kim đồng hồ) */}
          {[...Array(8)].map((_, i) => {
            const angle = (i * 360) / 8;
            return (
              <g key={i} transform={`rotate(${angle} 250 250) translate(250, 70)`}>
                <path
                  d="M -15 0 C -5 -8, 5 -8, 15 0 C 8 -2, -8 -2, -15 0 Z M 0 -5 L 12 -12 L 5 -3 Z"
                  fill="currentColor"
                />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Second Subtle Watermark in bottom left */}
      <div className="absolute -bottom-40 -left-40 sm:w-[550px] sm:h-[550px] w-[320px] h-[320px] opacity-[0.04] text-red-900 pointer-events-none">
        <svg
          viewBox="0 0 500 500"
          className={`w-full h-full fill-current ${animationsEnabled ? 'animate-spin-reverse-slow' : ''}`}
          style={{ animationDuration: '180s' }}
        >
          <circle cx="250" cy="250" r="230" fill="none" stroke="currentColor" strokeWidth="3" />
          <circle cx="250" cy="250" r="200" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4,6" />
          <circle cx="250" cy="250" r="140" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="250" cy="250" r="70" fill="none" stroke="currentColor" strokeWidth="2" />
          {[...Array(12)].map((_, i) => {
            const angle = (i * 360) / 12;
            return (
              <polygon
                key={i}
                points="250,185 246,245 254,245"
                transform={`rotate(${angle} 250 250)`}
                fill="currentColor"
              />
            );
          })}
        </svg>
      </div>

      {/* Canvas for falling spring blossom / lotus petals */}
      {animationsEnabled && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none"
        />
      )}

      {/* Interactive Floating Cultural Control Widget (Bật/Tắt chuyển động & Đổi bối cảnh) */}
      <div className="fixed bottom-4 right-4 z-40 pointer-events-auto flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-stone-200/90 shadow-sm text-xs">
        <button
          type="button"
          onClick={() => setAnimationsEnabled(!animationsEnabled)}
          className="flex items-center gap-1.5 text-stone-600 hover:text-stone-900 font-medium transition"
          title={animationsEnabled ? 'Tắt ảnh động văn hóa' : 'Bật ảnh động văn hóa'}
        >
          {animationsEnabled ? (
            <>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <Eye className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-[11px] hidden sm:inline">Hiệu ứng văn hóa: Bật</span>
            </>
          ) : (
            <>
              <EyeOff className="w-3.5 h-3.5 text-stone-400" />
              <span className="text-[11px] hidden sm:inline">Hiệu ứng: Tắt</span>
            </>
          )}
        </button>

        <span className="text-stone-300">|</span>

        {/* Theme pills */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setActiveTheme('spring')}
            className={`px-2 py-0.5 rounded-full text-[10px] font-semibold transition ${
              activeTheme === 'spring'
                ? 'bg-rose-100 text-rose-800'
                : 'text-stone-500 hover:text-stone-800'
            }`}
            title="Chủ đề: Hoa Đào Mùa Xuân"
          >
            🌸 Đào
          </button>
          <button
            type="button"
            onClick={() => setActiveTheme('lotus')}
            className={`px-2 py-0.5 rounded-full text-[10px] font-semibold transition ${
              activeTheme === 'lotus'
                ? 'bg-emerald-100 text-emerald-800'
                : 'text-stone-500 hover:text-stone-800'
            }`}
            title="Chủ đề: Đầm Sen Kinh Kỳ"
          >
            🪷 Sen
          </button>
          <button
            type="button"
            onClick={() => setActiveTheme('royal')}
            className={`px-2 py-0.5 rounded-full text-[10px] font-semibold transition ${
              activeTheme === 'royal'
                ? 'bg-amber-100 text-amber-800'
                : 'text-stone-500 hover:text-stone-800'
            }`}
            title="Chủ đề: Ánh Vàng Hoàng Cung"
          >
            👑 Cung Đình
          </button>
        </div>
      </div>
    </div>
  );
};
