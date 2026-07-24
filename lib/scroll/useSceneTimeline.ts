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
      // ScrollTrigger는 end 문자열의 'vh' 단위를 이해하지 못하고 픽셀로 오인식한다.
      // 함수 기반 end로 변환해 뷰포트 높이 기준 픽셀 값을 넘기고, refresh 시 재계산되게 한다.
      const endVh = parseFloat(end.replace(/^\+=/, ''))
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scope.current,
          start: 'top top',
          end: () => '+=' + (endVh / 100) * window.innerHeight,
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
