import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProductById } from '../services/productService'

export default function ProductDetailPage() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadProduct() {
      try {
        const selectedProduct = await getProductById(id)
        setProduct(selectedProduct)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [id])

  return (
    <main className="page">
      <Link to="/" className="back-link">
        &larr; Back to products
      </Link>

      {loading ? (
        <p className="results-count">Loading product...</p>
      ) : error ? (
        <div className="empty-state" role="alert">
          <p>{error}</p>
          <Link to="/" className="back-link">Return to products</Link>
        </div>
      ) : product ? (
        <article className="product-detail">
          <div className="product-detail__image-wrap">
            <img src={product.image} alt={product.title} loading="lazy" decoding="async" />
          </div>
          <div className="product-detail__body">
            <p className="product-detail__category">{product.category}</p>
            <h1>{product.title}</h1>
            <p className="product-detail__price">${product.price.toFixed(2)}</p>
            <p className="product-detail__description">{product.description}</p>
          </div>
        </article>
      ) : (
        <div className="empty-state" role="status">
          <p>Product not found.</p>
          <Link to="/" className="back-link">Return to products</Link>
        </div>
      )}
    </main>
  )
}
