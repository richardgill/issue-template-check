import { deployedVersion } from './version'

export let datadogContext: { sessionId?: string } | undefined = undefined

export const datadogRumInit = async (userId: string) => {
  const applicationId = process.env.NEXT_PUBLIC_DATADOG_APPLICATION_ID
  if (!applicationId) {
    return
  }
  // Datadog increases the first page load time - so we dynamically import it
  const { datadogRum } = await import('@datadog/browser-rum')
  datadogRum.init({
    applicationId: process.env.NEXT_PUBLIC_DATADOG_APPLICATION_ID as string,
    clientToken: process.env.NEXT_PUBLIC_DATADOG_CLIENT_TOKEN as string,
    site: 'datadoghq.eu',
    service: 'website',
    version: deployedVersion(),
    sampleRate: 100,
    trackInteractions: true,
  })
  datadogRum.setUser({
    id: userId,
  })
  datadogRum.startSessionReplayRecording()
  datadogContext = { sessionId: datadogRum.getInternalContext()?.session_id }
}

export const getDatadogContext = () => {
  return datadogContext
}
