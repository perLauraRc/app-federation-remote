// import { render, screen } from '@testing-library/react'
// import { describe, expect, it } from 'vitest'
// import CircleProgress from './CircleProgress'

// describe('CircleProgress', () => {
//   it('renders with default props', () => {
//     render(<CircleProgress value={50} />)

//     const progress = screen.getByRole('progressbar')
//     expect(progress).toBeInTheDocument()
//     expect(progress).toHaveAttribute('aria-valuenow', '50')
//     expect(screen.getByText('50%')).toBeInTheDocument()
//   })

//   it('clamps values to 0-100 range', () => {
//     render(<CircleProgress value={150} />)
//     expect(screen.getByText('100%')).toBeInTheDocument()

//     render(<CircleProgress value={-50} />)
//     expect(screen.getByText('0%')).toBeInTheDocument()
//   })

//   it('applies custom size and colors', () => {
//     const { container } = render(
//       <CircleProgress
//         value={75}
//         size={200}
//         color="text-green-500"
//         bgColor="text-gray-300"
//       />
//     )

//     const svg = container.querySelector('svg')
//     expect(svg).toHaveAttribute('width', '200')
//     expect(svg).toHaveAttribute('height', '200')

//     const circles = container.querySelectorAll('circle')
//     expect(circles[0]).toHaveClass('text-gray-300')
//     expect(circles[1]).toHaveClass('text-green-500')
//   })

//   it('displays correct percentage text', () => {
//     render(<CircleProgress value={33.3} />)
//     expect(screen.getByText('33%')).toBeInTheDocument()
//   })

//   it('supports custom aria-label', () => {
//     render(<CircleProgress value={50} ariaLabel="Custom progress" />)
//     expect(screen.getByLabelText('Custom progress')).toBeInTheDocument()
//   })
// })
