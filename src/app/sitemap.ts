import type { MetadataRoute } from "next";

import { navItems } from "@/constants/navigation";
import { site } from "@/constants/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const sections = navItems
    .filter((item) => item.href.startsWith("/"))
    .map((item) => item.href.split("#")[1] ?? "about");
  return [
    { url: site.url },
    ...sections.map((section) => ({ url: `${site.url}/${section}` })),
  ];
}
