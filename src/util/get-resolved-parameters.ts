import { getReferenceSchema } from '@openapi-codegen/typescript/lib/core/getReferenceSchema'
import get from 'lodash/get'
import {
  ComponentsObject,
  isReferenceObject,
  OpenAPIObject,
  ParameterObject,
  ReferenceObject,
} from 'openapi3-ts'

export const getResolvedParameters = (
  parameters: (ParameterObject | ReferenceObject)[] | undefined,
  components?: ComponentsObject
): ParameterObject[] | null =>
  parameters
    ? parameters.map((paramOrRef) => {
        const param: ParameterObject = isReferenceObject(paramOrRef)
          ? get(
              components,
              paramOrRef.$ref.replace('#/components/', '').replace('/', '.')
            )
          : paramOrRef

        if (isReferenceObject(param.schema)) {
          const comp = components as Pick<OpenAPIObject, 'components'>

          param.schema = getReferenceSchema(param.schema.$ref, {
            components: comp,
          })
        }

        return param
      })
    : null
