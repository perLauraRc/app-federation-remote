import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import ErrorPage from './ErrorPage'

describe('ErrorPage', () => {
  it('should render default error message along with title and standard error', () => {
    render(<ErrorPage title="Not Found" />)
    expect(screen.getByText('Error')).toBeInTheDocument()
    expect(screen.getByText('Not Found')).toBeInTheDocument()
    expect(
      screen.getByText('An unexpected error occurred. Please try again later.')
    ).toBeInTheDocument()
  })

  it('should render custom error message and error with status code', () => {
    render(
      <ErrorPage
        message="It seems the page you are trying to access does not exist."
        status={404}
        title="Not Found"
      />
    )
    expect(screen.getByText('Error 404')).toBeInTheDocument()
    expect(screen.getByText('Not Found')).toBeInTheDocument()
    expect(
      screen.getByText(
        'It seems the page you are trying to access does not exist.'
      )
    ).toBeInTheDocument()
  })
})
