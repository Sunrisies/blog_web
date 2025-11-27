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
        protocol: "https",
        hostname: "aly.sunrise1024.top",
      },
      {
        protocol: "https",
        hostname: "img.sunrise1024.top",
      },
      {
        protocol: "https",
        hostname: "vip.sunrise1024.top",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "kzmntyc0capmo12j485t.lite.vusercontent.net",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "umami.sunrise1024.top",
      },
    ],
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // 生成版本号，例如使用时间戳
    const version = Date.now().toString();
    // 添加环境变量
    config.plugins.push(
      new webpack.DefinePlugin({
        "process.env.NEXT_PUBLIC_VERSION": JSON.stringify(version),
      })
    );
    return config;
  },
};
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
export default withBundleAnalyzer(nextConfig);
