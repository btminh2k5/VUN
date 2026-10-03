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
  Palette,
  Eye,
  Shirt,
  BookOpen,
  ExternalLink
} from 'lucide-react';
import { OutfitSet, GarmentItem, REAL_DATASET_35_ITEMS } from '../data/vietFashionData';
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
        <p className="text-stone-600 mb-4 text-sm">Không tìm thấy trang phục phù hợp với tiêu chí này.</p>
        <button
          onClick={onEditFilters}
          className="px-6 py-2.5 bg-red-700 text-white rounded-xl text-xs font-semibold cursor-pointer"
        >
          Nhập lại yêu cầu
        </button>
      </div>
    );
  }

  // Get primary garment
  const mainGarment = currentOutfit.items[0];

  // Find other color variants of this exact garment category from the real 35 dataset
  const colorVariantsOfThisGarment = REAL_DATASET_35_ITEMS.filter(
    (item) => item.category === currentOutfit.categoryName
  );

  return (
    <div className="w-full space-y-6">
      {/* Top Bar Filter Summary */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-4 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
              VietFashion Dataset Recommender
            </span>
            <span className="text-stone-300">·</span>
            <span className="text-xs text-stone-500 font-medium">
              Tìm thấy {outfits.length} mẫu trang phục gợi ý phù hợp
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 font-['Playfair_Display',serif] mt-0.5">
            Trang Phục Gợi Ý Tương Ứng Với Tìm Kiếm
          </h2>
          {/* User query tags */}
          <div className="flex items-center gap-3 text-xs text-stone-600 mt-2 flex-wrap">
            <span className="flex items-center gap-1.5 bg-stone-100 px-2.5 py-1 rounded-lg">
              <span className="w-2 h-2 rounded-full bg-red-600" />
              Bối cảnh: <strong className="text-stone-800">{selectedContext || 'Mặc định'}</strong>
            </span>
            <span className="flex items-center gap-1.5 bg-stone-100 px-2.5 py-1 rounded-lg">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              Trang phục / Phong cách: <strong className="text-stone-800">{selectedStyle || currentOutfit.categoryName}</strong>
            </span>
            <span className="flex items-center gap-1.5 bg-stone-100 px-2.5 py-1 rounded-lg">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              Màu sắc: <strong className="text-stone-800">{selectedColor || currentOutfit.primaryColor}</strong>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-end md:self-auto">
          {currentMatch && (
            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-xl">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-bold text-emerald-900">
                {currentMatch.matchPercentage}% Khớp trang phục
              </span>
            </div>
          )}

          <button
            type="button"
            onClick={onEditFilters}
            className="flex items-center gap-1.5 text-xs text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 px-3.5 py-2 rounded-xl transition font-medium cursor-pointer"
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Sửa tiêu chí tìm kiếm</span>
          </button>
        </div>
      </div>

      {/* Main Full-Width Dual Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Big Showcase Image of the Recommended Garment (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-stone-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-stone-500">
                Mẫu trang phục {currentIndex + 1} trên {outfits.length}
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
                  className={`p-2 rounded-xl border transition cursor-pointer ${
                    isSaved
                      ? 'bg-red-50 border-red-200 text-red-600'
                      : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                  }`}
                  title="Lưu mẫu trang phục này"
                >
                  <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                </button>
              )}

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="p-2 rounded-xl border border-stone-200 hover:bg-stone-100 text-stone-700 transition cursor-pointer"
                  title="Mẫu trước"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="p-2 rounded-xl border border-stone-200 hover:bg-stone-100 text-stone-700 transition cursor-pointer"
                  title="Mẫu tiếp theo"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Main Visual Display */}
          <div className="relative h-[460px] sm:h-[500px] rounded-2xl overflow-hidden shadow-sm bg-stone-100 group">
            <img
              src={currentOutfit.modelImage}
              alt={currentOutfit.title}
              className="w-full h-full object-cover object-top transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

            {/* Cultural Badge */}
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-semibold text-stone-800 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Ảnh thật từ VietFashion Dataset</span>
            </div>

            <div className="absolute top-4 right-4 bg-stone-900/80 backdrop-blur-md text-amber-300 text-xs font-bold px-3 py-1.5 rounded-full">
              Dòng: {currentOutfit.categoryName}
            </div>

            <div className="absolute bottom-4 left-4 right-4 text-white">
              <p className="text-xs uppercase tracking-wider font-semibold text-amber-300">
                {currentOutfit.context} · {currentOutfit.style} · Màu {currentOutfit.primaryColor}
              </p>
              <h4 className="text-xl font-bold font-['Playfair_Display',serif]">
                {currentOutfit.title}
              </h4>
              <p className="text-xs text-stone-200 mt-1 line-clamp-2">
                {currentOutfit.description}
              </p>
            </div>
          </div>

          {/* Thumbnails of Other Matched Suggestions */}
          <div className="pt-2">
            <span className="text-xs font-semibold text-stone-600 block mb-2">
              Các mẫu trang phục khác phù hợp với tìm kiếm của bạn:
            </span>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {outfits.map((outfit, idx) => (
                <button
                  key={outfit.id}
                  type="button"
                  onClick={() => onSelectIndex(idx)}
                  className={`relative h-20 rounded-xl overflow-hidden border-2 transition cursor-pointer ${
                    currentIndex === idx
                      ? 'border-red-600 ring-2 ring-red-600/20'
                      : 'border-stone-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={outfit.modelImage}
                    alt={outfit.title}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-black/35" />
                  <span className="absolute bottom-1 left-1 right-1 text-[9px] font-bold text-white truncate text-center">
                    {outfit.primaryColor} · {outfit.categoryName}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Suggested Garment Information (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-6 space-y-5">
            <div>
              <div className="flex items-center gap-2">
                <Shirt className="w-4 h-4 text-red-700" />
                <span className="text-xs font-bold text-stone-800 uppercase tracking-wide">
                  Trang phục gợi ý cho tìm kiếm:
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-stone-900 font-['Playfair_Display',serif] mt-1">
                {mainGarment?.name || currentOutfit.title}
              </h3>
            </div>

            {/* Cultural & Design Details Card */}
            {mainGarment && (
              <div className="space-y-3.5 bg-stone-50/70 rounded-2xl p-4 border border-stone-200">
                <div className="flex items-center justify-between text-xs pb-2 border-b border-stone-200/80">
                  <span className="text-stone-500">Dòng trang phục:</span>
                  <span className="font-bold text-stone-900">{mainGarment.type}</span>
                </div>
                <div className="flex items-center justify-between text-xs pb-2 border-b border-stone-200/80">
                  <span className="text-stone-500">Màu sắc chủ đạo:</span>
                  <span className="font-bold text-red-700 flex items-center gap-1.5">
                    <span
                      className="w-3 h-3 rounded-full border border-black/20"
                      style={{ backgroundColor: currentOutfit.colorHex }}
                    />
                    {currentOutfit.primaryColor}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs pb-2 border-b border-stone-200/80">
                  <span className="text-stone-500">Vùng địa lý:</span>
                  <span className="font-bold text-stone-800">{mainGarment.region}</span>
                </div>
                <div className="flex items-center justify-between text-xs pb-2 border-b border-stone-200/80">
                  <span className="text-stone-500">Thời kỳ / Niên đại:</span>
                  <span className="font-bold text-stone-800">{mainGarment.era}</span>
                </div>
                <div className="text-xs space-y-1">
                  <span className="text-stone-500 font-medium block">Phom dáng & Chất liệu:</span>
                  <p className="text-stone-800 font-medium leading-relaxed">
                    {mainGarment.keyFeatures} ({mainGarment.material})
                  </p>
                </div>
                <div className="text-xs space-y-1 pt-1">
                  <span className="text-stone-500 font-medium block">Ý nghĩa văn hóa:</span>
                  <p className="text-stone-700 leading-relaxed bg-white p-3 rounded-xl border border-stone-200/70">
                    {mainGarment.culturalMeaning}
                  </p>
                </div>
              </div>
            )}

            {/* Museum Verification Citation */}
            {mainGarment && (
              <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-2xl text-xs space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-900 font-bold">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>Nguồn tư liệu kiểm chứng:</span>
                </div>
                <p className="text-emerald-950 font-semibold">{mainGarment.verifiedSource.museum}</p>
                <p className="text-emerald-800 text-[11px]">{mainGarment.verifiedSource.citation}</p>
              </div>
            )}

            {/* Other Color Variants of this Garment from Dataset */}
            {colorVariantsOfThisGarment.length > 1 && (
              <div className="space-y-2 pt-1">
                <span className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-amber-700" />
                  Các phiên bản màu khác của {currentOutfit.categoryName} trong dataset:
                </span>
                <div className="grid grid-cols-4 gap-2">
                  {colorVariantsOfThisGarment.slice(0, 8).map((variant) => (
                    <div
                      key={variant.id}
                      className="group/var relative rounded-xl overflow-hidden border border-stone-200 aspect-3/4 bg-stone-100"
                      title={variant.name}
                    >
                      <img
                        src={variant.imageUrl}
                        alt={variant.name}
                        className="w-full h-full object-cover object-top"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
                      <span className="absolute bottom-1 left-1 right-1 text-[9px] font-bold text-white text-center truncate">
                        {variant.color}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Primary Action Buttons */}
            <div className="space-y-2.5 pt-2">
              <button
                type="button"
                onClick={onViewOutfitDetails}
                className="w-full bg-gradient-to-r from-red-700 to-amber-700 hover:from-red-800 hover:to-amber-800 text-white font-semibold py-3.5 px-4 rounded-xl text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <span>Xem mô hình 3D & Chi tiết trang phục</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={onToggleSave}
                  className={`flex-1 py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                    isSaved
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                      : 'bg-white border-stone-300 hover:bg-stone-50 text-stone-800'
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>{isSaved ? 'Đã lưu mẫu' : 'Lưu mẫu này'}</span>
                </button>

                <button
                  type="button"
                  onClick={onEditFilters}
                  className="py-2.5 px-4 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 text-xs font-semibold transition cursor-pointer"
                >
                  Tìm trang phục khác
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
