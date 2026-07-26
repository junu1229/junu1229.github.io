# 풀스택 포지셔닝 재조정 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 포트폴리오의 첫인상 표면과 본문 카피를 재배치해, 크립토를 모르는 일반 IT/스타트업 독자에게 풀스택 역량이 먼저 읽히게 한다. 정보 손실 0, 사실 격상 0.

**Architecture:** 카피 전용 변경이다. 컴포넌트·GSAP 타임라인·레이아웃·씬 구조는 한 줄도 건드리지 않는다. 변경은 4개 소스 파일(`app/layout.tsx`, `lib/i18n/en.ts`, `lib/i18n/ko.ts`, `lib/content.ts`)과 동결 계약 문서(`docs/superpowers/specs/2026-07-24-portfolio-redesign-design.md` 부록 A), 그리고 `tests/portfolio.spec.ts`에 걸쳐 있다.

**Tech Stack:** Next.js 16 (App Router, 정적 export) · TypeScript · Playwright

## Global Constraints

- **카피 동결 계약**: `lib/i18n/en.ts`·`ko.ts`의 문자열은 `docs/superpowers/specs/2026-07-24-portfolio-redesign-design.md` 부록 A와 **byte-exact**로 일치해야 한다. 카피를 바꾸는 커밋은 반드시 같은 커밋에서 부록 A를 갱신한다. 태스크를 나눠도 이 짝은 절대 분리하지 않는다.
- **테스트 기준선**: 35 passed / 1 skipped. 이 계획은 **기존 테스트 본문에 어서션을 추가**할 뿐 새 `test()` 블록을 만들지 않으므로 이 숫자가 유지되어야 한다. 숫자가 바뀌면 잘못 구현한 것이다.
- **사실 격상 금지**: 원본이 주장하지 않은 것을 새로 주장하지 않는다. 특히 `20K+ participants`는 "지원했다"이지 "보유했다"가 아니며, "프로덕션"은 마켓메이킹 봇에만 붙는다.
- **기술 용어 표기**: Rust, PostgreSQL, WebSockets, RabbitMQ, Next.js, Hono, Anchor, Pyth, Helius 등은 EN/KO 모두 원문 표기.
- **구분자 규약**: EN 스택 나열은 쉼표(`Rust, PostgreSQL, …`), KO 스택 나열은 가운뎃점(`Rust · PostgreSQL · …`). 기존 파일 관례를 따른다.
- **미변경 대상**: `hero.title`, `hero.subtitle`, `hero.cta`, `launch.*`, `devrel.*`, `frontend.label`, `frontend.title`, `backend.title`, `backend.*.title`, `backend.pipeline.stat`, `backend.pipeline.statSub`, `saturn.transit`, `saturn.title`, `saturn.diagram` 1·3·4번, `landing.*`, 연락처 링크 4종.
- **게이트**: 각 태스크 끝에서 `npm run typecheck && npm run lint && npm run build && npm run test:e2e`. e2e는 빌드된 `out/`을 대상으로 하므로 build가 선행되어야 한다.

**커밋 전략 — 스펙 §9로부터의 의도적 이탈**: 스펙 §9는 "단일 커밋"을 지시한다. 그 근거는
"카피·계약·테스트가 한 묶음이어야 동결 계약이 깨지지 않는다"였다. 이 계획은 4개 커밋으로
나누되 **각 커밋 안에서 i18n·부록 A·테스트를 항상 짝지어** 그 근거를 그대로 만족시킨다.
어느 커밋에서 멈춰도 계약은 깨지지 않고 게이트는 통과한다. 태스크별 리뷰가 가능해지는
이득만 추가로 얻는다. 한 커밋을 선호하면 Task 1-4를 수행한 뒤 `git reset --soft`로 뭉치면 된다.

---

### Task 1: 첫인상 표면 (탭 제목 · 메타 · 태그라인)

**Files:**
- Modify: `tests/portfolio.spec.ts:5` (제목 어서션), `tests/portfolio.spec.ts:44-56` (태그라인 어서션 추가)
- Modify: `app/layout.tsx:16-18`
- Modify: `lib/i18n/en.ts:11`
- Modify: `lib/i18n/ko.ts:11`
- Modify: `docs/superpowers/specs/2026-07-24-portfolio-redesign-design.md:371`

