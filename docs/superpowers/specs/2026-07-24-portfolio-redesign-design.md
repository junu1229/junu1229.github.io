# 포트폴리오 리디자인 — Kurzgesagt 우주 여행 스크롤리텔링

- **날짜**: 2026-07-24
- **상태**: 사용자 승인 대기
- **저장소**: junu1229.github.io (GitHub Pages 사용자 사이트)

## 1. 개요와 목표

기존 정적 HTML 포트폴리오를 전부 걷어내고, 경력을 Kurzgesagt 인포그래픽 스타일의
**우주 여행 스크롤리텔링**으로 소개하는 원페이지 사이트를 처음부터 새로 만든다.

- **주요 관객**: 채용 담당자 + 웹3 업계 사람들 (균형)
- **핵심 서사**: 커리어 = 우주 비행. 교육(발사 준비) → Kana Labs의 세 단계(행성 3개) →
  Saturn Protocol 공동창업(토성 도착). "Saturn"이라는 프로젝트 이름이 서사의 종착지와 일치한다.
- **성공 기준**: 방문자가 스크롤만으로 경력의 흐름과 핵심 임팩트 수치(2,000+ events/sec,
  <0.05% spread, 20K+ 참여자)를 기억하게 만든다. 이력서 PDF 다운로드와 연락 수단이 명확하다.

## 2. 비목표

- 블로그, 프로젝트 상세 페이지, CMS 등 원페이지를 넘는 콘텐츠 구조
- 서버 기능(API, 폼 제출 등) — 순수 정적 사이트로 한정
- 기존 사이트 콘텐츠(about.html, freePets.html 등)의 보존 또는 이전

## 3. 콘텐츠 소스

모든 경력 콘텐츠는 `Junwoo_Kim_Resume.pdf`(2026-05 기준) 기준. 링크:

- GitHub: <https://github.com/junu1229>
- LinkedIn: <https://www.linkedin.com/in/junwoooooo-kim/>
- Email: <junu1229@gmail.com>
- 이력서 PDF: `public/Junwoo_Kim_Resume.pdf`로 이동 후 다운로드 링크 제공

카피 원본은 영어로 작성하고 한국어 번역을 병기한다(§7 i18n). 톤은 담백한 설명형 —
Kurzgesagt의 "쉽게 설명하기"는 유지하되 유머러스한 카피는 넣지 않는다.

## 4. 스토리 구조 — 장면별 상세

시네마틱 풀 연출: 각 장면이 화면에 고정(pin)되고 스크롤 진행도가 애니메이션
타임라인을 재생(scrub)한다. 장면 사이는 로켓이 점선 궤도를 따라 이동하는 전환.

### Scene 0 — HERO · 심우주
- 별밭 + "JUNWOO KIM" / "A career, in a nutshell" / "Rust · on-chain protocols · trading infra"
- 우주비행사 마스코트가 유영. 우측 상단에 EN|KR 토글(항상 고정 표시).
- "SCROLL TO LAUNCH ↓" 유도. 스크롤 시 별들이 흐르며 발사대 장면으로 하강.

### Scene 1 — LAUNCH · 발사 준비 (교육, 2017–2023)
- Gyeonggi University of Science and Technology, 전자·제어공학.
- 저수준 프로그래밍·제어 시스템·최적화 = "연료 주입"으로 표현. 체크리스트가 하나씩 켜지고
  카운트다운 후 로켓 발사. 마스코트는 탑승 전 엄지척 포즈.

### Scene 2 — PLANET 01 · Dev-rel (Kana Labs, 2023.10–12)
- 코랄색 소행성. 문서/SDK 아이콘이 궤도 회전.
- 카피: 기술 문서와 SDK 샘플 작성으로 외부 개발자 온보딩 시간 단축, 파트너 SDK 통합 지원.

### Scene 3 — PLANET 02 · Frontend (Kana Labs, 2024.01–06)
- 틸색 행성. 리더보드·라이브 트레이딩 UI·커스텀 차팅 요소가 화면 위에서 조립되는 애니메이션.
- 멀티체인 지갑(Arbitrum·BSC·Aptos)이 위성으로 연결. 코드베이스 리팩터링 리드 언급.

