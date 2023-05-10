import groupBy from 'lodash/groupBy'
import { NextApiHandler } from 'next'

import { getOpenapiReference } from '~/util/get-openapi-reference'

const handler: NextApiHandler = async (req, res) => {
  try {
    const apiReference = await getOpenapiReference();

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
