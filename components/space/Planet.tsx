export function Planet({
  size,
  color,
  shadeColor,
  className,
  children,
}: {
  size: number
  color: string
  shadeColor: string
  className?: string
  children?: React.ReactNode
}) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} aria-hidden="true">
      <circle cx="50" cy="50" r="44" fill={color} />
      {/* 플랫 2톤 셰이딩: 밑면 진한 톤 */}
      <path d="M 6 50 A 44 44 0 0 0 94 50 A 60 44 0 0 1 6 50 Z" fill={shadeColor} />
      {children}
    </svg>
  )
}
