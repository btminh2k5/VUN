import React from 'react';
import { Check, Info, Shirt, Sparkles } from 'lucide-react';

interface StepHeaderProps {
  currentStep: number;
  onSelectStep: (step: number) => void;
}

const steps = [
  { num: 1, short: 'Cá nhân hóa', label: 'Chọn phong cách', icon: Sparkles },
  { num: 2, short: 'Khám phá', label: 'AI gợi ý', icon: Shirt },
  { num: 3, short: 'Câu chuyện', label: 'Xem từng món', icon: Info },
  { num: 4, short: 'Hoàn thiện', label: 'Bộ phối 3D', icon: Check }
];

export const StepHeader: React.FC<StepHeaderProps> = ({ currentStep, onSelectStep }) => (
  <div className="step-dock overflow-x-auto rounded-full border border-black/10 bg-white/80 p-1.5 shadow-[0_10px_35px_rgba(0,0,0,0.07)] backdrop-blur-xl">
    <div className="grid min-w-[660px] grid-cols-4 gap-1 sm:min-w-0">
      {steps.map((step) => {
        const isActive = currentStep === step.num;
        const isComplete = currentStep > step.num;
        const Icon = step.icon;

        return (
          <button
            key={step.num}
            type="button"
            onClick={() => onSelectStep(step.num)}
            className={`step-dock-item ${isActive ? 'is-active' : ''}`}
            aria-current={isActive ? 'step' : undefined}
          >
            <span className={`step-number ${isComplete ? 'is-complete' : ''}`}>
              {isComplete ? <Check className="h-3 w-3" /> : <Icon className="h-3.5 w-3.5" />}
            </span>
            <span className="min-w-0 text-left">
              <span className="block text-[9px] font-bold uppercase tracking-[0.16em] opacity-45">
                0{step.num} · {step.short}
              </span>
              <span className="block truncate text-[11px] font-bold sm:text-xs">{step.label}</span>
            </span>
          </button>
        );
      })}
    </div>
  </div>
);
