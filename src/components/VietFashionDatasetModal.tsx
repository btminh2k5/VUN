import React, { useState } from 'react';
import { 
  X, 
  Database, 
  Shirt, 
  Image, 
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
  ExternalLink
} from 'lucide-react';
import { VIET_FASHION_ITEMS, OUTFIT_SETS, GarmentItem } from '../data/vietFashionData';

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
  const [activeTab, setActiveTab] = useState<'architecture' | 'dataset' | 'guidelines'>('architecture');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');

  if (!isOpen) return null;

  const allItems = Object.values(VIET_FASHION_ITEMS);
  const filteredItems = allItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.region.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || item.type.includes(filterType) || item.category === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl border border-stone-200 shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Top Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-red-100 flex items-center justify-center text-red-700">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-stone-900 font-['Playfair_Display',serif]">
                VietFashion Dataset & Kiến Trúc Hệ Thống
              </h2>
              <p className="text-xs text-stone-500">
                Nguồn dữ liệu chính xác, đã được kiểm chứng về trang phục truyền thống Việt Nam
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 rounded-xl transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="px-6 py-2.5 bg-stone-100/70 border-b border-stone-200 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('architecture')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
              activeTab === 'architecture'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Kiến trúc hệ thống & Cam kết di sản
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('dataset')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
              activeTab === 'dataset'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Kho dữ liệu trang phục ({allItems.length} tư liệu)
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'architecture' ? (
            <div className="space-y-6">
              {/* Category Pills matching mockup */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {[
                  { title: 'Trang phục', icon: Shirt, count: '8 loại hình' },
                  { title: 'Hình ảnh', icon: Image, count: 'Ảnh 4K & 3D' },
                  { title: 'Thông tin văn hóa', icon: FileText, count: 'Đã kiểm duyệt' },
                  { title: 'Bối cảnh - Sự kiện', icon: Calendar, count: '6 bối cảnh' },
                  { title: 'Phụ kiện', icon: ShoppingBag, count: '12 món phối' }
                ].map((c, i) => {
                  const Icon = c.icon;
                  return (
                    <div
                      key={i}
                      className="p-3 bg-stone-50 rounded-2xl border border-stone-200/80 text-center flex flex-col items-center justify-center"
                    >
                      <div className="w-8 h-8 rounded-full bg-white shadow-xs flex items-center justify-center text-stone-700 mb-1.5">
                        <Icon className="w-4 h-4 text-red-700" />
                      </div>
                      <span className="text-xs font-semibold text-stone-900 block">{c.title}</span>
                      <span className="text-[10px] text-stone-500 block mt-0.5">{c.count}</span>
                    </div>
                  );
                })}
              </div>

              {/* System Architecture Diagram (Exact mockup reproduction) */}
              <div className="bg-stone-50 border border-stone-200 rounded-3xl p-5 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                  Kiến trúc hệ thống (System Architecture)
                </h3>

                <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-xs">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-center">
                    {/* User */}
                    <div className="flex flex-col items-center p-3 bg-stone-50 rounded-xl border border-stone-200 min-w-[110px]">
                      <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 mb-1">
                        <User className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold text-stone-900">Người dùng</span>
                      <span className="text-[10px] text-stone-500">Gen Z / Học sinh</span>
                    </div>

                    <ArrowRight className="w-5 h-5 text-stone-400 rotate-90 md:rotate-0" />

                    {/* Frontend */}
                    <div className="flex flex-col items-center p-3 bg-stone-50 rounded-xl border border-stone-200 min-w-[120px]">
                      <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 mb-1">
                        <Shirt className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold text-stone-900">Frontend</span>
                      <span className="text-[10px] text-stone-500">React + 3D Studio</span>
                    </div>

                    <ArrowRight className="w-5 h-5 text-stone-400 rotate-90 md:rotate-0" />

                    {/* Backend */}
                    <div className="flex flex-col items-center p-3 bg-stone-50 rounded-xl border border-stone-200 min-w-[120px]">
                      <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 mb-1">
                        <Server className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold text-stone-900">FastAPI / Express</span>
                      <span className="text-[10px] text-stone-500">Server API Engine</span>
                    </div>

                    <ArrowRight className="w-5 h-5 text-stone-400 rotate-90 md:rotate-0" />

                    {/* AI Agent */}
                    <div className="flex flex-col items-center p-3 bg-amber-50 rounded-xl border border-amber-300 min-w-[150px] shadow-xs">
                      <div className="w-9 h-9 rounded-full bg-amber-200 flex items-center justify-center text-amber-900 mb-1">
                        <Cpu className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold text-amber-950">AI Agent (Gemini)</span>
                      <ul className="text-[9px] text-stone-600 text-left list-disc list-inside mt-0.5">
                        <li>Tìm kiếm outfit</li>
                        <li>Chọn từ dataset</li>
                        <li>Tư vấn phong cách</li>
                      </ul>
                    </div>
                  </div>

                  {/* Connected Database underneath */}
                  <div className="mt-4 pt-4 border-t border-stone-100 flex justify-center">
                    <div className="flex items-center gap-3 px-5 py-2.5 bg-stone-100 rounded-xl border border-stone-300 shadow-xs">
                      <Database className="w-5 h-5 text-stone-700" />
                      <div className="text-left">
                        <span className="text-xs font-bold text-stone-900 block">
                          PostgreSQL (VietFashion Dataset)
                        </span>
                        <span className="text-[10px] text-stone-500 block">
                          Dữ liệu trang phục, bảo tàng, khảo cứu lịch sử đã qua kiểm định
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cultural Verification Commitment Box */}
              <div className="bg-emerald-50/60 border border-emerald-200 rounded-3xl p-5">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-800 shrink-0">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-bold text-emerald-950">
                      Đảm bảo thông tin văn hóa chính xác
                    </h3>
                    <p className="text-xs text-emerald-900/90 leading-relaxed">
                      Tất cả hình ảnh và thông tin đều lấy từ VietFashion Dataset, không tự tạo nội dung ngoài dữ liệu có.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-xs">
                      <div className="flex items-center gap-1.5 text-emerald-900 font-semibold">
                        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Dữ liệu có nguồn gốc rõ ràng</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-emerald-900 font-semibold">
                        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Thông tin được kiểm duyệt</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-emerald-900 font-semibold">
                        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Tôn trọng giá trị văn hóa Việt</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Partnered & Referenced Museums */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-600">
                  Nguồn nghiên cứu & Bảo tàng phối hợp:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { name: 'Bảo tàng Phụ nữ Việt Nam', place: 'Hà Nội', doc: 'Di sản Áo dài qua các thời kỳ' },
                    { name: 'Trung tâm BT Di tích Cố đô Huế', place: 'Thừa Thiên Huế', doc: 'Phục sức cung đình & Áo ngũ thân' },
                    { name: 'Bảo tàng Dân tộc học Việt Nam', place: 'Hà Nội', doc: 'Trang phục Quan họ & Dân gian' }
                  ].map((m, idx) => (
                    <div key={idx} className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs">
                      <p className="font-bold text-stone-900">{m.name}</p>
                      <p className="text-[11px] text-stone-500">{m.place}</p>
                      <p className="text-[10px] text-amber-800 font-medium mt-1">Tư liệu: {m.doc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Tab: Dataset Catalog */
            <div className="space-y-4">
              {/* Search & Filters */}
              <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Tìm tên trang phục, phụ kiện..."
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-9 pr-3 py-2 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                </div>

                <div className="flex items-center gap-1.5 flex-wrap">
                  {['all', 'Áo dài', 'Áo ngũ thân', 'Áo tấc', 'Áo tứ thân', 'accessory'].map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setFilterType(f)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition ${
                        filterType === f
                          ? 'bg-stone-900 text-white'
                          : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                      }`}
                    >
                      {f === 'all' ? 'Tất cả' : f === 'accessory' ? 'Phụ kiện' : f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Items Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      onSelectItem(item);
                      onClose();
                    }}
                    className="bg-white rounded-2xl border border-stone-200 p-3 hover:border-red-600 cursor-pointer transition shadow-xs group flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative h-36 rounded-xl overflow-hidden bg-stone-100 mb-2">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition"
                        />
                        <span className="absolute top-2 left-2 bg-black/60 text-white text-[9px] px-2 py-0.5 rounded-full backdrop-blur-xs">
                          {item.type}
                        </span>
                      </div>

                      <h4 className="text-xs font-bold text-stone-900 group-hover:text-red-700 transition">
                        {item.name}
                      </h4>
                      <p className="text-[10px] text-stone-500 mt-0.5">{item.region} · {item.era}</p>
                      <p className="text-[11px] text-stone-600 line-clamp-2 mt-1 leading-snug">
                        {item.keyFeatures}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between text-[10px]">
                      <span className="text-amber-800 font-medium truncate max-w-[160px]">
                        {item.verifiedSource.museum}
                      </span>
                      <span className="text-red-600 font-bold group-hover:underline">Chi tiết →</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Footer */}
        <div className="px-6 py-3 border-t border-stone-200 bg-stone-50 flex items-center justify-between text-xs">
          <span className="text-stone-500">VietFashion AI Knowledge Engine v2.4</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-stone-900 text-white rounded-xl font-medium hover:bg-stone-800 transition"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
