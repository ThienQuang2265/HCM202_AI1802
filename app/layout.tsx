import type { Metadata, Viewport } from 'next';
import '@fontsource/be-vietnam-pro/vietnamese-400.css';
import '@fontsource/be-vietnam-pro/vietnamese-600.css';
import '@fontsource/be-vietnam-pro/vietnamese-700.css';
import '@fontsource/be-vietnam-pro/latin-400.css';
import '@fontsource/be-vietnam-pro/latin-600.css';
import '@fontsource/be-vietnam-pro/latin-700.css';
import '@fontsource/newsreader/vietnamese-600.css';
import '@fontsource/newsreader/vietnamese-700.css';
import '@fontsource/newsreader/latin-600.css';
import '@fontsource/newsreader/latin-700.css';
import './globals.css';
import { description, isPublic, siteTitle, siteUrl } from '../lib/site';
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: siteTitle, template: `%s — ${siteTitle}` },
  description,
  alternates: { canonical: '/' },
  robots: { index: isPublic, follow: isPublic },
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    title: siteTitle,
    description,
    url: '/',
    images: [
      {
        url: '/og-documentary.jpg',
        width: 1200,
        height: 630,
        alt: 'Bến Nhà Rồng — ảnh tư liệu',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description,
    images: ['/og-documentary.jpg'],
  },
  icons: { icon: '/favicon.svg' },
};
export const viewport: Viewport = { themeColor: '#120d0b' };
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
