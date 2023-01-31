import { Badge, Box, Flex, Heading } from '@chakra-ui/react'
import { kebab, title } from 'case'
import clsx from 'clsx'
import { ParameterObject } from 'openapi3-ts'
import { FC } from 'react'
import { LightAsync as SyntaxHighlighter } from 'react-syntax-highlighter'

import { Console } from '~/components/common/console'
import { MarkdownContent } from '~/components/sections/docs/markdown-content'
import { syntaxTheme } from '~/components/sections/docs/markdown-content/syntaxTheme'

import { ApiPath } from '../api-path'
import DocFooter, { type DocFooterProps } from '../doc-footer'
import { xataCodeTheme } from '../markdown-content/xata-code-theme'
import { Parameters } from '../parameters'
import { Table } from '../table'

export type ApiReferencePageProps = {
  openApiBranch: string
  operations: OpenAPIOperation[]
  parameters: ParameterObject[]
  path: string
  summary?: string
  description?: string
} & DocFooterProps

export const ApiReferencePage: FC<ApiReferencePageProps> = ({
  operations,
  parameters,
  path,
  summary,
  description,
  prev,
  next
}) => {
  const pathWithDomain = clsx(
    path.startsWith('/db')
      ? `https://{your-workspace-slug}.{region}.xata.sh${path}`
      : `https://api.xata.io${path}`
  )
  const HTTP_METHODS_COLOR: { [key: string]: string } = {
    get: 'gray',
    put: 'orange',
    delete: 'red',
    post: 'green',
    patch: 'blue'
  }

  return (
    <Box flexGrow={1} w="100%">
      <Heading as="h1" variant="md" mb={2}>
        {summary || 'API Reference'}
      </Heading>
      <ApiPath path={pathWithDomain} mb={8} />
      {description && <MarkdownContent>{description}</MarkdownContent>}
      {parameters && <Parameters parameters={parameters} />}
      {operations?.map((o) => {
        const operationData: (OpenAPIResponse & { statusCode: string })[] =
          Object.entries(o.responses).map(
            ([statusCode, response]) => ({
              statusCode,
              ...response
            }),
            {}
          )
        let badgeColor = 'gray'
        if (o.method !== undefined) {
          badgeColor = HTTP_METHODS_COLOR[o.method]
        }

        return (
          <Box as="section" key={o.operationId}>
            <Box>
              <Flex alignItems="center" gap={4} mb={2} mt={24}>
                <Heading as="h2" id={kebab(o.summary)} size="lg">
                  {title(o.summary)}
                </Heading>
                {o.method && (
                  <Badge fontSize="md" colorScheme={badgeColor}>
                    {o.method.toUpperCase()}
                  </Badge>
                )}
              </Flex>
              <ApiPath path={pathWithDomain} mb={8} />
            </Box>
            {o.description && (
              <MarkdownContent>{o.description}</MarkdownContent>
            )}
            {o.parameters && <Parameters parameters={o.parameters} />}
            {o.requestBody?.content['application/json'].schema.example && (
              <div className="grid gap-2">
                <strong className="mb-4 text-xl leading-none lg:mb-6">
                  Request Body Example
                </strong>
                <Console className="w-full max-w-xl mx-auto my-10 xl:my-14">
                  <SyntaxHighlighter
                    style={xataCodeTheme}
                    language="json"
                    className="p-4 rounded-lg bg-blue-darker xl:p-8"
                  >
                    {JSON.stringify(
                      o.requestBody.content['application/json'].schema.example,
                      null,
                      2
                    )}
                  </SyntaxHighlighter>
                </Console>
              </div>
            )}
            {o.typedef && (
              <Box my={6}>
                <Heading as="h3" size="sm" mb={4}>
                  Request Body Type Definition
                </Heading>
                <Console>
                  <SyntaxHighlighter
                    language="typescript"
                    style={syntaxTheme}
                    wrapLines={true}
                    showLineNumbers={true}
                  >
                    {o.typedef}
                  </SyntaxHighlighter>
                </Console>
              </Box>
            )}
            <Box>
              <Table
                data={operationData}
                columns={['statusCode', 'description', 'content']}
                formatColumns={(colName: string) =>
                  colName === 'content'
                    ? 'Example Response/Type Definition'
                    : title(colName)
                }
                formatCell={([cellKey, cellValue]: [
                  cellKey: string,
                  cellValue: any
                ]) => {
                  if (cellKey === 'content') {
                    return cellValue?.['application/json'].schema.example ? (
                      <SyntaxHighlighter style={syntaxTheme} language="json">
                        {JSON.stringify(
                          cellValue?.['application/json'].schema.example,
                          null,
                          2
                        )}
                      </SyntaxHighlighter>
                    ) : cellValue?.['application/json'].typedef ? (
                      <SyntaxHighlighter
                        style={syntaxTheme}
                        language="typescript"
                      >
                        {cellValue?.['application/json'].typedef}
                      </SyntaxHighlighter>
                    ) : null
                  }

                  return typeof cellValue === 'string' ? cellValue : null
                }}
              />
            </Box>
          </Box>
        )
      })}
      <DocFooter next={next} prev={prev} />
    </Box>
  )
}
