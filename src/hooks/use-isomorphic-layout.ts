import { safeWindow } from '~/lib/utils'
import { useEffect, useLayoutEffect } from 'react'

const useIsomorphicLayoutEffect = safeWindow ? useLayoutEffect : useEffect

export default useIsomorphicLayoutEffect
