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
  /** Indeterminate state (for indeterminate progress) */
  indeterminate?: boolean
  /** Progress value (0-100) */
  value?: number
  /** Width in pixels or percentage (e.g. "100%" / "32px") */
  width?: string
}

const ProgressBar = memo(function ProgressBar({
  ariaLabel,
  bgColor,
  className,
  color = '--color-white',
  indeterminate,
  value,
  width = '100%'
}: ProgressBarProps) {
  const clampedValue = Math.max(0, Math.min(100, value ?? 0))

  const heightClass = indeterminate ? 'h-[4px]' : 'h-[24px]'

  if (indeterminate) {
    return (
      <div
        aria-busy="true"
        aria-label={ariaLabel ?? `Loading...`}
        className={`relative flex ${heightClass} max-w-full items-center ${className ?? ''} overflow-hidden`}
        data-testid="progress-bar-container"
        role="progressbar"
        style={{
          backgroundColor: bgColor ? `var(${bgColor})` : 'var(--color-black)',
          width: `${width}`
        }}
      >
        <div
          className="h-full w-full origin-[0%_50%]"
          style={{
            animation: 'var(--animate-indeterminate)',
            backgroundColor: `var(${color})`
          }}
        />
      </div>
    )
  }

  return (
    <div
      aria-valuenow={clampedValue}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={ariaLabel ?? `${clampedValue}% complete`}
      className={`relative flex ${heightClass} max-w-full items-center ${className ?? ''}`}
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
