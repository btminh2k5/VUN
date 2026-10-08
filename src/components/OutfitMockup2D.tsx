import React from 'react';
import { Image as ImageIcon, Layers3 } from 'lucide-react';

export interface MockupLayer {
  itemId: string;
  role: 'garment' | 'accessories' | 'footwear';
  imageUrl: string;
  zIndex: number;
  name?: string;
}

interface OutfitMockup2DProps {
  // Layer đến từ `mockup_2d` của FastAPI (hoặc được dựng lại từ lựa chọn của người dùng),
  // thứ tự vẽ theo zIndex do engine quyết định.
  layers: MockupLayer[];
  background?: string;
  width?: number;
  height?: number;
}

// Vị trí cho các layer phụ, xếp quanh trang phục chính theo đúng thứ tự zIndex.
const satellitePositions = [
  'right-[5%] top-[8%]',
  'right-[5%] top-[38%]',
  'left-[5%] bottom-[6%]',
  'right-[5%] bottom-[6%]',
  'left-[5%] top-[8%]',
  'left-[5%] top-[38%]',
];

const ROLE_LABELS: Record<MockupLayer['role'], string> = {
  garment: 'Trang phục',
  accessories: 'Phụ kiện',
  footwear: 'Giày dép',
};

export const OutfitMockup2D: React.FC<OutfitMockup2DProps> = ({
  layers,
  background = '#F5F2EA',
  width = 1080,
  height = 1350,
}) => {
  const ordered = [...layers].sort((a, b) => a.zIndex - b.zIndex);
  const base = ordered.find((layer) => layer.role === 'garment') || ordered[0];
  const satellites = ordered.filter((layer) => layer !== base);

  if (!base) return null;

  return (
    <section className="overflow-hidden rounded-3xl border border-stone-200 bg-white">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 px-5 py-4">
        <div>
          <p className="flex items-center gap-2 text-sm font-extrabold text-stone-900">
            <ImageIcon className="h-4 w-4 text-[#a83d23]" /> Mockup phối đồ 2D
          </p>
          <p className="mt-1 text-xs text-stone-500">
            Các lớp được xếp theo thứ tự z-index do engine phối đồ trả về.
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-stone-100 px-3 py-1.5 text-[10px] font-bold text-stone-600">
          <Layers3 className="h-3 w-3" /> {ordered.length} lớp · {width} × {height}
        </span>
      </div>

      <div className="p-4 sm:p-6">
        <div
          className="relative mx-auto aspect-[4/5] max-h-[680px] w-full max-w-[560px] overflow-hidden rounded-[2rem] border border-black/10 shadow-inner"
          style={{ background }}
        >
          <div
            className="absolute inset-y-[5%] left-[10%] right-[28%] flex items-center justify-center rounded-3xl bg-white/65 p-5 shadow-sm backdrop-blur-sm"
            style={{ zIndex: base.zIndex }}
          >
            <img src={base.imageUrl} alt={base.name || ROLE_LABELS[base.role]} className="h-full w-full object-contain mix-blend-multiply" />
            <span className="absolute bottom-3 left-3 right-3 truncate rounded-full bg-black/75 px-3 py-2 text-center text-[10px] font-bold text-white">
              {base.name || ROLE_LABELS[base.role]}
            </span>
          </div>

          {satellites.slice(0, satellitePositions.length).map((layer, index) => (
            <div
              key={layer.itemId}
              className={`absolute ${satellitePositions[index]} w-[22%] rounded-2xl border border-black/10 bg-white/85 p-2 shadow-lg backdrop-blur-sm`}
              style={{ zIndex: layer.zIndex + index }}
            >
              <div className="aspect-square">
                <img src={layer.imageUrl} alt={layer.name || ROLE_LABELS[layer.role]} className="h-full w-full object-contain mix-blend-multiply" />
              </div>
              <p className="mt-1 truncate text-center text-[9px] font-bold text-stone-800">
                {layer.name || ROLE_LABELS[layer.role]}
              </p>
              <p className="truncate text-center text-[8px] font-medium text-stone-400">
                {ROLE_LABELS[layer.role]} · z{layer.zIndex}
              </p>
            </div>
          ))}

          <div className="absolute bottom-3 left-1/2 z-50 -translate-x-1/2 rounded-full bg-white/80 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.14em] text-stone-500 backdrop-blur">
            VietFashion 2D Outfit
          </div>
        </div>
      </div>
    </section>
  );
};
