import PageState from '../PageState/PageState'

export default function ProductState({ loading, error, retry, loadingMessage, loadingFallback, children }) {
  if (loading) {
    return loadingFallback || <PageState type="loading" message={loadingMessage} />
  }

  if (error) {
    return <PageState type="error" message={error} onRetry={retry} />
  }

  return children
}
