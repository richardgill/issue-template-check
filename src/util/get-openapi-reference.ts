import { readFileSync } from 'fs'
import { OpenAPIObject } from 'openapi3-ts'

import { fetchFromGitHub } from './fetch-from-github'

export const getOpenapiReference = async (
  branch = 'main'
): Promise<OpenAPIObject> => {
  let org = 'xataio'

  if (branch.includes(':')) {
    org = branch.split(':')[0]
    await validateForkOfXata(org)
  }

  if (process.env.OPENAPI_FILE) {
    const fileData = readFileSync(process.env.OPENAPI_FILE, 'utf-8')
    return JSON.parse(fileData)
  }

  const documentFromGithub = await fetchFromGitHub(
    `/repos/${org}/xata/contents/openapi/public/openapi.json?ref=${
      branch.includes(':') ? branch.split(':')[1] : branch
    }`
  ).then((r) => {
    if (r.ok) {
      return r.json()
    } else {
      throw new Error('Not OK')
    }
  })
  return documentFromGithub
}

const validateForkOfXata = async (org: string) => {
  const repo = await fetchFromGitHub(`/repos/${org}/xata`).then((r) => {
    if (r.ok) {
      return r.json()
    } else {
      throw new Error('Not OK')
    }
  })

  if (repo.owner.login === 'xataio') {
    return
  }

  if (repo.source?.owner?.login !== 'xataio') {
    throw new Error('This is not a fork of our OpenAPI repo.')
  }
}
