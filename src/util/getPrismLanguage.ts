/**
 * Map a language string to an available prism language
 *
 * https://github.com/react-syntax-highlighter/react-syntax-highlighter/blob/master/AVAILABLE_LANGUAGES_PRISM.MD
 */
export const getPrismLanguage = (language: string) => {
  if (language === 'ts') return 'typescript'
  if (language === 'tsx') return 'typescript'
  if (language === 'sh') return 'bash'
  if (language === 'shell') return 'bash'

  return language
}
