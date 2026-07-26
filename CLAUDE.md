# junu1229.github.io

Kurzgesagt 스타일 우주 스크롤리텔링 포트폴리오. Next.js(App Router) 정적 export +
GSAP ScrollTrigger/Lenis. 일러스트는 전부 인라인 SVG, EN/KR 클라이언트 토글.

## Commands

- `npm run dev` — 로컬 개발 서버
- `npm run typecheck && npm run lint && npm run build && npm run test:e2e` — 전체 게이트
- e2e는 빌드된 out/을 대상으로 함 (build 먼저). 기준: 35 passed, 1 skipped

## Architecture

- `app/` — layout(폰트·메타데이터)·page는 Server Component, 조립만
- `components/PortfolioExperience.tsx` — "use client" 경계 시작점
- `components/scenes/` — 장면 7개 (`data-scene="0"`~`"6"`), `components/space/` — 공용 SVG 부품
- `lib/i18n/` — en.ts·ko.ts 사전 + LanguageProvider(useT/useLocale), `lib/scroll/` — GSAP·Lenis·MotionMode
- `docs/superpowers/specs/` — 스펙 v3가 권위 문서

## Gotchas

- **카피 동결 계약**: `lib/i18n/en.ts`·`ko.ts`는 스펙 부록 A와 byte-exact로 일치해야 함.
  카피를 바꾸려면 스펙도 함께 갱신. 테스트 strict-mode 충돌은 로케이터 스코프로 해결 (카피 수정 금지)
- ScrollTrigger는 end 문자열의 `vh`를 **픽셀로 오파싱** — `useSceneTimeline`의 `endVh: number` API를 쓸 것
- 첫 paint는 항상 영어 (hydration 계약) — render 중 localStorage 접근 금지
- Scene 4(PlanetBackend)만 useSceneTimeline 미사용 — useGSAP 콜백에서 `data-animated`를 동기 설정 (순서 중요)
- 애니메이션은 transform·opacity만 + 예외 2가지: 카운터 textContent, SVG stroke-dash 드로잉
- 별 노드 총량 ≤80 (전역 Starfield 1개), 이동 glyph 장면당 ≤40 — e2e가 검증함

## Deploy

main push → GitHub Actions(게이트 통과 시 자동 배포). Pages 소스는 "GitHub Actions" 모드로 설정됨.

## Wrap-up anchors

- https://junu1229.github.io 이 200으로 응답하는가?
- 테스트 기준(35 passed/1 skipped)이 유지되는가?
- lib/i18n ↔ 스펙 부록 A 동기화가 깨지지 않았는가?
- 미룬 폴리시 목록(메모리 portfolio-rebuild-2026-07)이 처리됐는가?
