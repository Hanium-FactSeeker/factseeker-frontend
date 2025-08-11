import { useEffect, useMemo, useState } from 'react';

interface Options {
  intervalMs?: number; //전환 간격
  rowHeight?: number; // translateY 계산에 사용되는 높이
  autoplay?: boolean; // 일시정지
}

/**
 * 주어진 목록을 일정 시간마다 하나씩 넘겨서
 * 지금 위치와 화면 이동에 쓸 transform 값을 돌려줍니다.
 *
 * @param {any[]} items - 순환할 데이터 목록
 * @param {number} [intervalMs=2500] - 몇 밀리초마다 넘길지
 * @param {number} [rowHeight=24] - 한 줄 높이(px)
 * @returns {{ idx: number, transform: { transform: string }, setIdx: Function }}
 */
export function useRotatingList<T>(
  items: T[],
  { intervalMs = 2500, rowHeight = 24, autoplay = true }: Options = {},
) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (!autoplay || items.length === 0) return;
    const t = setInterval(() => {
      setIdx((i) => (i + 1) % items.length);
    }, intervalMs);
    return () => clearInterval(t);
  }, [autoplay, items.length, intervalMs]);

  const transform = useMemo(
    () => ({ transform: `translateY(-${idx * rowHeight}px)` }),
    [idx, rowHeight],
  );

  return {
    idx,
    setIdx,
    transform,
    rowHeight,
    current: items[idx],
    isLast: idx === items.length - 1,
  };
}
