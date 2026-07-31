import { API_BASE_URL } from '../utils/constants'
import { isAbortError } from '../utils/helpers'

export const requestMessages = {
  network: "We couldn't reach the store. Check your connection and try again.",
  productsLoad: 'Unable to load products. Please try again.',
  productNotFound: 'Product not found.',
  invalidProductId: 'Invalid product ID.',
}

function isProduct(value) {
  return Boolean(value) && typeof value === 'object' && Number.isSafeInteger(Number(value.id))
}

function isProductList(value) {
  return Array.isArray(value) && value.every(isProduct)
}

async function fetchProducts(url, fallbackMessage, signal, isValidPayload) {
  let response

  try {
    response = await fetch(url, { signal })
  } catch (error) {
    if (isAbortError(error)) throw error
    throw new Error(requestMessages.network, { cause: error })
  }

  if (!response?.ok) {
    const message = response?.status === 404 ? requestMessages.productNotFound : fallbackMessage
    throw new Error(message)
  }

  let data

  try {
    data = await response.json()
  } catch {
    throw new Error(fallbackMessage)
  }

  if (!isValidPayload(data)) {
    throw new Error(fallbackMessage)
  }

  return data
}

export function getAllProducts(signal) {
  return fetchProducts(API_BASE_URL, requestMessages.productsLoad, signal, isProductList)
}

export async function getProductById(id, signal) {
  const productId = Number(id)

  if (!Number.isSafeInteger(productId) || productId <= 0) {
    throw new Error(requestMessages.invalidProductId)
  }

  return fetchProducts(
    `${API_BASE_URL}/${productId}`,
    requestMessages.productNotFound,
    signal,
    isProduct,
  )
}
