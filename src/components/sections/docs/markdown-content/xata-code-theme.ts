import { SyntaxHighlighterProps } from 'react-syntax-highlighter'

export const xataCodeTheme = {
  'code[class*="language-"]': {
    fontFamily: 'var(--font-code)',
    fontSize: '13px',
    lineHeight: '1.375',
    direction: 'ltr',
    textAlign: 'left',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    MozTabSize: '2',
    OTabSize: '2',
    tabSize: '2',
    WebkitHyphens: 'none',
    MozHyphens: 'none',
    msHyphens: 'none',
    hyphens: 'none',
    background: 'var(--chakra-colors-codeBg)',
    color: 'var(--chakra-colors-text)',
  },
  'pre[class*="language-"]': {
    fontFamily: 'var(--font-code)',
    fontSize: '13px',
    lineHeight: '1.375',
    direction: 'ltr',
    textAlign: 'left',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    MozTabSize: '2',
    OTabSize: '2',
    tabSize: '2',
    WebkitHyphens: 'none',
    MozHyphens: 'none',
    msHyphens: 'none',
    hyphens: 'none',
    background: 'var(--chakra-colors-codeBg)',
    color: 'var(--chakra-colors-text)',
    padding: 'var(--chakra-space-4)',
    margin: 'var(--chakra-space-4 0',
    overflow: 'auto',
    borderRadius: 'var(--chakra-radii-md)',
  },
  'pre > code[class*="language-"]': {
    fontSize: '1em',
  },
  'pre[class*="language-"]::-moz-selection': {
    textShadow: 'none',
    background: '#dfe2f1',
  },
  'pre[class*="language-"] ::-moz-selection': {
    textShadow: 'none',
    background: '#dfe2f1',
  },
  'code[class*="language-"]::-moz-selection': {
    textShadow: 'none',
    background: '#dfe2f1',
  },
  'code[class*="language-"] ::-moz-selection': {
    textShadow: 'none',
    background: '#dfe2f1',
  },
  'pre[class*="language-"]::selection': {
    textShadow: 'none',
    background: '#dfe2f1',
  },
  'pre[class*="language-"] ::selection': {
    textShadow: 'none',
    background: '#dfe2f1',
  },
  'code[class*="language-"]::selection': {
    textShadow: 'none',
    background: '#dfe2f1',
  },
  'code[class*="language-"] ::selection': {
    textShadow: 'none',
    background: '#dfe2f1',
  },
  ':not(pre) > code[class*="language-"]': {
    padding: '.1em',
    borderRadius: '.3em',
  },
  comment: {
    color: 'var(--chakra-colors-contrastMedium)',
  },
  prolog: {
    color: '#898ea4',
  },
  doctype: {
    color: '#898ea4',
  },
  cdata: {
    color: '#898ea4',
  },
  punctuation: {
    color: 'var(--chakra-colors-teal-500)',
  },
  namespace: {
    opacity: '.7',
  },
  operator: {
    color: 'var(--chakra-colors-teal-500)',
  },
  boolean: {
    color: 'var(--chakra-colors-teal-500)',
  },
  number: {
    color: 'var(--chakra-colors-teal-500)',
  },
  property: {
    color: 'var(--chakra-colors-textSuccess)',
  },
  tag: {
    color: 'red',
  },
  string: {
    color: 'var(--chakra-colors-textPrimary)',
  },
  selector: {
    color: '#6679cc',
  },
  'attr-name': {
    color: 'var(--chakra-colors-teal-500)',
  },
  entity: {
    color: 'var(--chakra-colors-textPrimary)',
    cursor: 'help',
  },
  url: {
    color: 'var(--chakra-colors-textPrimary)',
  },
  '.language-css .token.string': {
    color: 'var(--chakra-colors-textPrimary)',
  },
  '.style .token.string': {
    color: 'var(--chakra-colors-textPrimary)',
  },
  'attr-value': {
    color: 'var(--chakra-colors-textAccent)',
  },
  keyword: {
    color: 'var(--chakra-colors-textAccent)',
  },
  control: {
    color: 'var(--chakra-colors-textAccent)',
  },
  directive: {
    color: 'var(--chakra-colors-textAccent)',
  },
  unit: {
    color: 'var(--chakra-colors-textAccent)',
  },
  statement: {
    color: 'var(--chakra-colors-textPrimary)',
  },
  regex: {
    color: 'var(--chakra-colors-textPrimary)',
  },
  atrule: {
    color: 'var(--chakra-colors-textPrimary)',
  },
  placeholder: {
    color: '#3d8fd1',
  },
  variable: {
    color: '#3d8fd1',
  },
  deleted: {
    textDecoration: 'line-through',
  },
  inserted: {
    borderBottom: '1px dotted #202746',
    textDecoration: 'none',
  },
  italic: {
    fontStyle: 'italic',
  },
  important: {
    fontWeight: 'bold',
    color: '#c94922',
  },
  bold: {
    fontWeight: 'bold',
  },
  'pre > code.highlight': {
    outline: '0.4em solid #c94922',
    outlineOffset: '.4em',
  },
  '.line-numbers.line-numbers .line-numbers-rows': {
    borderRightColor: '#dfe2f1',
  },
  '.line-number .line-numbers-ro': {
    color: '--var(chakra-colors-textSubtle)',
  },
  '.line-numbers .line-numbers-rows > span:before': {
    color: '--var(chakra-colors-textSubtle)',
  },
  '.line-highlight.line-highlight': {
    background:
      'linear-gradient(to right, rgba(107, 115, 148, 0.2) 70%, rgba(107, 115, 148, 0))',
  },
} satisfies SyntaxHighlighterProps['style']
