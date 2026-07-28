import { useState } from 'react'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const formMessages = {
  required: 'Email is required.',
  invalid: 'Please enter a valid email address.',
  success: 'Email format is valid. This demo does not store your email.',
}

function validateEmail(value) {
  const email = value.trim()

  if (!email) return formMessages.required
  if (!emailPattern.test(email)) return formMessages.invalid
  return ''
}

export default function EmailValidationForm() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  function handleChange(event) {
    const nextEmail = event.target.value

    setEmail(nextEmail)
    setSuccessMessage('')

    if (error) {
      setError(validateEmail(nextEmail))
    }
  }

  function handleBlur() {
    if (email.trim()) {
      setError(validateEmail(email))
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    const validationError = validateEmail(email)

    if (validationError) {
      setError(validationError)
      setSuccessMessage('')
      return
    }

    setError('')
    setSuccessMessage(formMessages.success)
  }

  return (
    <section className="email-validation" aria-labelledby="email-validation-title">
      <div>
        <p className="eyebrow">Form validation</p>
        <h2 id="email-validation-title">Validate your email</h2>
        <p>Enter an email address to test client-side validation.</p>
      </div>
      <form noValidate onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor="email">Email address</label>
        <div className="email-validation__row">
          <input
            id="email"
            type="email"
            value={email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="you@example.com"
            autoComplete="email"
            required
            aria-invalid={Boolean(error)}
            aria-describedby={error ? 'email-error' : successMessage ? 'email-success' : undefined}
          />
          <button className="button" type="submit">Validate email</button>
        </div>
        {error && (
          <p
            id="email-error"
            className="form-message form-message--error"
            role="alert"
          >
            {error}
          </p>
        )}
        {successMessage && <p id="email-success" className="form-message" role="status">{successMessage}</p>}
      </form>
    </section>
  )
}
