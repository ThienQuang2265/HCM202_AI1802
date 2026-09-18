import fs from 'node:fs/promises';
const data = await fs.readFile('content/sources.ts', 'utf8');
const urls = [...data.matchAll(/https:\/\/[^"'\s]+/g)].map((x) => x[0]);
const results = await Promise.all(
  urls.map(async (url) => {
    try {
      const response = await fetch(url, {
        signal: AbortSignal.timeout(25000),
        headers: { 'User-Agent': 'Mozilla/5.0' },
      });
      await response.body?.cancel();
      return {
        url,
        status: response.status,
        redirectedTo: response.url,
        ok:
          response.ok && !/\/(?:_?404|page\/404)(?:[./?]|$)/.test(response.url),
      };
    } catch (error) {
      return { url, ok: false, error: String(error) };
    }
  }),
);
await fs.mkdir('test-results', { recursive: true });
await fs.writeFile(
  'test-results/sources.json',
  JSON.stringify({ checkedAt: new Date().toISOString(), results }, null, 2),
);
for (const result of results) console.log(JSON.stringify(result));
if (results.some((x) => !x.ok)) process.exitCode = 1;
