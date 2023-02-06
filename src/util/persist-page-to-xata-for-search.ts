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
  if (process.env.NODE_ENV !== 'production') {
    /**
     * Only index the page if running a prod build!
     */
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
