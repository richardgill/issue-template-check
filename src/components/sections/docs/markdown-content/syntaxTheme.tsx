import { SyntaxHighlighterProps } from 'react-syntax-highlighter'

export const syntaxTheme = {
  // prettier-ignore
  'hljs': {
    display: 'block',
    color: 'var(--chakra-colors-text)',
    background: 'var(--chakra-colors-codeBg)',
    fontSize: '13px',
    padding: 'var(--chakra-space-4)',
    borderRadius: 'var(--chakra-radii-md)',
    maxWidth: '100%',
    overflowX: 'auto'
  },
  'hljs-comment': {
    color: 'var(--chakra-colors-contrastMedium)',
  },

  'hljs-subst': {
    color: 'var(--chakra-colors-contrastHigh)',
  },
  'hljs-selector-tag': {
    color: 'red',
  },
  'hljs-selector-id': {
    color: 'var(--chakra-colors-textPrimary)',
    fontWeight: 'bold',
  },
  'hljs-selector-class': {
    color: 'var(--chakra-colors-textPrimary)',
  },
  'hljs-selector-attr': {
    color: 'var(--chakra-colors-textPrimary)',
  },
  'hljs-selector-pseudo': {
    color: 'var(--chakra-colors-pink-300)',
  },
  'hljs-addition': {
    backgroundColor: 'var(--chakra-colors-bgSuccess)',
  },
  'hljs-deletion': {
    backgroundColor: 'var(--chakra-colors-bgDanger)',
  },
  'hljs-built_in': {
    color: 'var(--chakra-colors-textPrimary)',
  },
  'hljs-type': {
    color: 'var(--chakra-colors-textPrimary)',
  },
  'hljs-class': {
    color: 'var(--chakra-colors-textPrimary)',
  },
  'hljs-function': {
    color: 'var(--chakra-colors-pink-300)',
  },
  'hljs-function > .hljs-title': {
    color: 'var(--chakra-colors-pink-300)',
  },
  'hljs-keyword': {
    color: 'var(--chakra-colors-textAccent)',
  },
  'hljs-literal': {
    color: 'var(--chakra-colors-textAccent)',
  },
  'hljs-symbol': {
    color: 'var(--chakra-colors-textAccent)',
  },
  'hljs-number': {
    color: 'var(--chakra-colors-textDanger)',
  },
  'hljs-regexp': {
    color: '#EBCB8B',
  },
  'hljs-string': {
    color: 'var(--chakra-colors-textAccent)',
  },
  'hljs-title': {
    color: 'var(--chakra-colors-textPrimary)',
  },
  'hljs-params': {
    color: 'var(--chakra-colors-contrastHigh)',
  },
  'hljs-bullet': {
    color: 'var(--chakra-colors-textAccent)',
  },
  'hljs-code': {
    color: 'var(--chakra-colors-textPrimary)',
  },
  'hljs-emphasis': {
    fontStyle: 'italic',
  },
  'hljs-formula': {
    color: 'var(--chakra-colors-textPrimary)',
  },
  'hljs-strong': {
    fontWeight: 'bold',
  },
  'hljs-link:hover': {
    textDecoration: 'underline',
  },
  'hljs-quote': {
    color: 'var(--chakra-colors-contrastMedium)',
  },
  'hljs-doctag': {
    color: 'var(--chakra-colors-textPrimary)',
  },
  'hljs-meta': {
    color: 'var(--chakra-colors-textSuccess)',
  },
  'hljs-meta-keyword': {
    color: 'var(--chakra-colors-textSuccess)',
  },
  'hljs-meta-string': {
    color: 'var(--chakra-colors-textSubtle)',
  },
  'hljs-attr': {
    color: 'var(--chakra-colors-textPrimary)',
  },
  'hljs-attribute': {
    color: 'var(--chakra-colors-contrastHigh)',
  },
  'hljs-builtin-name': {
    color: 'var(--chakra-colors-textAccent)',
  },
  'hljs-name': {
    color: 'var(--chakra-colors-textAccent)',
  },
  'hljs-section': {
    color: 'var(--chakra-colors-pink-300)',
  },
  'hljs-tag': {
    color: 'var(--chakra-colors-textAccent)',
  },
  'hljs-variable': {
    color: 'var(--chakra-colors-contrastHigh)',
  },
  'hljs-template-variable': {
    color: 'var(--chakra-colors-contrastHigh)',
  },
  'hljs-template-tag': {
    color: 'var(--chakra-colors-textSuccess)',
  },
  'abnf .hljs-attribute': {
    color: 'var(--chakra-colors-pink-300)',
  },
  'abnf .hljs-symbol': {
    color: '#EBCB8B',
  },
  'apache .hljs-attribute': {
    color: 'var(--chakra-colors-pink-300)',
  },
  'apache .hljs-section': {
    color: 'var(--chakra-colors-textAccent)',
  },
  'arduino .hljs-built_in': {
    color: 'var(--chakra-colors-pink-300)',
  },
  'aspectj .hljs-meta': {
    color: 'var(--chakra-colors--textWarning)',
  },
  'aspectj > .hljs-title': {
    color: 'var(--chakra-colors-pink-300)',
  },
  'bnf .hljs-attribute': {
    color: 'var(--chakra-colors-textPrimary)',
  },
  'clojure .hljs-name': {
    color: 'var(--chakra-colors-pink-300)',
  },
  'clojure .hljs-symbol': {
    color: '#EBCB8B',
  },
  'coq .hljs-built_in': {
    color: 'var(--chakra-colors-pink-300)',
  },
  'cpp .hljs-meta-string': {
    color: 'var(--chakra-colors-textPrimary)',
  },
  'css .hljs-built_in': {
    color: 'var(--chakra-colors-pink-300)',
  },
  'css .hljs-keyword': {
    color: 'var(--chakra-colors--textWarning)',
  },
  'diff .hljs-meta': {
    color: 'var(--chakra-colors-textPrimary)',
  },
  'ebnf .hljs-attribute': {
    color: 'var(--chakra-colors-textPrimary)',
  },
  'glsl .hljs-built_in': {
    color: 'var(--chakra-colors-pink-300)',
  },
  'groovy .hljs-meta:not(:first-child)': {
    color: 'var(--chakra-colors--textWarning)',
  },
  'haxe .hljs-meta': {
    color: 'var(--chakra-colors--textWarning)',
  },
  'java .hljs-meta': {
    color: 'var(--chakra-colors--textWarning)',
  },
  'ldif .hljs-attribute': {
    color: 'var(--chakra-colors-textPrimary)',
  },
  'lisp .hljs-name': {
    color: 'var(--chakra-colors-pink-300)',
  },
  'lua .hljs-built_in': {
    color: 'var(--chakra-colors-pink-300)',
  },
  'moonscript .hljs-built_in': {
    color: 'var(--chakra-colors-pink-300)',
  },
  'nginx .hljs-attribute': {
    color: 'var(--chakra-colors-pink-300)',
  },
  'nginx .hljs-section': {
    color: 'var(--chakra-colors-textSuccess)',
  },
  'pf .hljs-built_in': {
    color: 'var(--chakra-colors-pink-300)',
  },
  'processing .hljs-built_in': {
    color: 'var(--chakra-colors-pink-300)',
  },
  'scss .hljs-keyword': {
    color: 'var(--chakra-colors-textAccent)',
  },
  'stylus .hljs-keyword': {
    color: 'var(--chakra-colors-textAccent)',
  },
  'swift .hljs-meta': {
    color: 'var(--chakra-colors--textWarning)',
  },
  'vim .hljs-built_in': {
    color: 'var(--chakra-colors-pink-300)',
    fontStyle: 'italic',
  },
  'yaml .hljs-meta': {
    color: 'var(--chakra-colors--textWarning)',
  },
  linenumber: {
    color: 'var(--chakra-colors-contrastMedium)',
  },
} satisfies SyntaxHighlighterProps['style']
