import clsx from 'clsx'
import { checkIsExternal } from '~/lib/utils/router'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import { forwardRef } from 'react'

import s from './link.module.scss'

export type LinkProps = {
  children?: React.ReactNode
  unstyled?: boolean
  inverted?: boolean
} & JSX.IntrinsicElements['a'] &
  Omit<NextLinkProps, 'as' | 'passHref'>

const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ children, className, ...restProps }, ref) => {
    const {
      href,
      // NextLink Props
      replace,
      scroll,
      shallow,
      prefetch,
      unstyled = false,
      inverted = false,
      // Rest
      ...aProps
    } = restProps

    const isExternal = checkIsExternal(href)

    return (
      <NextLink
        href={href}
        replace={replace}
        scroll={scroll}
        shallow={shallow}
        prefetch={prefetch}
        passHref
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener' : undefined}
        {...aProps}
        ref={ref}
        className={clsx(
          s['link'],
          { [s['link--xata']]: !unstyled },
          { [s['unstyled']]: unstyled, [s['inverted']]: inverted },
          className
        )}
      >
        {unstyled ? <>{children}</> : <span>{children}</span>}
      </NextLink>
    )
  }
)

Link.displayName = 'PrimitiveLink'
export default Link
