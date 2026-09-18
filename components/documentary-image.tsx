import Image from 'next/image';
export const imagePath = (src: string, width = 960) =>
  src.replace('.jpg', `-${width}.webp`);
export const imageSet = (src: string) =>
  [480, 960, 1600].map((w) => `${imagePath(src, w)} ${w}w`).join(', ');
// Assets are optimized at build time, so static hosting needs no image API.
export function DocumentaryImage({
  src,
  alt,
  className,
  hero = false,
}: {
  src: string;
  alt: string;
  className?: string;
  hero?: boolean;
}) {
  return (
    <picture>
      <source
        type="image/webp"
        srcSet={imageSet(src)}
        sizes={hero ? '100vw' : '(max-width: 900px) 100vw, 50vw'}
      />
      <Image
        className={className}
        src={imagePath(src)}
        alt={alt}
        width={960}
        height={720}
        unoptimized
        loading={hero ? 'eager' : 'lazy'}
        fetchPriority={hero ? 'high' : 'auto'}
      />
    </picture>
  );
}
