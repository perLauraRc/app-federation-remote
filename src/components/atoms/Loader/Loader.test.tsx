import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Loader } from './Loader'

interface MockReactLoaderSpinnerOvalProps {
  ariaLabel?: string
  color?: string
  height?: string
  secondaryColor?: string
  strokeWidth?: number
  strokeWidthSecondary?: number
  visible?: boolean
  width?: string
}

const MockReactLoaderSpinnerOval = ({
  ariaLabel,
  color,
  height,
  secondaryColor,
  strokeWidth,
  strokeWidthSecondary,
  visible,
  width
}: MockReactLoaderSpinnerOvalProps) => (
  <div
    aria-busy={true}
    aria-label={ariaLabel}
    data-testid="mock-react-loader-spinner-oval"
    role="progressbar"
    style={{ display: visible === false ? 'none' : 'block' }}
  >
    <svg
      data-testid="oval-svg"
      height={height}
      data-color={color}
      data-secondary-color={secondaryColor}
      data-stroke-width={strokeWidth}
      data-stroke-width-secondary={strokeWidthSecondary}
      width={width}
    >
      <circle cx="50" cy="50" r="40" />
    </svg>
  </div>
)

// Mock 'react-loader-spinner' library
vi.mock('react-loader-spinner', () => ({
  Oval: (props: MockReactLoaderSpinnerOvalProps) => (
    <MockReactLoaderSpinnerOval {...props} />
  )
}))

describe('Loader', () => {
  it('should render spinner with default props', () => {
    const { container } = render(<Loader />)
    const loader = screen.getByRole('progressbar')
    expect(loader).toBeInTheDocument()
    expect(loader).toHaveAttribute('aria-label', 'Loading...')
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('height', '64px')
    expect(svg).toHaveAttribute('data-color', 'var(--color-moonstone)')
    expect(svg).toHaveAttribute('data-secondary-color', 'var(--color-white)')
    expect(svg).toHaveAttribute('data-stroke-width', '2')
    expect(svg).toHaveAttribute('data-stroke-width-secondary', '0.5')
    expect(svg).toHaveAttribute('width', '64px')
  })

  it('should render with custom aria label', () => {
    render(<Loader ariaLabel="Processing data..." />)
    const loader = screen.getByRole('progressbar')
    expect(loader).toBeInTheDocument()
    expect(loader).toHaveAttribute('aria-label', 'Processing data...')
  })

  it('should render spinner with small size', () => {
    const { container } = render(<Loader size="small" />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('height', '64px')
    expect(svg).toHaveAttribute('width', '64px')
  })

  it('should render spinner with medium size', () => {
    const { container } = render(<Loader size="medium" />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('height', '192px')
    expect(svg).toHaveAttribute('width', '192px')
  })

  it('should render spinner with large size', () => {
    const { container } = render(<Loader size="large" />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('height', '256px')
    expect(svg).toHaveAttribute('width', '256px')
  })

  it('should render spinner with full size', () => {
    const { container } = render(<Loader size="full" />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('height', '100%')
    expect(svg).toHaveAttribute('width', '100%')
  })

  it('should render spinner with custom colors', () => {
    const { container } = render(
      <Loader color="--color-violet" bgColor="--color-powder-blue" />
    )
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('data-color', 'var(--color-violet)')
    expect(svg).toHaveAttribute(
      'data-secondary-color',
      'var(--color-powder-blue)'
    )
  })

  it('should be visible by default', () => {
    render(<Loader />)
    const loader = screen.getByRole('progressbar')
    expect(loader).toBeVisible()
  })

  it('should be hidden when visible is false', () => {
    const { container } = render(<Loader visible={false} />)
    // expect(screen.getByRole('progressbar')).toBeFalsy()
    expect(screen.queryByRole('progressbar')).toBeNull()
    const svg = container.querySelector('svg')
    expect(svg).not.toBeVisible()
  })

  it('should apply correct stroke widths for different sizes', () => {
    const { container: smallContainer } = render(<Loader size="small" />)
    const { container: mediumContainer } = render(<Loader size="medium" />)
    const { container: largeContainer } = render(<Loader size="large" />)
    const { container: fullContainer } = render(<Loader size="full" />)
    const smallSvg = smallContainer.querySelector('svg')
    const mediumSvg = mediumContainer.querySelector('svg')
    const largeSvg = largeContainer.querySelector('svg')
    const fullSvg = fullContainer.querySelector('svg')
    expect(smallSvg).toHaveAttribute('data-stroke-width', '2')
    expect(mediumSvg).toHaveAttribute('data-stroke-width', '4')
    expect(largeSvg).toHaveAttribute('data-stroke-width', '8')
    expect(fullSvg).toHaveAttribute('data-stroke-width', '8')
    expect(smallSvg).toHaveAttribute('data-stroke-width-secondary', '0.5')
    expect(mediumSvg).toHaveAttribute('data-stroke-width-secondary', '1')
    expect(largeSvg).toHaveAttribute('data-stroke-width-secondary', '2')
    expect(fullSvg).toHaveAttribute('data-stroke-width-secondary', '2')
  })
})
