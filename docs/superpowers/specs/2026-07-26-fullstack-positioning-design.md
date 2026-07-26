# 풀스택 포지셔닝 재조정 — 설계 문서

- 날짜: 2026-07-26
- 상태: 리뷰 대기
- 선행 문서: `2026-07-24-portfolio-redesign-design.md` (v3, 권위 문서)
- 성격: **카피 전용 변경.** 컴포넌트·애니메이션·레이아웃·씬 구조는 건드리지 않는다.

## 1. 문제

사이트의 **내용**은 이미 풀스택 근거로 가득한데 **라벨**이 그것을 "크립토 트레이딩 전문가"로
좁혀 부르고 있다. 라벨과 내용이 불일치한다.

풀스택 근거는 이미 존재한다:

- Chapter 02 — 리더보드·라이브 트레이딩 UI·커스텀 차팅, 멀티체인 통합, 리팩터링 주도
- Chapter 03 — 인덱서 → ETL → 읽기 API 단독 소유 + 모바일 프론트엔드로 채택률 +30%
- Chapter 04 — Anchor 프로그램 3개 + Hono/PostgreSQL API + Next.js dApp을 혼자

그런데 첫인상 표면 세 곳이 전부 도메인에 묶여 있다:

| 표면 | 현재 값 |
| --- | --- |
| `app/layout.tsx` `metadata.title` | Junwoo Kim — Rust & On-chain Engineer |
| `hero.tagline` | Rust · on-chain protocols · trading infrastructure |
| `lib/content.ts` `SKILL_GROUPS` 2번 슬롯 | Blockchain |

또한 본문 다수가 도메인 용어를 **문장의 주어**로 쓴다(`Kana의 Aptos 무기한 선물 DEX
데이터 파이프라인을…`). 블록체인 지식이 없는 독자는 첫 명사구에서 읽기를 멈춘다.

## 2. 목표와 비목표

**목표**

- 크립토를 **정체성이 아니라 도메인**으로 재배치한다.
- 블록체인 지식이 없는 국내·영어권 일반 IT/스타트업 독자가 끝까지 읽을 수 있게 한다.
- 크립토를 아는 독자에게는 **정보 손실이 0**이어야 한다. 용어를 삭제하지 않고 위치만 옮긴다.
- EN과 KO를 동등한 품질로 유지한다.

**비목표**

- 새 재료를 추가하지 않는다 (사용자 확인: 현재 사이트 내용이 전부).
- 씬 구조·GSAP 타임라인·별 노드 예산·우주 컨셉을 변경하지 않는다.
- 사실을 격상하지 않는다. 이력서 성격의 문서이므로 과장은 치명적 결함으로 취급한다.

## 3. 재배치 원칙

> **일반 개발 언어를 주어로, 도메인은 수식어·괄호로.**

```
BEFORE  Kana의 Aptos 무기한 선물 DEX 데이터 파이프라인(온체인 인덱서 → ETL → 읽기 API)을
        처음부터 끝까지 단독으로 맡아 …
        └ 주어 = "Aptos 무기한 선물 DEX" → 크립토 모르면 정지

AFTER   데이터 파이프라인을 수집(온체인 인덱서) → ETL → 읽기 API까지 처음부터 끝까지 단독으로
        맡아 프로덕션에서 운영했습니다. … (Kana의 Aptos 무기한 선물 DEX)
        └ 주어 = "데이터 파이프라인" → 누구나 읽힘, 도메인은 괄호로 보존
```

부수 제약:

- 길이는 원본 대비 ±20% 이내 (고정 카드 레이아웃).
- `saturn.diagram` 각 항목은 6단어 이내 (SVG 라벨).
- 기술 용어(Rust, PostgreSQL, Next.js 등)는 EN/KO 모두 원문 표기.
- 톤 유지: 간결한 사실 나열. 형용사 남발·느낌표·마케팅 문구 금지.

## 4. 변경 대상 파일

