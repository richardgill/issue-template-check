import md5 from 'md5'

import { queryFromXata } from './fetch-from-xata'

type Options = {
  slug: string
  content: string
  title: string
  modified_at: string | null
}

export const persistPageToXataForSearch = async ({
  slug,
  content,
  title,
  modified_at,
}: Options) => {
  /**
   * Avoid indexing other builds in `main` branch at all costs!
   */
  if (
    // don't index in main yet
    // process.env.NODE_ENV !== 'production' &&
    process.env.XATA_API_KEY === 'main'
  ) {
    return
  }

  try {
    return await queryFromXata<Options>({
      body: {
        content,
        modified_at,
        slug,
        title,
      },
      subpath: `tables/search/data/${md5(slug)}`,
      db: 'docs',
    })
  } catch {
    // Swallow because search can be stale
  }
}
