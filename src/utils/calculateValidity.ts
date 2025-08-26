import { ValidityType, FaceType } from '@/types/validity';

/**
 * percent(0~100)를 5개로 나누어 ValidityType으로 변환
 *
 */
export function percentToValidity(percent: number): ValidityType {
  if (percent == 0) return 'false';
  if (percent <= 20) return 'true5';
  if (percent <= 40) return 'true4';
  if (percent <= 60) return 'true3';
  if (percent <= 80) return 'true2';
  return 'true1';
}

/**
 * 정치인 별 신뢰도 퍼센트(0~100)를 받아 얼굴 캐릭터 데모 이미지로 변환
 *
 */
export function faceImgByPercent(percent: number): string {
  const v = percentToValidity(percent);
  const map: Record<FaceType, string> = {
    true1: '/people/true1.png',
    true2: '/people/true2.png',
    true3: '/people/true3.png',
    true4: '/people/true4.png',
    true5: '/people/true5.png',
  };
  return map[v as FaceType];
}
