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
};

export default nextConfig;
