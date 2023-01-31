import {
  Table as ChakraTable,
  TableProps,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props<T> extends TableProps {
  /**
   * Table data is expected to be an array of objects like this:
   * [
   *  { id: "abc", name: "def" },
   * ]
   */

  data: T[]
  columns: (keyof T)[]
  formatColumns?: (column: keyof T) => string
  formatCell?: (
    [cellName, cellValue]: [keyof T, T[keyof T]],
    row: T
  ) => ReactNode
}

export const Table = <T extends Record<any, any>>({
  data,
  columns,
  formatColumns = (c) => String(c),
  formatCell = ([, val]) => val as unknown as ReactNode,
  ...props
}: Props<T>) => {
  return (
    <ChakraTable {...props}>
      <Thead>
        <Tr>
          {columns.map((col, i) => (
            <Th key={i} textTransform="uppercase">
              {formatColumns(col)}
            </Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {data.map((r, i) => (
          <Tr key={i}>
            {columns.map((c, i) => (
              <Td
                key={i}
                valign="top"
                maxW={columns.length - 1 === i ? 600 : 'auto'}
              >
                {formatCell([c, r[c]], r)}
              </Td>
            ))}
          </Tr>
        ))}
      </Tbody>
    </ChakraTable>
  )
}
