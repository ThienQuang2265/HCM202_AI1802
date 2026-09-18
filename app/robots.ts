import type { MetadataRoute } from 'next';
import { isPublic, siteUrl } from '../lib/site';
export const dynamic = 'force-static';
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      ...(isPublic ? { allow: '/' } : { disallow: '/' }),
    },
    ...(isPublic ? { sitemap: `${siteUrl}/sitemap.xml` } : {}),
  };
}
