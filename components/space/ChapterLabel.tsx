export function ChapterLabel({ accent, children }: { accent: string; children: React.ReactNode }) {
  return (
    <p className="chapter-label" style={{ color: accent }}>
      {children}
    </p>
  )
}
