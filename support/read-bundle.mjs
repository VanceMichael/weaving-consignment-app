import { readFile } from 'node:fs/promises';
import Ajv from 'ajv';

// 这里只校验资料结构，不作领域结论。
export function validateBundle(value, schema) {
  const validate = new Ajv({allErrors: true, strict: false}).compile(schema);
  if (!validate(value)) throw new Error('资料格式不符：' + JSON.stringify(validate.errors));
  for (const [table, rows] of Object.entries(value)) {
    if (!Array.isArray(rows)) continue;
    const identities = new Set();
    for (const row of rows) {
      if (!row || typeof row !== 'object' || row.id === undefined) continue;
      const identity = JSON.stringify([row.id, row.version ?? null]);
      if (identities.has(identity)) throw new Error('资料身份重复：' + table + '/' + identity);
      identities.add(identity);
    }
  }
  return value;
}
export async function readBundle(path = new URL('../data/observations.json', import.meta.url), schemaPath = new URL('../data/format.schema.json', import.meta.url)) {
  const [source, format] = await Promise.all([readFile(path, 'utf8'), readFile(schemaPath, 'utf8')]);
  return validateBundle(JSON.parse(source), JSON.parse(format));
}
