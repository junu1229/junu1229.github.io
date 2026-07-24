export function Rocket({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 120" className={className} aria-hidden="true">
      <path d="M 30 4 C 42 20 44 40 44 58 L 16 58 C 16 40 18 20 30 4 Z" fill="#FDF6E3" />
      <path d="M 30 4 C 36 20 38 40 38 58 L 30 58 Z" fill="#e8dcc4" />
      <circle cx="30" cy="34" r="8" fill="#123C4F" stroke="#4DD8C0" strokeWidth="2.5" />
      <path d="M 16 58 L 4 84 L 16 76 Z" fill="#FF6B6B" />
      <path d="M 44 58 L 56 84 L 44 76 Z" fill="#FF6B6B" />
      <rect x="16" y="58" width="28" height="14" rx="4" fill="#FF9F43" />
      <path className="rocket-flame" d="M 22 72 L 30 96 L 38 72 Z" fill="#FF9F43" />
    </svg>
  )
}
