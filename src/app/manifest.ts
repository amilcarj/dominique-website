import type { MetadataRoute } from "next";

import { site } from "@/constants/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    background_color: "#ffffff",
    display: "standalone",
    icons: [
      {
        sizes: "192x192",
        src: "/android-chrome-192x192.png",
        type: "image/png",
      },
      {
        sizes: "512x512",
        src: "/android-chrome-512x512.png",
        type: "image/png",
      },
    ],
    name: site.name,
    short_name: site.name,
    theme_color: "#ffffff",
  };
}
