import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { readBundle, validateBundle } from '../support/read-bundle.mjs';
const schema = JSON.parse(await readFile(new URL('../data/format.schema.json', import.meta.url), 'utf8'));
const sample = await readBundle();
test('演练资料可读且不改变原始观测', () => {
  const before = JSON.stringify(sample);
  validateBundle(sample, schema);
  assert.equal(JSON.stringify(sample), before);
  assert.ok(Object.values(sample).some(x => Array.isArray(x) && x.length > 1));
});
test('拒绝缺少整份资料集合', () => {
  const copy = structuredClone(sample);
  delete copy[Object.keys(copy)[0]];
  assert.throws(() => validateBundle(copy, schema), /资料格式不符/);
});
test('相同版本的相同资料身份不能悄悄重复', () => {
  const copy = structuredClone(sample);
  const rows = Object.values(copy).find(x => Array.isArray(x) && x[0]?.id);
  rows.push(structuredClone(rows[0]));
  assert.throws(() => validateBundle(copy, schema), /资料身份重复/);
});
test('拒绝把记录集合变成未解析文本', () => {
  const copy = structuredClone(sample);
  const name = Object.keys(copy).find(k => Array.isArray(copy[k]));
  copy[name] = '未解析';
  assert.throws(() => validateBundle(copy, schema), /资料格式不符/);
});
