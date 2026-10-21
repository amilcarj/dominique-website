import { About } from "@/components/sections/about";
import { Gallery } from "@/components/sections/gallery";
import { Reels } from "@/components/sections/reels";
import { site } from "@/constants/site";

export default function Home() {
  return (
    <>
      <h1 className="sr-only">{site.name}</h1>
      <About />
      <Reels />
      <Gallery />
    </>
  );
}
