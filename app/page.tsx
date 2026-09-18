import { Journey } from '../components/journey';
import { imageSet } from '../components/documentary-image';
export default function Home() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        imageSrcSet={imageSet('/assets/nha_rong_1911.jpg')}
        imageSizes="100vw"
      />
      <Journey />
    </>
  );
}
