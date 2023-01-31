import '~/css/global.scss'

import { Analytics } from '@vercel/analytics/react'
import { NextComponentType, NextPageContext } from 'next'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { RealViewportProvider } from 'next-real-viewport'
import { useEffect } from 'react'

import { ProductAnalytics } from '~/components/productAnalytics'
import { AppContextProvider } from '~/context/app'

export type Page<P = Record<string, unknown>> = NextComponentType<
  NextPageContext,
  Record<string, unknown>,
  P
> & { getLayout?: GetLayoutFn<P> }

export type GetLayoutFn<P = Record<string, unknown>> = (
  props: AppProps<P>
) => any

const NextRealViewportProvider = RealViewportProvider as React.FC<
  React.PropsWithChildren<any>
>

const App = ({ Component, pageProps, ...rest }: AppProps) => {
  const router = useRouter()

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.code === `Tab`) {
        document.body.classList.add('user-is-tabbing')
      }
    }

    function handleMouseDown() {
      document.body.classList.remove('user-is-tabbing')
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('mousedown', handleMouseDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('mousedown', handleMouseDown)
    }
  }, [])

  const getLayout: GetLayoutFn =
    (Component as any).getLayout ||
    (({ Component, pageProps }) => <Component {...pageProps} />)

  useEffect(() => {
    const lazyVideos = [].slice.call(document.querySelectorAll('video.lazy'))

    if ('IntersectionObserver' in window) {
      const lazyVideoObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((video) => {
            if (video.isIntersecting) {
              for (const source in video.target.children) {
                const videoSource = video.target.children[
                  source
                ] as HTMLSourceElement

                if (
                  typeof videoSource.tagName === 'string' &&
                  videoSource.tagName === 'SOURCE' &&
                  videoSource.dataset.src
                ) {
                  videoSource.src = videoSource.dataset.src
                }
              }

              ;(video.target as HTMLVideoElement).load()
              video.target.classList.remove('lazy')
              lazyVideoObserver.unobserve(video.target)
            }
          })
        },
        { rootMargin: '400px', threshold: 0 }
      )

      lazyVideos.forEach((lazyVideo) => lazyVideoObserver.observe(lazyVideo))
    }
  }, [router.asPath])

  return (
    <>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <AppContextProvider>
        <NextRealViewportProvider>
          {getLayout({ Component, pageProps, ...rest })}
          <ProductAnalytics />
        </NextRealViewportProvider>

        <Analytics />
      </AppContextProvider>
    </>
  )
}

export default App
