import { kebab } from 'case'
import { readdir, readFile } from 'fs/promises'
import findLastIndex from 'lodash/findLastIndex'
import groupBy from 'lodash/groupBy'
import markdownToTxt from 'markdown-to-txt'
import metadataParser from 'markdown-yaml-metadata-parser'
import { join } from 'path'

import { getOpenapiReference } from '~/util/get-openapi-reference'
import { sanitizeOpenApiPath } from '~/util/sanitize-open-api-path'

import SidebarItem, { SidebarItemProps } from './sidebar-item'

export const DOCS_REPO_BASE_PATH = '/repos/xataio/docs'
export const DOCS_REPO_CONTENT_BASE_PATH = '/repos/xataio/docs/contents'

/**
 * These are left over from a legacy GitHub reader.
 * Let's restructure them to be a bit more reasonable in the future.
 *
 * Tracked in https://github.com/xataio/website/issues/150
 */
type DocsFileContent =
  | {
      type: 'tree'
      name: string
      object: { entries: DocsFileContent[]; text: never }
      text?: never
    }
  | {
      type: 'blob'
      name: string
      text: string
      object: { entries: never; text: string }
    }

const mapFileToSidebar = async (e: DocsFileContent, prevSegment: string) => {
  const { metadata } = metadataParser(e.object.text)

  if (metadata.sidebar_label && metadata.sidebar_position) {
    return {
      label: metadata.sidebar_label,
      position: metadata.sidebar_position,
      href: `/${prevSegment}${e.name.replace('.md', '')}`,
    }
  }

  if (e.object.text.startsWith('See')) {
    const [, sourceUrl] = e.object.text.split('See ')
    const response = await fetch(sourceUrl).then((r) => r.text())
    e.object.text = response
  }

  const { content } = metadataParser(e.object.text)

  return {
    label: markdownToTxt(content || '').split('\n')[0],
    position: 100,
    href: `/docs/${prevSegment}${e.name.replace('.md', '')}`,
  }
}

export const buildSidebar = async (slug?: string) => {
  const markdown = await fetchMarkdownFiles()
  const { markdownFiles, pathList: markdownFilesPathList } = markdown
  const api = await fetchApiReference('main')
  const { apiReference, pathList: apiReferencePathList } = api
  const allDocRoutes = [...markdownFilesPathList, ...apiReferencePathList]

  const currentRouteFirstIndex = allDocRoutes.findIndex(
    ({ href }) => href.split('#')[0] === slug
  )
  const currentRouteLastIndex = findLastIndex(
    allDocRoutes,
    ({ href }) => href.split('#')[0] === slug
  )
  const prev =
    currentRouteFirstIndex > 0 ? allDocRoutes[currentRouteFirstIndex - 1] : null
  const next =
    currentRouteLastIndex >= 0 &&
    currentRouteLastIndex < allDocRoutes.length - 1
      ? allDocRoutes[currentRouteLastIndex + 1]
      : null

  return {
    prev,
    next,
    sidebar: {
      markdownFiles,
      apiReference,
    },
  }
}

