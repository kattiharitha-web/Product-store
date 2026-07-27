import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import SearchBar from '../components/SearchBar'
import { getAllProducts } from '../services/productService'

export default function ProductListPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')

  useEffect(() => {
    async function loadProducts() {
      try {
        const productList = await getAllProducts()
        setProducts(productList)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  const keywords = query.toLowerCase().trim().split(/\s+/).filter(Boolean)
  const filteredProducts = products.filter((product) => {
    const searchableText = `${product.title} ${product.category}`.toLowerCase()
    return keywords.every((keyword) => searchableText.includes(keyword))
  })

  return (
    <main className="page">
      <div className="page__header">
        <h1>Browse Products</h1>
        <p className="page__subtitle">Search products by name or category.</p>
      </div>

      <SearchBar onSearch={setQuery} />

      {loading ? (
        <p className="results-count">Loading products...</p>
      ) : error ? (
        <div className="empty-state" role="alert">
          <p>{error}</p>
        </div>
      ) : (
        <>
          <p className="results-count">
            {filteredProducts.length} product{filteredProducts.length === 1 ? '' : 's'} found
            {query && ` matching "${query}"`}
          </p>
          {filteredProducts.length === 0 ? (
            <div className="empty-state" role="status">
              <p>No products found. Try adjusting your search.</p>
            </div>
          ) : (
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </>
      )}
    </main>
  )
}
