import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import GalleryCell from './GalleryCell'

describe('GalleryCell', () => {
  it('renders children', () => {
    render(
      <GalleryCell>
        <p>Test Children</p>
      </GalleryCell>
    )
    expect(screen.getByText('Test Children')).toBeInTheDocument()
  })

  it('renders children, description and title', () => {
    render(
      <GalleryCell description="Test Description" title="Test Title">
        <p>Test Children</p>
      </GalleryCell>
    )
    expect(screen.getByText('Test Children')).toBeInTheDocument()
    expect(screen.getByText(/Test Title/i)).toBeInTheDocument()
    expect(screen.getByText(/Test Description/i)).toBeInTheDocument()
  })
})
