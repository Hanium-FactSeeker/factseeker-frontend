"use client";

import { useCallback, useState } from "react";
import { analyzePolitician } from "@/apis/politician/politician";
import type { ApiWrap } from "@/types/api";

export function useAnalyzePolitician(id?: number | string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [result, setResult] = useState<ApiWrap | null>(null);

  const run = useCallback(async () => {
    if (id == null) return;
    console.log(`정치인 분석 실행 시작: ${id}`);
    setLoading(true);
    setError(null);
    try {
      const res = await analyzePolitician(id);
      setResult(res);
      console.log(`정치인 분석 실행 성공: ${id}`, res);
      return res;
    } catch (e) {
      setError(e);
      console.error(`정치인 분석 실행 실패: ${id}`, e);
      throw e;
    } finally {
      setLoading(false);
    }
  }, [id]);

  return { run, loading, error, result };
}
