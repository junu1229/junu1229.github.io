# 포트폴리오 리디자인 — Kurzgesagt 우주 여행 스크롤리텔링

- **날짜**: 2026-07-24 (v3 — Codex 리뷰 1차 20건 + 2차 4건 반영)
- **상태**: Codex 승인 완료 — 사용자 최종 승인 대기
- **저장소**: junu1229.github.io (GitHub Pages 사용자 사이트, 루트 도메인 — basePath 불필요)

## 1. 개요와 목표

기존 정적 HTML 포트폴리오를 전부 걷어내고, 경력을 Kurzgesagt 인포그래픽 스타일의
**우주 여행 스크롤리텔링**으로 소개하는 원페이지 사이트를 처음부터 새로 만든다.

- **주요 관객**: 채용 담당자 + 웹3 업계 사람들 (균형)
- **핵심 서사**: 커리어 = 우주 비행. 교육(발사 준비) → Kana Labs의 세 단계(행성 3개) →
  Saturn Protocol 공동창업(토성 도착). "Saturn"이라는 프로젝트 이름이 서사의 종착지와 일치한다.

### 릴리스 기준 (CI/QA로 검증 가능한 것)
- 핵심 지표 3종이 실제 DOM 텍스트로 노출된다: `2,000+ events/sec`,
  `<0.05% of mark price (excluding ATR)`, `20K+ participants`
- Landing의 GitHub·LinkedIn·Email·Resume 링크가 §부록 A에 지정된 정확한
  `href`(`mailto:` / PDF 경로 포함)를 가진다
- §9의 Playwright 스위트 전체 통과 후에만 배포된다

### 사용자 검증 목표 (CI 기준이 아닌 정성 목표)
- 방문자가 스크롤만으로 경력의 흐름과 핵심 지표를 기억하게 만든다

## 2. 비목표

- 블로그, 프로젝트 상세 페이지, CMS 등 원페이지를 넘는 콘텐츠 구조
- 서버 기능(API, 폼 제출 등) — 순수 정적 사이트로 한정
- 기존 사이트 콘텐츠(about.html, freePets.html 등)의 보존 또는 이전
- 한국어 검색 색인 — 검색 metadata와 정적 초기 HTML은 영어만 제공하며,
  한국어는 클라이언트 표시 언어다 (§7)

## 3. 콘텐츠 소스와 정확성 규칙

모든 경력 콘텐츠는 `Junwoo_Kim_Resume.pdf`(2026-05 기준) 기준. 링크:

- GitHub: <https://github.com/junu1229>
- LinkedIn: <https://www.linkedin.com/in/junwoooooo-kim/>
- Email: <junu1229@gmail.com>
- 이력서 PDF: `public/Junwoo_Kim_Resume.pdf` → 사이트 경로 `/Junwoo_Kim_Resume.pdf`

**정확성 규칙** — 이력서와 어긋나는 표현 금지:
- 직함은 이력서 그대로: Scene 4의 공식 직함은 **Full-stack Developer**이며
  "solo backend ownership"은 부제로만 사용한다
- 스프레드 지표는 항상 조건 포함: **\<0.05% of mark price (excluding ATR)**
- APT 분배는 총액 표현: **"20K+ 참여자를 지원하고 총 20K APT를 분배"**
  (참여자 각각에게 20K를 준 것처럼 읽히는 문장 금지)
- Kana 종료(2026.03)와 Saturn 시작(2026.03)은 같은 달의 전환이며 그대로 표기한다

**화면 카피는 전부 부록 A(콘텐츠 계약)의 확정 문자열만 사용한다.
부록 A에 없는 경력 카피를 구현자가 새로 작성하지 않는다.**

## 4. 스토리 구조

시네마틱 풀 연출: 장면이 화면에 고정(pin)되고 스크롤 진행도가 타임라인을 재생(scrub)한다.

