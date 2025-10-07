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
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // 生成版本号，例如使用时间戳
    const version = Date.now().toString();
    // 添加环境变量
    config.plugins.push(new webpack.DefinePlugin({
      'process.env.NEXT_PUBLIC_VERSION': JSON.stringify(version),
    }));
    return config;
  },
};

export default nextConfig;
