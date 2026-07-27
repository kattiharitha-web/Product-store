const API_BASE_URL = 'https://fakestoreapi.com/products'

async function fetchProducts(url, fallbackMessage) {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(fallbackMessage)
  }

  return response.json()
}

export function getAllProducts() {
  return fetchProducts(API_BASE_URL, 'Unable to load products. Please try again.')
}

export async function getProductById(id) {
  if (!id || isNaN(Number(id))) {
    throw new Error('Invalid product ID')
  }
  return fetchProducts(`${API_BASE_URL}/${id}`, 'Product not found.')
}
