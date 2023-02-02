/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // basePath: '/docs',
  async redirects() {
    return process.env.VERCEL_ENV === 'production'
      ? [
          {
            source: '/:path((?!screenshots|icons|img|sounds|fonts|api).*)*',
            destination: 'https://xata.io/docs/:path*',
            permanent: true,
          },
        ]
      : []
    // {
    //   source: '/docs',
    //   destination: '/docs/overview',
    //   permanent: false,
    // },
  },
}

export default nextConfig
