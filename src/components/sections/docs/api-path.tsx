import { Box, BoxProps, Code } from '@chakra-ui/react'
import { FC, Fragment } from 'react'

interface Props extends BoxProps {
  path: string
}

export const ApiPath: FC<Props> = ({ path, ...props }) => {
  if (!path) {
    return null
  }

  return (
    <Code fontSize="sm" colorScheme="primary" px={2} {...props}>
      {path.split('/').map((segment, index) =>
        segment.includes('{') ? (
          <Fragment key={segment}>
            <>
              {segment.split('.').map((subsegment, i) => (
                <>
                  {subsegment.includes('{') ? (
                    <Box as="span" color="textSuccess">
                      {subsegment}
                    </Box>
                  ) : (
                    subsegment
                  )}
                  {i < segment.split('.').length - 1 && <>.</>}
                </>
              ))}
            </>
            {index < path.split('/').length - 1 && <>/</>}
          </Fragment>
        ) : (
          <Fragment key={segment}>
            {segment}
            {index < path.split('/').length - 1 && <>/</>}
          </Fragment>
        )
      )}
    </Code>
  )
}
