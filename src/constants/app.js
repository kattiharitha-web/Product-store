export const API_BASE_URL = 'https://fakestoreapi.com/products'

export const ROUTES = {
  home: '/',
  productDetail: '/product/:id',
  product: (id) => `/product/${id}`,
}
