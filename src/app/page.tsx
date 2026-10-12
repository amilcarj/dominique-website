import { About } from "@/components/sections/about";
import { site } from "@/constants/site";

export default function Home() {
  return (
    <>
      <h1 className="sr-only">{site.name}</h1>
      <About />
    </>
  );
}
