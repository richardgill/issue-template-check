/** @jsxImportSource @emotion/react */
// The source for this video is at https://rive.app/s/j8XMWSXZ90_OWSIuPg6hNg/
import { Box } from '@chakra-ui/react'
import { createRef, useEffect } from 'react'
export const XataAnimated: React.FC = () => {
  const videoRef = createRef<HTMLVideoElement>()
  // Firefox mobile tries to force the controls to show up, so we need to disable them
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.controls = false
    }
  }, [videoRef])
  return (
    <Box>
      <video
        src="/docs/xataloader.webm"
        ref={videoRef}
        autoPlay
        loop
        muted
        width="50"
        height="50"
        disableRemotePlayback
        css={{
          'pointer-events': 'none',
          '&::-webkit-media-controls-panel': {
            display: 'none',
          },
          '&::-webkit-media-controls-play-button': {
            display: 'none',
          },
          '&::-webkit-media-controls-start-playback-button': {
            display: 'none',
          },
          '&::-internal-media-controls-overlay-cast-button': {
            display: 'none',
          },
        }}
      >
        <source src="/xataloader.webm" type="video/webm" />
      </video>
    </Box>
  )
}
