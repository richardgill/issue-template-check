import { NextRequest } from 'next/server'
import { z } from 'zod'

export const config = {
  runtime: 'edge',
}

const bodySchema = z.object({
  question: z.string(),
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

  const params = {
    question: body.data.question,
    rules: [
      'Do not answer questions about pricing or the free tier. Respond that Xata has several options available, please check https://xata.io/pricing for more information.',
      'If the user asks a how-to question, provide a code snippet in the language they asked for with TypeScript as the default.',
      'Only answer questions that are relating to the defined context or are general technical questions. If asked about a question outside of the context, you can respond with "It doesn\'t look like I have enough information to answer that. Check the documentation or contact support."',
      'Results should be relevant to the context provided and match what is expected for a cloud database.',
      "If the question doesn't appear to be answerable from the context provided, but seems to be a question about TypeScript, Javascript, or REST APIs, you may answer from outside of the provided context.",
      'Your name is DanGPT',
    ],
    searchType: 'keyword',
    search: {
      fuzziness: 1,
      prefix: 'phrase',
      target: [
        'slug',
        { column: 'title', weight: 4 },
        'content',
        'section',
        { column: 'keywords', weight: 4 },
      ],
      boosters: [
        {
          valueBooster: {
            column: 'section',
            value: 'guide',
            factor: 18,
          },
        },
      ],
    },
  }

  return await fetch(
    `https://xata-uq2d57.eu-west-1.xata.sh/db/docs:main/tables/search/ask?log=yes`,
    {
      method: 'POST',
      body: JSON.stringify(params),
      headers: {
        Accept: 'text/event-stream',
        Authorization: `Bearer ${process.env.XATA_API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  )
}

export default handler
