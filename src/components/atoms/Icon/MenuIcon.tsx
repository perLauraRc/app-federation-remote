import type { IconProps } from '@src/types'

export const MenuIcon = ({ color, size }: IconProps) => (
  <svg
    fill="none"
    height={size}
    viewBox="0 0 24 24"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19.5 8.25H4.5V6.75H19.5V8.25Z"
      fill={color}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19.5 12.75H4.5V11.25H19.5V12.75Z"
      fill={color}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19.5 17.25H4.5V15.75H19.5V17.25Z"
      fill={color}
    />
  </svg>
)
