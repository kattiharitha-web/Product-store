import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import ProductState from './ProductState'

describe('ProductState', () => {
  it('shows the loading state instead of its children', () => {
    render(<ProductState loading loadingMessage="Loading products..."><p>Product content</p></ProductState>)

    expect(screen.getByRole('status')).toHaveTextContent('Loading products...')
    expect(screen.queryByText('Product content')).not.toBeInTheDocument()
  })

  it('shows the error state and retries when requested', () => {
    const retry = vi.fn()
    render(<ProductState error="Unable to load products." retry={retry}><p>Product content</p></ProductState>)

    expect(screen.getByRole('alert')).toHaveTextContent('Unable to load products.')
    screen.getByRole('button', { name: 'Try again' }).click()
    expect(retry).toHaveBeenCalledOnce()
  })

  it('renders its children when no product state is active', () => {
    render(<ProductState loading={false} error=""><p>Product content</p></ProductState>)
    expect(screen.getByText('Product content')).toBeInTheDocument()
  })

  it('renders a supplied loading fallback', () => {
    render(<ProductState loading loadingFallback={<p>Product skeleton</p>}><p>Product content</p></ProductState>)
    expect(screen.getByText('Product skeleton')).toBeInTheDocument()
  })
})
