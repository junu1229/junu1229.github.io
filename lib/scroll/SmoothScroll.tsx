'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from './gsap'
import { useMotionMode } from './MotionProvider'
import { useLocale } from '@/lib/i18n/LanguageProvider'

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const mode = useMotionMode()
  const { locale } = useLocale()

  useEffect(() => {
    if (mode !== 'full') return
    const lenis = new Lenis({ autoRaf: false, syncTouch: false })
    const tick = (time: number) => lenis.raf(time * 1000)

    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      gsap.ticker.lagSmoothing(500, 33)
      lenis.destroy()
    }
  }, [mode])

  useEffect(() => {
    document.fonts.ready.then(() => ScrollTrigger.refresh())
  }, [locale])

  useEffect(() => {
    const onOrientation = () => ScrollTrigger.refresh()
    window.addEventListener('orientationchange', onOrientation)
    return () => window.removeEventListener('orientationchange', onOrientation)
  }, [])

  return <>{children}</>
}
