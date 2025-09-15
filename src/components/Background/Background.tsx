type Size = 'small' | 'medium' | 'large' | 'full'

type AspectRatio = '1/1' | '3/2' | '4/3' | '16/9'

type BackgroundProps = {
  aspectRatio?: AspectRatio
  size?: Size
  src?: string
}

const sizes: Record<Size, string> = {
  small: 'w-16',
  medium: 'w-48',
  large: 'w-64',
  full: 'w-full',
}

const aspectRatios: Record<AspectRatio, string> = {
  '1/1': 'aspect-1/1',
  '3/2': 'aspect-3/2',
  '4/3': 'aspect-4/3',
  '16/9': 'aspect-16/9',
}

const Background = ({ aspectRatio = '1/1', size = 'small', src }: BackgroundProps) => {
  if (!src) {
    return null
  }

  return (
    <>
      <div
        className={`${sizes[size]} ${aspectRatios[aspectRatio]} bg-cover bg-center`}
        style={{ backgroundImage: `url(${src})` }}
      />
    </>
  );
}

export default Background