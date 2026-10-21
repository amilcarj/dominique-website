import { PhotoGrid } from "@/components/sections/gallery/photo-grid";
import { portfolio, stills } from "@/constants/media";

export function Gallery() {
  return (
    <section id="gallery" aria-labelledby="gallery-heading" className="section">
      <h2 id="gallery-heading" className="sr-only">
        Gallery
      </h2>

      <h3 id="portfolio-heading" className="section-heading">
        Portfolio
      </h3>
      <PhotoGrid
        photos={portfolio}
        labelledBy="portfolio-heading"
        className="mt-8 grid-cols-2 md:grid-cols-3"
        itemClassName="aspect-3/4"
        sizes="(min-width: 768px) 33vw, 50vw"
      />

      <h3 id="stills-heading" className="mt-14 section-heading">
        Stills
      </h3>
      <PhotoGrid
        photos={stills}
        labelledBy="stills-heading"
        className="mt-8 grid-cols-2 md:grid-cols-4"
        itemClassName="aspect-4/3"
        sizes="(min-width: 768px) 25vw, 50vw"
      />
    </section>
  );
}
