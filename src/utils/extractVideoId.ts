/**
 * 유튜브 입력값에서 videoId 추출
 *
 * - 일반 videoId (11자 문자열)
 * - https://www.youtube.com/watch?v=ID
 * - https://youtu.be/ID
 * - https://www.youtube.com/shorts/ID
 *
 * @param input 유저 입력값 (videoId 또는 YouTube URL)
 * @returns 추출된 videoId (없으면 null)
 */
export function extractVideoId(input: string): string | null {
  const trimmed = input.trim();

  // 이미 videoId 형식일 경우
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;

  try {
    const u = new URL(trimmed);

    // case 1: https://www.youtube.com/watch?v=ID
    const v = u.searchParams.get('v');
    if (v && /^[a-zA-Z0-9_-]{11}$/.test(v)) return v;

    // case 2: https://youtu.be/ID
    if (u.hostname.includes('youtu.be')) {
      const id = u.pathname.split('/').filter(Boolean)[0];
      if (id && /^[a-zA-Z0-9_-]{11}$/.test(id)) return id;
    }

    // case 3: https://www.youtube.com/shorts/ID
    if (u.pathname.startsWith('/shorts/')) {
      const id = u.pathname.split('/').filter(Boolean)[1];
      if (id && /^[a-zA-Z0-9_-]{11}$/.test(id)) return id;
    }
  } catch {
    // URL이 아니면 무시
  }

  return null;
}
