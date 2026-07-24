function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function Starfield({ count = 80, seed = 1 }: { count?: number; seed?: number }) {
  const rand = mulberry32(seed)
  const stars = Array.from({ length: Math.min(count, 80) }, (_, i) => ({
    id: i,
    x: rand() * 100,
    y: rand() * 100,
    r: 0.5 + rand() * 1.2,
    o: 0.3 + rand() * 0.6,
  }))
  return (
    <svg className="starfield" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      {stars.map((s) => (
        <circle key={s.id} cx={s.x} cy={s.y} r={s.r * 0.15} fill="#FDF6E3" opacity={s.o} />
      ))}
    </svg>
  )
}
