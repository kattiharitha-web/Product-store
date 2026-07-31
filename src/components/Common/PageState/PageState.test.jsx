import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import PageState from './PageState'

describe('PageState', () => {
  it('announces loading updates without showing retry controls', () => {
    render(<PageState type="loading" message="Loading products..." />)

    expect(screen.getByRole('status')).toHaveTextContent('Loading products...')
    expect(screen.queryByRole('button', { name: 'Try again' })).not.toBeInTheDocument()
  })

  it('announces errors and retries when requested', async () => {
    const user = userEvent.setup()
    const onRetry = vi.fn()

    render(<PageState type="error" message="Unable to load products." onRetry={onRetry} />)

    expect(screen.getByRole('alert')).toHaveTextContent('Unable to load products.')
    await user.click(screen.getByRole('button', { name: 'Try again' }))

    expect(onRetry).toHaveBeenCalledTimes(1)
  })
})
