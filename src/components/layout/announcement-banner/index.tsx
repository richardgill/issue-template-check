import Link from 'next/link'
import { FC } from 'react'

import { Container } from '../container'

export type AnnouncementBannerProps = {
  text: string
  link: {
    title: string
    href: string
  }
}

export const AnnouncementBanner: FC<AnnouncementBannerProps> = ({
  text,
  link
}: AnnouncementBannerProps) => (
  <div className="flex justify-center relative z-50 bg-blue-dark border-b border-white border-opacity-20 lg:border-0 py-3 md:py-[10px]">
    <Container>
      <p className="text-base text-center md:text-sm">
        {text}{' '}
        <Link
          href={link.href}
          className="text-gray-lightest"
          target="_blank"
          rel="noreferrer noopener"
        >
          {link.title}→
        </Link>
      </p>
    </Container>
  </div>
)
