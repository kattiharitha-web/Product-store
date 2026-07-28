export default function PageState({ type, message, onRetry }) {
  const isLoading = type === 'loading'

  return (
    <div
      className={`page-state page-state--${type}`}
      role={isLoading ? 'status' : 'alert'}
      aria-live={isLoading ? 'polite' : undefined}
    >
      {isLoading && <span className="spinner" aria-hidden="true" />}
      <p>{message}</p>
      {onRetry && (
        <button type="button" className="button button--secondary" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  )
}
