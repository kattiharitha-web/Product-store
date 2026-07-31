import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import EmailValidation from './EmailValidation'

describe('EmailValidation', () => {
  it('shows required, invalid, and success feedback for the email field', async () => {
    const user = userEvent.setup()

    render(<EmailValidation />)

    const emailInput = screen.getByRole('textbox', { name: 'Email address' })
    const submitButton = screen.getByRole('button', { name: 'Validate email' })

    await user.click(submitButton)
    expect(screen.getByRole('alert')).toHaveTextContent('Email is required.')

    await user.type(emailInput, 'invalid-email')
    await user.click(submitButton)
    expect(screen.getByRole('alert')).toHaveTextContent('Please enter a valid email address.')

    await user.clear(emailInput)
    await user.type(emailInput, 'user@example.com')
    await user.click(submitButton)
    expect(screen.getByRole('status')).toHaveTextContent('Email format is valid.')
  })
})
