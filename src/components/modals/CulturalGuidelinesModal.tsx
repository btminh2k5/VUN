import React from 'react';
import { X, ShieldAlert, CheckCircle, AlertTriangle } from 'lucide-react';
import { CULTURAL_GUIDELINES } from '../../data/options';

interface CulturalGuidelinesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CulturalGuidelinesModal: React.FC<CulturalGuidelinesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl border border-stone-200 shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-700">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-stone-900 font-['Playfair_Display',serif]">
                Cẩm Nang Văn Hóa & Cảnh Báo Phối Đồ
              </h2>
              <p className="text-xs text-stone-500">
                Phối đồ hiện đại cho Gen Z nhưng bảo đảm gìn giữ sự tôn nghiêm của di sản
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 rounded-xl"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-2xl text-xs text-amber-950 leading-relaxed">
            <p className="font-semibold mb-1">🌿 Tinh thần sáng tạo văn hóa:</p>
            Trang phục truyền thống Việt Nam có bề dày lịch sử và ý nghĩa nhân sinh sâu sắc. Gen Z hoàn toàn có thể sáng tạo, biến tấu phụ kiện hiện đại, nhưng cần tuân thủ những chuẩn mực cốt lõi để không biến nét đẹp di sản thành sự phản cảm.
          </div>

          <div className="space-y-3">
            {CULTURAL_GUIDELINES.map((guide, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-2xl border text-xs space-y-1.5 ${
                  guide.severity === 'critical'
                    ? 'bg-rose-50/50 border-rose-200 text-rose-950'
                    : guide.severity === 'important'
                    ? 'bg-amber-50/50 border-amber-200 text-amber-950'
                    : 'bg-emerald-50/50 border-emerald-200 text-emerald-950'
                }`}
              >
                <div className="flex items-center gap-2">
                  {guide.severity === 'critical' ? (
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                  ) : (
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  )}
                  <h4 className="font-bold text-sm">{guide.title}</h4>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-white/80 border border-current ml-auto">
                    {guide.rule}
                  </span>
                </div>
                <p className="leading-relaxed text-stone-700 pt-1">
                  {guide.detail}
                </p>
              </div>
            ))}
          </div>

          {/* Reference sources */}
          <div className="pt-2 border-t border-stone-200 text-[11px] text-stone-500">
            Tham khảo từ: Quy chế trang phục truyền thống Việt Nam (Bộ Văn hóa, Thể thao và Du lịch) & Khảo cứu di sản trang phục cung đình triều Nguyễn.
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-stone-200 bg-stone-50 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-stone-900 text-white rounded-xl text-xs font-semibold hover:bg-stone-800"
          >
            Đã hiểu & Tuân thủ
          </button>
        </div>
      </div>
    </div>
  );
};
