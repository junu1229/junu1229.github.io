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
    endVh: 200,
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
