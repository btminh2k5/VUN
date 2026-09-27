import React, { useState } from 'react';
import { RotateCcw, Eye, Layers, Sparkles, User, ShieldCheck, ZoomIn, ZoomOut } from 'lucide-react';
import { OutfitSet, GarmentItem } from '../data/vietFashionData';

interface Mannequin3DViewerProps {
  outfit: OutfitSet;
  selectedItem?: GarmentItem | null;
  onSelectItem: (item: GarmentItem) => void;
  activeAvatar: 'female' | 'male' | 'mannequin';
  onChangeAvatar: (avatar: 'female' | 'male' | 'mannequin') => void;
}

export const Mannequin3DViewer: React.FC<Mannequin3DViewerProps> = ({
  outfit,
  selectedItem,
  onSelectItem,
  activeAvatar,
  onChangeAvatar
}) => {
  const [viewMode, setViewMode] = useState<'photo' | '3d'>('photo');
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isRotating, setIsRotating] = useState<boolean>(false);
  const [activeLayers, setActiveLayers] = useState({
    main: true,
    pants: true,
    headwear: true,
    accessory: true,
    footwear: true
  });

  const toggleLayer = (layer: keyof typeof activeLayers) => {
    setActiveLayers((prev) => ({ ...prev, [layer]: !prev[layer] }));
  };

  const handleDragRotate = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isRotating) return;
    setRotationAngle((prev) => (prev + e.movementX * 0.8) % 360);
  };

  // Find items in this outfit
  const mainGarment = outfit.items.find((i) => i.category === 'main');
  const pantsItem = outfit.items.find((i) => i.category === 'pants');
  const accessoryItem = outfit.items.find((i) => i.category === 'accessory');
  const footwearItem = outfit.items.find((i) => i.category === 'footwear');
  const headwearItem = outfit.items.find((i) => i.category === 'headwear');

  // Compute 3D lighting perspective transform
  const rad = (rotationAngle * Math.PI) / 180;
  const shadowOffset = Math.sin(rad) * 18;
  const lightIntensity = 0.85 + Math.cos(rad) * 0.15;

  return (
    <div className="relative flex flex-col h-full bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
      {/* Top Bar: Switcher & Controls */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-stone-100 bg-stone-50/80 backdrop-blur-sm z-10">
        <div className="flex items-center gap-1 bg-stone-200/70 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setViewMode('photo')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              viewMode === 'photo'
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Ảnh thật người mẫu</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('3d')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              viewMode === '3d'
                ? 'bg-amber-700 text-white shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Mô hình 3D tương tác</span>
          </button>
        </div>

        {/* Avatar Model Selector */}
        <div className="flex items-center gap-1">
          <span className="text-[11px] font-medium text-stone-600 hidden sm:inline">Nhân vật:</span>
          <div className="flex bg-stone-100 p-0.5 rounded-lg border border-stone-200">
            <button
              title="Nữ Gen Z"
              onClick={() => onChangeAvatar('female')}
              className={`px-2 py-1 text-xs rounded font-medium transition ${
                activeAvatar === 'female' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              Nữ
            </button>
            <button
              title="Nam Gen Z"
              onClick={() => onChangeAvatar('male')}
              className={`px-2 py-1 text-xs rounded font-medium transition ${
                activeAvatar === 'male' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              Nam
            </button>
            <button
              title="Mannequin Studio"
              onClick={() => onChangeAvatar('mannequin')}
              className={`px-2 py-1 text-xs rounded font-medium transition ${
                activeAvatar === 'mannequin' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              Mannequin
            </button>
          </div>
        </div>
      </div>

      {/* Main View Area */}
      <div className="relative flex-1 flex items-center justify-center min-h-[460px] bg-gradient-to-b from-stone-100/50 via-stone-50 to-stone-100/60 overflow-hidden select-none">
        {viewMode === 'photo' ? (
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <div className="relative max-w-sm w-full h-[440px] rounded-xl overflow-hidden shadow-md group">
              <img
                src={outfit.modelImage}
                alt={outfit.title}
                className="w-full h-full object-cover object-top transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />

              {/* Verified museum badge tag */}
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm text-xs font-medium text-stone-800">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>VietFashion Verified</span>
              </div>

              {/* Bottom overlay info */}
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <p className="text-xs uppercase tracking-wider font-semibold text-amber-300">
                  {outfit.context} · {outfit.style}
                </p>
                <h4 className="text-base font-semibold font-['Playfair_Display',serif] text-white">
                  {outfit.title}
                </h4>
                <p className="text-[11px] text-stone-300 line-clamp-1 mt-0.5">
                  {outfit.subtitle}
                </p>
              </div>

              {/* Interactive item pin tags directly on photo */}
              {mainGarment && (
                <button
                  type="button"
                  onClick={() => onSelectItem(mainGarment)}
                  className="absolute top-1/3 left-1/2 -translate-x-1/2 bg-white/95 hover:bg-amber-50 text-stone-900 px-2 py-1 rounded-full text-[11px] font-medium shadow-md flex items-center gap-1 transition-transform hover:scale-110"
                >
                  <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                  {mainGarment.type}
                </button>
              )}
              {accessoryItem && (
                <button
                  type="button"
                  onClick={() => onSelectItem(accessoryItem)}
                  className="absolute bottom-1/4 right-8 bg-white/95 hover:bg-amber-50 text-stone-900 px-2 py-1 rounded-full text-[11px] font-medium shadow-md flex items-center gap-1 transition-transform hover:scale-110"
                >
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  {accessoryItem.name.split(' ')[0]} {accessoryItem.name.split(' ')[1]}
                </button>
              )}
            </div>
          </div>
        ) : (
          /* 3D Interactive Mannequin Canvas View */
          <div
            className="relative w-full h-full flex flex-col items-center justify-center cursor-grab active:cursor-grabbing p-4"
            onMouseDown={() => setIsRotating(true)}
            onMouseUp={() => setIsRotating(false)}
            onMouseLeave={() => setIsRotating(false)}
            onMouseMove={handleDragRotate}
          >
            {/* 3D Studio lighting background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-50/50 via-stone-100/60 to-stone-200/40 pointer-events-none" />

            {/* Instruction tooltip */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-stone-900/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-[11px] flex items-center gap-1.5 shadow-sm">
              <RotateCcw className="w-3 h-3 text-amber-400" />
              <span>Kéo chuột để xoay 360° · Click món đồ để xem chi tiết</span>
            </div>

            {/* 3D Stylized SVG Render Engine */}
            <div
              className="relative transition-transform duration-75 ease-out"
              style={{
                transform: `scale(${zoomLevel}) rotateY(${rotationAngle}deg)`,
                transformStyle: 'preserve-3d',
                perspective: '1000px'
              }}
            >
              <svg
                width="280"
                height="420"
                viewBox="0 0 280 420"
                className="drop-shadow-xl"
                style={{
                  filter: `drop-shadow(${shadowOffset}px 20px 24px rgba(0,0,0,0.15))`
                }}
              >
                <defs>
                  {/* Fabric gradient reflecting light & baseColor */}
                  <linearGradient id="garmentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={outfit.model3DConfig.baseColor} stopOpacity={lightIntensity} />
                    <stop offset="60%" stopColor={outfit.model3DConfig.trimColor} />
                    <stop offset="100%" stopColor="#262626" stopOpacity="0.4" />
                  </linearGradient>

                  <linearGradient id="pantsGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="100%" stopColor="#E2E8F0" />
                  </linearGradient>

                  <linearGradient id="skinGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FFE0C2" />
                    <stop offset="100%" stopColor="#F5CBA7" />
                  </linearGradient>
                </defs>

                {/* Pedestal platform */}
                <ellipse cx="140" cy="405" rx="90" ry="12" fill="#E2E8F0" opacity="0.8" />
                <ellipse cx="140" cy="400" rx="80" ry="9" fill="#CBD5E1" opacity="0.6" />

                {/* Avatar Head & Neck */}
                {activeAvatar !== 'mannequin' && (
                  <g id="head-group">
                    {/* Neck */}
                    <path d="M 132 80 L 132 105 L 148 105 L 148 80 Z" fill="url(#skinGrad)" />
                    {/* Face */}
                    <ellipse cx="140" cy="65" rx="18" ry="24" fill="url(#skinGrad)" />
                    {/* Hair */}
                    {activeAvatar === 'female' ? (
                      <path
                        d="M 120 62 C 120 40, 160 40, 160 62 C 160 52, 140 45, 120 62 Z M 120 62 C 118 78, 122 95, 122 95 C 124 85, 125 70, 128 62 Z M 152 62 C 155 70, 156 85, 158 95 C 158 95, 162 78, 160 62 Z"
                        fill="#27272A"
                      />
                    ) : (
                      <path
                        d="M 122 60 C 122 42, 158 42, 158 60 C 152 50, 128 50, 122 60 Z"
                        fill="#18181B"
                      />
                    )}
                  </g>
                )}

                {/* Mannequin neck / stand if mannequin */}
                {activeAvatar === 'mannequin' && (
                  <g id="mannequin-head">
                    <circle cx="140" cy="65" r="16" fill="#D6D3D1" stroke="#A8A29E" strokeWidth="1.5" />
                    <rect x="136" y="80" width="8" height="25" fill="#A8A29E" />
                  </g>
                )}

                {/* Headwear / Mấn / Nón layer */}
                {activeLayers.headwear && headwearItem && (
                  <g
                    id="headwear"
                    className="cursor-pointer hover:opacity-90 transition"
                    onClick={() => onSelectItem(headwearItem)}
                  >
                    <path
                      d="M 118 52 C 118 36, 162 36, 162 52 C 156 46, 124 46, 118 52 Z"
                      fill={headwearItem.colorHex || '#CA8A04'}
                      stroke="#B45309"
                      strokeWidth="2"
                    />
                    <circle cx="140" cy="46" r="3" fill="#FFFFFF" />
                  </g>
                )}

                {/* Pants / Quần lụa layer */}
                {activeLayers.pants && pantsItem && (
                  <g
                    id="pants-layer"
                    className="cursor-pointer hover:opacity-95 transition"
                    onClick={() => onSelectItem(pantsItem)}
                  >
                    {/* Left pant leg */}
                    <path
                      d="M 126 210 L 115 365 L 136 365 L 138 215 Z"
                      fill="url(#pantsGrad)"
                      stroke="#CBD5E1"
                      strokeWidth="1"
                    />
                    {/* Right pant leg */}
                    <path
                      d="M 142 215 L 144 365 L 165 365 L 154 210 Z"
                      fill="url(#pantsGrad)"
                      stroke="#CBD5E1"
                      strokeWidth="1"
                    />
                  </g>
                )}

                {/* Main Traditional Garment Layer (Áo dài / Ngũ thân / Áo tấc) */}
                {activeLayers.main && mainGarment && (
                  <g
                    id="main-garment"
                    className="cursor-pointer hover:brightness-105 transition"
                    onClick={() => onSelectItem(mainGarment)}
                  >
                    {/* Bodice / Thân áo */}
                    <path
                      d="M 124 105 L 110 145 L 118 190 L 126 220 L 154 220 L 162 190 L 170 145 L 156 105 Z"
                      fill="url(#garmentGrad)"
                    />

                    {/* High traditional collar / Cổ đứng */}
                    <path
                      d="M 132 100 C 132 94, 148 94, 148 100 L 148 107 L 132 107 Z"
                      fill={outfit.model3DConfig.trimColor}
                      stroke="#FACC15"
                      strokeWidth="1"
                    />

                    {/* Front Flap / Tà trước thướt tha */}
                    <path
                      d="M 125 220 C 122 260, 118 310, 116 355 C 132 358, 148 358, 164 355 C 162 310, 158 260, 155 220 Z"
                      fill="url(#garmentGrad)"
                      stroke={outfit.model3DConfig.trimColor}
                      strokeWidth="1"
                    />

                    {/* Traditional Slit Line (Xẻ tà eo) */}
                    <line x1="126" y1="210" x2="124" y2="235" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.7" />
                    <line x1="154" y1="210" x2="156" y2="235" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.7" />

                    {/* Sleeves depending on silhouette */}
                    {outfit.model3DConfig.silhouette === 'aotac' ? (
                      /* Wide royal sleeves (Tay thụng) */
                      <>
                        <path
                          d="M 110 145 L 80 185 L 85 240 L 118 190 Z"
                          fill="url(#garmentGrad)"
                          stroke={outfit.model3DConfig.trimColor}
                        />
                        <path
                          d="M 170 145 L 200 185 L 195 240 L 162 190 Z"
                          fill="url(#garmentGrad)"
                          stroke={outfit.model3DConfig.trimColor}
                        />
                      </>
                    ) : (
                      /* Fitted or medium sleeves (Tay chẽn) */
                      <>
                        <path
                          d="M 110 145 L 94 200 L 104 205 L 118 170 Z"
                          fill="url(#garmentGrad)"
                        />
                        <path
                          d="M 170 145 L 186 200 L 176 205 L 162 170 Z"
                          fill="url(#garmentGrad)"
                        />
                      </>
                    )}

                    {/* 5 Cúc cài truyền thống hoặc hoa văn thêu ngực */}
                    <circle cx="140" cy="115" r="2" fill="#FACC15" />
                    <circle cx="144" cy="125" r="2" fill="#FACC15" />
                    <circle cx="148" cy="135" r="2" fill="#FACC15" />
                    <circle cx="151" cy="148" r="2" fill="#FACC15" />
                    <circle cx="152" cy="162" r="2" fill="#FACC15" />
                  </g>
                )}

                {/* Accessory Layer (Túi xách / Quạt) */}
                {activeLayers.accessory && accessoryItem && (
                  <g
                    id="accessory-item"
                    className="cursor-pointer hover:scale-105 transition"
                    onClick={() => onSelectItem(accessoryItem)}
                  >
                    {accessoryItem.type.includes('Quạt') ? (
                      /* Quạt giấy cầm tay */
                      <path
                        d="M 170 195 L 200 170 C 210 185, 210 205, 195 215 Z"
                        fill="#F5F5F4"
                        stroke="#B45309"
                        strokeWidth="1.5"
                      />
                    ) : (
                      /* Túi xách mini */
                      <g transform="translate(180, 200)">
                        <path
                          d="M 10 0 C 10 -12, 26 -12, 26 0"
                          fill="none"
                          stroke="#CA8A04"
                          strokeWidth="2"
                        />
                        <rect x="5" y="0" width="26" height="20" rx="3" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="1.5" />
                        <circle cx="18" cy="10" r="2" fill="#CA8A04" />
                      </g>
                    )}
                  </g>
                )}

                {/* Footwear Layer (Giày cao gót / Guốc mộc) */}
                {activeLayers.footwear && footwearItem && (
                  <g
                    id="footwear-item"
                    className="cursor-pointer hover:opacity-80 transition"
                    onClick={() => onSelectItem(footwearItem)}
                  >
                    {/* Left shoe */}
                    <path
                      d="M 115 365 L 110 380 L 132 380 L 134 365 Z"
                      fill={footwearItem.colorHex || '#FFFFFF'}
                      stroke="#A8A29E"
                      strokeWidth="1"
                    />
                    {/* Right shoe */}
                    <path
                      d="M 146 365 L 148 380 L 170 380 L 165 365 Z"
                      fill={footwearItem.colorHex || '#FFFFFF'}
                      stroke="#A8A29E"
                      strokeWidth="1"
                    />
                  </g>
                )}
              </svg>
            </div>

            {/* Bottom 3D controls */}
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs bg-white/90 backdrop-blur-md px-3 py-2 rounded-xl border border-stone-200 shadow-xs">
              <div className="flex items-center gap-2">
                <span className="text-stone-600 font-medium">Góc xoay:</span>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={rotationAngle}
                  onChange={(e) => setRotationAngle(Number(e.target.value))}
                  className="w-24 sm:w-32 accent-amber-600 cursor-pointer"
                />
                <span className="text-stone-600 font-mono w-9">{Math.round(rotationAngle)}°</span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  title="Thu nhỏ"
                  onClick={() => setZoomLevel((z) => Math.max(0.7, z - 0.1))}
                  className="p-1 hover:bg-stone-100 rounded text-stone-600"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="text-stone-600 font-mono text-[11px]">{Math.round(zoomLevel * 100)}%</span>
                <button
                  type="button"
                  title="Phóng to"
                  onClick={() => setZoomLevel((z) => Math.min(1.4, z + 0.1))}
                  className="p-1 hover:bg-stone-100 rounded text-stone-600"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  title="Đặt lại"
                  onClick={() => {
                    setRotationAngle(0);
                    setZoomLevel(1);
                  }}
                  className="p-1 hover:bg-stone-100 rounded text-stone-600 ml-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Layer Visibility Toggles (Tùy biến các lớp đồ) */}
      <div className="px-4 py-2.5 bg-stone-50 border-t border-stone-200 flex items-center justify-between flex-wrap gap-2 text-xs">
        <span className="text-stone-600 font-medium flex items-center gap-1">
          <Layers className="w-3.5 h-3.5 text-stone-600" />
          <span>Bật/tắt lớp trang phục:</span>
        </span>
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            type="button"
            onClick={() => toggleLayer('main')}
            className={`px-2 py-0.5 rounded text-[11px] font-medium border transition ${
              activeLayers.main
                ? 'bg-amber-100 border-amber-300 text-amber-900'
                : 'bg-stone-100 border-stone-200 text-stone-600 line-through'
            }`}
          >
            Áo chính
          </button>
          <button
            type="button"
            onClick={() => toggleLayer('pants')}
            className={`px-2 py-0.5 rounded text-[11px] font-medium border transition ${
              activeLayers.pants
                ? 'bg-amber-100 border-amber-300 text-amber-900'
                : 'bg-stone-100 border-stone-200 text-stone-600 line-through'
            }`}
          >
            Quần lụa
          </button>
          <button
            type="button"
            onClick={() => toggleLayer('accessory')}
            className={`px-2 py-0.5 rounded text-[11px] font-medium border transition ${
              activeLayers.accessory
                ? 'bg-amber-100 border-amber-300 text-amber-900'
                : 'bg-stone-100 border-stone-200 text-stone-600 line-through'
            }`}
          >
            Phụ kiện
          </button>
          <button
            type="button"
            onClick={() => toggleLayer('headwear')}
            className={`px-2 py-0.5 rounded text-[11px] font-medium border transition ${
              activeLayers.headwear
                ? 'bg-amber-100 border-amber-300 text-amber-900'
                : 'bg-stone-100 border-stone-200 text-stone-600 line-through'
            }`}
          >
            Mấn/Nón
          </button>
          <button
            type="button"
            onClick={() => toggleLayer('footwear')}
            className={`px-2 py-0.5 rounded text-[11px] font-medium border transition ${
              activeLayers.footwear
                ? 'bg-amber-100 border-amber-300 text-amber-900'
                : 'bg-stone-100 border-stone-200 text-stone-600 line-through'
            }`}
          >
            Giày
          </button>
        </div>
      </div>
    </div>
  );
};