**Interfaces:**
- Consumes: 없음 (첫 태스크)
- Produces: 없음. 이후 태스크는 이 태스크의 산출물에 의존하지 않는다 — 각 태스크는 서로 다른 i18n 키를 건드린다.

- [ ] **Step 1: 실패하는 테스트를 쓴다**

`tests/portfolio.spec.ts` 5행을 교체한다:

```ts
  await expect(page).toHaveTitle('Junwoo Kim — Full-stack Engineer')
```

그리고 `'Hero 카피와 EN/KR 토글이 동작한다'` 테스트(44행부터) 안에 태그라인 어서션 2개를 추가한다. 새 `test()` 블록을 만들지 말 것 — 기존 블록 본문에 넣는다:

```ts
test('Hero 카피와 EN/KR 토글이 동작한다', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'JUNWOO KIM' })).toBeVisible()
  await expect(page.getByText('A career, in a nutshell')).toBeVisible()
  await expect(page.getByText('Full-stack · Rust & TypeScript · from data pipelines to UI')).toBeVisible()

  await page.getByRole('button', { name: 'Switch language' }).click()
  await expect(page.getByText('한눈에 보는 커리어 여행')).toBeVisible()
  await expect(page.getByText('풀스택 · 러스트 & 타입스크립트 · 데이터 파이프라인부터 UI까지')).toBeVisible()
  await expect(page.locator('html')).toHaveAttribute('lang', 'ko')

  await page.reload()
  await expect(page.getByText('한눈에 보는 커리어 여행')).toBeVisible()
  await expect(page.locator('html')).toHaveAttribute('lang', 'ko')
})
```

- [ ] **Step 2: 테스트가 실패하는지 확인한다**

Run: `npm run build && npx playwright test --grep "타이틀|Hero 카피"`
Expected: FAIL — 제목이 여전히 `Junwoo Kim — Rust & On-chain Engineer`이고, 새 태그라인 문자열이 DOM에 없다.

- [ ] **Step 3: `app/layout.tsx` 메타데이터를 고친다**

16-18행을 교체한다:

```ts
  title: 'Junwoo Kim — Full-stack Engineer',
  description:
    'Full-stack engineer who ships end to end — Rust services and data pipelines through React/Next.js interfaces. Co-founder of Saturn Protocol; previously solo-owned a production data pipeline handling 2,000+ events/sec on an Aptos perpetuals DEX.',
```

- [ ] **Step 4: `lib/i18n/en.ts` 태그라인을 고친다**

11행:

```ts
    tagline: 'Full-stack · Rust & TypeScript · from data pipelines to UI',
```

- [ ] **Step 5: `lib/i18n/ko.ts` 태그라인을 고친다**

11행:

```ts
    tagline: '풀스택 · 러스트 & 타입스크립트 · 데이터 파이프라인부터 UI까지',
```

- [ ] **Step 6: 부록 A를 동기화한다**

`docs/superpowers/specs/2026-07-24-portfolio-redesign-design.md` 371행을 교체한다:

```markdown
| hero.tagline | Full-stack · Rust & TypeScript · from data pipelines to UI | 풀스택 · 러스트 & 타입스크립트 · 데이터 파이프라인부터 UI까지 |
```

- [ ] **Step 7: 게이트를 돌린다**

Run: `npm run typecheck && npm run lint && npm run build && npm run test:e2e`
Expected: **35 passed, 1 skipped**. 숫자가 다르면 새 `test()` 블록을 만든 것이니 되돌린다.

- [ ] **Step 8: 커밋**

```bash
git add app/layout.tsx lib/i18n/en.ts lib/i18n/ko.ts tests/portfolio.spec.ts docs/superpowers/specs/2026-07-24-portfolio-redesign-design.md
git commit -m "feat: 첫인상 표면을 풀스택 포지셔닝으로 교체 (탭 제목·메타·태그라인)"
```

---

### Task 2: Scene 3·4 본문 재배치

**Files:**
- Modify: `lib/i18n/en.ts:30, 38, 44, 48`
- Modify: `lib/i18n/ko.ts:30, 38, 44, 48`
- Modify: `docs/superpowers/specs/2026-07-24-portfolio-redesign-design.md:393, 400, 404, 406`

**Interfaces:**
- Consumes: 없음
- Produces: 없음

