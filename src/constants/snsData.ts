import { maskTail } from '@/utils/maskTail';

export interface SnsItem {
  name: string;
  id?: string; 
  party: string;
  type: string;
  percentage: number;
  figureImg?: string;
  post: string; 
  postedAt?: string;
}

export const snsData: SnsItem[] = [
  {
    name: maskTail('이국민'),
    party: '더불어민주당',
    type: 'facebook',
    percentage: 70,
    post: "",
  },
  {
    name: maskTail('홍준표'),
    party: '무소속',
    type: 'facebook',
    percentage: 87,
    post: "",
  },
  {
    name: maskTail('이준석'),
    party: '개혁신당',
    type: 'youtube',
    percentage: 85,
    post: "",
  },
  {
    name: maskTail('한동훈'),
    party: '국민의힘',
    type: 'youtube',
    percentage: 85,
    post: "",
  },
  {
    name: maskTail('안철수'),
    party: '국민의힘',
    type: 'youtube',
    percentage: 85,
    post: "",
  },
  {
    name: maskTail('박지현'),
    party: '더불어민주당',
    type: 'youtube',
    percentage: 64,
    post: "",
  },
  {
    name: maskTail('유승민'),
    party: '무소속',
    type: 'youtube',
    percentage: 85,
    post: "",
  },
  {
    name: maskTail('오세훈'),
    party: '국민의힘',
    type: 'facebook',
    percentage: 85,
    post: "",
  },
  {
    name: maskTail('김두관'),
    party: '더불어민주당',
    type: 'facebook',
    percentage: 85,
    post: "",
  },
  {
    name: maskTail('하태경'),
    party: '국민의힘',
    type: 'youtube',
    percentage: 85,
    post: "",
  },
  {
    name: maskTail('박용진'),
    party: '더불어민주당',
    type: 'facebook',
    percentage: 85,
    post: "",
  },
  {
    name: maskTail('원희룡'),
    party: '국민의힘',
    type: 'facebook',
    percentage: 85,
    post: "",
  },
  {
    name: maskTail('이준석'),
    party: '개혁신당',
    type: 'youtube',
    percentage: 85,
    post: "",
  },
  {
    name: maskTail('이준석'),
    party: '개혁신당',
    type: 'youtube',
    percentage: 85,
    post: "",
  },
  {
    name: maskTail('이준석'),
    party: '개혁신당',
    type: 'youtube',
    percentage: 85,
    post: "",
  },
  {
    name: maskTail('이준석'),
    party: '개혁신당',
    type: 'youtube',
    percentage: 85,
    post: "",
  },
  {
    name: maskTail('이준석'),
    party: '개혁신당',
    type: 'youtube',
    percentage: 85,
    post: "",
  },

];