### 장면 전환 규칙
- **0→1**: 로켓 없이 별밭이 발사대로 하강한다
- **1→2**: 카운트다운 후 로켓이 처음 등장해 발사된다
- **2→5**: 로켓이 점선 궤도를 따라 다음 행성으로 이동한다 (SVG motion path)
- **5→6**: 로켓이 토성의 추상화된 위성 착륙장에 착륙하고 마스코트가 깃발을 꽂는다

### 타임라인 계약 (데스크톱)
```text
Scene 0–3: 장면당 ScrollTrigger end "+=200vh"
Scene 4:   end "+=300vh" — pipeline 0–33%, bots 33–66%, scale 66–100%
Scene 5:   end "+=250vh"
Scene 6:   pin 없음, 일반 문서 흐름
```
- 각 장면 루트에 `data-scene="0"`…`"6"` 부여
- pinned element 자체는 움직이지 않고 내부 wrapper만 애니메이션한다

### 마스코트 포즈 (장면 순서와 일치)
Scene 0 유영 → Scene 1 엄지척 후 탑승 → Scene 2–4 조종·비행 →
Scene 5 토성 관측 → Scene 6 착륙 후 깃발

### 장면별 상세

**Scene 0 — HERO · 심우주**: 별밭 + 이름/태그라인(부록 A `hero.*`) + 유영하는 마스코트.
우측 상단 EN|KR 토글(전 장면 고정). "SCROLL TO LAUNCH" 유도.

**Scene 1 — LAUNCH · 발사 준비 (교육, 2017–2023)**: 전자·제어공학 = "연료 주입".
체크리스트 점등 → 카운트다운 → 발사. 카피는 `launch.*`.

**Scene 2 — PLANET 01 · Dev-rel (Kana Labs, 2023.10–12)**: 코랄 소행성,
문서/SDK 아이콘 궤도 회전. 카피는 `devrel.*`.

**Scene 3 — PLANET 02 · Frontend (Kana Labs, 2024.01–06)**: 틸 행성,
트레이딩 UI 조립 애니메이션, 멀티체인 지갑(Arbitrum·BSC·Aptos) 위성. 카피는 `frontend.*`.

**Scene 4 — PLANET 03 · Full-stack Developer — Solo Backend Ownership
(Kana Labs, 2024.07–2026.03)** ★ 최장 챕터, 3비트:
1. **파이프라인**: 인덱서 → ETL → 읽기 API 파이프 연결, 오렌지 파티클 흐름,
   카운터 2,000+/sec 상승, "~200GB / 3 months" 스탯 칩
2. **트레이딩 봇**: 마켓메이킹 봇이 마크 가격 대비 <0.05%(ATR 제외)로 호가 유지,
   아비트라지 봇 P&L 게이지 음수→양수 전환
3. **스케일**: 20K+ 참여자 지원, 총 20K APT 분배(지갑 아이콘 낙하),
   파트너 자동화(T Wallet·Factblock·AhnLab), 모바일 프론트 채택 +30%

카피는 `backend.*`.

**Scene 5 — SATURN ARRIVAL · Saturn Protocol (2026.03–현재)** ★ 클라이맥스:
전환 문구 "Then, a new mission." → 토성 등장. 커버드콜 볼트 4단계 다이어그램이
스크롤에 맞춰 그려짐(`saturn.diagram.*`). 위성 3개 = Anchor 프로그램 3개
(vault · options-token · Dutch auction, CPI 연결). Pyth/Helius 안테나.
상태 배지: devnet 라이브 · Colosseum 2026 · 메인넷 준비. 카피는 `saturn.*`.

**Scene 6 — LANDING · 스킬 별자리 + 연락처** (pin 없음): 마스코트 깃발.
스킬 별자리 5그룹, 연락처 링크 + 이력서 다운로드. 카피는 `landing.*`.

## 5. 비주얼 시스템

