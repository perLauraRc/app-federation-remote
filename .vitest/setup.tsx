import { vi } from 'vitest'

/******************************************************************************************
 * Global Mocks for third party libraries imported across multiple modules that may cause
 * issues on testing other "independent" modules, like being evaluated when importing from
 * a barrel file another module (it processes all the export statements)
 ******************************************************************************************/
// Mock interface
interface MockComponentProps {
  test?: boolean
}

// Global Mock 'react-loader-spinner' library
vi.mock('react-loader-spinner', () => ({
  Oval: (props: MockComponentProps) => (
    <div data-testid="mocked-loader" {...props} />
  )
}))

import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

afterEach(() => {
  cleanup()
})
