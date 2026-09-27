import React from 'react';
import { Sparkles, Shirt, Info, CheckCircle2 } from 'lucide-react';

interface StepHeaderProps {
  currentStep: number;
  onSelectStep: (step: number) => void;
}

export const StepHeader: React.FC<StepHeaderProps> = ({ currentStep, onSelectStep }) => {
  const steps = [
    {
      num: 1,
      title: 'Chọn bối cảnh, phong cách, màu sắc',
      subtitle: 'Người dùng nhập 3 thông tin để AI hiểu nhu cầu',
      icon: Sparkles
    },
    {
      num: 2,
      title: 'AI gợi ý phối đồ',
      subtitle: 'Hệ thống tìm kiếm trong VietFashion Dataset và đề xuất outfit',
      icon: Shirt
    },
    {
      num: 3,
      title: 'Click vào từng món để xem chi tiết',
      subtitle: 'Khi chọn một món, ứng dụng hiển thị thông tin văn hóa đầy đủ',
      icon: Info
    },
    {
      num: 4,
      title: 'Kết quả: Bộ phối đồ hoàn chỉnh',
      subtitle: 'Xem toàn bộ outfit 3D, phân tích màu sắc và lưu Lookbook',
      icon: CheckCircle2
    }
  ];

  return (
    <div className="w-full bg-white border-b border-stone-200 shadow-xs mb-6">
      <div className="max-w-6xl mx-auto px-4 py-4">
        {/* Step Tabs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {steps.map((s) => {
            const isActive = currentStep === s.num;
            const isCompleted = currentStep > s.num;

            return (
              <button
                key={s.num}
                type="button"
                onClick={() => onSelectStep(s.num)}
                className={`text-left p-3 rounded-xl border transition-all relative ${
                  isActive
                    ? 'border-amber-600 bg-amber-50/70 shadow-sm ring-1 ring-amber-600/30'
                    : isCompleted
                    ? 'border-stone-300 bg-stone-50/70 hover:bg-stone-100/70 text-stone-700'
                    : 'border-stone-200 bg-white/60 hover:bg-stone-50 text-stone-600'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                      isActive
                        ? 'bg-amber-700 text-white shadow-xs'
                        : isCompleted
                        ? 'bg-emerald-600 text-white'
                        : 'bg-stone-200 text-stone-600'
                    }`}
                  >
                    {isCompleted ? '✓' : s.num}
                  </div>
                  <div className="min-w-0">
                    <p
                      className={`text-xs font-semibold leading-tight truncate ${
                        isActive ? 'text-amber-950 font-bold' : 'text-stone-800'
                      }`}
                    >
                      {s.num}. {s.title}
                    </p>
                    <p className="text-[11px] text-stone-600 leading-snug line-clamp-1 mt-0.5">
                      {s.subtitle}
                    </p>
                  </div>
                </div>

                {/* Active Indicator Underline */}
                {isActive && (
                  <div className="absolute bottom-0 left-3 right-3 h-0.5 bg-amber-600 rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
