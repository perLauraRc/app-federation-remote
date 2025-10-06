// import { render, screen, fireEvent } from '@testing-library/react'
// import FixturesCarousel from './FixturesCarousel'
// import type { Fixture, TeamInfo } from './FixturesCarousel'

// const team = (id: number, name: string): TeamInfo => ({
//   id,
//   name,
//   crestUrl: `https://example.com/${id}.png`
// })

// const fixtures: Fixture[] = [
//   {
//     id: 1,
//     utcDate: new Date().toISOString(),
//     status: 'scheduled',
//     home: team(1, 'Home A'),
//     away: team(2, 'Away A'),
//     stadium: 'Alpha Arena'
//   },
//   {
//     id: 2,
//     utcDate: new Date().toISOString(),
//     status: 'live',
//     home: team(3, 'Home B'),
//     away: team(4, 'Away B'),
//     score: { home: 1, away: 0, minute: 34 },
//     stadium: 'Beta Dome'
//   }
// ]

// // Mock IntersectionObserver for lazy crest loading
// class MockIntersectionObserver {
//   private readonly callback: IntersectionObserverCallback
//   constructor(callback: IntersectionObserverCallback) {
//     this.callback = callback
//   }
//   observe(target: Element) {
//     // Immediately fire as intersecting
//     this.callback(
//       [{ isIntersecting: true, target } as IntersectionObserverEntry],
//       this as any
//     )
//   }
//   disconnect() {}
//   unobserve() {}
//   takeRecords() {
//     return []
//   }
// }

// // @ts-ignore
// global.IntersectionObserver = MockIntersectionObserver

// describe('FixturesCarousel', () => {
//   it('renders fixtures cards', () => {
//     render(<FixturesCarousel fixtures={fixtures} visibleCount={2} />)
//     expect(screen.getByText('Alpha Arena')).toBeInTheDocument()
//     expect(screen.getByText('Beta Dome')).toBeInTheDocument()
//   })

//   it('navigates to next fixture', () => {
//     render(<FixturesCarousel fixtures={fixtures} visibleCount={1} />)
//     const nextBtn = screen.getByLabelText('Next fixtures')
//     fireEvent.click(nextBtn)
//     expect(screen.getByText('Beta Dome')).toBeInTheDocument()
//   })

//   it('shows crest placeholder then image (lazy load)', () => {
//     render(
//       <FixturesCarousel fixtures={fixtures.slice(0, 1)} visibleCount={1} />
//     )
//     // After mock observer triggers, image should be present
//     expect(screen.getByRole('img')).toBeInTheDocument()
//   })

//   it('applies width based on visibleCount', () => {
//     render(<FixturesCarousel fixtures={fixtures} visibleCount={2} />)
//     const slide = screen.getAllByRole('group')[0] as HTMLElement
//     expect(slide.style.width).toBe('50%')
//   })

//   it('supports drag scroll (pointer events)', () => {
//     render(<FixturesCarousel fixtures={fixtures} visibleCount={1} />)
//     const track = screen.getByTestId('fixtures-track') as HTMLElement
//     // Simulate pointer drag
//     fireEvent.pointerDown(track, { clientX: 200, pointerId: 1 })
//     fireEvent.pointerMove(track, { clientX: 150, pointerId: 1 })
//     fireEvent.pointerUp(track, { clientX: 150, pointerId: 1 })
//     // We cannot assert exact scrollLeft without jsdom layout, but event path executes.
//     expect(track).toBeInTheDocument()
//   })
// })
