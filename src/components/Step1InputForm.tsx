import React from 'react';
import { 
  Calendar, 
  Sparkles, 
  Palette, 
  ArrowRight, 
  Keyboard,
  ShieldCheck,
  CheckCircle2,
  X,
  Shirt,
  CornerDownLeft,
  Tag
} from 'lucide-react';
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

// Preset suggestions for Events/Contexts
const EVENT_SUGGESTIONS = [
  'Tết Nguyên Đán & Du xuân',
  'Chụp ảnh kỷ yếu tốt nghiệp',
  'Cưới hỏi & Đính hôn',
  'Dạo phố cafe & Check-in',
  'Lễ hội truyền thống',
  'Dạ tiệc & Gala sang trọng',
  'Đi lễ đền chùa đầu năm'
];

// Preset suggestions for Garments & Styles
const STYLE_GARMENT_SUGGESTIONS = [
  'Áo dài tân thời Gen Z',
  'Áo ngũ thân tay chẽn truyền thống',
  'Áo tấc hoàng gia quý phái',
  'Áo tứ thân Kinh Bắc',
  'Hiện đại năng động',
  'Tối giản thanh lịch',
  'Cổ điển hoàng gia',
  'Phá cách Y2K cá tính'
];

// Preset suggestions for Colors with visual swatches
const COLOR_SUGGESTIONS = [
  { name: 'Đỏ may mắn', hex: '#C51E28', note: 'Hỷ sự, Tết' },
  { name: 'Vàng hoàng yến', hex: '#CA8A04', note: 'Thịnh vượng' },
  { name: 'Xanh lam ngọc', hex: '#0D9488', note: 'Thanh khiết' },
  { name: 'Xanh cốm non', hex: '#047857', note: 'Tươi mới' },
  { name: 'Trắng tinh khôi', hex: '#F8FAFC', note: 'Thuần khiết' },
  { name: 'Hồng cánh sen', hex: '#DB2777', note: 'Duyên dáng' },
  { name: 'Đen nhung cá tính', hex: '#18181B', note: 'Huyền bí' },
  { name: 'Tím mộng mơ', hex: '#7E22CE', note: 'Cố đô Huế' }
];

