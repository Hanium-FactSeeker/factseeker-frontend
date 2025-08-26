import { ValidityType } from '@/types/validity';

/**
 * percent(0~100)를 5개로 나누어 ValidityType으로 변환
 *
 */
export function percentToValidity(percent: number): ValidityType {
  if (percent == 0) return 'false';
  if (percent < 20) return 'true5';
  if (percent < 40) return 'true4';
  if (percent < 60) return 'true3';
  if (percent < 80) return 'true2';
  return 'true1';
}
