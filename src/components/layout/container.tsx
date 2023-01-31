import clsx from 'clsx'
import { forwardRef, ReactNode } from 'react'

type ContainerProps = {
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  children: ReactNode
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, size = 'lg', className }, ref) => (
    <div
      className={clsx(
        'relative w-full px-4 md:px-10 mx-auto sm:pl-10 sm:pr-10',
        {
          'max-w-[calc(980px+80px)]': size === 'sm',
          'lg:max-w-screen-sm xl:max-w-screen-md 2xl:max-w-[900px]':
            size === 'md',
          'lg:max-w-screen-md xl:max-w-[900px] 2xl:max-w-screen-lg':
            size === 'lg',
          'lg:max-w-[900px] xl:max-w-[1200px] 2xl:max-w-[1280px]':
            size === 'xl',
          'max-w-none': size === 'full',
        },
        className
      )}
      ref={ref}
    >
      {children}
    </div>
  )
)

Container.displayName = 'LayoutContainer'
