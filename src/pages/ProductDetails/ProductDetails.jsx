import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import AsyncState from '../../components/Common/AsyncState/AsyncState'
import { ProductDetailsSkeleton } from '../../components/Common/ContentSkeleton/ContentSkeleton'
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
  const [failedImage, setFailedImage] = useState(null)
  let pageContent

  if (product) {
    pageContent = (
      <article className="productDetailsCard">
        <div className="productDetailsImageWrap">
          {hasImage && failedImage !== image ? (
            <img src={image} alt={safeTitle} decoding="async" onError={() => setFailedImage(image)} />
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
    )
  } else {
    pageContent = (
      <div className="emptyState" role="status">
        <p>Product not found.</p>
        <Link to={ROUTES.home} className="productDetailsBackLink">Return to products</Link>
      </div>
    )
  }

  return (
    <main id="main-content" className="pageContainer productDetailsPage" tabIndex="-1" aria-busy={loading}>
      <Link to={ROUTES.home} className="productDetailsBackLink">
        &larr; Back to products
      </Link>

      <AsyncState
        loading={loading}
        error={error}
        retry={retry}
        loadingMessage="Loading product details..."
        loadingFallback={<ProductDetailsSkeleton />}
      >
        {pageContent}
      </AsyncState>
    </main>
  )
}
