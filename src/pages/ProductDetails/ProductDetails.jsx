import { Link, useParams } from 'react-router-dom'
import PageState from '../../components/Common/PageState'
import { ROUTES } from '../../routes/routes'
import { useProduct } from '../../hooks/useProducts'
import { formatCurrency } from '../../utils/helpers'
import './ProductDetails.css'

export default function ProductDetails() {
  const { id } = useParams()
  const { product, loading, error, retry } = useProduct(id)
  const { category, description, image, price, title } = product ?? {}
  const safeTitle = typeof title === 'string' && title.trim() ? title : 'Untitled product'
  const safeCategory = typeof category === 'string' && category.trim() ? category : 'Uncategorized'
  const safeDescription = typeof description === 'string' && description.trim()
    ? description
    : 'No description is available for this product.'
  const hasImage = typeof image === 'string' && image.trim()

  return (
    <main id="main-content" className="productDetailsPage" tabIndex="-1" aria-busy={loading}>
      <Link to={ROUTES.home} className="productDetailsBackLink">
        &larr; Back to products
      </Link>

      {loading ? (
        <PageState type="loading" message="Loading product details..." />
      ) : error ? (
        <PageState type="error" message={error} onRetry={retry} />
      ) : product ? (
        <article className="productDetailsCard">
          <div className="productDetailsImageWrap">
            {hasImage ? (
              <img src={image} alt={safeTitle} decoding="async" />
            ) : (
              <span className="productDetailsImageFallback">Image unavailable</span>
            )}
          </div>
          <div className="productDetailsBody">
            <p className="productDetailsCategory">{safeCategory}</p>
            <h1>{safeTitle}</h1>
            <p className="productDetailsPrice">{formatCurrency(price)}</p>
            <p className="productDetailsDescription">{safeDescription}</p>
          </div>
        </article>
      ) : (
        <div className="productDetailsEmptyState" role="status">
          <p>Product not found.</p>
          <Link to={ROUTES.home} className="productDetailsBackLink">Return to products</Link>
        </div>
      )}
    </main>
  )
}
