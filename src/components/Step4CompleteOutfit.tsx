import React, { useMemo, useState } from 'react';
import { AlertTriangle, ArrowLeft, Bookmark, Check, ExternalLink, Palette, RotateCw, Sparkles } from 'lucide-react';
import { GarmentItem, OutfitSet } from '../data/vietFashionData';
import { MockupLayer, OutfitMockup2D } from './OutfitMockup2D';
import { fetchOutfitAdvice, OutfitAdvice } from '../services/adviceApi';

// TẮT phần tư vấn AI: mỗi lần bấm là một lần gọi API trả phí.
// Bật lại bằng cách đổi cờ này thành true (backend /advice vẫn sẵn sàng,
// và vẫn tự trả tư vấn theo luật nếu LLM_PROVIDER=none).
const ENABLE_AI_ADVICE = false;

interface Step4CompleteOutfitProps {
  outfit: OutfitSet;
  // Tiêu chí người dùng thực sự nhập ở Step 1 — chính xác hơn là đọc lại từ
  // outfit, vì outfit fallback cục bộ mang bối cảnh riêng của nó.
  userQuery?: { context: string; style: string; color: string };
  onSaveOutfit: (outfit: OutfitSet) => void;
  isSaved: boolean;
  onOpenDataset: () => void;
  onBack: () => void;
}

type AccessoryOption = Pick<GarmentItem, 'id' | 'name' | 'category' | 'imageUrl' | 'colorHex'>;

const ACCESSORY_GROUPS: Record<string, string> = {
  nonla: 'headwear', nonquaithao: 'headwear', khanmoqua: 'headwear',
  khanlua: 'scarf', khanran: 'scarf',
  keptoc: 'hair', luoccaitoc: 'hair', tramcaitoc: 'hair',
  tuicoi: 'bag', tuidayrut: 'bag', tuimay: 'bag', tuivai: 'bag', tuixachnho: 'bag',
  quatgiay: 'fan', quatlua: 'fan',
  bongtai: 'earrings', vongco: 'necklace', vongtay: 'bracelet', daylung: 'belt',
};

const GROUP_LABELS: Record<string, string> = {
  headwear: 'Đội đầu', scarf: 'Khăn', hair: 'Phụ kiện tóc', bag: 'Túi',
  fan: 'Quạt', earrings: 'Bông tai', necklace: 'Vòng cổ',
  bracelet: 'Vòng tay', belt: 'Dây lưng', footwear: 'Giày dép',
};

function selectionGroup(item: AccessoryOption): string {
  if (item.category === 'footwear' || item.imageUrl.includes('/footwear/')) return 'footwear';
  const typeCode = item.imageUrl.split('/').at(-2)?.toLowerCase() || item.name;
  return ACCESSORY_GROUPS[typeCode] || `accessory:${typeCode}`;
}

const FALLBACK_ACCESSORIES: AccessoryOption[] = [
  { id: 'fallback-non-la', name: 'Nón lá', category: 'headwear', imageUrl: '/images/dataset/accessories/nonla/nonla.jpg', colorHex: '#D6B98C' },
  { id: 'fallback-khan-lua', name: 'Khăn lụa', category: 'accessory', imageUrl: '/images/dataset/accessories/khanlua/khanlua.jpg', colorHex: '#B91C1C' },
  { id: 'fallback-bong-tai', name: 'Bông tai', category: 'accessory', imageUrl: '/images/dataset/accessories/bongtai/bongtai.jpg', colorHex: '#D4AF37' },
  { id: 'fallback-tui-coi', name: 'Túi cói', category: 'accessory', imageUrl: '/images/dataset/accessories/tuicoi/tuicoi.jpg', colorHex: '#A16207' },
  { id: 'fallback-guoc-moc', name: 'Guốc mộc', category: 'footwear', imageUrl: '/images/dataset/footwear/guocmoc/guocmoc.jpg', colorHex: '#78350F' },
  { id: 'fallback-giay-bup-be', name: 'Giày búp bê', category: 'footwear', imageUrl: '/images/dataset/footwear/giaybupbe/giaybupbe.jpg', colorHex: '#292524' },
];