### 팔레트 (디자인 토큰)
| 토큰 | 값 | 용도 |
|---|---|---|
| space-navy | #0B1026 | 페이지 배경 |
| panel-navy | #1A2340 | 패널/카드 |
| rocket-orange | #FF9F43 | 주 강조, CTA 배경 |
| saturn-gold | #FFB84D | 토성, Scene 5 강조 |
| teal | #4DD8C0 | Scene 3 강조 |
| coral | #FF6B6B | Scene 2 강조 |
| purple | #A29BFE | Scene 4 강조 |
| cream / on-dark | #FDF6E3 | 어두운 배경 위 텍스트, 마스코트 |
| on-accent | #0B1026 | 강조색 배경 위 텍스트/아이콘 |
| ring-sand | #F2D09A | 토성 링 |

규칙:
- 배경은 항상 네이비 계열, 챕터마다 강조색 1개
- 그라디언트는 배경 심도용 최소 사용, 오브젝트는 플랫 2톤 셰이딩("밑면 진한 톤")
- **orange·gold·teal·coral·purple 배경 위 텍스트·아이콘은 `on-accent`(navy) 사용**
  (cream-on-orange는 대비 1.89:1로 실패, navy-on-orange는 9.22:1)
- 모든 버튼·링크는 `:focus-visible`에 `2px solid #FDF6E3` outline, offset 2px

### 타이포그래피와 폰트 로딩
- Display(EN): **Baloo 2** — `next/font/google`, `latin` subset
- 숫자·지표: **JetBrains Mono** — `next/font/google`, `latin` subset
- Display(KR)/본문: **Pretendard** — npm 패키지 `pretendard`(lockfile로 버전 고정),
  `pretendard/dist/web/variable/woff2/PretendardVariable.woff2` 단일 variable 파일을
  `next/font/local`로 로드

### 일러스트 규칙
- 페이지에 렌더링되는 일러스트는 전부 인라인 SVG React 컴포넌트로 직접 제작
- 예외: 공유 메타데이터용 `app/opengraph-image.png`와 다운로드용 PDF는
  본문 렌더링 자산이 아니므로 이 규칙의 예외다
- 마스코트: 플랫·라운드, §4의 포즈 순서 고정

### SVG 접근성
- 순수 장식 SVG(별밭, 궤도선 등)는 `aria-hidden="true"`
- **정보성 SVG**(파이프라인, 커버드콜 흐름, 지갑 분배, 스킬 별자리)는 동일 내용의
  인접 `<ol>`/`<ul>`(부록 A의 카피 재사용)을 제공한 경우에만 `aria-hidden="true"`
- 애니메이션 카운터는 `aria-hidden` 처리하고 최종 수치를 `sr-only` 텍스트로 별도 제공

### 성능 상한
- 반복 SVG는 `<symbol>`/`<use>` 재사용. 별 노드 최대 80개,
  이동 파티클·지갑 glyph는 장면당 최대 40개
- 스크롤 중 layout을 유발하는 CSS 속성 애니메이션 금지. 기본 허용 속성은
  `transform`·`opacity`이며, 예외 2가지만 허용: 숫자 카운터의 DOM `textContent`
  갱신, SVG 경로 드로잉의 `stroke-dasharray`/`stroke-dashoffset`.
  두 예외 모두 GSAP으로 제어하고 React `setState`는 사용하지 않는다
- 페이지 전체에서 GSAP ticker는 하나만 사용
- QA 게이트: Chrome DevTools 6× CPU 스로틀 상태에서 전체 스크롤 시
  연속 500ms를 넘는 프레임 드랍 구간이 없어야 한다 (수동 검증)

## 6. 기술 아키텍처

### 파일 구조 (빌드 가능한 전체 트리)
```text
package.json
package-lock.json            # npm 사용
next.config.ts               # output: 'export', basePath: '', assetPrefix: ''
tsconfig.json
eslint.config.mjs
playwright.config.ts
.github/workflows/deploy.yml
app/
  layout.tsx                 # Server: metadata, fonts만
  page.tsx                   # Server: PortfolioExperience 조립
  globals.css
  opengraph-image.png        # 토성 장면 기반 (구현 시 제작)
  opengraph-image.alt.txt
components/
  PortfolioExperience.tsx    # "use client" 경계 시작점
  scenes/                    # Hero, Launch, PlanetDevrel, PlanetFrontend,
                             # PlanetBackend, SaturnArrival, Landing (장면당 1파일)
  space/                     # Astronaut, Rocket, Planet, Starfield, StatChip 등
lib/
  i18n/                      # en.ts, ko.ts (부록 A 구현체), LanguageProvider("use client"), useT()
  scroll/                    # GSAP/Lenis 셋업(클라이언트 전용), useSceneTimeline
tests/
  portfolio.spec.ts
public/
  Junwoo_Kim_Resume.pdf
```

