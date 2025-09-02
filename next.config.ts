import type { NextConfig } from 'next';

function pickApiBase() {
  // 여러 이름을 지원 + 프로토콜 보정 + 트레일링 슬래시 제거
  const raw =
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    process.env.NEXT_PUBLIC_API_SERVER_URL ||
    process.env.API_SERVER_URL ||
    process.env.API_BASE_URL;

  if (!raw) return undefined;
  const withProto = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  return withProto.replace(/\/+$/, '');
}

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
    const base = pickApiBase();
    if (!base) {
      console.warn('[rewrites] API base URL not set. Skipping /api proxy.');
      return []; // env 없으면 rewrite 자체 생략 → build 에러 방지
    }
    return [
      {
        source: '/api/:path*',
        destination: `${base}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
