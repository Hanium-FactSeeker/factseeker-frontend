import apiClient from "@/apis/apiClient";
import type { PoliticianScoresResponse } from "@/types/politician";
import type { ApiWrap } from "@/types/api";
import type { PoliticianScoreDetail } from "@/types/trustScore";
import type { TopScoresSummaryResponse, PoliticianScoreItem } from "@/types/politician";
import type { PoliticianListResponse, PoliticianBasic } from "@/types/politician";
import type { PoliticianDetail } from "@/types/politician";

//1. 모든 정치인의 최신 신뢰도 점수를 페이지별로 조회
export async function fetchPoliticianScores(
  page: number = 0,
  size: number = 8,
  sortType: "LATEST" | "TRUST_SCORE" = "TRUST_SCORE"
): Promise<PoliticianScoresResponse> {
  console.log("GET /api/politicians/scores 요청 시작", { page, size, sortType });

  try {
    const res = await apiClient.get("/api/politicians/scores", {
      params: { page, size, sortType },
    });
    console.log("GET /api/politicians/scores 응답 성공", res.data);

    return res.data as PoliticianScoresResponse;
  } catch (error: any) {
    const status = error?.response?.status;
    const body = (error?.response?.data ?? {}) as ApiWrap;

    if (status === 400 || status === 404) {
      const msg =
        body.message || (status === 400 ? "잘못된 요청" : "정치인을 찾을 수 없음");
      console.warn(`GET /api/politicians/scores ${status}`, body);
      const e = new Error(msg);
      (e as any).status = status;
      throw e;
    }

    console.error("GET /api/politicians/scores 에러", error);
    throw error;
  }
}

//2. 특정 정치인의 최신 신뢰도 상세 조회
export async function fetchPoliticianScoreDetail(
  id: number | string
): Promise<PoliticianScoreDetail> {
  if (id === null || id === undefined || `${id}`.trim() === "") {
    const e = new Error("유효한 정치인 ID가 필요합니다.");
    (e as any).status = 400;
    throw e;
  }

  const path = `/api/politicians/scores/${id}`;
  console.log(`GET ${path} 요청 시작`);

  try {
    const res = await apiClient.get(path);
    console.log(`GET ${path} 응답 성공`, res.data);

    const raw = res.data as PoliticianScoreDetail | ApiWrap<PoliticianScoreDetail> | unknown;

    let payload: unknown = raw as any;
    if (payload && typeof payload === "object" && "data" in (payload as any)) {
      payload = (payload as any).data;
    }

    return payload as PoliticianScoreDetail;
  } catch (error: any) {
    const status = error?.response?.status;
    const body = (error?.response?.data ?? {}) as ApiWrap;

    if (status === 404) {
      const msg = body.message || "정치인 또는 분석 결과를 찾을 수 없음";
      console.warn(`GET ${path} 404`, body);
      const e = new Error(msg);
      (e as any).status = 404;
      throw e;
    }

    console.error(`GET ${path} 에러`, error);
    throw error;
  }
}

