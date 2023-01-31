import clsx from 'clsx'
import Link, { LinkProps } from 'next/link'
import { FC, useCallback, useRef } from 'react'
import * as React from 'react'
import { mergeRefs } from 'react-merge-refs'

import { gsap } from '~/lib/gsap'
import { checkIsExternal } from '~/lib/utils/router'

import { Isologo } from '../logo'
import s from './button.module.scss'

type ButtonProps =
  | {
      centered?: never
      className?: string
      color?: never
      disabled?: boolean
      scale?: number
      size?: never
      speed?: number
      tollerance?: number
      variant?: 'unstyled'
      withLogo?: never
      onClick?: () => void
    }
  | {
      centered?: boolean
      className?: string
      color?: never
      disabled?: boolean
      scale?: number
      size?: 'sm' | 'md' | 'lg'
      speed?: number
      tollerance?: number
      variant?: 'primary'
      withLogo?: boolean
      onClick?: () => void
    }
  | {
      centered?: boolean
      className?: string
      color?: 'white' | 'magenta' | 'blue' | 'yellow' | 'green'
      disabled?: boolean
      scale?: number
      size?: 'sm' | 'md' | 'lg'
      speed?: number
      tollerance?: number
      variant?: 'secondary'
      withLogo?: never
      onClick?: () => void
    }

type NextLinkProps = Pick<
  LinkProps,
  'href' | 'locale' | 'prefetch' | 'replace' | 'scroll' | 'shallow'
>

export type ButtonLinkProps = ButtonProps &
  Omit<JSX.IntrinsicElements['a'], 'href'> &
  NextLinkProps & { notExternal?: boolean }

export const ButtonLink: FC<ButtonLinkProps> = ({
  centered = false,
  children,
  className = '',
  color = 'white',
  disabled = false,
  href,
  locale,
  notExternal,
  prefetch,
  replace,
  scale = 1.5,
  scroll,
  shallow,
  size = 'md',
  variant = 'primary',
  withLogo = false,
  onClick
}) => {
  const $root = useRef<HTMLAnchorElement>(null)
  const $item = useRef<HTMLDivElement>()
  const $hover = useRef<HTMLDivElement>()
  const rootBound = useRef<DOMRect>()
  const itemBound = useRef<DOMRect>()
  const diffBound = useRef({ x: 0, y: 0 })

  const handleMouseEnter = useCallback(() => {
    if (!$item.current || !$hover.current || !$root.current) return
    gsap.killTweensOf($item.current)

    rootBound.current = $root.current.getBoundingClientRect()
    itemBound.current = $item.current.getBoundingClientRect()
    diffBound.current.x =
      (rootBound.current.width * scale - rootBound.current.width) / 2
    diffBound.current.y =
      (rootBound.current.height * scale - rootBound.current.height) / 2
  }, [scale])

  const handleMouseLeave = useCallback(() => {
    if (!$item.current || !$hover.current) return
    gsap.killTweensOf($item.current)
    gsap.to($item.current, {
      x: 0,
      y: 0,
      ease: 'elastic.out(1.1, .4)',
      duration: 1.2
    })
    gsap.set($hover.current, {
      scale: 1
    })
  }, [])

  const externalProps = React.useMemo(() => {
    const p = { target: '_blank', rel: 'noreferrer noopener' }
    if (typeof href === 'string') {
      if (checkIsExternal(href)) return p
    } else if (checkIsExternal(href.href ?? '')) return p
  }, [href])

  if (variant === 'unstyled') {
    return (
      <Link
        href={href}
        replace={replace}
        scroll={scroll}
        shallow={shallow}
        prefetch={prefetch}
        locale={locale}
        passHref
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={$root}
        className={s['button--unstyled']}
      >
        <span className={clsx('block', className)}>{children}</span>
      </Link>
    )
  }

  if (variant === 'secondary') {
    return (
      <Link
        onClick={onClick}
        href={href}
        replace={replace}
        scroll={scroll}
        shallow={shallow}
        prefetch={prefetch}
        locale={locale}
        passHref
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={$root}
        className={clsx(
          s['button__secondary'],
          s[`button__secondary--${color}`],
          s[`button__secondary--${size}`],
          {
            disabled: s['disabled'],
            'text-center': centered
          },
          className
        )}
        {...(notExternal ? undefined : externalProps)}
      >
        {children}
      </Link>
    )
  }

  return (
    <Link
      href={href}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      prefetch={prefetch}
      locale={locale}
      passHref
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={$root}
      className={clsx(
        className,
        'inline-block relative z-10',
        s['button__primary'],
        s[`button__primary--${size}`],
        {
          disabled: s['disabled']
        }
      )}
      {...(notExternal ? undefined : externalProps)}
    >
      <div
        ref={mergeRefs([$item, $hover])}
        className={clsx(
          'bg-blue-darker flex items-center rounded-5xl px-6 py-3',
          {
            'py-2': size === 'sm',
            'justify-center': centered
          }
        )}
      >
        {withLogo && (
          <span className="mr-4">
            <Isologo color={disabled ? '#606060' : undefined} />
          </span>
        )}
        <span className="">{children}</span>
      </div>
    </Link>
  )
}
