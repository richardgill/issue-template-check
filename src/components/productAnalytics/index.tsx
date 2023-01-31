import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { datadogRumInit } from '~/util/datadog'
import { mixpanel, XATA_TELEMETRY_COOKIE } from '~/util/mixpanel'

export const ProductAnalytics: React.FC = () => {
  const router = useRouter()
  const [isDatadogLoaded, setIsDatadogLoaded] = useState(false)
  useEffect(() => {
    const userId = Cookies.get(XATA_TELEMETRY_COOKIE)
    const setupDatadog = async () => {
      // Only initialize datadog rum if user has logged in.
      if (userId) {
        mixpanel.identify(userId)
        await datadogRumInit(userId)
      }
      setIsDatadogLoaded(true)
    }
    setupDatadog().catch(() => {
      console.error('Unable to load datadog')
    })
  }, [])

  useEffect(() => {
    if (isDatadogLoaded) {
      mixpanel.trackPageView()
    }
  }, [router.asPath, isDatadogLoaded])

  return null
}
