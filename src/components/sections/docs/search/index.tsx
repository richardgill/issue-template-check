import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Code,
  Flex,
  Heading,
  Hide,
  Icon,
  IconButton,
  Input,
  Kbd,
  LinkBox,
  LinkOverlay,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  Tooltip,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import {
  ChevronRight16Filled,
  Eye16Filled,
  Search24Filled,
} from '@fluentui/react-icons'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'

import useCommandD from '~/hooks/use-command-d'
import { useDebounce } from '~/hooks/use-debounce'
import { useLocalStorage } from '~/hooks/use-local-storage'
import { isClient } from '~/lib/constants'

import { MarkdownContent } from '../markdown-content'

type Props = {
  openApiBranch?: string
}

type SearchResult = {
  title: string
  contentText: string
  slug: string
  id: string
  content: string
  xata: any
}

export const Search = ({ openApiBranch = 'main' }: Props) => {
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState<SearchResult>()
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const resultsRef = useRef<HTMLDivElement>(null)
  const debouncedQuery = useDebounce(query, 300)
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isMac, setIsMac] = useState<boolean>()
  const [previewType, setPreviewType] = useLocalStorage<string>(
    `previewType`,
    'preview'
  )
  useCommandD(() => onOpen())

  useEffect(() => {
    if (window.navigator.platform.toLowerCase().includes('mac')) {
      setIsMac(true)
    } else {
      setIsMac(false)
    }
  }, [])

  useEffect(() => {
    if (!focused || !resultsRef.current) return

    const resultElement = resultsRef.current.querySelector(
      '[data-id="' + focused.id + '"]'
    )

    if (!resultElement) return

    resultElement.scrollIntoView({ block: 'center' })
  }, [focused])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setFocused((prevFocused: any) => {
          const index = results.indexOf(prevFocused)

          if (index === -1 || index === results.length - 1) return prevFocused

          return results[index + 1]
        })
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setFocused((prevFocused: any) => {
          const index = results.indexOf(prevFocused)

          if (index === -1 || index === 0) return prevFocused

          return results[index - 1]
        })
      }

      if (e.key === 'Enter' && focused) {
        e.preventDefault()
        router.push(`/${focused.slug}`)
        setQuery('')
        onClose()
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onClose, results, router, focused, isOpen])

  useEffect(() => {
    // Be safe, use the next effect under this one.
    if (!('AbortController' in window)) return

    const controller = new AbortController()

    if (!query.length) {
      setResults([])
      return
    }

    setLoading(true)
    fetch(
      `/api/search?query=${encodeURIComponent(query)}&branch=${openApiBranch}`,
      { signal: controller.signal }
    )
      .then((r) => r.json())
      .then((results) => {
        setResults(results)
        setFocused(results[0])
      })
      .then(() => setLoading(false))

    return () => {
      controller.abort()
    }
  }, [openApiBranch, query])

  /**
   * This entire effect is just a fallback in case of an older browser that
   * does not support AbortController and will usually not be called.
   *
   * It needs to be a seperate effect because it only runs when `debouncedQuery`
   * changes.
   */
  useEffect(() => {
    // If we can abort requests on keystroke, we don't need to respond to a debounced query since we can cancel pending requests on keystroke.
    if ('AbortController' in window) return

    if (!debouncedQuery.length) {
      setResults([])
      return
    }

    setLoading(true)
    fetch(
      `/api/search?query=${encodeURIComponent(
        debouncedQuery
      )}&branch=${openApiBranch}`
    )
      .then((r) => r.json())
      .then((results) => {
        setResults(results)
        setFocused(results[0])
      })
      .then(() => setLoading(false))
  }, [openApiBranch, debouncedQuery])

  const hasResults = results.length > 0

  const handleClose = () => {
    setQuery('')
    onClose()
  }

  let searchPreview = null
  if (focused && focused.content) {
    if (previewType === 'preview') {
      searchPreview = (
        <Box
          w="70%"
          p={12}
          position="absolute"
          right={0}
          bottom={0}
          top={0}
          bg="contrastEmpty"
          overflowY="auto"
          overflowX="hidden"
          borderLeft="solid 1px"
          borderColor="stroke"
        >
          <Flex alignItems="center" gap={2} mb={2}>
            <Badge colorScheme="green">
              Score: {focused.xata.score.toFixed(2)}
            </Badge>
            <Text size="xs" color="textSubtle">
              This search is powered by Xata!
            </Text>
          </Flex>
          {focused.slug.split('/').includes('api-reference') ? (
            <>
              <Heading as="h3" size="lg" mb={8}>
                {focused.title}
              </Heading>
              <MarkdownContent>{focused.content}</MarkdownContent>
              <Button
                as={NextLink}
                href={focused.slug}
                colorScheme="primary"
                mt={8}
              >
                See full API details
              </Button>
            </>
          ) : (
            <MarkdownContent>{focused.content}</MarkdownContent>
          )}
        </Box>
      )
    }
  }

  let modalWidth = '3xl'
  if (previewType === 'preview') {
    modalWidth = '75vw'
  }

  return (
    <>
      <Box pos="relative" onClick={onOpen}>
        <Input
          placeholder="Search"
          type="text"
          name="search"
          cursor="pointer"
        />
        {isMac !== undefined && (
          <Flex
            gap={1}
            pos="absolute"
            right={2}
            top={1.5}
            cursor="pointer"
            visibility={{ base: 'hidden', lg: 'visible' }}
          >
            {isMac ? <Kbd>⌘</Kbd> : <Kbd>ctrl</Kbd>}
            <Text> + </Text>
            <Kbd>k</Kbd>
          </Flex>
        )}
      </Box>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay backdropFilter="blur(4px)" bg="blackAlpha.700" />
        <ModalContent
          outline="solid 12px"
          outlineColor="whiteAlpha.400"
          bg="black"
          boxShadow="3xl"
          w={{ base: '90vw', lg: modalWidth }}
          maxW={{ base: '100%', lg: 1200 }}
          mt={{ base: '5vh', lg: '15vh' }}
        >
          <ModalBody borderRadius={10} pt={4} pl={0} pr={0} pb={0}>
            <Flex alignItems="center" px={4}>
              <Icon as={Search24Filled} color="ghost" boxSize={6} mb={4} />
              <Input
                size="lg"
                variant="unstyled"
                bg="black"
                color="ghost"
                px={4}
                pb={4}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
                placeholder="Search"
              />
              <Hide below="lg">
                <ButtonGroup size="xs" isAttached pb={4}>
                  <Button
                    colorScheme={previewType === 'none' ? 'primary' : undefined}
                    onClick={() => setPreviewType('none')}
                  >
                    Compact
                  </Button>
                  <Button
                    colorScheme={
                      previewType === 'preview' ? 'primary' : undefined
                    }
                    onClick={() => setPreviewType('preview')}
                  >
                    Preview
                  </Button>
                </ButtonGroup>
              </Hide>
            </Flex>
            <Flex
              bg="contrastEmpty"
              borderBottomRadius={4}
              maxH={{ base: `60vh`, lg: `60vh` }}
              minH={hasResults ? `60vh` : `auto`}
              overflow="hidden"
              position="relative"
            >
              <Box
                w={{
                  base: '100%',
                  lg: previewType === 'none' ? '100%' : '30%',
                }}
                overflowY="auto"
                ref={resultsRef}
              >
                {(() => {
                  if (!query) {
                    return null
                  }

                  if (loading) {
                    return (
                      <Flex justifyContent="space-between" p={12}>
                        <Text>Loading...</Text>
                      </Flex>
                    )
                  }

                  if (!hasResults && !loading) {
                    return (
                      <Flex justifyContent="space-between" p={12}>
                        <Text>No results match your search</Text>
                      </Flex>
                    )
                  }
                  return results.map((r) => {
                    const url = r.slug.startsWith('/docs')
                      ? r.slug.replace('/docs', '')
                      : r.slug

                    return (
                      <LinkBox
                        key={r.id}
                        justifyContent="start"
                        alignItems="start"
                        bg={focused === r ? 'contrastLowest' : 'transparent'}
                        _hover={{
                          bg: 'contrastLowest',
                          borderColor: 'stroke',
                        }}
                        py={2}
                        px={4}
                        data-id={r.id}
                        borderTop="solid 1px"
                        borderBottom="solid 1px"
                        borderColor={focused === r ? 'stroke' : 'transparent'}
                        role="group"
                        position="relative"
                      >
                        <VStack spacing={0} alignItems="start">
                          <Flex alignItems="start" gap={2}>
                            <LinkOverlay
                              as={NextLink}
                              onClick={handleClose}
                              href={`${url}${
                                isClient ? window.location.search : ''
                              }`}
                            >
                              <Flex alignItems="start" gap={1}>
                                {r === focused && (
                                  <Icon
                                    as={ChevronRight16Filled}
                                    boxSize={4}
                                    color="yellow.500"
                                    mt={0.5}
                                  />
                                )}
                                <Box>
                                  <Text
                                    fontWeight="bold"
                                    mb={0.5}
                                    noOfLines={1}
                                    sx={{
                                      em: {
                                        textDecoration: 'underline',
                                        color: 'textPrimary',
                                        fontStyle: 'normal',
                                      },
                                    }}
                                  >
                                    {r.xata.highlight.title ? (
                                      <span
                                        dangerouslySetInnerHTML={{
                                          __html: r.xata.highlight.title,
                                        }}
                                      />
                                    ) : (
                                      <span>{r.title}</span>
                                    )}
                                    {r.xata.highlight.content !== undefined && (
                                      <Text
                                        as="span"
                                        fontSize="xs"
                                        fontWeight="normal"
                                        color="textSubtle"
                                      >
                                        {' '}
                                        (+{r.xata.highlight.content.length}{' '}
                                        hits)
                                      </Text>
                                    )}
                                  </Text>
                                  <Flex alignItems="start" gap={1}>
                                    {r.slug.includes('api-reference') ? (
                                      <Badge
                                        colorScheme="pink"
                                        fontSize="xx-small"
                                        variant="subtle"
                                        mt={0.25}
                                      >
                                        API
                                      </Badge>
                                    ) : (
                                      <Badge
                                        colorScheme="teal"
                                        fontSize="xx-small"
                                        mt={0.25}
                                      >
                                        Guide
                                      </Badge>
                                    )}
                                    <Code
                                      bg="transparent"
                                      fontSize="xs"
                                      color="textSubtle"
                                      noOfLines={1}
                                    >
                                      /docs{r.slug}
                                    </Code>
                                  </Flex>
                                </Box>
                              </Flex>
                            </LinkOverlay>
                            {previewType == 'preview' && r !== focused && (
                              <Tooltip label="Show preview">
                                <IconButton
                                  visibility="hidden"
                                  _groupHover={{ visibility: 'visible' }}
                                  pos="absolute"
                                  zIndex={2}
                                  right={2}
                                  top={0}
                                  mt={4}
                                  aria-label="Preview"
                                  colorScheme="primary"
                                  size="xs"
                                  icon={<Icon as={Eye16Filled} boxSize={4} />}
                                  onClick={() => setFocused(r)}
                                />
                              </Tooltip>
                            )}
                          </Flex>
                        </VStack>
                      </LinkBox>
                    )
                  })
                })()}
              </Box>
              {!loading && hasResults && (
                <Hide below="lg">{searchPreview}</Hide>
              )}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
