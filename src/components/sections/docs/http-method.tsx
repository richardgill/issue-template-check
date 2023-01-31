import clsx from 'clsx'
import { FC } from 'react'

export const HttpMethod: FC<{ method: string }> = ({ method }) => (
  <span
    className={clsx(
      'text-xs rounded-lg p-1 font-bold mr-1 py-1 px-2',
      method === 'delete' &&
        'dark:bg-red-900 dark:text-red-200 bg-red-100 text-red-500',
      method === 'get' &&
        'dark:bg-neutral-900 dark:text-neutral-200 bg-neutral-100 text-neutral-500',
      method === 'post' &&
        'dark:bg-green-900 dark:text-green-200 bg-green-100 text-green-500',
      method === 'put' &&
        'dark:bg-orange-900 dark:text-orange-200 bg-orange-100 text-orange-500',
      method === 'patch' &&
        'dark:bg-orange-900 dark:text-orange-200 bg-orange-100 text-orange-500',
      !['post', 'get', 'put', 'patch', 'delete'].includes(method) &&
        'bg-gray-lighter bg-opacity-30 rounded text-gray-lighter my-1 mr-1 last:mr-0'
    )}
  >
    {method}
  </span>
)
