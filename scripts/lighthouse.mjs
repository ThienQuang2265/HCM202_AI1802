import fs from 'node:fs/promises';
import { chromium } from '@playwright/test';
import lighthouse from 'lighthouse';
const port = Number(process.env.LIGHTHOUSE_PORT || 9223);
const chrome = await chromium.launch({
  args: [`--remote-debugging-port=${port}`],
});
try {
  await fs.mkdir('test-results', { recursive: true });
  for (const preset of ['desktop', 'mobile']) {
    const result = await lighthouse('http://127.0.0.1:3000/', {
      port,
      output: ['html', 'json'],
      onlyCategories: ['accessibility', 'best-practices', 'performance', 'seo'],
      ...(preset === 'desktop' ? { preset: 'desktop' } : {}),
    });
    if (!result) throw new Error('Lighthouse did not return a report');
    await fs.writeFile(
      `test-results/lighthouse-${preset}.html`,
      result.report[0],
    );
    await fs.writeFile(
      `test-results/lighthouse-${preset}.json`,
      result.report[1],
    );
    const scores = Object.fromEntries(
      Object.entries(result.lhr.categories).map(([id, c]) => [
        id,
        Math.round(c.score * 100),
      ]),
    );
    console.log(preset, scores);
    if (scores.accessibility < 90 || scores['best-practices'] < 90)
      process.exitCode = 1;
  }
} finally {
  await chrome.close();
}
