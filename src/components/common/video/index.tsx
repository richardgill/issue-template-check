import { useId } from '@radix-ui/react-id'
import clsx from 'clsx'
import Image from 'next/image'
import React, {
  forwardRef,
  LegacyRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import ReactPlayer, { Config } from 'react-player'

import s from './video.module.scss'

type VideoProps = {
  className?: string
  poster?: string
  width?: number
  height?: number
  url: string
  playing?: boolean
  fixOnScroll?: boolean
  smallButton?: boolean
  blackButton?: boolean
  controls?: boolean
  muted?: boolean
}

export const Video = forwardRef(
  (
    {
      className,
      poster,
      width = 1920,
      height = 1080,
      url,
      playing,
      fixOnScroll,
      controls = true,
      muted = true,
      ...rest
    }: VideoProps,
    ref: LegacyRef<ReactPlayer>
  ) => {
    const id = useId()
    const playerContainerRef = useRef<HTMLDivElement>(null)
    const [state, setState] = useState<{
      playing?: boolean
      fixedVideo: boolean
      animate: boolean
      imageLoaded?: boolean
    }>({
      playing,
      fixedVideo: false,
      animate: false,
    })

    const handleFixOnScroll = useCallback(() => {
      if (!playerContainerRef.current) return

      if (
        window.scrollY >
        playerContainerRef.current.offsetTop +
          playerContainerRef.current.offsetHeight
      ) {
        if (state.playing && !state.fixedVideo) {
          setState((prev) => ({ ...prev, fixedVideo: true }))
        }
      } else if (state.fixedVideo) {
        setState((prev) => ({ ...prev, fixedVideo: false }))
      }
    }, [state.playing, state.fixedVideo])

    const togglePlaying = useCallback(() => {
      if (!state.animate) {
        setState((prev) => ({ ...prev, animate: true, playing: true }))
      } else {
        setState((prev) => ({ ...prev, playing: !state.playing }))
      }
    }, [state.playing, state.animate])

    const updateOnEnd = useCallback(() => {
      setState((prev) => ({ ...prev, playing: false }))
    }, [])

    useEffect(() => {
      if (fixOnScroll) window.addEventListener('scroll', handleFixOnScroll)

      return () => {
        if (fixOnScroll) window.removeEventListener('scroll', handleFixOnScroll)
      }
    }, [state.imageLoaded, handleFixOnScroll, fixOnScroll])

    const aspectRatio = (height / width) * 100

    const config: Config | undefined = useMemo(() => {
      const isWistia = url?.includes('wistia.com')

      if (isWistia) {
        return {
          wistia: {
            playerId: id,
            playButton: false,
            playerColor: 'ff0000',
          },
        }
      }

      return undefined
    }, [id, url])

    return (
      <div className={className}>
        <div
          className={clsx(s.wrapper, {
            [s.fixed]: state.fixedVideo,
          })}
          style={{ paddingBottom: `${aspectRatio}%` }}
          ref={playerContainerRef}
        >
          <div className={clsx(s['video-container'])}>
            <div
              className={s['video-position']}
              style={{ paddingBottom: `${aspectRatio}%` }}
            >
              <ReactPlayer
                className="absolute inset-0"
                height="100%"
                width="100%"
                controls={controls}
                playing={playing || state.playing}
                muted={muted}
                url={url}
                onEnded={updateOnEnd}
                config={config}
                ref={ref}
                {...rest}
              />
            </div>
          </div>

          <div
            className={clsx('group', !playing && s['play-trap'], {
              [s.animate]: state.animate,
            })}
            onClick={togglePlaying}
          >
            {poster && (
              <>
                <div
                  className={clsx(s['photo-wrapper'], {
                    [s.animate]: state.animate,
                  })}
                >
                  <Image
                    alt=""
                    className="pointer-events-none"
                    src={poster}
                    fill
                    loading="eager"
                    priority
                  />
                </div>
                <div className={s['play-button']}>
                  <span>
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      width="22"
                      height="27"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M22 13.5.25 26.057V.943L22 13.5Z" fill="#fff" />
                    </svg>
                    <span className="sr-only">Play</span>
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    )
  }
)

Video.displayName = 'VideoPlayer'
