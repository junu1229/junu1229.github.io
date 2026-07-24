'use client'

import { useRef } from 'react'
import { useT, useLocale } from '@/lib/i18n/LanguageProvider'
import { useMotionMode } from '@/lib/scroll/MotionProvider'
import { gsap, useGSAP } from '@/lib/scroll/gsap'
import { ChapterLabel } from '@/components/space/ChapterLabel'
import { StatChip } from '@/components/space/StatChip'
import { Rocket } from '@/components/space/Rocket'

const WALLET_COUNT = 24 // 지갑 glyph — 장면당 40개 상한 이내

export function PlanetBackend() {
  const t = useT()
  const { locale } = useLocale()
  const mode = useMotionMode()
  const ref = useRef<HTMLElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      if (!ref.current) return
      if (mode !== 'full') {
        ref.current.removeAttribute('data-animated')
        return
      }
      ref.current.setAttribute('data-animated', 'true')
      const tl = gsap.timeline({
        scrollTrigger: {
          // ScrollTrigger는 end 문자열의 'vh' 단위를 픽셀로 오인식하므로 함수 기반으로 변환한다.
          trigger: ref.current, start: 'top top', end: () => '+=' + 3 * window.innerHeight,
          scrub: true, pin: true, anticipatePin: 1,
        },
      })
      // Beat 1 (0–33%): 파이프라인 + 카운터 (허용 예외: textContent)
      const counter = { v: 0 }
      tl.from('.be-beat-1', { opacity: 0, ease: 'none', duration: 0.05 }, 0)
        .from('.be-pipe', { scaleX: 0, transformOrigin: 'left', stagger: 0.04, ease: 'none', duration: 0.15 }, 0.02)
        .from('.be-particle', { opacity: 0, x: -30, stagger: 0.01, ease: 'none', duration: 0.1 }, 0.06)
        .to(counter, {
          v: 2000, ease: 'none', duration: 0.2,
          onUpdate: () => {
            if (counterRef.current)
              counterRef.current.textContent = `${Math.round(counter.v).toLocaleString('en-US')}+`
          },
        }, 0.05)
        .to('.be-beat-1', { opacity: 0, ease: 'none', duration: 0.06 }, 0.30)
      // Beat 2 (33–66%): 봇 + P&L 게이지 (transform만)
      tl.from('.be-beat-2', { opacity: 0, ease: 'none', duration: 0.06 }, 0.36)
        .from('.be-quote', { scaleY: 0, transformOrigin: 'bottom', stagger: 0.02, ease: 'none', duration: 0.12 }, 0.44)
        .fromTo('.be-pnl-needle', { rotate: -60, transformOrigin: '50% 100%' }, { rotate: 45, transformOrigin: '50% 100%', ease: 'none', duration: 0.15 }, 0.50)
        .to('.be-beat-2', { opacity: 0, ease: 'none', duration: 0.06 }, 0.63)
      // Beat 3 (66–100%): 스케일 — 지갑 낙하
      tl.from('.be-beat-3', { opacity: 0, ease: 'none', duration: 0.06 }, 0.69)
        .from('.be-wallet', { y: -40, opacity: 0, stagger: 0.008, ease: 'none', duration: 0.1 }, 0.75)
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
          <Rocket className="be-rocket" />
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
                <rect className="be-pnl-needle" x="-1.5" y="-24" width="3" height="24" fill="var(--saturn-gold)" />
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
