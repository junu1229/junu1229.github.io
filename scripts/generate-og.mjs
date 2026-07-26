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
    <div style="font-size:24px;color:#8b93b8;margin-top:14px">Full-stack · Rust & TypeScript · from data pipelines to UI</div>
  </div>
</div></body></html>`

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })
await page.setContent(html)
await page.screenshot({ path: 'app/opengraph-image.png' })
await browser.close()
console.log('generated app/opengraph-image.png')
