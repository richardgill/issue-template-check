import clsx from 'clsx'
import { FC, MouseEvent, PropsWithChildren, useCallback, useRef } from 'react'
import { mergeRefs } from 'react-merge-refs'

import { DURATION, gsap } from '~/lib/gsap'

import { Isologo } from '../logo'
import s from './button.module.scss'

type ButtonProps =
  | {
      centered?: never
      className?: string
      color?: never
      disabled?: boolean
      onClick?: () => void
      scale?: number
      size?: never
      variant?: 'unstyled'
      withLogo?: never
      speed?: number
      tollerance?: number
      type?: 'button' | 'submit' | 'reset'
      name?: string
    }
  | {
      centered?: boolean
      className?: string
      color?: never
      disabled?: boolean
      onClick?: () => void
      scale?: number
      size?: 'sm' | 'md' | 'lg'
      speed?: number
      tollerance?: number
      variant?: 'primary'
      withLogo?: boolean
      type?: 'button' | 'submit' | 'reset'
      name?: string
    }
  | {
      centered?: never
      className?: string
      color?: 'white' | 'magenta' | 'blue' | 'yellow' | 'green'
      disabled?: boolean
      onClick?: () => void
      scale?: number
      size?: 'sm' | 'md' | 'lg'
      speed?: number
      tollerance?: number
      variant?: 'secondary'
      withLogo?: never
      type?: 'button' | 'submit' | 'reset'
      name?: string
    }

export const Button: FC<PropsWithChildren<ButtonProps>> = ({
  children,
  withLogo = false,
  variant = 'primary',
  disabled = false,
  className = '',
  color = 'white',
  centered = false,
  size = 'md',
  scale = 1.5,
  tollerance = 3,
  type = 'button',
  speed = DURATION,
  name,
  onClick
}) => {
  const $root = useRef<HTMLButtonElement>(null)
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

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!rootBound.current || !$item.current || !itemBound.current) return
      const x = e.clientX
      const y = e.clientY

      const maxX =
        ((rootBound.current.width - itemBound.current.width) / 2) * tollerance
      const maxY =
        ((rootBound.current.height - itemBound.current.height) / 2) * tollerance

      const newX = gsap.utils.mapRange(
        0,
        rootBound.current.width * scale,
        -maxX,
        maxX,
        x - rootBound.current.x + diffBound.current.x
      )

      const newY = gsap.utils.mapRange(
        0,
        rootBound.current.height * scale,
        -maxY,
        maxY,
        y - rootBound.current.y + diffBound.current.y
      )

      gsap.killTweensOf($item.current)
      gsap.to($item.current, {
        x: newX,
        y: newY,
        ease: 'power3.out',
        duration: speed
      })
    },
    [scale, speed, tollerance]
  )

  if (variant === 'unstyled') {
    return (
      <button
        name={name}
        type={type}
        onClick={onClick}
        className={clsx(className, s['button--unstyled'])}
        disabled={disabled}
      >
        {children}
      </button>
    )
  }

  if (variant === 'secondary') {
    return (
      <button
        name={name}
        type={type}
        disabled={disabled}
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        ref={$root}
        className={clsx(
          s['button__secondary'],
          s[`button__secondary--${color}`],
          s[`button__secondary--${size}`],
          {
            disabled: s['disabled']
          },
          className
        )}
      >
        {children}
      </button>
    )
  }

  return (
    <button
      name={name}
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      ref={$root}
      aria-label={name}
      className={clsx(
        s['button__primary'],
        s[`button__primary--${size}`],
        {
          disabled: s['disabled']
        },
        className
      )}
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
            <Isologo
              className={clsx(size === 'sm' && 'w-5 h-5')}
              color={disabled ? '#606060' : undefined}
            />
          </span>
        )}
        <span>{children}</span>
      </div>
    </button>
  )
}
