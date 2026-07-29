import { Link } from 'react-router-dom'
import { ROUTES } from '../../routes/routes'
import { formatCurrency } from '../../utils/helpers'
import './ProductCard.css'

export default function ProductCard({ product }) {
  const { category, id, image, price, title } = product ?? {}
  const safeTitle = typeof title === 'string' && title.trim() ? title : 'Untitled product'
  const safeCategory = typeof category === 'string' && category.trim() ? category : 'Uncategorized'
  const hasImage = typeof image === 'string' && image.trim()
  const productId = Number(id)
  const productPath = Number.isSafeInteger(productId) && productId > 0
    ? ROUTES.product(productId)
    : ROUTES.home

  return (
    <Link
      to={productPath}
      className="productCard"
      aria-label={`View details for ${safeTitle}`}
    >
      <div className="productCardImageWrap">
        {hasImage ? (
          <img src={image} alt={safeTitle} loading="lazy" decoding="async" />
        ) : (
          <span className="productCardImageFallback">Image unavailable</span>
        )}
      </div>
      <div className="productCardBody">
        <p className="productCardCategory">{safeCategory}</p>
        <h3 className="productCardTitle">{safeTitle}</h3>
        <p className="productCardPrice">{formatCurrency(price)}</p>
      </div>
    </Link>
  )
}
