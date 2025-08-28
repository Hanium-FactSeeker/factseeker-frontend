import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

function normalize(url: string) {
  try {
    const u = new URL(url);
    return u.toString();
  } catch {
    try {
      return new URL(`https://${url}`).toString();
    } catch {
      return undefined;
    }
  }
}

function withOtherScheme(url: string) {
  try {
    const u = new URL(url);
    u.protocol = u.protocol === 'http:' ? 'https:' : 'http:';
    return u.toString();
  } catch {
    return undefined;
  }
}

function resolveUrl(href: string, base: string) {
  try {
    return new URL(href, base).toString();
  } catch {
    return undefined;
  }
}

function pickOgImage(html: string, baseUrl: string) {
  const metas = [
    /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i,
    /<meta[^>]+name=["']og:image["'][^>]+content=["']([^"']+)["']/i,
    /<meta[^>]+property=["']twitter:image["'][^>]+content=["']([^"']+)["']/i,
    /<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i,
  ];
  for (const re of metas) {
    const m = html.match(re);
    if (m?.[1]) {
      const abs = resolveUrl(m[1], baseUrl);
      if (abs) return abs;
    }
  }
  const icon = html.match(
    /<link[^>]+rel=["'](?:apple-touch-icon|icon)["'][^>]+href=["']([^"']+)["']/i,
  );
  if (icon?.[1]) {
    const abs = resolveUrl(icon[1], baseUrl);
    if (abs) return abs;
  }
  return undefined;
}

async function tryFetchHtml(url: string, signal: AbortSignal) {
  const headers = {
    'user-agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
      '(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'accept-language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
    'accept-encoding': 'identity',
  } as Record<string, string>;

  const res = await fetch(url, {
    method: 'GET',
    headers,
    redirect: 'follow',
    signal,
    cache: 'no-store',
  });

  const text = await res.text().catch(() => '');
  return { status: res.status, ok: res.ok, text };
}

export async function GET(req: NextRequest) {
  const src = req.nextUrl.searchParams.get('url') || '';
  const first = normalize(src);
  if (!first) {
    return NextResponse.json({ success: true, image: null });
  }

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 6000);

  try {
    let html = '';
    let image: string | undefined;

    try {
      const r1 = await tryFetchHtml(first, ctrl.signal);
      html = r1.text || '';
      image = html ? pickOgImage(html, first) : undefined;
    } catch {}

    if (!image) {
      const alt = withOtherScheme(first);
      if (alt) {
        try {
          const r2 = await tryFetchHtml(alt, ctrl.signal);
          html = r2.text || '';
          image = html ? pickOgImage(html, alt) : undefined;
        } catch {
          // ignore
        }
      }
    }

    clearTimeout(timer);

    return NextResponse.json({ success: true, image: image ?? null });
  } catch {
    clearTimeout(timer);
    return NextResponse.json({ success: true, image: null });
  }
}
