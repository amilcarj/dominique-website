import Image from "next/image";
import {
  isImageSlide,
  type RenderSlideProps,
} from "yet-another-react-lightbox";

// serves lightbox slides through next/image instead of the full-size originals.
// adapted from https://yet-another-react-lightbox.com/examples/nextjs
export function LightboxSlide({ slide, rect }: RenderSlideProps) {
  if (!isImageSlide(slide) || !slide.width || !slide.height) {
    return undefined;
  }

  const width = Math.round(
    Math.min(rect.width, (rect.height / slide.height) * slide.width),
  );
  const height = Math.round(
    Math.min(rect.height, (rect.width / slide.width) * slide.height),
  );

  return (
    <div className="relative" style={{ height, width }}>
      <Image
        src={slide.src}
        alt={slide.alt ?? ""}
        fill
        loading="eager"
        draggable={false}
        sizes={`${Math.ceil((width / window.innerWidth) * 100)}vw`}
        className="object-contain"
      />
    </div>
  );
}
