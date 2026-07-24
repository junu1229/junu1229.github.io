'use client'

import { useRef } from 'react'
import { useT } from '@/lib/i18n/LanguageProvider'
import { useSceneTimeline } from '@/lib/scroll/useSceneTimeline'
import { Planet } from '@/components/space/Planet'
import { Rocket } from '@/components/space/Rocket'
import { ChapterLabel } from '@/components/space/ChapterLabel'

export function PlanetDevrel() {
  const t = useT()
  const ref = useRef<HTMLElement>(null)

  useSceneTimeline({
    scope: ref,
    end: '+=200vh',
    build: (tl) => {
      tl.from('.devrel-rocket', {
        motionPath: {
          path: [
            { x: -300, y: 200 },
            { x: -120, y: 60 },
            { x: 0, y: 0 },
          ],
          curviness: 1.2,
        },
        rotate: -30,
        ease: 'none',
        duration: 0.4,
      })
        .from('.devrel-copy', { opacity: 0, y: 40, ease: 'none' }, 0.35)
        .from('.devrel-doc', { opacity: 0, scale: 0, stagger: 0.1, ease: 'none' }, 0.45)
        .to('.devrel-orbit', { rotate: 40, transformOrigin: '50% 50%', ease: 'none' }, 0.5)
    },
  })

  return (
    <section ref={ref} data-scene="2" className="scene">
      <div className="scene-inner planet-layout">
        <div className="planet-visual">
          {/* 2→5 전환 규칙: 점선 궤도를 따라 로켓 이동 — 궤도 시각화 */}
          <svg viewBox="0 0 200 120" className="transit-path" aria-hidden="true">
            <path d="M 4 116 C 60 96 120 60 196 12" stroke="#3d4670" strokeWidth="2" strokeDasharray="5 5" fill="none" />
          </svg>
          <Planet size={220} color="var(--coral)" shadeColor="#d94f4f" className="devrel-planet">
            <g className="devrel-orbit">
              <g className="devrel-doc" transform="translate(50 -6)">
                <rect x="-6" y="-8" width="12" height="16" rx="2" fill="#FDF6E3" />
                <rect x="-3" y="-4" width="6" height="1.6" fill="#FF6B6B" />
                <rect x="-3" y="-1" width="6" height="1.6" fill="#FF6B6B" />
              </g>
              <g className="devrel-doc" transform="translate(104 50)">
                <rect x="-6" y="-8" width="12" height="16" rx="2" fill="#FDF6E3" />
                <rect x="-3" y="-4" width="6" height="1.6" fill="#A29BFE" />
              </g>
              <g className="devrel-doc" transform="translate(50 106)">
                <rect x="-6" y="-8" width="12" height="16" rx="2" fill="#FDF6E3" />
                <rect x="-3" y="-4" width="6" height="1.6" fill="#4DD8C0" />
              </g>
            </g>
          </Planet>
          <Rocket className="devrel-rocket planet-rocket" />
        </div>
        <div className="devrel-copy">
          <ChapterLabel accent="var(--coral)">{t.devrel.label}</ChapterLabel>
          <p className="scene-period">{t.devrel.period}</p>
          <h2>{t.devrel.title}</h2>
          <p className="scene-body">{t.devrel.body}</p>
        </div>
      </div>
    </section>
  )
}
