# Kurzgesagt 우주 여행 포트폴리오 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 경력을 우주 비행 서사로 소개하는 Kurzgesagt 스타일 시네마틱 스크롤리텔링 원페이지 포트폴리오를 처음부터 구축해 GitHub Pages에 배포한다.

**Architecture:** Next.js(App Router) 정적 export. Server Component(layout/page)는 metadata·폰트·조립만, `PortfolioExperience`부터 `"use client"`. 장면 7개는 각각 독립 컴포넌트로 GSAP ScrollTrigger pin/scrub 타임라인을 갖고, 일러스트는 전부 인라인 SVG. EN/KR은 클라이언트 토글(첫 paint 항상 영어).

**Tech Stack:** Next.js, TypeScript, GSAP(ScrollTrigger·MotionPathPlugin·@gsap/react), Lenis, Playwright, GitHub Actions → GitHub Pages

**Spec:** `docs/superpowers/specs/2026-07-24-portfolio-redesign-design.md` (v3, Codex 승인). 모든 카피는 스펙 부록 A만 사용한다.

## Global Constraints

- 패키지 매니저 npm, CI Node 22. `output: 'export'`, `basePath: ''`, `assetPrefix: ''`
- 화면 카피는 부록 A 확정 문자열만 — 구현자가 경력 카피를 새로 작성하지 않는다
- 챕터 라벨·스킬 명칭·기간 표기는 두 locale 공통 영어
- 첫 정적 paint는 항상 영어. render 중 `localStorage` 읽기 금지 (hydration mismatch 방지)
- 애니메이션 허용 속성: `transform`·`opacity` + 예외 2가지(카운터 `textContent`, SVG `stroke-dasharray`/`stroke-dashoffset`). 스크롤 중 React `setState` 금지
- 별 노드 최대 80개, 이동 파티클·지갑 glyph 장면당 최대 40개, `<symbol>`/`<use>` 재사용
- 강조색(orange·gold·teal·coral·purple) 배경 위 텍스트·아이콘은 `--on-accent`(#0B1026)
- 모든 버튼·링크 `:focus-visible`: `2px solid #FDF6E3`, offset 2px
- 순수 장식 SVG는 `aria-hidden="true"`; 정보성 SVG는 인접 DOM 목록 제공 시에만 `aria-hidden`
- 카운터는 `aria-hidden` + 최종 수치 `sr-only` 별도 제공
- `prefers-reduced-motion`이 모든 모드보다 우선: Lenis·ScrollTrigger 미초기화, 최종 상태 표시
- 모바일(`pointer: coarse` 또는 ≤767px): Lenis 미초기화, native touch scroll, `preventDefault` 금지
- 장면 DOM은 **최종 상태로 작성**하고 타임라인은 `from`/`fromTo`로 애니메이션 (JS 없이도 콘텐츠 완전 노출)
- 커밋 메시지는 저장소 관례(`feat:`/`chore:`/`test:` + 한국어 요약) 따름

---

### Task 1: 기존 자산 삭제

**Files:**
- Delete: `index.html`, `about.html`, `freePets.html`, `test1.html`, `css/`, `js/`, `resource/`, `woff2/`, `.DS_Store`

**Interfaces:**
- Consumes: 없음
- Produces: 깨끗한 저장소 루트 (남는 것: `Junwoo_Kim_Resume.pdf`, `docs/`, `.gitignore`, `.git`)

- [ ] **Step 1: 파일 삭제**

```bash
cd /Users/junwookim/Desktop/personal/junu1229.github.io
git rm -r index.html about.html freePets.html test1.html css js resource woff2
rm -f .DS_Store
```

- [ ] **Step 2: 결과 확인**

Run: `ls -A`
Expected: `.git .gitignore Junwoo_Kim_Resume.pdf docs` (`.superpowers`가 보이면 무시 — gitignore됨)

- [ ] **Step 3: Commit**

```bash
git commit -m "chore: 기존 정적 사이트 자산 전체 삭제"
```

---

### Task 2: Next.js 스캐폴드

**Files:**
- Create: `package.json`, `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `app/layout.tsx`, `app/page.tsx`, `app/globals.css`
- Move: `Junwoo_Kim_Resume.pdf` → `public/Junwoo_Kim_Resume.pdf`

**Interfaces:**
- Consumes: Task 1의 깨끗한 루트
- Produces: `npm run typecheck|lint|build` 가 성공하는 프로젝트. `out/` 산출물. path alias `@/*` → 루트

- [ ] **Step 1: package.json 작성**

```json
{
  "name": "junu1229.github.io",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "typecheck": "tsc --noEmit",
    "lint": "eslint .",
    "test:e2e": "playwright test"
  }
}
```

- [ ] **Step 2: 의존성 설치 (lockfile 생성)**

```bash
npm install next react react-dom gsap @gsap/react lenis pretendard
npm install -D typescript @types/node @types/react @types/react-dom eslint eslint-config-next @eslint/eslintrc @playwright/test serve
```

참고: `@eslint/eslintrc`는 flat config에서 `eslint-config-next`를 로드하기 위한 헬퍼로, 스펙 devDependencies 목록의 실행을 위해 필요하다.

- [ ] **Step 3: 설정 파일 작성**

`next.config.ts`:
```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '',
  assetPrefix: '',
}

export default nextConfig
```

`tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules", "out"]
}
```

`eslint.config.mjs`:
```js
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat({ baseDirectory: dirname(fileURLToPath(import.meta.url)) })

export default [
  { ignores: ['node_modules/**', '.next/**', 'out/**', 'docs/**'] },
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
]
```

- [ ] **Step 4: 최소 앱 코드 작성**

`app/globals.css` (Task 4에서 확장):
```css
* { box-sizing: border-box; margin: 0; padding: 0; }
```

`app/layout.tsx`:
```tsx
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://junu1229.github.io'),
  title: 'Junwoo Kim — Rust & On-chain Engineer',
  description:
    'Rust engineer specializing in on-chain protocols and trading infrastructure. Co-founder of Saturn Protocol; previously solo backend engineer on a live Aptos perp DEX.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

`app/page.tsx`:
```tsx
export default function Home() {
  return <main>Junwoo Kim</main>
}
```

- [ ] **Step 5: 이력서 PDF 이동**

```bash
mkdir -p public && git mv Junwoo_Kim_Resume.pdf public/Junwoo_Kim_Resume.pdf
```

- [ ] **Step 6: 검증**

Run: `npm run typecheck && npm run lint && npm run build && ls out/Junwoo_Kim_Resume.pdf out/index.html`
Expected: 모두 성공, 두 파일 존재

- [ ] **Step 7: Commit**

```bash
git add -A && git commit -m "feat: Next.js 정적 export 스캐폴드 구축"
```

---

### Task 3: Playwright 하네스 + 첫 스모크 테스트

**Files:**
- Create: `playwright.config.ts`, `tests/portfolio.spec.ts`

**Interfaces:**
- Consumes: Task 2의 `out/` 빌드
- Produces: `npm run test:e2e` — `out/`을 `npx serve`로 서빙해 chromium + mobile-webkit 2개 프로젝트로 검증. 이후 모든 태스크는 `tests/portfolio.spec.ts`에 테스트를 추가한다

- [ ] **Step 1: playwright.config.ts 작성**

```ts
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  use: { baseURL: 'http://127.0.0.1:3000' },
  webServer: {
    command: 'npx serve out -l 3000',
    url: 'http://127.0.0.1:3000',
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile-webkit', use: { ...devices['iPhone 13'] } },
  ],
})
```

- [ ] **Step 2: 실패하는 스모크 테스트 작성**

`tests/portfolio.spec.ts`:
```ts
import { test, expect } from '@playwright/test'

test('페이지가 로드되고 타이틀이 있다', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle('Junwoo Kim — Rust & On-chain Engineer')
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
})

test('이력서 PDF가 200으로 응답한다', async ({ request }) => {
  const res = await request.get('/Junwoo_Kim_Resume.pdf')
  expect(res.status()).toBe(200)
})
```

- [ ] **Step 3: 브라우저 설치 후 테스트 실행**

Run: `npx playwright install chromium webkit && npm run build && npm run test:e2e`
Expected: PASS (4 tests — 2 tests × 2 projects)

- [ ] **Step 4: Commit**

```bash
git add playwright.config.ts tests/ && git commit -m "test: Playwright 하네스 및 스모크 테스트 추가"
```

---

### Task 4: 디자인 토큰 · 폰트 · 전역 스타일

**Files:**
- Modify: `app/globals.css`, `app/layout.tsx`

**Interfaces:**
- Consumes: Task 2 스캐폴드
- Produces: CSS 변수 `--space-navy` `--panel-navy` `--rocket-orange` `--saturn-gold` `--teal` `--coral` `--purple` `--cream` `--on-accent` `--ring-sand`, 폰트 변수 `--font-baloo` `--font-mono` `--font-pretendard`, 유틸 클래스 `.sr-only`

- [ ] **Step 1: globals.css 전면 작성**

```css
* { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --space-navy: #0B1026;
  --panel-navy: #1A2340;
  --rocket-orange: #FF9F43;
  --saturn-gold: #FFB84D;
  --teal: #4DD8C0;
  --coral: #FF6B6B;
  --purple: #A29BFE;
  --cream: #FDF6E3;
  --on-accent: #0B1026;
  --ring-sand: #F2D09A;
}

html { scroll-behavior: auto; }
html, body { overflow-x: clip; }

body {
  background: var(--space-navy);
  color: var(--cream);
  font-family: var(--font-pretendard), 'Apple SD Gothic Neo', sans-serif;
  line-height: 1.6;
}

h1, h2, h3 { font-family: var(--font-baloo), var(--font-pretendard), sans-serif; line-height: 1.15; }

a { color: inherit; }

:focus-visible { outline: 2px solid var(--cream); outline-offset: 2px; }

.sr-only {
  position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
  overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0;
}
```

- [ ] **Step 2: layout.tsx에 폰트 연결**

```tsx
import type { Metadata } from 'next'
import { Baloo_2, JetBrains_Mono } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'

const baloo = Baloo_2({ subsets: ['latin'], weight: ['600', '800'], variable: '--font-baloo' })
const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['500', '700'], variable: '--font-mono' })
const pretendard = localFont({
  src: '../node_modules/pretendard/dist/web/variable/woff2/PretendardVariable.woff2',
  variable: '--font-pretendard',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://junu1229.github.io'),
  title: 'Junwoo Kim — Rust & On-chain Engineer',
  description:
    'Rust engineer specializing in on-chain protocols and trading infrastructure. Co-founder of Saturn Protocol; previously solo backend engineer on a live Aptos perp DEX.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${baloo.variable} ${mono.variable} ${pretendard.variable}`}>
      <body>{children}</body>
    </html>
  )
}
```

- [ ] **Step 3: 검증**

Run: `npm run typecheck && npm run build && npm run test:e2e`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add app/ && git commit -m "feat: 디자인 토큰·폰트(Baloo 2, JetBrains Mono, Pretendard) 적용"
```

---

### Task 5: i18n 파운데이션 (부록 A 콘텐츠 계약 구현)

**Files:**
- Create: `lib/i18n/en.ts`, `lib/i18n/ko.ts`, `lib/i18n/LanguageProvider.tsx`, `lib/content.ts`

**Interfaces:**
- Consumes: 없음 (독립)
- Produces:
  - `en: Dictionary`, `ko: Dictionary`, `type Dictionary`, `type Locale = 'en' | 'ko'`
  - `LanguageProvider({ children })` — `"use client"`. 초기 locale `'en'`, effect에서 `localStorage.getItem('locale')` 복원 + `document.documentElement.lang` 갱신
  - `useLocale(): { locale: Locale; setLocale: (l: Locale) => void }`
  - `useT(): Dictionary`
  - `lib/content.ts`: `LINKS`(github/linkedin/email/resume href), `SKILL_GROUPS`

- [ ] **Step 1: en.ts 작성 (부록 A 원문 그대로)**

```ts
export type Locale = 'en' | 'ko'

export const en = {
  meta: {
    skipLink: 'Skip to content',
    languageToggle: 'Switch language',
  },
  hero: {
    title: 'JUNWOO KIM',
    subtitle: 'A career, in a nutshell',
    tagline: 'Rust · on-chain protocols · trading infrastructure',
    cta: 'SCROLL TO LAUNCH',
  },
  launch: {
    label: 'PRE-FLIGHT CHECK',
    title: 'Fueling up: Electronics & Control Engineering',
    body: 'Gyeonggi University of Science and Technology (2017–2023). Low-level programming, control systems, and optimization — the foundation for everything that followed.',
    countdown: '3 · 2 · 1 · LIFTOFF',
  },
  devrel: {
    label: 'CHAPTER 01 — FIRST ORBIT',
    period: '2023.10 – 2023.12',
    title: 'Developer Relations · Kana Labs',
    body: 'Wrote technical docs and SDK samples that cut onboarding time for external developers, and supported partners through SDK integrations.',
  },
  frontend: {
    label: 'CHAPTER 02 — TRADING UI',
    period: '2024.01 – 2024.06',
    title: 'Frontend Developer · Kana Labs',
    body: 'Built leaderboards, live trading UIs, and custom charting across options, spot, and futures. Integrated a multi-chain Web3 stack (Arbitrum · BSC · Aptos) and led a codebase refactor.',
  },
  backend: {
    label: 'CHAPTER 03 — THE GIANT',
    period: '2024.07 – 2026.03',
    title: 'Full-stack Developer — solo backend ownership · Kana Labs',
    pipeline: {
      title: 'The pipeline',
      body: "Owned Kana's Aptos perp DEX data pipeline end to end — on-chain indexer → ETL → read API — live in production. Rust, PostgreSQL, WebSockets, RabbitMQ.",
      stat: '2,000+ events/sec',
      statSub: '~200GB over 3 months',
    },
    bots: {
      title: 'The trading bots',
      body: 'Deployed a production market-making bot (Rust) that kept liquidity within <0.05% of mark price (excluding ATR), and a cross-exchange arbitrage bot (Rust/Python) that turned the trading operation net-positive.',
    },
    scale: {
      title: 'Scale',
      body: 'Supported 20K+ participants and distributed a total of 20K APT through automated reward systems across partners (T Wallet · Factblock · AhnLab). Shipped a mobile-optimized trading frontend that lifted platform adoption by 30%.',
    },
  },
  saturn: {
    label: 'CHAPTER 04 — DESTINATION',
    period: '2026.03 – present',
    transit: 'Then, a new mission.',
    title: 'Co-founder & Engineer · Saturn Protocol',
    body: 'A non-custodial covered-call vault on Solana: deposit SOL, earn yield from weekly option premiums — no options expertise required.',
    diagram: ['Deposit SOL', 'Vault writes weekly calls', 'Dutch auction sells options', 'Premiums flow back as yield'],
    moons:
      'Three Anchor programs — vault · options-token · Dutch auction — wired with CPI, fed by Pyth prices and Helius webhooks. Indexer + read API on Hono/PostgreSQL; dApp on Next.js + Solana Wallet Adapter.',
    status: 'Live on Solana devnet · Submitted to Colosseum 2026 · Mainnet pre-flight (audit · KMS · production RPC)',
  },
  landing: {
    label: 'MISSION CONTROL',
    title: 'Landed. Say hello.',
    resumeCta: 'Download resume (PDF)',
  },
}

export type Dictionary = typeof en
```

- [ ] **Step 2: ko.ts 작성 (부록 A 원문 그대로 — `Dictionary` 타입이 키 누락을 컴파일 에러로 잡는다)**

```ts
import type { Dictionary } from './en'

export const ko: Dictionary = {
  meta: {
    skipLink: '본문으로 건너뛰기',
    languageToggle: '언어 전환',
  },
  hero: {
    title: 'JUNWOO KIM',
    subtitle: '한눈에 보는 커리어 여행',
    tagline: '러스트 · 온체인 프로토콜 · 트레이딩 인프라',
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
```

- [ ] **Step 3: LanguageProvider.tsx 작성**

```tsx
'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { en, type Dictionary, type Locale } from './en'
import { ko } from './ko'

const LanguageContext = createContext<{ locale: Locale; setLocale: (l: Locale) => void } | null>(null)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en')

  useEffect(() => {
    const stored = localStorage.getItem('locale')
    const next: Locale = stored === 'ko' ? 'ko' : 'en'
    setLocaleState(next)
    document.documentElement.lang = next
  }, [])

  const setLocale = (l: Locale) => {
    setLocaleState(l)
    localStorage.setItem('locale', l)
    document.documentElement.lang = l
  }

  return <LanguageContext.Provider value={{ locale, setLocale }}>{children}</LanguageContext.Provider>
}

export function useLocale() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLocale must be used within LanguageProvider')
  return ctx
}

export function useT(): Dictionary {
  return useLocale().locale === 'ko' ? ko : en
}
```

- [ ] **Step 4: lib/content.ts 작성**

```ts
export const LINKS = {
  github: 'https://github.com/junu1229',
  linkedin: 'https://www.linkedin.com/in/junwoooooo-kim/',
  email: 'mailto:junu1229@gmail.com',
  resume: '/Junwoo_Kim_Resume.pdf',
} as const

export const SKILL_GROUPS = [
  { name: 'Languages', items: ['Rust', 'Python', 'TypeScript'] },
  { name: 'Blockchain', items: ['Solana', 'Aptos', 'Anchor'] },
  { name: 'Backend & Infra', items: ['Node.js', 'PostgreSQL', 'Redis', 'RabbitMQ', 'Docker'] },
  { name: 'Frontend', items: ['Next.js', 'React', 'TradingView', 'Solana Wallet Adapter'] },
  {
    name: 'Trading Systems',
    items: ['market-making bots', 'cross-exchange arbitrage', 'options vaults', 'perps flows', 'on-chain indexers'],
  },
] as const
```

- [ ] **Step 5: 검증 (타입 패리티는 tsc가 강제)**

Run: `npm run typecheck && npm run lint`
Expected: PASS. (`ko`에서 키 하나를 지워보면 컴파일 에러가 나는지 눈으로 1회 확인 후 원복)

- [ ] **Step 6: Commit**

```bash
git add lib/ && git commit -m "feat: i18n 사전(부록 A)·LanguageProvider·공용 콘텐츠 상수 추가"
```

---

### Task 6: 모션 인프라 + 장면 셸 (7개 스텁)

**Files:**
- Create: `lib/scroll/gsap.ts`, `lib/scroll/MotionProvider.tsx`, `lib/scroll/SmoothScroll.tsx`, `lib/scroll/useSceneTimeline.ts`, `components/space/Starfield.tsx`, `components/PortfolioExperience.tsx`, `components/LanguageToggle.tsx`, `components/scenes/Hero.tsx`, `components/scenes/Launch.tsx`, `components/scenes/PlanetDevrel.tsx`, `components/scenes/PlanetFrontend.tsx`, `components/scenes/PlanetBackend.tsx`, `components/scenes/SaturnArrival.tsx`, `components/scenes/Landing.tsx`
- Modify: `app/page.tsx`, `app/globals.css`, `tests/portfolio.spec.ts`

**Interfaces:**
- Consumes: Task 5의 `LanguageProvider`, `useT`, `useLocale`
- Produces:
  - `lib/scroll/gsap.ts`: `gsap`, `ScrollTrigger`, `MotionPathPlugin`, `useGSAP` re-export (플러그인 등록 완료 상태)
  - `useMotionMode(): 'full' | 'touch' | 'reduced'` (reduced 최우선, 라이브 갱신)
  - `SmoothScroll({ children })` — mode `'full'`일 때만 Lenis 초기화 (스펙 §6 계약 그대로)
  - `useSceneTimeline({ scope, end, build, deps? })` — mode `'reduced'`가 아니면 pin/scrub 타임라인 생성, `dependencies: [mode, locale, ...deps]`, `revertOnUpdate: true`
  - `Starfield({ count?, seed? })` — 시드 PRNG 결정적 배치(hydration 안전), `Math.min(count, 80)` 강제, `aria-hidden`. **페이지 전체에 단 1개**를 `PortfolioExperience`의 고정 배경 레이어(`.starfield-fixed`)로 렌더 — 별 노드 총량 80개 상한을 전역에서 보장. 장면들은 자체 별밭을 만들지 않는다
  - 각 장면 컴포넌트: `<section ref data-scene="N" className="scene">` 루트. 장면당 1파일
  - CSS 클래스 `.scene` (min-height 100svh), `.scene-inner`, `.starfield-fixed`

- [ ] **Step 1: 실패하는 e2e 테스트 추가**

`tests/portfolio.spec.ts`에 추가:
```ts
test('7개 장면이 렌더된다', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('[data-scene]')).toHaveCount(7)
  for (let i = 0; i <= 6; i++) {
    await expect(page.locator(`[data-scene="${i}"]`)).toBeAttached()
  }
})

test.describe('데스크톱 모션', () => {
  test.skip(({ isMobile }) => isMobile, 'chromium 전용')
  test('pin-spacer가 생성된다', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('.pin-spacer').first()).toBeAttached()
  })
})

test.describe('reduced motion', () => {
  test.use({ contextOptions: { reducedMotion: 'reduce' } })
  test('pin과 Lenis 없이 전체 콘텐츠가 노출된다', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('.pin-spacer')).toHaveCount(0)
    await expect(page.locator('html.lenis')).toHaveCount(0)
    await expect(page.locator('[data-scene="6"]')).toBeAttached()
  })
})
```

- [ ] **Step 2: 테스트 실패 확인**

Run: `npm run build && npm run test:e2e`
Expected: FAIL (`[data-scene]` count 0)

- [ ] **Step 3: lib/scroll/gsap.ts**

```ts
'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, useGSAP)

export { gsap, ScrollTrigger, MotionPathPlugin, useGSAP }
```

- [ ] **Step 4: lib/scroll/MotionProvider.tsx**

```tsx
'use client'

import { createContext, useContext, useEffect, useState } from 'react'

export type MotionMode = 'full' | 'touch' | 'reduced'

const REDUCED_Q = '(prefers-reduced-motion: reduce)'
const TOUCH_Q = '(pointer: coarse), (max-width: 767px)'

function computeMode(): MotionMode {
  if (window.matchMedia(REDUCED_Q).matches) return 'reduced'
  if (window.matchMedia(TOUCH_Q).matches) return 'touch'
  return 'full'
}

const MotionContext = createContext<MotionMode>('full')

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<MotionMode>(() =>
    typeof window === 'undefined' ? 'full' : computeMode(),
  )

  useEffect(() => {
    const reduced = window.matchMedia(REDUCED_Q)
    const touch = window.matchMedia(TOUCH_Q)
    const update = () => setMode(computeMode())
    update()
    reduced.addEventListener('change', update)
    touch.addEventListener('change', update)
    return () => {
      reduced.removeEventListener('change', update)
      touch.removeEventListener('change', update)
    }
  }, [])

  return <MotionContext.Provider value={mode}>{children}</MotionContext.Provider>
}

export function useMotionMode() {
  return useContext(MotionContext)
}
```

- [ ] **Step 5: lib/scroll/SmoothScroll.tsx (스펙 §6 계약)**

```tsx
'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from './gsap'
import { useMotionMode } from './MotionProvider'
import { useLocale } from '@/lib/i18n/LanguageProvider'

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const mode = useMotionMode()
  const { locale } = useLocale()

  useEffect(() => {
    if (mode !== 'full') return
    const lenis = new Lenis({ autoRaf: false, syncTouch: false })
    const tick = (time: number) => lenis.raf(time * 1000)

    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
    }
  }, [mode])

  useEffect(() => {
    document.fonts.ready.then(() => ScrollTrigger.refresh())
  }, [locale])

  useEffect(() => {
    const onOrientation = () => ScrollTrigger.refresh()
    window.addEventListener('orientationchange', onOrientation)
    return () => window.removeEventListener('orientationchange', onOrientation)
  }, [])

  return <>{children}</>
}
```

- [ ] **Step 6: lib/scroll/useSceneTimeline.ts**

```ts
'use client'

import type { RefObject } from 'react'
import { gsap, useGSAP } from './gsap'
import { useMotionMode } from './MotionProvider'
import { useLocale } from '@/lib/i18n/LanguageProvider'

export function useSceneTimeline({
  scope,
  end,
  build,
  deps = [],
}: {
  scope: RefObject<HTMLElement | null>
  end: string
  build: (tl: gsap.core.Timeline) => void
  deps?: unknown[]
}) {
  const mode = useMotionMode()
  const { locale } = useLocale()

  useGSAP(
    () => {
      if (mode === 'reduced' || !scope.current) return
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scope.current,
          start: 'top top',
          end,
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      })
      build(tl)
    },
    { scope, dependencies: [mode, locale, ...deps], revertOnUpdate: true },
  )
}
```

- [ ] **Step 7: 장면 스텁 7개 작성 (패턴 동일 — Hero 예시, 나머지 6개는 이름·data-scene·라벨만 교체)**

`components/scenes/Hero.tsx`:
```tsx
'use client'

import { useRef } from 'react'
import { useT } from '@/lib/i18n/LanguageProvider'
import { useSceneTimeline } from '@/lib/scroll/useSceneTimeline'

export function Hero() {
  const t = useT()
  const ref = useRef<HTMLElement>(null)
  useSceneTimeline({ scope: ref, end: '+=200vh', build: () => {} })

  return (
    <section ref={ref} data-scene="0" className="scene">
      <div className="scene-inner">
        <h1>{t.hero.title}</h1>
      </div>
    </section>
  )
}
```

스텁 매핑 (컴포넌트명 / data-scene / end / 표시 텍스트):
- `Launch` / `"1"` / `'+=200vh'` / `t.launch.label`
- `PlanetDevrel` / `"2"` / `'+=200vh'` / `t.devrel.label`
- `PlanetFrontend` / `"3"` / `'+=200vh'` / `t.frontend.label`
- `PlanetBackend` / `"4"` / `'+=300vh'` / `t.backend.label`
- `SaturnArrival` / `"5"` / `'+=250vh'` / `t.saturn.label`
- `Landing` / `"6"` / pin 없음 — `useSceneTimeline` 호출하지 않고 `<section data-scene="6" className="scene">`만. 표시 텍스트 `t.landing.label`

- [ ] **Step 8: Starfield + LanguageToggle + PortfolioExperience + page 연결**

`components/space/Starfield.tsx`:
```tsx
function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function Starfield({ count = 80, seed = 1 }: { count?: number; seed?: number }) {
  const rand = mulberry32(seed)
  const stars = Array.from({ length: Math.min(count, 80) }, (_, i) => ({
    id: i,
    x: rand() * 100,
    y: rand() * 100,
    r: 0.5 + rand() * 1.2,
    o: 0.3 + rand() * 0.6,
  }))
  return (
    <svg className="starfield" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      {stars.map((s) => (
        <circle key={s.id} cx={s.x} cy={s.y} r={s.r * 0.15} fill="#FDF6E3" opacity={s.o} />
      ))}
    </svg>
  )
}
```

`components/LanguageToggle.tsx`:
```tsx
'use client'

import { useLocale, useT } from '@/lib/i18n/LanguageProvider'

export function LanguageToggle() {
  const { locale, setLocale } = useLocale()
  const t = useT()
  return (
    <button
      type="button"
      className="lang-toggle"
      aria-label={t.meta.languageToggle}
      onClick={() => setLocale(locale === 'en' ? 'ko' : 'en')}
    >
      {locale === 'en' ? 'EN | KR' : 'KR | EN'}
    </button>
  )
}
```

`components/PortfolioExperience.tsx`:
```tsx
'use client'

import { LanguageProvider, useT } from '@/lib/i18n/LanguageProvider'
import { MotionProvider } from '@/lib/scroll/MotionProvider'
import { SmoothScroll } from '@/lib/scroll/SmoothScroll'
import { LanguageToggle } from './LanguageToggle'
import { Starfield } from './space/Starfield'
import { Hero } from './scenes/Hero'
import { Launch } from './scenes/Launch'
import { PlanetDevrel } from './scenes/PlanetDevrel'
import { PlanetFrontend } from './scenes/PlanetFrontend'
import { PlanetBackend } from './scenes/PlanetBackend'
import { SaturnArrival } from './scenes/SaturnArrival'
import { Landing } from './scenes/Landing'

function SkipLink() {
  const t = useT()
  return (
    <a href="#content" className="skip-link">
      {t.meta.skipLink}
    </a>
  )
}

export function PortfolioExperience() {
  return (
    <LanguageProvider>
      <MotionProvider>
        <SmoothScroll>
          <div className="starfield-fixed">
            <Starfield count={80} seed={7} />
          </div>
          <SkipLink />
          <LanguageToggle />
          <main id="content">
            <Hero />
            <Launch />
            <PlanetDevrel />
            <PlanetFrontend />
            <PlanetBackend />
            <SaturnArrival />
            <Landing />
          </main>
        </SmoothScroll>
      </MotionProvider>
    </LanguageProvider>
  )
}
```

`app/page.tsx`:
```tsx
import { PortfolioExperience } from '@/components/PortfolioExperience'

export default function Home() {
  return <PortfolioExperience />
}
```

`app/globals.css`에 추가:
```css
.starfield-fixed { position: fixed; inset: 0; z-index: 0; pointer-events: none; }
.starfield { width: 100%; height: 100%; }
main { position: relative; z-index: 1; }
.scene { position: relative; min-height: 100svh; overflow: hidden; }
.scene-inner {
  position: relative; max-width: 72rem; margin: 0 auto;
  padding: 4rem 1.5rem; min-height: 100svh;
  display: flex; flex-direction: column; justify-content: center;
}
.lang-toggle {
  position: fixed; top: 1rem; right: 1rem; z-index: 50;
  background: var(--panel-navy); color: var(--cream);
  border: 1px solid var(--purple); border-radius: 999px;
  padding: 0.4rem 1rem; font-family: var(--font-mono), monospace;
  font-size: 0.8rem; cursor: pointer;
}
.skip-link {
  position: absolute; top: -100%; left: 1rem; z-index: 60;
  background: var(--cream); color: var(--on-accent);
  padding: 0.5rem 1rem; border-radius: 0 0 8px 8px;
}
.skip-link:focus-visible { top: 0; }
```

- [ ] **Step 9: 테스트 통과 확인**

Run: `npm run typecheck && npm run lint && npm run build && npm run test:e2e`
Expected: PASS 전체 (7 장면·pin-spacer·reduced 테스트 포함)

- [ ] **Step 10: Commit**

```bash
git add -A && git commit -m "feat: 모션 인프라(GSAP·Lenis·MotionMode)와 7개 장면 셸 구축"
```

---

### Task 7: Scene 0 — Hero (마스코트·EN/KR 전환)

**Files:**
- Create: `components/space/Astronaut.tsx`
- Modify: `components/scenes/Hero.tsx`, `app/globals.css`, `tests/portfolio.spec.ts`

**Interfaces:**
- Consumes: `useSceneTimeline`, `useT`, `useLocale` (별밭은 Task 6의 전역 `.starfield-fixed` 사용 — 장면 자체 별밭 금지)
- Produces:
  - `Astronaut({ pose, className? })` — `pose: 'float' | 'thumbs-up' | 'pilot' | 'observe' | 'flag'` (이후 모든 장면이 사용)

- [ ] **Step 1: 실패하는 e2e 테스트 추가**

```ts
test('Hero 카피와 EN/KR 토글이 동작한다', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'JUNWOO KIM' })).toBeVisible()
  await expect(page.getByText('A career, in a nutshell')).toBeVisible()

  await page.getByRole('button', { name: 'Switch language' }).click()
  await expect(page.getByText('한눈에 보는 커리어 여행')).toBeVisible()
  await expect(page.locator('html')).toHaveAttribute('lang', 'ko')

  await page.reload()
  await expect(page.getByText('한눈에 보는 커리어 여행')).toBeVisible()
  await expect(page.locator('html')).toHaveAttribute('lang', 'ko')
})
```

- [ ] **Step 2: 실패 확인** — Run: `npm run build && npm run test:e2e` / Expected: FAIL (subtitle 없음)

- [ ] **Step 3: Astronaut.tsx (플랫 SVG, pose별 변형)**

```tsx
export type AstronautPose = 'float' | 'thumbs-up' | 'pilot' | 'observe' | 'flag'

const POSE_TRANSFORM: Record<AstronautPose, string> = {
  float: 'rotate(-8 50 60)',
  'thumbs-up': 'rotate(0 50 60)',
  pilot: 'rotate(4 50 60)',
  observe: 'rotate(-4 50 60)',
  flag: 'rotate(0 50 60)',
}

export function Astronaut({ pose, className }: { pose: AstronautPose; className?: string }) {
  return (
    <svg viewBox="0 0 100 130" className={className} aria-hidden="true">
      <g transform={POSE_TRANSFORM[pose]}>
        {/* 몸통 */}
        <rect x="32" y="52" width="36" height="44" rx="14" fill="#FDF6E3" />
        <rect x="40" y="60" width="20" height="14" rx="4" fill="#FF9F43" />
        {/* 팔: thumbs-up이면 한쪽 팔 위로 */}
        {pose === 'thumbs-up' ? (
          <rect x="66" y="38" width="9" height="22" rx="4.5" fill="#FDF6E3" transform="rotate(-30 70 49)" />
        ) : (
          <circle cx="64" cy="74" r="7" fill="#FDF6E3" />
        )}
        <circle cx="36" cy="74" r="7" fill="#FDF6E3" />
        {/* 다리 */}
        <rect x="38" y="92" width="9" height="16" rx="4.5" fill="#FDF6E3" />
        <rect x="53" y="92" width="9" height="16" rx="4.5" fill="#FDF6E3" />
        {/* 헬멧 */}
        <circle cx="50" cy="34" r="24" fill="#FDF6E3" />
        <circle cx="50" cy="36" r="17" fill="#123C4F" />
        <circle cx="44" cy="31" r="5" fill="#4DD8C0" opacity="0.9" />
        {/* flag 포즈: 깃발 */}
        {pose === 'flag' && (
          <g>
            <rect x="78" y="20" width="3" height="76" fill="#FDF6E3" />
            <path d="M 81 22 L 100 30 L 81 38 Z" fill="#FF9F43" />
          </g>
        )}
      </g>
    </svg>
  )
}
```

- [ ] **Step 4: Hero.tsx 완성**

```tsx
'use client'

