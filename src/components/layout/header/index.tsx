import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'

import Heading from '~/components/common/heading'
import { Modal } from '~/components/primitives/modal'
import { useMedia } from '~/hooks/use-media'
import { usePreventScroll } from '~/hooks/use-prevent-scroll'
import { useToggleState } from '~/hooks/use-toggle-state'
import { mobileHeaderLinks } from '~/util/mobile-header-links'

import { Button } from '../../primitives/button'
import { ButtonLink } from '../../primitives/button-link'
import { Logo } from '../../primitives/logo'
import { Container } from '../container'
import s from './header.module.scss'

type MobileMenuProps = Omit<HeaderMobileProps, 'handleToggle'>

type HeaderMobileProps = {
  isOn: boolean
  handleToggle: () => void
} & HeaderProps

export type HeaderProps = {
  rightSideButton?: React.ReactNode
  links: {
    title: string
    href: string
    openInNewTab?: boolean
  }[]
}

const MobileMenu: FC<MobileMenuProps> = () => {
  const router = useRouter()
  const isActive = (href: string) => router.pathname === href
  const { isOn, handleToggle } = useToggleState()

  return (
    <div className={s['mobile-menu']}>
      <Container className={s['mobile-menu__container']}>
        <nav>
          <ul>
            {mobileHeaderLinks?.links?.map(({ title, href }) => (
              <li
                key={title}
                className={clsx({ [s['active']]: isActive(href) })}
              >
                <Link href={href}>
                  <Heading variant="md" className="font-semibold" centered>
                    {title}
                  </Heading>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <ButtonLink
              variant="secondary"
              size="md"
              centered
              href="http://app.xata.io/"
            >
              Login
            </ButtonLink>
            <ButtonLink
              size="md"
              centered
              data-dd-action-name="Start building for free from Burger Menu"
              href="https://app.xata.io/signin"
            >
              Sign up
            </ButtonLink>
          </div>
          <div className="relative flex flex-col-reverse items-center justify-between w-screen pt-8 pb-5 border-t md:flex-row -left-4 sm:left-0 sm:w-auto">
            <p className="text-sm leading-4 text-center md:text-base md:leading-6">
              Copyright © {new Date().getFullYear()} Xatabase Inc.
              <br className="md:hidden" /> All rights reserved.
            </p>
            <div className="flex flex-col-reverse items-center md:flex-row">
              <Link
                href="/privacy"
                className="mb-6 text-sm leading-4 md:mb-0 md:text-base md:leading-6"
              >
                Privacy Policy
              </Link>
              <div className="flex mb-4 space-x-4 md:mb-0 md:ml-4">
                <Link href="mailto:info@xata.io" className="flex">
                  <Image
                    alt="email icon"
                    height={32}
                    src="/icons/social/email.svg"
                    width={32}
                  />
                </Link>
                <Link href="https://twitter.com/xata" className="flex">
                  <Image
                    alt="twitter logo"
                    height={32}
                    src="/icons/social/twitter.svg"
                    width={32}
                  />
                </Link>
                <Link
                  href="https://www.linkedin.com/company/69560619/"
                  className="flex"
                >
                  <Image
                    alt="linkedin logo"
                    height={32}
                    src="/icons/social/linkedin.svg"
                    width={32}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {isOn && <Modal open={isOn} onOpenChange={handleToggle} />}
      </Container>
    </div>
  )
}

const HeaderMobile = ({
  handleToggle,
  links,
  isOn,
  rightSideButton
}: HeaderMobileProps) => (
  <>
    {isOn && <MobileMenu isOn={true} links={links} />}

    <div className="bg-rainbow-radial-gradient pb-[1px] lg:hidden relative z-30">
      <Container className="flex items-center justify-between py-4 bg-blue-darker lg:hidden">
        <Link href="/" aria-label="Logo">
          <span className="sr-only">Xata</span>
          <span>
            <Logo className="w-[80px]" />
          </span>
        </Link>
        <div className="flex items center">
          <span className="flex mr-4">{rightSideButton}</span>
          <Button
            variant="unstyled"
            className="flex"
            data-dd-action-name="Toggle Header Menu"
            onClick={handleToggle}
          >
            <Image
              alt="toggle menu icon"
              height={24}
              src={`/icons/layout/header/${isOn ? 'cross' : 'menu'}.svg`}
              width={24}
            />
          </Button>
        </div>
      </Container>
    </div>
  </>
)

export const Header = ({ links, rightSideButton }: HeaderProps) => {
  const { isOn, handleToggle } = useToggleState()
  const { isOn: modalIsOn, handleToggle: handleToggleModal } = useToggleState()
  const router = useRouter()
  const [hasScrolled, setHasScrolled] = useState(false)
  const isLg = useMedia('(min-width: 1024px)')

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop } = document.documentElement
      if (scrollTop > 100) setHasScrolled(true)
      else setHasScrolled(false)
    }

    handleScroll()
    document.addEventListener('scroll', handleScroll)
    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [])

  usePreventScroll(isOn && !isLg)

  const handleLogoRightClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
    window.open('https://github.com/xataio/company', '_blank')
  }

  const isDocsPage = router?.pathname?.startsWith('/docs')

  // Hardcoded color hack because the header doesn't know about Chakra sometimes
  let headerDocsStyle = undefined
  if (isDocsPage) {
    headerDocsStyle = {
      background: 'rgb(20, 20, 23)',
      borderBottom: '1px solid rgb(38, 38, 41)'
    }
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-screen">
        <div
          className={clsx('transition-colors duration-300 max-w-screen', {
            'bg-blue-darker bg-opacity-80 backdrop-blur-sm':
              hasScrolled && !isDocsPage
          })}
          style={headerDocsStyle}
        >
          <HeaderMobile
            isOn={isOn}
            links={links}
            handleToggle={handleToggle}
            rightSideButton={rightSideButton}
          />

          <Container
            size={isDocsPage ? 'full' : 'xl'}
            className={`hidden lg:block`}
          >
            <div className="flex items-center justify-start w-full py-3 3xl:py-2">
              <div className="lg:flex-0">
                <Link href="/" aria-label="Logo" className="inline-block">
                  <span className="sr-only">Xata</span>
                  <span onContextMenu={handleLogoRightClick}>
                    <Logo className="w-[105px]" />
                  </span>
                </Link>
              </div>

              {links.length > 0 && (
                <div className="pl-7 lg:flex-0">
                  <nav className="w-full">
                    <ul className="flex justify-center w-full xl:space-x-4">
                      {links.map((link, index) => (
                        <li key={index} className="min-w-fit">
                          <ButtonLink
                            prefetch={false}
                            href={link.href}
                            variant="unstyled"
                            className="px-4 py-3 text-sm font-semibold transition-opacity duration-300 rounded-sm 3xl:text-base hover:opacity-70"
                          >
                            {link.title}
                          </ButtonLink>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              )}

              <div className="flex lg:flex-1">
                <div className="flex items-center ml-auto space-x-4">
                  <ButtonLink
                    variant="secondary"
                    size="sm"
                    href="http://app.xata.io/"
                  >
                    Login
                  </ButtonLink>
                  <ButtonLink
                    withLogo={true}
                    size="sm"
                    className="whitespace-nowrap"
                    data-dd-action-name="Start building for free from Header"
                    href="https://app.xata.io/signin"
                  >
                    Start building for free
                  </ButtonLink>
                </div>
              </div>
            </div>

            {modalIsOn && (
              <Modal open={modalIsOn} onOpenChange={handleToggleModal} />
            )}
          </Container>
        </div>
      </header>
    </>
  )
}
