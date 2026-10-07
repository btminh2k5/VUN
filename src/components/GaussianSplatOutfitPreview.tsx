import React, { useEffect, useRef } from 'react';
import { Box, MousePointer2 } from 'lucide-react';

interface GaussianSplatOutfitPreviewProps {
  baseColor: string;
  trimColor: string;
  accessoryColors: string[];
  accessoryNames: string[];
}

interface SplatPoint {
  x: number;
  y: number;
  z: number;
  size: number;
  color: string;
  alpha: number;
}

function seededRandom(seed: number) {
  let value = seed >>> 0;
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

function cloud(count: number, center: [number, number, number], radius: [number, number, number], color: string, seed: number): SplatPoint[] {
  const random = seededRandom(seed);
  return Array.from({ length: count }, () => {
    const angle = random() * Math.PI * 2;
    const radial = Math.sqrt(random());
    return {
      x: center[0] + Math.cos(angle) * radial * radius[0],
      y: center[1] + (random() * 2 - 1) * radius[1],
      z: center[2] + Math.sin(angle) * radial * radius[2],
      size: 2.4 + random() * 4.8,
      color,
      alpha: 0.18 + random() * 0.42,
    };
  });
}

function buildOutfitSplats(baseColor: string, trimColor: string, accessoryColors: string[]): SplatPoint[] {
  const points = [
    ...cloud(170, [0, -0.95, 0], [0.24, 0.25, 0.2], '#d6a27d', 11),
    ...cloud(440, [0, -0.15, 0], [0.52, 0.72, 0.28], baseColor, 23),
    ...cloud(420, [0, 0.86, 0], [0.88, 0.65, 0.36], baseColor, 37),
    ...cloud(120, [-0.49, -0.1, 0], [0.18, 0.7, 0.18], trimColor, 43),
    ...cloud(120, [0.49, -0.1, 0], [0.18, 0.7, 0.18], trimColor, 47),
  ];

  accessoryColors.forEach((color, index) => {
    const positions: Array<[number, number, number]> = [[0, -1.27, 0.02], [0.62, 0.48, 0.05], [-0.62, 0.48, 0.05], [0, 1.48, 0.06]];
    points.push(...cloud(100, positions[index % positions.length], [0.25, 0.16, 0.14], color, 71 + index * 13));
  });
  return points;
}

export const GaussianSplatOutfitPreview: React.FC<GaussianSplatOutfitPreviewProps> = ({
  baseColor,
  trimColor,
  accessoryColors,
  accessoryNames,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotationRef = useRef(0.25);
  const dragRef = useRef<{ active: boolean; x: number }>({ active: false, x: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    const splats = buildOutfitSplats(baseColor, trimColor, accessoryColors);
    let frame = 0;
    let disposed = false;

    const render = () => {
      if (disposed) return;
      const bounds = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.round(bounds.width * ratio));
      const height = Math.max(1, Math.round(bounds.height * ratio));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      if (!dragRef.current.active) rotationRef.current += 0.0025;
      const angle = rotationRef.current;
      const sin = Math.sin(angle);
      const cos = Math.cos(angle);
      const projected = splats.map((point) => {
        const x = point.x * cos - point.z * sin;
        const z = point.x * sin + point.z * cos;
        const perspective = 1 / (1 + (z + 2.8) * 0.12);
        return { ...point, px: width / 2 + x * height * 0.25 * perspective, py: height * 0.46 + point.y * height * 0.25 * perspective, z, perspective };
      }).sort((a, b) => b.z - a.z);

      context.clearRect(0, 0, width, height);
      const backdrop = context.createRadialGradient(width / 2, height * 0.45, 0, width / 2, height * 0.45, height * 0.72);
      backdrop.addColorStop(0, '#fffaf0');
      backdrop.addColorStop(1, '#e7e2d8');
      context.fillStyle = backdrop;
      context.fillRect(0, 0, width, height);

      projected.forEach((point) => {
        const radius = point.size * ratio * point.perspective;
        const gradient = context.createRadialGradient(point.px, point.py, 0, point.px, point.py, radius);
        gradient.addColorStop(0, `${point.color}cc`);
        gradient.addColorStop(0.45, `${point.color}70`);
        gradient.addColorStop(1, `${point.color}00`);
        context.globalAlpha = point.alpha;
        context.fillStyle = gradient;
        context.beginPath();
        context.ellipse(point.px, point.py, radius * 1.45, radius, 0, 0, Math.PI * 2);
        context.fill();
      });
      context.globalAlpha = 1;
      frame = requestAnimationFrame(render);
    };

    frame = requestAnimationFrame(render);
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
    };
  }, [baseColor, trimColor, accessoryColors.join('|')]);

  return (
    <section className="overflow-hidden rounded-3xl border border-stone-700 bg-stone-950 text-white">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
        <div>
          <p className="flex items-center gap-2 text-sm font-extrabold"><Box className="h-4 w-4 text-[#ffc21c]" /> Phối đồ 3D Gaussian Splatting</p>
          <p className="mt-1 text-xs text-white/55">Bản dựng point-splat tương tác từ áo và phụ kiện đã chọn.</p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-bold text-white/70"><MousePointer2 className="h-3 w-3" /> Kéo để xoay</span>
      </div>
      <canvas
        ref={canvasRef}
        className="h-[420px] w-full cursor-grab touch-none active:cursor-grabbing"
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId);
          dragRef.current = { active: true, x: event.clientX };
        }}
        onPointerMove={(event) => {
          if (!dragRef.current.active) return;
          rotationRef.current += (event.clientX - dragRef.current.x) * 0.012;
          dragRef.current.x = event.clientX;
        }}
        onPointerUp={() => { dragRef.current.active = false; }}
        aria-label="Bản dựng phối đồ 3D Gaussian Splatting"
      />
      <div className="flex flex-wrap gap-2 border-t border-white/10 px-5 py-4">
        {accessoryNames.map((name) => <span key={name} className="rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-semibold text-white/75">{name}</span>)}
      </div>
    </section>
  );
};
