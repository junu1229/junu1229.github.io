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
    endVh: 250,
    build: (tl) => {
      tl.from('.sat-transit', { opacity: 0, ease: 'none', duration: 0.08 }, 0)
        .to('.sat-transit', { opacity: 0, ease: 'none', duration: 0.12 }, 0.14)
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
                <span className="sat-flow-num">{i + 1}</span>
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
