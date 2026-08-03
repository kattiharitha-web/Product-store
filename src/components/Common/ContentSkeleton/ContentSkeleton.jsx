import './ContentSkeleton.css'

function Block({ className }) {
  return <span className={`skeletonBlock ${className}`} aria-hidden="true" />
}

function ProductCardSkeleton() {
  return (
    <div className="skeletonProductCard" aria-hidden="true">
      <Block className="skeletonProductImage" />
      <div className="skeletonProductBody">
        <Block className="skeletonCategory" />
        <Block className="skeletonTitle" />
        <Block className="skeletonTitle skeletonTitleShort" />
        <Block className="skeletonPrice" />
      </div>
    </div>
  )
}

export function ProductListSkeleton() {
  return (
    <section className="productListSkeleton" role="status" aria-live="polite" aria-label="Loading products">
      <span className="skeletonStatus">Loading products...</span>
      <Block className="skeletonResults" />
      <div className="skeletonProductGrid">
        {Array.from({ length: 8 }, (_, index) => <ProductCardSkeleton key={index} />)}
      </div>
    </section>
  )
}

export function ProductDetailsSkeleton() {
  return (
    <section className="productDetailsSkeleton" role="status" aria-live="polite" aria-label="Loading product details">
      <span className="skeletonStatus">Loading product details...</span>
      <Block className="skeletonDetailsImage" />
      <div className="skeletonDetailsBody">
        <Block className="skeletonCategory" />
        <Block className="skeletonDetailsTitle" />
        <Block className="skeletonDetailsTitle skeletonDetailsTitleShort" />
        <Block className="skeletonDetailsPrice" />
        <Block className="skeletonDescription" />
        <Block className="skeletonDescription" />
        <Block className="skeletonDescription skeletonDescriptionShort" />
      </div>
    </section>
  )
}
