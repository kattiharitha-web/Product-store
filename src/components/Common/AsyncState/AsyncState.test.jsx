import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import AsyncState from './AsyncState'

describe('AsyncState', () => {
  it('shows the loading state instead of its children', () => {
    render(
      <AsyncState loading loadingMessage="Loading products...">
        <p>Product content</p>
      </AsyncState>,
    )

    expect(screen.getByRole('status')).toHaveTextContent('Loading products...')
    expect(screen.queryByText('Product content')).not.toBeInTheDocument()
  })

  it('shows the error state and retries when requested', () => {
    const retry = vi.fn()

    render(
      <AsyncState error="Unable to load products." retry={retry}>
        <p>Product content</p>
      </AsyncState>,
    )

    expect(screen.getByRole('alert')).toHaveTextContent('Unable to load products.')
    screen.getByRole('button', { name: 'Try again' }).click()
    expect(retry).toHaveBeenCalledOnce()
    expect(screen.queryByText('Product content')).not.toBeInTheDocument()
  })

  it('renders its children when there is no loading or error state', () => {
    render(
      <AsyncState loading={false} error="">
        <p>Product content</p>
      </AsyncState>,
    )

    expect(screen.getByText('Product content')).toBeInTheDocument()
  })
})