import { useRef } from 'react'
import { useT } from '@/lib/i18n/LanguageProvider'
import { useSceneTimeline } from '@/lib/scroll/useSceneTimeline'
import { Astronaut } from '@/components/space/Astronaut'

export function Hero() {
  const t = useT()
  const ref = useRef<HTMLElement>(null)

  useSceneTimeline({
    scope: ref,
    end: '+=200vh',
    build: (tl) => {
      // 전역 별밭을 가볍게 파랄랙스 (0→1 전환: 별밭 하강 연출)
      // 주의: useGSAP scope 밖 요소이므로 문자열 셀렉터 대신 직접 조회한다
      tl.to(document.querySelector('.starfield-fixed'), { yPercent: -8, ease: 'none' }, 0)
        .to('.hero-astronaut', { y: -60, rotate: 6, ease: 'none' }, 0)
        .to('.hero-copy', { opacity: 0, y: -80, ease: 'none' }, 0.4)
    },
  })

  return (
    <section ref={ref} data-scene="0" className="scene">
      <div className="scene-inner hero-layout">
        <div className="hero-copy">
          <h1 className="hero-title">{t.hero.title}</h1>
          <p className="hero-subtitle">{t.hero.subtitle}</p>
          <p className="hero-tagline">{t.hero.tagline}</p>
          <p className="hero-cta">{t.hero.cta} ↓</p>
        </div>
        <Astronaut pose="float" className="hero-astronaut" />
      </div>
    </section>
  )
}
```

`app/globals.css`에 추가:
```css
.hero-layout { align-items: center; text-align: center; gap: 1rem; }
.hero-title { font-size: clamp(2.5rem, 8vw, 5rem); font-weight: 800; }
.hero-subtitle { font-size: clamp(1.1rem, 3vw, 1.6rem); color: var(--saturn-gold); }
.hero-tagline { color: #8b93b8; }
.hero-cta {
  margin-top: 1.5rem; display: inline-block;
  background: var(--rocket-orange); color: var(--on-accent);
  font-family: var(--font-mono), monospace; font-weight: 700; font-size: 0.85rem;
  padding: 0.5rem 1.2rem; border-radius: 999px;
}
.hero-astronaut { width: clamp(90px, 14vw, 150px); margin-top: 1rem; }
```

- [ ] **Step 5: 통과 확인** — Run: `npm run build && npm run test:e2e` / Expected: PASS

- [ ] **Step 6: 육안 검수** — Run: `npm run dev` 후 브라우저에서 Hero 확인 (별밭 파랄랙스, 마스코트, 토글)

- [ ] **Step 7: Commit**

```bash
git add -A && git commit -m "feat: Scene 0 Hero — 마스코트·EN/KR 전환 완성"
```

---

### Task 8: Scene 1 — Launch (교육 = 발사 준비)

**Files:**
- Create: `components/space/Rocket.tsx`, `components/space/ChapterLabel.tsx`
- Modify: `components/scenes/Launch.tsx`, `app/globals.css`, `tests/portfolio.spec.ts`

**Interfaces:**
- Consumes: `useSceneTimeline`, `useT`, `Astronaut`
- Produces:
  - `Rocket({ className? })` — 플랫 로켓 SVG (이후 장면들이 재사용)
  - `ChapterLabel({ accent, children })` — `accent`: CSS 색 문자열. 챕터 라벨 공통 스타일

- [ ] **Step 1: 실패하는 e2e 테스트 추가**

```ts
test('Launch 장면 카피가 노출된다', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText('Fueling up: Electronics & Control Engineering')).toBeAttached()
  await expect(page.getByText('PRE-FLIGHT CHECK')).toBeAttached()
})
```

- [ ] **Step 2: 실패 확인** — Run: `npm run build && npm run test:e2e` / Expected: FAIL

- [ ] **Step 3: Rocket.tsx / ChapterLabel.tsx**

```tsx
export function Rocket({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 120" className={className} aria-hidden="true">
      <path d="M 30 4 C 42 20 44 40 44 58 L 16 58 C 16 40 18 20 30 4 Z" fill="#FDF6E3" />
      <path d="M 30 4 C 36 20 38 40 38 58 L 30 58 Z" fill="#e8dcc4" />
      <circle cx="30" cy="34" r="8" fill="#123C4F" stroke="#4DD8C0" strokeWidth="2.5" />
      <path d="M 16 58 L 4 84 L 16 76 Z" fill="#FF6B6B" />
      <path d="M 44 58 L 56 84 L 44 76 Z" fill="#FF6B6B" />
      <rect x="16" y="58" width="28" height="14" rx="4" fill="#FF9F43" />
      <path className="rocket-flame" d="M 22 72 L 30 96 L 38 72 Z" fill="#FF9F43" />
    </svg>
  )
}
```

```tsx
export function ChapterLabel({ accent, children }: { accent: string; children: React.ReactNode }) {
  return (
    <p className="chapter-label" style={{ color: accent }}>
      {children}
    </p>
  )
}
```

`app/globals.css`에 추가:
```css
.chapter-label {
  font-family: var(--font-mono), monospace;
  font-size: 0.75rem; font-weight: 700; letter-spacing: 0.15em;
}
.scene-period { font-family: var(--font-mono), monospace; font-size: 0.8rem; color: #8b93b8; }
```

- [ ] **Step 4: Launch.tsx 완성**

```tsx
'use client'

import { useRef } from 'react'
import { useT } from '@/lib/i18n/LanguageProvider'
import { useSceneTimeline } from '@/lib/scroll/useSceneTimeline'
import { Astronaut } from '@/components/space/Astronaut'
import { Rocket } from '@/components/space/Rocket'
import { ChapterLabel } from '@/components/space/ChapterLabel'

const CHECKS = ['low-level programming', 'control systems', 'optimization']

export function Launch() {
  const t = useT()
  const ref = useRef<HTMLElement>(null)

  useSceneTimeline({
    scope: ref,
    end: '+=200vh',
    build: (tl) => {
      tl.from('.launch-check', { opacity: 0, x: -20, stagger: 0.15, ease: 'none' }, 0)
        .from('.launch-countdown', { opacity: 0, ease: 'none' }, 0.45)
        .from('.launch-rocket', { y: 0, ease: 'none' }, 0.55)
        .to('.launch-rocket', { y: '-70vh', ease: 'power2.in' }, 0.6)
        .to('.launch-astronaut', { opacity: 0, ease: 'none' }, 0.55)
    },
  })

  return (
    <section ref={ref} data-scene="1" className="scene">
      <div className="scene-inner launch-layout">
        <div>
          <ChapterLabel accent="var(--rocket-orange)">{t.launch.label}</ChapterLabel>
          <h2>{t.launch.title}</h2>
          <p className="scene-body">{t.launch.body}</p>
          <ul className="launch-checklist" aria-hidden="true">
            {CHECKS.map((c) => (
              <li key={c} className="launch-check">✓ {c}</li>
            ))}
          </ul>
          <p className="launch-countdown">{t.launch.countdown}</p>
        </div>
        <div className="launch-pad">
          <Rocket className="launch-rocket" />
          <Astronaut pose="thumbs-up" className="launch-astronaut" />
          <div className="launch-ground" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}
```

`app/globals.css`에 추가:
```css
.scene-body { max-width: 34rem; margin-top: 0.75rem; color: #cfd6e4; }
.launch-layout { flex-direction: row; align-items: center; gap: 3rem; flex-wrap: wrap; }
.launch-checklist { list-style: none; margin-top: 1rem; font-family: var(--font-mono), monospace; font-size: 0.85rem; color: var(--teal); }
.launch-countdown { margin-top: 1rem; font-family: var(--font-mono), monospace; font-weight: 700; color: var(--rocket-orange); }
.launch-pad { position: relative; width: clamp(120px, 20vw, 200px); }
.launch-rocket { width: 100%; }
.launch-astronaut { position: absolute; bottom: 0; left: -40%; width: 45%; }
.launch-ground { height: 4px; background: var(--panel-navy); border-radius: 2px; margin-top: 4px; }
```

- [ ] **Step 5: 통과 확인** — Run: `npm run build && npm run test:e2e` / Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: Scene 1 Launch — 발사 준비·카운트다운·리프트오프"
```

---

### Task 9: Scene 2 — PLANET 01 Dev-rel

**Files:**
- Create: `components/space/Planet.tsx`
- Modify: `components/scenes/PlanetDevrel.tsx`, `app/globals.css`, `tests/portfolio.spec.ts`

**Interfaces:**
- Consumes: `useSceneTimeline`, `useT`, `Rocket`, `ChapterLabel`
- Produces: `Planet({ size, color, shadeColor, className?, children? })` — 플랫 2톤 행성 SVG. `size`: px 지름, `children`: 표면 디테일용 SVG 노드 (viewBox 100×100, 행성 중심 50,50 반지름 44)

- [ ] **Step 1: 실패하는 e2e 테스트 추가**

```ts
test('Dev-rel 장면 카피가 노출된다', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText('Developer Relations · Kana Labs')).toBeAttached()
  await expect(page.getByText('CHAPTER 01 — FIRST ORBIT')).toBeAttached()
})
```

- [ ] **Step 2: 실패 확인** — Run: `npm run build && npm run test:e2e` / Expected: FAIL

- [ ] **Step 3: Planet.tsx**

```tsx
export function Planet({
  size,
  color,
  shadeColor,
  className,
  children,
}: {
  size: number
  color: string
  shadeColor: string
  className?: string
  children?: React.ReactNode
}) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} aria-hidden="true">
      <circle cx="50" cy="50" r="44" fill={color} />
      {/* 플랫 2톤 셰이딩: 밑면 진한 톤 */}
      <path d="M 6 50 A 44 44 0 0 0 94 50 A 60 44 0 0 1 6 50 Z" fill={shadeColor} />
      {children}
    </svg>
  )
}
```

- [ ] **Step 4: PlanetDevrel.tsx 완성 (로켓 진입 → 궤도 문서 아이콘)**

```tsx
'use client'

import { useRef } from 'react'
import { useT } from '@/lib/i18n/LanguageProvider'
import { useSceneTimeline } from '@/lib/scroll/useSceneTimeline'
import { Planet } from '@/components/space/Planet'
import { Rocket } from '@/components/space/Rocket'
import { ChapterLabel } from '@/components/space/ChapterLabel'

export function PlanetDevrel() {
  const t = useT()
  const ref = useRef<HTMLElement>(null)

  useSceneTimeline({
    scope: ref,
    end: '+=200vh',
    build: (tl) => {
      tl.from('.devrel-rocket', {
        motionPath: {
          path: [
            { x: -300, y: 200 },
            { x: -120, y: 60 },
            { x: 0, y: 0 },
          ],
          curviness: 1.2,
        },
        rotate: -30,
        ease: 'none',
        duration: 0.4,
      })
        .from('.devrel-copy', { opacity: 0, y: 40, ease: 'none' }, 0.35)
        .from('.devrel-doc', { opacity: 0, scale: 0, stagger: 0.1, ease: 'none' }, 0.45)
        .to('.devrel-orbit', { rotate: 40, transformOrigin: '50% 50%', ease: 'none' }, 0.5)
    },
  })

  return (
    <section ref={ref} data-scene="2" className="scene">
      <div className="scene-inner planet-layout">
        <div className="planet-visual">
          {/* 2→5 전환 규칙: 점선 궤도를 따라 로켓 이동 — 궤도 시각화 */}
          <svg viewBox="0 0 200 120" className="transit-path" aria-hidden="true">
            <path d="M 4 116 C 60 96 120 60 196 12" stroke="#3d4670" strokeWidth="2" strokeDasharray="5 5" fill="none" />
          </svg>
          <Planet size={220} color="var(--coral)" shadeColor="#d94f4f" className="devrel-planet">
            <g className="devrel-orbit">
              <g className="devrel-doc" transform="translate(50 -6)">
                <rect x="-6" y="-8" width="12" height="16" rx="2" fill="#FDF6E3" />
                <rect x="-3" y="-4" width="6" height="1.6" fill="#FF6B6B" />
                <rect x="-3" y="-1" width="6" height="1.6" fill="#FF6B6B" />
              </g>
              <g className="devrel-doc" transform="translate(104 50)">
                <rect x="-6" y="-8" width="12" height="16" rx="2" fill="#FDF6E3" />
                <rect x="-3" y="-4" width="6" height="1.6" fill="#A29BFE" />
              </g>
              <g className="devrel-doc" transform="translate(50 106)">
                <rect x="-6" y="-8" width="12" height="16" rx="2" fill="#FDF6E3" />
                <rect x="-3" y="-4" width="6" height="1.6" fill="#4DD8C0" />
              </g>
            </g>
          </Planet>
          <Rocket className="devrel-rocket planet-rocket" />
        </div>
        <div className="devrel-copy">
          <ChapterLabel accent="var(--coral)">{t.devrel.label}</ChapterLabel>
          <p className="scene-period">{t.devrel.period}</p>
          <h2>{t.devrel.title}</h2>
          <p className="scene-body">{t.devrel.body}</p>
        </div>
      </div>
    </section>
  )
}
```

`app/globals.css`에 추가:
```css
.planet-layout { flex-direction: row; align-items: center; gap: 3rem; flex-wrap: wrap; }
.planet-visual { position: relative; flex-shrink: 0; }
.planet-rocket { position: absolute; top: -10%; right: -18%; width: 56px; }
.transit-path { position: absolute; left: -60%; bottom: -20%; width: 130%; pointer-events: none; }
```

마스코트 포즈 노트 (스펙 §4): Scene 2–4의 "조종·비행" 포즈는 로켓 창(틸 원)에 탑승한
파일럿으로 표현한다 — 행성 장면에서 별도 `Astronaut` 렌더는 하지 않는다.

- [ ] **Step 5: 통과 확인** — Run: `npm run build && npm run test:e2e` / Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: Scene 2 Dev-rel — 코랄 행성·문서 궤도·로켓 진입"
```

---

### Task 10: Scene 3 — PLANET 02 Frontend

**Files:**
- Modify: `components/scenes/PlanetFrontend.tsx`, `tests/portfolio.spec.ts`

**Interfaces:**
- Consumes: `Planet`, `Rocket`, `ChapterLabel`, `useSceneTimeline`, `useT`
- Produces: 없음 (장면 완결)

- [ ] **Step 1: 실패하는 e2e 테스트 추가**

```ts
test('Frontend 장면 카피가 노출된다', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText('Frontend Developer · Kana Labs')).toBeAttached()
  await expect(page.getByText('CHAPTER 02 — TRADING UI')).toBeAttached()
})
```

- [ ] **Step 2: 실패 확인** — Run: `npm run build && npm run test:e2e` / Expected: FAIL

- [ ] **Step 3: PlanetFrontend.tsx 완성**

구조는 `PlanetDevrel`과 동일 패턴. 차이점만:
- `data-scene="3"`, accent `var(--teal)`, planet `color="var(--teal)" shadeColor="#35b8a2"` size 260
- 표면 디테일: 조립되는 트레이딩 UI 패널 3장 + 위성 3개(멀티체인 지갑)
- 타임라인: 로켓 진입(동일 motionPath) → `.fe-panel` stagger 조립(`opacity 0, y 20, scale 0.6`에서 from) → `.fe-satellite` 공전(rotate)

```tsx
'use client'

import { useRef } from 'react'
import { useT } from '@/lib/i18n/LanguageProvider'
import { useSceneTimeline } from '@/lib/scroll/useSceneTimeline'
import { Planet } from '@/components/space/Planet'
import { Rocket } from '@/components/space/Rocket'
import { ChapterLabel } from '@/components/space/ChapterLabel'

const SATELLITES = [
  { label: 'ARB', angle: -30 },
  { label: 'BSC', angle: 90 },
  { label: 'APT', angle: 210 },
]

export function PlanetFrontend() {
  const t = useT()
  const ref = useRef<HTMLElement>(null)

  useSceneTimeline({
    scope: ref,
    end: '+=200vh',
    build: (tl) => {
      tl.from('.fe-rocket', {
        motionPath: { path: [{ x: -300, y: 180 }, { x: -100, y: 40 }, { x: 0, y: 0 }], curviness: 1.2 },
        rotate: -25,
        ease: 'none',
        duration: 0.35,
      })
        .from('.fe-copy', { opacity: 0, y: 40, ease: 'none' }, 0.3)
        .from('.fe-panel', { opacity: 0, y: 20, scale: 0.6, stagger: 0.08, ease: 'none' }, 0.4)
        .from('.fe-satellite', { opacity: 0, scale: 0, stagger: 0.08, ease: 'none' }, 0.6)
    },
  })

  return (
    <section ref={ref} data-scene="3" className="scene">
      <div className="scene-inner planet-layout">
        <div className="fe-copy">
          <ChapterLabel accent="var(--teal)">{t.frontend.label}</ChapterLabel>
          <p className="scene-period">{t.frontend.period}</p>
          <h2>{t.frontend.title}</h2>
          <p className="scene-body">{t.frontend.body}</p>
        </div>
        <div className="planet-visual">
          <Planet size={260} color="var(--teal)" shadeColor="#35b8a2">
            <g className="fe-panel" transform="translate(28 30)">
              <rect width="26" height="18" rx="3" fill="#123C4F" />
              <rect x="3" y="4" width="20" height="2" fill="#4DD8C0" />
              <rect x="3" y="8" width="14" height="2" fill="#FF9F43" />
              <rect x="3" y="12" width="17" height="2" fill="#FF6B6B" />
            </g>
            <g className="fe-panel" transform="translate(56 44)">
              <rect width="20" height="14" rx="3" fill="#123C4F" />
              <path d="M 3 10 L 8 6 L 12 8 L 17 3" stroke="#4DD8C0" strokeWidth="1.6" fill="none" />
            </g>
            <g className="fe-panel" transform="translate(34 56)">
              <rect width="22" height="12" rx="3" fill="#123C4F" />
              <rect x="3" y="3" width="7" height="6" rx="1" fill="#A29BFE" />
              <rect x="12" y="3" width="7" height="6" rx="1" fill="#FF9F43" />
            </g>
            {SATELLITES.map((s) => (
              <g key={s.label} className="fe-satellite" transform={`rotate(${s.angle} 50 50) translate(50 -4)`}>
                <circle r="5" fill="#FDF6E3" />
                <text y="1.5" textAnchor="middle" fontSize="3.4" fontWeight="700" fill="#0B1026">
                  {s.label}
                </text>
              </g>
            ))}
          </Planet>
          <Rocket className="fe-rocket planet-rocket" />
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: 통과 확인** — Run: `npm run build && npm run test:e2e` / Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: Scene 3 Frontend — 틸 행성·UI 조립·멀티체인 위성"
```

---

### Task 11: Scene 4 — PLANET 03 Solo Backend (3비트)

**Files:**
- Create: `components/space/StatChip.tsx`
- Modify: `components/scenes/PlanetBackend.tsx`, `app/globals.css`, `tests/portfolio.spec.ts`

**Interfaces:**
- Consumes: `ChapterLabel`, `useMotionMode`, `useT`/`useLocale`, `gsap`/`useGSAP`/`ScrollTrigger` (`lib/scroll/gsap`)
- Produces: `StatChip({ value, sub, accent, srText? })` — 스탯 칩. `srText` 있으면 `value` 표시부는 `aria-hidden` + `sr-only`로 `srText` 제공

**설계 노트 (스펙 §8):** 이 장면만 `useSceneTimeline`을 쓰지 않는다. DOM은 세 비트를
정적 스택(항상 전부 노출)으로 작성하고, `mode === 'full'`일 때만 effect에서 루트에
`data-animated="true"`를 붙여 CSS가 레이어 배치로 전환 + pin 타임라인을 생성한다.
touch/reduced에서는 각 비트가 `min-height: 100svh`의 일반 흐름 — hydration mismatch 없음.

- [ ] **Step 1: 실패하는 e2e 테스트 추가 (릴리스 기준 지표 3종)**

```ts
test('핵심 지표 3종이 DOM 텍스트로 존재한다', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText('2,000+ events/sec').first()).toBeAttached()
  await expect(page.getByText(/<0\.05% of mark price \(excluding ATR\)/).first()).toBeAttached()
  await expect(page.getByText(/20K\+ participants/).first()).toBeAttached()
  await expect(page.getByText('Full-stack Developer — solo backend ownership · Kana Labs')).toBeAttached()
})
```

- [ ] **Step 2: 실패 확인** — Run: `npm run build && npm run test:e2e` / Expected: FAIL

- [ ] **Step 3: StatChip.tsx**

```tsx
export function StatChip({
  value,
  sub,
  accent,
  srText,
}: {
  value: string
  sub?: string
  accent: string
  srText?: string
}) {
  return (
    <div className="stat-chip" style={{ borderColor: accent }}>
      <span className="stat-value" aria-hidden={srText ? 'true' : undefined}>
        {value}
      </span>
      {srText && <span className="sr-only">{srText}</span>}
      {sub && <span className="stat-sub">{sub}</span>}
    </div>
  )
}
```

`app/globals.css`에 추가:
```css
.stat-chip {
  display: inline-flex; align-items: baseline; gap: 0.5rem;
  background: var(--panel-navy); border: 2px solid; border-radius: 12px;
  padding: 0.6rem 1rem; margin-top: 1rem;
}
.stat-value { font-family: var(--font-mono), monospace; font-size: 1.4rem; font-weight: 700; }
.stat-sub { font-size: 0.75rem; color: #8b93b8; }
```

- [ ] **Step 4: PlanetBackend.tsx 완성**

```tsx
'use client'

import { useEffect, useRef } from 'react'
import { useT, useLocale } from '@/lib/i18n/LanguageProvider'
import { useMotionMode } from '@/lib/scroll/MotionProvider'
import { gsap, useGSAP } from '@/lib/scroll/gsap'
import { ChapterLabel } from '@/components/space/ChapterLabel'
import { StatChip } from '@/components/space/StatChip'

const WALLET_COUNT = 24 // 지갑 glyph — 장면당 40개 상한 이내

export function PlanetBackend() {
  const t = useT()
  const { locale } = useLocale()
  const mode = useMotionMode()
  const ref = useRef<HTMLElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (mode === 'full') ref.current?.setAttribute('data-animated', 'true')
    else ref.current?.removeAttribute('data-animated')
  }, [mode])

  useGSAP(
    () => {
      if (mode !== 'full' || !ref.current) return
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current, start: 'top top', end: '+=300vh',
          scrub: true, pin: true, anticipatePin: 1,
        },
      })
      // Beat 1 (0–33%): 파이프라인 + 카운터 (허용 예외: textContent)
      const counter = { v: 0 }
      tl.from('.be-beat-1', { opacity: 0, ease: 'none', duration: 0.05 }, 0)
        .from('.be-pipe', { scaleX: 0, transformOrigin: 'left', stagger: 0.05, ease: 'none' }, 0.02)
        .from('.be-particle', { opacity: 0, x: -30, stagger: 0.01, ease: 'none' }, 0.06)
        .to(counter, {
          v: 2000, ease: 'none', duration: 0.2,
          onUpdate: () => {
            if (counterRef.current)
              counterRef.current.textContent = `${Math.round(counter.v).toLocaleString('en-US')}+`
          },
        }, 0.05)
        .to('.be-beat-1', { opacity: 0, ease: 'none' }, 0.3)
      // Beat 2 (33–66%): 봇 + P&L 게이지 (transform만)
      tl.from('.be-beat-2', { opacity: 0, ease: 'none' }, 0.33)
        .from('.be-quote', { scaleY: 0, transformOrigin: 'bottom', stagger: 0.02, ease: 'none' }, 0.38)
        .fromTo('.be-pnl-needle', { rotate: -60 }, { rotate: 45, ease: 'none' }, 0.45)
        .to('.be-beat-2', { opacity: 0, ease: 'none' }, 0.63)
      // Beat 3 (66–100%): 스케일 — 지갑 낙하
      tl.from('.be-beat-3', { opacity: 0, ease: 'none' }, 0.66)
        .from('.be-wallet', { y: -40, opacity: 0, stagger: 0.008, ease: 'none' }, 0.7)
    },
    { scope: ref, dependencies: [mode, locale], revertOnUpdate: true },
  )

  return (
    <section ref={ref} data-scene="4" className="scene be-scene">
      <div className="scene-inner">
        <header className="be-header">
          <ChapterLabel accent="var(--purple)">{t.backend.label}</ChapterLabel>
          <p className="scene-period">{t.backend.period}</p>
          <h2>{t.backend.title}</h2>
        </header>
        <div className="be-beats">
          <article className="be-beat be-beat-1">
            <h3>{t.backend.pipeline.title}</h3>
            <p className="scene-body">{t.backend.pipeline.body}</p>
            <svg viewBox="0 0 300 40" className="be-pipeline-svg" aria-hidden="true">
              <rect className="be-pipe" x="0" y="12" width="70" height="16" rx="4" fill="var(--coral)" />
              <rect className="be-pipe" x="90" y="12" width="70" height="16" rx="4" fill="var(--teal)" />
              <rect className="be-pipe" x="180" y="12" width="70" height="16" rx="4" fill="var(--purple)" />
              {Array.from({ length: 12 }, (_, i) => (
                <circle key={i} className="be-particle" cx={20 + i * 22} cy="20" r="3" fill="var(--rocket-orange)" />
              ))}
            </svg>
            <StatChip
              value={t.backend.pipeline.stat}
              sub={t.backend.pipeline.statSub}
              accent="var(--rocket-orange)"
            />
            <p className="sr-only">{t.backend.pipeline.stat}</p>
            <span ref={counterRef} className="be-counter" aria-hidden="true">
              2,000+
            </span>
          </article>
          <article className="be-beat be-beat-2">
            <h3>{t.backend.bots.title}</h3>
            <p className="scene-body">{t.backend.bots.body}</p>
            <svg viewBox="0 0 200 60" className="be-bots-svg" aria-hidden="true">
              {Array.from({ length: 10 }, (_, i) => (
                <rect key={i} className="be-quote" x={i * 12} y={20 - (i % 4) * 4} width="7" height={20 + (i % 4) * 4} fill={i % 2 ? 'var(--teal)' : 'var(--coral)'} rx="1.5" />
              ))}
              <g transform="translate(160 40)">
                <path d="M -25 0 A 25 25 0 0 1 25 0" stroke="var(--panel-navy)" strokeWidth="8" fill="none" />
                <rect className="be-pnl-needle" x="-1.5" y="-24" width="3" height="24" fill="var(--saturn-gold)" style={{ transformOrigin: '0 0' }} />
              </g>
            </svg>
          </article>
          <article className="be-beat be-beat-3">
            <h3>{t.backend.scale.title}</h3>
            <p className="scene-body">{t.backend.scale.body}</p>
            <svg viewBox="0 0 300 50" className="be-scale-svg" aria-hidden="true">
              {Array.from({ length: WALLET_COUNT }, (_, i) => (
                <g key={i} className="be-wallet" transform={`translate(${8 + i * 12} ${18 + (i % 3) * 9})`}>
                  <rect width="9" height="7" rx="1.5" fill="var(--saturn-gold)" />
                  <circle cx="7" cy="3.5" r="1.2" fill="var(--on-accent)" />
                </g>
              ))}
            </svg>
          </article>
        </div>
      </div>
    </section>
  )
}
```

`app/globals.css`에 추가:
```css
.be-beats { display: flex; flex-direction: column; gap: 2rem; margin-top: 1.5rem; }
.be-beat { min-height: 40svh; }
.be-scene:not([data-animated]) .be-beat { min-height: 100svh; display: flex; flex-direction: column; justify-content: center; }
.be-scene[data-animated] .be-beats { position: relative; min-height: 55svh; }
.be-scene[data-animated] .be-beat { position: absolute; inset: 0; min-height: 0; }
.be-pipeline-svg, .be-bots-svg, .be-scale-svg { width: min(100%, 26rem); margin-top: 1rem; }
.be-counter {
  display: inline-block; margin-left: 0.75rem;
  font-family: var(--font-mono), monospace; font-weight: 700; color: var(--rocket-orange);
}
```

주의: `.be-scene:not([data-animated])`에서는 세 비트가 각각 100svh 일반 흐름(touch/reduced),
`[data-animated]`에서는 절대배치 레이어 + pin 300vh (full). DOM은 두 경우 동일하다.

- [ ] **Step 5: 통과 확인** — Run: `npm run build && npm run test:e2e` / Expected: PASS (mobile-webkit 프로젝트에서 스택 레이아웃으로도 지표 텍스트 attach 확인됨)

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: Scene 4 Solo Backend — 파이프라인·봇·스케일 3비트"
```

