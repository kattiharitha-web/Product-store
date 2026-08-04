export const emailValidationMessages = {
  required: 'Email is required.',
  invalid: 'Please enter a valid email address.',
  success: 'Email format is valid. This demo does not store your email.',
}

// This form accepts only `.com` email addresses.
export const emailPattern = /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*\.com$/i

export function validateEmail(value) {
  const email = value?.trim() ?? ''

  if (!email) return emailValidationMessages.required
  if (!emailPattern.test(email)) return emailValidationMessages.invalid
  return ''
}
