import { gtmPush } from '@/utils/gtm';

export function useVideoracking() {
  const page_path = '/videos';

  function trackTrendingClick(videoTitle: string, reliabilityScore: number) {
    gtmPush({
      event: 'trending_click',
      page_path,
      target_name: videoTitle,
      reliability: reliabilityScore,
    });
  }

  return {
    trackTrendingClick,
  };
}