이 태스크는 새 어서션을 추가하지 않는다. 기존 정규식 어서션 3개(79·80·90행)가 **변경 후에도 계속 통과하는지**가 검증 포인트다 — 이는 재배치 과정에서 핵심 수치를 잃지 않았다는 증거다.

- [ ] **Step 1: `lib/i18n/en.ts`의 본문 4개를 교체한다**

30행 (`frontend.body`):

```ts
    body: 'Built web interfaces — leaderboards, live trading UIs, and custom charting — across options, spot, and futures. Led a codebase refactor and integrated a multi-chain Web3 stack (Arbitrum · BSC · Aptos).',
```

38행 (`backend.pipeline.body`):

```ts
      body: "Owned a data pipeline end to end — ingestion (on-chain indexer) → ETL → read API — live in production. Rust, PostgreSQL, WebSockets, RabbitMQ. (Kana's Aptos perp DEX)",
```

44행 (`backend.bots.body`):

```ts
      body: 'Deployed two automation bots — a market-making bot (Rust) that kept liquidity within <0.05% of mark price (excluding ATR) in production, and a cross-exchange arbitrage bot (Rust/Python) that turned the trading operation net-positive.',
```

48행 (`backend.scale.body`):

```ts
      body: 'Shipped a mobile-optimized trading frontend that lifted platform adoption by 30%. Supported 20K+ participants and distributed a total of 20K APT through automated reward systems across partners (T Wallet · Factblock · AhnLab).',
```

- [ ] **Step 2: `lib/i18n/ko.ts`의 본문 4개를 교체한다**

30행:

```ts
    body: '웹 인터페이스를 만들었습니다 — 옵션·현물·선물 전반의 리더보드, 라이브 트레이딩 UI, 커스텀 차팅. 코드베이스 리팩터링을 이끌고 멀티체인 Web3 스택(Arbitrum · BSC · Aptos)을 통합했습니다.',
```

38행:

```ts
      body: '데이터 파이프라인을 수집(온체인 인덱서) → ETL → 읽기 API까지 처음부터 끝까지 단독으로 맡아 프로덕션에서 운영했습니다. Rust · PostgreSQL · WebSockets · RabbitMQ. (Kana의 Aptos 무기한 선물 DEX)',
```

44행:

```ts
      body: '자동화 봇 두 개를 배포했습니다 — 마크 가격 대비 0.05% 미만(ATR 구간 제외)으로 유동성을 유지한 프로덕션 마켓메이킹 봇(Rust), 그리고 트레이딩 운영을 순이익으로 전환한 거래소 간 아비트라지 봇(Rust/Python).',
```

48행:

```ts
      body: '모바일 최적화 트레이딩 프론트엔드로 플랫폼 채택률을 30% 높였습니다. 20K+ 참여자를 지원하며 파트너(T Wallet · Factblock · AhnLab) 전반의 자동화된 보상 시스템으로 총 20K APT를 분배했습니다.',
```

- [ ] **Step 3: 부록 A 4개 행을 동기화한다**

`docs/superpowers/specs/2026-07-24-portfolio-redesign-design.md`에서 393·400·404·406행을 위 문자열로 교체한다. 표 형식은 `| key | en | ko |`이며, EN/KO 셀 안의 문자열은 소스 파일과 **한 글자도 다르면 안 된다.**

```markdown
| frontend.body | Built web interfaces — leaderboards, live trading UIs, and custom charting — across options, spot, and futures. Led a codebase refactor and integrated a multi-chain Web3 stack (Arbitrum · BSC · Aptos). | 웹 인터페이스를 만들었습니다 — 옵션·현물·선물 전반의 리더보드, 라이브 트레이딩 UI, 커스텀 차팅. 코드베이스 리팩터링을 이끌고 멀티체인 Web3 스택(Arbitrum · BSC · Aptos)을 통합했습니다. |
```

```markdown
| backend.pipeline.body | Owned a data pipeline end to end — ingestion (on-chain indexer) → ETL → read API — live in production. Rust, PostgreSQL, WebSockets, RabbitMQ. (Kana's Aptos perp DEX) | 데이터 파이프라인을 수집(온체인 인덱서) → ETL → 읽기 API까지 처음부터 끝까지 단독으로 맡아 프로덕션에서 운영했습니다. Rust · PostgreSQL · WebSockets · RabbitMQ. (Kana의 Aptos 무기한 선물 DEX) |
```

