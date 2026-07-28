import { useCallback } from 'react'
import { Link, useParams } from 'react-router-dom'
import PageState from '../components/PageState'
import { ROUTES } from '../constants/app'
import useAsync from '../hooks/useAsync'
import { getProductById } from '../services/productService'
import { formatCurrency } from '../utils/formatCurrency'

export default function ProductDetailPage() {
  const { id } = useParams()
  const loadProduct = useCallback((signal) => getProductById(id, signal), [id])
  const { data: product, loading, error, retry } = useAsync(loadProduct)

  return (
    <main className="page">
      <Link to={ROUTES.home} className="back-link">
        &larr; Back to products
      </Link>

      {loading ? (
        <PageState type="loading" message="Loading product details..." />
      ) : error ? (
        <div>
          <PageState type="error" message={error} onRetry={retry} />
          <Link to={ROUTES.home} className="back-link">Return to products</Link>
        </div>
      ) : product ? (
        <article className="product-detail">
          <div className="product-detail__image-wrap">
            <img src={product.image} alt={product.title} loading="lazy" decoding="async" />
          </div>
          <div className="product-detail__body">
            <p className="product-detail__category">{product.category}</p>
            <h1>{product.title}</h1>
            <p className="product-detail__price">{formatCurrency(product.price)}</p>
            <p className="product-detail__description">{product.description}</p>
          </div>
        </article>
      ) : (
        <div className="empty-state" role="status">
          <p>Product not found.</p>
          <Link to={ROUTES.home} className="back-link">Return to products</Link>
        </div>
      )}
    </main>
  )
}
