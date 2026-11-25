import { readBundle } from './read-bundle.mjs';
const bundle = await readBundle(process.argv[2]);
console.log('合成资料格式与身份检查通过');
console.log(JSON.stringify(Object.fromEntries(Object.entries(bundle).map(([name, rows]) => [name, Array.isArray(rows) ? rows.length : 1])), null, 2));
