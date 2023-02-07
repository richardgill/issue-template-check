import fetch from 'isomorphic-fetch'

const xataBranch = process.env.XATA_BRANCH || 'development'

type Subpath =
  | `tables/${string}/data`
  | 'search'
  | `tables/${string}/query`
  | `tables/${string}/data/${string}`

type Options<T extends Record<string, unknown>> = {
  subpath?: Subpath
  body: T
  db: string
  branch?: string
}

export const queryFromXata = <T extends Record<string, unknown>>({
  branch = xataBranch,
  db,
  subpath,
  body,
}: Options<T>) => {
  branch = xataBranch
  return fetch(
    `https://xata-uq2d57.eu-west-1.xata.sh/db/${db}:${branch}/${subpath}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.XATA_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }
  ).then((response) => response.json())
}

type SearchParams = {
  branch?: string
  db: 'blog'
  body?: BodyInit
}

export const searchFromXata = ({
  branch = xataBranch,
  db,
  body,
}: SearchParams) =>
  fetch(`https://xata-uq2d57.xata.sh/db/${db}:${branch}/search`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.XATA_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body,
  }).then((response) => response.json())
