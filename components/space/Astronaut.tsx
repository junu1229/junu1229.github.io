export type AstronautPose = 'float' | 'thumbs-up' | 'observe' | 'flag'

const POSE_TRANSFORM: Record<AstronautPose, string> = {
  float: 'rotate(-8 50 60)',
  'thumbs-up': 'rotate(0 50 60)',
  observe: 'rotate(-4 50 60)',
  flag: 'rotate(0 50 60)',
}

export function Astronaut({ pose, className }: { pose: AstronautPose; className?: string }) {
  return (
    <svg viewBox="0 0 100 130" className={className} aria-hidden="true">
      <g transform={POSE_TRANSFORM[pose]}>
        {/* 몸통 */}
        <rect x="32" y="52" width="36" height="44" rx="14" fill="#FDF6E3" />
        <rect x="40" y="60" width="20" height="14" rx="4" fill="#FF9F43" />
        {/* 팔: thumbs-up이면 한쪽 팔 위로 */}
        {pose === 'thumbs-up' ? (
          <rect x="66" y="38" width="9" height="22" rx="4.5" fill="#FDF6E3" transform="rotate(-30 70 49)" />
        ) : (
          <circle cx="64" cy="74" r="7" fill="#FDF6E3" />
        )}
        <circle cx="36" cy="74" r="7" fill="#FDF6E3" />
        {/* 다리 */}
        <rect x="38" y="92" width="9" height="16" rx="4.5" fill="#FDF6E3" />
        <rect x="53" y="92" width="9" height="16" rx="4.5" fill="#FDF6E3" />
        {/* 헬멧 */}
        <circle cx="50" cy="34" r="24" fill="#FDF6E3" />
        <circle cx="50" cy="36" r="17" fill="#123C4F" />
        <circle cx="44" cy="31" r="5" fill="#4DD8C0" opacity="0.9" />
        {/* flag 포즈: 깃발 */}
        {pose === 'flag' && (
          <g>
            <rect x="78" y="20" width="3" height="76" fill="#FDF6E3" />
            <path d="M 81 22 L 100 30 L 81 38 Z" fill="#FF9F43" />
          </g>
        )}
      </g>
    </svg>
  )
}
