'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
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

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l)
    localStorage.setItem('locale', l)
    document.documentElement.lang = l
  }, [])

  // locale이 그대로면 같은 객체를 넘긴다. 매 렌더 새 객체를 넘기면 useT()를 쓰는 장면 전체가
  // 불필요하게 리렌더되고, useSceneTimeline이 locale을 의존성으로 잡고 있어 타임라인 재생성까지 번진다.
  const value = useMemo(() => ({ locale, setLocale }), [locale, setLocale])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLocale() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLocale must be used within LanguageProvider')
  return ctx
}

export function useT(): Dictionary {
  return useLocale().locale === 'ko' ? ko : en
}
