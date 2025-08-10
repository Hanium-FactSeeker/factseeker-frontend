import { BadgeType } from '@/types/validity';

export interface HotVideosProps {
  videos: VideoItem[];
}

export interface VideoItem {
  grade: string; // 예: '완전 사실'
  gradePercent: string; // 예: '96%'
  gradeColor: string;
  title: string;
  thumbnail: string;
  link: string;
}