//3. 이름 부분일치로 정치인의 최신 신뢰도 상세들을 조회
export async function searchPoliticianScoresByName(
  name: string
): Promise<PoliticianScoreDetail[]> {
  const trimmed = (name ?? "").trim();

  if (!trimmed) {
    const e = new Error("name 파라미터는 비어 있을 수 없습니다.");
    (e as any).status = 400;
    throw e;
  }

  const path = "/api/politicians/scores/search";
  console.log(`GET ${path} 요청 시작`, { name: trimmed });

  try {
    const res = await apiClient.get(path, { params: { name: trimmed } });
    console.log(`GET ${path} 응답 성공`, res.data);

    const raw = res.data as
      | PoliticianScoreDetail[]
      | ApiWrap<PoliticianScoreDetail[]>
      | { success?: boolean; message?: string; data?: PoliticianScoreDetail[] }
      | unknown;

    if (raw && typeof raw === "object" && "data" in (raw as any)) {
      const data = (raw as any).data;
      if (Array.isArray(data)) return data as PoliticianScoreDetail[];
      return [];
    }

    if (Array.isArray(raw)) {
      return raw as PoliticianScoreDetail[];
    }

    return [];
  } catch (error: any) {
    const status = error?.response?.status;
    const body = (error?.response?.data ?? {}) as ApiWrap;

    if (status === 400) {
      const msg = body?.message || "잘못된 요청";
      console.warn(`GET ${path} 400`, body);
      const e = new Error(msg);
      (e as any).status = 400;
      throw e;
    }

    if (status === 404) {
      const msg = body?.message || "정치인 또는 분석 결과를 찾을 수 없음";
      console.warn(`GET ${path} 404`, body);
      const e = new Error(msg);
      (e as any).status = 404;
      throw e;
    }

    console.error(`GET ${path} 에러`, error);
    throw error;
  }
}




//상위 12명 신뢰도 점수 요약 조회
export async function fetchTopScoresSummary(): Promise<PoliticianScoreItem[]> {
  const path = "/api/politicians/scores/top-summary";
  console.log(`GET ${path} 요청 시작`);

  try {
    const res = await apiClient.get(path);
    console.log(`GET ${path} 응답 성공`, res.data);

    const raw = res.data as
      | TopScoresSummaryResponse
      | ApiWrap<TopScoresSummaryResponse | PoliticianScoreItem[]>
      | PoliticianScoreItem[]
      | unknown;

    if (raw && typeof raw === "object" && "data" in (raw as any)) {
      const data = (raw as any).data;
      if (Array.isArray(data)) return data as PoliticianScoreItem[];
      if (data && typeof data === "object" && Array.isArray((data as any).politicians)) {
        return (data as TopScoresSummaryResponse).politicians;
      }
      return [];
    }

    if (raw && typeof raw === "object" && "politicians" in (raw as any)) {
      return (raw as TopScoresSummaryResponse).politicians ?? [];
    }

    if (Array.isArray(raw)) return raw as PoliticianScoreItem[];

    return [];
  } catch (error: any) {
    const status = error?.response?.status;
    const body = (error?.response?.data ?? {}) as ApiWrap;

    if (status === 400 || status === 404) {
      const msg =
        body?.message || (status === 400 ? "잘못된 요청" : "정치인을 찾을 수 없음");
      console.warn(`GET ${path} ${status}`, body);
      const e = new Error(msg);
      (e as any).status = status;
      throw e;
    }

    console.error(`GET ${path} 에러`, error);
    throw error;
  }
}



 //모든 정치인의 기본 정보를 페이지별로 조회 (이름순)
export async function fetchPoliticiansPage(
  page: number = 0,
  size: number = 10
): Promise<PoliticianListResponse> {
  const path = "/api/politicians";
  console.log(`GET ${path} 요청 시작`, { page, size });

  try {
    const res = await apiClient.get(path, { params: { page, size } });
    console.log(`GET ${path} 응답 성공`, res.data);

    const raw = res.data as
      | PoliticianListResponse
      | ApiWrap<PoliticianListResponse | PoliticianBasic[]>
      | unknown;

    if (raw && typeof raw === "object" && "data" in (raw as any)) {
      const data = (raw as any).data;

      if (Array.isArray(data)) {
        return {
          politicians: data as PoliticianBasic[],
          currentPage: page,
          pageSize: size,
          totalElements: (data as any).length ?? 0,
          totalPages: 1,
          isFirst: page === 0,
          isLast: true,
        };
      }
      return data as PoliticianListResponse;
    }

    if (raw && typeof raw === "object" && "politicians" in (raw as any)) {
      return raw as PoliticianListResponse;
    }

    if (Array.isArray(raw)) {
      return {
        politicians: raw as PoliticianBasic[],
        currentPage: page,
        pageSize: size,
        totalElements: (raw as any).length ?? 0,
        totalPages: 1,
        isFirst: page === 0,
        isLast: true,
      };
    }

    return {
      politicians: [],
      currentPage: page,
      pageSize: size,
      totalElements: 0,
      totalPages: 0,
      isFirst: page === 0,
      isLast: true,
    };
  } catch (error: any) {
    const status = error?.response?.status;
    const body = (error?.response?.data ?? {}) as ApiWrap;

    if (status === 400 || status === 404) {
      const msg =
        body?.message || (status === 400 ? "잘못된 요청" : "정치인을 찾을 수 없음");
      console.warn(`GET ${path} ${status}`, body);
      const e = new Error(msg);
      (e as any).status = status;
      throw e;
    }

    console.error(`GET ${path} 에러`, error);
    throw error;
  }
}


