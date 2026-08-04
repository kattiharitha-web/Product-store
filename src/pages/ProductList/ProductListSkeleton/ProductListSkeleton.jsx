import './ProductListSkeleton.css'
import { SkeletonBlock, SkeletonStatus } from '../../../components/Common/SkeletonPrimitives/SkeletonPrimitives'

function ProductCardSkeleton() {
  return <div className="skeletonProductCard" aria-hidden="true"><SkeletonBlock className="skeletonProductImage" /><div className="skeletonProductBody"><SkeletonBlock className="skeletonCategory" /><SkeletonBlock className="skeletonTitle" /><SkeletonBlock className="skeletonTitle skeletonTitleShort" /><SkeletonBlock className="skeletonPrice" /></div></div>
}

export default function ProductListSkeleton() {
  return <section className="productListSkeleton" role="status" aria-live="polite" aria-label="Loading products"><SkeletonStatus message="Loading products..." /><SkeletonBlock className="skeletonResults" /><div className="skeletonProductGrid">{Array.from({ length: 8 }, (_, index) => <ProductCardSkeleton key={index} />)}</div></section>
}
