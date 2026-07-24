'use client'

import { createContext, useContext, useEffect, useState } from 'react'

export type MotionMode = 'full' | 'touch' | 'reduced'

const REDUCED_Q = '(prefers-reduced-motion: reduce)'
const TOUCH_Q = '(pointer: coarse), (max-width: 767px)'

function computeMode(): MotionMode {
  if (window.matchMedia(REDUCED_Q).matches) return 'reduced'
  if (window.matchMedia(TOUCH_Q).matches) return 'touch'
  return 'full'
}

const MotionContext = createContext<MotionMode>('full')

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<MotionMode>(() =>
    typeof window === 'undefined' ? 'full' : computeMode(),
  )

  useEffect(() => {
    const reduced = window.matchMedia(REDUCED_Q)
    const touch = window.matchMedia(TOUCH_Q)
    const update = () => setMode(computeMode())
    update()
    reduced.addEventListener('change', update)
    touch.addEventListener('change', update)
    return () => {
      reduced.removeEventListener('change', update)
      touch.removeEventListener('change', update)
    }
  }, [])

  return <MotionContext.Provider value={mode}>{children}</MotionContext.Provider>
}

export function useMotionMode() {
  return useContext(MotionContext)
}
