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

test.describe('reduced motion', () => {
  test.use({ contextOptions: { reducedMotion: 'reduce' } })
  test('pin과 Lenis 없이 전체 콘텐츠가 노출된다', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('.pin-spacer')).toHaveCount(0)
    await expect(page.locator('html.lenis')).toHaveCount(0)
    await expect(page.locator('[data-scene="6"]')).toBeAttached()
  })
})
