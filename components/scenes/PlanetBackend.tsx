'use client'

import { useRef } from 'react'
import { useT } from '@/lib/i18n/LanguageProvider'
import { useSceneTimeline } from '@/lib/scroll/useSceneTimeline'

export function PlanetBackend() {
  const t = useT()
  const ref = useRef<HTMLElement>(null)
  useSceneTimeline({ scope: ref, end: '+=300vh', build: () => {} })

  return (
    <section ref={ref} data-scene="4" className="scene">
      <div className="scene-inner">
        <h2>{t.backend.label}</h2>
      </div>
    </section>
  )
}
