import type { ValidityType } from './validity';

export interface VideoItem {
  id: string;
  title: string;
  thumbnail: string;
  link: string;
  url?: string;
  gradePercent?: number | null;
  gradeStatus?: 'COMPLETED' | 'PENDING' | 'FAILED' | 'UNKNOWN';
  channelName?: string;
  publishedAt?: string;
  date?: string;
  grade?: ValidityType | null;
}

export interface HotVideosProps {
  videos: VideoItem[];
}
