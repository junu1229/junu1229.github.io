'use client'

import { useRef } from 'react'
import { useT } from '@/lib/i18n/LanguageProvider'
import { useSceneTimeline } from '@/lib/scroll/useSceneTimeline'

export function Hero() {
  const t = useT()
  const ref = useRef<HTMLElement>(null)
  useSceneTimeline({ scope: ref, end: '+=200vh', build: () => {} })

  return (
    <section ref={ref} data-scene="0" className="scene">
      <div className="scene-inner">
        <h1>{t.hero.title}</h1>
      </div>
    </section>
  )
}
