export interface TrustScore {
  id: number;
  politicianId: number;
  politicianName: string;
  analysisDate: string;          // e.g. "2025-08-23"
  analysisPeriod: string;
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
  analysisStatus: string;        // e.g. "PENDING"
  errorMessage: string;
  retryCount: number;
  lastUpdated: string;           // ISO string
}
