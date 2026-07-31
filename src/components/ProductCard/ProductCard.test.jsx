import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import ProductCard from './ProductCard'

const product = {
  id: 7,
  title: 'Classic Jacket',
  category: 'clothing',
  image: 'https://example.com/jacket.jpg',
  price: 49.99,
}

describe('ProductCard', () => {
  it('links to accessible product details and describes its image', () => {
    render(
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ProductCard product={product} />
      </MemoryRouter>,
    )

    expect(screen.getByRole('link', { name: 'View details for Classic Jacket' })).toHaveAttribute('href', '/product/7')
    expect(screen.getByRole('img', { name: 'Classic Jacket' })).toHaveAttribute('src', product.image)
    expect(screen.getByText('$49.99')).toBeInTheDocument()
  })

  it('provides safe fallback content when product data is incomplete', () => {
    render(
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ProductCard product={{ id: 0 }} />
      </MemoryRouter>,
    )

    expect(screen.getByRole('link', { name: 'View details for Untitled product' })).toHaveAttribute('href', '/')
    expect(screen.getByText('Image unavailable')).toBeInTheDocument()
  })

  it('shows the fallback when an image fails to load', () => {
    render(
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ProductCard product={product} />
      </MemoryRouter>,
    )

    fireEvent.error(screen.getByRole('img', { name: 'Classic Jacket' }))

    expect(screen.getByText('Image unavailable')).toBeInTheDocument()
  })
})
