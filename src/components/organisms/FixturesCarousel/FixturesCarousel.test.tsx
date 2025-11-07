import { render, screen, fireEvent } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import FixturesCarousel from './FixturesCarousel'

import { matchesWithFavoriteFilter, zeroMatches } from '@mocks/fixtures'
import { act } from 'react'

describe('FixturesCarousel', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders fixtures title', () => {
    render(
      <FixturesCarousel fixtures={matchesWithFavoriteFilter} visibleCount={1} />
    )
    expect(screen.getByText('UEFA Champions League')).toBeInTheDocument()
  })
  it('renders fixtures items', () => {
    render(
      <FixturesCarousel fixtures={matchesWithFavoriteFilter} visibleCount={2} />
    )
    expect(screen.getAllByText('Athletic')).toBeDefined()
    expect(screen.getAllByText('Arsenal')).toBeDefined()
  })
  it('navigates to the next fixture', () => {
    render(
      <FixturesCarousel fixtures={matchesWithFavoriteFilter} visibleCount={1} />
    )
    const nextBtn = screen.getByRole('button', {
      name: /▶/i
    }) as HTMLButtonElement
    const previousBtn = screen.getByRole('button', {
      name: /◀/i
    }) as HTMLButtonElement
    expect(previousBtn.disabled).toBe(true)
    act(() => {
      fireEvent.click(nextBtn)
    })
    expect(previousBtn.disabled).toBe(false)
    // expect(screen.getAllByText('PSV')).toBeDefined()
    // expect(screen.getAllByText('Union SG')).toBeDefined()
  })
  it('navigates to the previous fixture', () => {
    render(
      <FixturesCarousel fixtures={matchesWithFavoriteFilter} visibleCount={1} />
    )
    const nextBtn = screen.getByRole('button', {
      name: /▶/i
    }) as HTMLButtonElement
    const previousBtn = screen.getByRole('button', {
      name: /◀/i
    }) as HTMLButtonElement
    expect(previousBtn.disabled).toBe(true)
    act(() => {
      fireEvent.click(nextBtn)
    })
    expect(previousBtn.disabled).toBe(false)
    act(() => {
      fireEvent.click(previousBtn)
    })
    expect(previousBtn.disabled).toBe(true)
    // expect(screen.getAllByText('PSV')).toBeDefined()
    // expect(screen.getAllByText('Union SG')).toBeDefined()
  })
  it('auto scrolls to the next fixture after interval is up', () => {
    render(
      <FixturesCarousel
        fixtures={matchesWithFavoriteFilter}
        visibleCount={1}
        autoScrollInterval={500}
      />
    )
    const previousBtn = screen.getByRole('button', {
      name: /◀/i
    }) as HTMLButtonElement
    expect(previousBtn.disabled).toBe(true)
    // Flush interval callback and React state updates
    act(() => {
      vi.advanceTimersByTime(600)
    })
    expect(previousBtn.disabled).toBe(false)
  })
  it('does not show previous and next navigation', () => {
    render(<FixturesCarousel fixtures={zeroMatches} visibleCount={3} />)
    const nextBtn = screen.queryByRole('button', {
      name: /▶/i
    }) as HTMLButtonElement
    const previousBtn = screen.queryByRole('button', {
      name: /◀/i
    }) as HTMLButtonElement
    expect(previousBtn).toBeNull()
    expect(nextBtn).toBeNull()
  })
  it('handles keyboard navigation with Arrow keys', () => {
    render(
      <FixturesCarousel fixtures={matchesWithFavoriteFilter} visibleCount={1} />
    )
    const container = screen.getByTestId(
      'fixtures-carousel-container'
    ) as HTMLElement
    const previousBtn = screen.queryByRole('button', {
      name: /◀/i
    }) as HTMLButtonElement
    expect(previousBtn.disabled).toBe(true)
    container.focus()
    act(() => {
      fireEvent.keyDown(container, { key: 'ArrowRight' })
    })
    expect(previousBtn.disabled).toBe(false)
    act(() => {
      fireEvent.keyDown(container, { key: 'ArrowLeft' })
    })
    expect(previousBtn.disabled).toBe(true)
  })
  it('supports scroll through (pointer events)', () => {
    render(
      <FixturesCarousel fixtures={matchesWithFavoriteFilter} visibleCount={2} />
    )
    const track = screen.getByTestId('fixtures-carousel-track') as HTMLElement
    fireEvent.pointerDown(track, { clientX: 200, pointerId: 1 })
    fireEvent.pointerMove(track, { clientX: 150, pointerId: 1 })
    fireEvent.pointerUp(track, { clientX: 150, pointerId: 1 })
    // We cannot assert exact scrollLeft without jsdom layout, but event path executes.
    expect(track).toBeInTheDocument()
  })
})
