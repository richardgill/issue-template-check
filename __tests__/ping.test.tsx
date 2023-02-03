import { describe, expect, test } from 'vitest'

import sitemapConfig from '../next-sitemap.config'
import { getAllRoutes } from './helpers/get-all-routes'

describe('ping all routes in sitemaps and Redirects', async () => {
  const sitemap = await getAllRoutes()

  sitemap.forEach((url: string) => {
    if (!url.endsWith('/:path*')) {
      test.concurrent(`ping ${url}`, async () => {
        const ping = await fetch(url)
        expect(ping.status).toEqual(200)
        expect(ping.ok).toBeTruthy()
      })
    }
  })

  const fakeUrls = [
    sitemapConfig.siteUrl + '/fake-url9000',
    sitemapConfig.siteUrl + '/docs/fake-url9000'
  ]
  fakeUrls.forEach((fakeUrl: string) => {
    test.concurrent(`${fakeUrl} is 404`, async () => {
      const ping = await fetch(fakeUrl)
      expect(ping.status).toEqual(404)
      expect(ping.ok).toBeFalsy()
    })
  })
})
