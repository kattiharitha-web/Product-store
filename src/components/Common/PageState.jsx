import './PageState.css'

export default function PageState({ type, message, onRetry }) {
  const isLoading = type === 'loading'
  const canRetry = typeof onRetry === 'function'

  return (
    <div
      className={`pageState ${isLoading ? 'pageStateLoading' : 'pageStateError'}`}
      role={isLoading ? 'status' : 'alert'}
      aria-live={isLoading ? 'polite' : undefined}
    >
      {isLoading && <span className="pageStateSpinner" aria-hidden="true" />}
      <p>{message || 'Something went wrong. Please try again.'}</p>
      {canRetry && (
        <button type="button" className="pageStateRetryButton" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  )
}
