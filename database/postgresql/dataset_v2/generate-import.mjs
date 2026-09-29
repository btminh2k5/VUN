// No external dependencies. Run: node database/postgresql/dataset_v2/generate-import.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '../../..');
const dataset = path.join(root, 'dataset');
const images = path.join(root, 'public/images/dataset');
const maps = JSON.parse(fs.readFileSync(path.join(here, 'mappings.json'), 'utf8'));
const walk = dir => fs.readdirSync(dir, { withFileTypes: true }).flatMap(e =>
  e.isDirectory() ? walk(path.join(dir, e.name)) : e.isFile() ? [path.join(dir, e.name)] : []);
const quote = s => "'" + s.replaceAll("'", "''") + "'";
const hash = file => createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const records = [];
const issues = [];
const ignored = [];
for (const file of walk(dataset).sort()) {
  const relative = path.relative(dataset, file).split(path.sep).join('/');
  if (!/\.(jpg|jpeg|png|webp)$/i.test(relative)) { ignored.push(relative); continue; }
  const parts = relative.split('/');
  const [audienceCode, typeCode, filename] = parts;
  const colorCode = path.parse(filename ?? '').name.split('_').at(-1).toLowerCase();
  if (parts.length !== 3 || !maps.audiences[audienceCode] || !maps.types[typeCode] || !maps.colors[colorCode]) {
    issues.push(relative); continue;
  }
  const destination = path.join(images, ...parts);
  if (fs.existsSync(destination) && hash(destination) !== hash(file)) {
    issues.push(`${relative}: destination contains different image; resolve manually`); continue;
  }
  records.push({ file, destination, relative, typeCode,
    type: maps.types[typeCode], audience: maps.audiences[audienceCode], color: maps.colors[colorCode] });
}
// Validate everything before copying images or replacing generated SQL.
if (issues.length) throw new Error('No import generated. Fix mappings/layout/image conflicts:\n' + issues.join('\n'));
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
  const url = '/images/dataset/' + r.relative.split('/').map(encodeURIComponent).join('/');
  sql.push(`INSERT INTO wardrobe.garment_variants (garment_type_id, dataset_path, name, audience, color, image_url)
SELECT id, ${quote('dataset/' + r.relative)}, ${quote(`${r.type} ${r.audience.toLowerCase()} màu ${r.color.toLowerCase()}`)}, ${quote(r.audience)}, ${quote(r.color)}, ${quote(url)}
FROM wardrobe.garment_types WHERE code = ${quote(r.typeCode)}
ON CONFLICT (dataset_path) DO NOTHING;`);
}
sql.push('COMMIT;', '');
for (const r of records) {
  fs.mkdirSync(path.dirname(r.destination), { recursive: true });
  if (!fs.existsSync(r.destination)) fs.copyFileSync(r.file, r.destination, fs.constants.COPYFILE_EXCL);
}
fs.writeFileSync(path.join(here, '02_import_dataset.sql'), sql.join('\n'), 'utf8');
const report = {
  totalImages: records.length,
  types: Object.fromEntries(types.map(t => [maps.types[t], records.filter(r => r.typeCode === t).length])),
  ignoredFiles: ignored,
  notes: ['Labels inferred from names only; all rows default to draft.',
    'Review mappings, especially xanh, before approving records.',
    'Existing database rows are not overwritten or deleted. Renaming files creates new import keys.']
};
fs.writeFileSync(path.join(here, 'import-report.json'), JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify(report, null, 2));
