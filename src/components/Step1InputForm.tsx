import React from 'react';
import {
  ArrowRight,
  CalendarDays,
  Check,
  Palette,
  ShieldCheck,
  Shirt,
  Sparkles
} from 'lucide-react';

interface Step1InputFormProps {
  selectedContext: string;
  onSelectContext: (value: string) => void;
  selectedStyle: string;
  onSelectStyle: (value: string) => void;
  selectedColor: string;
  onSelectColor: (value: string) => void;
  onSubmit: () => void;
}

const events = ['Tết & du xuân', 'Chụp kỷ yếu', 'Cưới hỏi', 'Dạo phố', 'Lễ hội'];
const styles = ['Áo dài tân thời', 'Áo ngũ thân', 'Tối giản', 'Cổ điển', 'Phá cách Y2K'];
const colors = [
  { name: 'Đỏ', hex: '#b62924' },
  { name: 'Vàng', hex: '#f7bd19' },
  { name: 'Xanh lam', hex: '#2b6e7d' },
  { name: 'Xanh cốm', hex: '#758846' },
  { name: 'Trắng', hex: '#f2efe6' },
  { name: 'Hồng', hex: '#ca6782' },
  { name: 'Đen', hex: '#171717' },
  { name: 'Tím', hex: '#72507c' }
];

