import React, { useState, useEffect } from 'react';
import { 
  X, 
  Database, 
  Shirt, 
  Image as ImageIcon, 
  FileText, 
  Calendar, 
  ShoppingBag, 
  ShieldCheck, 
  CheckCircle, 
  ArrowRight, 
  Server, 
  Cpu, 
  User, 
  Search,
  BookOpen,
  Sparkles,
  Layers,
  Check
} from 'lucide-react';
import { 
  VIET_FASHION_ITEMS, 
  REAL_DATASET_35_ITEMS, 
  GarmentItem, 
  DatasetVariantRecord 
} from '../data/vietFashionData';

interface VietFashionDatasetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectItem: (item: GarmentItem) => void;
}

export const VietFashionDatasetModal: React.FC<VietFashionDatasetModalProps> = ({
  isOpen,
  onClose,
  onSelectItem
}) => {
  const [activeTab, setActiveTab] = useState<'postgres' | 'architecture' | 'dataset'>('postgres');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [dbStatus, setDbStatus] = useState<{
    connected: boolean;
    config?: { host: string; port: number; database: string; user: string };
    catalogCount?: number;
    message?: string;
  }>({
    connected: false,
    config: { host: '127.0.0.1', port: 5433, database: 'vietfashion', user: 'vietfashion' },
    catalogCount: REAL_DATASET_35_ITEMS.length
  });

  useEffect(() => {
    if (isOpen) {
      fetch('/api/database/status')
        .then((res) => res.json())
        .then((data) => {
          if (data && data.success) {
            setDbStatus({
              connected: data.connected,
              config: data.config,
              catalogCount: data.catalogCount || REAL_DATASET_35_ITEMS.length,
              message: data.message
            });
          }
        })
        .catch(() => {
          // Fallback status
          setDbStatus({
            connected: false,
            config: { host: '127.0.0.1', port: 5433, database: 'vietfashion', user: 'vietfashion' },
            catalogCount: REAL_DATASET_35_ITEMS.length
          });
        });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const totalRealImages = REAL_DATASET_35_ITEMS.length;
  const filteredRealImages = REAL_DATASET_35_ITEMS.filter((item) => {
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.color.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.region.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Nhãn và số lượng đếm từ chính dữ liệu, nên thêm/bớt ảnh không cần sửa chỗ này.
  const categories = [
    { key: 'all', label: `Tất cả ${totalRealImages} ảnh`, count: totalRealImages },
    ...[...new Set(REAL_DATASET_35_ITEMS.map((item) => item.category))]
      .sort((a, b) => a.localeCompare(b, 'vi'))
      .map((category) => ({
        key: category,
        label: category,
        count: REAL_DATASET_35_ITEMS.filter((item) => item.category === category).length,
      })),
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl border border-stone-200 shadow-2xl max-w-5xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Top Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-red-700 to-amber-700 flex items-center justify-center text-white shadow-xs">
              <Database className="w-5 h-5 text-amber-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-stone-900 font-['Playfair_Display',serif]">
                  VietFashion Dataset v2 · PostgreSQL Database
                </h2>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                  dbStatus.connected
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-amber-100 text-amber-800 border border-amber-300'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${dbStatus.connected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                  {dbStatus.connected ? 'PostgreSQL 5433: Online' : `${totalRealImages} Ảnh Thật: Đã Tải`}
                </span>
              </div>
              <p className="text-xs text-stone-500">
                Kho lưu trữ {totalRealImages} mẫu ảnh thật theo định chế văn hóa Việt phục (Schema: <code className="text-stone-700 bg-stone-200/60 px-1 py-0.5 rounded text-[11px]">wardrobe.outfit_catalog</code>)
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 rounded-xl transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="px-6 py-2.5 bg-stone-100/80 border-b border-stone-200 flex items-center gap-2 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('postgres')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
              activeTab === 'postgres'
                ? 'bg-red-700 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 bg-white/60'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>35 Mẫu Ảnh Thật Dataset ({REAL_DATASET_35_ITEMS.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('architecture')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
              activeTab === 'architecture'
                ? 'bg-red-700 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 bg-white/60'
            }`}
          >
            <Server className="w-3.5 h-3.5" />
            <span>Kiến trúc PostgreSQL & Bảo tàng</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {activeTab === 'postgres' && (
            <div className="space-y-6">
              {/* PostgreSQL Connection Banner */}
              <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 text-white rounded-2xl p-4 sm:p-5 shadow-sm border border-stone-700">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                        PostgreSQL Database Connection
                      </span>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold">
                      Database: <span className="text-amber-200">vietfashion</span> · Cổng: <span className="text-amber-200">5433</span> · Người dùng: <span className="text-amber-200">vietfashion</span>
                    </h3>
                    <p className="text-xs text-stone-300">
                      Đã nạp 35 mẫu ảnh thật thuộc 5 dòng trang phục chính vào hệ thống theo đúng cấu trúc schema <code className="text-amber-200">wardrobe.garment_variants</code>.
                    </p>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0 border-t sm:border-t-0 border-stone-700 pt-2 sm:pt-0">
                    <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/70 border border-emerald-800/80 px-2.5 py-1 rounded-full">
                      ✓ 35/35 Ảnh thực tế
                    </span>
                    <span className="text-[11px] text-stone-400 font-mono">
                      Docker Compose: 127.0.0.1:5433
                    </span>
                  </div>
                </div>
              </div>

              {/* Search & Category Filter */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  {/* Category tabs */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                    {categories.map((c) => (
                      <button
                        key={c.key}
                        type="button"
                        onClick={() => setFilterCategory(c.key)}
                        className={`text-xs px-3 py-1.5 rounded-xl border transition whitespace-nowrap ${
                          filterCategory === c.key
                            ? 'bg-stone-900 text-white border-stone-900 font-bold shadow-2xs'
                            : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                        }`}
                      >
                        {c.label} ({c.count})
                      </button>
                    ))}
                  </div>

                  {/* Search box */}
                  <div className="relative min-w-[220px]">
                    <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Tìm màu, tên áo..."
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-9 pr-3 py-1.5 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-red-600/30 focus:border-red-600"
                    />
                  </div>
                </div>
              </div>

              {/* 35 Real Images Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredRealImages.map((record) => (
                  <div
                    key={record.id}
                    className="group bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xs hover:shadow-md transition duration-200 flex flex-col"
                  >
                    {/* Real Image Container */}
                    <div className="relative h-64 bg-stone-100 overflow-hidden">
                      <img
                        src={record.imageUrl}
                        alt={record.name}
                        className="w-full h-full object-cover object-top transition duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />

                      <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                        <span className="bg-stone-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/20">
                          {record.category}
                        </span>
                        <span className="bg-amber-500/90 text-stone-900 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          {record.color}
                        </span>
                      </div>

                      <div className="absolute top-2.5 right-2.5 bg-emerald-700/80 backdrop-blur-md text-white text-[9px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Check className="w-3 h-3 text-emerald-300" />
                        <span>Ảnh Thật</span>
                      </div>

                      <div className="absolute bottom-2.5 left-3 right-3 text-white">
                        <p className="text-xs font-bold leading-tight font-['Playfair_Display',serif]">
                          {record.name}
                        </p>
                        <p className="text-[10px] text-stone-300 font-mono mt-0.5 truncate">
                          {record.datasetPath}
                        </p>
                      </div>
                    </div>

                    {/* Metadata & Actions */}
                    <div className="p-3.5 flex-1 flex flex-col justify-between space-y-3 bg-stone-50/50">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[11px] text-stone-500">
                          <span>Vùng: <strong className="text-stone-700">{record.region}</strong></span>
                        </div>
                        <p className="text-[11px] text-stone-600 line-clamp-2 leading-relaxed">
                          {record.culturalMeaning}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          const item = VIET_FASHION_ITEMS['ao-dai-do-gam'];
                          if (item) {
                            onSelectItem({
                              ...item,
                              id: `dataset-${record.id}`,
                              name: record.name,
                              imageUrl: record.imageUrl,
                              galleryImages: [record.imageUrl],
                              culturalMeaning: record.culturalMeaning
                            });
                          }
                          onClose();
                        }}
                        className="w-full bg-stone-900 hover:bg-red-700 text-white text-xs font-semibold py-2 px-3 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                        <span>Phối đồ với mẫu ảnh này</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {filteredRealImages.length === 0 && (
                <div className="text-center py-12 text-stone-500 space-y-2">
                  <p className="text-sm font-medium">Không tìm thấy mẫu ảnh khớp với từ khóa "{searchQuery}"</p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setFilterCategory('all');
                    }}
                    className="text-xs text-red-700 font-semibold hover:underline"
                  >
                    Xóa bộ lọc để hiển thị toàn bộ 35 ảnh
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'architecture' && (
            <div className="space-y-6">
              {/* Architecture diagram */}
              <div className="bg-stone-50 border border-stone-200 rounded-3xl p-5 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                  Kiến trúc kết nối PostgreSQL & Server AI Studio
                </h3>

                <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-xs">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-center">
                    <div className="flex flex-col items-center p-3 bg-stone-50 rounded-xl border border-stone-200 min-w-[120px]">
                      <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 mb-1">
                        <Shirt className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold text-stone-900">React Client</span>
                      <span className="text-[10px] text-stone-500">Giao diện bàn phím thân thiện</span>
                    </div>

                    <ArrowRight className="w-5 h-5 text-stone-400 rotate-90 md:rotate-0" />

                    <div className="flex flex-col items-center p-3 bg-stone-50 rounded-xl border border-stone-200 min-w-[130px]">
                      <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 mb-1">
                        <Server className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold text-stone-900">Express Server</span>
                      <span className="text-[10px] text-stone-500">API `/api/database/*`</span>
                    </div>

                    <ArrowRight className="w-5 h-5 text-stone-400 rotate-90 md:rotate-0" />

                    <div className="flex flex-col items-center p-3 bg-amber-50 rounded-xl border border-amber-300 min-w-[150px] shadow-xs">
                      <div className="w-9 h-9 rounded-full bg-amber-200 flex items-center justify-center text-amber-900 mb-1">
                        <Database className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold text-amber-950">PostgreSQL (vietfashion)</span>
                      <span className="text-[10px] text-stone-600">Port 5433 (Docker Compose)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Database tables schema recap */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
                  <h4 className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-red-700" />
                    Bảng `wardrobe.garment_types`
                  </h4>
                  <p className="text-xs text-stone-600">
                    Lưu trữ 5 loại áo gốc: Áo bà ba, Áo dài, Áo giao lĩnh, Áo ngũ thân tay chẽn, Áo yếm cùng mô tả, nguồn gốc, ý nghĩa và tài liệu đối chiếu.
                  </p>
                </div>

                <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
                  <h4 className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-amber-700" />
                    Bảng `wardrobe.garment_variants`
                  </h4>
                  <p className="text-xs text-stone-600">
                    Lưu trữ {totalRealImages} bản ghi chi tiết ánh xạ trực tiếp tới các file ảnh thực tế tại <code className="bg-stone-200/80 px-1 py-0.5 rounded text-[11px]">/images/dataset/...</code>
                  </p>
                </div>
              </div>

              {/* Museum source verification */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div className="text-xs text-emerald-950 space-y-1">
                  <p className="font-bold">Kiểm chứng di sản theo tài liệu bảo tàng</p>
                  <p className="text-emerald-900/90 leading-relaxed">
                    Dữ liệu được đối chiếu với Bảo tàng Phụ nữ Việt Nam, Bảo tàng Cổ vật Cung đình Huế, Bảo tàng Dân tộc học và tư liệu Báo Cần Thơ, VietnamPlus.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
