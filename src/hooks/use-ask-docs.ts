import { fetchEventSource } from '@microsoft/fetch-event-source'
import { useCallback, useState } from 'react'

export const useAskXataDocs = () => {
  const [answer, setAnswer] = useState<string>()
  const [records, setRecords] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>()

  const askQuestion = useCallback((question: string) => {
    if (!question) return

    setAnswer(undefined)
    setRecords([])
    setIsLoading(true)

    void fetchEventSource(`/docs/api/docs-chat`, {
      method: 'POST',
      body: JSON.stringify({ question }),
      headers: { 'Content-Type': 'application/json' },
      onmessage(ev) {
        try {
          const { text = '', records, done } = JSON.parse(ev.data)
          setAnswer((prev = '') => `${prev}${text}`)
          setRecords(records)
          setIsLoading(!done)
        } catch (e) {}
      },
    }).catch(({ message }) => {
      setError(message)
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
