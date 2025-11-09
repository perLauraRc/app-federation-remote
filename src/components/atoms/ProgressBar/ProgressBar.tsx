import { memo } from 'react'

export interface ProgressBarProps {
  /** Label for accessibility */
  ariaLabel?: string
  /** Background color (Tailwind color variable name) */
  bgColor?: string
  /** Additional class names (Tailwind syntax) */
  className?: string
  /** Progress color (Tailwind color variable name) */
  color?: string
  /** Width in pixels or percentage (e.g. "100%" / "32px") */
  width?: string
  /** Progress value (0-100) */
  value: number
}

const ProgressBar = memo(function ProgressBar({
  ariaLabel,
  bgColor,
  className,
  color = '--color-white',
  width = '100%',
  value
}: ProgressBarProps) {
  const clampedValue = Math.max(0, Math.min(100, value))

  return (
    <div
      aria-valuenow={clampedValue}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={ariaLabel ?? `${clampedValue}% complete`}
      className={`relative flex h-[24px] max-w-full items-center ${className ?? ''}`}
      data-testid="progress-bar-container"
      role="progressbar"
      style={{
        backgroundColor: bgColor ? `var(${bgColor})` : 'var(--color-black)',
        width: `${width}`
      }}
    >
      <div
        className="h-full transition-all duration-300 ease-in-out"
        style={{
          backgroundColor: `var(${color})`,
          width: `${clampedValue}%`
        }}
      />
      <span
        className="z-gridCellHovered absolute top-[100%] text-[1rem]/8 tracking-tight text-pretty"
        style={{
          color: `var(${color})`
        }}
      >
        {Math.round(clampedValue)}%
      </span>
    </div>
  )
})

export default ProgressBar
