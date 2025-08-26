export function maskTail(input: string, count = 1, maskChar = '*'): string {
  if (!input) return '';
  const chars = Array.from(input); // 유니코드 안전 분리
  const n = Math.max(0, Math.min(count, chars.length));
  return chars.slice(0, chars.length - n).join('') + maskChar.repeat(n);
}
