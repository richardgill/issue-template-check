import markdownToTxt from 'markdown-to-txt'
import { NextApiHandler } from 'next'

import { queryFromXata } from '~/util/fetch-from-xata'

const handler: NextApiHandler = async (req, res) => {
  const { query, branch } = req.query
  const sanitizedQuery = decodeURIComponent(String(query).toLowerCase())

  if (Array.isArray(branch)) {
    res.status(422).end()
    return
  }

  if (!sanitizedQuery) {
    res.status(304).end()
    return
  }

  const { records } = await queryFromXata({
    body: {
      query,
      tables: [
        {
          table: 'search',
          target: [{ column: 'title', weight: 3 }, { column: 'content' }],
        },
      ],
      prefix: 'phrase',
    },
    db: 'docs',
    subpath: 'search',
    branch: process.env.XATA_BRANCH || 'development',
  })

  res.setHeader('Cache-Control', 'max-age=1, stale-while-revalidate=300')

  res.end(
    JSON.stringify(
      records.map((r: { content: string; [k: string]: string }) => ({
        ...r,
        content: r.content,
        contentText: markdownToTxt(r.content ?? ''),
        xata: r.xata,
      }))
    )
  )
}

export default handler