```markdown
| backend.bots.body | Deployed two automation bots — a market-making bot (Rust) that kept liquidity within <0.05% of mark price (excluding ATR) in production, and a cross-exchange arbitrage bot (Rust/Python) that turned the trading operation net-positive. | 자동화 봇 두 개를 배포했습니다 — 마크 가격 대비 0.05% 미만(ATR 구간 제외)으로 유동성을 유지한 프로덕션 마켓메이킹 봇(Rust), 그리고 트레이딩 운영을 순이익으로 전환한 거래소 간 아비트라지 봇(Rust/Python). |
```

```markdown
| backend.scale.body | Shipped a mobile-optimized trading frontend that lifted platform adoption by 30%. Supported 20K+ participants and distributed a total of 20K APT through automated reward systems across partners (T Wallet · Factblock · AhnLab). | 모바일 최적화 트레이딩 프론트엔드로 플랫폼 채택률을 30% 높였습니다. 20K+ 참여자를 지원하며 파트너(T Wallet · Factblock · AhnLab) 전반의 자동화된 보상 시스템으로 총 20K APT를 분배했습니다. |
```

- [ ] **Step 4: 게이트를 돌린다**

Run: `npm run typecheck && npm run lint && npm run build && npm run test:e2e`
Expected: **35 passed, 1 skipped**.

`'핵심 지표 3종이 DOM 텍스트로 존재한다'` 테스트가 특히 중요하다. 이 테스트가 실패하면 재배치 중 `<0.05% of mark price (excluding ATR)` 또는 `20K+ participants`를 잃어버린 것이다 — 카피를 다시 맞춰라. **테스트를 고치지 마라.**

- [ ] **Step 5: 커밋**

```bash
git add lib/i18n/en.ts lib/i18n/ko.ts docs/superpowers/specs/2026-07-24-portfolio-redesign-design.md
git commit -m "feat: Scene 3·4 본문을 일반 개발 언어 주어로 재배치"
```

---

### Task 3: Scene 5 (Saturn) 본문 재배치

**Files:**
- Modify: `lib/i18n/en.ts:56, 57, 59, 60`
- Modify: `lib/i18n/ko.ts:56, 57, 59, 60`
- Modify: `tests/portfolio.spec.ts:84-91` (moons 어서션 추가)
- Modify: `docs/superpowers/specs/2026-07-24-portfolio-redesign-design.md:413, 415, 418, 419`

**Interfaces:**
- Consumes: 없음
- Produces: 없음

- [ ] **Step 1: 실패하는 테스트를 쓴다**

`'Saturn 장면 카피·다이어그램 목록이 노출된다'` 테스트 본문에 어서션 1줄을 추가한다. 이 변경의 핵심인 3계층 라벨을 고정한다. 새 `test()` 블록을 만들지 말 것:

```ts
test('Saturn 장면 카피·다이어그램 목록이 노출된다', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText('Co-founder & Engineer · Saturn Protocol')).toBeAttached()
  await expect(page.getByText('Then, a new mission.')).toBeAttached()
  await expect(page.locator('ol.sat-flow').getByText('Deposit SOL')).toBeAttached()
  await expect(page.locator('ol.sat-flow').getByText('Premiums flow back as yield')).toBeAttached()
  await expect(page.getByText(/Live on Solana devnet/)).toBeAttached()
  await expect(page.getByText(/Contracts: three Anchor programs/)).toBeAttached()
})
```

- [ ] **Step 2: 테스트가 실패하는지 확인한다**

Run: `npm run build && npx playwright test --grep "Saturn 장면"`
Expected: FAIL — `Contracts: three Anchor programs` 문자열이 아직 DOM에 없다.

- [ ] **Step 3: `lib/i18n/en.ts`의 saturn 4필드를 교체한다**

56행 (`saturn.body`):

```ts
    body: 'A yield app on Solana: deposit SOL, earn from weekly option premiums — no options expertise required. (Non-custodial covered-call vault.)',
```

57행 (`saturn.diagram`) — **2번째 항목만** 바꾼다. 나머지 3개는 그대로:

```ts
    diagram: ['Deposit SOL', 'Vault issues weekly call options', 'Dutch auction sells options', 'Premiums flow back as yield'],
```

