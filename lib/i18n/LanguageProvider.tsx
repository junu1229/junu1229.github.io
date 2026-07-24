'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { en, type Dictionary, type Locale } from './en'
import { ko } from './ko'

const LanguageContext = createContext<{ locale: Locale; setLocale: (l: Locale) => void } | null>(null)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en')

  useEffect(() => {
    const stored = localStorage.getItem('locale')
    const next: Locale = stored === 'ko' ? 'ko' : 'en'
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLocaleState(next)
    document.documentElement.lang = next
  }, [])

  const setLocale = (l: Locale) => {
    setLocaleState(l)
    localStorage.setItem('locale', l)
    document.documentElement.lang = l
  }

  return <LanguageContext.Provider value={{ locale, setLocale }}>{children}</LanguageContext.Provider>
}

export function useLocale() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLocale must be used within LanguageProvider')
  return ctx
}

export function useT(): Dictionary {
  return useLocale().locale === 'ko' ? ko : en
}
