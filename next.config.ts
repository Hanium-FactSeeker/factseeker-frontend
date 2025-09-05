import type { NextConfig } from 'next';

function pickApiBase() {
  const raw = process.env.API_BASE_URL;

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
      return [];
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
