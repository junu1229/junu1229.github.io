'use client'

import { useT } from '@/lib/i18n/LanguageProvider'

export function Landing() {
  const t = useT()

  return (
    <section data-scene="6" className="scene">
      <div className="scene-inner">
        <h2>{t.landing.label}</h2>
      </div>
    </section>
  )
}
