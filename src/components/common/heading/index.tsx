import type * as Polymorphic from '@radix-ui/react-polymorphic'
import clsx from 'clsx'
import { forwardRef } from 'react'

// Styles
import s from './heading.module.scss'

type HeadingProps = {
  variant: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  centered?: boolean
}

const DEFAULT_ELEMENT = 'h2'

const Heading = forwardRef(
  (
    {
      as: Comp = DEFAULT_ELEMENT,
      children,
      variant,
      className,
      centered = false,
      ...props
    },
    ref
  ) => {
    return (
      <Comp
        className={clsx(
          s.heading,
          s[`size-${variant}`],
          { [s['centered']]: centered },
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    )
  }
) as Polymorphic.ForwardRefComponent<typeof DEFAULT_ELEMENT, HeadingProps>

Heading.displayName = 'Heading'

export default Heading
