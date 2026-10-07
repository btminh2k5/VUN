/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { ArrowUpRight, Bookmark, Database, Menu, ShieldCheck } from 'lucide-react';
import {
  OUTFIT_SETS,
  VIET_FASHION_ITEMS,
  OutfitSet,
  GarmentItem
} from './data/vietFashionData';
import { findMatchingOutfits, MatchResult } from './utils/matchingEngine';
import { StepHeader } from './components/StepHeader';
import { Step1InputForm } from './components/Step1InputForm';
import { Step2OutfitSuggestions } from './components/Step2OutfitSuggestions';
import { Step3ItemDetail } from './components/Step3ItemDetail';
import { Step4CompleteOutfit } from './components/Step4CompleteOutfit';
import { VietFashionDatasetModal } from './components/VietFashionDatasetModal';
import { LookbookModal } from './components/LookbookModal';
import { CulturalGuidelinesModal } from './components/CulturalGuidelinesModal';
import { CulturalAnimatedBackground } from './components/CulturalAnimatedBackground';

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedContext, setSelectedContext] = useState('Tết');
  const [selectedStyle, setSelectedStyle] = useState('Hiện đại');
  const [selectedColor, setSelectedColor] = useState('Đỏ');
  const [currentOutfitIndex, setCurrentOutfitIndex] = useState(0);
  const [selectedItemForDetail, setSelectedItemForDetail] = useState<GarmentItem>(
    VIET_FASHION_ITEMS['ao-dai-do-gam']
  );
  const [savedOutfits, setSavedOutfits] = useState<OutfitSet[]>(() => {
    try {
      const saved = localStorage.getItem('vietfashion_saved_outfits');
      return saved ? JSON.parse(saved) : [OUTFIT_SETS[0]];
    } catch {
      return [OUTFIT_SETS[0]];
    }
  });
  const [favoriteItemIds, setFavoriteItemIds] = useState<string[]>(['ao-dai-do-gam']);
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
  const matchedOutfits = React.useMemo(
    () => matchResults.map((result) => result.outfit),
    [matchResults]
  );
  const activeOutfit = matchedOutfits[currentOutfitIndex] || matchedOutfits[0] || OUTFIT_SETS[0];
  const isCurrentOutfitSaved = savedOutfits.some((outfit) => outfit.id === activeOutfit.id);

  const goToStep = (step: number) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStep1Submit = () => {
    setCurrentOutfitIndex(0);
    goToStep(2);
  };

  const handleSelectGarmentItem = (item: GarmentItem) => {
    setSelectedItemForDetail(item);
    goToStep(3);
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
            <button onClick={() => setIsDatasetModalOpen(true)} className="transition hover:text-black">Bộ sưu tập</button>
            <button onClick={() => setIsGuidelinesModalOpen(true)} className="transition hover:text-black">Câu chuyện di sản</button>
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsDatasetModalOpen(true)}
              className="nav-icon-button dataset-nav-button"
              title="Mở VietFashion Dataset"
            >
              <Database className="h-4 w-4" />
            </button>
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
            matchResults={matchResults}
            currentIndex={currentOutfitIndex}
            onSelectIndex={setCurrentOutfitIndex}
            selectedContext={selectedContext}
            selectedStyle={selectedStyle}
            selectedColor={selectedColor}
            onViewOutfitDetails={() => goToStep(4)}
            onSelectItem={handleSelectGarmentItem}
            onEditFilters={() => goToStep(1)}
            isSaved={isCurrentOutfitSaved}
            onToggleSave={() => handleSaveToggleOutfit(activeOutfit)}
          />
        )}

        {currentStep === 3 && (
          <Step3ItemDetail
            item={selectedItemForDetail}
            onBack={() => goToStep(2)}
            onProceedToOutfit={() => goToStep(4)}
            isFavorited={favoriteItemIds.includes(selectedItemForDetail.id)}
            onToggleFavorite={() =>
              setFavoriteItemIds((current) =>
                current.includes(selectedItemForDetail.id)
                  ? current.filter((id) => id !== selectedItemForDetail.id)
                  : [...current, selectedItemForDetail.id]
              )
            }
          />
        )}

        {currentStep === 4 && (
          <Step4CompleteOutfit
            outfit={activeOutfit}
            matchResult={matchResults[currentOutfitIndex] || matchResults[0]}
            userQuery={{ context: selectedContext, style: selectedStyle, color: selectedColor }}
            onInspectItem={handleSelectGarmentItem}
            onSaveOutfit={handleSaveToggleOutfit}
            isSaved={isCurrentOutfitSaved}
            onOpenDataset={() => setIsDatasetModalOpen(true)}
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
          const index = matchedOutfits.findIndex((candidate) => candidate.id === outfit.id);
          if (index !== -1) setCurrentOutfitIndex(index);
          goToStep(4);
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
            <button onClick={() => setIsDatasetModalOpen(true)} className="footer-link">
              Dữ liệu gốc <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
            <span className="px-2 text-black/35">© 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
