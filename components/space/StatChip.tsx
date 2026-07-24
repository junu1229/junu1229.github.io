export function StatChip({
  value,
  sub,
  accent,
  srText,
}: {
  value: string
  sub?: string
  accent: string
  srText?: string
}) {
  return (
    <div className="stat-chip" style={{ borderColor: accent }}>
      <span className="stat-value" aria-hidden={srText ? 'true' : undefined}>
        {value}
      </span>
      {srText && <span className="sr-only">{srText}</span>}
      {sub && <span className="stat-sub">{sub}</span>}
    </div>
  )
}