export const Step4CompleteOutfit: React.FC<Step4CompleteOutfitProps> = ({
  outfit,
  userQuery,
  onSaveOutfit,
  isSaved,
  onOpenDataset,
  onBack,
}) => {
  const mainGarment = outfit.items.find((item) => item.category === 'main');
  const recommendation = outfit.recommendation;
  const [selectedAccessoryIds, setSelectedAccessoryIds] = useState<string[]>([]);
  const [advice, setAdvice] = useState<OutfitAdvice | null>(null);
  const [adviceLoading, setAdviceLoading] = useState(false);
  const [adviceError, setAdviceError] = useState('');
  const accessoryOptions = useMemo<AccessoryOption[]>(() => {
    const recommended = outfit.items.filter((item) => item.category !== 'main' && item.category !== 'pants');
    const merged = [...recommended, ...FALLBACK_ACCESSORIES];
    return merged.filter((item, index) => merged.findIndex((candidate) => candidate.imageUrl === item.imageUrl) === index).slice(0, 8);
  }, [outfit]);
  const selectedAccessories = accessoryOptions.filter((item) => selectedAccessoryIds.includes(item.id));
  const referenceLines = mainGarment
    ? [
        mainGarment.verifiedSource?.museum,
        mainGarment.verifiedSource?.citation,
        ...(outfit.culturalSources || []).map((source) => source.title),
      ]
        .map((value) => value?.trim())
        .filter((value, index, values): value is string => Boolean(value) && values.findIndex((candidate) => candidate?.toLocaleLowerCase() === value?.toLocaleLowerCase()) === index)
    : [];
  const referenceUrl = (outfit.culturalSources || []).find((source) => source.url)?.url || mainGarment?.verifiedSource?.documentUrl;
  const hasReferenceUrl = Boolean(referenceUrl && referenceUrl !== '#' && /^https?:\/\//i.test(referenceUrl));

  const toggleAccessory = (option: AccessoryOption) => {
    setSelectedAccessoryIds((current) => {
      if (current.includes(option.id)) return current.filter((id) => id !== option.id);
      const group = selectionGroup(option);
      return [
        ...current.filter((id) => {
          const selected = accessoryOptions.find((item) => item.id === id);
          return selected && selectionGroup(selected) !== group;
        }),
        option.id,
      ];
    });
  };

  // z-index gốc do engine trả về trong mockup_2d; chỉ khi thiếu mới dùng mặc định theo vai trò.
  const engineLayers = outfit.mockup2D?.layers ?? [];
  const roleFallbackZ: Record<MockupLayer['role'], number> = { garment: 10, accessories: 20, footwear: 30 };
  const mockupLayers = useMemo<MockupLayer[]>(() => {
    const byId = new Map(engineLayers.map((layer) => [layer.itemId, layer]));
    const nameById = new Map(outfit.items.map((item) => [item.id, item.name]));

    const garmentLayer = engineLayers.find((layer) => layer.role === 'garment');
    const base: MockupLayer[] = garmentLayer
      ? [{ ...garmentLayer, name: nameById.get(garmentLayer.itemId) || mainGarment?.name }]
      : mainGarment
        ? [{ itemId: mainGarment.id, role: 'garment', imageUrl: mainGarment.imageUrl, zIndex: roleFallbackZ.garment, name: mainGarment.name }]
        : [];

    // Chưa chọn gì -> hiển thị đúng bộ layer engine gợi ý.
    const source = selectedAccessories.length
      ? selectedAccessories.map((option) => {
          const role: MockupLayer['role'] = selectionGroup(option) === 'footwear' ? 'footwear' : 'accessories';
          const fromEngine = byId.get(option.id);
          return {
            itemId: option.id,
            role,
            imageUrl: option.imageUrl,
            zIndex: fromEngine?.zIndex ?? roleFallbackZ[role],
            name: option.name,
          };
        })
      : engineLayers
          .filter((layer) => layer.role !== 'garment')
          .map((layer) => ({ ...layer, name: nameById.get(layer.itemId) }));

    return [...base, ...source];
  }, [engineLayers, outfit.items, mainGarment, selectedAccessories]);

  const requestAdvice = async () => {
    setAdviceLoading(true);
    setAdviceError('');
    try {
      setAdvice(await fetchOutfitAdvice(
        userQuery?.context ?? outfit.context,
        userQuery?.style ?? outfit.style,
        userQuery?.color ?? outfit.primaryColor,
        outfit.id,
      ));
    } catch (error: any) {
      setAdviceError(error?.message || 'Không lấy được tư vấn phối đồ.');
    } finally {
      setAdviceLoading(false);
    }
  };

  const accessoryTemplate = mainGarment || outfit.items[0];
  const outfitWithAccessories: OutfitSet = {
    ...outfit,
    items: [
      ...outfit.items.filter((item) => item.category === 'main' || item.category === 'pants'),
      ...selectedAccessories.map((option) => outfit.items.find((item) => item.id === option.id) || {
        ...accessoryTemplate,
        ...option,
        type: option.name,
        galleryImages: [option.imageUrl],
        region: '',
        era: '',
        suitableContexts: [],
        suitableStyles: [],
        keyFeatures: '',
        culturalMeaning: '',
        material: '',
        verifiedSource: { name: 'VietFashion Dataset', museum: 'VietFashion Dataset', citation: 'Ảnh trong bộ dữ liệu.', documentUrl: '#' },
        genZStylingNote: '',
        culturalDoAndDont: { dos: [], donts: [] },
      }),
    ],
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
        <div className="grid grid-cols-2 items-start gap-3 sm:gap-6 lg:gap-8">
          <div className="min-w-0">
            <div className="mb-4">
              <p className="mb-2 text-[10px] font-extrabold uppercase tracking-[0.18em] text-stone-500">VietFashion / {outfit.categoryName}</p>
              <h2 className="text-lg font-extrabold leading-tight tracking-tight text-stone-900 sm:text-3xl">{mainGarment?.name || outfit.title}</h2>
            </div>
            <div className="overflow-hidden rounded-2xl border border-stone-200 bg-stone-50">
              <div className="flex h-[360px] items-center justify-center p-2 sm:h-[520px] sm:p-4">
              <img
                src={mainGarment?.imageUrl || outfit.modelImage}
                alt={mainGarment?.name || outfit.title}
                className="h-full w-full rounded-xl object-contain"
              />
              </div>
            </div>
          </div>

          <div className="min-w-0 space-y-5">
            <div className="flex flex-wrap items-end justify-between gap-2">
              <div>
                <h3 className="text-base font-extrabold text-stone-900 sm:text-lg">Chọn phụ kiện phù hợp</h3>
                <p className="mt-1 text-xs text-stone-500">Mỗi loại phụ kiện cùng công dụng và giày dép chỉ chọn một món. Nhấn món khác để thay thế.</p>
              </div>
              <span className="text-xs font-bold text-stone-500">Đã chọn {selectedAccessories.length}</span>
            </div>
            <div className="max-h-[540px] space-y-4 overflow-y-auto pr-1">
              {(['accessory', 'footwear'] as const).map((section) => {
                const options = accessoryOptions.filter((item) => section === 'footwear'
                  ? selectionGroup(item) === 'footwear'
                  : selectionGroup(item) !== 'footwear');
                if (!options.length) return null;
                return (
                  <div key={section}>
                    <h4 className="mb-2 text-xs font-bold uppercase tracking-wide text-stone-500">{section === 'footwear' ? 'Giày dép · chọn 1' : 'Phụ kiện'}</h4>
                    <div className="grid grid-cols-2 gap-2 sm:gap-3">
                      {options.map((item) => {
                        const selected = selectedAccessoryIds.includes(item.id);
                        return (
                          <button
                            key={item.id}
                            type="button"
                            aria-pressed={selected}
                            onClick={() => toggleAccessory(item)}
                            className={`overflow-hidden rounded-2xl border text-left transition ${selected ? 'border-stone-900 bg-amber-50 ring-2 ring-[#ffc21c]' : 'border-stone-200 bg-stone-50 hover:border-stone-400'}`}
                          >
                            <div className="relative h-24 bg-white p-2 sm:h-32">
                              <img src={item.imageUrl} alt={item.name} className="h-full w-full object-contain" />
                              {selected && <span className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-stone-900 text-white"><Check className="h-4 w-4" /></span>}
                            </div>
                            <div className="p-3">
                              <p className="text-[9px] font-bold uppercase tracking-wide text-stone-400">{GROUP_LABELS[selectionGroup(item)] || 'Phụ kiện'}</p>
                              <h4 className="mt-1 text-xs font-bold text-stone-900">{item.name}</h4>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {mockupLayers.length > 1 && (
        <OutfitMockup2D
          layers={mockupLayers}
          background={outfit.mockup2D?.background}
          width={outfit.mockup2D?.width}
          height={outfit.mockup2D?.height}
        />
      )}

      <section className="rounded-3xl border border-stone-200 bg-white p-5 sm:p-7">
        <div className="mb-6">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-stone-500">Chi tiết trang phục</p>
          <h3 className="mt-2 text-xl font-extrabold text-stone-900">{mainGarment?.name || outfit.title}</h3>
          <p className="mt-3 max-w-4xl text-sm leading-relaxed text-stone-600">{outfit.description}</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <dl className="divide-y divide-stone-200 rounded-2xl border border-stone-200 bg-stone-50 px-4 text-xs sm:px-5 sm:text-sm">
            {[
              ['Loại trang phục', mainGarment?.type || outfit.categoryName],
              ['Khu vực', mainGarment?.region],
              ['Thời kỳ', mainGarment?.era],
              ['Chất liệu', mainGarment?.material],
              ['Bối cảnh phù hợp', mainGarment?.suitableContexts?.length ? mainGarment.suitableContexts.join(', ') : ''],
              ['Phong cách', outfit.style],
              ['Đặc điểm', mainGarment?.keyFeatures],
            ].filter(([, value]) => Boolean(value)).map(([label, value]) => (
              <div key={label} className="grid gap-1 py-3 sm:grid-cols-[130px_minmax(0,1fr)] sm:gap-4">
                <dt className="font-medium text-stone-500">{label}</dt>
                <dd className="leading-relaxed text-stone-800">{value}</dd>
              </div>
            ))}
          </dl>

          <div className="space-y-5">
            {mainGarment && (
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-stone-900">Ý nghĩa văn hóa</h4>
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
                  <span key={`${color}-${index}`} title={color} aria-label={`Màu ${color}`} className="h-7 w-7 rounded-full border border-black/15" style={{ backgroundColor: color }} />
                ))}
              </div>
              <p className="text-xs leading-relaxed text-stone-600">{outfit.colorHarmony.explanation}</p>
            </div>
            <button
              type="button"
              onClick={() => onSaveOutfit(outfitWithAccessories)}
              className={`flex w-full items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-extrabold transition ${isSaved ? 'bg-stone-900 text-white hover:bg-stone-800' : 'bg-[#ffc21c] text-stone-950 hover:bg-[#ffd451]'}`}
            >
              {isSaved ? <Check className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
              {isSaved ? 'Đã lưu trong Lookbook' : 'Lưu trang phục vào Lookbook'}
            </button>
          </div>
        </div>
      </section>

      {recommendation && (
        <section className="rounded-3xl border border-stone-200 bg-white p-5 sm:p-7">
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-stone-500">Vì sao đây là gợi ý phù hợp</p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-stone-600">{recommendation.explanation}</p>

          {/* Điểm từng tiêu chí. Tiêu chí thiếu dữ liệu hiện "chưa có dữ liệu",
              không hiện một con số trông như kết luận có căn cứ. */}
          <dl className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {([
              ['Màu sắc', recommendation.scoreBreakdown.color],
              ['Phong cách', recommendation.scoreBreakdown.style],
              ['Bối cảnh', recommendation.scoreBreakdown.occasion],
              ['Văn hoá', recommendation.scoreBreakdown.cultural],
            ] as Array<[string, number | null]>).map(([label, value]) => (
              <div key={label} className={`rounded-2xl border p-3 ${value === null ? 'border-dashed border-stone-300 bg-stone-50' : 'border-stone-200 bg-white'}`}>
                <dt className="text-[10px] font-bold uppercase tracking-wide text-stone-500">{label}</dt>
                <dd className={`mt-1 font-extrabold ${value === null ? 'text-xs text-stone-400' : 'text-lg text-stone-900'}`}>
                  {value === null ? 'Chưa có dữ liệu' : `${value}/10`}
                </dd>
              </div>
            ))}
          </dl>

          {recommendation.scoreBasis && recommendation.scoreBasis.dimensionsMissing.length > 0 && (
            <p className="mt-4 rounded-2xl border border-stone-200 bg-stone-50 p-4 text-xs leading-relaxed text-stone-600">
              Điểm tổng <strong>{recommendation.score}/10</strong> được tính trên{' '}
              <strong>{recommendation.scoreBasis.dimensionsUsed.length}/4 tiêu chí</strong>. Database chưa có dữ liệu{' '}
              {recommendation.scoreBasis.missingLabels.join(', ')}, nên trọng số của tiêu chí đó đã được chia lại cho
              các tiêu chí còn lại thay vì cho một điểm trung bình.
            </p>
          )}
          {recommendation.warnings.length > 0 && (
            <div className="mt-5 space-y-2 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs leading-relaxed text-amber-900">
              {recommendation.warnings.map((warning) => (
                <p key={warning} className="flex gap-2"><AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />{warning}</p>
              ))}
            </div>
          )}
        </section>
      )}

      {ENABLE_AI_ADVICE && (
      <section className="rounded-3xl border border-stone-200 bg-white p-5 sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-stone-500">Tư vấn phối đồ</p>
            <p className="mt-2 max-w-xl text-xs leading-relaxed text-stone-500">
              Phần này do AI viết, nhưng bị ràng buộc theo đúng outfit và điểm số mà engine đã chấm —
              AI không được đổi món, không được tự cho điểm.
            </p>
          </div>
          <button
            type="button"
            onClick={requestAdvice}
            disabled={adviceLoading}
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-stone-900 px-4 py-2.5 text-xs font-extrabold text-white transition hover:bg-stone-700 disabled:opacity-60"
          >
            {adviceLoading ? <RotateCw className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            {advice ? 'Tư vấn lại' : 'Xin tư vấn phối đồ'}
          </button>
        </div>

        {adviceError && (
          <p className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-xs text-red-800">{adviceError}</p>
        )}

        {advice && (
          <div className="mt-5 space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold">
              <span className="rounded-full bg-stone-100 px-3 py-1.5 text-stone-600">
                Nguồn: {advice.adviceSource === 'rule_engine' ? 'Tư vấn theo luật' : advice.adviceSource}
                {advice.model ? ` · ${advice.model}` : ''}
              </span>
              <span className="rounded-full bg-stone-100 px-3 py-1.5 text-stone-600">Điểm engine: {advice.engineScore}/10</span>
              <span className="rounded-full bg-stone-100 px-3 py-1.5 text-stone-600">Văn hoá: {advice.culturalCheck.score}/100</span>
            </div>

            {advice.llmError && (
              <p className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs leading-relaxed text-amber-900">
                <strong>LLM chưa dùng được, đang hiển thị tư vấn theo luật.</strong> {advice.llmError}
              </p>
            )}

            <p className="text-sm leading-relaxed text-stone-700">{advice.genZConcept}</p>

            <ul className="space-y-2 text-sm leading-relaxed text-stone-600">
              {advice.stylingTips.map((tip) => (
                <li key={tip} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#a83d23]" />{tip}</li>
              ))}
            </ul>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2 rounded-2xl bg-stone-50 p-4">
                <h4 className="text-xs font-bold text-stone-900">Ý nghĩa văn hoá</h4>
                <p className="text-xs leading-relaxed text-stone-600">{advice.culturalSignificance}</p>
                <h4 className="pt-2 text-xs font-bold text-stone-900">Hoà hợp màu sắc</h4>
                <p className="text-xs leading-relaxed text-stone-600">{advice.colorHarmonyNote}</p>
              </div>
              <div className="space-y-2 rounded-2xl border border-amber-200 bg-amber-50/60 p-4">
                <h4 className="text-xs font-bold text-stone-900">Giữ đúng tinh thần trang phục</h4>
                <p className="text-xs leading-relaxed text-stone-700">{advice.culturalCheck.culturalRespectTips}</p>
                <h4 className="pt-2 text-xs font-bold text-stone-900">Cần tránh</h4>
                <p className="text-xs leading-relaxed text-stone-700">{advice.culturalCheck.cautions}</p>
              </div>
            </div>
          </div>
        )}
      </section>
      )}

      {mainGarment && (
        <section className="rounded-3xl border border-stone-200 bg-white p-5 sm:p-7">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-stone-900">Cách mặc & phối trang phục</h3>
              <p className="text-sm leading-relaxed text-stone-600">{mainGarment.genZStylingNote}</p>
              <ul className="space-y-2 text-xs leading-relaxed text-stone-600">
                {(mainGarment.culturalDoAndDont?.dos ?? []).map((note) => <li key={note}><span className="font-bold text-stone-800">Nên: </span>{note}</li>)}
                {(mainGarment.culturalDoAndDont?.donts ?? []).map((note) => <li key={note}><span className="font-bold text-stone-800">Lưu ý: </span>{note}</li>)}
              </ul>
            </div>
            <div className="space-y-3 rounded-2xl bg-stone-50 p-4">
              <h3 className="text-sm font-bold text-stone-900">Nguồn tham khảo</h3>
              {referenceLines.map((line, index) => (
                <p key={line} className={index === 0 ? 'text-xs font-semibold text-stone-700' : 'text-xs leading-relaxed text-stone-500'}>{line}</p>
              ))}
              {hasReferenceUrl && (
                <a
                  href={referenceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-800 underline underline-offset-4"
                >
                  Xem nguồn tham khảo <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </div>
        </section>
      )}

      <div className="flex justify-center">
        <button type="button" onClick={onOpenDataset} className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-stone-700 hover:text-black">
          Khám phá VietFashion Dataset <ExternalLink className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};
