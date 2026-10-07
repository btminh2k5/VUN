import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Heart, 
  ShieldCheck, 
  BookOpen, 
  ExternalLink, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle,
  Eye,
  Shirt,
  Calendar,
  Layers,
  Check
} from 'lucide-react';
import { GarmentItem } from '../data/vietFashionData';

interface Step3ItemDetailProps {
  item: GarmentItem;
  onBack: () => void;
  onProceedToOutfit: () => void;
  isFavorited?: boolean;
  onToggleFavorite?: () => void;
}

export const Step3ItemDetail: React.FC<Step3ItemDetailProps> = ({
  item,
  onBack,
  onProceedToOutfit,
  isFavorited = false,
  onToggleFavorite
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const images = item.galleryImages && item.galleryImages.length > 0 ? item.galleryImages : [item.imageUrl];

  return (
    <div className="w-full space-y-6">
      {/* Top Breadcrumbs / Back Bar */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-4 sm:p-5 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-stone-700 hover:text-red-700 font-semibold text-xs sm:text-sm transition group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Quay lại các gợi ý phối đồ</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden sm:inline">Dữ liệu chuẩn xác:</span> {item.verifiedSource.museum}
          </div>

          <button
            type="button"
            onClick={onToggleFavorite}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition ${
              isFavorited
                ? 'bg-red-50 border-red-200 text-red-600'
                : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isFavorited ? 'fill-current' : ''}`} />
            <span>{isFavorited ? 'Đã yêu thích' : 'Yêu thích món này'}</span>
          </button>
        </div>
      </div>

      {/* Main Full-Width Dual Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Gallery & Museum Source (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-5 space-y-4">
            {/* Big Main Image */}
            <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden bg-stone-100 shadow-xs">
              <img
                src={images[selectedImageIndex] || item.imageUrl}
                alt={item.name}
                className="w-full h-full object-cover object-center transition duration-300"
              />
              <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>VietFashion Dataset</span>
              </div>
            </div>

            {/* Thumbnails Row */}
            <div className="grid grid-cols-4 gap-2">
              {images.slice(0, 4).map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative h-20 rounded-xl overflow-hidden border-2 transition ${
                    selectedImageIndex === idx
                      ? 'border-red-600 ring-2 ring-red-600/20'
                      : 'border-stone-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Góc chụp ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Museum Verification Box */}
            <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-900 shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-amber-950">
                  Nguồn nghiên cứu: {item.verifiedSource.museum}
                </p>
                <p className="text-[11px] text-amber-900/80 mt-0.5 leading-relaxed">
                  {item.verifiedSource.citation}
                </p>
                <a
                  href={item.verifiedSource.documentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-amber-900 font-bold hover:underline mt-2"
                >
                  <span>Xem tài liệu gốc tại bảo tàng</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Structured Cultural Specification & Guidelines (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-6 sm:p-8 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-red-700 bg-red-50 px-2.5 py-0.5 rounded-full border border-red-200">
                  {item.type}
                </span>
                <span className="text-xs text-stone-500">
                  {item.region} · {item.era}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold font-['Playfair_Display',serif] text-stone-900">
                {item.name}
              </h1>
            </div>

            {/* Structured Table */}
            <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200 space-y-3 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 pb-2.5 border-b border-stone-200/80">
                <span className="sm:col-span-4 text-stone-500 font-semibold">Loại trang phục</span>
                <span className="sm:col-span-8 font-bold text-stone-900">{item.type}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 pb-2.5 border-b border-stone-200/80">
                <span className="sm:col-span-4 text-stone-500 font-semibold">Khu vực lưu hành</span>
                <span className="sm:col-span-8 font-medium text-stone-800">{item.region}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 pb-2.5 border-b border-stone-200/80">
                <span className="sm:col-span-4 text-stone-500 font-semibold">Bối cảnh phù hợp</span>
                <span className="sm:col-span-8 font-medium text-stone-800">{item.suitableContexts.join(', ')}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 pb-2.5 border-b border-stone-200/80">
                <span className="sm:col-span-4 text-stone-500 font-semibold">Đặc điểm nhận diện</span>
                <span className="sm:col-span-8 text-stone-700 leading-relaxed">{item.keyFeatures}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 pb-2.5 border-b border-stone-200/80">
                <span className="sm:col-span-4 text-stone-500 font-semibold">Chất liệu truyền thống</span>
                <span className="sm:col-span-8 text-stone-800 font-medium">{item.material}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 pt-1">
                <span className="sm:col-span-4 text-stone-500 font-semibold">Ý nghĩa văn hóa</span>
                <span className="sm:col-span-8 text-stone-800 leading-relaxed font-serif italic text-xs sm:text-sm">
                  "{item.culturalMeaning}"
                </span>
              </div>
            </div>

            {/* Gen Z Styling Note */}
            <div className="bg-amber-50/50 rounded-2xl p-4 border border-amber-200 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-950">
                <Sparkles className="w-4 h-4 text-amber-700" />
                <span>Mẹo phối đồ & Tạo dáng cho Gen Z:</span>
              </div>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                {item.genZStylingNote}
              </p>
            </div>

            {/* Dos and Don'ts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 space-y-2">
                <span className="font-bold text-xs text-emerald-950 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Nên làm (Tôn trọng di sản):</span>
                </span>
                <ul className="text-xs text-emerald-900 space-y-1 list-disc list-inside">
                  {item.culturalDoAndDont.dos.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-rose-50/70 border border-rose-200 rounded-2xl p-4 space-y-2">
                <span className="font-bold text-xs text-rose-950 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>Cần tránh (Phòng sai lệch di sản):</span>
                </span>
                <ul className="text-xs text-rose-900 space-y-1 list-disc list-inside">
                  {item.culturalDoAndDont.donts.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={onProceedToOutfit}
                className="flex-1 bg-gradient-to-r from-red-700 to-amber-700 hover:from-red-800 hover:to-amber-800 text-white font-semibold py-3.5 px-6 rounded-2xl shadow-md text-xs sm:text-sm flex items-center justify-center gap-2 transition"
              >
                <span>Xem trọn bộ phối đồ hoàn chỉnh</span>
                <Eye className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onBack}
                className="py-3.5 px-6 rounded-2xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-800 font-semibold text-xs sm:text-sm transition text-center"
              >
                Quay lại gợi ý
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
