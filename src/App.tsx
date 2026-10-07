/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { Bookmark, Menu, ShieldCheck } from 'lucide-react';
import {
  OUTFIT_SETS,
  REAL_DATASET_35_ITEMS,
  COLOR_OPTIONS,
  OutfitSet,
  GarmentItem
} from './data/vietFashionData';
import { findMatchingOutfits, MatchResult } from './utils/matchingEngine';
import { StepHeader } from './components/StepHeader';
import { Step1InputForm } from './components/Step1InputForm';
import { Step2OutfitSuggestions } from './components/Step2OutfitSuggestions';
import { Step4CompleteOutfit } from './components/Step4CompleteOutfit';
import { VietFashionDatasetModal } from './components/VietFashionDatasetModal';
import { LookbookModal } from './components/LookbookModal';
import { CulturalGuidelinesModal } from './components/CulturalGuidelinesModal';
import { CulturalAnimatedBackground } from './components/CulturalAnimatedBackground';
import { fetchRecommendations } from './services/recommendationApi';

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedContext, setSelectedContext] = useState('Tết');
  const [selectedStyle, setSelectedStyle] = useState('Hiện đại');
  const [selectedColor, setSelectedColor] = useState('Đỏ');
  const [currentOutfitIndex, setCurrentOutfitIndex] = useState(0);
  const [apiOutfits, setApiOutfits] = useState<OutfitSet[] | null>(null);
  const [isRecommending, setIsRecommending] = useState(false);
  const [recommendationError, setRecommendationError] = useState('');
  const [detailOutfit, setDetailOutfit] = useState<OutfitSet | null>(null);
  const [savedOutfits, setSavedOutfits] = useState<OutfitSet[]>(() => {
    try {
      const saved = localStorage.getItem('vietfashion_saved_outfits');
      return saved ? JSON.parse(saved) : [OUTFIT_SETS[0]];
    } catch {
      return [OUTFIT_SETS[0]];
    }
  });
  const [isDatasetModalOpen, setIsDatasetModalOpen] = useState(false);
  const [isLookbookModalOpen, setIsLookbookModalOpen] = useState(false);
  const [isGuidelinesModalOpen, setIsGuidelinesModalOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('vietfashion_saved_outfits', JSON.stringify(savedOutfits));
    } catch (error) {
      console.error(error);
    }
  }, [savedOutfits]);

  const matchResults: MatchResult[] = React.useMemo(
    () => findMatchingOutfits(selectedContext, selectedStyle, selectedColor),
    [selectedContext, selectedStyle, selectedColor]
  );
  const matchedOutfits = React.useMemo(() => {
    const localOutfits = matchResults.map((result) => result.outfit);
    const candidates = apiOutfits ? [...apiOutfits, ...localOutfits] : localOutfits;
    const seenCategories = new Set<string>();

    return candidates.filter((outfit) => {
      if (seenCategories.has(outfit.categoryName)) return false;
      seenCategories.add(outfit.categoryName);
      return true;
    }).slice(0, 5);
  }, [apiOutfits, matchResults]);
  const activeOutfit = detailOutfit || matchedOutfits[currentOutfitIndex] || matchedOutfits[0] || OUTFIT_SETS[0];
  const isCurrentOutfitSaved = savedOutfits.some((outfit) => outfit.id === activeOutfit.id);

  const goToStep = (step: number) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStep1Submit = async () => {
    setCurrentOutfitIndex(0);
    setDetailOutfit(null);
    setApiOutfits(null);
    setRecommendationError('');
    setIsRecommending(true);
    goToStep(2);
    try {
      const recommendations = await fetchRecommendations(selectedContext, selectedStyle, selectedColor);
      setApiOutfits(recommendations);
    } catch (error) {
      setRecommendationError(error instanceof Error ? error.message : 'Không thể tải gợi ý từ hệ thống.');
    } finally {
      setIsRecommending(false);
    }
  };

  const handleSelectOutfit = (outfit: OutfitSet) => {
    const index = matchedOutfits.findIndex((candidate) => candidate.id === outfit.id);
    if (index !== -1) setCurrentOutfitIndex(index);
    setDetailOutfit(outfit);
    goToStep(3);
  };

  const handleSelectGarmentItem = (item: GarmentItem) => {
    const existingOutfit = OUTFIT_SETS.find((outfit) =>
      outfit.modelImage === item.imageUrl || outfit.items.some((garment) => garment.id === item.id)
    );
    if (existingOutfit) {
      handleSelectOutfit(existingOutfit);
      setIsDatasetModalOpen(false);
      return;
    }

    const record = REAL_DATASET_35_ITEMS.find((variant) => variant.imageUrl === item.imageUrl);
    const template = OUTFIT_SETS.find((outfit) => outfit.categoryName === record?.category);
    if (!record || !template) return;

    const additionalColors: Record<string, string> = {
      Cam: '#EA580C', Tím: '#7E22CE', Nâu: '#78350F', Be: '#D6D3D1', 'Xanh lục': '#047857'
    };
    const colorHex = COLOR_OPTIONS.find((color) => color.value === record.color)?.hex
      || additionalColors[record.color] || template.colorHex;
    const garment: GarmentItem = {
      ...template.items[0],
      id: `dataset-${record.id}`,
      name: record.name,
      imageUrl: record.imageUrl,
      galleryImages: [record.imageUrl],
      region: record.region,
      culturalMeaning: record.culturalMeaning,
      colorHex
    };
    handleSelectOutfit({
      ...template,
      id: `set-dataset-${record.id}`,
      title: record.name,
      subtitle: record.category,
      description: record.culturalMeaning,
      primaryColor: record.color,
      colorHex,
      modelImage: record.imageUrl,
      model3DConfig: { ...template.model3DConfig, baseColor: colorHex, trimColor: colorHex },
      items: [garment],
      colorHarmony: { ...template.colorHarmony, palette: [colorHex], explanation: record.culturalMeaning }
    });
    setIsDatasetModalOpen(false);
  };

  const handleSaveToggleOutfit = (outfit: OutfitSet) => {
    setSavedOutfits((current) =>
      current.some((saved) => saved.id === outfit.id)
        ? current.filter((saved) => saved.id !== outfit.id)
        : [...current, outfit]
    );
  };

  return (
    <div className="galileo-page relative flex min-h-screen flex-col overflow-x-hidden text-[#141414]">
      <CulturalAnimatedBackground />

      <header className="galileo-nav sticky top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-5">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between rounded-full border border-black/10 bg-white/90 px-4 shadow-[0_10px_35px_rgba(0,0,0,0.08)] backdrop-blur-xl sm:px-6">
          <button
            type="button"
            onClick={() => goToStep(1)}
            className="group flex items-center gap-2.5"
            aria-label="Về trang đầu"
          >
            <span className="brand-mark" aria-hidden="true"><span /><span /></span>
            <span className="text-sm font-black tracking-[-0.03em] sm:text-base">Boss of delay</span>
          </button>

          <nav className="hidden items-center gap-8 text-xs font-semibold text-black/65 lg:flex">
            <button onClick={() => goToStep(1)} className="transition hover:text-black">Phối đồ</button>
            <button onClick={() => setIsGuidelinesModalOpen(true)} className="transition hover:text-black">Câu chuyện di sản</button>
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsLookbookModalOpen(true)}
              className="galileo-primary-button h-10 px-4 text-xs sm:px-5"
            >
              <Bookmark className="h-4 w-4" />
              <span className="hidden sm:inline">Lookbook</span>
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1 text-[10px] text-white">
                {savedOutfits.length}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setIsGuidelinesModalOpen(true)}
              className="nav-icon-button mobile-menu-button"
              aria-label="Mở câu chuyện di sản"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="relative z-20 mx-auto mt-4 w-full max-w-7xl px-3 sm:px-5">
        <StepHeader currentStep={currentStep} onSelectStep={goToStep} />
      </div>

      <main className="relative z-10 mx-auto w-full max-w-7xl flex-1 px-3 pb-16 pt-5 sm:px-5 sm:pt-8">
        {currentStep === 1 && (
          <Step1InputForm
            selectedContext={selectedContext}
            onSelectContext={setSelectedContext}
            selectedStyle={selectedStyle}
            onSelectStyle={setSelectedStyle}
            selectedColor={selectedColor}
            onSelectColor={setSelectedColor}
            onSubmit={handleStep1Submit}
          />
        )}

        {currentStep === 2 && (
          <Step2OutfitSuggestions
            outfits={matchedOutfits}
            currentIndex={currentOutfitIndex}
            onSelectOutfit={(index) => handleSelectOutfit(matchedOutfits[index])}
            onEditFilters={() => goToStep(1)}
            isLoading={isRecommending}
            error={recommendationError}
          />
        )}

        {currentStep === 3 && (
          <Step4CompleteOutfit
            key={activeOutfit.id}
            outfit={activeOutfit}
            userQuery={{ context: selectedContext, style: selectedStyle, color: selectedColor }}
            onSaveOutfit={handleSaveToggleOutfit}
            isSaved={isCurrentOutfitSaved}
            onOpenDataset={() => setIsDatasetModalOpen(true)}
            onBack={() => goToStep(2)}
          />
        )}
      </main>

      <VietFashionDatasetModal
        isOpen={isDatasetModalOpen}
        onClose={() => setIsDatasetModalOpen(false)}
        onSelectItem={handleSelectGarmentItem}
      />
      <LookbookModal
        isOpen={isLookbookModalOpen}
        onClose={() => setIsLookbookModalOpen(false)}
        savedOutfits={savedOutfits}
        onRemoveOutfit={(id) => setSavedOutfits((current) => current.filter((outfit) => outfit.id !== id))}
        onSelectOutfit={(outfit) => {
          handleSelectOutfit(outfit);
          setIsLookbookModalOpen(false);
        }}
      />
      <CulturalGuidelinesModal
        isOpen={isGuidelinesModalOpen}
        onClose={() => setIsGuidelinesModalOpen(false)}
      />

      <footer className="relative z-10 border-t border-black/15 bg-[#f4f1e8] px-5 py-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-black">
              <span className="brand-mark brand-mark-small"><span /><span /></span>
              Boss of delay
            </div>
            <p className="max-w-md text-xs leading-5 text-black/55">
              Di sản Việt được kể lại bằng một trải nghiệm phối đồ mới, trực quan và tôn trọng nguyên bản.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
            <button onClick={() => setIsGuidelinesModalOpen(true)} className="footer-link">
              <ShieldCheck className="h-3.5 w-3.5" /> Chuẩn mực di sản
            </button>
            <span className="px-2 text-black/35">© 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
