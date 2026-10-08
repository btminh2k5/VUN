// Kiểm tra tính nhất quán giữa thư mục ảnh, SQL import và dữ liệu dự phòng.
// Không cần database, không cần network. Chạy: npm run check
//
// Bắt đúng loại lỗi dễ xảy ra nhất khi sửa dataset: đổi tên/di chuyển ảnh mà
// quên chạy lại generate-import.mjs, hoặc sửa SQL mà quên cập nhật fallback.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const datasetDir = path.join(root, 'public/images/dataset');
const sqlDir = path.join(root, 'database/postgresql/dataset_v2');

const problems = [];
const note = (message) => problems.push(message);

const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
  entry.isDirectory() ? walk(path.join(dir, entry.name))
    : entry.isFile() ? [path.join(dir, entry.name)] : []);

const read = (file) => {
  const full = path.join(sqlDir, file);
  if (!fs.existsSync(full)) { note(`Thiếu file SQL: database/postgresql/dataset_v2/${file}`); return ''; }
  return fs.readFileSync(full, 'utf8');
};

// --- 1. Ảnh trên đĩa ---
if (!fs.existsSync(datasetDir)) {
  note('Không tìm thấy public/images/dataset');
} else {
  const images = walk(datasetDir)
    .filter((file) => /\.(jpg|jpeg|png|webp)$/i.test(file))
    .map((file) => '/' + path.relative(path.join(root, 'public'), file).split(path.sep).join('/'));

  const garmentSql = read('02_import_dataset.sql');
  const stylingSql = read('06_import_styling_items.sql');
  const allSql = garmentSql + stylingSql;

  // --- 2. Mỗi image_url trong SQL phải có file thật ---
  const urlsInSql = [...allSql.matchAll(/'(\/images\/dataset\/[^']+)'/g)].map((m) => m[1]);
  for (const url of new Set(urlsInSql)) {
    if (!fs.existsSync(path.join(root, 'public', url))) {
      note(`SQL trỏ tới ảnh không tồn tại: ${url}`);
    }
  }

  // --- 3. Mỗi ảnh trên đĩa phải được SQL nhắc tới ---
  for (const url of images) {
    if (!allSql.includes(`'${url}'`)) {
      note(`Ảnh chưa được nhập vào SQL (chạy lại generate-import.mjs): ${url}`);
    }
  }

  // --- 4. Dataset phải phẳng: trang phục là <loai>/<file>, phụ kiện là <nhom>/<loai>/<file> ---
  for (const url of images) {
    const parts = url.replace('/images/dataset/', '').split('/');
    const isStyling = parts[0] === 'accessories' || parts[0] === 'footwear';
    if (isStyling ? parts.length !== 3 : parts.length !== 2) {
      note(`Cấu trúc thư mục sai (${isStyling ? 'cần 3' : 'cần 2'} cấp): ${url}`);
    }
  }

  // --- 5. Không còn dấu vết cấp thư mục theo giới tính trong CODE ---
  // Chỉ soi code và SQL. File .md được bỏ qua vì ghi chú migration cố ý nhắc
  // tới đường dẫn cũ để giải thích vì sao phải tạo lại volume database.
  const sources = [
    ...walk(path.join(root, 'src')).filter((f) => /\.(ts|tsx)$/.test(f)),
    ...walk(sqlDir).filter((f) => /\.(sql|mjs|json)$/.test(f)),
  ];
  for (const file of sources) {
    const body = fs.readFileSync(file, 'utf8');
    if (body.includes('dataset/Nu/')) {
      note(`Còn đường dẫn cũ 'dataset/Nu/' trong ${path.relative(root, file)}`);
    }
  }

  // --- 6. Dữ liệu dự phòng phải khớp số ảnh trang phục ---
  const fallback = fs.readFileSync(path.join(root, 'src/data/vietFashionData.ts'), 'utf8');
  const fallbackCount = (fallback.match(/datasetPath: 'dataset\//g) || []).length;
  const garmentCount = images.filter((url) => {
    const first = url.replace('/images/dataset/', '').split('/')[0];
    return first !== 'accessories' && first !== 'footwear';
  }).length;
  if (fallbackCount !== garmentCount) {
    note(`REAL_DATASET_35_ITEMS có ${fallbackCount} bản ghi nhưng dataset có ${garmentCount} ảnh trang phục`);
  }

  console.log(`Ảnh: ${images.length} (trang phục ${garmentCount}) · image_url trong SQL: ${new Set(urlsInSql).size} · bản ghi dự phòng: ${fallbackCount}`);
}


// --- 7. Cảnh báo chất lượng metadata (không làm fail, chỉ nhắc) ---
const warnings = [];
const typeInfo = read('04_update_type_information.sql');
const schema = read('01_schema.sql');

if (typeInfo) {
  const emptyOccasion = [...typeInfo.matchAll(/occasion = ARRAY\[\]::TEXT\[\],[\s\S]*?WHERE code = '([a-z_]+)'/g)].map((m) => m[1]);
  if (emptyOccasion.length) {
    warnings.push(`occasion rỗng cho: ${emptyOccasion.join(', ')} — engine sẽ bỏ tiêu chí bối cảnh và chia lại trọng số`);
  }
  if (!/^\s*style = ARRAY/m.test(typeInfo)) {
    warnings.push("Chưa phân loại garment_types.style — engine bỏ tiêu chí phong cách. Xem 09_style_draft.sql nếu muốn bật.");
  }
  if (!typeInfo.includes("review_status = 'reviewed'")) {
    warnings.push("Không có dòng nào được đặt 'reviewed' — badge \"đã kiểm duyệt\" sẽ luôn tắt. Xem 08_mark_reviewed.sql.");
  }
}

// --- 8. Các cột giao diện cần phải tồn tại trong schema ---
for (const column of ['era', 'material', 'do_notes', 'dont_notes']) {
  if (schema && !schema.includes(column)) {
    note(`Schema thiếu cột ${column} — giao diện cần cột này, nếu không sẽ phải lấy dữ liệu bịa`);
  }
}

// Bỏ comment trước khi soi code, nếu không chính các comment giải thích
// "đã gỡ ...template" lại bị tính là vi phạm.
const stripComments = (code) => code
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/(^|[^:])\/\/.*$/gm, '$1');

// --- 9. Frontend không được spread template hardcode vào dữ liệu thật ---
const apiService = stripComments(fs.readFileSync(path.join(root, 'src/services/recommendationApi.ts'), 'utf8'));
// Spread cho phép DUY NHẤT là model3DConfig (cấu hình dựng hình, thuần trình bày).
// Spread trần `...template` hoặc spread nội dung văn hoá như colorHarmony đều
// làm dữ liệu bịa lọt vào món đồ thật rồi hiện kèm nhãn nguồn.
const illegalSpread = [...apiService.matchAll(/\.\.\.template([a-zA-Z0-9.]*)/g)]
  .map((match) => match[1])
  .filter((suffix) => suffix !== '.model3DConfig');
if (illegalSpread.length) {
  note(`recommendationApi.ts spread template hardcode vào dữ liệu thật: ...template${illegalSpread.join(', ...template')}`);
}

// --- 10. Frontend không được trộn hai nguồn dữ liệu ---
const appSource = stripComments(fs.readFileSync(path.join(root, 'src/App.tsx'), 'utf8'));
if (/\[\s*\.\.\.apiOutfits\s*,\s*\.\.\.localOutfits/.test(appSource)) {
  note('App.tsx lại trộn apiOutfits với dữ liệu cục bộ — fallback chỉ được dùng khi engine lỗi');
}

if (warnings.length) {
  console.warn(`\n⚠ ${warnings.length} cảnh báo chất lượng metadata (không phải lỗi):\n` + warnings.map((w) => '  - ' + w).join('\n'));
}

if (problems.length) {
  console.error(`\n✗ ${problems.length} vấn đề:\n` + problems.map((p) => '  - ' + p).join('\n'));
  process.exit(1);
}
console.log('✓ Dataset, SQL và dữ liệu dự phòng đều khớp.');
