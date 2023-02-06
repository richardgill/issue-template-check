const baseRedirects = [
  {
    source: '/',
    destination: '/docs/overview',
    permanent: true,
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
            source: '/:path((?!screenshots|icons|img|sounds|fonts|api).*)*',
            destination: 'https://xata.io/docs/:path*',
            permanent: true,
            basePath: false,
          },
          ...baseRedirects,
        ]
      : baseRedirects
  },
  async rewrites() {
    return [
      {
        source: '/api-preview/:path*',
        destination: 'https://api-preview-xata.vercel.app/:path*',
      },
    ]
  },
}

export default nextConfig