---

### Task 12: Scene 5 — Saturn Arrival (클라이맥스)

**Files:**
- Create: `components/space/SaturnPlanet.tsx`
- Modify: `components/scenes/SaturnArrival.tsx`, `app/globals.css`, `tests/portfolio.spec.ts`

**Interfaces:**
- Consumes: `useSceneTimeline`, `useT`, `Rocket`, `Astronaut`, `ChapterLabel`
- Produces: `SaturnPlanet({ className? })` — 골드 토성 + 링 + 위성 3개(vault·options-token·auction 라벨, `.moon-1/2/3` 클래스)

- [ ] **Step 1: 실패하는 e2e 테스트 추가**

```ts
test('Saturn 장면 카피·다이어그램 목록이 노출된다', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText('Co-founder & Engineer · Saturn Protocol')).toBeAttached()
  await expect(page.getByText('Then, a new mission.')).toBeAttached()
  await expect(page.getByText('Deposit SOL')).toBeAttached()
  await expect(page.getByText('Premiums flow back as yield')).toBeAttached()
  await expect(page.getByText(/Live on Solana devnet/)).toBeAttached()
})
```

- [ ] **Step 2: 실패 확인** — Run: `npm run build && npm run test:e2e` / Expected: FAIL

- [ ] **Step 3: SaturnPlanet.tsx**

