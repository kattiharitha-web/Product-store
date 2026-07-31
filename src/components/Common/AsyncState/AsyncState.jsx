import PageState from '../PageState/PageState'

export default function AsyncState({ loading, error, retry, loadingMessage, children }) {
  if (loading) {
    return <PageState type="loading" message={loadingMessage} />
  }

  if (error) {
    return <PageState type="error" message={error} onRetry={retry} />
  }

  return children
}
