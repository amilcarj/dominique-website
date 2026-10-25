import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Gallery } from "@/components/sections/gallery";
import { Reels } from "@/components/sections/reels";
import { Resume } from "@/components/sections/resume";
import { aboutPhoto } from "@/constants/media";
import { site } from "@/constants/site";

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    description: site.description,
    image: `${site.url}${aboutPhoto.src.src}`,
    jobTitle: ["Actress", "Writer", "Director"],
    memberOf: { "@type": "Organization", name: "SAG-AFTRA" },
    name: site.name,
    sameAs: site.socialLinks
      .filter((link) => link.href.startsWith("https://"))
      .map((link) => link.href),
    url: site.url,
  };
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personJsonLd()).replace(/</g, "\\u003c"),
        }}
      />
      <h1 className="sr-only">{site.name}</h1>
      <About />
      <Reels />
      <Gallery />
      <Resume />
      <Contact />
    </>
  );
}
