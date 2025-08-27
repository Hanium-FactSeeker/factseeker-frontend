export async function getOgImage(url: string, signal?: AbortSignal): Promise<string | undefined> {
  try {
    const qs = new URLSearchParams({ url }).toString();
    const res = await fetch(`/api/og?${qs}`, { cache: 'no-store', signal });
    if (!res.ok) return undefined;
    const json = await res.json();
    return json?.image || undefined;
  } catch {
    return undefined;
  }
}
