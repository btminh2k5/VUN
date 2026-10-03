/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Bookmark, 
  ShieldCheck, 
  Database, 
  BookOpen, 
  RotateCcw, 
  HelpCircle,
  ExternalLink,
  Heart
} from 'lucide-react';
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
  const [currentStep, setCurrentStep] = useState<number>(1);

  // 3 Primary Inputs for Step 1
  const [selectedContext, setSelectedContext] = useState<string>('Tết');
  const [selectedStyle, setSelectedStyle] = useState<string>('Hiện đại');
  const [selectedColor, setSelectedColor] = useState<string>('Đỏ');

  // Active outfit selection
  const [currentOutfitIndex, setCurrentOutfitIndex] = useState<number>(0);

  // Item selected for detailed inspection in Step 3
  const [selectedItemForDetail, setSelectedItemForDetail] = useState<GarmentItem>(
    VIET_FASHION_ITEMS['ao-dai-do-gam']
  );

  // Saved Outfits (Lookbook) with LocalStorage sync
  const [savedOutfits, setSavedOutfits] = useState<OutfitSet[]>(() => {
    try {
      const saved = localStorage.getItem('vietfashion_saved_outfits');
      return saved ? JSON.parse(saved) : [OUTFIT_SETS[0]];
    } catch {
      return [OUTFIT_SETS[0]];
    }
  });

  // Favorite items
  const [favoriteItemIds, setFavoriteItemIds] = useState<string[]>(['ao-dai-do-gam']);

  // Modals state
  const [isDatasetModalOpen, setIsDatasetModalOpen] = useState(false);
  const [isLookbookModalOpen, setIsLookbookModalOpen] = useState(false);
  const [isGuidelinesModalOpen, setIsGuidelinesModalOpen] = useState(false);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('vietfashion_saved_outfits', JSON.stringify(savedOutfits));
    } catch (e) {
      console.error(e);
    }
  }, [savedOutfits]);

  // Compute matched / ranked outfits based on the 3 inputs using intelligent semantic matching
  const matchResults: MatchResult[] = React.useMemo(() => {
    return findMatchingOutfits(selectedContext, selectedStyle, selectedColor);
  }, [selectedContext, selectedStyle, selectedColor]);

  const matchedOutfits = React.useMemo(() => {
    return matchResults.map((r) => r.outfit);
  }, [matchResults]);

  const activeOutfit = matchedOutfits[currentOutfitIndex] || matchedOutfits[0] || OUTFIT_SETS[0];

  const handleStep1Submit = () => {
    setCurrentOutfitIndex(0);
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectGarmentItem = (item: GarmentItem) => {
    setSelectedItemForDetail(item);
    setCurrentStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveToggleOutfit = (outfit: OutfitSet) => {
    if (savedOutfits.some((o) => o.id === outfit.id)) {
      setSavedOutfits((prev) => prev.filter((o) => o.id !== outfit.id));
    } else {
      setSavedOutfits((prev) => [...prev, outfit]);
    }
  };

  const handleToggleFavoriteItem = (itemId: string) => {
    setFavoriteItemIds((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  const isCurrentOutfitSaved = savedOutfits.some((o) => o.id === activeOutfit.id);

  return (
    <div className="relative min-h-screen text-stone-900 flex flex-col font-['Be_Vietnam_Pro',sans-serif] overflow-x-hidden">
      {/* Animated Cultural Background: Đông Sơn Drum, Floating Petals, Silk Waves */}
      <CulturalAnimatedBackground />

      {/* Top Application Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-stone-200/80 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo & Brand */}
          <div
            onClick={() => setCurrentStep(1)}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-red-700 to-amber-700 flex items-center justify-center text-white shadow-sm transition group-hover:scale-105">
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current text-amber-200">
                <path d="M12 2C12 2 9 6.5 9 10C9 12.5 10.5 14 12 14C13.5 14 15 12.5 15 10C15 6.5 12 2 12 2ZM5.5 10C4 11.5 3 13.5 3 16C3 19 6 21 12 21C18 21 21 19 21 16C21 13.5 20 11.5 18.5 10C17.5 12.5 15.5 14.5 12 15C8.5 14.5 6.5 12.5 5.5 10Z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold tracking-wider font-['Playfair_Display',serif] text-stone-900">
                  Boss of delay
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200">
                  Gen Z Heritage
                </span>
              </div>
              <p className="text-[11px] text-stone-500 hidden sm:block">
                Khám phá & phối trang phục truyền thống Việt Nam
              </p>
            </div>
          </div>

          {/* Quick Action Navigation Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Cultural safety button */}
            <button
              type="button"
              onClick={() => setIsGuidelinesModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200/80 rounded-xl transition"
              title="Cẩm nang & Cảnh báo văn hóa"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden md:inline">Cẩm nang văn hóa</span>
            </button>

            {/* VietFashion Dataset Explorer */}
            <button
              type="button"
              onClick={() => setIsDatasetModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-950 hover:text-stone-900 bg-amber-50 hover:bg-amber-100 border border-amber-300 rounded-xl transition shadow-2xs"
              title="PostgreSQL Database: vietfashion (Port 5433) - 35 Ảnh Thật"
            >
              <Database className="w-3.5 h-3.5 text-amber-800" />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="hidden sm:inline">PostgreSQL: 35 Ảnh Thật</span>
              <span className="sm:hidden">Postgres</span>
            </button>

            {/* Saved Lookbook */}
            <button
              type="button"
              onClick={() => setIsLookbookModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-red-700 hover:bg-red-800 rounded-xl shadow-xs transition"
              title="Mở Lookbook đã lưu"
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Lookbook ({savedOutfits.length})</span>
            </button>
          </div>
        </div>
      </header>

      {/* 4-Step Process Guide Header matching user request and screenshot */}
      <div className="relative z-10">
        <StepHeader
          currentStep={currentStep}
          onSelectStep={(step) => {
            setCurrentStep(step);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      </div>

      {/* Main Dynamic Step Body */}
      <main className="relative z-10 flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
        {currentStep === 1 && (
          <div className="py-2">
            <Step1InputForm
              selectedContext={selectedContext}
              onSelectContext={setSelectedContext}
              selectedStyle={selectedStyle}
              onSelectStyle={setSelectedStyle}
              selectedColor={selectedColor}
              onSelectColor={setSelectedColor}
              onSubmit={handleStep1Submit}
            />
          </div>
        )}

        {currentStep === 2 && (
          <div className="py-2">
            <Step2OutfitSuggestions
              outfits={matchedOutfits}
              matchResults={matchResults}
              currentIndex={currentOutfitIndex}
              onSelectIndex={setCurrentOutfitIndex}
              selectedContext={selectedContext}
              selectedStyle={selectedStyle}
              selectedColor={selectedColor}
              onViewOutfitDetails={() => {
                setCurrentStep(4);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onSelectItem={handleSelectGarmentItem}
              onEditFilters={() => setCurrentStep(1)}
              isSaved={isCurrentOutfitSaved}
              onToggleSave={() => handleSaveToggleOutfit(activeOutfit)}
            />
          </div>
        )}

        {currentStep === 3 && (
          <div className="py-2">
            <Step3ItemDetail
              item={selectedItemForDetail}
              onBack={() => setCurrentStep(2)}
              onProceedToOutfit={() => setCurrentStep(4)}
              isFavorited={favoriteItemIds.includes(selectedItemForDetail.id)}
              onToggleFavorite={() => handleToggleFavoriteItem(selectedItemForDetail.id)}
            />
          </div>
        )}

        {currentStep === 4 && (
          <div className="py-2">
            <Step4CompleteOutfit
              outfit={activeOutfit}
              matchResult={matchResults[currentOutfitIndex] || matchResults[0]}
              userQuery={{
                context: selectedContext,
                style: selectedStyle,
                color: selectedColor
              }}
              onInspectItem={handleSelectGarmentItem}
              onSaveOutfit={handleSaveToggleOutfit}
              isSaved={isCurrentOutfitSaved}
              onOpenDataset={() => setIsDatasetModalOpen(true)}
            />
          </div>
        )}
      </main>

      {/* Global Modals */}
      <VietFashionDatasetModal
        isOpen={isDatasetModalOpen}
        onClose={() => setIsDatasetModalOpen(false)}
        onSelectItem={(item) => {
          handleSelectGarmentItem(item);
        }}
      />

      <LookbookModal
        isOpen={isLookbookModalOpen}
        onClose={() => setIsLookbookModalOpen(false)}
        savedOutfits={savedOutfits}
        onRemoveOutfit={(id) => setSavedOutfits((prev) => prev.filter((o) => o.id !== id))}
        onSelectOutfit={(outfit) => {
          const idx = matchedOutfits.findIndex((o) => o.id === outfit.id);
          if (idx !== -1) {
            setCurrentOutfitIndex(idx);
          }
          setCurrentStep(4);
        }}
      />

      <CulturalGuidelinesModal
        isOpen={isGuidelinesModalOpen}
        onClose={() => setIsGuidelinesModalOpen(false)}
      />

      {/* App Footer */}
      <footer className="relative z-10 bg-white/95 backdrop-blur-md border-t border-stone-200 mt-auto py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-red-700 text-white flex items-center justify-center font-serif text-[10px]">
              B
            </div>
            <span>Boss of delay © 2026 · Di sản Việt trong thời trang thế hệ mới</span>
          </div>

          <div className="flex items-center gap-4 text-stone-600">
            <button
              type="button"
              onClick={() => setIsGuidelinesModalOpen(true)}
              className="hover:text-red-700 transition"
            >
              Chuẩn mực di sản
            </button>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => setIsDatasetModalOpen(true)}
              className="hover:text-red-700 transition"
            >
              Bảo tàng & Tài liệu gốc
            </button>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => {
                setCurrentStep(1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-red-700 transition"
            >
              Phối đồ mới
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
