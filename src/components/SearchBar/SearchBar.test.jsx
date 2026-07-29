import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import SearchBar from './SearchBar'

describe('SearchBar', () => {
  it('reports search terms and clears the field without losing focus', async () => {
    const user = userEvent.setup()
    const onSearch = vi.fn()

    render(<SearchBar onSearch={onSearch} />)

    const input = screen.getByRole('searchbox', { name: 'Search products' })
    await user.type(input, 'jacket')

    expect(onSearch).toHaveBeenLastCalledWith('jacket')

    await user.click(screen.getByRole('button', { name: 'Clear search' }))

    expect(input).toHaveValue('')
    expect(input).toHaveFocus()
    expect(onSearch).toHaveBeenLastCalledWith('')
  })
})
