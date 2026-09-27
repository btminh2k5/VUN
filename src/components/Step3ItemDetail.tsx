import React, { useState } from 'react';
import { ArrowLeft, Heart, ShieldCheck, BookOpen, ExternalLink, Sparkles, AlertTriangle, CheckCircle } from 'lucide-react';
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
    <div className="max-w-md mx-auto bg-white rounded-3xl border border-stone-200 shadow-md overflow-hidden">
      {/* Top Header matching mockup 3 */}
      <div className="px-5 py-4 flex items-center justify-between border-b border-stone-100 bg-stone-50/70">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-stone-800 hover:text-red-700 transition font-medium text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-semibold font-['Playfair_Display',serif]">{item.name}</span>
        </button>

        <button
          type="button"
          onClick={onToggleFavorite}
          className={`p-2 rounded-full transition ${
            isFavorited ? 'text-red-600 bg-red-50' : 'text-stone-400 hover:text-red-600 hover:bg-stone-100'
          }`}
          title="Yêu thích món đồ này"
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
        </button>
      </div>

      <div className="p-5 space-y-4">
        {/* Photo Gallery: Main photo + side thumbnails */}
        <div className="grid grid-cols-12 gap-2.5">
          {/* Main Large Photo */}
          <div className="col-span-9 relative h-[250px] rounded-2xl overflow-hidden bg-stone-100 shadow-xs">
            <img
              src={images[selectedImageIndex] || item.imageUrl}
              alt={item.name}
              className="w-full h-full object-cover object-center transition duration-300"
            />
            <div className="absolute top-2.5 left-2.5 bg-black/50 backdrop-blur-md text-white text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>VietFashion Dataset</span>
            </div>
          </div>

          {/* Thumbnails list on the right */}
          <div className="col-span-3 flex flex-col gap-2 justify-between">
            {images.slice(0, 4).map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedImageIndex(idx)}
                className={`relative flex-1 rounded-xl overflow-hidden border-2 transition ${
                  selectedImageIndex === idx ? 'border-red-600 shadow-xs' : 'border-stone-200 opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`Góc chụp ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Structured Information Table from VietFashion Dataset */}
        <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200/80 space-y-2.5 text-xs">
          <div className="flex items-start">
            <span className="w-32 text-stone-500 font-medium">Loại trang phục</span>
            <span className="text-stone-400 mr-2">:</span>
            <span className="font-semibold text-stone-900 flex-1">{item.type}</span>
          </div>

          <div className="flex items-start">
            <span className="w-32 text-stone-500 font-medium">Khu vực</span>
            <span className="text-stone-400 mr-2">:</span>
            <span className="text-stone-800 flex-1">{item.region}</span>
          </div>

          <div className="flex items-start">
            <span className="w-32 text-stone-500 font-medium">Bối cảnh phù hợp</span>
            <span className="text-stone-400 mr-2">:</span>
            <span className="text-stone-800 flex-1 font-medium">{item.suitableContexts.join(', ')}</span>
          </div>

          <div className="flex items-start">
            <span className="w-32 text-stone-500 font-medium">Đặc điểm</span>
            <span className="text-stone-400 mr-2">:</span>
            <span className="text-stone-700 flex-1 leading-relaxed">{item.keyFeatures}</span>
          </div>

          <div className="flex items-start">
            <span className="w-32 text-stone-500 font-medium">Chất liệu</span>
            <span className="text-stone-400 mr-2">:</span>
            <span className="text-stone-800 flex-1">{item.material}</span>
          </div>

          <div className="flex items-start pt-1 border-t border-stone-200">
            <span className="w-32 text-stone-500 font-medium">Ý nghĩa văn hóa</span>
            <span className="text-stone-400 mr-2">:</span>
            <span className="text-stone-800 flex-1 leading-relaxed font-serif italic">
              "{item.culturalMeaning}"
            </span>
          </div>
        </div>

        {/* Museum Verified Source Box */}
        <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-3.5 flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-900 shrink-0">
            <BookOpen className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-semibold text-amber-950">
              Nguồn: {item.verifiedSource.museum}
            </p>
            <p className="text-[10px] text-amber-800/80 line-clamp-1 mt-0.5">
              {item.verifiedSource.citation}
            </p>
            <a
              href={item.verifiedSource.documentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] text-amber-900 font-semibold hover:underline mt-1"
            >
              <span>Xem tài liệu gốc</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Gen Z Styling Note & Cultural Do's and Don'ts */}
        <div className="space-y-2">
          {/* Gen Z Style Note */}
          <div className="bg-stone-50 rounded-xl p-3 border border-stone-200">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-800 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Gợi ý phối đồ cho Gen Z:</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              {item.genZStylingNote}
            </p>
          </div>

          {/* Cultural Etiquette: Dos & Donts */}
          <div className="grid grid-cols-1 gap-2 text-xs">
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-2.5">
              <span className="font-semibold text-emerald-900 flex items-center gap-1 mb-1">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>Nên làm (Tôn trọng văn hóa):</span>
              </span>
              <ul className="list-disc list-inside text-emerald-800/90 text-[11px] space-y-0.5">
                {item.culturalDoAndDont.dos.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </div>

            <div className="bg-rose-50/70 border border-rose-200 rounded-xl p-2.5">
              <span className="font-semibold text-rose-900 flex items-center gap-1 mb-1">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                <span>Cần tránh (Phòng sai lệch di sản):</span>
              </span>
              <ul className="list-disc list-inside text-rose-800/90 text-[11px] space-y-0.5">
                {item.culturalDoAndDont.donts.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={onProceedToOutfit}
            className="w-full bg-gradient-to-r from-red-700 to-amber-700 hover:from-red-800 hover:to-amber-800 text-white font-medium py-3 px-4 rounded-xl text-xs font-semibold shadow-sm flex items-center justify-center gap-2 transition"
          >
            <span>Xem trọn bộ phối đồ hoàn chỉnh</span>
          </button>
        </div>
      </div>
    </div>
  );
};
