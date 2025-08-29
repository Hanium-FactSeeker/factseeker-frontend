import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['yt3.ggpht.com', 'i.ytimg.com', 'img.youtube.com'],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },

  async rewrites() {
    return [
      {
        source: '/api/:path*',
        // 실제 백엔드 주소 환경변수로 주입
        destination: `${process.env.API_BASE_URL}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