| 파일 | 변경 내용 |
| --- | --- |
| `app/layout.tsx` | `metadata.title`, `metadata.description` |
| `lib/i18n/en.ts` | `hero.tagline` + 본문 6필드 |
| `lib/i18n/ko.ts` | 동일 키의 KO 대응 |
| `lib/content.ts` | `SKILL_GROUPS` 순서 및 `Languages` 항목 순서 |
| `docs/superpowers/specs/2026-07-24-portfolio-redesign-design.md` | 부록 A 동기화 (동결 계약) |
| `tests/portfolio.spec.ts` | §8 참조 — 변경 불필요 예상, 재실행으로 확인 |

## 5. 확정 카피 — 첫인상 표면

### 5.1 `app/layout.tsx`

```
title        Junwoo Kim — Rust & On-chain Engineer
          →  Junwoo Kim — Full-stack Engineer

description  Rust engineer specializing in on-chain protocols and trading infrastructure.
             Co-founder of Saturn Protocol; previously full-stack developer with solo
             backend ownership on a live Aptos perp DEX.
          →  Full-stack engineer who ships end to end — Rust services and data pipelines
             through React/Next.js interfaces. Co-founder of Saturn Protocol; previously
             solo-owned a production data pipeline handling 2,000+ events/sec on an
             Aptos perpetuals DEX.
```

근거: `On-chain Engineer`는 **직함**이라 정체성으로 읽힌다. 직함에 도메인이 박혀 있으면
본문에서 무엇을 하든 도메인 전문가로 분류된다. 제목은 간결하게(사용자 결정), 범위 증명은
태그라인이 맡는다.

`description`에서 `real-time`은 의도적으로 뺐다 — 원본 본문이 하지 않는 주장이다.

### 5.2 `hero.tagline`

```
EN  Rust · on-chain protocols · trading infrastructure
 →  Full-stack · Rust & TypeScript · from data pipelines to UI

KO  러스트 · 온체인 프로토콜 · 트레이딩 인프라
 →  풀스택 · 러스트 & 타입스크립트 · 데이터 파이프라인부터 UI까지
```

3분절 구조를 유지하므로 히어로 레이아웃은 그대로다. `from data pipelines to UI`가
"풀스택"이라는 단어를 양 끝점으로 증명한다.

**유지**: `hero.title`, `hero.subtitle`(A career, in a nutshell / 한눈에 보는 커리어 여행),
`hero.cta`. 셋 다 도메인 중립이다.

## 6. 확정 카피 — 본문

7개 블록을 초안 → 원본 대조 적대적 검증 2단계로 생성했다. 검증에서 29건이 지적됐고
그중 4건이 사실 격상(fatal)이었다. 최종 변경 필드는 8개이며, **2개 블록은 변경하지 않는다.**

### 6.1 변경하지 않는 블록

- **`launch.*` (Scene 1, 학력)** — 도메인 용어 0건. 변경 사유 없음.
- **`devrel.*` (Scene 2, 데브렐)** — 주어가 이미 `Wrote technical docs` / `기술 문서와`.
  변경 이득 0, 계약 갱신 비용 양수.

### 6.2 `frontend.body` (Scene 3)

```
EN  Built leaderboards, live trading UIs, and custom charting across options, spot, and
    futures. Integrated a multi-chain Web3 stack (Arbitrum · BSC · Aptos) and led a
    codebase refactor.
 →  Built web interfaces — leaderboards, live trading UIs, and custom charting — across
    options, spot, and futures. Led a codebase refactor and integrated a multi-chain
    Web3 stack (Arbitrum · BSC · Aptos).

KO  옵션·현물·선물 전반의 리더보드, 라이브 트레이딩 UI, 커스텀 차팅을 만들었습니다.
    멀티체인 Web3 스택(Arbitrum · BSC · Aptos)을 통합하고 코드베이스 리팩터링을 이끌었습니다.
 →  웹 인터페이스를 만들었습니다 — 옵션·현물·선물 전반의 리더보드, 라이브 트레이딩 UI,
    커스텀 차팅. 코드베이스 리팩터링을 이끌고 멀티체인 Web3 스택(Arbitrum · BSC · Aptos)을
    통합했습니다.
```

`frontend.label`(`CHAPTER 02 — TRADING UI`)은 **유지**한다. 크립토 전용 용어가 아니라
일반 IT 독자도 즉시 읽히며, 이 챕터가 무엇에 관한 것인지 알려주는 유일한 라벨 정보다.
제거하면 순손실이다.

