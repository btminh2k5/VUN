import React, { useState } from 'react';
import { 
  Bookmark, 
  Share2, 
  Sparkles, 
  Check, 
  Eye, 
  Layers, 
  ShieldCheck, 
  Palette, 
  MessageSquare, 
  RotateCw,
  Info,
  ExternalLink,
  Heart
} from 'lucide-react';
import { OutfitSet, GarmentItem, VIET_FASHION_ITEMS } from '../data/vietFashionData';
import { Mannequin3DViewer } from './Mannequin3DViewer';
import { MatchResult } from '../utils/matchingEngine';

interface Step4CompleteOutfitProps {
  outfit: OutfitSet;
  matchResult?: MatchResult;
  userQuery?: { context: string; style: string; color: string };
  onInspectItem: (item: GarmentItem) => void;
  onSaveOutfit: (outfit: OutfitSet) => void;
  isSaved: boolean;
  onOpenDataset: () => void;
}

export const Step4CompleteOutfit: React.FC<Step4CompleteOutfitProps> = ({
  outfit,
  matchResult,
  userQuery,
  onInspectItem,
  onSaveOutfit,
  isSaved,
  onOpenDataset
}) => {
  const [activeAvatar, setActiveAvatar] = useState<'female' | 'male' | 'mannequin'>('female');
  const [selectedItemForViewer, setSelectedItemForViewer] = useState<GarmentItem | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<any>(null);
  const [showAiAdvisor, setShowAiAdvisor] = useState(false);

  // Group items by category - focusing on suggested garment
  const mainGarment = outfit.items.find((i) => i.category === 'main');
  const accessoryItems = outfit.items.filter((i) => i.category === 'accessory');
  const headwearItem = outfit.items.find((i) => i.category === 'headwear');

  const handleShare = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2500);
      }
    } catch {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleAskAiStylist = async () => {
    setAiLoading(true);
    try {
      const res = await fetch('/api/ai-styling', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          context: outfit.context,
          style: outfit.style,
          color: outfit.primaryColor,
          currentOutfit: {
            title: outfit.title,
            items: outfit.items.map((i) => i.name)
          },
          question: aiQuestion.trim() || 'Gợi ý cách tạo dáng, chọn layout makeup và phụ kiện Gen Z phù hợp nhất cho set này.'
        })
      });
      const data = await res.json();
      setAiResponse(data);
    } catch (err) {
      console.error(err);
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Top Banner & Summary Card */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden p-6 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 3D / Realistic Mannequin Studio */}
          <div className="lg:col-span-6 h-[580px]">
            <Mannequin3DViewer
              outfit={outfit}
              selectedItem={selectedItemForViewer}
              onSelectItem={(item) => {
                setSelectedItemForViewer(item);
                onInspectItem(item);
              }}
              activeAvatar={activeAvatar}
              onChangeAvatar={setActiveAvatar}
            />
          </div>

          {/* Right Column: Outfit Breakdown matching Mockup 4 */}
          <div className="lg:col-span-6 space-y-5">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-800">
                  VietFashion Recommended
                </span>
                <span className="text-xs text-stone-500 font-medium">
                  Bối cảnh: {outfit.context} · {outfit.style}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-stone-900 font-['Playfair_Display',serif]">
                {outfit.title}
              </h2>
              <p className="text-xs text-stone-500 mt-1 font-medium">
                {outfit.subtitle}
              </p>

              {/* Match Result Banner from user request */}
              {matchResult && (
                <div className="mt-2.5 p-2.5 bg-emerald-50/80 border border-emerald-200/90 rounded-xl text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-emerald-950 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      Gợi ý tương ứng theo yêu cầu của bạn:
                    </span>
                    <span className="font-bold text-emerald-800 bg-white px-2 py-0.5 rounded-full border border-emerald-300">
                      {matchResult.matchPercentage}% Khớp
                    </span>
                  </div>
                  {userQuery && (
                    <p className="text-[11px] text-stone-600">
                      Yêu cầu bạn đã nhập: <em>"{userQuery.context}" · "{userQuery.style}" · "{userQuery.color}"</em>
                    </p>
                  )}
                  {matchResult.matchReasons && matchResult.matchReasons.length > 0 && (
                    <ul className="text-[11px] text-emerald-900 space-y-0.5 pt-0.5">
                      {matchResult.matchReasons.slice(0, 2).map((r, i) => (
                        <li key={i}>✓ {r}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                {outfit.description}
              </p>
            </div>

            {/* List of Component Items (matching user screenshot 4) */}
            <div className="space-y-2.5">
              <p className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                Các món trong bộ phối đồ:
              </p>

              {/* Main Garment */}
              {mainGarment && (
                <div
                  onClick={() => onInspectItem(mainGarment)}
                  className="flex items-center justify-between p-3 rounded-2xl bg-stone-50 hover:bg-amber-50/80 border border-stone-200 cursor-pointer transition group"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={mainGarment.imageUrl}
                      alt={mainGarment.name}
                      className="w-12 h-12 rounded-xl object-cover border border-stone-200"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-stone-900 group-hover:text-red-700 transition">
                        {mainGarment.name}
                      </h4>
                      <p className="text-[11px] text-red-700 font-medium">Trang phục chính · {mainGarment.region}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="text-xs text-stone-500 group-hover:text-stone-900 font-medium flex items-center gap-1"
                  >
                    <span>Chi tiết</span>
                    <Info className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Headwear */}
              {headwearItem && (
                <div
                  onClick={() => onInspectItem(headwearItem)}
                  className="flex items-center justify-between p-2.5 rounded-2xl bg-stone-50 hover:bg-amber-50/80 border border-stone-200 cursor-pointer transition group"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={headwearItem.imageUrl}
                      alt={headwearItem.name}
                      className="w-10 h-10 rounded-xl object-cover border border-stone-200"
                    />
                    <div>
                      <h4 className="text-xs font-semibold text-stone-900 group-hover:text-red-700 transition">
                        {headwearItem.name}
                      </h4>
                      <p className="text-[11px] text-stone-500">Mấn / Nón</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="text-xs text-stone-500 group-hover:text-stone-900 font-medium flex items-center gap-1"
                  >
                    <span>Chi tiết</span>
                    <Info className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            {/* Color Harmony Box */}
            <div className="bg-amber-50/60 border border-amber-200/80 rounded-2xl p-3.5 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Palette className="w-4 h-4 text-amber-700" />
                  <span className="text-xs font-bold text-amber-950">Chỉ số hài hòa màu sắc</span>
                </div>
                <span className="text-xs font-bold text-amber-900">
                  {outfit.colorHarmony.score}/100 · {outfit.colorHarmony.element}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                {outfit.colorHarmony.palette.map((c, i) => (
                  <span
                    key={i}
                    className="w-6 h-6 rounded-full border border-stone-300 shadow-xs"
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
              <p className="text-[11px] text-stone-600 leading-relaxed">
                {outfit.colorHarmony.explanation}
              </p>
            </div>

            {/* Two Primary Action Buttons matching Mockup 4 */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  if (mainGarment) onInspectItem(mainGarment);
                }}
                className="flex-1 py-3 px-4 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-800 text-xs font-bold shadow-xs transition text-center"
              >
                Xem chi tiết từng món
              </button>

              <button
                type="button"
                onClick={() => onSaveOutfit(outfit)}
                className={`flex-1 py-3 px-4 rounded-xl text-white text-xs font-bold shadow-sm transition flex items-center justify-center gap-2 ${
                  isSaved
                    ? 'bg-emerald-700 hover:bg-emerald-800'
                    : 'bg-red-700 hover:bg-red-800'
                }`}
              >
                <Bookmark className="w-4 h-4" />
                <span>{isSaved ? 'Đã lưu trong Lookbook' : 'Lưu bộ đồ'}</span>
              </button>

              <button
                type="button"
                onClick={handleShare}
                className="p-3 rounded-xl border border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700 transition"
                title="Chia sẻ bộ đồ"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
              </button>
            </div>

            {copiedLink && (
              <p className="text-[11px] text-emerald-700 font-medium text-center">
                Đã sao chép link outfit vào bộ nhớ tạm!
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Interactive Gen Z AI Stylist Box */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-amber-950 text-white rounded-3xl p-6 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold font-['Playfair_Display',serif] text-white">
                Boss of delay AI Stylist (Cố vấn thời trang Gen Z)
              </h3>
              <p className="text-[11px] text-stone-300">
                Tư vấn tạo dáng, makeup, mẹo phụ kiện & kiểm định lề lối văn hóa
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowAiAdvisor(!showAiAdvisor)}
            className="text-xs text-amber-300 hover:text-amber-200 font-medium underline"
          >
            {showAiAdvisor ? 'Thu gọn' : 'Mở tư vấn'}
          </button>
        </div>

        {/* Input Question */}
        <div className="flex gap-2">
          <input
            type="text"
            value={aiQuestion}
            onChange={(e) => setAiQuestion(e.target.value)}
            placeholder="Hỏi AI: Ví dụ: Gợi ý cách tạo dáng chụp ảnh Tết tại phố cổ, hoặc phối giày dép..."
            className="flex-1 bg-stone-800/90 border border-stone-700 rounded-xl px-4 py-2.5 text-xs text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleAskAiStylist();
            }}
          />
          <button
            type="button"
            onClick={handleAskAiStylist}
            disabled={aiLoading}
            className="bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition disabled:opacity-50"
          >
            {aiLoading ? <RotateCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
            <span>Hỏi AI</span>
          </button>
        </div>

        {/* AI Recommendations Results */}
        {aiResponse && (
          <div className="mt-4 pt-4 border-t border-stone-700/80 space-y-3 text-xs">
            {aiResponse.genZConcept && (
              <div>
                <span className="font-semibold text-amber-300">Ý tưởng phong cách Gen Z: </span>
                <span className="text-stone-200">{aiResponse.genZConcept}</span>
              </div>
            )}

            {aiResponse.stylingTips && Array.isArray(aiResponse.stylingTips) && (
              <div className="bg-stone-800/70 p-3 rounded-xl border border-stone-700 space-y-1">
                <span className="font-semibold text-amber-200 block mb-1">Mẹo phối & Tạo dáng:</span>
                <ul className="list-disc list-inside space-y-1 text-stone-300">
                  {aiResponse.stylingTips.map((tip: string, idx: number) => (
                    <li key={idx}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}

            {aiResponse.culturalCheck && (
              <div className="bg-emerald-950/40 border border-emerald-500/40 p-3 rounded-xl text-emerald-200 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Đánh giá chuẩn mực di sản: </span>
                  <span>{aiResponse.culturalCheck.culturalRespectTips || 'Trang phục chuẩn mực'}</span>
                  {aiResponse.culturalCheck.cautions && (
                    <p className="text-[11px] text-amber-300 mt-1">
                      ⚠️ Cảnh báo: {aiResponse.culturalCheck.cautions}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Quick question suggestions */}
        {!aiResponse && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {[
              'Cách tạo dáng chụp ảnh với áo dài',
              'Gợi ý kiểu tóc và makeup phù hợp',
              'Thời tiết se lạnh nên khoác thêm gì?',
              'Có nên đi sneaker với áo ngũ thân?'
            ].map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setAiQuestion(q);
                }}
                className="text-[11px] bg-stone-800/60 hover:bg-stone-700 px-2.5 py-1 rounded-lg text-stone-300 transition"
              >
                {q}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Dataset & Cultural Verification Footer Box matching mockup bottom right */}
      <div className="bg-stone-100 rounded-3xl p-6 border border-stone-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white border border-stone-200 flex items-center justify-center text-red-700 shrink-0">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-stone-900">
                Đảm bảo thông tin văn hóa chính xác
              </h4>
              <p className="text-xs text-stone-600 mt-0.5">
                Tất cả hình ảnh và thông tin đều lấy từ VietFashion Dataset, không tự tạo nội dung ngoài dữ liệu có.
              </p>
              <div className="flex items-center gap-3 text-[11px] text-stone-500 mt-1.5 flex-wrap">
                <span className="flex items-center gap-1 text-emerald-700 font-medium">✓ Dữ liệu có nguồn gốc rõ ràng</span>
                <span className="flex items-center gap-1 text-emerald-700 font-medium">✓ Thông tin được kiểm duyệt</span>
                <span className="flex items-center gap-1 text-emerald-700 font-medium">✓ Tôn trọng giá trị văn hóa Việt</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenDataset}
            className="px-4 py-2 bg-white hover:bg-stone-50 text-stone-900 border border-stone-300 rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5 transition shrink-0"
          >
            <span>Khám phá VietFashion Dataset</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