```tsx
const MOONS = [
  { cls: 'moon-1', label: 'vault', cx: 18, cy: 16, color: 'var(--teal)' },
  { cls: 'moon-2', label: 'options-token', cx: 86, cy: 10, color: 'var(--purple)' },
  { cls: 'moon-3', label: 'auction', cx: 92, cy: 78, color: 'var(--coral)' },
]

export function SaturnPlanet({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 110 100" className={className} aria-hidden="true">
      <g transform="rotate(-18 55 50)">
        <ellipse cx="55" cy="50" rx="52" ry="14" stroke="var(--ring-sand)" strokeWidth="5" fill="none" opacity="0.5" />
      </g>
      <circle cx="55" cy="50" r="28" fill="var(--saturn-gold)" />
      <path d="M 27 50 A 28 28 0 0 0 83 50 A 40 28 0 0 1 27 50 Z" fill="#e8952e" />
      <g transform="rotate(-18 55 50)">
        <path d="M 3 50 A 52 14 0 0 0 107 50" stroke="var(--ring-sand)" strokeWidth="5" fill="none" />
      </g>
      {MOONS.map((m) => (
        <g key={m.cls} className={m.cls}>
          <circle cx={m.cx} cy={m.cy} r="5" fill={m.color} />
          <text x={m.cx} y={m.cy + 11} textAnchor="middle" fontSize="4.2" fill="#FDF6E3" fontFamily="monospace">
            {m.label}
          </text>
        </g>
      ))}
    </svg>
  )
}
```

