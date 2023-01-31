import Image from 'next/image'

import Heading from '~/components/common/heading'
import { Container } from '~/components/layout/container'
import { PageLayout } from '~/components/layout/page'
import Section from '~/components/layout/section'
import { ButtonLink } from '~/components/primitives/button-link'
import { siteOrigin } from '~/lib/constants'
import { headerLinks } from '~/util/header-links'

const Custom404 = () => (
  <PageLayout
    seoMetadata={{
      title: 'Page Not Found | Xata',
      description:
        'Xata is a branchable serverless database, analytics engine, and free-text search engine with a spreadsheet-like UI and an indefinitely scalable data API.',
      ogImage: { width: 1920, height: 1080, url: `${siteOrigin}/og.jpg` },
    }}
    overflowHidden
    header={headerLinks}
    announcement={false}
    mainOverflowing={false}
  >
    <Section className="relative min-h-screen overflow-hidden sm:flex sm:items-center">
      <Container className="z-30 text-center py-36 sm:py-0" size="xl">
        <Heading as="h1" variant="xl">
          Something went&nbsp;wrong
        </Heading>
        <p className="text-xata-xl lg:text-[28px] lg:leading-8 leading-[26px] mt-8 2xl:mt-14">
          The page was not found.
          <br className="sm:hidden" /> We will look into it <b>ASAP</b>
        </p>
        <ButtonLink
          withLogo={true}
          href="/"
          centered
          className="sm:w-auto w-full mt-16 2xl:mt-[72px]"
        >
          Back To Home
        </ButtonLink>
      </Container>
      <div className="absolute inset-0 bg-black grayscale">
        <span className="hidden md:block">
          <Image
            alt="page not found banner"
            fill
            loading="eager"
            priority
            src="/images/404/404-bg.png"
          />
        </span>
        <span className="md:hidden">
          <Image
            alt="page not found banner"
            fill
            loading="eager"
            priority
            src="/images/404/404-bg-mobile.png"
          />
        </span>
      </div>
    </Section>
  </PageLayout>
)

export default Custom404
