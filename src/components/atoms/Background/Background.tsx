export type Size = 'small' | 'medium' | 'large' | 'full'
export type AspectRatio = '1/1' | '3/2' | '4/3' | '16/9'

export interface BackgroundProps {
  aspectRatio?: AspectRatio
  position?: 'absolute' | 'relative'
  size?: Size
  src?: string
}

const sizes: Record<
  | Size
  | 'smallWithAutoHeight'
  | 'mediumWithAutoHeight'
  | 'largeWithAutoHeight'
  | 'fullWithAutoHeight',
  string
> = {
  small: `w-16 h-16`,
  medium: 'w-48 h-48',
  large: 'w-64 h-64',
  full: 'w-full h-full',
  smallWithAutoHeight: 'w-16 h-auto',
  mediumWithAutoHeight: 'w-48 h-auto',
  largeWithAutoHeight: 'w-64 h-auto',
  fullWithAutoHeight: 'w-full h-auto'
}

const aspectRatios: Record<AspectRatio, string> = {
  '1/1': 'aspect-1/1',
  '3/2': 'aspect-3/2',
  '4/3': 'aspect-4/3',
  '16/9': 'aspect-16/9'
}

const Background = ({
  aspectRatio,
  position,
  size = 'small',
  src
}: BackgroundProps) => {
  const getSizeClass = (size: Size) => {
    return aspectRatio ? sizes[`${size}WithAutoHeight`] : sizes[size]
  }

  if (!src) {
    return null
  }

  return (
    <div
      className={`${position ?? ''} ${getSizeClass(size)} ${aspectRatio ? aspectRatios[aspectRatio] : ''} bg-cover bg-center`}
      style={{ backgroundImage: `url(${src})` }}
    />
  )
}

export default Background
