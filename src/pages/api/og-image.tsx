import { title as toTitleCase } from 'case'
import { ImageResponse } from '@vercel/og'

import { OgImage } from '~/components/og-image'
import { NextRequest } from 'next/server'

export const config = {
  runtime: 'edge',
}

export default async function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url)

  const title = searchParams.get('title') || ''
  const subtitle = searchParams.get('subtitle') || ''
  const content = searchParams.get('content') || ''

  const host = `http${
    process.env.NODE_ENV === 'production' ? 's' : ''
  }://${req.headers.get('host')}/docs`

  // Fonts
  const eina03SemiBold = await fetch(
    new URL(
      `../../../public/fonts/eina03/Eina03-SemiBold.woff`,
      import.meta.url
    )
  ).then((res) => res.arrayBuffer())

  const eina03Light = await fetch(
    new URL(`../../../public/fonts/eina03/Eina03-Light.woff`, import.meta.url)
  ).then((res) => res.arrayBuffer())

  return new ImageResponse(
    (
      <OgImage
        title={toTitleCase(String(title))}
        subtitle={String(subtitle)}
        content={content ? String(content) : undefined}
        host={host}
      />
    ),
    {
      height: 630,
      width: 1200,
      fonts: [
        { name: 'Eina03', data: eina03Light, style: 'normal' },
        { name: 'Eina03', data: eina03SemiBold, weight: 600 },
      ],
    }
  )
}
