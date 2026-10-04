// No external dependencies. Run: node database/postgresql/dataset_v2/generate-import.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '../../..');
// One canonical image directory, also served directly by Vite.
const dataset = path.join(root, 'public/images/dataset');
const maps = JSON.parse(fs.readFileSync(path.join(here, 'mappings.json'), 'utf8'));
const stylingMaps = JSON.parse(fs.readFileSync(path.join(here, 'styling-mappings.json'), 'utf8'));
const walk = dir => fs.readdirSync(dir, { withFileTypes: true }).flatMap(e =>
  e.isDirectory() ? walk(path.join(dir, e.name)) : e.isFile() ? [path.join(dir, e.name)] : []);
const quote = s => "'" + s.replaceAll("'", "''") + "'";
const records = [];
const stylingRecords = [];
const issues = [];
const ignored = [];
for (const file of walk(dataset).sort()) {
  const relative = path.relative(dataset, file).split(path.sep).join('/');
  if (!/\.(jpg|jpeg|png|webp)$/i.test(relative)) { ignored.push(relative); continue; }
  const parts = relative.split('/');
  const [audienceCode, typeCode, filename] = parts;
  if (audienceCode === 'accessories' || audienceCode === 'footwear') {
    const category = stylingMaps[audienceCode]?.[typeCode];
    if (parts.length !== 3 || !category) { issues.push(relative); continue; }
    // Current filenames carry no reliable color metadata. Leave color NULL.
    stylingRecords.push({ relative, itemGroup: audienceCode, typeCode, category,
      name: `${category} — ${path.parse(filename).name}` });
    continue;
  }
  const colorCode = path.parse(filename ?? '').name.split('_').at(-1).toLowerCase();
  if (parts.length !== 3 || !maps.audiences[audienceCode] || !maps.types[typeCode] || !maps.colors[colorCode]) {
    issues.push(relative); continue;
  }
  records.push({ relative, typeCode,
    type: maps.types[typeCode], audience: maps.audiences[audienceCode], color: maps.colors[colorCode] });
}
// Validate everything before replacing generated SQL. Never copy or modify images.
if (issues.length) throw new Error('No import generated. Fix mappings/layout:\n' + issues.join('\n'));
if (!records.length) throw new Error('No recognized images found.');
const types = [...new Set(records.map(r => r.typeCode))];
const sql = [
  '-- Generated from dataset folder names, NOT verified image or cultural labels.',
  '-- Rerunnable: existing rows are preserved by code/dataset_path.',
  'BEGIN;',
  'SET LOCAL standard_conforming_strings = on;',
  'INSERT INTO wardrobe.garment_types (code, name) VALUES',
  types.map(code => `(${quote(code)}, ${quote(maps.types[code])})`).join(',\n'),
  'ON CONFLICT (code) DO NOTHING;'
];
for (const r of records) {
  // Preserve dataset_path as a logical import key, not a repository file path.
  // Existing databases use this key; changing it would create duplicate rows.
  const url = '/images/dataset/' + r.relative.split('/').map(encodeURIComponent).join('/');
  sql.push(`INSERT INTO wardrobe.garment_variants (garment_type_id, dataset_path, name, audience, color, image_url)
SELECT id, ${quote('dataset/' + r.relative)}, ${quote(`${r.type} ${r.audience.toLowerCase()} màu ${r.color.toLowerCase()}`)}, ${quote(r.audience)}, ${quote(r.color)}, ${quote(url)}
FROM wardrobe.garment_types WHERE code = ${quote(r.typeCode)}
ON CONFLICT (dataset_path) DO NOTHING;`);
}
sql.push('COMMIT;', '');
fs.writeFileSync(path.join(here, '02_import_dataset.sql'), sql.join('\n'), 'utf8');
const stylingSql = [
  '-- Generated accessories/footwear labels from directory names; all new rows are draft.',
  '-- Unknown color, origin and image sources are intentionally left NULL.',
  '-- Existing rows are preserved on rerun; update metadata separately if needed.',
  'BEGIN;',
  'SET LOCAL standard_conforming_strings = on;'
];
for (const r of stylingRecords) {
  const url = '/images/dataset/' + r.relative.split('/').map(encodeURIComponent).join('/');
  stylingSql.push(`INSERT INTO wardrobe.styling_items (item_group, type_code, category, name, dataset_path, image_url)
VALUES (${quote(r.itemGroup)}, ${quote(r.typeCode)}, ${quote(r.category)}, ${quote(r.name)}, ${quote('dataset/' + r.relative)}, ${quote(url)})
ON CONFLICT (dataset_path) DO NOTHING;`);
}
stylingSql.push('COMMIT;', '');
fs.writeFileSync(path.join(here, '06_import_styling_items.sql'), stylingSql.join('\n'), 'utf8');
const report = {
  totalImages: records.length + stylingRecords.length,
  clothingImages: records.length,
  accessoryImages: stylingRecords.filter(r => r.itemGroup === 'accessories').length,
  footwearImages: stylingRecords.filter(r => r.itemGroup === 'footwear').length,
  types: Object.fromEntries(types.map(t => [maps.types[t], records.filter(r => r.typeCode === t).length])),
  ignoredFiles: ignored,
  notes: ['Labels inferred from names only; all rows default to draft.',
    'Review mappings, especially xanh, before approving records.',
    'Existing database rows are not overwritten or deleted. Renaming files creates new import keys.']
};
fs.writeFileSync(path.join(here, 'import-report.json'), JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify(report, null, 2));
