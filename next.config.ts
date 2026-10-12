import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: { qualities: [90] },
  partialPrefetching: true,
};

export default nextConfig;