- [ ] **Step 4: SaturnArrival.tsx 완성**

```tsx
'use client'

import { useRef } from 'react'
import { useT } from '@/lib/i18n/LanguageProvider'
import { useSceneTimeline } from '@/lib/scroll/useSceneTimeline'
import { SaturnPlanet } from '@/components/space/SaturnPlanet'
import { Rocket } from '@/components/space/Rocket'
import { Astronaut } from '@/components/space/Astronaut'
import { ChapterLabel } from '@/components/space/ChapterLabel'

export function SaturnArrival() {
  const t = useT()
  const ref = useRef<HTMLElement>(null)

  useSceneTimeline({
    scope: ref,
    end: '+=250vh',
    build: (tl) => {
      tl.from('.sat-transit', { opacity: 0, ease: 'none', duration: 0.08 }, 0)
        .to('.sat-transit', { opacity: 0, ease: 'none' }, 0.14)
        .from('.sat-planet', { scale: 0.3, opacity: 0, transformOrigin: '50% 50%', ease: 'none' }, 0.16)
        .from('.sat-rocket', {
          motionPath: { path: [{ x: -260, y: 160 }, { x: -80, y: 30 }, { x: 0, y: 0 }], curviness: 1.2 },
          rotate: -25, ease: 'none', duration: 0.25,
        }, 0.16)
        .from('.sat-copy', { opacity: 0, y: 40, ease: 'none' }, 0.3)
        // 허용 예외: stroke-dashoffset — 다이어그램 연결선 드로잉
        .from('.sat-flow-line', { strokeDashoffset: 1, stagger: 0.06, ease: 'none' }, 0.45)
        .from('.sat-flow-step', { opacity: 0, y: 12, stagger: 0.06, ease: 'none' }, 0.45)
        .from('.moon-1, .moon-2, .moon-3', { opacity: 0, scale: 0, stagger: 0.05, ease: 'none' }, 0.7)
        .from('.sat-status', { opacity: 0, ease: 'none' }, 0.85)
    },
  })

  return (
    <section ref={ref} data-scene="5" className="scene">
      <p className="sat-transit">{t.saturn.transit}</p>
      <div className="scene-inner planet-layout">
        <div className="planet-visual">
          <SaturnPlanet className="sat-planet" />
          <Rocket className="sat-rocket planet-rocket" />
          {/* 스펙 §4 포즈 계약: Scene 5 = 토성 관측 */}
          <Astronaut pose="observe" className="sat-astronaut" />
        </div>
        <div className="sat-copy">
          <ChapterLabel accent="var(--saturn-gold)">{t.saturn.label}</ChapterLabel>
          <p className="scene-period">{t.saturn.period}</p>
          <h2>{t.saturn.title}</h2>
          <p className="scene-body">{t.saturn.body}</p>
          <ol className="sat-flow">
            {t.saturn.diagram.map((step, i) => (
              <li key={step} className="sat-flow-step">
                <span className="sat-flow-num" style={{ background: 'var(--saturn-gold)', color: 'var(--on-accent)' }}>
                  {i + 1}
                </span>
                {step}
                {i < t.saturn.diagram.length - 1 && (
                  <svg viewBox="0 0 10 24" className="sat-flow-connector" aria-hidden="true">
                    <path className="sat-flow-line" d="M 5 0 V 24" stroke="var(--saturn-gold)" strokeWidth="2" pathLength={1} strokeDasharray={1} />
                  </svg>
                )}
              </li>
            ))}
          </ol>
          <p className="scene-body">{t.saturn.moons}</p>
          <p className="sat-status">{t.saturn.status}</p>
        </div>
      </div>
    </section>
  )
}
```

