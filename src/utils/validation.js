export const emailValidationMessages = {
  required: 'Email is required.',
  invalid: 'Please enter a valid email address.',
  success: 'Email format is valid. This demo does not store your email.',
}

export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateEmail(value) {
  const email = value?.trim() ?? ''

  if (!email) return emailValidationMessages.required
  if (!emailPattern.test(email)) return emailValidationMessages.invalid
  return ''
}
