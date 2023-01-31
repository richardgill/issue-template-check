import { Box, BoxProps } from '@chakra-ui/react'
import { forwardRef, ReactNode } from 'react'

interface ConsoleProps extends BoxProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
  headerContent?: ReactNode
}

export const Console = forwardRef<HTMLDivElement, ConsoleProps>(
  ({ children, className, size = 'md', headerContent, ...props }, ref) => (
    <Box
      ref={ref}
      className={className}
      fontSize={size}
      pos="relative"
      {...props}
    >
      {headerContent}
      {children}
    </Box>
  )
)

Console.displayName = 'Console'
