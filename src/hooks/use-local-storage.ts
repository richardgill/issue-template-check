import { noop } from 'lodash'
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

// Code based from: https://github.com/streamich/react-use/blob/master/src/useLocalStorage.ts (The Unlicense)

const isBrowser = typeof window !== 'undefined'

type ParserOptions<T> = SerializerParserOptions<T> & {
  initialValue?: T
}

type SerializerParserOptions<T> =
  | {
      raw: true
    }
  | {
      raw: false
      serializer: (value: T) => string
      deserializer: (value: string) => T
    }

export function useLocalStorage<T>(
  key: string,
  defaultValue: T | (() => T),
  options?: ParserOptions<T>
): [T, Dispatch<SetStateAction<T>>] {
  const deserializer = useMemo(
    () =>
      options
        ? options.raw
          ? (value: string) => value
          : options.deserializer
        : JSON.parse,
    [options]
  )

  // Watch for local storage events
  useEffect(() => {
    const onStorageUpdate = (event: StorageEvent) => {
      if (event.key === key && event.newValue) {
        try {
          const validatedValues = deserializer(event.newValue)
          setState(validatedValues)
        } catch {
          window.localStorage.removeItem(key)
        }
      }
    }

    window.addEventListener('storage', onStorageUpdate)

    return () => window.removeEventListener('storage', onStorageUpdate)
  }, [deserializer, key])

  if (!isBrowser) {
    return [defaultValue as T, noop]
  }

  if (!key) {
    throw new Error('useLocalStorage key may not be falsy')
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const initializer = useRef((key: string) => {
    const serializer = options
      ? options.raw
        ? String
        : options.serializer
      : JSON.stringify

    try {
      if (options?.initialValue) {
        localStorage.setItem(key, serializer(options.initialValue))
        return options.initialValue
      }

      const localStorageValue = localStorage.getItem(key)
      if (!localStorageValue) {
        throw new Error('localStorage value is not set')
      }

      return deserializer(localStorageValue)
    } catch (error) {
      // If user is in private mode or has storage restriction
      // localStorage can throw. JSON.parse and JSON.stringify
      // can throw, too.

      const value = buildValue(defaultValue)
      localStorage.setItem(key, serializer(value))
      return value
    }
  })

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [state, setState] = useState<T>(() => initializer.current(key))

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useLayoutEffect(() => setState(initializer.current(key)), [key])

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const set: Dispatch<SetStateAction<T>> = useCallback(
    (valOrFunc) => {
      try {
        const newState =
          typeof valOrFunc === 'function'
            ? (valOrFunc as Function)(state)
            : valOrFunc
        if (typeof newState === 'undefined') return
        let value: string

        if (options) {
          if (options.raw) {
            if (typeof newState === 'string') value = newState
            else value = JSON.stringify(newState)
          } else if (options.serializer) value = options.serializer(newState)
          else value = JSON.stringify(newState)
        } else value = JSON.stringify(newState)

        localStorage.setItem(key, value)
        setState(deserializer(value))
      } catch {
        // If user is in private mode or has storage restriction
        // localStorage can throw. Also JSON.stringify can throw.
      }
    },
    [key, setState, state, deserializer, options]
  )

  return [state, set]
}

const buildValue = <T>(value: T | (() => T)): T => {
  if (typeof value === 'function') {
    return (value as Function)()
  }
  return value
}
