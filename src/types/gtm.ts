/**
 *
 * 공통 GTM(Google Tag Manager) 데이터 속성 정의
 * @property {string} [page_path] 현재 페이지 경로 (예: "/search")
 * @property {string} [target_name] 분석 대상 이름 (예: 영상 제목, 정치인 이름 등)
 * @property {number} [reliability] 신뢰도 점수 같은 숫자 값
 * @property {string} [filter_value] 필터 값 (예: 날짜, 카테고리 등)
 * @property {number} [duration_sec] 체류 시간(초 단위)
 * @property {boolean} [debug_mode] 개발 환경 여부 (dev 모드)
 */
export type GTMCommon = {
  page_path?: string;
  target_name?: string;
  reliability?: number;
  filter_value?: string;
  duration_sec?: number;
  debug_mode?: boolean;
};

export type GTMEvent =
  // 1) URL 검색 페이지 (/search)
  | ({ event: 'search_submit' } & Required<Pick<GTMCommon, 'page_path'>> & Partial<GTMCommon>)
  | ({ event: 'search_result_loaded' } & Required<Pick<GTMCommon, 'page_path'>> &
      Partial<GTMCommon>)

  // 2) 인기영상 페이지 (/trending)
  | ({ event: 'trending_click' } & Required<Pick<GTMCommon, 'page_path' | 'target_name'>> &
      Partial<GTMCommon>)
  | ({ event: 'trending_filter_change' } & Required<Pick<GTMCommon, 'page_path' | 'filter_value'>> &
      Partial<GTMCommon>)

  // 3) SNS 분석 페이지 (/sns)
  | ({ event: 'sns_analyze_click' } & Required<Pick<GTMCommon, 'page_path' | 'target_name'>> &
      Partial<GTMCommon>)
  | ({ event: 'sns_result_view' } & Required<Pick<GTMCommon, 'page_path' | 'target_name'>> &
      Partial<GTMCommon>)

  // 4) 인물 분석 페이지 (/profile)
  | ({ event: 'person_search' } & Required<Pick<GTMCommon, 'page_path' | 'target_name'>> &
      Partial<GTMCommon>)
  | ({ event: 'person_view_time' } & Required<
      Pick<GTMCommon, 'page_path' | 'target_name' | 'duration_sec'>
    > &
      Partial<GTMCommon>);
