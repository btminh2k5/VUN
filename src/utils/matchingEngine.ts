import { OutfitSet } from '../types/fashion';
import { OUTFIT_SETS } from '../data/outfitSets';
import { COLOR_OPTIONS } from '../data/options';

export interface MatchResult {
  outfit: OutfitSet;
  score: number;
  matchPercentage: number;
  matchReasons: string[];
  adaptedColorHex?: string;
}

// Helper to remove Vietnamese diacritics for flexible fuzzy searching
export function removeDiacritics(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase();
}

// Color keywords mapping
const COLOR_MAP: Record<string, { name: string; hex: string }> = {
  'do': { name: 'Đỏ', hex: '#C51E28' },
  'red': { name: 'Đỏ', hex: '#C51E28' },
  'ruou': { name: 'Đỏ', hex: '#991B1B' },
  'vang': { name: 'Vàng', hex: '#CA8A04' },
  'gold': { name: 'Vàng', hex: '#EAB308' },
  'cam': { name: 'Cam', hex: '#EA580C' },
  'orange': { name: 'Cam', hex: '#EA580C' },
  'xanh lam': { name: 'Xanh lam', hex: '#0D9488' },
  'xanh duong': { name: 'Xanh lam', hex: '#0284C7' },
  'xanh ngoc': { name: 'Xanh lam', hex: '#0D9488' },
  'lam': { name: 'Xanh lam', hex: '#0D9488' },
  'xanh com': { name: 'Xanh cốm', hex: '#047857' },
  'com': { name: 'Xanh cốm', hex: '#047857' },
  'xanh luc': { name: 'Xanh cốm', hex: '#047857' },
  'luc': { name: 'Xanh cốm', hex: '#047857' },
  'xanh la': { name: 'Xanh cốm', hex: '#16A34A' },
  'xanh': { name: 'Xanh lam', hex: '#0D9488' },
  'trang': { name: 'Trắng', hex: '#F8FAFC' },
  'white': { name: 'Trắng', hex: '#F8FAFC' },
  'kem': { name: 'Trắng', hex: '#FDFBF7' },
  'be': { name: 'Be', hex: '#D6D3D1' },
  'hong': { name: 'Hồng', hex: '#DB2777' },
  'pink': { name: 'Hồng', hex: '#F472B6' },
  'sen': { name: 'Hồng', hex: '#EC4899' },
  'tim': { name: 'Tím', hex: '#7E22CE' },
  'purple': { name: 'Tím', hex: '#7E22CE' },
  'nau': { name: 'Nâu', hex: '#78350F' }
};

// Garment keyword clusters to directly prioritize searched garment
const GARMENT_CLUSTERS: Record<string, string[]> = {
  'Áo bà ba': ['ba ba', 'baba', 'aobaba', 'ao ba ba', 'ba-ba', 'mien tay', 'nam bo'],
  'Áo dài': ['ao dai', 'aodai', 'ao-dai', 'dai', 'tan thoi'],
  'Áo giao lĩnh': ['giao linh', 'giaolinh', 'aogiaolinh', 'co phuc giao linh'],
  'Áo ngũ thân tay chẽn': ['ngu than', 'nguthan', 'tay chen', 'taychen', 'aonguthan', 'co do', 'hue'],
  'Áo yếm': ['ao yem', 'aoyem', 'yem', 'yem dao', 'kinh bac', 'quan ho']
};

// Context keyword clusters
const CONTEXT_CLUSTERS: Record<string, string[]> = {
  'Tết': ['tet', 'xuan', 'dau nam', 'chuc tet', 'du xuan', 'li xi', 'nam moi', 'hoa mai', 'hoa dao'],
  'Cưới hỏi': ['cuoi', 'dam cuoi', 'hoi', 'dinh hon', 'an hoi', 'ruoc dau', 'hy su', 'phu dau'],
  'Đi học': ['hoc', 'ky yeu', 'truong', 'giang duong', 'tot nghiep', 'sinh vien', 'hoc sinh', 'cap 3'],
  'Dạo phố': ['dao pho', 'pho co', 'cafe', 'ca phe', 'check in', 'di choi', 'hen ho', 'cuoi tuan'],
  'Lễ hội': ['le hoi', 'festival', 'hoi lim', 'dinh', 'chua', 'den', 'quan ho', 'dan gian', 'tray hoi'],
  'Dạ tiệc': ['da tiec', 'tiec', 'prom', 'gala', 'su kien', 'event', 'sang trong', 'party', 'dinner']
};

