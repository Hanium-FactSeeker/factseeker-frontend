import apiClient from "@/apis/apiClient";
import type { ApiWrap } from "@/types/api";
import type { Politician, PoliticianByNameRequest } from "@/types/politician";
import type { TrustScore } from "@/types/trustScore";
import type { Top12NamesResponse } from "@/types/politician";

// 정치인 목록 조회
export async function fetchPoliticians(): Promise<Politician[]> {
  console.log("GET /api/politicians 요청 시작");
  try {
    const res = await apiClient.get("/api/politicians");
    const data = res.data;
    console.log("GET /api/politicians 응답 성공", data);

    if (Array.isArray(data)) return data as Politician[];
    if (data && typeof data === "object") return [data as Politician];
    return [];
  } catch (error) {
    console.error("GET /api/politicians 에러", error);
    throw error;
  }
}

// ID로 정치인 조회
export async function fetchPoliticianById(id: number | string): Promise<Politician> {
  console.log(`GET /api/politicians/${id} 요청 시작`);

  try {
    const res = await apiClient.get(`/api/politicians/${id}`);
    console.log(`GET /api/politicians/${id} 응답 성공`, res.data);
    return res.data as Politician;
  } catch (error: any) {
    const status = error?.response?.status;

    if (status === 404) {
      const body = (error.response?.data ?? {}) as ApiWrap;
      const msg = body.message || "정치인을 찾을 수 없음";
      console.warn(`GET /api/politicians/${id} 404`, body);
      const notFound = new Error(msg);
      (notFound as any).status = 404;
      throw notFound;
    }

    console.error(`GET /api/politicians/${id} 에러`, error);
    throw error;
  }
}
// 정치인 분석 실행
export async function analyzePolitician(id: number | string): Promise<ApiWrap> {
  console.log(`POST /api/politicians/${id}/analyze 요청 시작`);
  try {
    const res = await apiClient.post(`/api/politicians/${id}/analyze`);
    console.log(`POST /api/politicians/${id}/analyze 응답 성공`, res.data);
    return res.data as ApiWrap;
  } catch (error: any) {
    const status = error?.response?.status;
    const body = error?.response?.data as ApiWrap | undefined;
    const msg = body?.message || (status === 404
      ? "정치인을 찾을 수 없음"
      : status === 500
      ? "분석 실행 실패"
      : "요청 처리 중 오류");

    if (status === 404 || status === 500) {
      console.warn(`POST /api/politicians/${id}/analyze ${status}`, body);
      const e = new Error(msg);
      (e as any).status = status;
      throw e;
    }

    console.error(`POST /api/politicians/${id}/analyze 에러`, error);
    throw error;
  }
}

// 특정 정치인 신뢰도 점수 조회
export async function fetchPoliticianTrustScore(id: number | string): Promise<TrustScore> {
  console.log(`GET /api/politicians/${id}/trust-score 요청 시작`);
  try {
    const res = await apiClient.get(`/api/politicians/${id}/trust-score`);
    console.log(`GET /api/politicians/${id}/trust-score 응답 성공`, res.data);
    return res.data as TrustScore;
  } catch (error: any) {
    const status = error?.response?.status;
    if (status === 404) {
      const body = (error.response?.data ?? {}) as ApiWrap;
      const msg = body?.message || "신뢰도 분석 결과를 찾을 수 없음";
      console.warn(`GET /api/politicians/${id}/trust-score 404`, body);
      const e = new Error(msg);
      (e as any).status = 404;
      throw e;
    }
    console.error(`GET /api/politicians/${id}/trust-score 에러`, error);
    throw error;
  }
}

// 이름으로 정치인 조회
export async function fetchPoliticianByName(name: string): Promise<Politician> {
  if (!name || !name.trim()) {
    const e = new Error("이름은 비어 있을 수 없습니다.");
    (e as any).status = 400;
    throw e;
  }

  console.log("POST /api/politicians/by-name 요청 시작", { name });
  try {
    const body: PoliticianByNameRequest = { name: name.trim() };
    const res = await apiClient.post("/api/politicians/by-name", body);
    console.log("POST /api/politicians/by-name 응답 성공", res.data);
    return res.data as Politician;
  } catch (error: any) {
    const status = error?.response?.status;
    const resp = (error?.response?.data ?? {}) as ApiWrap;

    if (status === 400 || status === 404) {
      const msg =
        resp?.message ||
        (status === 400 ? "잘못된 요청" : "정치인을 찾을 수 없음");
      console.warn(`POST /api/politicians/by-name ${status}`, resp);
      const e = new Error(msg);
      (e as any).status = status;
      throw e;
    }

    console.error("POST /api/politicians/by-name 에러", error);
    throw error;
  }
}
// 전체 정치인 신뢰도 분석 실행
export async function executeAllTrustAnalysis(): Promise<ApiWrap> {
  console.log("POST /api/politicians/analysis/execute 요청 시작");
  try {
    const res = await apiClient.post("/api/politicians/analysis/execute");
    console.log("POST /api/politicians/analysis/execute 응답 성공", res.data);
    return res.data as ApiWrap;
  } catch (error: any) {
    const status = error?.response?.status;
    const body = error?.response?.data as ApiWrap | undefined;
    const msg =
      body?.message ||
      (status === 500 ? "분석 실행 실패" : "요청 처리 중 오류");

    if (status === 500) {
      console.warn("POST /api/politicians/analysis/execute 500", body);
      const e = new Error(msg);
      (e as any).status = 500;
      throw e;
    }

    console.error("POST /api/politicians/analysis/execute 에러", error);
    throw error;
  }
}
// 상위 12개 정치인 이름 조회
export async function fetchTop12Names(): Promise<string[]> {
  console.log("GET /api/politicians/top12-names 요청 시작");
  try {
    const res = await apiClient.get("/api/politicians/top12-names");
    console.log("GET /api/politicians/top12-names 응답 성공", res.data);

    const data = res.data as Top12NamesResponse | string[] | unknown;

    if (Array.isArray(data)) return data as string[];
    if (data && typeof data === "object" && Array.isArray((data as any).names)) {
      return (data as Top12NamesResponse).names;
    }
    return [];
  } catch (error) {
    console.error("GET /api/politicians/top12-names 에러", error);
    throw error;
  }
}

// 정치인 신뢰도 점수 조회 (선택적 날짜)
export async function fetchTrustScores(analysisDate?: string): Promise<TrustScore[]> {
  const q = analysisDate ? `?analysisDate=${analysisDate}` : "";
  console.log(`GET /api/politicians/trust-scores${q} 요청 시작`);

  try {
    if (analysisDate && !/^\d{4}-\d{2}-\d{2}$/.test(analysisDate)) {
      const e = new Error("analysisDate는 YYYY-MM-DD 형식이어야 합니다.");
      (e as any).status = 400;
      throw e;
    }

    const res = await apiClient.get("/api/politicians/trust-scores", {
      params: analysisDate ? { analysisDate } : undefined,
    });
    console.log("GET /api/politicians/trust-scores 응답 성공", res.data);

    const raw = res.data as
      | TrustScore[]
      | TrustScore
      | ApiWrap<TrustScore[] | TrustScore>
      | unknown;

    let payload: unknown = raw as any;
    if (payload && typeof payload === "object" && "data" in (payload as any)) {
      payload = (payload as any).data;
    }

    if (Array.isArray(payload)) return payload as TrustScore[];
    if (payload && typeof payload === "object") return [payload as TrustScore];
    return [];
  } catch (error) {
    console.error("GET /api/politicians/trust-scores 에러", error);
    throw error;
  }
}