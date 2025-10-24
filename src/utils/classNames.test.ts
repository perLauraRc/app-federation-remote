import { describe, it, expect } from 'vitest'
import { classNames } from './classNames'

describe('classNames', () => {
  it('returns empty string when no arguments are provided', () => {
    expect(classNames()).toBe('')
  })

  it('returns a string that joins multiple class names with spaces', () => {
    expect(classNames('btn', 'btn-primary', 'mt-2')).toBe(
      'btn btn-primary mt-2'
    )
  })

  it('filters out falsy values (false, null, undefined, 0, NaN, empty string) from the returned string', () => {
    expect(
      classNames('btn', '', null, undefined, false, 0, NaN, 'active')
    ).toBe('btn active')
  })

  it('coerces non-string truthy values to strings (e.g., numbers)', () => {
    expect(classNames('w', 1.234, 'h', 50)).toBe('w 1.234 h 50')
  })
})
