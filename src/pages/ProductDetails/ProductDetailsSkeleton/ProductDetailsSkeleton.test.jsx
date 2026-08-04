import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import ProductDetailsSkeleton from './ProductDetailsSkeleton'

describe('ProductDetailsSkeleton', () => {
  it('renders an accessible product-details loading state', () => {
    const { container } = render(<ProductDetailsSkeleton />)

    expect(screen.getByRole('status', { name: 'Loading product details' })).toBeInTheDocument()
    expect(container.querySelector('.skeletonDetailsImage')).toBeInTheDocument()
    expect(container.querySelectorAll('.skeletonDescription')).toHaveLength(3)
  })
})
