import { kebab } from 'case'
import * as cheerio from 'cheerio'
import { readFile } from 'fs/promises'
import { getAllFiles } from 'get-all-files'
import remarkFrontmatter from 'remark-frontmatter'
import remarkParse from 'remark-parse'
import remarkStringify from 'remark-stringify'
import slash from 'slash'
import { unified } from 'unified'
import { visit } from 'unist-util-visit'
import { describe, expect, it } from 'vitest'

type FilePath = string

describe('markdown link checker', async () => {
  // 1. Collect data from `/docs`
  const pages = new Map<
    FilePath,
    { anchors: Set<string>; links: Set<string>; isRef: boolean }
  >()

  for await (const filename of getAllFiles('./docs')) {
    if (!filename.endsWith('.md')) continue

    pages.set(
      slash(filename)
        .replace(/^\.\/docs/, '') // remove `/content`
        .slice(0, -3), // remove `.md`
      await parseMarkdown(filename)
    )
  }

  // 2. Generate unit tests
  Array.from(pages.entries()).forEach(([page, def]) => {
    if (def.links.size === 0) return
    describe(page, async () => {
      Array.from(def.links.values()).forEach((link) => {
        it(`should have ${link} define`, async () => {
          const [path, anchor] = link.split('#')
          expect(pages.has(path)).toBeTruthy()
          if (anchor && !pages.get(path)?.isRef) {
            expect(pages.get(path)?.anchors.has(anchor)).toBeTruthy()
          }
        })
      })
    })
  })
})

/**
 * Retrieve useful information from a markdown file.
 *
 * @param path file path
 */
async function parseMarkdown(path: string) {
  const document = await readFile(path, 'utf-8')
  const links = new Set<string>()
  const anchors = new Set<string>()
  let isRef = false // `true` if the markdown content is `See …`

  await unified()
    .use(remarkParse)
    .use(remarkFrontmatter)
    .use(() => {
      return function transform(tree) {
        visit(tree, 'link', (linkNode) => {
          if (
            linkNode.url.startsWith('/') &&
            !linkNode.url.startsWith('/api-reference')
          ) {
            links.add(linkNode.url)
          }
          if (linkNode.url.startsWith('https://docs.xata.io/')) {
            links.add(linkNode.url)
          }
        })

        visit(tree, 'html', (htmlNode) => {
          const $ = cheerio.load(htmlNode.value)

          $('a').each((_i, el) => {
            const href = $(el).attr('href')
            if (
              href &&
              href.startsWith('/') &&
              !href.startsWith('/api-reference')
            ) {
              links.add(href)
            }
          })
        })

        visit(tree, 'heading', (headingNode) => {
          if (headingNode.children[0].type === 'text') {
            anchors.add(kebab(headingNode.children[0].value))
          }
        })

        visit(tree, 'paragraph', (paragraphNode) => {
          if (
            paragraphNode.children.length === 1 &&
            paragraphNode.children[0].type === 'text' &&
            paragraphNode.children[0].value.startsWith('See ')
          ) {
            isRef = true
          }
        })
      }
    })
    .use(remarkStringify)
    .process(document)

  return {
    anchors,
    links,
    isRef
  }
}
