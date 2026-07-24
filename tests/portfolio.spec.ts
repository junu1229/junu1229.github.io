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
  await expect(page.getByText('Deposit SOL')).toBeAttached()
  await expect(page.getByText('Premiums flow back as yield')).toBeAttached()
  await expect(page.getByText(/Live on Solana devnet/)).toBeAttached()
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
