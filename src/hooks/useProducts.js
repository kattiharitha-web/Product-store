import { useCallback, useEffect, useState } from 'react'
import { getAllProducts, getProductById } from '../services/api'
import { isAbortError } from '../utils/helpers'

const defaultErrorMessage = 'Something went wrong. Please try again.'

function getErrorMessage(error) {
  const message = error?.message
  return typeof message === 'string' && message.trim() ? message : defaultErrorMessage
}

function useProductRequest(request) {
  const [state, setState] = useState({ data: null, error: '', loading: true })
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    async function runRequest() {
      setState({ data: null, error: '', loading: true })

      try {
        const data = await request(controller.signal)

        if (!controller.signal.aborted) {
          setState({ data, error: '', loading: false })
        }
      } catch (requestError) {
        if (!controller.signal.aborted && !isAbortError(requestError)) {
          setState({ data: null, error: getErrorMessage(requestError), loading: false })
        }
      }
    }

    runRequest()
    return () => controller.abort()
  }, [request, attempt])

  const retry = useCallback(() => setAttempt((currentAttempt) => currentAttempt + 1), [])

  return { ...state, retry }
}

export function useProducts() {
  const request = useCallback((signal) => getAllProducts(signal), [])
  const { data, ...state } = useProductRequest(request)

  return {
    ...state,
    products: Array.isArray(data) ? data : [],
  }
}

export function useProduct(id) {
  const request = useCallback((signal) => getProductById(id, signal), [id])
  const { data, ...state } = useProductRequest(request)

  return {
    ...state,
    product: data,
  }
}
