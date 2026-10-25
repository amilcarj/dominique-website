import type { MetadataRoute } from "next";

import { site } from "@/constants/site";

const trainingCrawlers = [
  "Applebot-Extended",
  "CCBot",
  "ClaudeBot",
  "GPTBot",
  "Google-Extended",
  "Meta-ExternalAgent",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { allow: "/", userAgent: "*" },
      { disallow: "/", userAgent: trainingCrawlers },
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
