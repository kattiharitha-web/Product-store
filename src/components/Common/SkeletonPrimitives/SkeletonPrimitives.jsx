import './SkeletonPrimitives.css'

export function SkeletonBlock({ className }) {
  return <span className={`skeletonBlock ${className}`} aria-hidden="true" />
}

export function SkeletonStatus({ message }) {
  return <span className="skeletonStatus">{message}</span>
}
