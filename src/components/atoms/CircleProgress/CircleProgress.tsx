import { memo } from 'react'

export interface CircleProgressProps {
  /** Label for accessibility */
  ariaLabel?: string
  /** Background circle color (Tailwind color variable name) */
  bgColor?: string
  /** Additional class names (Tailwind syntax) */
  className?: string
  /** Progress color  (Tailwind color variable name) */
  color?: string
  /** Diameter in pixels */
  size?: number
  /** Stroke width in pixels */
  strokeWidth?: number
  /** Progress value (0-100) */
  value: number
}

const CircleProgress = memo(function CircleProgress({
  ariaLabel,
  bgColor,
  className,
  color = '--color-white',
  size = 100,
  strokeWidth = 8,
  value
}: CircleProgressProps) {
  const normalizedValue = Math.max(0, Math.min(100, value))

  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - normalizedValue / 100)

  return (
    <svg
      aria-label={ariaLabel ?? `${normalizedValue}% complete`}
      aria-valuemax={100}
      aria-valuemin={0}
      aria-valuenow={normalizedValue}
      className={className}
      height={size}
      role="progressbar"
      viewBox={`0 0 ${size} ${size}`}
      width={size}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        fill="transparent"
        r={radius}
        stroke={bgColor ? `var(${bgColor})` : 'var(--color-black)'}
        strokeWidth={strokeWidth}
      />
      <circle
        className="translate-y-full -rotate-90 transform transition-all duration-300 ease-in-out"
        cx={size / 2}
        cy={size / 2}
        fill="transparent"
        r={radius}
        stroke={`var(${color})`}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="butt"
        strokeWidth={strokeWidth}
      />
      <text
        dominantBaseline="central"
        fill={`var(${color})`}
        fontWeight="bold"
        fontSize={`var(--text-2xl)`}
        stroke="transparent"
        textAnchor="middle"
        x="50%"
        y="50%"
      >
        {Math.round(normalizedValue)}%
      </text>
    </svg>
  )
})

export default CircleProgress
