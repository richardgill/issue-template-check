import { Code } from '@chakra-ui/react'
import clsx from 'clsx'
import dynamic from 'next/dynamic'
import rangeParser from 'parse-numeric-range'
import { FC, PropsWithChildren, useState } from 'react'
import { onlyText } from 'react-children-utilities'
import { CodeProps } from 'react-markdown/lib/ast-to-react'

import { Mermaid } from './mermaid'

/*
  `any` here because the types on Next.js' dynamic import are problematic
  ref: https://github.com/vercel/next.js/issues/4515
*/
const ConsoleWithCode = dynamic<any>(() =>
  import('./ConsoleWithCode').then(({ ConsoleWithCode }) => ConsoleWithCode)
)

export const Codeblock: FC<PropsWithChildren<CodeProps>> = ({
  children,
  node,
  className,
  inline,
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  // MDX code has extra lines
  // Remove empty newline at the end of the code block
  let childrenWithoutLastNewline = onlyText(children).replace(/\n$/, '')

  const hasHighlight = childrenWithoutLastNewline.startsWith('// highlight')
  let highlightLines: number[] = []

  if (hasHighlight) {
    const lines = childrenWithoutLastNewline.split('\n')
    // Remove the annotation from the documentation
    childrenWithoutLastNewline = lines.slice(1).join('\n')

    // Extract range to highlight
    highlightLines = rangeParser(lines[0].slice('// highlight '.length).trim())
  }

  if (inline) {
    return <Code>{children}</Code>
  }

  const language = className?.split('language-')[1] ?? ''
  let parsedMeta: undefined | { truncate: boolean }

  try {
    parsedMeta = JSON.parse(String(node.data?.meta))
    // eslint-disable-next-line no-empty
  } catch { }

  if (language === 'mermaid') {
    return <Mermaid>{children}</Mermaid>
  }

  const codeBlock = (
    <ConsoleWithCode
      language={language}
      lineProps={(lineNumber: number) => {
        if (hasHighlight) {
          const style = highlightLines.includes(lineNumber)
            ? {
              background: 'var(--chakra-colors-bgSuccess)',
              margin: '0 -16px',
              paddingLeft: '16px',
              display: 'block',
            }
            : null
          return { style }
        } else {
          return {}
        }
      }}
    >
      {onlyText(childrenWithoutLastNewline)}
    </ConsoleWithCode>
  )
  if (parsedMeta?.truncate) {
    return (
      <div className={clsx('overflow-hidden relative', !isExpanded && 'h-72')}>
        {codeBlock}
        {!isExpanded && (
          <div
            style={{
              // @ts-ignore This is valid CSS.
              '--tw-gradient-from': '#1e1e1e',
            }}
            className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black"
          />
        )}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute left-0 right-0 px-2 py-1 mx-auto font-sans text-xs bg-white rounded bottom-8 w-fit"
        >
          {isExpanded ? '- See less' : '+ See more'}
        </button>
      </div>
    )
  }

  return codeBlock
}
