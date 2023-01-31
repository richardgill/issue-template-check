import { useEffect } from 'react'

const useCommandD = (cb: () => void) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && e.metaKey) {
        e.preventDefault()
        e.stopPropagation()
        cb()
      }
    }
    document.addEventListener('keydown', handleKeyDown)

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [cb])
}

export default useCommandD
