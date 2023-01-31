import { hiringLink } from '~/util/hiring-link'

import { FooterProps } from '.'

export const defaultFooterLinks: FooterProps = {
  productLinks: [
    { title: 'Pricing', href: '/pricing' },
    { title: 'Docs', href: '/docs' },
    { title: 'Support', href: 'https://support.xata.io/' }
  ],
  companyLinks: [
    { title: 'About Us', href: '/about' },
    { title: 'Blog', href: '/blog' },
    { title: 'Careers', href: hiringLink }
  ],
  landingPagesLinks: [
    // { title: 'Vercel', href: '/vercel' },
    // { title: 'Next.js', href: '/nextjs' },
    // { title: 'Netlify', href: '/netlify' },
    // { title: 'Clouflare', href: '/cloudflare' }
  ]
}
