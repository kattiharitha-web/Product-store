import { API_BASE_URL } from '../constants/app'

const requestMessages = {
  network: "We couldn't reach the store. Check your connection and try again.",
  productsLoad: 'Unable to load products. Please try again.',
  productNotFound: 'Product not found.',
  invalidProductId: 'Invalid product ID',
}

async function fetchProducts(url, fallbackMessage, signal) {
  let response

  try {
    response = await fetch(url, { signal })
  } catch (error) {
    if (error.name === 'AbortError') throw error
    throw new Error(requestMessages.network)
  }

  if (!response.ok) {
    throw new Error(fallbackMessage)
  }

  try {
    return await response.json()
  } catch {
    throw new Error(fallbackMessage)
  }
}

export function getAllProducts(signal) {
  return fetchProducts(API_BASE_URL, requestMessages.productsLoad, signal)
}

export async function getProductById(id, signal) {
  const productId = Number(id)

  if (!Number.isSafeInteger(productId) || productId <= 0) {
    throw new Error(requestMessages.invalidProductId)
  }

  return fetchProducts(`${API_BASE_URL}/${productId}`, requestMessages.productNotFound, signal)
}