### 6.3 `backend.pipeline.body` (Scene 4)

```
EN  Owned Kana's Aptos perp DEX data pipeline end to end — on-chain indexer → ETL →
    read API — live in production. Rust, PostgreSQL, WebSockets, RabbitMQ.
 →  Owned a data pipeline end to end — ingestion (on-chain indexer) → ETL → read API —
    live in production. Rust, PostgreSQL, WebSockets, RabbitMQ. (Kana's Aptos perp DEX)

KO  Kana의 Aptos 무기한 선물 DEX 데이터 파이프라인(온체인 인덱서 → ETL → 읽기 API)을
    처음부터 끝까지 단독으로 맡아 프로덕션에서 운영했습니다. Rust · PostgreSQL ·
    WebSockets · RabbitMQ.
 →  데이터 파이프라인을 수집(온체인 인덱서) → ETL → 읽기 API까지 처음부터 끝까지 단독으로
    맡아 프로덕션에서 운영했습니다. Rust · PostgreSQL · WebSockets · RabbitMQ.
    (Kana의 Aptos 무기한 선물 DEX)
```

`on-chain indexer`는 파이프라인의 **첫 단계**이므로 단계 자리에 남기고 일반 명사
`ingestion`/`수집`을 앞세운다. 괄호로 빼면 별개 시스템인지 제품명인지 읽히지 않는다.

`backend.pipeline.stat`·`statSub`은 카운터 애니메이션 대상이므로 **숫자 표기 그대로 유지**.

### 6.4 `backend.bots.body` (Scene 4)

```
EN  Deployed a production market-making bot (Rust) that kept liquidity within <0.05% of
    mark price (excluding ATR), and a cross-exchange arbitrage bot (Rust/Python) that
    turned the trading operation net-positive.
 →  Deployed two automation bots — a market-making bot (Rust) that kept liquidity within
    <0.05% of mark price (excluding ATR) in production, and a cross-exchange arbitrage
    bot (Rust/Python) that turned the trading operation net-positive.

KO  마크 가격 대비 0.05% 미만(ATR 구간 제외)으로 유동성을 유지하는 프로덕션 마켓메이킹
    봇(Rust)과, 트레이딩 운영을 순이익으로 전환시킨 거래소 간 아비트라지 봇(Rust/Python)을
    배포했습니다.
 →  자동화 봇 두 개를 배포했습니다 — 마크 가격 대비 0.05% 미만(ATR 구간 제외)으로 유동성을
    유지한 프로덕션 마켓메이킹 봇(Rust), 그리고 트레이딩 운영을 순이익으로 전환한
    거래소 간 아비트라지 봇(Rust/Python).
```

주어만 `자동화 봇`으로 일반화하고 **원본의 주장 구조를 그대로 보존**한다. "프로덕션"은
원본과 동일하게 마켓메이킹 봇에만 붙는다.

> **미해결 사실 확인**: 아비트라지 봇도 프로덕션 운영이었다면 원본 카피 자체가 과소
> 서술된 것이다. 확인되면 `in production`의 위치를 `two automation bots`로 옮긴다.
> 확인 전까지는 원본 범위를 유지한다.

### 6.5 `backend.scale.body` (Scene 4)

문장 순서만 뒤집는다. 프론트엔드 성과를 앞으로 빼서 풀스택 근거가 먼저 읽히게 한다.

```
EN  Supported 20K+ participants and distributed a total of 20K APT through automated
    reward systems across partners (T Wallet · Factblock · AhnLab). Shipped a
    mobile-optimized trading frontend that lifted platform adoption by 30%.
 →  Shipped a mobile-optimized trading frontend that lifted platform adoption by 30%.
    Supported 20K+ participants and distributed a total of 20K APT through automated
    reward systems across partners (T Wallet · Factblock · AhnLab).

KO  20K+ 참여자를 지원하며 파트너(T Wallet · Factblock · AhnLab) 전반의 자동화된 보상
    시스템으로 총 20K APT를 분배했습니다. 모바일 최적화 트레이딩 프론트엔드로 플랫폼
    채택률을 30% 높였습니다.
 →  모바일 최적화 트레이딩 프론트엔드로 플랫폼 채택률을 30% 높였습니다. 20K+ 참여자를
    지원하며 파트너(T Wallet · Factblock · AhnLab) 전반의 자동화된 보상 시스템으로
    총 20K APT를 분배했습니다.
```

