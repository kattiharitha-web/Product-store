import { useCallback, useState } from 'react'
import EmailValidationForm from '../components/EmailValidationForm'
import PageState from '../components/PageState'
import ProductCard from '../components/ProductCard'
import SearchBar from '../components/SearchBar'
import useAsync from '../hooks/useAsync'
import { getAllProducts } from '../services/productService'

export default function ProductListPage() {
  const [query, setQuery] = useState('')
  const loadProducts = useCallback((signal) => getAllProducts(signal), [])
  const { data, loading, error, retry } = useAsync(loadProducts)
  const products = Array.isArray(data) ? data : []

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
        <PageState type="loading" message="Loading products..." />
      ) : error ? (
        <PageState type="error" message={error} onRetry={retry} />
      ) : (
        <>
          <p className="results-count" role="status" aria-live="polite">
            {filteredProducts.length} product{filteredProducts.length === 1 ? '' : 's'} found
            {query && ` matching "${query}"`}
          </p>
          {filteredProducts.length === 0 ? (
            <div className="empty-state">
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
      <EmailValidationForm />
    </main>
  )
}
