const baseRedirects = [
  {
    source: '/',
    destination: '/overview',
    permanent: true,
  },
  {
    source: '/api/:path*',
    destination: '/docs/api/:path*',
    basePath: false,
    permanent: false,
  },
  {
    source: '/getting-started/clients',
    destination: '/getting-started/installation',
    permanent: false,
  },
  {
    source: '/getting-started/api-keys',
    destination: '/getting-started/installation',
    permanent: false,
  },
  {
    source: '/tutorials/load-schema',
    destination: '/recipes/load-schema',
    permanent: false,
  },
  {
    source: '/tutorials/nextjs-basic-auth',
    destination: '/getting-started/quickstart-nextjs',
    permanent: false,
  },
  {
    source: '/cli/branches-git',
    destination: '/cli/branches',
    permanent: false,
  },
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: '/docs',
  async redirects() {
    return process.env.VERCEL_ENV === 'production'
      ? [
          {
            source:
              '/:path((?!screenshots|icons|images|sounds|videos|fonts|api|docs).*)*',
            destination: 'https://xata.io/docs/:path*',
            permanent: true,
            basePath: false,
          },
          ...baseRedirects,
        ]
      : [
          /**
           * To help work on non-production envs,
           * we redirect root to /docs/overview so it
           * does not throw a 404.
           */
          {
            source: '/',
            destination: '/docs/overview',
            basePath: false,
            permanent: false,
          },
          ...baseRedirects,
        ]
  },
  async rewrites() {
    /**
     * @TODO -> bring this from old docs and remove Rewrite
     * This is legacy views from the first docs that are still
     * in use by the SDKs.
     */
    return [
      {
        source: '/api-preview/:path*',
        destination: 'https://api-preview-xata.vercel.app/:path*',
      },
    ]
  },
}

export default nextConfig
