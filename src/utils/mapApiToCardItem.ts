export function mapApiToCardItem(raw: any) {
  return {
    id: raw.id ?? raw.name,
    name: raw.name,
    party: raw.party,
    profileImageUrl: '/images/default.png',
    stats: {
      fact: raw.overallScore ?? 0,
      gpt: raw.gptScore ?? 0,
      claude: raw.geminiScore ?? 0,
    },
  };
}
