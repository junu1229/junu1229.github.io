'use client'

import { useRef } from 'react'
import { useT } from '@/lib/i18n/LanguageProvider'
import { useSceneTimeline } from '@/lib/scroll/useSceneTimeline'
import { Astronaut } from '@/components/space/Astronaut'
import { Rocket } from '@/components/space/Rocket'
import { ChapterLabel } from '@/components/space/ChapterLabel'

const CHECKS = ['low-level programming', 'control systems', 'optimization']

export function Launch() {
  const t = useT()
  const ref = useRef<HTMLElement>(null)

  useSceneTimeline({
    scope: ref,
    endVh: 200,
    build: (tl) => {
      tl.from('.launch-check', { opacity: 0, x: -20, stagger: 0.15, ease: 'none' }, 0)
        .from('.launch-countdown', { opacity: 0, ease: 'none' }, 0.45)
        .to('.launch-rocket', { y: '-70vh', ease: 'power2.in' }, 0.6)
        .to('.launch-astronaut', { opacity: 0, ease: 'none' }, 0.55)
    },
  })

  return (
    <section ref={ref} data-scene="1" className="scene">
      <div className="scene-inner launch-layout">
        <div>
          <ChapterLabel accent="var(--rocket-orange)">{t.launch.label}</ChapterLabel>
          <h2>{t.launch.title}</h2>
          <p className="scene-body">{t.launch.body}</p>
          <ul className="launch-checklist" aria-hidden="true">
            {CHECKS.map((c) => (
              <li key={c} className="launch-check">✓ {c}</li>
            ))}
          </ul>
          <p className="launch-countdown">{t.launch.countdown}</p>
        </div>
        <div className="launch-pad">
          <Rocket className="launch-rocket" />
          <Astronaut pose="thumbs-up" className="launch-astronaut" />
          <div className="launch-ground" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}
