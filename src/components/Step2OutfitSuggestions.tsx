import React from 'react';
import { AlertCircle, ArrowRight, Database, HardDrive, RotateCw, SlidersHorizontal } from 'lucide-react';
import { OutfitSet } from '../data/vietFashionData';

interface Step2OutfitSuggestionsProps {
  outfits: OutfitSet[];
  currentIndex: number;
  onSelectOutfit: (index: number) => void;
  onEditFilters: () => void;
  isLoading?: boolean;
  error?: string;
  // true = đang dùng dữ liệu dự phòng cục bộ thay vì kết quả từ PostgreSQL.
  usingFallbackData?: boolean;
}

export const Step2OutfitSuggestions: React.FC<Step2OutfitSuggestionsProps> = ({
  outfits,
  currentIndex,
  onSelectOutfit,
  onEditFilters,
  isLoading = false,
  error = '',
  usingFallbackData = false
}) => (
  <section className="mx-auto max-w-4xl overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-[0_20px_55px_rgba(0,0,0,0.08)]">
    <div className="flex flex-col gap-5 border-b border-black/10 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-8">
      <div>
        <h2 className="text-2xl font-black tracking-[-0.045em] sm:text-3xl">
          Các mẫu áo phù hợp
        </h2>
        {/* Nguồn dữ liệu luôn hiện, không chỉ khi lỗi — người dùng cần biết
            đang xem kết quả thật từ database hay dữ liệu dự phòng. */}
        {!isLoading && outfits.length > 0 && (
          <p className={`mt-2 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-bold ${
            usingFallbackData ? 'bg-amber-100 text-amber-900' : 'bg-stone-100 text-stone-600'
          }`}>
            {usingFallbackData
              ? <><HardDrive className="h-3 w-3" /> Dữ liệu dự phòng cục bộ · {outfits.length} gợi ý</>
              : <><Database className="h-3 w-3" /> PostgreSQL qua engine phối đồ · {outfits.length} gợi ý xếp theo điểm</>}
          </p>
        )}
      </div>
      <button
        type="button"
        onClick={onEditFilters}
        className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-black/15 px-4 py-2.5 text-xs font-bold transition hover:bg-stone-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
      >
        <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
        Sửa tiêu chí
      </button>
    </div>

    {isLoading ? (
      <div className="flex items-center gap-3 p-8 text-sm font-semibold text-black/60">
        <RotateCw className="h-5 w-5 animate-spin" /> Đang tìm các mẫu áo phù hợp với yêu cầu của bạn…
      </div>
    ) : outfits.length === 0 ? (
      <p className="p-8 text-sm text-black/55">Chưa tìm thấy trang phục phù hợp. Hãy thử thay đổi tiêu chí.</p>
    ) : (
      <div>
        {error && (
          <div className="mx-5 mt-5 flex items-start gap-2 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-900 sm:mx-8">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <p><strong>FastAPI chưa phản hồi.</strong> {error} Đang hiển thị dữ liệu dự phòng cục bộ để bạn vẫn có thể tiếp tục — đây không phải kết quả của engine phối đồ.</p>
          </div>
        )}
        <ul className="divide-y divide-black/10 px-5 sm:px-8">
        {outfits.map((outfit, index) => {
          const main = outfit.items.find((item) => item.category === 'main') || outfit.items[0];
          const name = main?.name || outfit.title.replace(/^Gợi ý:\s*/i, '');
          // Hiển thị phụ kiện và điểm: trước đây mỗi dòng chỉ có ảnh + tên áo +
          // tên nhóm, nên hai gợi ý cùng chiếc áo khác phụ kiện trông giống y
          // hệt nhau và người dùng tưởng hệ thống gợi ý trùng.
          const extras = outfit.items
            .filter((item) => item !== main)
            .map((item) => item.name || item.type)
            .filter(Boolean);
          const score = outfit.recommendation?.score;
          return (
            <li key={outfit.id}>
              <button
                type="button"
                onClick={() => onSelectOutfit(index)}
                className={`group flex w-full items-center justify-between gap-5 py-5 text-left text-sm font-bold transition hover:text-[#a83d23] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black sm:py-6 sm:text-base ${currentIndex === index ? 'text-black' : 'text-black/70'}`}
              >
                <span className="flex min-w-0 items-center gap-4">
                  <img src={outfit.modelImage} alt="" className="h-16 w-14 shrink-0 rounded-xl border border-black/10 object-cover" />
                  <span className="min-w-0">
                    <span className="block">{name}</span>
                    <span className="mt-1 block truncate text-xs font-medium text-black/45">
                      {extras.length ? extras.join(' · ') : outfit.categoryName}
                    </span>
                  </span>
                </span>
                {typeof score === 'number' && (
                  <span
                    title="Điểm engine phối đồ"
                    className="ml-auto shrink-0 rounded-full bg-[#f4f1e8] px-2.5 py-1 text-xs font-extrabold tabular-nums text-stone-700"
                  >
                    {score.toFixed(1)}
                  </span>
                )}
                <span className="hidden shrink-0 text-xs font-extrabold text-[#a83d23] sm:inline">Xem gợi ý</span>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f4f1e8] transition group-hover:bg-[#ffc21c] group-hover:text-black">
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </button>
            </li>
          );
        })}
        </ul>
      </div>
    )}
  </section>
);