export function findMatchingOutfits(
  userContext: string,
  userStyle: string,
  userColor: string
): MatchResult[] {
  const normCtx = removeDiacritics(userContext || '').trim();
  const normSty = removeDiacritics(userStyle || '').trim();
  const normCol = removeDiacritics(userColor || '').trim();

  // Color is a hard requirement: suggestions must never fall back to another
  // color merely because its context or style score is high.
  const requestedColor = resolveRequestedColor(normCol);

  // Combine all user queries for garment detection
  const combinedUserQuery = `${normSty} ${normCtx}`.toLowerCase();

  // Detect custom hex color if user entered one
  let detectedHex: string | undefined;
  for (const [key, val] of Object.entries(COLOR_MAP)) {
    if (normCol.includes(key) || combinedUserQuery.includes(key)) {
      detectedHex = val.hex;
      break;
    }
  }

  const colorMatchedOutfits = normCol
    ? OUTFIT_SETS.filter((outfit) => {
        const outfitColor = removeDiacritics(outfit.primaryColor).trim();
        return requestedColor
          ? outfitColor === requestedColor
          : outfitColor === normCol;
      })
    : OUTFIT_SETS;

  const results: MatchResult[] = colorMatchedOutfits.map((outfit) => {
    let score = 20; // baseline
    const reasons: string[] = [];

    const outfitCategoryNorm = removeDiacritics(outfit.categoryName);
    const outfitTitleNorm = removeDiacritics(outfit.title);
    const outfitCtxNorm = removeDiacritics(outfit.context);

    // 1. Direct Garment Matching (HIGHEST PRIORITY: +80 points)
    let garmentMatched = false;
    for (const [garmentName, keywords] of Object.entries(GARMENT_CLUSTERS)) {
      if (outfit.categoryName === garmentName) {
        if (keywords.some((kw) => combinedUserQuery.includes(kw))) {
          score += 80;
          garmentMatched = true;
          reasons.push(`Khớp chính xác trang phục tìm kiếm "${garmentName}"`);
          break;
        }
      }
    }

    if (!garmentMatched && (outfitCategoryNorm.includes(normSty) || outfitTitleNorm.includes(normSty))) {
      score += 60;
      garmentMatched = true;
      reasons.push(`Đúng dòng trang phục "${outfit.categoryName}"`);
    }

    // 2. Color Matching (+40 points)
    if (normCol) {
      score += 40;
      reasons.push(`Đúng màu sắc "${outfit.primaryColor}" bạn tìm kiếm`);
    }

    // 3. Context Matching (+25 points)
    if (normCtx) {
      if (outfitCtxNorm.includes(normCtx) || normCtx.includes(outfitCtxNorm)) {
        score += 25;
        reasons.push(`Phù hợp bối cảnh "${outfit.context}"`);
      } else {
        for (const [targetCtx, keywords] of Object.entries(CONTEXT_CLUSTERS)) {
          if (targetCtx === outfit.context && keywords.some((kw) => normCtx.includes(kw))) {
            score += 20;
            reasons.push(`Thích hợp cho dịp "${targetCtx}"`);
            break;
          }
        }
      }
    }

    // Cap percentage between 75% and 99%
    const matchPercentage = Math.min(99, Math.max(75, Math.round(score * 0.72)));

    if (reasons.length === 0) {
      reasons.push(`Gợi ý mẫu ${outfit.categoryName} chuẩn di sản`);
    }

    return {
      outfit,
      score,
      matchPercentage,
      matchReasons: reasons,
      adaptedColorHex: detectedHex
    };
  });

  // Sort descending by score
  results.sort((a, b) => b.score - a.score);
  return results;
}

function resolveRequestedColor(normalizedInput: string): string | undefined {
  if (!normalizedInput) return undefined;

  const exactOption = COLOR_OPTIONS.find(
    (color) => removeDiacritics(color.value) === normalizedInput
  );
  if (exactOption) return removeDiacritics(exactOption.value);

  // Prefer specific phrases such as "xanh lam" over the generic "xanh".
  const matchingKeyword = Object.keys(COLOR_MAP)
    .sort((a, b) => b.length - a.length)
    .find((keyword) => normalizedInput.includes(keyword));

  return matchingKeyword
    ? removeDiacritics(COLOR_MAP[matchingKeyword].name)
    : undefined;
}
