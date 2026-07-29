import { afterEach, describe, expect, it, vi } from 'vitest'
import { getAllProducts, getProductById, requestMessages } from './api'

const product = {
  id: 1,
  title: 'Test product',
  category: 'test category',
  description: 'Test description',
  image: 'https://example.com/product.jpg',
  price: 10,
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('product API service', () => {
  it('returns a valid product list', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue([product]),
    })
    vi.stubGlobal('fetch', fetchMock)

    await expect(getAllProducts()).resolves.toEqual([product])
  })

  it('rejects invalid IDs before making a request', async () => {
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)

    await expect(getProductById('invalid')).rejects.toThrow(requestMessages.invalidProductId)
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('returns a clear error when a product is not found', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 404 }))

    await expect(getProductById(999999)).rejects.toThrow(requestMessages.productNotFound)
  })
})
