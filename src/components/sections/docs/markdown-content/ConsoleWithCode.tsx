import {
  Box,
  Button,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import { ChevronDown12Filled } from '@fluentui/react-icons'
import { marked } from 'marked'
import { FC, PropsWithChildren, useState } from 'react'
import { LightAsync as SyntaxHighlighter } from 'react-syntax-highlighter'

import { Console } from '~/components/common/console'
import { getPrismLanguage } from '~/util/getPrismLanguage'

import { syntaxTheme } from './syntaxTheme'

type Props = {
  children: string
  language: string
  lineProps?: object
}

const formattedLanguageMap: { [key: string]: string } = {
  json: 'JSON',
  ts: 'JS/TS',
  typescript: 'JS/TS',
}

const formatLanguage = (language: string) => {
  // check if language is a key in the map
  if (language in formattedLanguageMap) {
    return formattedLanguageMap[language]
  } else {
    return language
  }
}

const commandLineLangs = ['shell', 'sh', 'bash', 'text']

export const ConsoleWithCode: FC<PropsWithChildren<Props>> = ({
  children,
  language,
  lineProps,
}) => {
  const languages = language.split('|')
  const [activeLanguageIndex, setActiveLanguageIndex] = useState<number>(0)

  if (languages.length > 1) {
    const snippets: { code: string; language?: string }[] = []
    marked.use({
      renderer: {
        code(code, language) {
          snippets.push({ code, language })
          return ''
        },
      },
    })
    marked(children)

    // If we're told we have multiple languages, but we don't have any snippets...
    if (languages.length !== snippets.length) {
      const expectedLanguages = languages.join(', ')
      const snippetLanguages = snippets.map((s) => s.language).join(', ')

      console.warn(
        `The first line of this multi-code snippet tells us to expect snippets for ${expectedLanguages}, but we only found ${snippets.length} snippets, for languages ${snippetLanguages}. Please either adjust the first line of the multi-code snippet, or add a snippet for the missing language.`
      )
    }

    return (
      <Console
        pt={4}
        headerContent={
          <Box position="absolute" top={0} right={2}>
            <Menu>
              <MenuButton
                as={Button}
                bg="contrastLowest"
                size="xs"
                data-testid={'language-selector-menu'}
                rightIcon={<Icon as={ChevronDown12Filled} boxSize={4} />}
                sx={{
                  '&:hover': {
                    bg: 'contrastLow',
                  },
                }}
              >
                {formatLanguage(languages[activeLanguageIndex])}
              </MenuButton>
              <MenuList>
                {languages.map((language, index) => (
                  <MenuItem
                    key={index}
                    data-testid={`language-selector-button-${language}`}
                    onClick={() => {
                      setActiveLanguageIndex(index)
                    }}
                  >
                    {formatLanguage(language)}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </Box>
        }
      >
        <SyntaxHighlighter
          language={getPrismLanguage(languages[activeLanguageIndex])}
          style={syntaxTheme}
          data-testid="code-snippet"
          lineProps={lineProps}
          wrapLines={lineProps ? true : false}
          showLineNumbers={
            commandLineLangs.includes(
              getPrismLanguage(languages[activeLanguageIndex])
            )
              ? false
              : true
          }
        >
          {
            snippets.find(
              ({ language }) => language === languages[activeLanguageIndex]
            )?.code as string
          }
        </SyntaxHighlighter>
      </Console>
    )
  }

  return (
    <Console>
      <SyntaxHighlighter
        language={getPrismLanguage(language)}
        style={syntaxTheme}
        lineProps={lineProps}
        wrapLines={lineProps ? true : false}
        showLineNumbers={commandLineLangs.includes(language) ? false : true}
      >
        {children}
      </SyntaxHighlighter>
    </Console>
  )
}
