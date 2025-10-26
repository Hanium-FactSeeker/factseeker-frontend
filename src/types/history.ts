import type { ValidityType } from './validity';
import type { SnsType } from './logo';

export type HistoryTabType = 'articles' | 'sns' | 'politicians';

export interface HistoryItem {
  id: string;
  title: string;
  thumbnail?: string;
  date: string;
  type: HistoryTabType;
  validity?: ValidityType;
  validityPercent?: number;
}

export interface ArticleHistoryItem extends HistoryItem {
  type: 'articles';
  source?: string;
  url?: string;
}

export interface SnsHistoryItem extends HistoryItem {
  type: 'sns';
  politicianName: string;
  politicianParty: string;
  politicianImage?: string;
  snsType: SnsType;
  post?: string;
  url?: string;
}

export interface PoliticianHistoryItem extends HistoryItem {
  type: 'politicians';
  politicianName: string;
  politicianParty: string;
  politicianImage?: string;
  trustScore?: number;
}

export interface HistoryStats {
  title: string;
  description: string;
  chartData: {
    label: string;
    value: number;
    color: string;
  }[];
}

export interface HistoryPageData {
  currentTab: HistoryTabType;
  currentPage: number;
  totalPages: number;
  items: (ArticleHistoryItem | SnsHistoryItem | PoliticianHistoryItem)[];
  stats: HistoryStats;
}
