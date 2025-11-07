import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import ProgressBar from './ProgressBar'

describe('ProgressBar', () => {
  it('renders progress with accurate values', () => {
    render(<ProgressBar value={9.5238} />)
    expect(screen.getByText('10%')).toBeInTheDocument()
    const progressBar = screen.getByRole('progressbar')
    expect(progressBar).toBeInTheDocument()
    expect(progressBar).toHaveAttribute('aria-valuenow', '9.5238')
  })

  it('renders progress with default props', () => {
    render(<ProgressBar value={33.1234} />)
    const progressBar = screen.getByRole('progressbar')
    expect(progressBar).toBeInTheDocument()
    expect(progressBar).toHaveAttribute('aria-valuenow', '33.1234')
    expect(progressBar).toHaveStyle({ width: '100%' })
  })

  it('clamps progress value to the 0-100 range', () => {
    const { rerender } = render(<ProgressBar value={150} />)
    expect(screen.getByText('100%')).toBeInTheDocument()
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
    expect(screen.getByRole('progressbar')).toHaveAttribute(
      'aria-valuenow',
      '100'
    )

    rerender(<ProgressBar value={-53.976} />)
    expect(screen.getByText('0%')).toBeInTheDocument()
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
    expect(screen.getByRole('progressbar')).toHaveAttribute(
      'aria-valuenow',
      '0'
    )
  })

  it('renders with custom width and colors', () => {
    render(
      <ProgressBar
        bgColor="--color-powder-blue"
        color="--color-white"
        width="200px"
        value={66.67}
      />
    )

    const progressBar = screen.getByRole('progressbar')
    expect(progressBar).toBeInTheDocument()
    expect(progressBar).toHaveAttribute('aria-valuenow', '66.67')
    expect(progressBar.style.backgroundColor).toBe('var(--color-powder-blue)')
    expect(progressBar.style.width).toBe('200px')
  })
})
