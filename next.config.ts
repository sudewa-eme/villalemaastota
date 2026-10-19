import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [390, 640, 828, 1080, 1440, 1920, 2560],
    // Illustrative stock photography (see src/content/stock.ts). Unsplash
    // download links redirect to images.unsplash.com.
    remotePatterns: [
      { protocol: "https", hostname: "images.pexels.com", pathname: "/photos/**" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "unsplash.com", pathname: "/photos/**" },
    ],
    maximumRedirects: 3,
  },
};

export default nextConfig;
