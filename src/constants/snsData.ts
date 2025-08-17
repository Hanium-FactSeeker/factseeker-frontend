export interface SnsItem {
  name: string;
  id?: string; 
  party: string;
  type: string;
  percentage: number;
  figureImg?: string; 
  id?: string;
}

export const snsData: SnsItem[] = [
  {
    name: '이국민',
    party: '더불어야잘산당',
    type: 'x',
    percentage: 90,
  },
  {
    name: '홍길동',
    party: '국민다잘산당',
    type: 'youtube',
    percentage: 75,
  },
  {
    name: '김철수',
    party: '모두다잘산당',
    type: 'facebook',
    percentage: 85,
  },
  {
    name: '김영희',
    party: '모두다잘산당',
    type: 'facebook',
    percentage: 85,
  },
  {
    name: '고영희',
    party: '모두다잘산당',
    type: 'facebook',
    percentage: 85,
  },
  {
    name: '박영희',
    party: '행복나라당',
    type: 'x',
    percentage: 60,
  },
  {
    name: '박영희',
    party: '행복나라당',
    type: 'x',
    percentage: 60,
  },
  {
    name: '여덟번',
    party: '배고프당',
    type: 'x',
    percentage: 60,
  },
  {
    name: '아홉번',
    party: '행복나라당',
    type: 'x',
    percentage: 60,
  },
  {
    name: '마지막',
    party: '행복나라당',
    type: 'x',
    percentage: 60,
  },
];
