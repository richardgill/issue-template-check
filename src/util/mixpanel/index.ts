import mixpanelBrowser, { Dict } from 'mixpanel-browser'
import router from 'next/router'

import { isClient } from '~/lib/constants'

import { getDatadogContext } from '../datadog'
import { deployedVersion } from '../version'
import { MixpanelEvent } from './events'

// This cookie is also reference in the frontend. Do not change one without changing the other.
export const XATA_TELEMETRY_COOKIE = 'xata-telemetry'

const mixpanelKey = process.env.NEXT_PUBLIC_MIXPANEL_PUBLIC_KEY

// See: https://docs.datadoghq.com/synthetics/guide/identify_synthetics_bots/?tab=browsertests#browser-variables
const isDataDogSynthetics = // @ts-ignore-next-line
  isClient && window._DATADOG_SYNTHETICS_BROWSER !== undefined

if (mixpanelKey && !isDataDogSynthetics) {
  mixpanelBrowser.init(mixpanelKey, {
    api_host: '/mp',
    ip: true,
    disable_persistence: true,
    ignore_dnt: true // whether to ignore or respect the web browser's Do Not Track setting
  })
}

type MixpanelInstance = {
  identify: (id: string) => void
  track: (event: MixpanelEvent, props?: Dict) => void
  trackPageView: () => void
}

const disabledMixpanel: MixpanelInstance = {
  identify: () => null,
  track: () => null,
  trackPageView: () => null
}

export const mixpanel = mixpanelKey
  ? {
      identify: (id: string) => {
        mixpanelBrowser.identify(id)
      },
      track: (event: MixpanelEvent, props?: Dict) => {
        const datadogSessionId = getDatadogContext()?.sessionId
        const datadogProps = datadogSessionId
          ? {
              datadogSessionId: datadogSessionId,
              datadogSessionUrl: `https://app.datadoghq.eu/rum/replay/sessions/${datadogSessionId}`
            }
          : {}
        mixpanelBrowser.track(event, {
          ...props,
          url: window.location.pathname,
          route: router.route,
          query: router.query,
          serviceVersion: deployedVersion(),
          service: 'website',
          user_agent: navigator.userAgent,
          ...datadogProps
        })
      },
      trackPageView: () => {
        mixpanel.track('page viewed')
      }
    }
  : disabledMixpanel
