import { OpenAPIObject } from 'openapi3-ts'

import { schemaToTypedef } from './schema-to-typedef'

export const getResponsesWithTypedefs = ({
  responses,
  spec,
  operationId
}: {
  spec: OpenAPIObject
  responses: Record<string, OpenAPIResponse>
  operationId: string
}) => {
  return Object.fromEntries(
    Object.entries(responses).map(([statusCode, response]) => [
      statusCode,
      {
        ...response,
        content: {
          ...(response.content ?? {}),
          'application/json': {
            schema: {},
            ...(response.content?.['application/json'] ?? {}),
            ...(response.content?.['application/json'].schema && {
              typedef: schemaToTypedef({
                openAPIDocument: spec,
                schema: response.content?.['application/json'].schema,
                operationId
              })
            })
          }
        }
      }
    ])
  )
}
