import { Box, ChakraProvider, Flex } from '@chakra-ui/react'
import { kebab, title } from 'case'
import { GetStaticPaths, GetStaticProps } from 'next'
import { isReferenceObject, PathItemObject } from 'openapi3-ts'
import { FC } from 'react'

import { PageLayout } from '~/components/layout/page'
import {
  ApiReferencePage,
  ApiReferencePageProps,
} from '~/components/sections/docs/api-reference-page'
import Sidebar, { SidebarEntries } from '~/components/sections/docs/sidebar'
import {
  buildSidebar,
  fetchApiReference,
} from '~/components/sections/docs/sidebar/sidebar'
import { siteOrigin } from '~/lib/constants'
import theme from '~/theme/theme'
import { getOpenapiReference } from '~/util/get-openapi-reference'
import { getResolvedParameters } from '~/util/get-resolved-parameters'
import { getResolvedResponses } from '~/util/get-resolved-responses'
import { getResponsesWithTypedefs } from '~/util/get-responses-with-typedefs'
import { headerLinks } from '~/util/header-links'
import { persistPageToXataForSearch } from '~/util/persist-page-to-xata-for-search'
import { sanitizeOpenApiPath } from '~/util/sanitize-open-api-path'
import { schemaToTypedef } from '~/util/schema-to-typedef'
import mdToTxt from 'markdown-to-txt'

const ApiReference: FC<
  ApiReferencePageProps & { sidebar: SidebarEntries; activeSidebarItem: string }
> = (props) => {
  return (
    <ChakraProvider theme={theme}>
      <PageLayout
        mainOverflowing={false}
        announcement={false}
        seoMetadata={{
          title: `${props.summary} | Xata`,
          description: props.description ?? 'Xata API Reference',
          ogImage: {
            width: 1920,
            height: 1080,
            url: `https://docs.xata.io/api/og-image?title=${encodeURIComponent(
              props.summary ?? ''
            )}&subtitle=${encodeURIComponent(
              siteOrigin + props.path
            )}&content=${encodeURIComponent(
              mdToTxt(props?.description ?? '')
            )}`,
          },
        }}
        header={{
          links: headerLinks.links,
        }}
      >
        <Flex
          flexDir={{ base: 'column', lg: 'row' }}
          borderTop="solid 1px"
          borderColor="stroke"
        >
          <Sidebar entries={props.sidebar} active={props.activeSidebarItem} />

          <Box as="main" flexGrow={1} mt={{ base: 24, lg: 8 }}>
            <Flex
              maxW={1200}
              width={{ base: '100%', lg: 'calc(100vw - 350px)' }}
              m="auto"
              gap={12}
              px={{ base: 4, lg: 12 }}
            >
              <ApiReferencePage {...props} />
            </Flex>
          </Box>
        </Flex>
      </PageLayout>
    </ChakraProvider>
  )
}

export default ApiReference

export const getStaticPaths: GetStaticPaths = async () => {
  const { pathList } = await fetchApiReference('main')
  // Paths without /api-reference & #fragment
  const cleanPaths = pathList.map(({ href }) => {
    const result = href.replace('/api-reference/', '').split('#')[0]
    return result
  })
  const pathsWithoutDuplicated = [...new Set(cleanPaths)]
  const paths = pathsWithoutDuplicated.map((href) => {
    return {
      params: { slug: href.split('/') },
    }
  })

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params?.slug) return { notFound: true, revalidate: 15 }

  const slug = params.slug as string[]

  const fullSlug = slug.length === 1 ? slug[0] : slug.join('/')

  if (/[{}]/gim.test(fullSlug)) {
    return {
      redirect: {
        destination: `/docs/api-reference/${sanitizeOpenApiPath(fullSlug)}`,
        permanent: false,
      },
    }
  }

  const spec = await getOpenapiReference()
  const path = Object.entries(spec.paths)?.find(
    ([specPath]) => sanitizeOpenApiPath(specPath) === `/${fullSlug}`
  ) as [string, PathItemObject]

  if (!path) return { notFound: true, revalidate: 15 }

  const [originalPath, details] = path

  const operations = await Promise.all(
    Object.entries(details)
      .filter((entry): entry is EntryOf<Record<string, OpenAPIOperation>> => {
        return ['post', 'get', 'put', 'patch', 'delete'].includes(entry[0])
      })
      .map(async ([method, info]) => {
        const operation = {
          ...info,
          method,
          responses: getResponsesWithTypedefs({
            responses: getResolvedResponses({
              responses: info.responses,
              spec,
            }),
            operationId: info.operationId,
            spec,
          }),
          path: originalPath,
          ...(info.requestBody &&
            !isReferenceObject(info.requestBody) && {
              typedef: schemaToTypedef({
                openAPIDocument: spec,
                schema: info.requestBody.content['application/json'].schema,
                operationId: info.operationId,
              }),
            }),
        }

        await persistPageToXataForSearch({
          content: `${operation.summary}\n${operation.description}`,
          modified_at: null,
          slug: `/docs/api-reference/${fullSlug}#${kebab(
            operation.operationId
          )}`,
          title: title(operation.operationId),
          section: 'api-reference',
          keywords: null,
        })

        return operation
      })
  )

  const { sidebar, prev, next } = await buildSidebar(
    '/docs/api-reference/' + fullSlug
  )
  const activeSidebarItem = Object.entries(sidebar.apiReference).find(
    ([, content]: [string, any]) =>
      content?.find(
        (item: {
          label: string
          href: string
          badge: string
          path: string
        }) => {
          const slug = item.href
            ?.split('/docs/api-reference/')
            .pop()
            ?.split('#')[0]
          return slug === fullSlug
        }
      )
  )

  return {
    props: {
      openApiBranch: 'main',
      operations,
      parameters: getResolvedParameters(details.parameters, spec.components),
      path: '/' + fullSlug,
      summary: details.summary || null,
      description: details.description || null,
      activeSidebarItem: activeSidebarItem?.[0] ?? null,
      sidebar,
      prev,
      next,
    },
    revalidate: 15,
  }
}