`app/globals.css`에 추가:
```css
.sat-transit {
  position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
  font-family: var(--font-baloo), sans-serif; font-size: clamp(1.4rem, 4vw, 2.4rem);
  color: var(--cream); pointer-events: none;
}
.sat-planet { width: clamp(220px, 30vw, 340px); }
.sat-astronaut { position: absolute; bottom: -8%; left: -14%; width: clamp(60px, 8vw, 90px); }
.sat-flow { list-style: none; margin-top: 1rem; display: flex; flex-direction: column; }
.sat-flow-step { position: relative; display: flex; align-items: center; gap: 0.6rem; padding-bottom: 1.4rem; }
.sat-flow-num {
  display: inline-flex; align-items: center; justify-content: center;
  width: 1.5rem; height: 1.5rem; border-radius: 50%;
  font-family: var(--font-mono), monospace; font-size: 0.75rem; font-weight: 700;
}
.sat-flow-connector { position: absolute; left: 0.65rem; bottom: 0; width: 10px; height: 22px; }
.sat-status { margin-top: 1rem; font-family: var(--font-mono), monospace; font-size: 0.8rem; color: var(--saturn-gold); }
```

- [ ] **Step 5: 통과 확인** — Run: `npm run build && npm run test:e2e` / Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: Scene 5 Saturn Arrival — 토성·볼트 다이어그램·위성 3개"
```

---

### Task 13: Scene 6 — Landing (스킬 별자리 + 연락처)

**Files:**
- Modify: `components/scenes/Landing.tsx`, `app/globals.css`, `tests/portfolio.spec.ts`

**Interfaces:**
- Consumes: `Astronaut`, `ChapterLabel`, `useT`, `LINKS`, `SKILL_GROUPS` (`lib/content.ts`)
- Produces: 없음 (장면 완결). pin 없음 — `useSceneTimeline` 미사용

- [ ] **Step 1: 실패하는 e2e 테스트 추가 (릴리스 기준 링크 검증)**

```ts
test('연락처 링크 4종의 href가 정확하다', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('link', { name: 'GitHub' })).toHaveAttribute('href', 'https://github.com/junu1229')
  await expect(page.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute('href', 'https://www.linkedin.com/in/junwoooooo-kim/')
  await expect(page.getByRole('link', { name: 'Email' })).toHaveAttribute('href', 'mailto:junu1229@gmail.com')
  await expect(page.getByRole('link', { name: 'Download resume (PDF)' })).toHaveAttribute('href', '/Junwoo_Kim_Resume.pdf')
})

