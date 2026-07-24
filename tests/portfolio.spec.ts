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

test('파비콘이 응답한다', async ({ request }) => {
  const res = await request.get('/icon.svg')
  expect(res.status()).toBe(200)
})

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

    // vh 기반 end 문자열이 실제 뷰포트 배수만큼 핀 구간을 늘리는지 검증한다.
    // (GSAP ScrollTrigger는 end 문자열의 'vh' 단위를 이해하지 못하고 px로 오인식한다)
    const spacerHeight = await page
      .locator('.pin-spacer')
      .first()
      .evaluate((el) => el.getBoundingClientRect().height)
    const viewportHeight = page.viewportSize()!.height
    expect(spacerHeight).toBeGreaterThanOrEqual(viewportHeight * 2.5)
  })
})

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

test('Launch 장면 카피가 노출된다', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText('Fueling up: Electronics & Control Engineering')).toBeAttached()
  await expect(page.getByText('PRE-FLIGHT CHECK')).toBeAttached()
})

test('Dev-rel 장면 카피가 노출된다', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText('Developer Relations · Kana Labs')).toBeAttached()
  await expect(page.getByText('CHAPTER 01 — FIRST ORBIT')).toBeAttached()
})

test('Frontend 장면 카피가 노출된다', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText('Frontend Developer · Kana Labs')).toBeAttached()
  await expect(page.getByText('CHAPTER 02 — TRADING UI')).toBeAttached()
})

test('핵심 지표 3종이 DOM 텍스트로 존재한다', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText('2,000+ events/sec').first()).toBeAttached()
  await expect(page.getByText(/<0\.05% of mark price \(excluding ATR\)/).first()).toBeAttached()
  await expect(page.getByText(/20K\+ participants/).first()).toBeAttached()
  await expect(page.getByText('Full-stack Developer — solo backend ownership · Kana Labs')).toBeAttached()
})

test('Saturn 장면 카피·다이어그램 목록이 노출된다', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText('Co-founder & Engineer · Saturn Protocol')).toBeAttached()
  await expect(page.getByText('Then, a new mission.')).toBeAttached()
  await expect(page.locator('ol.sat-flow').getByText('Deposit SOL')).toBeAttached()
  await expect(page.locator('ol.sat-flow').getByText('Premiums flow back as yield')).toBeAttached()
  await expect(page.getByText(/Live on Solana devnet/)).toBeAttached()
})

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

test.describe('reduced motion', () => {
  test.use({ contextOptions: { reducedMotion: 'reduce' } })
  test('pin과 Lenis 없이 전체 콘텐츠가 노출된다', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('.pin-spacer')).toHaveCount(0)
    await expect(page.locator('html.lenis')).toHaveCount(0)
    await expect(page.locator('[data-scene="6"]')).toBeAttached()
  })
})

test('가로 오버플로가 없다', async ({ page }) => {
  await page.goto('/')
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  )
  expect(overflow).toBeLessThanOrEqual(0)
})

test('콘솔 에러가 없다', async ({ page, isMobile }) => {
  const errors: string[] = []
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text())
  })
  page.on('pageerror', (err) => errors.push(err.message))
  await page.goto('/')
  // mobile WebKit은 Playwright mouse.wheel 미지원(호출 시 예외) → 프로그램 스크롤로 대체.
  // 이 테스트의 의도는 "스크롤 진행 중 콘솔/페이지 에러 0" 검증이며 휠 입력 자체의 검증이 아니다.
  if (!isMobile) {
    await page.mouse.wheel(0, 5000)
  } else {
    await page.evaluate(() => window.scrollBy(0, 5000))
  }
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
