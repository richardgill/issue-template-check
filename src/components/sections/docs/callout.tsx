import { Alert, AlertDescription, AlertStatus } from '@chakra-ui/react'
import { FC, PropsWithChildren } from 'react'
import { onlyText } from 'react-children-utilities'

export const Callout: FC<PropsWithChildren> = ({ children }) => {
  let status: AlertStatus = 'info'

  if (onlyText(children).includes('❌')) {
    status = 'error'
  }
  return (
    <Alert
      status={status}
      sx={{
        '&:not(:last-child)': {
          mb: 6
        }
      }}
    >
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  )
}
