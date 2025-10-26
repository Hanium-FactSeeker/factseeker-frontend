import { gtmPush } from '@/utils/gtm';

export function useVideoTracking() {
  const page_path = '/videos';

  function trackTrendingClick(videoTitle: string, reliabilityScore: number | null) {
    gtmPush({
      event: 'trending_click',
      page_path,
      target_name: videoTitle ?? '(no title)',
      reliability: reliabilityScore ?? 0,
    });
  }

  function trackReportClick(videoTitle: string) {
    gtmPush({
      event: 'video_report_click',
      page_path,
      target_name: videoTitle ?? '(no title)',
    });
  }

  function trackRelatedClick(videoTitle: string) {
    gtmPush({
      event: 'video_related_click',
      page_path,
      target_name: videoTitle ?? '(no title)',
    });
  }

  return {
    trackTrendingClick,
    trackReportClick,
    trackRelatedClick,
  };
}
