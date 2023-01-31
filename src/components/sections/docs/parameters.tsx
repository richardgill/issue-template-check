import { Box, Heading } from '@chakra-ui/react'
import { title } from 'case'
import { ParameterObject } from 'openapi3-ts'
import { FC } from 'react'

import { Table } from './table'

type Props = {
  parameters: ParameterObject[]
}

export const Parameters: FC<Props> = ({ parameters }) => (
  <Box bg="contrastLowest" borderRadius="md" p={4} mt={8} boxShadow="md">
    <Heading size="sm" mb={4}>
      Expected Parameters
    </Heading>

    <Table<Record<string, any>>
      size="sm"
      data={parameters}
      columns={['name', 'description', 'in', 'required', 'schema']}
      formatColumns={title}
      formatCell={([cellName, cellValue]) => {
        switch (cellName) {
          case 'name':
            return <code>{cellValue}</code>
          case 'required':
            return cellValue ? '✅' : '-'
          case 'schema': {
            if (typeof cellValue !== 'object') {
              return cellValue
            }

            if (cellValue.type === 'object') {
              return JSON.stringify(cellValue)
            }

            return cellValue.type
          }
          default:
            return cellValue
        }
      }}
    />
  </Box>
)