package.json scripts:
```json
{
  "dev": "next dev",
  "build": "next build",
  "typecheck": "tsc --noEmit",
  "lint": "eslint .",
  "test:e2e": "playwright test"
}
```
dependencies: `next`, `react`, `react-dom`, `gsap`, `@gsap/react`, `lenis`,
`pretendard`

devDependencies (필수): `typescript`, `@types/node`, `@types/react`,
`@types/react-dom`, `eslint`, `eslint-config-next`, `@playwright/test`, `serve`

정확한 버전은 전부 `package-lock.json`으로 고정.

### Server/Client 경계
- `app/layout.tsx`·`app/page.tsx`는 Server Component — metadata·폰트·조립만
- `PortfolioExperience.tsx`부터 `"use client"` — 전체 영어 콘텐츠는 정적 HTML로
  사전 렌더링되고, GSAP·Lenis·`window`·`localStorage`는 Client Component의
  effect/`useGSAP` 내부에서만 접근한다

### GSAP · Lenis 통합 계약
```ts
'use client'
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, useGSAP)

useEffect(() => {
  const lenis = new Lenis({ autoRaf: false, syncTouch: false })
  const tick = (time: number) => lenis.raf(time * 1000)

  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)

  return () => {
    gsap.ticker.remove(tick)
    lenis.destroy()
  }
}, [])
```
- 모바일(`pointer: coarse`/767px 이하)과 reduced-motion에서는 §8 우선순위에 따라
  **이 effect 자체를 실행하지 않는다** (Lenis 미초기화)
- 각 장면은 `useGSAP({ scope })`로 타임라인 생성 — unmount·dependency 변경 시
  context가 모든 timeline과 ScrollTrigger를 `revert()`한다
- 로켓 경로는 `MotionPathPlugin` (등록 필수)

### 배포 (GitHub Actions → GitHub Pages)
```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```
빌드 job steps (고정):
```yaml
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
```
`out/` 정적 서버는 Playwright가 직접 관리한다 — `playwright.config.ts` 계약:
```ts
webServer: {
  command: 'npx serve out -l 3000',
  url: 'http://127.0.0.1:3000',
  reuseExistingServer: !process.env.CI,
}
```
deploy job은 build job을 `needs`로 참조, `actions/deploy-pages@v4` +
`github-pages` environment 지정. 저장소 설정에서 Pages 소스를
"GitHub Actions"로 1회 수동 변경 필요.

### SEO/메타
- `metadataBase: new URL('https://junu1229.github.io')`
- title: "Junwoo Kim — Rust & On-chain Engineer"
- OG 이미지는 `app/opengraph-image.png` 파일 컨벤션 사용
- 모든 카피는 실제 DOM 텍스트로 존재

## 7. i18n — EN/KR 토글과 hydration 계약

- 라우트 분리 없는 클라이언트 토글. 모든 문구는 `lib/i18n/en.ts`·`ko.ts`
  (부록 A의 구현체). `useT()` 훅으로 조회. 토글 UI는 우측 상단 고정
- **첫 정적 paint는 항상 영어다.** hydration 이후 effect에서 저장 언어를 복원한다
  (render 중 `localStorage` 읽기 금지 — hydration mismatch 방지):
```ts
const [locale, setLocale] = useState<'en' | 'ko'>('en')
useEffect(() => {
  const stored = localStorage.getItem('locale')
  const next = stored === 'ko' ? 'ko' : 'en'
  setLocale(next)
  document.documentElement.lang = next
}, [])
```
- 잘못된 storage 값은 영어로 대체. 언어 변경 시 `useGSAP`을
  `dependencies: [locale], revertOnUpdate: true`로 재구성하고
  `document.fonts.ready` 이후 `ScrollTrigger.refresh()` 호출
