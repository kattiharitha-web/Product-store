import { useCallback, useEffect, useState } from 'react'

const defaultErrorMessage = 'Something went wrong. Please try again.'

export default function useAsync(request) {
  const [state, setState] = useState({ data: null, error: '', loading: true })
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    async function runRequest() {
      setState((current) => ({ ...current, error: '', loading: true }))

      try {
        const data = await request(controller.signal)

        if (!controller.signal.aborted) {
          setState({ data, error: '', loading: false })
        }
      } catch (requestError) {
        if (!controller.signal.aborted && requestError.name !== 'AbortError') {
          setState((current) => ({
            ...current,
            error: requestError.message || defaultErrorMessage,
            loading: false,
          }))
        }
      }
    }

    runRequest()
    return () => controller.abort()
  }, [request, attempt])

  const retry = useCallback(() => setAttempt((current) => current + 1), [])

  return { ...state, retry }
}
