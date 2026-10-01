import React from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  Sparkles, 
  Filter, 
  Info, 
  ShieldCheck, 
  Heart, 
  CheckCircle2,
  Bookmark,
  Share2,
  Palette,
  Eye
} from 'lucide-react';
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
      <div className="w-full p-12 text-center bg-white rounded-3xl border border-stone-200">
        <p className="text-stone-600 mb-4 text-sm">Không tìm thấy outfit phù hợp với tiêu chí này.</p>
        <button
          onClick={onEditFilters}
          className="px-6 py-2.5 bg-red-700 text-white rounded-xl text-xs font-semibold"
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
    <div className="w-full space-y-6">
      {/* Top Bar Filter Summary */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-4 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
              VietFashion AI Recommender
            </span>
            <span className="text-stone-300">·</span>
            <span className="text-xs text-stone-500 font-medium">
              Tìm thấy {outfits.length} gợi ý phù hợp
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 font-['Playfair_Display',serif] mt-0.5">
            Bộ Phối Đồ Được Đề Xuất Cho Bạn
          </h2>
          {/* User query tags */}
          <div className="flex items-center gap-3 text-xs text-stone-600 mt-2 flex-wrap">
            <span className="flex items-center gap-1.5 bg-stone-100 px-2.5 py-1 rounded-lg">
              <span className="w-2 h-2 rounded-full bg-red-600" />
              Bối cảnh: <strong className="text-stone-800">{selectedContext || 'Mặc định'}</strong>
            </span>
            <span className="flex items-center gap-1.5 bg-stone-100 px-2.5 py-1 rounded-lg">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              Phong cách: <strong className="text-stone-800">{selectedStyle || 'Mặc định'}</strong>
            </span>
            <span className="flex items-center gap-1.5 bg-stone-100 px-2.5 py-1 rounded-lg">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              Màu: <strong className="text-stone-800">{selectedColor || 'Mặc định'}</strong>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-end md:self-auto">
          {currentMatch && (
            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-xl">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-bold text-emerald-900">
                {currentMatch.matchPercentage}% Khớp yêu cầu
              </span>
            </div>
          )}

          <button
            type="button"
            onClick={onEditFilters}
            className="flex items-center gap-1.5 text-xs text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 px-3.5 py-2 rounded-xl transition font-medium"
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Sửa tiêu chí</span>
          </button>
        </div>
      </div>

      {/* Main Full-Width Dual Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Big Showcase Image & Carousel Navigator (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-stone-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-stone-500">
                Gợi ý {currentIndex + 1} trên {outfits.length}
              </span>
              <h3 className="text-lg font-bold text-stone-900 font-['Playfair_Display',serif]">
                {currentOutfit.title}
              </h3>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              {onToggleSave && (
                <button
                  type="button"
                  onClick={onToggleSave}
                  className={`p-2 rounded-xl border transition ${
                    isSaved
                      ? 'bg-red-50 border-red-200 text-red-600'
                      : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                  }`}
                  title="Lưu bộ đồ này"
                >
                  <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                </button>
              )}

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="p-2 rounded-xl border border-stone-200 hover:bg-stone-100 text-stone-700 transition"
                  title="Outfit trước"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="p-2 rounded-xl border border-stone-200 hover:bg-stone-100 text-stone-700 transition"
                  title="Outfit tiếp theo"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Main Visual Display */}
          <div className="relative h-[440px] sm:h-[480px] rounded-2xl overflow-hidden shadow-sm bg-stone-100 group">
            <img
              src={currentOutfit.modelImage}
              alt={currentOutfit.title}
              className="w-full h-full object-cover object-top transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

            {/* Cultural Badge */}
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-semibold text-stone-800 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Chuẩn di sản văn hóa</span>
            </div>

            {/* Click pin tags */}
            {mainItem && (
              <button
                type="button"
                onClick={() => onSelectItem(mainItem)}
                className="absolute top-1/3 left-1/2 -translate-x-1/2 bg-white/95 hover:bg-amber-50 text-stone-900 px-3 py-1.5 rounded-full text-xs font-semibold shadow-md flex items-center gap-1.5 transition-transform hover:scale-110"
              >
                <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                <span>{mainItem.name} (Xem chi tiết)</span>
              </button>
            )}

            <div className="absolute bottom-4 left-4 right-4 text-white">
              <p className="text-xs uppercase tracking-wider font-semibold text-amber-300">
                {currentOutfit.context} · {currentOutfit.style}
              </p>
              <h4 className="text-xl font-bold font-['Playfair_Display',serif]">
                {currentOutfit.title}
              </h4>
              <p className="text-xs text-stone-200 mt-1 line-clamp-2">
                {currentOutfit.description}
              </p>
            </div>
          </div>

          {/* Thumbnails of Other Suggestions */}
          <div className="pt-2">
            <span className="text-xs font-semibold text-stone-600 block mb-2">
              Các phương án phối khác trong bộ sưu tập:
            </span>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {outfits.map((outfit, idx) => (
                <button
                  key={outfit.id}
                  type="button"
                  onClick={() => onSelectIndex(idx)}
                  className={`relative h-20 rounded-xl overflow-hidden border-2 transition ${
                    currentIndex === idx
                      ? 'border-red-600 ring-2 ring-red-600/20'
                      : 'border-stone-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={outfit.modelImage}
                    alt={outfit.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30" />
                  <span className="absolute bottom-1 left-1 right-1 text-[9px] font-bold text-white truncate text-center">
                    {outfit.context}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Breakdown of Component Items (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-6 space-y-5">
            <div>
              <span className="text-xs font-bold text-stone-700 uppercase tracking-wide">
                Chi tiết các món cấu thành:
              </span>
              <p className="text-xs text-stone-500 mt-0.5">
                Nhấp vào từng món để đọc thông tin bảo tàng, ý nghĩa văn hóa và nguồn gốc
              </p>
            </div>

            {/* Main Garment Card */}
            {mainItem && (
              <div
                onClick={() => onSelectItem(mainItem)}
                className="flex items-center gap-3.5 p-3 rounded-2xl bg-amber-50/60 hover:bg-amber-100/70 border border-amber-200/80 cursor-pointer transition group"
              >
                <img
                  src={mainItem.imageUrl}
                  alt={mainItem.name}
                  className="w-14 h-14 rounded-xl object-cover border border-amber-200 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-red-700 tracking-wide">
                      Trang phục chính
                    </span>
                    <span className="text-xs text-red-700 font-bold group-hover:underline flex items-center gap-0.5">
                      Chi tiết <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-stone-900 group-hover:text-red-700 truncate">
                    {mainItem.name}
                  </h4>
                  <p className="text-[11px] text-stone-600 line-clamp-1 mt-0.5">
                    {mainItem.keyFeatures}
                  </p>
                </div>
              </div>
            )}

            {/* Other Items in the set */}
            <div className="space-y-2">
              {otherItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectItem(item)}
                  className="flex items-center gap-3 p-2.5 rounded-2xl bg-stone-50 hover:bg-stone-100 border border-stone-200/80 cursor-pointer transition group"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-11 h-11 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-stone-500 font-medium">
                        {item.type}
                      </span>
                      <span className="text-[11px] text-stone-600 group-hover:text-stone-900 font-semibold">
                        Xem gốc tích →
                      </span>
                    </div>
                    <h5 className="text-xs font-semibold text-stone-900 group-hover:text-red-700 truncate">
                      {item.name}
                    </h5>
                  </div>
                </div>
              ))}
            </div>

            {/* Color Harmony Box */}
            <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-stone-900 flex items-center gap-1.5">
                  <Palette className="w-4 h-4 text-amber-700" />
                  Hòa sắc & Ngũ hành:
                </span>
                <span className="font-bold text-amber-900">
                  {currentOutfit.colorHarmony.score}/100 · {currentOutfit.colorHarmony.element}
                </span>
              </div>
              <p className="text-stone-600 text-[11px] leading-relaxed">
                {currentOutfit.colorHarmony.explanation}
              </p>
            </div>

            {/* Primary Action Buttons */}
            <div className="space-y-2.5 pt-2">
              <button
                type="button"
                onClick={onViewOutfitDetails}
                className="w-full bg-gradient-to-r from-red-700 to-amber-700 hover:from-red-800 hover:to-amber-800 text-white font-semibold py-3.5 px-4 rounded-xl text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition"
              >
                <span>Xem trọn bộ phối đồ & Mô hình 3D</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={onToggleSave}
                  className={`flex-1 py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                    isSaved
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                      : 'bg-white border-stone-300 hover:bg-stone-50 text-stone-800'
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>{isSaved ? 'Đã lưu trong Lookbook' : 'Lưu vào Lookbook'}</span>
                </button>

                <button
                  type="button"
                  onClick={onEditFilters}
                  className="py-2.5 px-4 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 text-xs font-semibold transition"
                >
                  Đổi tiêu chí
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
