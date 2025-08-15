export const reportData = {
  video_id: 'abcd1234EFG',
  video_total_confidence_score: 88,
  confidence_summary: '88%',
  channel_type: '시사/보도',
  channel_type_reason:
    '영상 내용 전반이 뉴스 보도 형식이며, 기자 멘트와 현장 화면이 포함되어 있음.',
  claims: [
    {
      claim:
        '인도가 파키스탄의 테러 공격에 보복하기 위해 미사일 9발을 발사했다.',
      result: '사실',
      confidence_score: 92,
      evidence: [
        {
          url: 'https://news.ytn.co.kr/article/202308151234567',
          snippet:
            '인도 정부는 15일 새벽 파키스탄령 카슈미르 지역 내 9곳에 미사일을 발사했다고 공식 발표했습니다.',
          judgment:
            '사실 설명 여부: 예\n- 간단한 설명: 뉴스는 인도 정부가 파키스탄령 카슈미르 내 9곳에 미사일을 발사했다는 사실을 명확히 보도하고 있으며, 주장의 핵심 내용을 뒷받침합니다.',
          source_title: 'YTN',
        },
        {
          url: 'https://www.bbc.com/news/world-asia-66500000',
          snippet:
            'Officials confirmed India launched missiles targeting 9 locations in Pakistan-administered Kashmir in retaliation for recent terrorist attacks.',
          judgment:
            '사실 설명 여부: 예\n- 간단한 설명: BBC 뉴스는 인도 정부의 미사일 발사 사실과 그 배경(테러 보복)을 정확히 전달하고 있습니다.',
          source_title: 'BBC News',
        },
      ],
    },
    {
      claim: '파키스탄이 인도 전투기를 격추했다.',
      result: '부분 사실',
      confidence_score: 75,
      evidence: [
        {
          url: 'https://www.aljazeera.com/news/2023/8/15/pakistan-claims-to-shoot-down-indian-fighter-jet',
          snippet:
            'Pakistani military sources claim they have shot down an Indian fighter jet in Kashmir.',
          judgment:
            '사실 설명 여부: 부분 예\n- 간단한 설명: 알자지라는 파키스탄 측의 주장을 인용하며 보도했으나, 독립적인 검증 자료는 부족합니다.',
          source_title: 'Al Jazeera',
        },
        {
          url: 'https://www.reuters.com/world/asia-pacific/pakistan-claims-downing-indian-fighter-jet-2023-08-15/',
          snippet:
            "Pakistan's military said it shot down an Indian aircraft, but India has denied the claim.",
          judgment:
            '사실 설명 여부: 부분 예\n- 간단한 설명: 로이터는 파키스탄의 격추 주장과 인도의 반박을 모두 보도하여, 주장이 확정되지 않았음을 보여줍니다.',
          source_title: 'Reuters',
        },
      ],
    },
  ],
};
