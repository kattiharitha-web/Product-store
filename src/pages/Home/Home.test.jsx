import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import Home from './Home'
import { useProducts } from '../../hooks/useProducts'

vi.mock('../../hooks/useProducts', () => ({
  useProducts: vi.fn(),
}))

const products = Array.from({ length: 11 }, (_, index) => ({
  id: index + 1,
  title: `Product ${index + 1}`,
  category: 'test category',
  description: 'Test description',
  image: '',
  price: index + 1,
}))

describe('Home', () => {
  it('shows ten products per page and displays the remaining item on the next page', async () => {
    vi.mocked(useProducts).mockReturnValue({
      products,
      loading: false,
      error: '',
      retry: vi.fn(),
    })
    const user = userEvent.setup()

    render(
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Home />
      </MemoryRouter>,
    )

    expect(screen.getByRole('main')).toHaveAttribute('aria-busy', 'false')
    expect(screen.getByRole('heading', { name: 'Browse Products', level: 1 })).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: /view details for product/i })).toHaveLength(10)
    expect(screen.queryByText('Product 11')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Next' }))

    expect(screen.getByText('Product 11')).toBeInTheDocument()
    expect(screen.getByText('Showing 11–11 of 11 products')).toBeInTheDocument()
  })
})
