import {
  Box,
  chakra,
  Heading,
  Image,
  Link,
  ListItem,
  OrderedList,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  UnorderedList,
} from '@chakra-ui/react'
import { kebab } from 'case'
import NextImage from 'next/image'
import NextLink from 'next/link'
import { parse } from 'querystring'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import { SpecialComponents } from 'react-markdown/lib/ast-to-react'
import { NormalComponents } from 'react-markdown/lib/complex-types'
import { ReactElement } from 'react-markdown/lib/react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'

import { Video } from '~/components/common/video'
import { Callout } from '~/components/sections/docs/callout'

import { Codeblock } from './codeblock'

const CharkraReactMarkdown = chakra(ReactMarkdown)

const commonProps = {
  sx: {
    '&:not(:last-child)': {
      mb: 6,
    },
  },
}

const isChildAnElement = (c: any): c is ReactElement =>
  c !== null && typeof c === 'object' && 'type' in c

const MarkdownComponents: Partial<
  Omit<NormalComponents, keyof SpecialComponents> & SpecialComponents
> = {
  blockquote: Callout as unknown as keyof SpecialComponents,
  p: ({ children }) => {
    const childrenIsAnImage = children.some(
      (child) => isChildAnElement(child) && child.type === 'img'
    )

    return !childrenIsAnImage ? (
      <Text fontSize="md" {...commonProps}>
        {children}
      </Text>
    ) : (
      <>{children}</>
    )
  },
  h1: ({ children }) => (
    <Heading as="h1" id={kebab(String(children))} {...commonProps}>
      {children}
    </Heading>
  ),
  h2: ({ children }) => (
    <Heading
      as="h2"
      size="lg"
      id={kebab(String(children))}
      fontWeight="semibold"
      color="title"
      {...commonProps}
      pt={8}
    >
      {children}
    </Heading>
  ),
  h3: ({ children }) => (
    <Heading
      as="h3"
      size="md"
      id={kebab(String(children))}
      fontWeight="semibold"
      {...commonProps}
      pt={8}
      color="title"
    >
      {children}
    </Heading>
  ),
  h4: ({ children }) => (
    <Heading
      as="h4"
      size="sm"
      fontWeight="semibold"
      id={kebab(String(children))}
      {...commonProps}
      pt={8}
      color="title"
    >
      {children}
    </Heading>
  ),
  h5: ({ children }) => (
    <Heading
      as="h5"
      size="sm"
      fontWeight="semibold"
      id={kebab(String(children))}
      {...commonProps}
      pt={8}
      color="title"
    >
      {children}
    </Heading>
  ),
  h6: ({ children }) => (
    <Heading
      as="h6"
      size="sm"
      id={kebab(String(children))}
      {...commonProps}
      pt={8}
      color="title"
    >
      {children}
    </Heading>
  ),
  li: ({ children }) => <ListItem>{children}</ListItem>,
  ul: ({ children }) => (
    <UnorderedList {...commonProps}>{children}</UnorderedList>
  ),
  ol: ({ children }) => <OrderedList {...commonProps}>{children}</OrderedList>,
  pre: ({ children }) => (
    <Box as="pre" {...commonProps}>
      {children}
    </Box>
  ),
  img: ({ src, alt }) => {
    if (!src) return null

    const videoFormats = ['mp4', 'webm']
    const fullSrc = src.startsWith('/docs/images/docs')
      ? src
      : `https://xata-docs.vercel.app${src}`

    if (
      videoFormats.some((format) => src.includes(format)) ||
      src.includes('youtube')
    ) {
      const sources = decodeURIComponent(src).split('|')
      const fileName = sources[0].split('/').slice(-1)[0]
      const [, extension] = fileName.split('.')
      const isYoutubeVideo = src.includes('youtube')

      if (isYoutubeVideo) return <Video url={src} />

      return (
        <figure key={sources[0]}>
          <video
            playsInline
            autoPlay
            onPlay={(e) => (e.currentTarget.playbackRate = 2)}
            loop
            poster={`https://xata-docs.vercel.app${sources[0].replace(
              `.${extension}`,
              'Poster.png'
            )}`}
            muted
            disablePictureInPicture
          >
            {sources.map((s, index) => {
              const [, sourceExtension] = s.split('.')

              return (
                <source
                  key={index}
                  src={`https://xata-docs.vercel.app${s}`}
                  type={`video/${sourceExtension}`}
                />
              )
            })}
          </video>
          <Text mt={2} color="textSubtle">
            {alt}
          </Text>
        </figure>
      )
    }

    const { w: width, h: height } = parse(src.split('?')[1])

    if (!width || !height) {
      return (
        <Image
          src={fullSrc}
          alt={alt || 'Image'}
          margin="auto"
          borderRadius="md"
          {...commonProps}
        />
      )
    }

    return (
      <figure key={src}>
        <Image
          as={NextImage}
          src={fullSrc}
          width={parseFloat(String(width))}
          height={parseFloat(String(height))}
          placeholder="blur"
          blurDataURL={fullSrc}
          borderRadius="md"
          margin="auto"
          alt={alt || 'Image'}
        />
        <Text mt={2} color="textSubtle">
          {alt}
        </Text>
      </figure>
    )
  },
  code: Codeblock as unknown as keyof SpecialComponents,
  video: ({ src }) => <Video url={src as string} />,
  a: ({ children, href }) => {
    return (
      <Link as={NextLink} href={href}>
        {children}
      </Link>
    )
  },
  text: ({ children }) => <p className="text-magenta">{children}</p>,
  table: ({ children }) => (
    <Table {...commonProps} size="sm">
      {children}
    </Table>
  ),
  thead: ({ children }) => <Thead>{children}</Thead>,
  tbody: ({ children }) => <Tbody>{children}</Tbody>,
  th: ({ children }) => <Th>{children}</Th>,
  td: ({ children }) => <Td>{children}</Td>,
  tr: ({ children }) => <Tr>{children}</Tr>,
}

export const MarkdownContent = ({ children }: { children: string }) => (
  <CharkraReactMarkdown
    // TODO: Rehype clobbers the regex in the codeblock component
    rehypePlugins={[rehypeRaw]}
    remarkPlugins={[remarkGfm]}
    components={MarkdownComponents}
  >
    {children}
  </CharkraReactMarkdown>
)
