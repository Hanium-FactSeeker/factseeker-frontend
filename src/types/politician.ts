export interface PoliticianScoreItem {
  name: string;
  party: string;
  geminiScore: number;
  gptScore: number;
  overallScore: number;
}

export interface PoliticianScoresResponse {
  politicians: PoliticianScoreItem[];
  currentPage: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  isFirst: boolean;
  isLast: boolean;
}

export interface TopScoresSummaryResponse {
  politicians: PoliticianScoreItem[];
}

// 기본 정보(리스트용)
export interface PoliticianBasic {
  id: number;
  name: string;
  birthDate: string;        // ISO 또는 'YYYY-MM-DD' (백엔드 스펙에 맞춤)
  party: string;
  facebookUrl?: string | null;
  instagramUrl?: string | null;
  xUrl?: string | null;
  youtubeUrl?: string | null;
  profileImageUrl?: string | null;
}

// 페이지 응답
export interface PoliticianListResponse {
  politicians: PoliticianBasic[];
  currentPage: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  isFirst: boolean;
  isLast: boolean;
}

// 5번에서 만든 리스트용 기본 정보와 동일 스펙이면 그대로 재사용
export interface PoliticianBasic {
  id: number;
  name: string;
  birthDate: string;        // 'YYYY-MM-DD' 또는 ISO (백엔드에 맞춰 통일)
  party: string;
  facebookUrl?: string | null;
  instagramUrl?: string | null;
  xUrl?: string | null;
  youtubeUrl?: string | null;
  profileImageUrl?: string | null;
}

// 상세가 리스트와 동일 구조라면 별도 중복 정의 대신 alias로 두면 유지보수 편함
export type PoliticianDetail = PoliticianBasic;