export const fetchMarkdownFiles = async () => {
  const docsFiles = await readdir(join(process.cwd(), 'docs'))
  const categories = docsFiles.filter((f) => !f.includes('.md'))
  const rootLevelFiles = docsFiles.filter((f) => f.includes('.md'))

  const repository: { object: { entries: DocsFileContent[] } } = {
    object: {
      entries: [
        ...(await Promise.all(
          rootLevelFiles.map(async (f) => {
            const text = await readFile(join(process.cwd(), 'docs', f), 'utf-8')
            return {
              type: 'blob',
              name: f,
              text,
              object: { text },
            }
          })
        )),
        ...(await Promise.all(
          categories.map(async (c) => {
            const unprocessedEntries = await readdir(
              join(process.cwd(), 'docs', c)
            )

            return {
              type: 'tree',
              name: c,
              object: {
                entries: await Promise.all(
                  unprocessedEntries.map(async (x) => {
                    const text = await readFile(
                      join(process.cwd(), 'docs', c, x),
                      'utf-8'
                    )
                    return {
                      type: 'blob',
                      name: x,
                      object: { text },
                      text,
                    }
                  })
                ),
              },
            }
          })
        )),
      ] as DocsFileContent[],
    },
  }

  const markdownFiles = await Promise.all(
    (repository.object.entries as DocsFileContent[])
      .filter(
        (e) =>
          (e.type === 'tree' &&
            e.object.entries.some((e) => e.name === 'sidebar.json')) ||
          e.name.endsWith('.md')
      )
      .map(async (e) => {
        // Is a directory
        if (e.type === 'tree') {
          const sidebarFile = e.object.entries.find(
            (e) => e.name === 'sidebar.json'
          )
          const sidebarConfig = JSON.parse(sidebarFile?.object.text ?? '{}')

          return {
            accordion: true,
            label: sidebarConfig.label,
            position: sidebarConfig.position,
            content: await (
              await Promise.all(
                e.object.entries
                  // Filter out sidebar.json file
                  .filter((_e) => _e.name.endsWith('.md'))
                  .map(async (_e) => await mapFileToSidebar(_e, e.name + '/'))
              )
            ).sort((a, b) => {
              if (!a.position) return -1
              if (!b.position) return 1

              return a.position < b.position ? -1 : 1
            }),
          }
        }

        return await mapFileToSidebar(e, '')
      })
  )

  markdownFiles.sort((a: any, b: any) => {
    // @ts-ignore
    if (!a.position) return -1
    // @ts-ignore
    if (!b.position) return 1

    // @ts-ignore
    return a.position < b.position ? -1 : 1
  })
  const pathList = (markdownFiles as SidebarItemProps[]).reduce<
    { title: string; href: string }[]
  >((acum, current) => {
    if (current.href) {
      acum.push({ title: current.label, href: current.href })
    }
    if (current.content) {
      acum.push(
        ...current.content.map(({ label, href }) => ({ title: label, href }))
      )
    }

    return acum
  }, [])
  return { markdownFiles, pathList }
}

export const fetchApiReference = async (openApiBranch: string) => {
  const apiReference = await getOpenapiReference(openApiBranch)

  const apiReferenceEntries = getApiReferenceMenuItems(
    groupBy(
      Object.entries(apiReference.paths).reduce(
        (acc, [path, pathConfig]) =>
          [
            ...acc,
            ...Object.keys(pathConfig)
              .filter((k) =>
                ['post', 'get', 'put', 'patch', 'delete'].includes(k)
              )
              .map((k) => ({ method: k, path, ...pathConfig[k] })),
          ] as never[],
        []
      ),
      'tags'
    )
  )

  const pathList = (
    Object.values(apiReferenceEntries).flat() as SidebarItem[]
  ).map(({ label, href }) => ({ title: label, href }))

  return { apiReference: apiReferenceEntries, pathList }
}

const getApiReferenceMenuItems = (
  apiReference: Record<string, Operation[]> | any
) =>
  Object.entries(apiReference).reduce(
    (acc, [group, routes]) => ({
      ...acc,
      [group]: (
        routes as {
          method: keyof typeof HTTP_METHODS_COLOR
          path: string
          summary: string
        }[]
      ).map((r) => ({
        label: r.summary || r.path,
        href: `/api-reference${sanitizeOpenApiPath(r.path)}#${kebab(
          r.summary
        )}`,
        path: r.path,
        badge: {
          label: r.method,
          backgroundColor: HTTP_METHODS_COLOR[r.method],
        },
      })),
    }),
    {}
  )

type Operation = {
  summary: string
  path: string
  method: 'post' | 'get' | 'put' | 'patch' | 'delete'
}

export const HTTP_METHODS_COLOR: { [key: string]: string } = {
  get: 'gray',
  put: 'orange',
  delete: 'red',
  post: 'green',
  patch: 'blue',
}
