import React from 'react'

export interface ErrorPageProps {
  /** Optional action component (e.g., button) */
  action?: React.ReactNode
  /** Detailed error message */
  message?: string
  /** Error status code */
  status?: number
  /** Main error title */
  title: string
}

const ErrorPage = ({
  action,
  message = 'An unexpected error occurred. Please try again later.',
  status,
  title
}: ErrorPageProps) => {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center text-center">
      <h1 className="mt-[3rem] mb-[1rem] text-my-red-0 font-[600] text-[4rem]/[4rem]">
        {status ? `Error ${status}` : 'Error'}
      </h1>
      <h2 className="mt-[1rem] mb-[0.5rem] text-[1.75rem]/[2.25rem]">
        {title}
      </h2>
      <p className="mt-[0.5rem] mb-[2rem]">{message}</p>
      {action && <div className="mt-[2rem] mb-[3rem]">{action}</div>}
    </div>
  )
}

export default ErrorPage
