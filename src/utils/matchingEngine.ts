import { OutfitSet, OUTFIT_SETS, COLOR_OPTIONS } from '../data/vietFashionData';

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
  'man': { name: 'Đỏ', hex: '#881337' },
  'vang': { name: 'Vàng', hex: '#CA8A04' },
  'gold': { name: 'Vàng', hex: '#EAB308' },
  'xanh lam': { name: 'Xanh lam', hex: '#0D9488' },
  'xanh duong': { name: 'Xanh lam', hex: '#0284C7' },
  'xanh ngoc': { name: 'Xanh lam', hex: '#0D9488' },
  'xanh com': { name: 'Xanh cốm', hex: '#047857' },
  'xanh la': { name: 'Xanh cốm', hex: '#16A34A' },
  'trang': { name: 'Trắng', hex: '#F8FAFC' },
  'kem': { name: 'Trắng', hex: '#FDFBF7' },
  'hong': { name: 'Hồng', hex: '#DB2777' },
  'pink': { name: 'Hồng', hex: '#F472B6' },
  'sen': { name: 'Hồng', hex: '#EC4899' },
  'den': { name: 'Đen', hex: '#18181B' },
  'black': { name: 'Đen', hex: '#18181B' },
  'tim': { name: 'Tím', hex: '#7E22CE' },
  'nau': { name: 'Nâu', hex: '#78350F' }
};

// Context keyword clusters
const CONTEXT_CLUSTERS: Record<string, string[]> = {
  'Tết': ['tet', 'xuan', 'dau nam', 'chuc tet', 'du xuan', 'li xi', 'nam moi', 'hoa mai', 'hoa dao'],
  'Cưới hỏi': ['cuoi', 'dam cuoi', 'hoi', 'dinh hon', 'an hoi', 'ruoc dau', 'hy su', 'phu dau', 'chuyen gia'],
  'Đi học': ['hoc', 'ky yeu', 'truong', 'giang duong', 'tot nghiep', 'sinh vien', 'hoc sinh', 'cap 3', 'chup anh ky yeu', 'van mieu'],
  'Dạo phố': ['dao pho', 'pho co', 'cafe', 'ca phe', 'check in', 'di choi', 'hen ho', 'cuoi tuan', 'ho guom', 'duong tau', 'chup anh'],
  'Lễ hội': ['le hoi', 'festival', 'hoi lim', 'dinh', 'chua', 'den', 'quan ho', 'dan gian', 'tray hoi'],
  'Dạ tiệc': ['da tiec', 'tiec', 'prom', 'gala', 'su kien', 'event', 'sang trong', 'party', 'dinner', 'vinh danh']
};

// Style keyword clusters
const STYLE_CLUSTERS: Record<string, string[]> = {
  'Hiện đại': ['hien dai', 'modern', 'gen z', 'tre trung', 'nang dong', 'chic', 'trendy', 'thoi thuong', 'pha cach'],
  'Tối giản': ['toi gian', 'minimalist', 'don gian', 'nhe nhang', 'thanh thoat', 'basic', 'tinh te', 'moc mac'],
  'Cổ điển': ['co dien', 'vintage', 'hoang gia', 'cung dinh', 'trieu nguyen', 'truyen thong', 'heritage', 'co phuc', 'xua'],
  'Thanh lịch': ['thanh lich', 'doan trang', 'quy phai', 'nang tho', 'tieu thu', 'diu dang', 'kin dao', 'sang trong'],
  'Phá cách Y2K': ['y2k', 'pha cach', 'rebel', 'ca tinh', 'doc la', 'chay', 'ngau', 'streetwear', 'pha cach y2k']
};

export function findMatchingOutfits(
  userContext: string,
  userStyle: string,
  userColor: string
): MatchResult[] {
  const normCtx = removeDiacritics(userContext || '').trim();
  const normSty = removeDiacritics(userStyle || '').trim();
  const normCol = removeDiacritics(userColor || '').trim();

  // Detect custom hex color if user entered one
  let detectedHex: string | undefined;
  for (const [key, val] of Object.entries(COLOR_MAP)) {
    if (normCol.includes(key)) {
      detectedHex = val.hex;
      break;
    }
  }

  const results: MatchResult[] = OUTFIT_SETS.map((outfit) => {
    let score = 20; // baseline presence
    const reasons: string[] = [];

    const outfitCtxNorm = removeDiacritics(outfit.context);
    const outfitStyNorm = removeDiacritics(outfit.style);
    const outfitColNorm = removeDiacritics(outfit.primaryColor);

    // 1. Context matching
    let ctxMatched = false;
    if (normCtx) {
      if (outfitCtxNorm.includes(normCtx) || normCtx.includes(outfitCtxNorm)) {
        score += 35;
        ctxMatched = true;
        reasons.push(`Khớp chính xác bối cảnh "${outfit.context}"`);
      } else {
        // Check clusters
        for (const [targetCtx, keywords] of Object.entries(CONTEXT_CLUSTERS)) {
          if (targetCtx === outfit.context && keywords.some((kw) => normCtx.includes(kw))) {
            score += 30;
            ctxMatched = true;
            reasons.push(`Phù hợp bối cảnh "${userContext}" (${outfit.context})`);
            break;
          }
        }
      }
    }

    // 2. Style matching
    let styMatched = false;
    if (normSty) {
      if (outfitStyNorm.includes(normSty) || normSty.includes(outfitStyNorm)) {
        score += 30;
        styMatched = true;
        reasons.push(`Đúng phong cách "${outfit.style}" mà bạn yêu thích`);
      } else {
        for (const [targetSty, keywords] of Object.entries(STYLE_CLUSTERS)) {
          if (targetSty === outfit.style && keywords.some((kw) => normSty.includes(kw))) {
            score += 25;
            styMatched = true;
            reasons.push(`Đồng điệu phong cách "${userStyle}" (${outfit.style})`);
            break;
          }
        }
      }
    }

    // 3. Color matching
    let colMatched = false;
    if (normCol) {
      if (outfitColNorm.includes(normCol) || normCol.includes(outfitColNorm)) {
        score += 25;
        colMatched = true;
        reasons.push(`Đúng tông màu chủ đạo "${outfit.primaryColor}"`);
      } else {
        for (const [key, val] of Object.entries(COLOR_MAP)) {
          if (normCol.includes(key) && outfitColNorm.includes(removeDiacritics(val.name))) {
            score += 22;
            colMatched = true;
            reasons.push(`Tông màu "${val.name}" tương thích yêu cầu "${userColor}"`);
            break;
          }
        }
      }
    }

    // Secondary semantic matches (search inside description, subtitle, tags)
    const allText = removeDiacritics(
      `${outfit.title} ${outfit.subtitle} ${outfit.description} ${outfit.items.map((i) => i.name).join(' ')}`
    );

    if (normCtx && allText.includes(normCtx) && !ctxMatched) {
      score += 15;
      reasons.push(`Tương thích với từ khóa "${userContext}" trong tư liệu`);
    }
    if (normSty && allText.includes(normSty) && !styMatched) {
      score += 12;
      reasons.push(`Hợp với phong cách "${userStyle}"`);
    }
    if (normCol && allText.includes(normCol) && !colMatched) {
      score += 10;
      reasons.push(`Hài hòa với gam màu "${userColor}"`);
    }

    // Cap percentage between 65% and 99%
    const matchPercentage = Math.min(99, Math.max(68, Math.round(score * 0.95)));

    if (reasons.length === 0) {
      reasons.push('Đề xuất thịnh hành phù hợp phong cách Gen Z');
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
