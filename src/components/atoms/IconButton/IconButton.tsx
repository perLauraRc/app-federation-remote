// You still need to import React when you use React's APIs directly
import React from 'react'

import type { IconProps } from '@src/types'

export interface IconButtonProps extends IconProps {
  children: React.ReactElement<IconProps> | React.ReactElement<IconProps>[]
  notifications?: number
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const IconButton = ({
  children,
  color = 'var(--color-violet)',
  notifications,
  onClick,
  size
}: IconButtonProps) => {
  const roundedNotifications = notifications ? Math.round(notifications) : 0
  // Creates an enhanced version of the children prop by cloning each child element
  // and injecting additional props (color and size) into them
  const augmentedChildren = React.Children.map(children, (child) => {
    return React.cloneElement(child, {
      color: color,
      size: size
    })
  })

  const formatNumberOfNotifications = (notifications: number): string => {
    if (notifications > 99) return '99+'
    return String(notifications)
  }

  return (
    <button className="relative flex cursor-pointer" onClick={onClick}>
      {augmentedChildren}
      {notifications && roundedNotifications > 0 && (
        <span
          className={`absolute flex items-center justify-center rounded-full tracking-tight text-white`}
          style={{
            right: size ? `-${size / 4}px` : '-8px',
            top: size ? `-${size / 4}px` : '-8px',
            fontSize: size ? `${size / 3}px` : '11px',
            height: size ? `${size / 1.75}px` : '16px',
            width: size ? `${size / 1.75}px` : '16px',
            backgroundColor: color
          }}
        >
          {formatNumberOfNotifications(roundedNotifications)}
        </span>
      )}
    </button>
  )
}

export default IconButton
