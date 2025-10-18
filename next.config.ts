import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable experimental features for better PWA support
  experimental: {
    // Optimize package imports
    optimizePackageImports: ["@heroui/react"],
  },

  // Configure headers for service worker
  async headers() {
    return [
      {
        source: "/sw.js",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
          {
            key: "Service-Worker-Allowed",
            value: "/",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
