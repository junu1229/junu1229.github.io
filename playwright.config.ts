import { defineConfig, devices } from '@playwright/test'

// 포트는 PW_PORT로 덮어쓸 수 있다. 기본값이 3000이 아닌 이유는 아래 reuseExistingServer 주석 참고.
// `??`가 아닌 `||`를 쓰는 이유: PW_PORT가 빈 문자열이거나 숫자로 파싱되지 않으면(Number('')는 0,
// Number('abc')는 NaN) 조용히 깨진 baseURL이 되는 것을 막기 위해 falsy 값을 모두 기본값으로 폴백한다.
const port = Number(process.env.PW_PORT) || 3100
const baseURL = `http://127.0.0.1:${port}`

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  use: { baseURL },
  webServer: {
    command: `npx serve out -l ${port}`,
    url: baseURL,
    // 항상 자체 서버를 띄운다. 재사용을 허용하면 같은 포트를 점유한 **다른 프로젝트**의 앱을
    // 그대로 테스트 대상으로 삼는다 — 이 경우 36개 테스트가 조용히 엉뚱한 사이트를 검사하며,
    // 실패 메시지만 봐서는 원인을 알 수 없다. 포트가 막혀 있으면 시끄럽게 실패하는 편이 낫다.
    reuseExistingServer: false,
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile-webkit', use: { ...devices['iPhone 13'] } },
  ],
})
