// node --test site/test
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { ICONS, uploads, mbpsLabel } from '../js/site.js';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');

test('mesh sends a copy per viewer, the SFU once (16 people, a 1080p60 stream)', () => {
  assert.deepEqual(uploads(16, 6), { mesh: 90, sfu: 6, server: 90 });
  assert.deepEqual(uploads(2, 1.5), { mesh: 1.5, sfu: 1.5, server: 1.5 });
});

test('Mbps with a decimal comma', () => {
  assert.equal(mbpsLabel(90), '90 Mbps');
  assert.equal(mbpsLabel(10.5), '10,5 Mbps');
});

test('every icon the page asks for exists', () => {
  const used = [...html.matchAll(/data-icon="([\w-]+)"/g)].map((m) => m[1]);
  assert.ok(used.length > 0);
  for (const name of used) assert.ok(ICONS[name], `missing icon: ${name}`);
});

test('every image and local link points to a file', () => {
  for (const [, path] of html.matchAll(/(?:src|href)="((?:assets|css|js)\/[^"]+)"/g)) {
    assert.doesNotThrow(() => readFileSync(new URL(`../${path}`, import.meta.url)), path);
  }
});
