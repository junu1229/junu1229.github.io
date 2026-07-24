'use client'

import { useT } from '@/lib/i18n/LanguageProvider'
import { LINKS, SKILL_GROUPS } from '@/lib/content'
import { Astronaut } from '@/components/space/Astronaut'
import { ChapterLabel } from '@/components/space/ChapterLabel'

const GROUP_COLORS = ['var(--saturn-gold)', 'var(--teal)', 'var(--purple)', 'var(--coral)', 'var(--rocket-orange)']

export function Landing() {
  const t = useT()
  return (
    <section data-scene="6" className="scene">
      <div className="scene-inner">
        <div className="landing-head">
          <Astronaut pose="flag" className="landing-astronaut" />
          <div>
            <ChapterLabel accent="var(--teal)">{t.landing.label}</ChapterLabel>
            <h2>{t.landing.title}</h2>
          </div>
        </div>
        <div className="skill-constellations">
          {SKILL_GROUPS.map((g, i) => (
            <div key={g.name} className="skill-group" style={{ borderColor: GROUP_COLORS[i] }}>
              <h3 className="skill-group-name" style={{ color: GROUP_COLORS[i] }}>{g.name}</h3>
              <ul className="skill-list">
                {g.items.map((item) => (
                  <li key={item} className="skill-item">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <nav className="contact-links" aria-label="Contact">
          <a href={LINKS.github}>GitHub</a>
          <a href={LINKS.linkedin}>LinkedIn</a>
          <a href={LINKS.email}>Email</a>
          <a href={LINKS.resume} download className="resume-cta">
            {t.landing.resumeCta}
          </a>
        </nav>
      </div>
    </section>
  )
}
