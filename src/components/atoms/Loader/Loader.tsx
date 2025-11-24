import { Oval } from 'react-loader-spinner'

export type Size = 'small' | 'medium' | 'large' | 'full'

export interface LoaderProps {
  /** Label for accessibility */
  ariaLabel?: string
  /** Background color (Tailwind color variable name) */
  bgColor?: string
  /** Loader color (Tailwind color variable name) */
  color?: string
  /** Size (small, medium, large, full) */
  size?: Size
  /** Visibility of the loader */
  visible?: boolean
}

const sizes: Record<Size, string> = {
  small: '64px',
  medium: '192px',
  large: '256px',
  full: '100%'
}

const strokeWidths: Record<Size, number> = {
  small: 2,
  medium: 4,
  large: 8,
  full: 8
}

export const Loader = ({
  ariaLabel = 'Loading...',
  bgColor = '--color-white',
  color = '--color-moonstone',
  size = 'small',
  visible
}: LoaderProps) => {
  return (
    <Oval
      animationDuration={1}
      ariaLabel={ariaLabel}
      color={`var(${color})`}
      height={sizes[size]}
      secondaryColor={`var(${bgColor})`}
      strokeWidth={strokeWidths[size]}
      strokeWidthSecondary={strokeWidths[size] / 4}
      visible={visible}
      width={sizes[size]}
    />
  )
}
