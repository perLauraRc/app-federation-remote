import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Background from './Background'
import { AspectRatios, Sizes } from './constants/Background'

describe('Background', () => {
  it('renders nothing', () => {
    render(
      <Background aspectRatio={AspectRatios['16/9']} position={'absolute'} />
    )
    expect(screen.queryByTestId('background-container')).toBeNull()
  })

  it('renders background image', () => {
    render(<Background src="https://picsum.photos/200/300" />)
    expect(screen.queryByTestId('background-container')).not.toBeNull()
    // expect(screen.getByText('10%')).toBeInTheDocument()
    // const progressBar = screen.getByRole('progressbar')
    // expect(progressBar).toBeInTheDocument()
    // expect(progressBar).toHaveAttribute('aria-valuenow', '9.5238')
  })

  it('renders background image with accurate css', () => {
    render(
      <Background
        aspectRatio={AspectRatios['16/9']}
        position="relative"
        size={Sizes.medium}
        src="https://picsum.photos/200/300"
      />
    )
    const container = screen.getByTestId('background-container')
    expect(container).toHaveStyle({
      backgroundImage: 'url(https://picsum.photos/200/300)'
    })
    expect(container).toHaveClass(
      'relative w-48 h-auto aspect-16/9 bg-cover bg-center',
      { exact: true }
    )
  })
})