58-59행 (`saturn.moons` — 키와 값이 두 줄로 나뉘어 있다):

```ts
    moons:
      'Full stack. Contracts: three Anchor programs (vault · options-token · Dutch auction) wired with CPI, fed by Pyth prices and Helius webhooks. Backend: indexer + read API on Hono/PostgreSQL. Frontend: Next.js dApp + Solana Wallet Adapter.',
```

60행 (`saturn.status`):

```ts
    status: 'Live on Solana devnet (a test network) · Submitted to Colosseum 2026 · Mainnet pre-flight (audit · KMS · production RPC)',
```

- [ ] **Step 4: `lib/i18n/ko.ts`의 saturn 필드를 교체한다**

`ko.saturn.diagram`은 **변경하지 않는다** (원본이 이미 명확함). 3개 필드만 바꾼다.

56행:

```ts
    body: '솔라나 기반 수익형 앱: SOL을 예치하면 주간 옵션 프리미엄에서 수익이 발생합니다 — 옵션 지식이 없어도 됩니다. (논커스터디얼 커버드콜 볼트)',
```

59행:

```ts
    moons:
      '풀스택. 컨트랙트: 3개의 Anchor 프로그램(vault · options-token · Dutch auction)을 CPI로 연결하고 Pyth 가격 피드와 Helius 웹훅을 수신합니다. 백엔드: 인덱서 + 읽기 API는 Hono/PostgreSQL. 프론트엔드: dApp은 Next.js + Solana Wallet Adapter.',
```

60행:

```ts
    status: '솔라나 데브넷(테스트 네트워크) 라이브 · Colosseum 2026 제출 · 메인넷 준비 중 (감사 · KMS · 프로덕션 RPC)',
```

- [ ] **Step 5: 부록 A 4개 행을 동기화한다**

413·415·418·419행을 교체한다. 415행은 `saturn.diagram.2` 행이며 **EN 셀만** 바뀐다:

```markdown
| saturn.body | A yield app on Solana: deposit SOL, earn from weekly option premiums — no options expertise required. (Non-custodial covered-call vault.) | 솔라나 기반 수익형 앱: SOL을 예치하면 주간 옵션 프리미엄에서 수익이 발생합니다 — 옵션 지식이 없어도 됩니다. (논커스터디얼 커버드콜 볼트) |
```

```markdown
| saturn.diagram.2 | Vault issues weekly call options | 볼트가 주간 콜옵션 발행 |
```

```markdown
| saturn.moons | Full stack. Contracts: three Anchor programs (vault · options-token · Dutch auction) wired with CPI, fed by Pyth prices and Helius webhooks. Backend: indexer + read API on Hono/PostgreSQL. Frontend: Next.js dApp + Solana Wallet Adapter. | 풀스택. 컨트랙트: 3개의 Anchor 프로그램(vault · options-token · Dutch auction)을 CPI로 연결하고 Pyth 가격 피드와 Helius 웹훅을 수신합니다. 백엔드: 인덱서 + 읽기 API는 Hono/PostgreSQL. 프론트엔드: dApp은 Next.js + Solana Wallet Adapter. |
```

```markdown
| saturn.status | Live on Solana devnet (a test network) · Submitted to Colosseum 2026 · Mainnet pre-flight (audit · KMS · production RPC) | 솔라나 데브넷(테스트 네트워크) 라이브 · Colosseum 2026 제출 · 메인넷 준비 중 (감사 · KMS · 프로덕션 RPC) |
```

- [ ] **Step 6: 게이트를 돌린다**

Run: `npm run typecheck && npm run lint && npm run build && npm run test:e2e`
Expected: **35 passed, 1 skipped**.

`'정보성 콘텐츠가 스크린리더용 DOM으로 존재한다'`가 `ol.sat-flow li` 개수 4를 검사한다. diagram 배열 길이를 4에서 바꾸지 않았는지 확인하는 안전망이다.

- [ ] **Step 7: 커밋**

```bash
git add lib/i18n/en.ts lib/i18n/ko.ts tests/portfolio.spec.ts docs/superpowers/specs/2026-07-24-portfolio-redesign-design.md
git commit -m "feat: Saturn 씬을 3계층(컨트랙트·백엔드·프론트엔드) 구조로 재작성"
```

---

### Task 4: 스킬 카드 순서 재배치

