import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ProductDetailsSkeleton, ProductListSkeleton } from './ContentSkeleton'

describe('ContentSkeleton', () => {
  it('renders an accessible product list loading state with eight card placeholders', () => {
    const { container } = render(<ProductListSkeleton />)

    expect(screen.getByRole('status', { name: 'Loading products' })).toBeInTheDocument()
    expect(container.querySelectorAll('.skeletonProductCard')).toHaveLength(8)
  })

  it('renders an accessible product details loading state', () => {
    const { container } = render(<ProductDetailsSkeleton />)

    expect(screen.getByRole('status', { name: 'Loading product details' })).toBeInTheDocument()
    expect(container.querySelector('.skeletonDetailsImage')).toBeInTheDocument()
    expect(container.querySelectorAll('.skeletonDescription')).toHaveLength(3)
  })
})
