import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // Native page navigation keeps the static export portable across file hosts,
    // without RSC prefetch requests or a Next.js runtime server.
    files: [
      'app/not-found.tsx',
      'app/timeline/page.tsx',
      'components/journey.tsx',
    ],
    rules: { '@next/next/no-html-link-for-pages': 'off' },
  },
  globalIgnores([
    'dist/**',
    'out/**',
    '.next/**',
    'test-results/**',
    'playwright-report/**',
    'next-env.d.ts',
  ]),
]);
