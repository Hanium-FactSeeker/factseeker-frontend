export interface VideoItem {
  id: string;
  title: string;
  thumbnail: string;
  link: string;
  url?: string;
  gradePercent?: number | null;
  gradeStatus?: 'COMPLETED' | 'PENDING' | 'FAILED' | 'UNKNOWN';
  channelName?: string;
}

export interface HotVideosProps {
  videos: VideoItem[];
}
