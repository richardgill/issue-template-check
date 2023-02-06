import 'isomorphic-fetch'

import { promisify } from 'util'
import { parseString } from 'xml2js'

import nextConfig from '../../next.config.mjs'
import sitemapConfig from '../../next-sitemap.config'

type SitemapJSON = {
  urlset?: {
    url: {
      loc: string
      changefreq: string
      priority: string
    }[]
  }
}
const deploymentUrl = process.env.DEPLOYMENT_URL
  ? `${process.env.DEPLOYMENT_URL}/docs/`
  : undefined
const deploymentRoot = deploymentUrl || sitemapConfig.siteUrl

const parseJson = promisify(parseString)

async function getSitemap(url: string) {
  const previewSitemap = await fetch(`${url}sitemap-0.xml`)
  const sitemap = (await parseJson(await previewSitemap.text())) as SitemapJSON

  return sitemap
}

export const getAllRoutes = async () => {
  const redirects = (await nextConfig.redirects?.()) || []
  const sitemap = await getSitemap(deploymentRoot)

  return [
    ...(sitemap.urlset?.url.map(({ loc }) => loc[0]) ?? []),
    ...redirects.map(({ source }) => deploymentRoot + source),
  ]
}

await getAllRoutes()
