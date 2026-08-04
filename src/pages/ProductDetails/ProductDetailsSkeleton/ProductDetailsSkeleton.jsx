import './ProductDetailsSkeleton.css'
import { SkeletonBlock, SkeletonStatus } from '../../../components/Common/SkeletonPrimitives/SkeletonPrimitives'

export default function ProductDetailsSkeleton() {
  return <section className="productDetailsSkeleton" role="status" aria-live="polite" aria-label="Loading product details"><SkeletonStatus message="Loading product details..." /><SkeletonBlock className="skeletonDetailsImage" /><div className="skeletonDetailsBody"><SkeletonBlock className="skeletonCategory" /><SkeletonBlock className="skeletonDetailsTitle" /><SkeletonBlock className="skeletonDetailsTitle skeletonDetailsTitleShort" /><SkeletonBlock className="skeletonDetailsPrice" /><SkeletonBlock className="skeletonDescription" /><SkeletonBlock className="skeletonDescription" /><SkeletonBlock className="skeletonDescription skeletonDescriptionShort" /></div></section>
}
