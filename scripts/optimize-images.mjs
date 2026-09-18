import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
await fs.mkdir('public/assets', { recursive: true });
let before = 0,
  after = 0;
for (const name of await fs.readdir('dist/assets')) {
  if (!name.endsWith('.jpg')) continue;
  const input = path.join('dist/assets', name);
  before += (await fs.stat(input)).size;
  for (const width of [480, 960, 1600]) {
    const output = path.join(
      'public/assets',
      name.replace('.jpg', `-${width}.webp`),
    );
    await sharp(input)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(output);
    after += (await fs.stat(output)).size;
  }
}
await fs.copyFile('dist/favicon.svg', 'public/favicon.svg');
// The social preview is the original documentary photograph, resized only.
await sharp('dist/assets/nha_rong_1911.jpg')
  .resize(1200, 630, { fit: 'cover' })
  .jpeg({ quality: 85 })
  .toFile('public/og-documentary.jpg');
console.log(
  `Documentary images: ${before} original bytes; ${after} bytes for all 3 responsive variants.`,
);
