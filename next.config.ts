import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.shopify.com" },
      { protocol: "https", hostname: "tantetaat.nl" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  transpilePackages: ["three"],
  // Replit dev preview runs behind a proxy
  allowedDevOrigins: ["*.replit.dev", "*.repl.co", "*.riker.replit.dev"],
};

export default nextConfig;
