"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import Lightbox from "yet-another-react-lightbox";

import "yet-another-react-lightbox/styles.css";
import { LightboxSlide } from "@/components/lightbox-slide";
import { site } from "@/constants/site";

export function Resume() {
  const [open, setOpen] = useState(false);
  const opener = useRef<HTMLButtonElement>(null);
  const { image, pdf } = site.resume;
  const { alt, src } = image;

  return (
    <section id="resume" aria-labelledby="resume-heading" className="section">
      <h2 id="resume-heading" className="section-heading">
        Resume
      </h2>
      <a href={pdf} download className="mt-8 button-outline">
        Download Resume (PDF)
      </a>
      <button
        ref={opener}
        type="button"
        aria-label={`View full size: ${alt}`}
        onClick={() => setOpen(true)}
        className="mx-auto mt-8 block"
      >
        <Image
          src={src}
          alt={alt}
          sizes="(min-width: 1244px) 1164px, 100vw"
          placeholder="blur"
        />
      </button>
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        carousel={{ finite: true }}
        on={{ exited: () => opener.current?.focus() }}
        render={{
          buttonNext: () => null,
          buttonPrev: () => null,
          slide: LightboxSlide,
        }}
        slides={[{ alt, height: src.height, src: src.src, width: src.width }]}
      />
    </section>
  );
}
