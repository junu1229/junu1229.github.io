'use client'

import { LanguageProvider, useT } from '@/lib/i18n/LanguageProvider'
import { MotionProvider } from '@/lib/scroll/MotionProvider'
import { SmoothScroll } from '@/lib/scroll/SmoothScroll'
import { LanguageToggle } from './LanguageToggle'
import { Starfield } from './space/Starfield'
import { Hero } from './scenes/Hero'
import { Launch } from './scenes/Launch'
import { PlanetDevrel } from './scenes/PlanetDevrel'
import { PlanetFrontend } from './scenes/PlanetFrontend'
import { PlanetBackend } from './scenes/PlanetBackend'
import { SaturnArrival } from './scenes/SaturnArrival'
import { Landing } from './scenes/Landing'

function SkipLink() {
  const t = useT()
  return (
    <a href="#content" className="skip-link">
      {t.meta.skipLink}
    </a>
  )
}

export function PortfolioExperience() {
  return (
    <LanguageProvider>
      <MotionProvider>
        <SmoothScroll>
          <div className="starfield-fixed">
            <Starfield count={80} seed={7} />
          </div>
          <SkipLink />
          <LanguageToggle />
          <main id="content">
            <Hero />
            <Launch />
            <PlanetDevrel />
            <PlanetFrontend />
            <PlanetBackend />
            <SaturnArrival />
            <Landing />
          </main>
        </SmoothScroll>
      </MotionProvider>
    </LanguageProvider>
  )
}
