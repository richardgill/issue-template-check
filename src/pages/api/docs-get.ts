import { NextRequest } from 'next/server'
import { z } from 'zod'

export const config = {
  runtime: 'edge',
}

const bodySchema = z.object({
  ids: z.string().array(),
})

const handler = async (req: NextRequest): Promise<Response> => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ message: 'Method not allowed' }), {
      status: 405,
    })
  }

  const raw = await req.json()
  const body = bodySchema.safeParse(raw)
  if (!body.success) {
    return new Response(JSON.stringify({ message: 'Invalid body' }), {
      status: 400,
    })
  }

  const { ids } = body.data
  if (ids.length === 0) {
    return new Response(JSON.stringify([]), { status: 200 })
  }

  const params = {
    filter: { $any: ids.map((id) => ({ id })) },
    columns: ['id', 'title', 'slug'],
  }

  const result = await fetch(
    `https://xata-uq2d57.eu-west-1.xata.sh/db/docs:main/tables/search/query`,
    {
      method: 'POST',
      body: JSON.stringify(params),
      headers: {
        Authorization: `Bearer ${process.env.XATA_API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  )

  const { records } = await result.json()

  return new Response(JSON.stringify(records), { status: 200 })
}

export default handler