**Files:**
- Modify: `lib/content.ts:8-17`
- Modify: `docs/superpowers/specs/2026-07-24-portfolio-redesign-design.md:428-432`

**Interfaces:**
- Consumes: 없음
- Produces: 없음

- [ ] **Step 1: `lib/content.ts`의 `SKILL_GROUPS`를 재정렬한다**

8-17행 전체를 교체한다. Blockchain을 2번 슬롯에서 4번 슬롯으로 내리고, `Languages` 안에서 TypeScript를 2번째로 올린다. **5번 슬롯(`Trading Systems`)은 그대로 둔다** — 전체 폭을 쓰는 와이드 카드이며 항목 5개가 그 자리를 채운다:

```ts
export const SKILL_GROUPS = [
  { name: 'Languages', items: ['Rust', 'TypeScript', 'Python'] },
  { name: 'Backend & Infra', items: ['Node.js', 'PostgreSQL', 'Redis', 'RabbitMQ', 'Docker'] },
  { name: 'Frontend', items: ['Next.js', 'React', 'TradingView', 'Solana Wallet Adapter'] },
  { name: 'Blockchain', items: ['Solana', 'Aptos', 'Anchor'] },
  {
    name: 'Trading Systems',
    items: ['market-making bots', 'cross-exchange arbitrage', 'options vaults', 'perps flows', 'on-chain indexers'],
  },
] as const
```

- [ ] **Step 2: 부록 A의 스킬 목록을 동기화한다**

428-432행을 교체한다:

```markdown
스킬 별자리 (두 locale 공통):
- Languages: Rust · TypeScript · Python
- Backend & Infra: Node.js · PostgreSQL · Redis · RabbitMQ · Docker
- Frontend: Next.js · React · TradingView · Solana Wallet Adapter
- Blockchain: Solana · Aptos · Anchor
- Trading Systems: market-making bots · cross-exchange arbitrage · options vaults · perps flows · on-chain indexers
```

- [ ] **Step 3: 전체 게이트를 돌린다**

Run: `npm run typecheck && npm run lint && npm run build && npm run test:e2e`
Expected: **35 passed, 1 skipped**.

`'스킬 5그룹이 노출된다'`는 이름 배열을 순회할 뿐 순서를 검사하지 않으므로 통과해야 한다. `getByText('Rust', { exact: true })`도 `Languages`의 첫 항목이 여전히 `Rust`이므로 통과한다.

- [ ] **Step 4: 로컬에서 육안 확인한다**

Run: `npm run dev -- -p 3001`

브라우저에서 확인할 것:

1. 탭 제목이 `Junwoo Kim — Full-stack Engineer`인가
2. 히어로 태그라인이 EN/KR 양쪽에서 새 문자열로 보이는가
3. 스킬 카드 상단 행이 `Languages · Backend & Infra · Frontend · Blockchain` 순인가
4. `Trading Systems`가 여전히 전체 폭 와이드 카드로 하단에 있는가 (레이아웃이 깨지지 않았는가)
5. 카드 테두리 색 배치(`GROUP_COLORS`는 위치 기반)가 어색하지 않은가 — 어색하면 `components/scenes/Landing.tsx:8`의 배열만 재정렬한다. 카피는 건드리지 않는다.
6. Scene 4·5 본문이 카드 밖으로 넘치지 않는가 (길이 ±20% 제약을 지켰는지의 실물 확인)

- [ ] **Step 5: 커밋**

```bash
git add lib/content.ts docs/superpowers/specs/2026-07-24-portfolio-redesign-design.md
git commit -m "feat: 스킬 카드에서 Blockchain을 정체성 자리에서 도메인 자리로 이동"
```

---

## 완료 조건

- [ ] `npm run typecheck && npm run lint && npm run build && npm run test:e2e` — 35 passed / 1 skipped
- [ ] `lib/i18n/en.ts`·`ko.ts`의 모든 문자열이 부록 A와 byte-exact 일치
- [ ] 새 `test()` 블록이 추가되지 않았음 (기준선 숫자 불변)
- [ ] EN/KO 양쪽 육안 확인 완료

## 범위 밖

- `public/Junwoo_Kim_Resume.pdf` — 사이트와 PDF의 자기소개가 어긋날 수 있다. 별건으로 판단한다.
- `hero.subtitle` 변경
- 씬 구조 재구성
