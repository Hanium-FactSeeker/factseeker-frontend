export interface SnsItem {
  name: string;
  id?: string;
  party: string;
  type: string;
  percentage: number;
  figureImg?: string;
  post: string;
  postedAt?: string;
  url?: string;
}

export const snsData: SnsItem[] = [
  {
    name: '이재명',
    party: '더불어민주당',
    type: 'facebook',
    percentage: 70,
    post: '트럼프 대통령과의 회담에서 한미동맹의 미래와 북핵 문제, 경제 협력 방안을 논의했습니다.한미 기업 협력을 통해 글로벌 경쟁력과 안정적 공급망을 강화하겠습니다.',
    url: 'https://www.facebook.com/jaemyunglee/',
  },
  {
    name: '홍준표',
    party: '무소속',
    type: 'facebook',
    percentage: 87,
    post: '이단 종교·보수 정치 세력과 결별할 수 있겠느냐는 질문',
    url: 'https://www.facebook.com/joonpyohong21',
  },
  {
    name: '이준석',
    party: '개혁신당',
    type: 'facebook',
    percentage: 85,
    post: '장동혁 의원의 국민의힘 대표 선출을 축하하며, 건전한 경쟁과 합리적 대안을 제시하는 야당의 역할을 기대합니다.  국민의힘이 국민의 신뢰를 회복하고, 더 나은 미래를 위해 노력하길 바랍니다.',
    url: 'https://www.facebook.com/junseokandylee',
  },
  {
    name: '한동훈',
    party: '국민의힘',
    type: 'facebook',
    percentage: 88,
    post: '2030 청년들이 자기 싫어한다고 매도하고 훈계하려 드는 나쁜 갈라치기 정치. 자중해야 합니다.',
    url: 'https://www.facebook.com/dh.han.3',
  },
  {
    name: '안철수',
    party: '국민의힘',
    type: 'x',
    percentage: 85,
    post: '李정부, 개성공단 재가동 꿈꾸지만…지원재단 빚만 ‘774억’ 안철수 “개성재단 재설립·공단 재가동, 급진적으로 추진할 경우 뒤탈 우려”',
    url: 'https://x.com/cheolsoo0919/status/1958738538243268958',
  },
  {
    name: '박지현',
    party: '더불어민주당',
    type: 'x',
    percentage: 64,
    post: '<사과도 반성도 없는 박완주, 정의는 피해자의 편에 서야 한다> 성추행 혐의로 기소된 전 더불어민주당 의원 박완주에게 법원은 1심에 이어 항소심에서도 징역 1년을 선고했습니다.',
    url: 'https://x.com/paarkjihy_20/status/1958419712750268633',
  },
  {
    name: '유승민',
    party: '국민의힘',
    type: 'youtube',
    percentage: 77,
    post: '제헌절 77주년에 포항에서 마린온 순직 장병을 추모하고 유가족을 위로했습니다.마린온·P3C 사고 진상규명·재발방지와 채 상병 사건 특검을 통한 진실 규명을 촉구했습니다.',
    url: 'https://www.youtube.com/@loveyoo../posts',
  },
  {
    name: '오세훈',
    party: '국민의힘',
    type: 'x',
    percentage: 85,
    post: '장동혁 신임 대표 선출을 축하하며, 국민 눈높이에 맞는 희망과 책임 있는 정당으로 거듭나야 한다고 강조했습니다.',
    url: 'https://www.facebook.com/jaemyunglee/',
  },
  {
    name: '김두관',
    party: '더불어민주당',
    type: 'youtube',
    percentage: 80,
    post: '윤석열 석방에 분노하지만 탄핵과는 무관한 절차적 변수라고 밝혔습니다.위헌적 계엄 책임에 대한 8:0 전원일치 탄핵을 확신하며, 분노를 법치 수호로 모으자고 촉구했습니다.',
    url: 'https://www.youtube.com/@TV-dw9ee/posts',
  },
  {
    name: '하태경',
    party: '국민의힘',
    type: 'facebook',
    percentage: 83,
    post: '외국계 금융사들은 한국 금융당국의 세부까지 개입하는 규제를 지적했습니다.금융선진국을 위해 당국 개혁이 우선이며, 보험사 해외투자가 일본의 1/20 수준임을 성찰해야 합니다.',
    url: 'https://www.facebook.com/radiohahapage',
  },
  {
    name: '박용진',
    party: '더불어민주당',
    type: 'x',
    percentage: 81,
    post: '국민의힘은 스스로를 내란정당으로 규정하고, 해체의 길에 자기 발로 걸어 들어가는 중이군요. 누가 말리겠습니까? 저는 지금 대구에 있는데, 대구에서도 식당과 카페 곳곳에서 한탄과 헛웃음이 터져 나오는군요.',
    url: 'https://x.com/hopeparkyongjin',
  },
  {
    name: '원희룡',
    party: '국민의힘',
    type: 'facebook',
    percentage: 89,
    post: '저의 책임을 다하기 위해 대선에 출마하지 않겠습니다. 그리고, 대선 승리를 위해, 당의 단합과 국민의 지지에 필요한 일이라면 어떠한 역할이라도 하겠습니다.',
    url: 'https://www.facebook.com/happywon',
  },
];
