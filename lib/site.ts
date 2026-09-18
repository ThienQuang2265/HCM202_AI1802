export const siteTitle = 'Hành trình tìm đường';
export const description =
  'Trải nghiệm lịch sử tương tác qua sáu chặng 1911–1969: khám phá các nhánh, đối chiếu tư liệu và trở lại dòng lịch sử đã diễn ra.';
const configured = process.env.NEXT_PUBLIC_SITE_URL;
if (configured && !/^https?:\/\//.test(configured))
  throw new Error('NEXT_PUBLIC_SITE_URL must be an absolute http(s) URL');
export const siteUrl = configured
  ? new URL(configured).origin
  : 'http://localhost:3000';
export const isPublic =
  Boolean(configured) &&
  !['localhost', '127.0.0.1'].includes(new URL(siteUrl).hostname);
