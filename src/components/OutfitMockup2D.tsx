import React from 'react';
import { Image as ImageIcon, Layers3 } from 'lucide-react';

interface MockupAccessory {
  id: string;
  name: string;
  imageUrl: string;
  category: string;
}

interface OutfitMockup2DProps {
  garmentName: string;
  garmentImage: string;
  accessories: MockupAccessory[];
  background?: string;
  width?: number;
  height?: number;
}

const positions = [
  'right-[5%] top-[8%]',
  'right-[5%] top-[38%]',
  'left-[5%] bottom-[6%]',
  'right-[5%] bottom-[6%]',
];

export const OutfitMockup2D: React.FC<OutfitMockup2DProps> = ({
  garmentName,
  garmentImage,
  accessories,
  background = '#F5F2EA',
  width = 1080,
  height = 1350,
}) => (
  <section className="overflow-hidden rounded-3xl border border-stone-200 bg-white">
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 px-5 py-4">
      <div>
        <p className="flex items-center gap-2 text-sm font-extrabold text-stone-900"><ImageIcon className="h-4 w-4 text-[#a83d23]" /> Mockup phối đồ 2D</p>
        <p className="mt-1 text-xs text-stone-500">Ảnh áo và phụ kiện bạn đã chọn được sắp xếp theo từng lớp.</p>
      </div>
      <span className="inline-flex items-center gap-1.5 rounded-full bg-stone-100 px-3 py-1.5 text-[10px] font-bold text-stone-600">
        <Layers3 className="h-3 w-3" /> {accessories.length + 1} lớp · {width} × {height}
      </span>
    </div>

    <div className="p-4 sm:p-6">
      <div
        className="relative mx-auto aspect-[4/5] max-h-[680px] w-full max-w-[560px] overflow-hidden rounded-[2rem] border border-black/10 shadow-inner"
        style={{ background }}
      >
        <div className="absolute inset-y-[5%] left-[10%] right-[28%] flex items-center justify-center rounded-3xl bg-white/65 p-5 shadow-sm backdrop-blur-sm">
          <img src={garmentImage} alt={garmentName} className="h-full w-full object-contain mix-blend-multiply" />
          <span className="absolute bottom-3 left-3 right-3 truncate rounded-full bg-black/75 px-3 py-2 text-center text-[10px] font-bold text-white">{garmentName}</span>
        </div>

        {accessories.slice(0, 4).map((item, index) => (
          <div key={item.id} className={`absolute ${positions[index]} w-[22%] rounded-2xl border border-black/10 bg-white/85 p-2 shadow-lg backdrop-blur-sm`} style={{ zIndex: 20 + index }}>
            <div className="aspect-square"><img src={item.imageUrl} alt={item.name} className="h-full w-full object-contain mix-blend-multiply" /></div>
            <p className="mt-1 truncate text-center text-[9px] font-bold text-stone-800">{item.name}</p>
          </div>
        ))}

        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-white/80 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.14em] text-stone-500 backdrop-blur">
          VietFashion 2D Outfit
        </div>
      </div>
    </div>
  </section>
);