### Scene 4 — PLANET 03 · Solo Backend (Kana Labs, 2024.07–2026.03) ★ 최장 챕터
가장 큰 퍼플 행성. 스크롤 3비트로 분할:
1. **파이프라인**: 온체인 인덱서 → ETL → 읽기 API 파이프가 연결되고 오렌지 파티클(이벤트)이
   흐른다. 카운터가 2,000+/sec까지 상승, "~200GB / 3 months" 스탯 칩.
   기술 배지: Rust · PostgreSQL · WebSockets · RabbitMQ.
2. **트레이딩 봇**: 오더북에 마켓메이킹 봇(Rust)이 <0.05% 스프레드로 호가를 채우고,
   아비트라지 봇(Rust/Python)이 거래소 사이를 오가며 P&L 게이지가 음수→양수로 전환.
3. **스케일**: 20K+ 참여자에게 20K APT 분배 — 지갑 아이콘들이 쏟아지며 채워진다.
   파트너 보상 자동화(T Wallet·Factblock·AhnLab), 모바일 트레이딩 프론트로 채택 +30%.

### Scene 5 — SATURN ARRIVAL · Saturn Protocol (2026.03–현재) ★ 클라이맥스
- 심우주 전환 문구 "Then, a new mission." 후 토성 등장(골드 + 링).
- 커버드콜 볼트 설명 다이어그램이 스크롤에 맞춰 그려진다:
  SOL 입금 → 볼트 → 주간 옵션 프리미엄 → 수익. "옵션 지식 불필요" 메시지.
- 위성 3개 = Anchor 프로그램 3개: vault · options-token · Dutch auction (CPI로 연결).
- Pyth 가격 피드·Helius 웹훅은 신호 수신 안테나로 표현. 인덱서+읽기 API(Hono/PostgreSQL),
  dApp(Next.js + Wallet Adapter) 언급.
- 상태 배지: Solana devnet 라이브 · Colosseum 2026 제출 · 메인넷 준비 중(감사, KMS, RPC).

### Scene 6 — LANDING · 스킬 별자리 + 연락처
- 마스코트가 착륙해 깃발을 꽂는다.
- 스킬이 별자리로 연결: Languages(Rust·Python·TypeScript) / Blockchain(Solana·Aptos·Anchor) /
  Backend & Infra(Node.js·PostgreSQL·Redis·RabbitMQ·Docker) /
  Frontend(Next.js·React·TradingView·Wallet Adapter) / Trading Systems(MM bots·arbitrage·options vaults·indexers)
- 연락처: GitHub · LinkedIn · Email · Resume PDF 다운로드 버튼.

## 5. 비주얼 시스템

### 팔레트 (디자인 토큰)
| 토큰 | 값 | 용도 |
|---|---|---|
| space-navy | #0B1026 | 페이지 배경 |
| panel-navy | #1A2340 | 패널/카드 |
| rocket-orange | #FF9F43 | 주 강조, CTA |
| saturn-gold | #FFB84D | 토성, Scene 5 강조 |
| teal | #4DD8C0 | Scene 3 강조 |
| coral | #FF6B6B | Scene 2 강조 |
| purple | #A29BFE | Scene 4 강조 |
| cream | #FDF6E3 | 본문 텍스트, 마스코트 |
| ring-sand | #F2D09A | 토성 링 |

규칙: 배경은 항상 네이비 계열. 챕터마다 강조색 1개. 그라디언트는 배경 심도용으로만
최소 사용, 오브젝트는 플랫 2톤 셰이딩("밑면 진한 톤").

### 타이포그래피
- Display(EN): **Baloo 2** (next/font, Google Fonts)
- Display(KR)/본문: **Pretendard** (variable, npm 패키지로 self-host)
- 숫자·지표: **JetBrains Mono**

### 일러스트 규칙
- 외부 이미지 없음. 전부 인라인 SVG React 컴포넌트로 직접 제작.
- 마스코트 우주비행사: 플랫·라운드 형태, 장면별 포즈 변형(엄지척 → 조종 → 유영 → 깃발 꽂기).
- 장식용 SVG는 `aria-hidden`.

## 6. 기술 아키텍처

