import React from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles, Filter, Info, ShieldCheck, Heart, CheckCircle2 } from 'lucide-react';
import { OutfitSet, GarmentItem } from '../data/vietFashionData';
import { MatchResult } from '../utils/matchingEngine';

interface Step2OutfitSuggestionsProps {
  outfits: OutfitSet[];
  matchResults?: MatchResult[];
  currentIndex: number;
  onSelectIndex: (idx: number) => void;
  selectedContext: string;
  selectedStyle: string;
  selectedColor: string;
  onViewOutfitDetails: () => void;
  onSelectItem: (item: GarmentItem) => void;
  onEditFilters: () => void;
  isSaved?: boolean;
  onToggleSave?: () => void;
}

export const Step2OutfitSuggestions: React.FC<Step2OutfitSuggestionsProps> = ({
  outfits,
  matchResults = [],
  currentIndex,
  onSelectIndex,
  selectedContext,
  selectedStyle,
  selectedColor,
  onViewOutfitDetails,
  onSelectItem,
  onEditFilters,
  isSaved,
  onToggleSave
}) => {
  const currentOutfit = outfits[currentIndex] || outfits[0];
  const currentMatch = matchResults[currentIndex];

  const handlePrev = () => {
    onSelectIndex((currentIndex - 1 + outfits.length) % outfits.length);
  };

  const handleNext = () => {
    onSelectIndex((currentIndex + 1) % outfits.length);
  };

  if (!currentOutfit) {
    return (
      <div className="max-w-md mx-auto p-8 text-center bg-white rounded-3xl border border-stone-200">
        <p className="text-stone-600 mb-4">Không tìm thấy outfit phù hợp với tiêu chí này.</p>
        <button
          onClick={onEditFilters}
          className="px-4 py-2 bg-red-700 text-white rounded-xl text-sm font-medium"
        >
          Nhập lại yêu cầu
        </button>
      </div>
    );
  }

  // Get primary items
  const mainItem = currentOutfit.items.find((i) => i.category === 'main');
  const otherItems = currentOutfit.items.filter((i) => i.category !== 'main');

  return (
    <div className="max-w-md mx-auto bg-white rounded-3xl border border-stone-200 shadow-md overflow-hidden">
      {/* Top Header */}
      <div className="px-6 pt-5 pb-3 flex items-center justify-between border-b border-stone-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-700">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
              <path d="M12 2C12 2 9 6.5 9 10C9 12.5 10.5 14 12 14C13.5 14 15 12.5 15 10C15 6.5 12 2 12 2ZM5.5 10C4 11.5 3 13.5 3 16C3 19 6 21 12 21C18 21 21 19 21 16C21 13.5 20 11.5 18.5 10C17.5 12.5 15.5 14.5 12 15C8.5 14.5 6.5 12.5 5.5 10Z" />
            </svg>
          </div>
          <h1 className="text-sm font-bold tracking-wider uppercase text-stone-900 font-['Playfair_Display',serif]">
            Boss of delay
          </h1>
        </div>

        <button
          type="button"
          onClick={onEditFilters}
          className="flex items-center gap-1 text-xs text-stone-600 hover:text-stone-900 bg-stone-100 px-2.5 py-1 rounded-lg"
          title="Nhập lại yêu cầu phối đồ"
        >
          <Filter className="w-3.5 h-3.5" />
          <span>Sửa yêu cầu</span>
        </button>
      </div>

      <div className="p-6">
        {/* Title & Selected Criteria Tags */}
        <div className="mb-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-stone-900 font-['Playfair_Display',serif]">
              Gợi ý phối đồ tương ứng
            </h2>
            <span className="text-[11px] text-stone-500 font-medium">
              Outfit {currentIndex + 1} / {outfits.length}
            </span>
          </div>

          {/* Clean metadata text with user request tags */}
          <div className="flex items-center gap-2 text-xs text-stone-600 mt-1.5 flex-wrap">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
              Bối cảnh: <strong className="text-stone-800">{selectedContext || 'Mặc định'}</strong>
            </span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              Phong cách: <strong className="text-stone-800">{selectedStyle || 'Mặc định'}</strong>
            </span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              Màu: <strong className="text-stone-800">{selectedColor || 'Mặc định'}</strong>
            </span>
          </div>
        </div>

        {/* Semantic Match Percentage Badge */}
        {currentMatch && (
          <div className="mb-3 p-2.5 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="text-[11px] text-emerald-950 font-semibold">
                Độ tương thích với yêu cầu của bạn:
              </span>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-white px-2 py-0.5 rounded-full border border-emerald-300">
              {currentMatch.matchPercentage}% Khớp
            </span>
          </div>
        )}

        {/* Outfit Preview Card: Left Image + Right Items Column */}
        <div className="grid grid-cols-12 gap-3 bg-stone-50 p-3 rounded-2xl border border-stone-200/80 mb-3">
          {/* Left: Model Wearing Full Outfit */}
          <div className="col-span-7 relative rounded-xl overflow-hidden shadow-xs bg-stone-200 h-[280px] group">
            <img
              src={currentOutfit.modelImage}
              alt={currentOutfit.title}
              className="w-full h-full object-cover object-top transition duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent pointer-events-none" />

            {/* Cultural Badge */}
            <div className="absolute top-2 left-2 bg-white/95 backdrop-blur-md px-2 py-0.5 rounded-full flex items-center gap-1 text-[10px] font-semibold text-stone-800 shadow-xs">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              <span>Chuẩn di sản</span>
            </div>

            {/* Quick Heart Save */}
            {onToggleSave && (
              <button
                type="button"
                onClick={onToggleSave}
                className={`absolute top-2 right-2 p-1.5 rounded-full backdrop-blur-md transition ${
                  isSaved ? 'bg-red-600 text-white' : 'bg-white/80 text-stone-700 hover:bg-white'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
              </button>
            )}

            <div className="absolute bottom-2 left-2 right-2 text-white">
              <p className="text-[10px] text-amber-300 uppercase tracking-wider font-semibold">
                {currentOutfit.style}
              </p>
              <p className="text-xs font-bold leading-tight line-clamp-1">
                {currentOutfit.title}
              </p>
            </div>
          </div>

          {/* Right: Component Items List */}
          <div className="col-span-5 flex flex-col justify-between space-y-2">
            <p className="text-[11px] font-bold text-stone-600 uppercase tracking-wide">
              Các món trong set:
            </p>

            {/* Item 1: Main Garment */}
            {mainItem && (
              <button
                type="button"
                onClick={() => onSelectItem(mainItem)}
                className="w-full text-left bg-white hover:bg-amber-50/80 p-2 rounded-xl border border-stone-200 transition group flex flex-col items-center"
              >
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-stone-100 mb-1">
                  <img
                    src={mainItem.imageUrl}
                    alt={mainItem.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition"
                  />
                </div>
                <span className="text-[11px] font-semibold text-stone-800 text-center leading-tight line-clamp-1">
                  {mainItem.name}
                </span>
                <span className="text-[9px] text-red-600 font-medium mt-0.5">Trang phục chính</span>
              </button>
            )}

            {/* Other items: Bag & Shoes & Pants */}
            {otherItems.slice(0, 2).map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectItem(item)}
                className="w-full text-left bg-white hover:bg-amber-50/80 p-1.5 rounded-xl border border-stone-200 transition group flex items-center gap-2"
              >
                <div className="w-9 h-9 rounded-lg overflow-hidden bg-stone-100 shrink-0">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition"
                  />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-medium text-stone-800 block truncate">
                    {item.name}
                  </span>
                  <span className="text-[9px] text-stone-600 block">{item.type}</span>
                </div>
              </button>
            ))}

            <p className="text-[10px] text-center text-stone-600 italic">
              Click từng món để xem gốc tích
            </p>
          </div>
        </div>

        {/* Why this matches your input */}
        {currentMatch?.matchReasons && currentMatch.matchReasons.length > 0 && (
          <div className="p-2.5 bg-amber-50/50 border border-amber-200/60 rounded-xl mb-3 text-[11px] text-stone-700">
            <span className="font-semibold text-amber-950 block mb-0.5">Lý do gợi ý outfit này:</span>
            <ul className="space-y-0.5 text-stone-600">
              {currentMatch.matchReasons.slice(0, 2).map((r, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-amber-600" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Outfit Title & Carousel Controls */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-stone-900 font-['Playfair_Display',serif]">
                {currentOutfit.title}
              </h3>
              <p className="text-[11px] text-stone-500 line-clamp-1">{currentOutfit.subtitle}</p>
            </div>

            {/* Carousel Dots */}
            <div className="flex items-center gap-1.5">
              {outfits.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => onSelectIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentIndex === i ? 'bg-red-700 w-4' : 'bg-stone-300 hover:bg-stone-400'
                  }`}
                  title={`Xem outfit ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Action Row: Prev/Next & CTA */}
          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={handlePrev}
              className="p-2.5 rounded-xl border border-stone-200 hover:bg-stone-100 text-stone-700 transition"
              title="Outfit trước"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onViewOutfitDetails}
              className="flex-1 bg-gradient-to-r from-red-700 to-amber-700 hover:from-red-800 hover:to-amber-800 text-white py-2.5 px-4 rounded-xl text-xs font-semibold shadow-sm flex items-center justify-center gap-1.5 transition"
            >
              <span>Xem chi tiết outfit</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="p-2.5 rounded-xl border border-stone-200 hover:bg-stone-100 text-stone-700 transition"
              title="Outfit tiếp theo"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
