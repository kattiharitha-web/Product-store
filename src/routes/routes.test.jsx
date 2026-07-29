import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import AppRoutes, { ROUTES, routeConfig } from './routes'

describe('routes', () => {
  it('defines application paths and a catch-all fallback', () => {
    expect(ROUTES.product(12)).toBe('/product/12')
    expect(routeConfig).toEqual(expect.arrayContaining([
      expect.objectContaining({ index: true }),
      expect.objectContaining({ path: ROUTES.productDetail }),
      expect.objectContaining({ path: '*' }),
    ]))
  })

  it('shows a helpful page for unknown routes', async () => {
    render(
      <MemoryRouter initialEntries={['/missing-page']} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <AppRoutes />
      </MemoryRouter>,
    )

    expect(await screen.findByRole('heading', { name: 'Page not found', level: 1 })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Return to products' })).toHaveAttribute('href', '/')
  })
})
