import { useEffect, useState } from 'react'
import { z } from 'zod'

const xataDocsResponse = z.array(
  z.object({ id: z.string(), title: z.string(), slug: z.string() })
)

export type XataDocsResponse = z.infer<typeof xataDocsResponse>

export const useGetXataDocs = (ids: string[] = []) => {
  const [data, setData] = useState<XataDocsResponse>([])

  useEffect(() => {
    if (ids?.length === 0) {
      return
    }

    const fetchData = async () => {
      const response = await fetch(`/api/docs-get`, {
        method: 'POST',
        body: JSON.stringify({ ids }),
        headers: { 'Content-Type': 'application/json' },
      })
      const data = await response.json()
      setData(xataDocsResponse.parse(data))
    }
    fetchData()
  }, [ids])

  return data
}
