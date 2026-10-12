import Image from "next/image";

import { aboutPhoto } from "@/constants/media";
import { site } from "@/constants/site";

export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="section">
      <h2 id="about-heading" className="sr-only">
        About
      </h2>
      <div className="flex flex-col md:flex-row">
        <div className="overflow-hidden md:w-1/2">
          <Image
            src={aboutPhoto.src}
            alt={aboutPhoto.alt}
            sizes="(min-width: 768px) 50vw, 100vw"
            placeholder="blur"
            preload
            className="aspect-square size-full object-cover object-top"
          />
        </div>
        <div className="flex flex-col justify-center gap-5 pt-9 md:w-1/2 md:py-0 md:pl-16">
          {site.bio.map((paragraph) => (
            <p key={paragraph.join("")}>
              {paragraph.map((segment, index) =>
                index % 2 === 1 ? (
                  <strong key={index}>{segment}</strong>
                ) : (
                  segment
                ),
              )}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
