import React, { useState } from 'react';
import { X, Bookmark, Share2, Trash2, Check, ArrowRight, Eye, Sparkles } from 'lucide-react';
import { OutfitSet } from '../data/vietFashionData';

interface LookbookModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedOutfits: OutfitSet[];
  onRemoveOutfit: (id: string) => void;
  onSelectOutfit: (outfit: OutfitSet) => void;
}

export const LookbookModal: React.FC<LookbookModalProps> = ({
  isOpen,
  onClose,
  savedOutfits,
  onRemoveOutfit,
  onSelectOutfit
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [compareMode, setCompareMode] = useState<boolean>(false);
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);

  if (!isOpen) return null;

  const handleCopyLink = (id: string) => {
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleCompare = (id: string) => {
    if (selectedForCompare.includes(id)) {
      setSelectedForCompare(selectedForCompare.filter((i) => i !== id));
    } else {
      if (selectedForCompare.length < 2) {
        setSelectedForCompare([...selectedForCompare, id]);
      }
    }
  };

  const compareOutfits = savedOutfits.filter((o) => selectedForCompare.includes(o.id));

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl border border-stone-200 shadow-2xl max-w-3xl w-full max-h-[85vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-700">
              <Bookmark className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-stone-900 font-['Playfair_Display',serif]">
                Lookbook Việt Phục Cá Nhân
              </h2>
              <p className="text-xs text-stone-500">
                Bộ sưu tập các outfit bạn đã lưu ({savedOutfits.length} bộ)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {savedOutfits.length >= 2 && (
              <button
                type="button"
                onClick={() => {
                  setCompareMode(!compareMode);
                  setSelectedForCompare([]);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                  compareMode
                    ? 'bg-amber-700 text-white'
                    : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
                }`}
              >
                {compareMode ? 'Thoát so sánh' : 'So sánh 2 outfit'}
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-stone-700 rounded-xl"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {savedOutfits.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400 mb-3">
                <Bookmark className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-stone-700">Chưa có outfit nào trong Lookbook</p>
              <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                Trong phần Chi tiết trang phục, nhấn "Lưu trang phục vào Lookbook" để thêm mẫu và xem lại bất cứ lúc nào.
              </p>
            </div>
          ) : compareMode && compareOutfits.length === 2 ? (
            /* Comparison Matrix View */
            <div className="space-y-4">
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 font-medium">
                So sánh song song 2 outfit đã chọn:
              </div>
              <div className="grid grid-cols-2 gap-4">
                {compareOutfits.map((outfit) => (
                  <div key={outfit.id} className="bg-stone-50 border border-stone-200 rounded-2xl p-4 space-y-3">
                    <img
                      src={outfit.modelImage}
                      alt={outfit.title}
                      className="w-full h-48 object-cover rounded-xl"
                    />
                    <h4 className="text-sm font-bold text-stone-900 font-['Playfair_Display',serif]">
                      {outfit.title}
                    </h4>
                    <div className="text-xs space-y-1.5 text-stone-700">
                      <p><strong>Bối cảnh:</strong> {outfit.context}</p>
                      <p><strong>Phong cách:</strong> {outfit.style}</p>
                      <p><strong>Hài hòa màu sắc:</strong> {outfit.colorHarmony.score}/100 ({outfit.colorHarmony.element})</p>
                      <p><strong>Số lượng món:</strong> {outfit.items.length} món</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        onSelectOutfit(outfit);
                        onClose();
                      }}
                      className="w-full py-2 bg-stone-900 text-white rounded-xl text-xs font-semibold"
                    >
                      Mở outfit này
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Regular Lookbook Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {savedOutfits.map((outfit) => {
                const isSelected = selectedForCompare.includes(outfit.id);
                return (
                  <div
                    key={outfit.id}
                    className={`bg-white rounded-2xl border p-3.5 flex flex-col justify-between transition ${
                      isSelected ? 'border-amber-600 ring-2 ring-amber-500/20 shadow-sm' : 'border-stone-200'
                    }`}
                  >
                    <div>
                      <div className="relative h-44 rounded-xl overflow-hidden bg-stone-100 mb-3">
                        <img
                          src={outfit.modelImage}
                          alt={outfit.title}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-full backdrop-blur-xs">
                          {outfit.context} · {outfit.style}
                        </span>
                        {compareMode && (
                          <button
                            type="button"
                            onClick={() => toggleCompare(outfit.id)}
                            className={`absolute top-2 right-2 px-2 py-1 rounded-lg text-xs font-bold transition ${
                              isSelected ? 'bg-amber-600 text-white' : 'bg-white/90 text-stone-800'
                            }`}
                          >
                            {isSelected ? 'Đã chọn' : '+ Chọn so sánh'}
                          </button>
                        )}
                      </div>

                      <h4 className="text-sm font-bold text-stone-900 font-['Playfair_Display',serif]">
                        {outfit.title}
                      </h4>
                      <p className="text-xs text-stone-500 line-clamp-1">{outfit.subtitle}</p>

                      <div className="flex items-center gap-1.5 mt-2">
                        {outfit.items.slice(0, 4).map((i) => (
                          <span
                            key={i.id}
                            className="text-[10px] bg-stone-100 text-stone-700 px-2 py-0.5 rounded"
                          >
                            {i.name.split(' ')[0]} {i.name.split(' ')[1]}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            onSelectOutfit(outfit);
                            onClose();
                          }}
                          className="font-bold text-red-700 hover:text-red-800 flex items-center gap-1"
                        >
                          <span>Xem ngay</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleCopyLink(outfit.id)}
                          className="text-stone-500 hover:text-stone-800 p-1"
                          title="Chia sẻ link"
                        >
                          {copiedId === outfit.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => onRemoveOutfit(outfit.id)}
                        className="text-stone-400 hover:text-rose-600 p-1"
                        title="Xóa khỏi Lookbook"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-stone-200 bg-stone-50 flex items-center justify-between text-xs">
          <span className="text-stone-500">
            {compareMode ? 'Chọn 2 outfit để so sánh song song' : 'Dễ dàng lưu trữ và chia sẻ outfit yêu thích'}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-stone-900 text-white rounded-xl font-medium"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
