import { fetchEventSource } from '@microsoft/fetch-event-source'
import { useCallback, useState } from 'react'

export const useAskXataDocs = () => {
  const [answer, setAnswer] = useState<string>()
  const [records, setRecords] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>()
  const [, setAbortController] = useState<AbortController>()

  const askQuestion = useCallback((question: string) => {
    if (!question) return

    setError(undefined)
    setAnswer(undefined)
    setRecords([])
    setIsLoading(true)

    const controller = new AbortController()
    setAbortController((prev) => {
      prev?.abort()
      return controller
    })

    void fetchEventSource(`/docs/api/docs-chat`, {
      method: 'POST',
      body: JSON.stringify({ question }),
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      openWhenHidden: true,
      onmessage(ev) {
        try {
          const { text = '', records, done, error } = JSON.parse(ev.data)
          if (error) {
            setError(`Error: ${error}`)
            return
          }

          setAnswer((prev = '') => `${prev}${text}`)
          setRecords(records)
          setIsLoading(!done)
        } catch (e) {}
      },
      onclose() {
        setIsLoading(false)
      },
      onerror(error) {
        // Re-throw the error to stop the event source
        throw error
      },
    }).catch(() => {
      setIsLoading(false)
    })
  }, [])

  // Clear answer function
  const clearAnswer = useCallback(() => {
    setAnswer(undefined)
    setRecords([])
    setIsLoading(false)
  }, [])

  return { isLoading, answer, records, error, askQuestion, clearAnswer }
}