- **프레임워크**: Next.js(App Router) + TypeScript, `output: 'export'` 정적 빌드
- **애니메이션**: GSAP ScrollTrigger(장면 pin + scrub) + Lenis(부드러운 스크롤),
  로켓 경로는 SVG motion path
- **배포**: GitHub Actions — 타입체크·lint·build 후 `out/`을 GitHub Pages로 배포
  (Pages 소스를 "GitHub Actions"로 설정 필요 — 저장소 설정에서 1회 수동 작업)

### 파일 구조
```
app/
  layout.tsx            # 폰트, 메타데이터, LanguageProvider
  page.tsx              # 장면들을 순서대로 조립만
components/
  scenes/               # Hero, Launch, PlanetDevrel, PlanetFrontend,
                        # PlanetBackend, SaturnArrival, Landing (장면당 1파일)
  space/                # Astronaut, Rocket, Planet, Starfield, StatChip,
                        # ChapterLabel 등 공용 부품
lib/
  i18n/                 # en.ts, ko.ts, LanguageProvider, useT()
  scroll/               # ScrollTrigger 셋업, useSceneTimeline 훅
public/
  Junwoo_Kim_Resume.pdf
  og.png                # 토성 장면 기반 OG 이미지 (구현 시 제작)
.github/workflows/deploy.yml
```

### SEO/메타
- title: "Junwoo Kim — Rust & On-chain Engineer"
- description: 요약문 기반 1문장. OG 이미지는 토성 장면의 정적 렌더.
- 모든 카피는 실제 DOM 텍스트로 존재(크롤러가 읽을 수 있게).

## 7. i18n — EN/KR 토글

- 라우트 분리 없는 클라이언트 토글. 기본 언어 영어.
- 모든 문구를 `lib/i18n/en.ts`, `ko.ts` 사전에 정의. `useT()` 훅으로 조회.
- 선택은 localStorage에 저장, `<html lang>` 속성도 함께 갱신.
- 토글 UI는 우측 상단 고정(전 장면 공통).

## 8. 모바일 · 접근성 · 성능

- pin 연출은 모바일에서도 동작하되 장면 레이아웃은 세로 화면 재배치, 파랄랙스 감쇠
- `prefers-reduced-motion`: pin 없이 일반 스크롤 + 정적 장면 폴백.
  콘텐츠는 애니메이션과 무관하게 항상 DOM에 존재
- 색 대비: cream(#FDF6E3) on space-navy(#0B1026) — WCAG AA 이상
- 폰트는 next/font 서브셋 로딩, 이미지 없음(SVG만)으로 경량 유지

## 9. 검증 전략

- CI: `tsc --noEmit` + eslint + `next build` 통과 후에만 배포
- Playwright 스모크 테스트:
  1. 페이지 로드 및 7개 장면 렌더 확인
  2. EN/KR 토글 시 hero 문구 전환 확인
  3. 이력서 PDF 링크 200 응답
  4. reduced-motion 에뮬레이션에서 전체 콘텐츠 노출 확인
- 구현 중 로컬 dev 서버를 브라우저로 직접 확인(장면별 스크롤 연출 검수)

## 10. 기존 자산 처리

- **삭제**: index.html, about.html, freePets.html, test1.html, css/, js/, resource/, woff2/, .DS_Store
- **이동**: Junwoo_Kim_Resume.pdf → public/
- **신규**: .gitignore (node_modules, .next, out, .superpowers, .DS_Store)

## 11. 결정 로그

| 결정 | 선택 | 비고 |
|---|---|---|
| 목적 | 이직 + 업계 네트워킹 균형 | |
| 스택 | Next.js 정적 export | 이력서 스택과 일치 |
| 구조 | 원페이지 | |
| 언어 | EN + KR 토글, 기본 EN | |
| 디자인 | Kurzgesagt 인포그래픽 — 우주 여행 스크롤리텔링(A안) | 비주얼 컴패니언으로 4→3안 비교 후 선택 |
| 연출 강도 | 시네마틱 풀 pin | reduced-motion 폴백 필수 |
| 캐릭터 | 마스코트 우주비행사(본인), 담백한 카피 | 풀 Kurzgesagt 유머는 배제 |
