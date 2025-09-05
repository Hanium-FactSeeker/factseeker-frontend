import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'FactSeeker',
    short_name: 'FactSeeker',
    description: '유튜브 영상 신뢰도 검사 서비스',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#802bff',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
