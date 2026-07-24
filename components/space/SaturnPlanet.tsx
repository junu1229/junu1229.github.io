const MOONS = [
  { cls: 'moon-1', label: 'vault', cx: 18, cy: 16, color: 'var(--teal)' },
  { cls: 'moon-2', label: 'options-token', cx: 86, cy: 10, color: 'var(--purple)' },
  { cls: 'moon-3', label: 'auction', cx: 92, cy: 78, color: 'var(--coral)' },
]

export function SaturnPlanet({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 110 100" className={className} aria-hidden="true">
      <g transform="rotate(-18 55 50)">
        <ellipse cx="55" cy="50" rx="52" ry="14" stroke="var(--ring-sand)" strokeWidth="5" fill="none" opacity="0.5" />
      </g>
      <circle cx="55" cy="50" r="28" fill="var(--saturn-gold)" />
      <path d="M 27 50 A 28 28 0 0 0 83 50 A 40 28 0 0 1 27 50 Z" fill="#e8952e" />
      <g transform="rotate(-18 55 50)">
        <path d="M 3 50 A 52 14 0 0 0 107 50" stroke="var(--ring-sand)" strokeWidth="5" fill="none" />
      </g>
      {MOONS.map((m) => (
        <g key={m.cls} className={m.cls}>
          <circle cx={m.cx} cy={m.cy} r="5" fill={m.color} />
          <text x={m.cx} y={m.cy + 11} textAnchor="middle" fontSize="4.2" fill="#FDF6E3" fontFamily="monospace">
            {m.label}
          </text>
        </g>
      ))}
    </svg>
  )
}
