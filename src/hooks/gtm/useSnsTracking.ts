import { gtmPush } from '@/utils/gtm';

export function useSnsTracking() {
  const page_path = '/sns';

  /**
   * 사용자가 특정 이름(정치인 이름 등)을 검색창에 입력하고 검색했을 때 호출.
   */
  function trackSnsSearch(query: string) {
    if (!query || !query.trim()) return;

    gtmPush({
      event: 'sns_search',
      page_path,
      target_name: query.trim(),
    });
  }

  /**
   * 특정 정치인의 SNS 카드에서 외부 SNS 원문(트위터/X, 유튜브 등)으로 나갈 때 호출.
   * 어떤 정치인(또는 계정)의 SNS가 제일 많이 클릭됐는지 알 수 있음.
   */
  function trackSnsExternalClick(politicianName: string, snsType: string) {
    gtmPush({
      event: 'sns_external_click',
      page_path,
      target_name: politicianName,
      filter_value: snsType,
    });
  }

  return {
    trackSnsSearch,
    trackSnsExternalClick,
  };
}
