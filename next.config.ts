import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'aly.chaoyang1024.top'
      },
      {
        protocol: 'https',
        hostname: 'vip.chaoyang1024.top'
      }, {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      },
      {
        protocol: 'https',
        hostname: 'kzmntyc0capmo12j485t.lite.vusercontent.net'
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos'
      }
    ]
  },
};

export default nextConfig;
