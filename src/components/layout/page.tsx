import clsx from 'clsx'
import { siteOrigin } from '~/lib/constants'
import { DURATION, gsap, ScrollTrigger } from '~/lib/gsap'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import { FC, PropsWithChildren, useEffect } from 'react'
import useMeasure from 'react-use-measure'

import { useAppContext } from '~/context/app'
import useIsomorphicLayoutEffect from '~/hooks/use-isomorphic-layout'
import { useViewportSize } from '~/hooks/use-viewport-size'

import { AnnouncementBannerProps } from './announcement-banner'
import { defaultAnnouncement } from './announcement-banner/announcement-banner'
import { Footer, FooterProps } from './footer'
import { defaultFooterLinks } from './footer/footer'
import { Header, HeaderProps } from './header'
import { defaultHeaderLinks } from './header/header'

const preloadFonts = [
  '/docs/fonts/eina03/Eina03-Light.woff2',
  '/docs/fonts/eina03/Eina03-Regular.woff2',
  '/docs/fonts/eina03/Eina03-SemiBold.woff2',
  '/docs/fonts/eina03/Eina03-Bold.woff2',
  '/docs/fonts/inter/Inter-roman.var.woff2?v=3.15',
  '/docs/fonts/inter/Inter-italic.var.woff2?v=3.15',
]

type SeoMetadata = {
  title: string
  description: string
  ogImage: {
    url: string
    width: number
    height: number
  }
  additionalMetaTags?: {
    name: string
    content: string
  }[]
}

type PageLayoutProps = {
  seoMetadata?: SeoMetadata
  announcement?: AnnouncementBannerProps | false
  header?: HeaderProps
  footer?: FooterProps
  overflowHidden?: boolean
  mainOverflowing?: boolean
}

export const PageLayout: FC<PropsWithChildren<PageLayoutProps>> = ({
  children,
  seoMetadata,
  announcement = defaultAnnouncement,
  header = { links: defaultHeaderLinks, mobileMenu: true },
  footer = defaultFooterLinks,
  overflowHidden = false,
  mainOverflowing = true,
}) => {
  const router = useRouter()
  const viewport = useViewportSize()
  const [measureRef, bounds] = useMeasure()
  const { fontsLoaded, setAnimated } = useAppContext()
  const url = siteOrigin + router.asPath

  useEffect(() => {
    ScrollTrigger.refresh()
  }, [viewport.height, viewport.width, bounds.height])

  useIsomorphicLayoutEffect(() => {
    if (fontsLoaded) {
      gsap.to('body', {
        autoAlpha: 1,
        duration: DURATION * 0.8,
        onUpdate: function (this) {
          if (this.progress() < 0.3) return
          setAnimated(true)
        },
      })
    }
  }, [fontsLoaded])

  return (
    <>
      <NextSeo
        title={seoMetadata?.title}
        description={seoMetadata?.description}
        canonical={url}
        openGraph={{
          type: 'website',
          locale: 'en_US',
          site_name: 'Xata',
          images: [
            {
              url: seoMetadata?.ogImage.url ?? `${siteOrigin}/og.jpg`,
              width: seoMetadata?.ogImage.width ?? 1920,
              height: seoMetadata?.ogImage.height ?? 1080,
              alt: 'Xata',
            },
          ],
        }}
        twitter={{
          handle: '@xata',
          site: '@xata',
          cardType: 'summary_large_image',
        }}
        additionalLinkTags={[
          {
            rel: 'shortcut icon',
            href: '/favicon.png',
            type: 'image/png',
          },
          ...preloadFonts.map((fontSrc) => ({
            crossOrigin: 'anonymous',
            rel: 'preload',
            as: 'font',
            href: fontSrc,
          })),
        ]}
        additionalMetaTags={seoMetadata?.additionalMetaTags ?? []}
      />
      <Header
        links={header?.links}
        rightSideButton={(header as any).rightSideButton}
      />
      <main
        className={clsx({
          '-mt-[99px] lg:-mt-[118px]': announcement && mainOverflowing,
          '-mt-[58px] lg:-mt-[118px]': !announcement && mainOverflowing,
          'overflow-hidden': overflowHidden,
        })}
        style={{ minHeight: 'calc(100vh - 598px)' }}
        ref={measureRef}
      >
        {children}
      </main>
      {!router?.pathname?.startsWith('/docs') && (
        <Footer
          productLinks={footer?.productLinks}
          companyLinks={footer?.companyLinks}
          landingPagesLinks={footer?.landingPagesLinks}
        />
      )}
    </>
  )
}
