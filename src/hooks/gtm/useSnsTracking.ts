import { gtmPush } from '@/utils/gtm';

export function useSnsTracking() {
  const page_path = '/sns';

  function trackSnsAnalyzeClick(politicianName: string) {
    gtmPush({
      event: 'sns_analyze_click',
      page_path,
      target_name: politicianName,
    });
  }

  function trackSnsResultView(politicianName: string, reliabilityScore: number) {
    gtmPush({
      event: 'sns_result_view',
      page_path,
      target_name: politicianName,
      reliability: reliabilityScore,
    });
  }

  return {
    trackSnsAnalyzeClick,
    trackSnsResultView,
  };
}