- 챕터 라벨("CHAPTER 01" 등)과 스킬 명칭은 디자인 요소로서 두 locale 모두 영어 유지

## 8. 모바일 · reduced-motion

### 모바일/터치
- `(pointer: coarse)` 또는 폭 767px 이하: **Lenis를 초기화하지 않고 native touch
  scrolling 유지.** `touchmove`/wheel `preventDefault` 금지
- Scene 4는 pipeline·bots·scale을 각각 독립된 `100svh` 스크롤 비트로 분리,
  Scene 6은 (데스크톱과 동일하게) pin 없는 일반 흐름
- orientation 변경 후 `ScrollTrigger.refresh()`. 가로 overflow·텍스트 clipping 금지

### reduced-motion (다른 모든 규칙보다 우선)
- `prefers-reduced-motion: reduce`: Lenis와 모든 ScrollTrigger·MotionPath·
  parallax·counter tween을 초기화하지 않는다. 모든 transform 초기 상태,
  카운터·다이어그램·게이지는 최종 상태로 표시
- preference가 실행 중 변경되면 기존 context·Lenis를 제거하고 즉시 재구성

## 9. 검증 전략

CI 게이트 (§6 배포 순서와 동일 — Playwright 통과 없이는 배포되지 않는다):
`typecheck → lint → build → test:e2e(out/ 대상) → deploy`

Playwright 스위트 (Chromium + mobile WebKit):
1. 페이지 로드, `data-scene="0"`–`"6"` 7개 장면 렌더
2. 릴리스 기준 지표 3종의 원문 텍스트 존재 (§1)
3. 연락처 4종의 정확한 `href` (부록 A와 일치)
4. EN/KR 토글 → hero 문구 전환, reload 후 locale 유지, `html.lang` 갱신
5. 이력서 PDF 응답 200
6. reduced-motion 에뮬레이션: pin/Lenis 비활성 + 전체 콘텐츠 노출
7. 가로 overflow 부재, console error 부재

수동 QA: §5 성능 게이트(6× CPU 스로틀), 장면별 연출 검수(로컬 dev 서버).

## 10. 기존 자산 처리

- **삭제**: index.html, about.html, freePets.html, test1.html, css/, js/, resource/, woff2/, .DS_Store
- **이동**: Junwoo_Kim_Resume.pdf → public/
- **유지·확인**: 기존 `.gitignore`가 node_modules/, .next/, out/, .superpowers/,
  .DS_Store를 포함하는지 확인 (이미 존재함)

## 11. 결정 로그

| 결정 | 선택 | 비고 |
|---|---|---|
| 목적 | 이직 + 업계 네트워킹 균형 | |
| 스택 | Next.js 정적 export | 이력서 스택과 일치 |
| 구조 | 원페이지, 시네마틱 pin/scrub | reduced-motion 폴백 필수 |
| 언어 | EN + KR 토글, 기본 EN, 첫 paint 영어 고정 | 한국어는 검색 색인 비대상 |
| 디자인 | Kurzgesagt — 우주 여행 스크롤리텔링(A안) | 비주얼 컴패니언으로 선택 |
| 캐릭터 | 마스코트 우주비행사(본인), 담백한 카피 | |
| 3D | Three.js 미사용 | 플랫 2D 미학과 충돌, GSAP+SVG로 충분 |
| 리뷰 | Codex 리뷰 1차 20건 + 2차 4건 전건 반영 | 1차: Critical 1·High 5·Medium 11·Low 3 / 2차: Critical 2·High 2 |
| 패키지 매니저 | npm + package-lock.json | |

## 부록 A — 콘텐츠 계약 (확정 EN/KO 카피)

챕터 라벨·스킬 명칭·기간 표기는 두 locale 공통(영어). 아래에 없는 경력 카피는
구현자가 새로 작성하지 않는다.

