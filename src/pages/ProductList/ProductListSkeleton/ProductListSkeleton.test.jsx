import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import ProductListSkeleton from './ProductListSkeleton'

describe('ProductListSkeleton', () => {
  it('renders an accessible loading state with eight card placeholders', () => {
    const { container } = render(<ProductListSkeleton />)

    expect(screen.getByRole('status', { name: 'Loading products' })).toBeInTheDocument()
    expect(container.querySelectorAll('.skeletonProductCard')).toHaveLength(8)
  })
})
