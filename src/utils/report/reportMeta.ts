import { getVideoMeta } from '@/apis/report/getVideoMeta';
import type { ReportInfo } from '@/types/report';

export async function getMetaUsingId(info: ReportInfo, signal: AbortSignal) {
  const needTitle = !info.videoTitle;
  const needThumb = !info.thumbnailUrl;
  if ((!needTitle && !needThumb) || !info.videoId) return info;
  try {
    const meta = await getVideoMeta(info.videoId, signal);
    return {
      ...info,
      videoTitle: info.videoTitle ?? meta?.videoTitle,
      thumbnailUrl: info.thumbnailUrl ?? meta?.thumbnailUrl,
      channelId: info.channelId ?? meta?.channelId,
      channelTitle: info.channelTitle ?? meta?.channelTitle,
    } as ReportInfo;
  } catch {
    return info;
  }
}
