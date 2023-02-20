import {
  Accordion,
  Box,
  Button,
  Flex,
  Hide,
  Icon,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
} from '@chakra-ui/react'
import { Home16Filled, Navigation16Filled } from '@fluentui/react-icons'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { FC, useEffect, useMemo, useState } from 'react'

import { usePreventScroll } from '~/hooks/use-prevent-scroll'

import { Search } from '../search'
import type { SidebarItemProps } from './sidebar-item'
import SidebarItem from './sidebar-item'

export type SidebarEntries = {
  markdownFiles: SidebarItemProps[]
  apiReference: Record<string, SidebarItem[]>
}

const Sidebar: FC<{
  openApiBranch?: string
  entries: SidebarEntries
  active: string
}> = ({ entries }) => {
  const router = useRouter()
  const { isOpen, onToggle, onClose } = useDisclosure()
  const isApiRoute = router.asPath.split('/').includes('api-reference')
  const [tabIndex, setTabIndex] = useState(isApiRoute ? 1 : 0)

  const apiReferenceEntries = useMemo(
    () => Object.entries(entries.apiReference),
    [entries.apiReference]
  )

  useEffect(onClose, [router.asPath, onClose])
  usePreventScroll(isOpen)

  const handleTabsChange = (index: number) => {
    setTabIndex(index)
  }

  const isOverviewPage = router.asPath === '/overview'

  return (
    <Box
      minW={{ base: '100%', lg: 350 }}
      borderRight="solid 1px"
      borderColor="stroke"
    >
      <Box
        as="aside"
        bg={{ base: 'contrastEmpty', lg: 'transparent' }}
        pos={{ base: 'fixed', lg: 'sticky' }}
        left={0}
        top={{ base: 14, lg: 24 }}
        w={{ base: '100vw', lg: 350 }}
        pb={{ base: 4, lg: 0 }}
        borderBottom={{ base: 'solid 1px', lg: 'none' }}
        borderBottomColor="stroke"
        zIndex={10}
      >
        <Flex alignItems="center" mx={{ base: 4, lg: 8 }} mt={4} gap={4}>
          <Hide above="lg">
            <Button
              leftIcon={<Icon as={Navigation16Filled} boxSize={4} />}
              onClick={onToggle}
            >
              Docs
            </Button>
          </Hide>
          <Box flexGrow={1}>
            <Search openApiBranch="main" />
          </Box>
        </Flex>
        <Tabs
          colorScheme="primary"
          display={{ base: isOpen ? 'block' : 'none', lg: 'block' }}
          index={tabIndex}
          onChange={handleTabsChange}
        >
          <TabList px={{ base: 4, lg: 8 }} mt={4} boxShadow="md">
            <Tab>Guides</Tab>
            <Tab>API reference</Tab>
          </TabList>
          <TabPanels>
            <TabPanel p={0}>
              <Box
                overflowY="auto"
                maxH={{
                  base: 'calc(100vh - 150px)',
                  lg: 'calc(100vh - 200px)',
                }}
              >
                <Flex
                  as={NextLink}
                  href="/overview"
                  mx={8}
                  gap={2}
                  mt={8}
                  mb={4}
                  py={1}
                  px={2}
                  alignItems="center"
                  borderRadius="md"
                  color={isOverviewPage ? 'text' : 'textSubtle'}
                  bg={isOverviewPage ? 'bgInfo' : 'transparent'}
                  _hover={{
                    color: 'text',
                    textDecoration: 'none',
                    bg: isOverviewPage ? 'bgInfo' : 'contrastLow',
                  }}
                >
                  <Icon as={Home16Filled} boxSize={4} />
                  <Box as="span" fontSize="sm">
                    Overview
                  </Box>
                </Flex>
                <Accordion
                  allowMultiple
                  p={8}
                  pt={0}
                  defaultIndex={entries.markdownFiles.map(
                    (_entry, index) => index
                  )}
                >
                  {entries.markdownFiles.map((entry, index) => {
                    /**
                     * `/overview` does not go in sidebar list
                     */
                    if (entry.href === '/docs/overview') {
                      return null
                    }
                    return <SidebarItem {...entry} key={index} />
                  })}
                </Accordion>
              </Box>
            </TabPanel>
            <TabPanel p={0}>
              <Box as="ul" overflowY="auto" maxH="calc(100vh - 230px)">
                <Accordion
                  allowMultiple
                  p={8}
                  defaultIndex={entries.markdownFiles.map(
                    (_entry, index) => index
                  )}
                >
                  {apiReferenceEntries.map(
                    ([name, content]: [string, any], index) => (
                      <SidebarItem
                        accordion
                        label={name}
                        key={index}
                        allowTooltip
                        content={content.map(
                          (item: {
                            label: string
                            href: string
                            badge: string
                            path: string
                          }) => ({
                            label: item.label,
                            href: item.href,
                            badge: item.badge,
                            description: item.path,
                          })
                        )}
                      />
                    )
                  )}
                </Accordion>
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  )
}

export default Sidebar
