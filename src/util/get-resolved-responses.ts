import { getReferenceSchema } from '@openapi-codegen/typescript/lib/core/getReferenceSchema'
import {
  isReferenceObject,
  OpenAPIObject,
  ReferenceObject,
  ResponseObject,
  ResponsesObject,
} from 'openapi3-ts'

export const getResolvedResponses = ({
  responses,
  spec,
}: {
  responses: ResponsesObject
  spec: OpenAPIObject
}): Record<string, OpenAPIResponse> =>
  Object.entries(responses).reduce(
    (mem, [statusCode, res]: [string, ResponseObject | ReferenceObject]) => {
      const responseObject = isReferenceObject(res)
        ? (getReferenceSchema(res.$ref, spec) as ResponseObject)
        : res

      if (
        typeof responseObject.content === 'object' &&
        isReferenceObject(responseObject.content['application/json'].schema)
      ) {
        responseObject.content['application/json'].schema = getReferenceSchema(
          responseObject.content['application/json'].schema.$ref,
          spec
        )
      }

      return { ...mem, [statusCode]: responseObject as OpenAPIOperation }
    },
    {} as Record<string, OpenAPIOperation>
  )
