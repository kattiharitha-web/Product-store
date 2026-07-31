const usdFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

export function formatCurrency(value) {
  const amount = Number(value)
  return Number.isFinite(amount) ? usdFormatter.format(amount) : 'Price unavailable'
}

export function isAbortError(error) {
  return error?.name === 'AbortError'
}
