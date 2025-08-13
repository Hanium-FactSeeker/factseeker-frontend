export interface HotVideosProps {
  videos: VideoItem[];
}

export interface VideoItem {
  id: string;
  grade: string; // 예: '완전 사실'
  gradePercent: string; // 예: '96%'
  gradeColor: string;
  title: string;
  thumbnail: string;
  link: string;
  channelName: string;
}
