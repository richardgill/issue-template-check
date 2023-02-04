import FormData from 'form-data'
import fetch from 'isomorphic-fetch'
import { NextApiHandler } from 'next'

import { fetchFromGitHub } from '~/util/fetch-from-github'

export type SendFeedbackRequestBody = {
  feedback: string
  route: string
  screenshot: string
  userId: string
}

const handler: NextApiHandler = async (req, res) => {
  const { feedback, route, screenshot, userId }: SendFeedbackRequestBody =
    req.body

  let imageUrl = ''

  if (screenshot) {
    const body = new FormData()
    body.append(
      'file',
      Buffer.from(screenshot.replace('data:image/jpeg;base64,', ''), 'base64')
    )

    // c-v.sh is a secure pastebin
    imageUrl = await fetch('https://c-v.sh/?from_gui=true', {
      method: 'POST',
      body: body as unknown as BodyInit
    })
      .then((r) => r.text())
      .then((r) => r.match(/https:\/\/c-v.sh\/(.*)\.(jpg|png)/gim)?.[0] ?? '')
  }

  await fetchFromGitHub('/repos/xataio/website/issues', {
    method: 'POST',
    headers: { Accept: 'application/vnd.github.v3+json' },
    body: JSON.stringify({
      title: `Feedback from Docs Site`,
      body: `## Feedback
${feedback}${
        imageUrl
          ? `
      
## Screenshot
![image](${imageUrl})`
          : ''
      }
## Route
${route}

## From
${userId}`
    })
  })

  res.end()
}

export default handler
