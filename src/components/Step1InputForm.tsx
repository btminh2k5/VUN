import React, { useState } from 'react';
import { Calendar, Sparkles, Palette, ArrowRight, Compass, ShieldCheck, Check, Edit3 } from 'lucide-react';
import { CONTEXT_OPTIONS, STYLE_OPTIONS, COLOR_OPTIONS } from '../data/vietFashionData';
import { findMatchingOutfits } from '../utils/matchingEngine';

interface Step1InputFormProps {
  selectedContext: string;
  onSelectContext: (val: string) => void;
  selectedStyle: string;
  onSelectStyle: (val: string) => void;
  selectedColor: string;
  onSelectColor: (val: string) => void;
  onSubmit: () => void;
}

export const Step1InputForm: React.FC<Step1InputFormProps> = ({
  selectedContext,
  onSelectContext,
  selectedStyle,
  onSelectStyle,
  selectedColor,
  onSelectColor,
  onSubmit
}) => {
  // Live preview matching while typing
  const liveMatches = React.useMemo(() => {
    return findMatchingOutfits(selectedContext, selectedStyle, selectedColor);
  }, [selectedContext, selectedStyle, selectedColor]);

  const topMatch = liveMatches[0];

  return (
    <div className="max-w-md mx-auto bg-white rounded-3xl border border-stone-200 shadow-md overflow-hidden">
      {/* App Header in Mobile Card */}
      <div className="px-6 pt-5 pb-3 flex items-center justify-between border-b border-stone-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-700">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
              <path d="M12 2C12 2 9 6.5 9 10C9 12.5 10.5 14 12 14C13.5 14 15 12.5 15 10C15 6.5 12 2 12 2ZM5.5 10C4 11.5 3 13.5 3 16C3 19 6 21 12 21C18 21 21 19 21 16C21 13.5 20 11.5 18.5 10C17.5 12.5 15.5 14.5 12 15C8.5 14.5 6.5 12.5 5.5 10Z" />
            </svg>
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-wider uppercase text-stone-900 font-['Playfair_Display',serif]">
              Boss of delay
            </h1>
            <p className="text-[10px] text-stone-500">Khám phá & phối trang phục truyền thống Việt Nam</p>
          </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-stone-50 border border-stone-200 flex items-center justify-center text-stone-600">
          <Compass className="w-4 h-4" />
        </div>
      </div>

      {/* Hero Banner: Thời trang truyền thống - Gìn giữ bản sắc Việt */}
      <div className="relative mx-5 mt-4 h-36 rounded-2xl overflow-hidden shadow-sm">
        <img
          src="https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80"
          alt="Thời trang truyền thống Việt Nam"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/80 via-stone-950/50 to-transparent" />
        <div className="absolute inset-0 p-4 flex flex-col justify-center text-white">
          <p className="text-xs font-light text-amber-200 tracking-wide">Thời trang truyền thống</p>
          <h2 className="text-lg font-bold font-['Playfair_Display',serif] leading-tight text-white mt-0.5">
            Gìn giữ bản sắc Việt
          </h2>
          <p className="text-xs text-stone-200 font-light mt-0.5">Theo cách của bạn</p>
        </div>
        <div className="absolute top-2 right-2 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] text-stone-200 flex items-center gap-1 border border-white/20">
          <ShieldCheck className="w-3 h-3 text-emerald-400" />
          <span>Tự do nhập & Gợi ý khớp nhất</span>
        </div>
      </div>

      {/* 3 Main Inputs Form: Tự do nhập văn bản hoặc chọn gợi ý */}
      <div className="p-6 space-y-4">
        {/* Input 1: Bối cảnh (Người dùng có thể gõ trực tiếp) */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="flex items-center gap-2 text-xs font-semibold text-stone-700">
              <Calendar className="w-4 h-4 text-red-700" />
              <span>1. Bối cảnh & Sự kiện</span>
            </label>
            <span className="text-[10px] text-stone-500 flex items-center gap-1">
              <Edit3 className="w-3 h-3 text-amber-600" />
              Có thể tự nhập tự do
            </span>
          </div>

          <div className="relative">
            <input
              type="text"
              value={selectedContext}
              onChange={(e) => onSelectContext(e.target.value)}
              placeholder="Nhập bối cảnh (VD: Tết, Chụp kỷ yếu, Cưới bạn thân, Dạo phố cafe...)"
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 font-medium placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-red-600/30 focus:border-red-600 transition"
            />
          </div>

          {/* Quick context suggestions */}
          <div className="flex flex-wrap gap-1 mt-1.5">
            {['Tết', 'Dạo phố cafe', 'Kỷ yếu tốt nghiệp', 'Cưới hỏi', 'Lễ hội', 'Dạ tiệc'].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => onSelectContext(item)}
                className={`text-[10px] px-2 py-0.5 rounded-md border transition ${
                  selectedContext === item
                    ? 'bg-red-700 text-white border-red-700 font-medium'
                    : 'bg-stone-100/80 text-stone-600 border-stone-200 hover:bg-stone-200'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Input 2: Phong cách (Người dùng có thể gõ trực tiếp) */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="flex items-center gap-2 text-xs font-semibold text-stone-700">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>2. Phong cách mong muốn</span>
            </label>
            <span className="text-[10px] text-stone-500 flex items-center gap-1">
              <Edit3 className="w-3 h-3 text-amber-600" />
              Có thể tự nhập tự do
            </span>
          </div>

          <div className="relative">
            <input
              type="text"
              value={selectedStyle}
              onChange={(e) => onSelectStyle(e.target.value)}
              placeholder="Nhập phong cách (VD: Hiện đại Gen Z, Tối giản, Cổ điển, Nàng thơ Y2K...)"
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 font-medium placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-red-600/30 focus:border-red-600 transition"
            />
          </div>

          {/* Quick style suggestions */}
          <div className="flex flex-wrap gap-1 mt-1.5">
            {['Hiện đại Gen Z', 'Tối giản', 'Cổ điển hoàng gia', 'Thanh lịch', 'Phá cách Y2K'].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => onSelectStyle(item)}
                className={`text-[10px] px-2 py-0.5 rounded-md border transition ${
                  selectedStyle === item
                    ? 'bg-amber-700 text-white border-amber-700 font-medium'
                    : 'bg-stone-100/80 text-stone-600 border-stone-200 hover:bg-stone-200'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Input 3: Màu sắc (Người dùng có thể gõ màu bất kỳ hoặc chọn) */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="flex items-center gap-2 text-xs font-semibold text-stone-700">
              <Palette className="w-4 h-4 text-blue-600" />
              <span>3. Màu sắc chủ đạo</span>
            </label>
            <span className="text-[10px] text-stone-500 flex items-center gap-1">
              <Edit3 className="w-3 h-3 text-amber-600" />
              Tự nhập hoặc chọn màu
            </span>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={selectedColor}
              onChange={(e) => onSelectColor(e.target.value)}
              placeholder="Nhập màu (VD: Đỏ may mắn, Trắng ngọc, Xanh lam, Vàng, Hồng đào...)"
              className="flex-1 bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 font-medium placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-red-600/30 focus:border-red-600 transition"
            />
          </div>

          {/* Quick Color Palette Dots */}
          <div className="flex items-center gap-1.5 mt-2 flex-wrap">
            {COLOR_OPTIONS.map((c) => (
              <button
                key={c.value}
                type="button"
                onClick={() => onSelectColor(c.value)}
                className={`flex items-center gap-1 text-[10px] px-2 py-1 rounded-lg border transition ${
                  selectedColor.toLowerCase().includes(c.value.toLowerCase())
                    ? 'border-stone-800 bg-stone-900 text-white font-medium'
                    : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full border border-black/20"
                  style={{ backgroundColor: c.hex }}
                />
                <span>{c.value}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Live Matching Feedback Card */}
        {topMatch && (
          <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-2xl space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900">
                Gợi ý khớp nhất theo yêu cầu:
              </span>
              <span className="text-xs font-bold text-emerald-700 bg-white px-2 py-0.5 rounded-full border border-emerald-200">
                {topMatch.matchPercentage}% Khớp
              </span>
            </div>
            <p className="text-xs font-bold text-stone-900 font-['Playfair_Display',serif]">
              {topMatch.outfit.title}
            </p>
            <p className="text-[11px] text-stone-600 leading-snug line-clamp-1">
              ✓ {topMatch.matchReasons[0] || 'Phù hợp tiêu chí đã nhập'}
            </p>
          </div>
        )}

        {/* Primary CTA Button: Phối đồ */}
        <div className="pt-2">
          <button
            type="button"
            onClick={onSubmit}
            className="w-full bg-gradient-to-r from-red-700 via-red-600 to-amber-700 hover:from-red-800 hover:to-amber-800 text-white font-medium py-3 px-4 rounded-xl shadow-md flex items-center justify-center gap-2 transition transform active:scale-98"
          >
            <Sparkles className="w-4 h-4 text-amber-200" />
            <span className="font-semibold text-sm">
              Phối đồ & Xem gợi ý khớp nhất ({topMatch?.matchPercentage || 95}%)
            </span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>

        <p className="text-center text-[10px] text-stone-500 pt-0.5">
          Hệ thống sẽ đối soát ngữ nghĩa và tìm kiếm outfit tương thích nhất trong VietFashion Dataset
        </p>
      </div>
    </div>
  );
};
