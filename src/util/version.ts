import compact from 'lodash/compact'

export const deployedVersion = () =>
  compact([
    process.env.NEXT_PUBLIC_VERCEL_ENV || 'unknown',
    process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
      ? process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF
      : process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA,
  ]).join('-')
