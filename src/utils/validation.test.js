import { describe, expect, it } from 'vitest'
import { formatCurrency } from './helpers'
import { emailValidationMessages, validateEmail } from './validation'

describe('validation utilities', () => {
  it('requires an email address', () => {
    expect(validateEmail('')).toBe(emailValidationMessages.required)
  })

  it('rejects an invalid email address', () => {
    expect(validateEmail('not-an-email')).toBe(emailValidationMessages.invalid)
  })

  it.each([
    'user@example.com123',
    'user@example.c0m',
    'user@example.1n',
    'user@example.c',
    'user@example.mk',
    'user@example.us',
    'user@example.in',
  ])('rejects an email with an invalid domain extension: %s', (email) => {
    expect(validateEmail(email)).toBe(emailValidationMessages.invalid)
  })

  it('accepts a valid email address', () => {
    expect(validateEmail('user@example.com')).toBe('')
  })

  it('formats valid prices and safely handles missing prices', () => {
    expect(formatCurrency(12.5)).toBe('$12.50')
    expect(formatCurrency(undefined)).toBe('Price unavailable')
  })
})