`20K+ participants`는 **"지원했다"**이지 "보유했다"가 아니다. 원문 동사를 유지한다.

### 6.6 `saturn.*` (Scene 5)

```
body     EN  A non-custodial covered-call vault on Solana: deposit SOL, earn yield from
             weekly option premiums — no options expertise required.
          →  A yield app on Solana: deposit SOL, earn from weekly option premiums — no
             options expertise required. (Non-custodial covered-call vault.)
         KO  솔라나의 논커스터디얼 커버드콜 볼트: SOL을 예치하면 주간 옵션 프리미엄에서
             수익이 발생합니다 — 옵션 지식이 없어도 됩니다.
          →  솔라나 기반 수익형 앱: SOL을 예치하면 주간 옵션 프리미엄에서 수익이
             발생합니다 — 옵션 지식이 없어도 됩니다. (논커스터디얼 커버드콜 볼트)

diagram  EN  2번째 항목 — 부록 A 표기 `saturn.diagram.2`, 코드 배열 index 1
             "Vault writes weekly calls" → "Vault issues weekly call options"
             (writes calls 는 옵션 업계 전용 동사. 나머지 3개 항목과 KO 4개 전부 유지)

moons    EN  Three Anchor programs — vault · options-token · Dutch auction — wired with
             CPI, fed by Pyth prices and Helius webhooks. Indexer + read API on
             Hono/PostgreSQL; dApp on Next.js + Solana Wallet Adapter.
          →  Full stack. Contracts: three Anchor programs (vault · options-token ·
             Dutch auction) wired with CPI, fed by Pyth prices and Helius webhooks.
             Backend: indexer + read API on Hono/PostgreSQL. Frontend: Next.js dApp +
             Solana Wallet Adapter.
         KO  3개의 Anchor 프로그램 — vault · options-token · Dutch auction — 을 CPI로
             연결하고 Pyth 가격 피드와 Helius 웹훅을 수신합니다. 인덱서 + 읽기 API는
             Hono/PostgreSQL, dApp은 Next.js + Solana Wallet Adapter.
          →  풀스택. 컨트랙트: 3개의 Anchor 프로그램(vault · options-token · Dutch
             auction)을 CPI로 연결하고 Pyth 가격 피드와 Helius 웹훅을 수신합니다.
             백엔드: 인덱서 + 읽기 API는 Hono/PostgreSQL. 프론트엔드: dApp은 Next.js +
             Solana Wallet Adapter.

status   EN  Live on Solana devnet · Submitted to Colosseum 2026 · …
          →  Live on Solana devnet (a test network) · Submitted to Colosseum 2026 · …
         KO  솔라나 데브넷 라이브 · Colosseum 2026 제출 · …
          →  솔라나 데브넷(테스트 네트워크) 라이브 · Colosseum 2026 제출 · …
```

`moons`가 이 변경의 핵심이다. `컨트랙트: / 백엔드: / 프론트엔드:` 세 라벨을 붙이면
"혼자 3계층을 다 만들었다"가 문장 구조만으로 드러난다. 정보는 하나도 늘거나 줄지 않는다.

`saturn.transit`·`saturn.title`·나머지 diagram 3개 항목(부록 A `saturn.diagram.1/.3/.4`)은 유지.

## 7. `lib/content.ts` — 스킬 카드

```
1  Languages        (Rust · Python · TypeScript)     1  Languages        (Rust · TypeScript · Python)
2  Blockchain                                   →    2  Backend & Infra
3  Backend & Infra                                   3  Frontend
4  Frontend                                          4  Blockchain
5  Trading Systems                                   5  Trading Systems
```

- Blockchain을 **정체성 자리(2번)에서 도메인 자리(4번)로** 내린다. 삭제하지 않는다.
- `Languages` 안에서 TypeScript를 2번째로. `Rust · TypeScript · Python` 순서 자체가
  "백엔드도 프론트도 한다"는 신호다.
- **5번 슬롯은 고정.** 전체 폭을 쓰는 와이드 카드이며 `Trading Systems`가 항목 5개로
  그 자리를 채우고 있다. 순서를 바꾸면 레이아웃이 깨진다.
