'use client'

import { useRef } from 'react'
import { useT } from '@/lib/i18n/LanguageProvider'
import { useSceneTimeline } from '@/lib/scroll/useSceneTimeline'

export function SaturnArrival() {
  const t = useT()
  const ref = useRef<HTMLElement>(null)
  useSceneTimeline({ scope: ref, end: '+=250vh', build: () => {} })

  return (
    <section ref={ref} data-scene="5" className="scene">
      <div className="scene-inner">
        <h2>{t.saturn.label}</h2>
      </div>
    </section>
  )
}
