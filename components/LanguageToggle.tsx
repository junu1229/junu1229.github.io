'use client'

import { useLocale, useT } from '@/lib/i18n/LanguageProvider'

export function LanguageToggle() {
  const { locale, setLocale } = useLocale()
  const t = useT()
  return (
    <button
      type="button"
      className="lang-toggle"
      aria-label={t.meta.languageToggle}
      onClick={() => setLocale(locale === 'en' ? 'ko' : 'en')}
    >
      {locale === 'en' ? 'EN | KR' : 'KR | EN'}
    </button>
  )
}
