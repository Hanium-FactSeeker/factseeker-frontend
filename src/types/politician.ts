export interface PoliticianScoreItem {
  id: number | undefined;
  profileImageUrl(profileImageUrl: any): string;
  trustScore: number;
  totalScore: number;
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

export interface PoliticianBasic {
  id: number;
  name: string;
  birthDate: string;      
  party: string;
  facebookUrl?: string | null;
  instagramUrl?: string | null;
  xUrl?: string | null;
  youtubeUrl?: string | null;
  profileImageUrl?: string | null;
}

export interface PoliticianListResponse {
  politicians: PoliticianBasic[];
  currentPage: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  isFirst: boolean;
  isLast: boolean;
}

export interface PoliticianBasic {
  id: number;
  name: string;
  birthDate: string;        
  party: string;
  facebookUrl?: string | null;
  instagramUrl?: string | null;
  xUrl?: string | null;
  youtubeUrl?: string | null;
  profileImageUrl?: string | null;
}

export type PoliticianDetail = PoliticianBasic;
