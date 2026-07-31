import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import ProductDetails from './ProductDetails'
import { useProduct } from '../../hooks/useProducts'

vi.mock('../../hooks/useProducts', () => ({
  useProduct: vi.fn(),
}))

function renderPage() {
  return render(
    <MemoryRouter initialEntries={['/product/3']} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('ProductDetails', () => {
  it('shows the product information and accessible back navigation', () => {
    vi.mocked(useProduct).mockReturnValue({
      product: {
        id: 3,
        title: 'Canvas Backpack',
        category: 'accessories',
        description: 'A durable everyday bag.',
        image: 'https://example.com/backpack.jpg',
        price: 35,
      },
      loading: false,
      error: '',
      retry: vi.fn(),
    })

    renderPage()

    expect(screen.getByRole('main')).toHaveAttribute('aria-busy', 'false')
    expect(screen.getByRole('heading', { name: 'Canvas Backpack', level: 1 })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'Canvas Backpack' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '← Back to products' })).toHaveAttribute('href', '/')
  })

  it('shows a retryable error when the request fails', () => {
    const retry = vi.fn()
    vi.mocked(useProduct).mockReturnValue({ product: null, loading: false, error: 'Unable to load product.', retry })

    renderPage()

    expect(screen.getByRole('alert')).toHaveTextContent('Unable to load product.')
    expect(screen.getByRole('button', { name: 'Try again' })).toBeInTheDocument()
  })

  it('shows an image fallback when the product image cannot be loaded', () => {
    vi.mocked(useProduct).mockReturnValue({
      product: {
        id: 3,
        title: 'Canvas Backpack',
        category: 'accessories',
        description: 'A durable everyday bag.',
        image: 'https://example.com/backpack.jpg',
        price: 35,
      },
      loading: false,
      error: '',
      retry: vi.fn(),
    })

    renderPage()
    fireEvent.error(screen.getByRole('img', { name: 'Canvas Backpack' }))

    expect(screen.getByText('Image unavailable')).toBeInTheDocument()
  })
})