test('스킬 5그룹이 노출된다', async ({ page }) => {
  await page.goto('/')
  for (const name of ['Languages', 'Blockchain', 'Backend & Infra', 'Frontend', 'Trading Systems']) {
    await expect(page.getByText(name, { exact: true })).toBeAttached()
  }
  await expect(page.getByText('Rust', { exact: true })).toBeAttached()
})
```

- [ ] **Step 2: 실패 확인** — Run: `npm run build && npm run test:e2e` / Expected: FAIL

- [ ] **Step 3: Landing.tsx 완성**

```tsx
'use client'

import { useT } from '@/lib/i18n/LanguageProvider'
import { LINKS, SKILL_GROUPS } from '@/lib/content'
import { Astronaut } from '@/components/space/Astronaut'
import { ChapterLabel } from '@/components/space/ChapterLabel'

const GROUP_COLORS = ['var(--saturn-gold)', 'var(--teal)', 'var(--purple)', 'var(--coral)', 'var(--rocket-orange)']

export function Landing() {
  const t = useT()
  return (
    <section data-scene="6" className="scene">
      <div className="scene-inner">
        <div className="landing-head">
          <Astronaut pose="flag" className="landing-astronaut" />
          <div>
            <ChapterLabel accent="var(--teal)">{t.landing.label}</ChapterLabel>
            <h2>{t.landing.title}</h2>
          </div>
        </div>
        <div className="skill-constellations">
          {SKILL_GROUPS.map((g, i) => (
            <div key={g.name} className="skill-group" style={{ borderColor: GROUP_COLORS[i] }}>
              <h3 className="skill-group-name" style={{ color: GROUP_COLORS[i] }}>{g.name}</h3>
              <ul className="skill-list">
                {g.items.map((item) => (
                  <li key={item} className="skill-item">★ {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <nav className="contact-links" aria-label="Contact">
          <a href={LINKS.github}>GitHub</a>
          <a href={LINKS.linkedin}>LinkedIn</a>
          <a href={LINKS.email}>Email</a>
          <a href={LINKS.resume} download className="resume-cta">
            {t.landing.resumeCta}
          </a>
        </nav>
      </div>
    </section>
  )
}
```

`app/globals.css`에 추가:
```css
.landing-head { display: flex; align-items: center; gap: 1.5rem; }
.landing-astronaut { width: clamp(80px, 10vw, 120px); }
.skill-constellations { display: flex; flex-wrap: wrap; gap: 1rem; margin-top: 2rem; }
.skill-group { border: 2px solid; border-radius: 12px; padding: 1rem 1.2rem; background: var(--panel-navy); flex: 1 1 14rem; }
.skill-group-name { font-size: 0.85rem; font-family: var(--font-mono), monospace; }
.skill-list { list-style: none; margin-top: 0.5rem; font-size: 0.85rem; color: #cfd6e4; }
.contact-links { display: flex; flex-wrap: wrap; gap: 1rem; margin-top: 2.5rem; align-items: center; }
.contact-links a { font-family: var(--font-mono), monospace; text-decoration: underline; text-underline-offset: 4px; }
.resume-cta {
  background: var(--rocket-orange); color: var(--on-accent) !important;
  text-decoration: none !important; font-weight: 700;
  padding: 0.7rem 1.4rem; border-radius: 999px;
}
```

- [ ] **Step 4: 통과 확인** — Run: `npm run build && npm run test:e2e` / Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: Scene 6 Landing — 스킬 별자리·연락처·이력서 CTA"
```

---

### Task 14: 접근성·오버플로·콘솔 스위프

**Files:**
- Modify: `tests/portfolio.spec.ts`

**Interfaces:**
- Consumes: 완성된 7개 장면
- Produces: 스펙 §9 잔여 검증 항목 전부

- [ ] **Step 1: 테스트 추가**

```ts
test('가로 오버플로가 없다', async ({ page }) => {
  await page.goto('/')
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  )
  expect(overflow).toBeLessThanOrEqual(0)
})

test('콘솔 에러가 없다', async ({ page }) => {
  const errors: string[] = []
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text())
  })
  page.on('pageerror', (err) => errors.push(err.message))
  await page.goto('/')
  await page.mouse.wheel(0, 5000)
  await page.waitForTimeout(500)
  expect(errors).toEqual([])
})

test('정보성 콘텐츠가 스크린리더용 DOM으로 존재한다', async ({ page }) => {
  await page.goto('/')
  // 다이어그램은 <ol>로 존재
  await expect(page.locator('ol.sat-flow li')).toHaveCount(4)
  // 카운터 최종 수치는 sr-only로 존재
  await expect(page.locator('.sr-only', { hasText: '2,000+ events/sec' })).toBeAttached()
})

test('별 노드 총량 상한(80)을 지킨다', async ({ page }) => {
  await page.goto('/')
  expect(await page.locator('.starfield circle').count()).toBeLessThanOrEqual(80)
})
```

- [ ] **Step 2: 실행** — Run: `npm run build && npm run test:e2e` / Expected: PASS (실패 시 해당 장면 수정 후 재실행)

- [ ] **Step 3: Commit**

```bash
git add tests/ && git commit -m "test: 접근성·오버플로·콘솔·노드 상한 스위프 추가"
```

---

### Task 15: OG 이미지 + alt

**Files:**
- Create: `scripts/generate-og.mjs`, `app/opengraph-image.png`(생성물), `app/opengraph-image.alt.txt`

**Interfaces:**
- Consumes: Task 4의 토큰 (스크립트에 hex 하드코딩)
- Produces: `out/index.html`의 `og:image` 메타가 절대 URL로 가리키는 1200×630 PNG

- [ ] **Step 1: scripts/generate-og.mjs 작성**

```js
import { chromium } from '@playwright/test'

const html = `<!DOCTYPE html><html><body style="margin:0">
<div style="width:1200px;height:630px;background:#0B1026;position:relative;font-family:Arial,sans-serif;overflow:hidden">
  <div style="position:absolute;top:80px;left:250px;width:4px;height:4px;border-radius:50%;background:#FDF6E3;opacity:.7"></div>
  <div style="position:absolute;top:200px;left:150px;width:3px;height:3px;border-radius:50%;background:#FDF6E3;opacity:.5"></div>
  <div style="position:absolute;top:480px;left:400px;width:4px;height:4px;border-radius:50%;background:#FDF6E3;opacity:.6"></div>
  <div style="position:absolute;top:120px;right:400px;width:3px;height:3px;border-radius:50%;background:#FDF6E3;opacity:.6"></div>
  <div style="position:absolute;top:150px;right:120px;width:340px;height:330px">
    <div style="position:absolute;top:140px;left:-30px;width:400px;height:110px;border:22px solid #F2D09A;border-radius:50%;transform:rotate(-18deg);opacity:.85"></div>
    <div style="position:absolute;top:95px;left:85px;width:180px;height:180px;border-radius:50%;background:#FFB84D"></div>
  </div>
  <div style="position:absolute;top:190px;left:90px">
    <div style="font-size:72px;font-weight:800;color:#FDF6E3">JUNWOO KIM</div>
    <div style="font-size:34px;color:#FFB84D;margin-top:16px">A career, in a nutshell</div>
    <div style="font-size:24px;color:#8b93b8;margin-top:14px">Rust · on-chain protocols · trading infrastructure</div>
  </div>
</div></body></html>`

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })
await page.setContent(html)
await page.screenshot({ path: 'app/opengraph-image.png' })
await browser.close()
console.log('generated app/opengraph-image.png')
```

- [ ] **Step 2: 생성 + alt 작성**

```bash
node scripts/generate-og.mjs
```

`app/opengraph-image.alt.txt`:
```text
Junwoo Kim — Rust & on-chain engineer. Flat illustration of Saturn on a deep-navy starfield with the title "A career, in a nutshell".
```

- [ ] **Step 3: 검증**

Run: `npm run build && grep -o 'og:image[^>]*' out/index.html`
Expected: `https://junu1229.github.io/opengraph-image.png…` 절대 URL 포함

- [ ] **Step 4: Commit**

```bash
git add scripts/ app/opengraph-image.png app/opengraph-image.alt.txt && git commit -m "feat: OG 이미지(토성 장면)·alt 텍스트 추가"
```

---

### Task 16: GitHub Actions 배포

**Files:**
- Create: `.github/workflows/deploy.yml`

**Interfaces:**
- Consumes: 전체 빌드·테스트 파이프라인
- Produces: main push 시 typecheck→lint→build→e2e 통과 후 GitHub Pages 배포

- [ ] **Step 1: deploy.yml 작성 (스펙 §6 그대로)**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run typecheck
      - run: npm run lint
      - run: npm run build
      - run: npx playwright install --with-deps chromium webkit
      - run: npm run test:e2e
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v4
        with:
          path: out

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: 로컬 최종 확인 후 push**

Run: `npm run typecheck && npm run lint && npm run build && npm run test:e2e`
Expected: 전부 PASS

```bash
git add .github/ && git commit -m "feat: GitHub Actions 배포 파이프라인 추가" && git push origin main
```

- [ ] **Step 3: 저장소 설정 1회 수동 작업 (사용자 안내)**

GitHub → Settings → Pages → Source를 **"GitHub Actions"**로 변경.
Actions 탭에서 워크플로 성공 및 https://junu1229.github.io 반영 확인.

---

### Task 17: 최종 QA (수동)

**Files:** 없음 (검수)

- [ ] **Step 1: 장면별 연출 검수** — `npm run dev` 후 데스크톱 Chrome에서 7개 장면 스크롤 연출을 스펙 §4와 대조
- [ ] **Step 2: 성능 게이트** — Chrome DevTools Performance 탭 6× CPU 스로틀로 전체 스크롤 녹화. 연속 500ms 초과 프레임 드랍 구간이 없어야 통과. 초과 시 파티클 수·타임라인 밀도를 줄여 재측정
- [ ] **Step 3: 모바일 실기기(또는 DevTools 에뮬레이션) 검수** — native scroll 동작, Scene 4 스택 레이아웃, orientation 전환 후 레이아웃 정상
- [ ] **Step 4: 발견된 이슈는 개별 커밋으로 수정 후 push (CI가 게이트)**
