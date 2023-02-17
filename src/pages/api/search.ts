import markdownToTxt from 'markdown-to-txt'
import { NextApiHandler } from 'next'

import { queryFromXata } from '~/util/fetch-from-xata'

const handler: NextApiHandler = async (req, res) => {
  const { query, branch = 'main' } = req.query
  const sanitizedQuery = decodeURIComponent(String(query).toLowerCase())

  if (Array.isArray(branch)) {
    res.status(422).end()
    return
  }

  if (!sanitizedQuery) {
    res.status(304).end()
    return
  }

  const response = await queryFromXata({
    body: {
      query,
      tables: [
        {
          table: 'search',
          target: [
            { column: 'slug' },
            { column: 'title', weight: 4 },
            { column: 'content' },
            { column: 'modified_at' },
            { column: 'section' },
            { column: 'keywords', weight: 4 },
          ],
          boosters: [
            { valueBooster: { value: 'guide', column: 'section', factor: 18 } },
          ],
        },
      ],
      prefix: 'phrase',
    },
    db: 'docs',
    subpath: 'search',
  })

  const { records } = response
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
