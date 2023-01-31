import Image from 'next/image'

import Link from '~/components/primitives/link'
import { Modal } from '~/components/primitives/modal'
import { useMedia } from '~/hooks/use-media'
import { useToggleState } from '~/hooks/use-toggle-state'

import { Logotype } from '../../primitives/logo'
import { Container } from '../container'

type Link = {
  title: string
  href: string
}

export type FooterProps = {
  productLinks: Link[]
  companyLinks: Link[]
  landingPagesLinks: Link[]
}

export const Footer = ({
  productLinks,
  companyLinks,
  landingPagesLinks
}: FooterProps) => {
  const { isOn, handleToggle } = useToggleState()
  const isMobile = useMedia('(max-width:640px)')
  const is2xl = useMedia('(min-width:1441px)')

  return (
    <footer
      className="relative w-screen border-t border-gray-800"
      style={{
        backgroundImage: `url(/layout/footer/gradient${
          isMobile ? '-sm' : is2xl ? '-2xl' : ''
        }.svg)`,
        backgroundPositionX: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundPositionY: 'top',
        backgroundSize: 'cover',
        backgroundColor: '#101114'
      }}
    >
      <Container
        className="flex flex-col justify-between h-full py-12 space-y-8 lg:py-20 md:space-y-14"
        size="xl"
      >
        <div className="flex flex-col flex-wrap justify-between space-y-12 lg:space-y-0 lg:space-x-20 lg:flex-row">
          <div className="flex-1">
            <div className="flex flex-col md:min-w-[350px] lg:min-w-0 lg:max-w-sm space-y-8">
              <Logotype />
              <p className="text-sm md:text-base">
                Xata is a{' '}
                <Link href="/docs/concepts/serverless-data-platform">
                  Serverless Data Platform
                </Link>{' '}
                that radically simplifies the way developers work with data.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap justify-between md:flex-nowrap sm:justify-evenly lg:justify-between lg:space-x-32">
            <div className="flex-1 w-1/2 space-y-10 lg:w-auto sm:flex-none">
              <div className="space-y-6">
                <p className="text-base font-bold leading-4">Product</p>
                <ul className="space-y-2">
                  {productLinks.map((link) => (
                    <li key={link.title}>
                      <Link href={link.href}>{link.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 space-y-6 sm:hidden">
                <p className="text-base font-bold leading-4">Company</p>
                <ul className="space-y-2">
                  {companyLinks.map((link) => (
                    <li key={link.title}>
                      <Link className="focus:!outline" href={link.href}>
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="hidden w-1/2 space-y-6 lg:w-auto md:space-y-4 sm:block">
              <p className="text-sm font-semibold leading-4 md:text-base">
                Company
              </p>
              <ul className="space-y-2">
                {companyLinks.map((link) => (
                  <li key={link.title}>
                    <Link href={link.href}>{link.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
            {landingPagesLinks.length > 0 && (
              <div className="flex-1 space-y-6 md:space-y-4 sm:flex-none">
                <p className="text-sm font-semibold leading-4 md:text-base">
                  Landing Pages
                </p>
                <ul className="space-y-2">
                  {landingPagesLinks.map((link) => (
                    <li key={link.title}>
                      <Link className="focus:!outline" href={link.href}>
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="relative flex flex-col-reverse items-center justify-between w-screen pt-8 border-t md:flex-row -left-4 sm:left-0 sm:w-auto md:pt-6">
          <p className="text-sm leading-4 text-center md:text-left md:text-base md:leading-6">
            Copyright © {new Date().getFullYear()} Xatabase Inc.
            <br className="md:hidden" /> All rights reserved.
          </p>
          <div className="flex flex-col-reverse items-center md:flex-row">
            <div className="flex items-center justify-center mb-2 md:mb-0">
              <Link href="/terms-of-use" className="inline-block">
                Terms
              </Link>
              <div className="mx-2">|</div>
              <Link href="/privacy" className="inline-block">
                Privacy Policy
              </Link>
            </div>
            <div className="flex mb-4 space-x-4 md:mb-0 md:ml-4">
              <Link
                href="mailto:info@xata.io"
                unstyled
                target="_blank"
                className="flex"
              >
                <Image
                  alt="Email"
                  role="presentation"
                  height={32}
                  src="/icons/social/email.svg"
                  width={32}
                />
                <span className="sr-only">
                  Launches the client to send an e-mail to info@xata.io
                </span>
              </Link>
              <Link
                href="https://twitter.com/xata"
                target="_blank"
                unstyled
                className="flex"
              >
                <Image
                  alt="Twitter"
                  role="presentation"
                  height={32}
                  src="/icons/social/twitter.svg"
                  width={32}
                />
                <span className="sr-only">
                  Link to Xata social account on Twitter. Opens in new tab.
                </span>
              </Link>
              <Link
                href="https://xata.io/discord"
                target="_blank"
                unstyled
                className="flex"
              >
                <Image
                  alt="Discord"
                  role="presentation"
                  height={32}
                  src="/icons/social/discord.svg"
                  width={32}
                />
                <span className="sr-only">
                  Invitation to Xata server on Discord. Opens in new tab.
                </span>
              </Link>
              <Link
                href="https://www.linkedin.com/company/69560619/"
                unstyled
                target="_blank"
                className="flex"
              >
                <Image
                  alt="LinkedIn"
                  role="presentation"
                  height={32}
                  src="/icons/social/linkedin.svg"
                  width={32}
                />
                <span className="sr-only">
                  Link to Xata social account on LinkedIn. Opens in new tab.
                </span>
              </Link>
            </div>
          </div>
        </div>

        {isOn && <Modal open={isOn} onOpenChange={handleToggle} />}
      </Container>
    </footer>
  )
}
