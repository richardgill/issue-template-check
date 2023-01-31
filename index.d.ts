declare module 'markdown-yaml-metadata-parser'

type EntryOf<T extends object> = { [K in keyof T]: [K, T[K]] }[keyof T]
type RequestState = 'initial' | 'success' | 'error' | 'pending'

type OpenAPIResponse = {
  description: string
  content?: {
    'application/json': {
      schema: { allOf: JSONSchema4[] } | JSONSchema4
    }
  }
}

type OpenAPIOperation = {
  parameters?: ParameterObject[]
  operationId: string
  summary: string
  description: string
  requestBody?: {
    description: string
    content: {
      'application/json': {
        schema: SchemaObject
      }
    }
  }
  typedef?: string
  responses: Record<string, OpenAPIResponse>
  tags: string[]
  method?: string
  path?: string
}
