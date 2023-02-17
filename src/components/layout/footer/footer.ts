import { hiringLink } from '~/util/hiring-link'

import { FooterProps } from '.'

export const defaultFooterLinks: FooterProps = {
  productLinks: [
    { title: 'Pricing', href: 'https://xata.io/pricing' },
    { title: 'Docs', href: '/' },
    { title: 'Support', href: 'https://support.xata.io/' },
  ],
  companyLinks: [
    { title: 'About Us', href: 'https://xata.io/about' },
    { title: 'Blog', href: 'https://xata.io/blog' },
    { title: 'Careers', href: hiringLink },
  ],
}
