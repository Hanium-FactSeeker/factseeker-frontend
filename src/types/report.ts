/**
 * 개별 주장(Claim)에 대한 분석 결과
 */
export interface EvidenceItem {
  claim: string;
  result: 'true' | 'false' | 'insufficient_evidence' | string;
  confidence_score: number;
  evidence: string[];
}

/**
 * 비디오 분석에 대한 전체 정보
 */
export interface ReportInfo {
  videoId: string;
  videoUrl: string;
  totalConfidenceScore: number;
  summary: string;
  threeLineSummary: string;
  channelType: string;
  channelTypeReason: string;
  keywords: string;
  createdAt: string;
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | string;
  claims: EvidenceItem[];

  /** 옵셔널 info */
  videoTitle?: string;
  thumbnailUrl?: string;
  channelId?: string;
  channelTitle?: string;
}

/**
 * DataLoader 컴포넌트의 최종 데이터 형식
 * - `info`: 비디오 분석 전체 정보
 * - `evidence`: 주장(Claim) 목록
 */
export interface ReportData {
  info: ReportInfo;
  evidence: EvidenceItem[];
}
