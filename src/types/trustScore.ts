// 이미 2번에서 선언한 타입 재사용
export type AnalysisStatus = 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED';

export interface PoliticianScoreDetail {
  id: number;
  politicianId: number;
  politicianName: string;
  politicianParty: string;
  analysisDate: string;      // 'YYYY-MM-DD'
  analysisPeriod: string;    // 예: 'DAILY' | 'WEEKLY' 등

  overallScore: number;
  integrityScore: number;
  transparencyScore: number;
  consistencyScore: number;
  accountabilityScore: number;

  gptScore: number;
  geminiScore: number;

  gptIntegrityReason: string;
  gptTransparencyReason: string;
  gptConsistencyReason: string;
  gptAccountabilityReason: string;

  geminiIntegrityReason: string;
  geminiTransparencyReason: string;
  geminiConsistencyReason: string;
  geminiAccountabilityReason: string;

  analysisStatus: AnalysisStatus;
  errorMessage?: string | null;

  retryCount: number;
  lastUpdated: string;       // ISO
}