### hero
| key | en | ko |
|---|---|---|
| hero.title | JUNWOO KIM | JUNWOO KIM |
| hero.subtitle | A career, in a nutshell | 한눈에 보는 커리어 여행 |
| hero.tagline | Full-stack · Rust & TypeScript · from data pipelines to UI | 풀스택 · 러스트 & 타입스크립트 · 데이터 파이프라인부터 UI까지 |
| hero.cta | SCROLL TO LAUNCH | 스크롤해서 발사 |
| languageToggle.ariaLabel | Switch language | 언어 전환 |
| skipLink | Skip to content | 본문으로 건너뛰기 |

### launch (라벨: PRE-FLIGHT CHECK)
| key | en | ko |
|---|---|---|
| launch.title | Fueling up: Electronics & Control Engineering | 연료 주입: 전자·제어공학 |
| launch.body | Gyeonggi University of Science and Technology (2017–2023). Low-level programming, control systems, and optimization — the foundation for everything that followed. | 경기과학기술대학교 (2017–2023). 저수준 프로그래밍, 제어 시스템, 최적화 — 이후 모든 여정의 기반. |
| launch.countdown | 3 · 2 · 1 · LIFTOFF | 3 · 2 · 1 · 발사 |

### devrel (라벨: CHAPTER 01 — FIRST ORBIT, 기간: 2023.10 – 2023.12)
| key | en | ko |
|---|---|---|
| devrel.title | Developer Relations · Kana Labs | 데브렐 · Kana Labs |
| devrel.body | Wrote technical docs and SDK samples that cut onboarding time for external developers, and supported partners through SDK integrations. | 기술 문서와 SDK 샘플로 외부 개발자 온보딩 시간을 줄이고, 파트너들의 SDK 통합을 지원했습니다. |

### frontend (라벨: CHAPTER 02 — TRADING UI, 기간: 2024.01 – 2024.06)
| key | en | ko |
|---|---|---|
| frontend.title | Frontend Developer · Kana Labs | 프론트엔드 개발자 · Kana Labs |
| frontend.body | Built web interfaces — leaderboards, live trading UIs, and custom charting — across options, spot, and futures. Led a codebase refactor and integrated a multi-chain Web3 stack (Arbitrum · BSC · Aptos). | 웹 인터페이스를 만들었습니다 — 옵션·현물·선물 전반의 리더보드, 라이브 트레이딩 UI, 커스텀 차팅. 코드베이스 리팩터링을 이끌고 멀티체인 Web3 스택(Arbitrum · BSC · Aptos)을 통합했습니다. |

