import { Link } from 'react-router-dom'

export default function ProductCard({ product }) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="product-card"
      aria-label={`View details for ${product.title}`}
    >
      <div className="product-card__image-wrap">
        <img src={product.image} alt={product.title} loading="lazy" />
      </div>
      <div className="product-card__body">
        <p className="product-card__category">{product.category}</p>
        <h3 className="product-card__title">{product.title}</h3>
        <p className="product-card__price">${product.price.toFixed(2)}</p>
      </div>
    </Link>
  )
}