- `Trading Systems`라는 이름은 유지. 일반 IT 독자에게 이는 소외 요소가 아니라
  "실시간 금융 시스템 경험"이라는 가산점이다.

부수 효과: `Landing.tsx`의 `GROUP_COLORS`는 위치 기반이므로 카드 테두리 색 배치가 달라진다.
기능 영향 없음. 색 조합이 어색하면 `GROUP_COLORS` 배열만 재정렬한다.

## 8. 테스트 영향

`tests/portfolio.spec.ts` 전체(159행)를 변경 후 문자열과 대조했다. **수정이 필요한
어서션은 5행 하나뿐이다.**

| 라인 | 어서션 | 판정 |
| --- | --- | --- |
| **5** | **`toHaveTitle('Junwoo Kim — Rust & On-chain Engineer')`** | **수정 필수** → `'Junwoo Kim — Full-stack Engineer'` |
| 47/50/54 | `A career, in a nutshell` / `한눈에 보는 커리어 여행` | 미변경 |
| 60/61 | `Fueling up: …` / `PRE-FLIGHT CHECK` | 미변경 |
| 66/67 | `Developer Relations · Kana Labs` / `CHAPTER 01 …` | 미변경 |
| 72/73 | `Frontend Developer · Kana Labs` / `CHAPTER 02 — TRADING UI` | 미변경 |
| 78 | `2,000+ events/sec` | 미변경 |
| 79 | `/<0\.05% of mark price \(excluding ATR\)/` | 변경 후에도 매칭 |
| 80 | `/20K\+ participants/` | 변경 후에도 매칭 |
| 81 | `Full-stack Developer — solo backend ownership · Kana Labs` | 미변경 |
| 86/87 | `Co-founder & Engineer …` / `Then, a new mission.` | 미변경 |
| 88/89 | `ol.sat-flow` 내 `Deposit SOL` / `Premiums flow back as yield` | 미변경 |
| 90 | `/Live on Solana devnet/` | 변경 후에도 매칭 |
| 104/106 | `SKILL_GROUPS` 이름 순회 / `Rust` exact | 순서 무관, 통과 |
| 150 | `ol.sat-flow li` 개수 4 | diagram 항목 수 불변, 통과 |
| 152 | `.sr-only` 내 `2,000+ events/sec` | 미변경 |

**strict-mode 충돌 점검**: 새 `saturn.moons`가 `Frontend:` / `Backend:` 문자열을 포함하지만
104행은 `{ exact: true }`이므로 긴 문단과 매칭되지 않는다. 88행은 `ol.sat-flow`로 스코프가
잡혀 있어 새 `saturn.body`의 `deposit SOL`과 충돌하지 않는다.

기준선은 **35 passed / 1 skipped** 유지. 예상과 다르면 카피가 아니라 로케이터 스코프로
해결한다 (CLAUDE.md 규칙).

## 9. 작업 순서

1. `lib/i18n/en.ts` · `ko.ts` 수정
2. `app/layout.tsx` 메타데이터 수정
3. `lib/content.ts` `SKILL_GROUPS` 재정렬
4. `2026-07-24-portfolio-redesign-design.md` 부록 A를 위 확정 카피와 **byte-exact** 동기화
5. `npm run typecheck && npm run lint && npm run build && npm run test:e2e`
6. 로컬에서 EN/KO 양쪽 육안 확인 (히어로 · Scene 4 · Scene 5 · 랜딩 카드)

단일 커밋으로 처리한다. 카피·계약·테스트가 한 묶음이어야 동결 계약이 깨지지 않는다.

## 10. 범위 밖 (별도 판단 필요)

- **`public/Junwoo_Kim_Resume.pdf`** — 이력서 PDF도 같은 포지셔닝을 담고 있을 가능성이
  높지만 이번 변경 대상이 아니다. 사이트만 바꾸면 사이트와 PDF의 자기소개가 어긋난다.
  사용자 확인 필요.
- `hero.subtitle` 변경 — 현재 도메인 중립이라 유지. 원하면 별건으로 처리.
- 씬 구조 재구성(안 C) — 재료 추가 없이 씬을 늘리면 내용이 얇아지므로 기각.
