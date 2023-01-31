import Image from 'next/image'
import { useRouter } from 'next/router'
import { FC } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'

import { Button } from '~/components/primitives/button'
import { useMedia } from '~/hooks/use-media'
import { isClient } from '~/lib/constants'

type AnchorProps = {
  slug: string
}

export const Anchor: FC<AnchorProps> = ({ slug }) => {
  const { replace } = useRouter()
  const isDesktop = useMedia('(min-width: 1024px)')

  return (
    <CopyToClipboard
      text={isClient ? `${window.location.href.split('#')[0]}#${slug}` : ''}
    >
      <Button
        variant="unstyled"
        className="inline ml-3 transition-opacity duration-200 xl:opacity-0 focus:outline-1 focus:outline-white focus:outline-offset-2"
        onClick={() => replace(`${window.location.href.split('#')[0]}#${slug}`)}
      >
        <Image
          src="/icons/anchor.svg"
          alt="Anchor icon"
          width={isDesktop ? 24 : 20}
          height={isDesktop ? 24 : 20}
        />
      </Button>
    </CopyToClipboard>
  )
}
