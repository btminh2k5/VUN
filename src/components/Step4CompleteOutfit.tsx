import React, { useState } from 'react';
import { ArrowLeft, Bookmark, Check, ChevronDown, ExternalLink, Palette, RotateCw, Sparkles } from 'lucide-react';
import { OutfitSet } from '../data/vietFashionData';
import { MatchResult } from '../utils/matchingEngine';

interface Step4CompleteOutfitProps {
  outfit: OutfitSet;
  matchResult?: MatchResult;
  userQuery?: { context: string; style: string; color: string };
  onSaveOutfit: (outfit: OutfitSet) => void;
  isSaved: boolean;
  onOpenDataset: () => void;
  onBack: () => void;
}

interface StylingAdvice {
  advice?: string;
  genZConcept?: string;
  stylingTips?: string[];
  culturalCheck?: {
    culturalRespectTips?: string;
    cautions?: string;
  };
}

export const Step4CompleteOutfit: React.FC<Step4CompleteOutfitProps> = ({
  outfit,
  onSaveOutfit,
  isSaved,
  onOpenDataset,
  onBack,
}) => {
  const mainGarment = outfit.items.find((item) => item.category === 'main');
  const [showAdvisor, setShowAdvisor] = useState(false);
  const [question, setQuestion] = useState('');
  const [advice, setAdvice] = useState<StylingAdvice | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [adviceError, setAdviceError] = useState('');

  const askStylist = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    setAdviceError('');
    try {
      const response = await fetch('/api/ai-styling', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          context: outfit.context,
          style: outfit.style,
          color: outfit.primaryColor,
          currentOutfit: { title: outfit.title, items: outfit.items.map((item) => item.name) },
          question: question.trim() || 'Gợi ý cách tạo dáng và phối phụ kiện phù hợp với trang phục này.',
        }),
      });
      const data = await response.json();
      if (!response.ok || data.success === false) throw new Error('Không thể tải tư vấn lúc này. Vui lòng thử lại.');
      setAdvice(data);
    } catch {
      setAdviceError('Không thể tải tư vấn lúc này. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 px-1">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-bold text-stone-800 transition hover:text-black"
        >
          <ArrowLeft className="h-4 w-4" />
          Quay lại gợi ý
        </button>
        <h1 className="text-sm font-bold tracking-tight text-stone-900 sm:text-base">Chi tiết trang phục</h1>
      </div>

      <section className="overflow-hidden rounded-3xl border border-stone-200 bg-white p-4 sm:p-7">
        <div className="grid items-start gap-6 lg:grid-cols-2 lg:gap-8">
          <div className="min-w-0 overflow-hidden rounded-2xl border border-stone-200 bg-stone-50">
            <div className="flex h-[440px] items-center justify-center p-4 sm:h-[520px]">
              <img
                src={mainGarment?.imageUrl || outfit.modelImage}
                alt={mainGarment?.name || outfit.title}
                className="h-full w-full rounded-xl object-contain"
              />
            </div>
          </div>

          <div className="min-w-0 space-y-5">
            <div>
              <p className="mb-2 text-[10px] font-extrabold uppercase tracking-[0.18em] text-stone-500">VietFashion / {outfit.categoryName}</p>
              <h2 className="text-2xl font-extrabold leading-tight tracking-tight text-stone-900 sm:text-3xl">
                {mainGarment?.name || outfit.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-stone-600">{outfit.description}</p>
            </div>

            <dl className="divide-y divide-stone-200 rounded-2xl border border-stone-200 bg-stone-50 px-4 text-xs sm:px-5 sm:text-sm">
              {[
                ['Loại trang phục', mainGarment?.type || outfit.categoryName],
                ['Khu vực', mainGarment?.region],
                ['Thời kỳ', mainGarment?.era],
                ['Chất liệu', mainGarment?.material],
                ['Bối cảnh phù hợp', mainGarment?.suitableContexts.join(', ') || outfit.context],
                ['Phong cách', outfit.style],
                ['Đặc điểm', mainGarment?.keyFeatures],
              ].filter(([, value]) => Boolean(value)).map(([label, value]) => (
                <div key={label} className="grid gap-1 py-3 sm:grid-cols-[130px_minmax(0,1fr)] sm:gap-4">
                  <dt className="font-medium text-stone-500">{label}</dt>
                  <dd className="leading-relaxed text-stone-800">{value}</dd>
                </div>
              ))}
            </dl>

            {mainGarment && (
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-stone-900">Ý nghĩa văn hóa</h3>
                <p className="text-sm leading-relaxed text-stone-600">{mainGarment.culturalMeaning}</p>
              </div>
            )}

            <div className="space-y-3 rounded-2xl border border-amber-200 bg-amber-50/60 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-stone-900">
                <span className="inline-flex items-center gap-2"><Palette className="h-4 w-4" />Bảng màu trang phục</span>
                <span className="font-medium text-stone-600">{outfit.primaryColor}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {outfit.colorHarmony.palette.map((color, index) => (
                  <span
                    key={`${color}-${index}`}
                    title={color}
                    aria-label={`Màu ${color}`}
                    className="h-7 w-7 rounded-full border border-black/15"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <p className="text-xs leading-relaxed text-stone-600">{outfit.colorHarmony.explanation}</p>
            </div>

            <button
              type="button"
              onClick={() => onSaveOutfit(outfit)}
              className={`flex w-full items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-extrabold transition ${
                isSaved ? 'bg-stone-900 text-white hover:bg-stone-800' : 'bg-[#ffc21c] text-stone-950 hover:bg-[#ffd451]'
              }`}
            >
              {isSaved ? <Check className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
              {isSaved ? 'Đã lưu trong Lookbook' : 'Lưu trang phục vào Lookbook'}
            </button>
          </div>
        </div>
      </section>

      {mainGarment && (
        <section className="rounded-3xl border border-stone-200 bg-white p-5 sm:p-7">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-stone-900">Cách mặc & phối trang phục</h3>
              <p className="text-sm leading-relaxed text-stone-600">{mainGarment.genZStylingNote}</p>
              <ul className="space-y-2 text-xs leading-relaxed text-stone-600">
                {mainGarment.culturalDoAndDont.dos.map((note) => <li key={note}><span className="font-bold text-stone-800">Nên: </span>{note}</li>)}
                {mainGarment.culturalDoAndDont.donts.map((note) => <li key={note}><span className="font-bold text-stone-800">Lưu ý: </span>{note}</li>)}
              </ul>
            </div>
            <div className="space-y-3 rounded-2xl bg-stone-50 p-4">
              <h3 className="text-sm font-bold text-stone-900">Nguồn tham khảo</h3>
              <p className="text-xs font-semibold text-stone-700">{mainGarment.verifiedSource.museum}</p>
              <p className="text-xs leading-relaxed text-stone-500">{mainGarment.verifiedSource.citation}</p>
              <a
                href={mainGarment.verifiedSource.documentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-800 underline underline-offset-4"
              >
                Xem nguồn tham khảo <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </section>
      )}

      <section className="rounded-3xl bg-stone-900 p-5 text-white sm:p-6">
        <button
          type="button"
          onClick={() => setShowAdvisor((current) => !current)}
          aria-expanded={showAdvisor}
          aria-controls="outfit-stylist"
          className="flex w-full items-center justify-between gap-4 text-left"
        >
          <span className="inline-flex items-center gap-3 text-sm font-bold"><Sparkles className="h-4 w-4 text-[#ffc21c]" />Tư vấn cách phối trang phục</span>
          <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${showAdvisor ? 'rotate-180' : ''}`} />
        </button>
        {showAdvisor && (
          <div id="outfit-stylist" className="mt-5 space-y-4">
            <form onSubmit={askStylist} className="flex flex-col gap-2 sm:flex-row">
              <label htmlFor="stylist-question" className="sr-only">Câu hỏi về trang phục</label>
              <input
                id="stylist-question"
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                placeholder="Ví dụ: Phối giày và phụ kiện như thế nào?"
                className="min-w-0 flex-1 rounded-xl border border-stone-600 bg-stone-800 px-4 py-3 text-xs text-white outline-none placeholder:text-stone-400 focus:border-[#ffc21c]"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#ffc21c] px-5 py-3 text-xs font-bold text-stone-950 disabled:opacity-60"
              >
                {isLoading && <RotateCw className="h-3.5 w-3.5 animate-spin" />}
                {isLoading ? 'Đang tư vấn…' : 'Gửi câu hỏi'}
              </button>
            </form>
            {adviceError && <p role="alert" className="text-xs text-amber-200">{adviceError}</p>}
            {advice && (
              <div aria-live="polite" className="space-y-3 border-t border-stone-700 pt-4 text-xs leading-relaxed text-stone-200">
                {advice.advice && <p className="whitespace-pre-line">{advice.advice}</p>}
                {advice.genZConcept && <p>{advice.genZConcept}</p>}
                {Array.isArray(advice.stylingTips) && <ul className="list-disc space-y-1 pl-4">{advice.stylingTips.map((tip, index) => <li key={index}>{tip}</li>)}</ul>}
                {advice.culturalCheck?.culturalRespectTips && <p>{advice.culturalCheck.culturalRespectTips}</p>}
                {advice.culturalCheck?.cautions && <p className="text-amber-200">{advice.culturalCheck.cautions}</p>}
              </div>
            )}
          </div>
        )}
      </section>

      <div className="flex justify-center">
        <button type="button" onClick={onOpenDataset} className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-stone-700 hover:text-black">
          Khám phá VietFashion Dataset <ExternalLink className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};
