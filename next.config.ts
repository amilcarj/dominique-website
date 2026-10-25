import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: { qualities: [90] },
  partialPrefetching: true,
  redirects() {
    return [
      { destination: "/", permanent: true, source: "/home" },
      {
        destination: "/Dominique%20Nieves%20Resume.pdf",
        permanent: true,
        source: "/s/DominiqueNievesActressResume.pdf",
      },
    ];
  },
};

export default nextConfig;