export const Step1InputForm: React.FC<Step1InputFormProps> = ({
  selectedContext,
  onSelectContext,
  selectedStyle,
  onSelectStyle,
  selectedColor,
  onSelectColor,
  onSubmit
}) => {
  // Live calculation of matching percentage in the background
  const liveMatches = React.useMemo(() => {
    return findMatchingOutfits(selectedContext, selectedStyle, selectedColor);
  }, [selectedContext, selectedStyle, selectedColor]);

  const topMatch = liveMatches[0];

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="text-center space-y-2 py-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 backdrop-blur-md border border-amber-200 shadow-2xs text-xs font-semibold text-amber-900">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>VietFashion Dataset · Chuẩn Di Sản Văn Hóa & Phối Đồ Gen Z</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold font-['Playfair_Display',serif] text-stone-900 tracking-tight">
          Nhập Tiêu Chí Phối Đồ Truyền Thống
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 max-w-2xl mx-auto leading-relaxed">
          Gõ tự do từ bàn phím hoặc nhấp nhanh các gợi ý cơ bản có sẵn bên dưới. Hệ thống sẽ phân tích ngữ nghĩa và đề xuất bộ trang phục khớp nhất.
        </p>
      </div>

      {/* Expanded Keyboard Input Studio Card */}
      <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-stone-200/90 shadow-md p-6 sm:p-10 space-y-8">
        {/* Card Header with Keyboard Tips */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-100 gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-900">
              <Keyboard className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-stone-900">
                Giao diện nhập liệu từ bàn phím & Gợi ý có sẵn
              </h2>
              <p className="text-xs text-stone-500">
                Tự do chỉnh sửa văn bản bất kỳ lúc nào
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-stone-500 bg-stone-50 px-3 py-1.5 rounded-xl border border-stone-200">
            <CornerDownLeft className="w-3.5 h-3.5 text-stone-700" />
            <span>Nhấn phím <kbd className="px-1.5 py-0.5 bg-white border border-stone-300 rounded font-mono font-semibold text-stone-800">Enter</kbd> để phối đồ</span>
          </div>
        </div>

        {/* 3 Expanded Input Fields with Quick Suggestions */}
        <div className="space-y-7">
          {/* Section 1: Sự kiện / Bối cảnh */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-xs sm:text-sm font-bold text-stone-900">
                <Calendar className="w-4 h-4 text-red-700" />
                <span>1. Bối cảnh & Sự kiện diễn ra</span>
              </label>
              <span className="text-[11px] text-stone-400">
                Có thể gõ tự do hoặc bấm chọn gợi ý
              </span>
            </div>

            <div className="relative">
              <input
                type="text"
                value={selectedContext}
                onChange={(e) => onSelectContext(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Nhập bối cảnh (Ví dụ: Tết Nguyên Đán, Chụp kỷ yếu Văn Miếu, Đi đám cưới, Dạo phố cafe...)"
                className="w-full bg-stone-50/80 border border-stone-300 rounded-2xl px-4 py-3.5 pr-10 text-sm sm:text-base text-stone-900 font-medium placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-red-600/30 focus:border-red-600 focus:bg-white transition shadow-2xs"
              />
              {selectedContext && (
                <button
                  type="button"
                  onClick={() => onSelectContext('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-1"
                  title="Xóa nội dung"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Suggestions for Events */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-semibold text-stone-500 flex items-center gap-1">
                <Tag className="w-3 h-3 text-red-700" />
                Gợi ý sự kiện cơ bản có sẵn:
              </span>
              <div className="flex flex-wrap gap-2">
                {EVENT_SUGGESTIONS.map((item) => {
                  const isActive = selectedContext.toLowerCase().includes(item.toLowerCase().split('&')[0].trim());
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => onSelectContext(item)}
                      className={`text-xs px-3 py-1.5 rounded-xl border transition-all ${
                        isActive
                          ? 'bg-red-700 text-white border-red-700 font-semibold shadow-xs'
                          : 'bg-stone-50/90 hover:bg-stone-100 text-stone-700 border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Section 2: Trang phục / Phong cách */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-xs sm:text-sm font-bold text-stone-900">
                <Shirt className="w-4 h-4 text-amber-600" />
                <span>2. Trang phục & Phong cách mong muốn</span>
              </label>
              <span className="text-[11px] text-stone-400">
                Gõ trang phục hoặc phong cách bạn muốn diện
              </span>
            </div>

            <div className="relative">
              <input
                type="text"
                value={selectedStyle}
                onChange={(e) => onSelectStyle(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Nhập phong cách hoặc kiểu áo (Ví dụ: Áo dài tân thời, Áo ngũ thân, Tối giản, Cổ điển, Nàng thơ Y2K...)"
                className="w-full bg-stone-50/80 border border-stone-300 rounded-2xl px-4 py-3.5 pr-10 text-sm sm:text-base text-stone-900 font-medium placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-600/30 focus:border-amber-600 focus:bg-white transition shadow-2xs"
              />
              {selectedStyle && (
                <button
                  type="button"
                  onClick={() => onSelectStyle('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-1"
                  title="Xóa nội dung"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Suggestions for Garments and Styles */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-semibold text-stone-500 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-600" />
                Gợi ý trang phục & phong cách có sẵn:
              </span>
              <div className="flex flex-wrap gap-2">
                {STYLE_GARMENT_SUGGESTIONS.map((item) => {
                  const isActive = selectedStyle.toLowerCase().includes(item.toLowerCase().split(' ')[0]);
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => onSelectStyle(item)}
                      className={`text-xs px-3 py-1.5 rounded-xl border transition-all ${
                        isActive
                          ? 'bg-amber-700 text-white border-amber-700 font-semibold shadow-xs'
                          : 'bg-stone-50/90 hover:bg-stone-100 text-stone-700 border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Section 3: Màu sắc chủ đạo */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-xs sm:text-sm font-bold text-stone-900">
                <Palette className="w-4 h-4 text-blue-600" />
                <span>3. Màu sắc chủ đạo</span>
              </label>
              <span className="text-[11px] text-stone-400">
                Gõ tên màu hoặc nhấp chọn bảng màu bên dưới
              </span>
            </div>

            <div className="relative">
              <input
                type="text"
                value={selectedColor}
                onChange={(e) => onSelectColor(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Nhập màu sắc (Ví dụ: Đỏ may mắn, Vàng hoàng yến, Xanh lam ngọc, Trắng tinh khôi, Hồng sen...)"
                className="w-full bg-stone-50/80 border border-stone-300 rounded-2xl px-4 py-3.5 pr-10 text-sm sm:text-base text-stone-900 font-medium placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 focus:bg-white transition shadow-2xs"
              />
              {selectedColor && (
                <button
                  type="button"
                  onClick={() => onSelectColor('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-1"
                  title="Xóa nội dung"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Suggestions for Colors */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-semibold text-stone-500 flex items-center gap-1">
                <Palette className="w-3 h-3 text-blue-600" />
                Gợi ý màu sắc cơ bản truyền thống:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {COLOR_SUGGESTIONS.map((item) => {
                  const isActive = selectedColor.toLowerCase().includes(item.name.toLowerCase().split(' ')[0]);
                  return (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => onSelectColor(item.name)}
                      className={`flex items-center gap-2 p-2 rounded-xl border text-left transition-all ${
                        isActive
                          ? 'bg-stone-900 text-white border-stone-900 font-semibold shadow-xs'
                          : 'bg-stone-50/90 hover:bg-stone-100 text-stone-800 border-stone-200'
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full border border-black/20 shrink-0 shadow-2xs"
                        style={{ backgroundColor: item.hex }}
                      />
                      <div className="min-w-0">
                        <span className="text-xs font-semibold block truncate leading-tight">
                          {item.name}
                        </span>
                        <span className={`text-[10px] block truncate ${isActive ? 'text-stone-300' : 'text-stone-400'}`}>
                          {item.note}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Minimalist Match Status Bar (Tối giản phía gợi ý khớp) */}
        <div className="pt-2">
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-stone-50 border border-stone-200 text-xs sm:text-sm">
            <div className="flex items-center gap-2 text-stone-700 min-w-0">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="truncate">
                {topMatch?.matchReasons[0]
                  ? `Hệ thống nhận diện: ${topMatch.matchReasons[0]}`
                  : 'Sẵn sàng tìm kiếm bộ trang phục phù hợp nhất từ VietFashion Dataset'}
              </span>
            </div>
            <span className="font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full shrink-0 ml-2 text-xs">
              {topMatch?.matchPercentage || 95}% Phù hợp
            </span>
          </div>
        </div>

        {/* Primary Action Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={onSubmit}
            className="w-full bg-gradient-to-r from-red-700 via-red-600 to-amber-700 hover:from-red-800 hover:to-amber-800 text-white font-semibold py-4 px-6 rounded-2xl shadow-md hover:shadow-lg flex items-center justify-center gap-2.5 transition transform active:scale-99 text-sm sm:text-base cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-amber-200" />
            <span>Phối đồ & Xem gợi ý khớp nhất (Enter ↵)</span>
            <ArrowRight className="w-5 h-5 ml-1" />
          </button>
        </div>

        <p className="text-center text-xs text-stone-400">
          Boss of delay sẽ hiển thị kết quả chi tiết, mô hình 3D xoay 360° và thông tin nguồn gốc ở bước tiếp theo
        </p>
      </div>
    </div>
  );
};
