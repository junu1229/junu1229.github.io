'use client'

import { useRef } from 'react'
import { useT } from '@/lib/i18n/LanguageProvider'
import { useSceneTimeline } from '@/lib/scroll/useSceneTimeline'
import { Astronaut } from '@/components/space/Astronaut'

export function Hero() {
  const t = useT()
  const ref = useRef<HTMLElement>(null)

  useSceneTimeline({
    scope: ref,
    end: '+=200vh',
    build: (tl) => {
      // 전역 별밭을 가볍게 파랄랙스 (0→1 전환: 별밭 하강 연출)
      // 주의: useGSAP scope 밖 요소이므로 문자열 셀렉터 대신 직접 조회한다
      tl.to(document.querySelector('.starfield-fixed'), { yPercent: -8, ease: 'none' }, 0)
        .to('.hero-astronaut', { y: -60, rotate: 6, ease: 'none' }, 0)
        .to('.hero-copy', { opacity: 0, y: -80, ease: 'none' }, 0.4)
    },
  })

  return (
    <section ref={ref} data-scene="0" className="scene">
      <div className="scene-inner hero-layout">
        <div className="hero-copy">
          <h1 className="hero-title">{t.hero.title}</h1>
          <p className="hero-subtitle">{t.hero.subtitle}</p>
          <p className="hero-tagline">{t.hero.tagline}</p>
          <p className="hero-cta">{t.hero.cta} ↓</p>
        </div>
        <Astronaut pose="float" className="hero-astronaut" />
      </div>
    </section>
  )
}