//ID로 정치인 상세 조회
export async function fetchPoliticianDetail(
  id: number | string
): Promise<PoliticianDetail> {
  const idStr = `${id ?? ""}`.trim();
  if (!idStr) {
    const e = new Error("유효한 정치인 ID가 필요합니다.");
    (e as any).status = 400;
    throw e;
  }

  const path = `/api/politicians/${idStr}`;
  console.log(`GET ${path} 요청 시작`);

  try {
    const res = await apiClient.get(path);
    console.log(`GET ${path} 응답 성공`, res.data);

    const raw = res.data as PoliticianDetail | ApiWrap<PoliticianDetail> | unknown;

    if (raw && typeof raw === "object" && "data" in (raw as any)) {
      return (raw as any).data as PoliticianDetail;
    }
    return raw as PoliticianDetail;
  } catch (error: any) {
    const status = error?.response?.status;
    const body = (error?.response?.data ?? {}) as ApiWrap;

    if (status === 400) {
      const msg = body?.message || "잘못된 요청";
      console.warn(`GET ${path} 400`, body);
      const e = new Error(msg);
      (e as any).status = 400;
      throw e;
    }

    if (status === 404) {
      const msg = body?.message || "정치인을 찾을 수 없음";
      console.warn(`GET ${path} 404`, body);
      const e = new Error(msg);
      (e as any).status = 404;
      throw e;
    }

    console.error(`GET ${path} 에러`, error);
    throw error;
  }
}

//이름으로 정치인 검색
export async function fetchPoliticiansByName(
  name: string
): Promise<PoliticianBasic[]> {
  const q = (name ?? "").trim();
  if (!q) {
    const e = new Error("name 파라미터는 비어 있을 수 없습니다.");
    (e as any).status = 400;
    throw e;
  }

  const path = "/api/politicians/search";
  console.log(`GET ${path} 요청 시작`, { name: q });

  try {
    const res = await apiClient.get(path, { params: { name: q } });
    console.log(`GET ${path} 응답 성공`, res.data);

    const raw = res.data as
      | PoliticianBasic[]
      | PoliticianBasic
      | ApiWrap<PoliticianBasic[] | PoliticianBasic>
      | unknown;

    let payload: unknown = raw as any;
    if (payload && typeof payload === "object" && "data" in (payload as any)) {
      payload = (payload as any).data;
    }

    if (Array.isArray(payload)) return payload as PoliticianBasic[];
    if (payload && typeof payload === "object") return [payload as PoliticianBasic];
    return [];
  } catch (error: any) {
    const status = error?.response?.status;
    const body = (error?.response?.data ?? {}) as ApiWrap;

    if (status === 400) {
      const msg = body?.message || "잘못된 요청";
      console.warn(`GET ${path} 400`, body);
      const e = new Error(msg);
      (e as any).status = 400;
      throw e;
    }

    if (status === 404) {
      const msg = body?.message || "정치인을 찾을 수 없음";
      console.warn(`GET ${path} 404`, body);
      const e = new Error(msg);
      (e as any).status = 404;
      throw e;
    }

    console.error(`GET ${path} 에러`, error);
    throw error;
  }
}
