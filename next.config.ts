import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["three"],
  // Lint and types run in CI (.github/workflows/quality.yml); keep the Replit build lean.
  eslint: { ignoreDuringBuilds: true },
  // Cache optimized images for a day so Replit does not re-encode them on every visit.
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.shopify.com" },
      { protocol: "https", hostname: "tantetaat.nl" },
    ],
    minimumCacheTTL: 60 * 60 * 24,
  },
  // The hero film and local photography are static assets. Reuse them between
  // visits instead of asking the small Replit instance for every file again.
  async headers() {
    return [
      {
        source: "/media/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=3600, stale-while-revalidate=86400" },
        ],
      },
    ];
  },
  // Replit dev preview runs behind a proxy
  allowedDevOrigins: ["*.replit.dev", "*.*.replit.dev", "*.repl.co", "*.replit.app"],
};

export default nextConfig;