### backend (라벨: CHAPTER 03 — THE GIANT, 기간: 2024.07 – 2026.03)
| key | en | ko |
|---|---|---|
| backend.title | Full-stack Developer — solo backend ownership · Kana Labs | 풀스택 개발자 — 백엔드 단독 담당 · Kana Labs |
| backend.pipeline.title | The pipeline | 파이프라인 |
| backend.pipeline.body | Owned a data pipeline end to end — ingestion (on-chain indexer) → ETL → read API — live in production. Rust, PostgreSQL, WebSockets, RabbitMQ. (Kana's Aptos perp DEX) | 데이터 파이프라인을 수집(온체인 인덱서) → ETL → 읽기 API까지 처음부터 끝까지 단독으로 맡아 프로덕션에서 운영했습니다. Rust · PostgreSQL · WebSockets · RabbitMQ. (Kana의 Aptos 무기한 선물 DEX) |
| backend.pipeline.stat | 2,000+ events/sec | 2,000+ events/sec |
| backend.pipeline.statSub | ~200GB over 3 months | 3개월간 약 200GB |
| backend.bots.title | The trading bots | 트레이딩 봇 |
| backend.bots.body | Deployed two automation bots — a market-making bot (Rust) that kept liquidity within <0.05% of mark price (excluding ATR) in production, and a cross-exchange arbitrage bot (Rust/Python) that turned the trading operation net-positive. | 자동화 봇 두 개를 배포했습니다 — 마크 가격 대비 0.05% 미만(ATR 구간 제외)으로 유동성을 유지한 프로덕션 마켓메이킹 봇(Rust), 그리고 트레이딩 운영을 순이익으로 전환한 거래소 간 아비트라지 봇(Rust/Python). |
| backend.scale.title | Scale | 스케일 |
| backend.scale.body | Shipped a mobile-optimized trading frontend that lifted platform adoption by 30%. Supported 20K+ participants and distributed a total of 20K APT through automated reward systems across partners (T Wallet · Factblock · AhnLab). | 모바일 최적화 트레이딩 프론트엔드로 플랫폼 채택률을 30% 높였습니다. 20K+ 참여자를 지원하며 파트너(T Wallet · Factblock · AhnLab) 전반의 자동화된 보상 시스템으로 총 20K APT를 분배했습니다. |

### saturn (라벨: CHAPTER 04 — DESTINATION, 기간: 2026.03 – present / 2026.03 – 현재)
| key | en | ko |
|---|---|---|
| saturn.transit | Then, a new mission. | 그리고, 새로운 미션. |
| saturn.title | Co-founder & Engineer · Saturn Protocol | 공동창업자 & 엔지니어 · Saturn Protocol |
| saturn.body | A yield app on Solana: deposit SOL, earn from weekly option premiums — no options expertise required. (Non-custodial covered-call vault.) | 솔라나 기반 수익형 앱: SOL을 예치하면 주간 옵션 프리미엄에서 수익이 발생합니다 — 옵션 지식이 없어도 됩니다. (논커스터디얼 커버드콜 볼트) |
| saturn.diagram.1 | Deposit SOL | SOL 예치 |
| saturn.diagram.2 | Vault issues weekly call options | 볼트가 주간 콜옵션 발행 |
| saturn.diagram.3 | Dutch auction sells options | 더치 옥션으로 옵션 판매 |
| saturn.diagram.4 | Premiums flow back as yield | 프리미엄이 수익으로 환원 |
| saturn.moons | Full stack. Contracts: three Anchor programs (vault · options-token · Dutch auction) wired with CPI, fed by Pyth prices and Helius webhooks. Backend: indexer + read API on Hono/PostgreSQL. Frontend: Next.js dApp + Solana Wallet Adapter. | 풀스택. 컨트랙트: 3개의 Anchor 프로그램(vault · options-token · Dutch auction)을 CPI로 연결하고 Pyth 가격 피드와 Helius 웹훅을 수신합니다. 백엔드: 인덱서 + 읽기 API는 Hono/PostgreSQL. 프론트엔드: dApp은 Next.js + Solana Wallet Adapter. |
| saturn.status | Live on Solana devnet (a test network) · Submitted to Colosseum 2026 · Mainnet pre-flight (audit · KMS · production RPC) | 솔라나 데브넷(테스트 네트워크) 라이브 · Colosseum 2026 제출 · 메인넷 준비 중 (감사 · KMS · 프로덕션 RPC) |

### landing (라벨: MISSION CONTROL)
| key | en | ko |
|---|---|---|
| landing.title | Landed. Say hello. | 착륙 완료. 인사 나눠요. |
| landing.resumeCta | Download resume (PDF) | 이력서 다운로드 (PDF) |

스킬 별자리 (두 locale 공통):
- Languages: Rust · TypeScript · Python
- Backend & Infra: Node.js · PostgreSQL · Redis · RabbitMQ · Docker
- Frontend: Next.js · React · TradingView · Solana Wallet Adapter
- Blockchain: Solana · Aptos · Anchor
- Trading Systems: market-making bots · cross-exchange arbitrage · options vaults · perps flows · on-chain indexers

연락처 링크 (정확한 href — Playwright 검증 대상):
- GitHub → `https://github.com/junu1229`
- LinkedIn → `https://www.linkedin.com/in/junwoooooo-kim/`
- Email → `mailto:junu1229@gmail.com`
- Resume → `/Junwoo_Kim_Resume.pdf`
