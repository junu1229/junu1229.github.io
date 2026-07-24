'use client'

import type { RefObject } from 'react'
import { gsap, useGSAP } from './gsap'
import { useMotionMode } from './MotionProvider'
import { useLocale } from '@/lib/i18n/LanguageProvider'

export function useSceneTimeline({
  scope,
  end,
  build,
  deps = [],
}: {
  scope: RefObject<HTMLElement | null>
  end: string
  build: (tl: gsap.core.Timeline) => void
  deps?: unknown[]
}) {
  const mode = useMotionMode()
  const { locale } = useLocale()

  useGSAP(
    () => {
      if (mode === 'reduced' || !scope.current) return
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scope.current,
          start: 'top top',
          end,
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      })
      build(tl)
    },
    { scope, dependencies: [mode, locale, ...deps], revertOnUpdate: true },
  )
}
