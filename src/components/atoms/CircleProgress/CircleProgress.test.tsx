import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import CircleProgress from './CircleProgress'

describe('CircleProgress', () => {
  it('renders progress with accurate values', () => {
    render(<CircleProgress value={9.5238} />)
    expect(screen.getByText('10%')).toBeInTheDocument()
    const progressBar = screen.getByRole('progressbar')
    expect(progressBar).toBeInTheDocument()
    expect(progressBar).toHaveAttribute('aria-valuenow', '9.5238')
  })

  it('renders progress with default props', () => {
    render(<CircleProgress value={33.1234} />)
    const progressBar = screen.getByRole('progressbar')
    expect(progressBar).toBeInTheDocument()
    expect(progressBar).toHaveAttribute('aria-valuenow', '33.1234')
    expect(progressBar).toHaveAttribute('width', '100')
  })

  it('clamps progress value to the 0-100 range', () => {
    const { rerender } = render(<CircleProgress value={150} />)
    expect(screen.getByText('100%')).toBeInTheDocument()
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
    expect(screen.getByRole('progressbar')).toHaveAttribute(
      'aria-valuenow',
      '100'
    )

    rerender(<CircleProgress value={-53.976} />)
    expect(screen.getByText('0%')).toBeInTheDocument()
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
    expect(screen.getByRole('progressbar')).toHaveAttribute(
      'aria-valuenow',
      '0'
    )
  })

  it('renders with custom size and colors', () => {
    const { container } = render(
      <CircleProgress
        bgColor="--color-powder-blue"
        color="--color-white"
        size={200}
        strokeWidth={16}
        value={75}
      />
    )

    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('width', '200')
    expect(svg).toHaveAttribute('height', '200')

    const circles = container.querySelectorAll('circle')
    expect(circles[0]).toHaveAttribute('r', String((200 - 16) / 2))
    expect(circles[0]).toHaveAttribute('stroke', 'var(--color-powder-blue)')
    expect(circles[0]).toHaveAttribute('stroke-width', '16')
    expect(circles[1]).toHaveAttribute('r', String((200 - 16) / 2))
    expect(circles[1]).toHaveAttribute('stroke', 'var(--color-white)')
    expect(circles[1]).toHaveAttribute('stroke-width', '16')
  })
})
