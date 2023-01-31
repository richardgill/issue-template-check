import {
  Flex,
  Hide,
  Icon,
  IconButton,
  Link,
  LinkBox,
  LinkOverlay,
  Text,
  Tooltip
} from '@chakra-ui/react'
import {
  ArrowLeft16Filled,
  ArrowRight16Filled,
  ArrowUp16Filled
} from '@fluentui/react-icons'
import React, { FC } from 'react'

import { FeedbackButton } from './feedback'

export type DocFooterProps = {
  prev: { title: string; href: string } | null
  next: { title: string; href: string } | null
  lastModified?: string
}

const DocFooter: FC<DocFooterProps> = ({ prev, next }) => {
  let justifyContent = 'start'
  if (next && !prev) {
    justifyContent = 'end'
  } else if (next && prev) {
    justifyContent = 'space-between'
  }
  return (
    <>
      <Flex justifyContent={justifyContent} mt={12} pb={24}>
        {prev && (
          <LinkBox role="group">
            <Flex alignItems="start" gap={2}>
              <Icon as={ArrowLeft16Filled} boxSize={4} />
              <Flex flexDir="column" gap={1}>
                <Text textTransform="uppercase" fontWeight="bold" fontSize="xs">
                  Previous
                </Text>
                <LinkOverlay
                  href={prev.href}
                  _groupHover={{
                    textDecoration: 'underline',
                    textDecorationColor: 'primary'
                  }}
                >
                  <Text as={Link}>{prev.title}</Text>
                </LinkOverlay>
              </Flex>
            </Flex>
          </LinkBox>
        )}
        {next && (
          <LinkBox py={4} role="group">
            <Flex alignItems="start" gap={2}>
              <Flex flexDir="column" gap={1} alignItems="end">
                <Text textTransform="uppercase" fontWeight="bold" fontSize="xs">
                  Next
                </Text>
                <LinkOverlay
                  href={next.href}
                  _groupHover={{
                    textDecoration: 'underline',
                    textDecorationColor: 'primary'
                  }}
                >
                  <Text as={Link}>{next.title}</Text>
                </LinkOverlay>
              </Flex>
              <Icon as={ArrowRight16Filled} boxSize={4} />
            </Flex>
          </LinkBox>
        )}
      </Flex>

      <Hide below="lg">
        <Flex pos="fixed" right={12} bottom={12} gap={2}>
          <Tooltip label="Scroll to top">
            <IconButton
              icon={<Icon as={ArrowUp16Filled} boxSize={4} />}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Scroll to top"
            />
          </Tooltip>
          <FeedbackButton />
        </Flex>
      </Hide>
    </>
  )
}
export default DocFooter
