import React from 'react';
import { ArrowRight, SlidersHorizontal } from 'lucide-react';
import { OutfitSet } from '../data/vietFashionData';

interface Step2OutfitSuggestionsProps {
  outfits: OutfitSet[];
  currentIndex: number;
  onSelectOutfit: (index: number) => void;
  onEditFilters: () => void;
}

export const Step2OutfitSuggestions: React.FC<Step2OutfitSuggestionsProps> = ({
  outfits,
  currentIndex,
  onSelectOutfit,
  onEditFilters
}) => (
  <section className="mx-auto max-w-4xl overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-[0_20px_55px_rgba(0,0,0,0.08)]">
    <div className="flex flex-col gap-5 border-b border-black/10 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-8">
      <h2 className="text-2xl font-black tracking-[-0.045em] sm:text-3xl">
        Tên trang phục gợi ý
      </h2>
      <button
        type="button"
        onClick={onEditFilters}
        className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-black/15 px-4 py-2.5 text-xs font-bold transition hover:bg-stone-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
      >
        <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
        Sửa tiêu chí
      </button>
    </div>

    {outfits.length === 0 ? (
      <p className="p-8 text-sm text-black/55">Chưa tìm thấy trang phục phù hợp. Hãy thử thay đổi tiêu chí.</p>
    ) : (
      <ul className="divide-y divide-black/10 px-5 sm:px-8">
        {outfits.map((outfit, index) => {
          const name = outfit.items[0]?.name || outfit.title.replace(/^Gợi ý:\s*/i, '');
          return (
            <li key={outfit.id}>
              <button
                type="button"
                onClick={() => onSelectOutfit(index)}
                className={`group flex w-full items-center justify-between gap-5 py-5 text-left text-sm font-bold transition hover:text-[#a83d23] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black sm:py-6 sm:text-base ${currentIndex === index ? 'text-black' : 'text-black/70'}`}
              >
                <span>{name}</span>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f4f1e8] transition group-hover:bg-[#ffc21c] group-hover:text-black">
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    )}
  </section>
);
