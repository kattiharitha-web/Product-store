import { useState } from 'react'
import { emailValidationMessages, validateEmail } from '../../../utils/validation'
import './EmailValidation.css'

export default function EmailValidation() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  function handleChange({ target }) {
    const nextEmail = target?.value ?? ''

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
    setSuccessMessage(emailValidationMessages.success)
  }

  return (
    <section className="emailValidation" aria-labelledby="email-validation-title">
      <div>
        <p className="emailValidationEyebrow">Form validation</p>
        <h2 id="email-validation-title">Validate your email</h2>
        <p className="emailValidationDescription">Enter an email address to test client-side validation.</p>
      </div>
      <form noValidate onSubmit={handleSubmit}>
        <label className="emailValidationSrOnly" htmlFor="email">Email address</label>
        <div className="emailValidationRow">
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
          <button className="emailValidationButton" type="submit">Validate email</button>
        </div>
        {error && (
          <p id="email-error" className="emailValidationMessage emailValidationErrorMessage" role="alert">
            {error}
          </p>
        )}
        {successMessage && <p id="email-success" className="emailValidationMessage" role="status">{successMessage}</p>}
      </form>
    </section>
  )
}
