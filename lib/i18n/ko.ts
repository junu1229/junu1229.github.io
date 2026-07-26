import type { Dictionary } from './en'

export const ko: Dictionary = {
  meta: {
    skipLink: '본문으로 건너뛰기',
    languageToggle: '언어 전환',
  },
  hero: {
    title: 'JUNWOO KIM',
    subtitle: '한눈에 보는 커리어 여행',
    tagline: '풀스택 · 러스트 & 타입스크립트 · 데이터 파이프라인부터 UI까지',
    cta: '스크롤해서 발사',
  },
  launch: {
    label: 'PRE-FLIGHT CHECK',
    title: '연료 주입: 전자·제어공학',
    body: '경기과학기술대학교 (2017–2023). 저수준 프로그래밍, 제어 시스템, 최적화 — 이후 모든 여정의 기반.',
    countdown: '3 · 2 · 1 · 발사',
  },
  devrel: {
    label: 'CHAPTER 01 — FIRST ORBIT',
    period: '2023.10 – 2023.12',
    title: '데브렐 · Kana Labs',
    body: '기술 문서와 SDK 샘플로 외부 개발자 온보딩 시간을 줄이고, 파트너들의 SDK 통합을 지원했습니다.',
  },
  frontend: {
    label: 'CHAPTER 02 — TRADING UI',
    period: '2024.01 – 2024.06',
    title: '프론트엔드 개발자 · Kana Labs',
    body: '옵션·현물·선물 전반의 리더보드, 라이브 트레이딩 UI, 커스텀 차팅을 만들었습니다. 멀티체인 Web3 스택(Arbitrum · BSC · Aptos)을 통합하고 코드베이스 리팩터링을 이끌었습니다.',
  },
  backend: {
    label: 'CHAPTER 03 — THE GIANT',
    period: '2024.07 – 2026.03',
    title: '풀스택 개발자 — 백엔드 단독 담당 · Kana Labs',
    pipeline: {
      title: '파이프라인',
      body: 'Kana의 Aptos 무기한 선물 DEX 데이터 파이프라인(온체인 인덱서 → ETL → 읽기 API)을 처음부터 끝까지 단독으로 맡아 프로덕션에서 운영했습니다. Rust · PostgreSQL · WebSockets · RabbitMQ.',
      stat: '2,000+ events/sec',
      statSub: '3개월간 약 200GB',
    },
    bots: {
      title: '트레이딩 봇',
      body: '마크 가격 대비 0.05% 미만(ATR 구간 제외)으로 유동성을 유지하는 프로덕션 마켓메이킹 봇(Rust)과, 트레이딩 운영을 순이익으로 전환시킨 거래소 간 아비트라지 봇(Rust/Python)을 배포했습니다.',
    },
    scale: {
      title: '스케일',
      body: '20K+ 참여자를 지원하며 파트너(T Wallet · Factblock · AhnLab) 전반의 자동화된 보상 시스템으로 총 20K APT를 분배했습니다. 모바일 최적화 트레이딩 프론트엔드로 플랫폼 채택률을 30% 높였습니다.',
    },
  },
  saturn: {
    label: 'CHAPTER 04 — DESTINATION',
    period: '2026.03 – 현재',
    transit: '그리고, 새로운 미션.',
    title: '공동창업자 & 엔지니어 · Saturn Protocol',
    body: '솔라나의 논커스터디얼 커버드콜 볼트: SOL을 예치하면 주간 옵션 프리미엄에서 수익이 발생합니다 — 옵션 지식이 없어도 됩니다.',
    diagram: ['SOL 예치', '볼트가 주간 콜옵션 발행', '더치 옥션으로 옵션 판매', '프리미엄이 수익으로 환원'],
    moons:
      '3개의 Anchor 프로그램 — vault · options-token · Dutch auction — 을 CPI로 연결하고 Pyth 가격 피드와 Helius 웹훅을 수신합니다. 인덱서 + 읽기 API는 Hono/PostgreSQL, dApp은 Next.js + Solana Wallet Adapter.',
    status: '솔라나 데브넷 라이브 · Colosseum 2026 제출 · 메인넷 준비 중 (감사 · KMS · 프로덕션 RPC)',
  },
  landing: {
    label: 'MISSION CONTROL',
    title: '착륙 완료. 인사 나눠요.',
    resumeCta: '이력서 다운로드 (PDF)',
  },
}