export const Step1InputForm: React.FC<Step1InputFormProps> = ({
  selectedContext,
  onSelectContext,
  selectedStyle,
  onSelectStyle,
  selectedColor,
  onSelectColor,
  onSubmit
}) => {
  const submitOnEnter = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') onSubmit();
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <section className="hero-shell relative overflow-hidden rounded-[2rem] border border-black/10 bg-[#f5f2ea] px-5 pb-7 pt-10 shadow-[0_25px_80px_rgba(0,0,0,0.12)] sm:rounded-[2.75rem] sm:px-10 sm:pb-10 sm:pt-14 lg:px-14 lg:py-16">
        <div className="hero-orbit hero-orbit-one" />
        <div className="hero-orbit hero-orbit-two" />

        <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[1.08fr_.92fr] lg:gap-12">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] shadow-sm backdrop-blur sm:text-[11px]">
              <span className="flex -space-x-1.5">
                {['#b62924', '#f6bd18', '#2b6e7d'].map((color) => (
                  <span key={color} className="h-5 w-5 rounded-full border-2 border-white" style={{ backgroundColor: color }} />
                ))}
              </span>
              35 mẫu thật · 5 dòng trang phục
            </div>

            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-black/45">VietFashion · AI Stylist</p>
            <h1 className="hero-title max-w-3xl text-[clamp(3.2rem,7.2vw,7rem)] font-black leading-[0.85] tracking-[-0.075em]">
              Di sản Việt,
              <span className="block text-[#b62924]">chất riêng bạn.</span>
            </h1>
            <p className="mt-7 max-w-xl text-sm leading-6 text-black/58 sm:text-base sm:leading-7">
              Chọn dịp, phong cách và gam màu. Khám phá tên trang phục phù hợp, rồi chọn mẫu để xem hình ảnh và thông tin chi tiết.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3 text-[11px] font-semibold text-black/55">
              <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-[#297554]" /> Dữ liệu có kiểm chứng</span>
              <span className="h-1 w-1 rounded-full bg-black/25" />
              <span>Phối màu thông minh</span>
              <span className="h-1 w-1 rounded-full bg-black/25" />
              <span>Xem gợi ý trang phục</span>
            </div>
          </div>

          <div className="fashion-stage" aria-label="Bộ sưu tập trang phục Việt">
            <div className="stage-pattern" />
            <div className="fashion-card fashion-card-left">
              <img src="/images/dataset/Nu/aoyem/yem_xanh.jpg" alt="Áo yếm xanh truyền thống" />
              <span>Yếm đào</span>
            </div>
            <div className="fashion-card fashion-card-main">
              <img src="/images/dataset/Nu/aodai/ad_do.jpg" alt="Áo dài đỏ truyền thống" />
              <div className="fashion-card-caption">
                <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-black/45">Gợi ý nổi bật</span>
                <strong>Áo dài gấm đỏ</strong>
              </div>
            </div>
            <div className="fashion-card fashion-card-right">
              <img src="/images/dataset/Nu/aobaba/BB_xanhcom.jpg" alt="Áo bà ba xanh cốm" />
              <span>Áo bà ba</span>
            </div>
            <div className="stage-sticker stage-sticker-top"><Sparkles className="h-4 w-4" /> Phối bởi AI</div>
            <div className="stage-sticker stage-sticker-bottom">360° <span>studio</span></div>
          </div>
        </div>
      </section>

      <section className="styling-studio grid overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-[0_20px_55px_rgba(0,0,0,0.08)] lg:grid-cols-[1fr_320px]">
        <div className="p-5 sm:p-8 lg:p-10">
          <div className="mb-7 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-black/40">Tạo bộ phối của bạn</p>
              <h2 className="mt-1 text-2xl font-black tracking-[-0.045em] sm:text-3xl">Ba lựa chọn, một outfit vừa ý.</h2>
            </div>
            <p className="text-[11px] text-black/45">Nhấn Enter để xem kết quả</p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <InputBlock
              icon={<CalendarDays className="h-4 w-4" />}
              number="01"
              label="Bạn sẽ mặc khi nào?"
              value={selectedContext}
              placeholder="Ví dụ: Tết, cưới hỏi..."
              onChange={onSelectContext}
              onKeyDown={submitOnEnter}
            />
            <InputBlock
              icon={<Shirt className="h-4 w-4" />}
              number="02"
              label="Phong cách bạn thích?"
              value={selectedStyle}
              placeholder="Ví dụ: hiện đại, tối giản..."
              onChange={onSelectStyle}
              onKeyDown={submitOnEnter}
            />
            <InputBlock
              icon={<Palette className="h-4 w-4" />}
              number="03"
              label="Gam màu chủ đạo?"
              value={selectedColor}
              placeholder="Ví dụ: đỏ, xanh lam..."
              onChange={onSelectColor}
              onKeyDown={submitOnEnter}
            />
          </div>

          <div className="mt-6 grid gap-5 border-t border-black/10 pt-6 md:grid-cols-3">
            <SuggestionGroup label="Dịp mặc" items={events} value={selectedContext} onSelect={onSelectContext} />
            <SuggestionGroup label="Kiểu dáng" items={styles} value={selectedStyle} onSelect={onSelectStyle} />
            <div>
              <p className="mb-2.5 text-[10px] font-black uppercase tracking-[0.14em] text-black/40">Bảng màu</p>
              <div className="flex flex-wrap gap-2">
                {colors.map((color) => {
                  const active = selectedColor.toLowerCase().includes(color.name.toLowerCase());
                  return (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => onSelectColor(color.name)}
                      className={`color-chip ${active ? 'is-active' : ''}`}
                      title={color.name}
                    >
                      <span style={{ backgroundColor: color.hex }} />
                      {color.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <aside className="flex flex-col justify-between border-t border-black/10 bg-[#171717] p-6 text-white lg:border-l lg:border-t-0 lg:p-8">
          <div>
            <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-full bg-[#ffc21c] text-black">
              <Sparkles className="h-5 w-5" />
            </div>
            <p className="text-3xl font-black tracking-[-0.04em] text-[#ffc21c]">Xem gợi ý</p>
            <p className="mt-4 text-xs leading-5 text-white/55">
              Chọn đủ tiêu chí để xem những mẫu áo phù hợp với nhu cầu của bạn.
            </p>
          </div>

          <button type="button" onClick={onSubmit} className="studio-submit mt-8">
            <span>Xem gợi ý của tôi</span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white">
              <ArrowRight className="h-4 w-4" />
            </span>
          </button>
        </aside>
      </section>

      <div className="grid gap-3 sm:grid-cols-3">
        {[
          ['01', 'Hiểu đúng nhu cầu', 'Phân tích bối cảnh và thẩm mỹ cá nhân.'],
          ['02', 'Tìm từ dữ liệu thật', 'Đối chiếu trực tiếp 35 mẫu trang phục.'],
          ['03', 'Kể trọn câu chuyện', 'Nguồn gốc, cách mặc và lưu ý văn hóa.']
        ].map(([number, title, description]) => (
          <div key={number} className="feature-note">
            <span>{number}</span>
            <div><strong>{title}</strong><p>{description}</p></div>
            <Check className="ml-auto h-4 w-4 shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
};

function InputBlock({
  icon,
  number,
  label,
  value,
  placeholder,
  onChange,
  onKeyDown
}: {
  icon: React.ReactNode;
  number: string;
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  onKeyDown: (event: React.KeyboardEvent) => void;
}) {
  return (
    <label className="input-block">
      <span className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.13em] text-black/45">
        <span className="flex items-center gap-1.5">{icon}{label}</span>
        <span>{number}</span>
      </span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
      />
    </label>
  );
}

function SuggestionGroup({
  label,
  items,
  value,
  onSelect
}: {
  label: string;
  items: string[];
  value: string;
  onSelect: (value: string) => void;
}) {
  return (
    <div>
      <p className="mb-2.5 text-[10px] font-black uppercase tracking-[0.14em] text-black/40">{label}</p>
      <div className="flex flex-wrap gap-1.5">
        {items.map((item) => {
          const active = value.toLowerCase().includes(item.toLowerCase().split(' ')[0]);
          return (
            <button
              key={item}
              type="button"
              onClick={() => onSelect(item)}
              className={`suggestion-chip ${active ? 'is-active' : ''}`}
            >
              {item}
            </button>
          );
        })}
      </div>
    </div>
  );
}
