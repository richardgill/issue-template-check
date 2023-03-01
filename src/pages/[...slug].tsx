import {
  Box,
  ChakraProvider,
  Flex,
  Heading,
  Hide,
  Link,
  Button,
  Text,
  Divider,
} from '@chakra-ui/react'
import { title } from 'case'
import { readFile, stat } from 'fs/promises'
import { markdownToTxt } from 'markdown-to-txt'
import metadataParser from 'markdown-yaml-metadata-parser'
import { marked } from 'marked'
import { GetStaticPaths, GetStaticProps } from 'next'
import { join } from 'path'
import { createElement, type FC } from 'react'

import { PageLayout } from '~/components/layout/page'
import DocFooter, {
  DocFooterProps,
} from '~/components/sections/docs/doc-footer'
import { MarkdownContent } from '~/components/sections/docs/markdown-content'
import Sidebar, { SidebarEntries } from '~/components/sections/docs/sidebar'
import {
  buildSidebar,
  fetchMarkdownFiles,
} from '~/components/sections/docs/sidebar/sidebar'
import { SidebarItemProps } from '~/components/sections/docs/sidebar/sidebar-item'
import { siteOrigin } from '~/lib/constants'
import { diffBetweenToDates } from '~/lib/utils/dates'
import theme from '~/theme/theme'
import { headerLinks } from '~/util/header-links'
import { persistPageToXataForSearch } from '~/util/persist-page-to-xata-for-search'
import mdToTxt from 'markdown-to-txt'
import { ChatModal } from '~/components/common/chat'

type Heading = { level: number; slug: string; text: string }

type Props = {
  content: string
  sidebar: SidebarEntries
  activeSidebarItem: string
  slug: string
  headings: Heading[]
} & DocFooterProps

const Doc: FC<Props> = ({
  prev,
  next,
  content,
  slug,
  lastModified,
  sidebar,
  headings,
  activeSidebarItem,
}) => {
  const title = markdownToTxt(content || '').split('\n')[0]
  const description = markdownToTxt(content || '').split('\n')[2]

  if (!content) return null

  return (
    <ChakraProvider theme={theme}>
      <PageLayout
        mainOverflowing={false}
        announcement={false}
        seoMetadata={{
          title: `${title} | Xata`,
          description: description,
          ogImage: {
            width: 1920,
            height: 1080,
            url: `https://docs.xata.io/api/og-image?title=${encodeURIComponent(
              title
            )}&subtitle=${encodeURIComponent(
              `${siteOrigin}/docs/${slug}`
            )}&content=${encodeURIComponent(mdToTxt(description))}`,
          },
        }}
        header={{
          links: headerLinks.links,
        }}
      >
        <Flex flexDir={{ base: 'column', lg: 'row' }}>
          <Sidebar entries={sidebar} active={activeSidebarItem} />
          <Box
            as="main"
            flexGrow={1}
            mt={{ base: 24, lg: 8 }}
            px={{ base: 4, lg: 12 }}
          >
            <Flex maxW={1200} w="full" m="auto" gap={12}>
              <Box
                flexGrow={1}
                width={{ base: '100%', lg: 'calc(100vw - 690px)' }}
                maxW={960}
                m="auto"
              >
                <Flex align="center" mb={4} gap={4}>
                  <Text color="textSubtle">Want to find the answer quick?</Text>

                  <ChatModal
                    button={
                      <Button size="xs" colorScheme="primary">
                        Ask our chat bot
                      </Button>
                    }
                  />
                </Flex>
                <Divider mb={4} />
                <MarkdownContent>{content}</MarkdownContent>
                <DocFooter
                  lastModified={lastModified}
                  prev={prev}
                  next={next}
                />
              </Box>
              {/* We remove the H1, so check for > 2 */}
              <Hide below="xl">
                {headings.length > 2 && (
                  <Box minW={240}>
                    <Box pos="sticky" top="102px" pr={4}>
                      <Heading as="p" size="sm" mb={4}>
                        On this page
                      </Heading>
                      {headings.map(({ level, text, slug }) => {
                        // Indent based on heading level
                        if (level === 1) return null
                        let levelPadding = 0
                        if (level === 3) levelPadding = 4
                        if (level === 4) levelPadding = 8
                        return createElement(
                          `h${level}`,
                          {
                            key: slug,
                          },
                          <Link
                            fontSize="xs"
                            color="textSubtle"
                            href={`#${slug}`}
                            display="block"
                            py={1}
                            ml={levelPadding}
                            dangerouslySetInnerHTML={{ __html: text }}
                          ></Link>
                        )
                      })}
                    </Box>
                  </Box>
                )}
              </Hide>
            </Flex>
          </Box>
        </Flex>
      </PageLayout>
    </ChakraProvider>
  )
}

export default Doc

export const getStaticPaths: GetStaticPaths = async () => {
  const { pathList } = await fetchMarkdownFiles()
  const paths = pathList.map(({ href }) => {
    const slug = href.startsWith('/docs/')
      ? href.replace('/docs/', '')
      : href.replace('/', '')

    return {
      params: { slug: slug.split('/') },
    }
  })

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  if (!params) return { notFound: true, revalidate: 15 }

  if (!Array.isArray(params.slug)) return { notFound: true, revalidate: true }

  const slug: string[] = params.slug
  const path = slug.slice(0, -1)
  const fileName = slug[slug.length - 1] + '.md'
  const file = join(process.cwd(), 'docs', ...path, fileName)
  try {
    await stat(file)
  } catch {
    return { notFound: true, revalidate: true }
  }

  const fileContent = await readFile(file, 'utf8')
  const { mtime } = await stat(file)
  const parsed = metadataParser(fileContent)
  let { content } = parsed
  const { metadata } = parsed

  if (content.startsWith('See')) {
    const [, sourceUrl] = content.split('See ')
    const response = await fetch(sourceUrl).then((r) => r.text())
    content = response
  }

  const { sidebar, prev, next } = await buildSidebar('/' + slug)
  const activeMdItemName = sidebar.markdownFiles.find(
    ({ href, content }: SidebarItemProps) => {
      return href
        ? href.substring(6, href.length) === slug.join('/')
        : content?.find(
            (item) =>
              item.href.substring(6, item.href.length) === slug.join('/')
          )
    }
  )

  const modifiedAt = mtime
  const today = new Date()
  const lastModified = diffBetweenToDates(modifiedAt ?? today, today)
  const slugPath = slug.join('/')
  const section = slugPath.startsWith('examples/') ? 'examples' : 'guide'

  await persistPageToXataForSearch({
    content,
    modified_at: modifiedAt ? modifiedAt.toISOString() : null,
    slug: `/docs/${slugPath}`,
    title: title(content.trim().split('\n')[0].replace(/#/gi, '')).trim(),
    section,
    keywords: metadata.keywords || null,
  })

  const headings: Heading[] = []
  marked.use({
    renderer: {
      heading(text, level, raw, slugger) {
        headings.push({ level, slug: slugger.slug(raw), text })
        return text
      },
    },
  })
  marked(content)

  return {
    props: {
      prev,
      next,
      content,
      lastModified,
      sidebar,
      slug: slug.join('/'),
      activeSidebarItem: activeMdItemName?.label ?? null,
      headings,
    },
    revalidate: 15,
  }
}
