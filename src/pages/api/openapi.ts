import groupBy from 'lodash/groupBy'
import { NextApiHandler } from 'next'

import { getOpenapiReference } from '~/util/get-openapi-reference'

const handler: NextApiHandler = async (req, res) => {
  try {
    const apiReference = await getOpenapiReference(
        typeof req.query.branch === 'string' && req.query.branch
          ? req.query.branch
          : 'main',
        typeof req.query.scope === 'string' &&
          ['core', 'workspace'].includes(req.query.scope)
          ? (req.query.scope as 'core' | 'workspace')
          : 'all'
      )

    res.setHeader('Accept-Encoding', 'gzip, compress, br')
    res.end(JSON.stringify(apiReference))
  } catch (e: any) {
    res.status(500).end(
      JSON.stringify({
        error: 'Failed, probably due to an invalid branch.',
        meta: e.message
      })
    )
  }
}

export default handler
