import type { MetadataRoute } from 'next';
import { isPublic, siteUrl } from '../lib/site';
export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap {
  return isPublic
    ? [
        { url: `${siteUrl}/`, changeFrequency: 'monthly', priority: 1 },
        {
          url: `${siteUrl}/timeline/`,
          changeFrequency: 'monthly',
          priority: 0.8,
        },
      ]
    : [];
}
