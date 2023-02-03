const pickRoute = () => {
  // if it's production deployment
  if (process.env.VERCEL_ENV === 'production') {
    return 'https://xata.io/docs/'

    // if it's Vercel Preview Build (Generates the sitemap with proper URL)
  } else if (process.env.VERCEL_URL) {
    return 'https://' + process.env.VERCEL_URL

    // if it's Github Actions with tests (this is VERCEL_URL + protocol)
  } else if (process.env.TEST_URL) {
    return process.env.TEST_URL
  }

  return 'https://xata.io/docs/'
}

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  // each preview generates the sitemap with the appropriate absolute URL
  // this is important for route-ping tests
  siteUrl: pickRoute(),
  generateRobotsTxt: true,
}
