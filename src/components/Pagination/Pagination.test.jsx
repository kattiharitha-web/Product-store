import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import Pagination from './Pagination'

describe('Pagination', () => {
  it('exposes accessible page controls and changes to the next page', async () => {
    const user = userEvent.setup()
    const onPageChange = vi.fn()

    render(<Pagination currentPage={1} totalPages={2} onPageChange={onPageChange} />)

    expect(screen.getByRole('navigation', { name: 'Product pagination' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Previous' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Page 1' })).toHaveAttribute('aria-current', 'page')

    await user.click(screen.getByRole('button', { name: 'Next' }))

    expect(onPageChange).toHaveBeenCalledWith(2)
  })

  it('disables Next on the final page', () => {
    render(<Pagination currentPage={2} totalPages={2} onPageChange={vi.fn()} />)

    expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled()
  })
})
