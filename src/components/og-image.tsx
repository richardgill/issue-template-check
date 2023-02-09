import { FC } from 'react'

type Props = {
  title: string
  subtitle: string
  content?: string
  host: string
}

export const OgImage: FC<Props> = ({ title, subtitle, content, host }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        color: 'white',
        paddingLeft: 68,
        paddingRight: 64,
        paddingTop: 200,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt="background"
        src={`${host}/images/og-background.jpg`}
        height={630}
        width={1200}
        style={{
          position: 'absolute',
        }}
      />
      <h1
        style={{
          fontFamily: 'Eina03',
          fontSize: 54,
          margin: 0,
          paddingBottom: 8,
          fontWeight: 600,
          lineHeight: 1,
        }}
      >
        {title}
      </h1>
      <p
        style={{
          fontSize: 24,
          margin: 0,
          color: '#999',
          fontFamily: 'Eina03',
          lineHeight: 1,
        }}
      >
        {subtitle}
      </p>
      {content && (
        <p
          style={{
            marginTop: 32,
            fontSize: 30,
            fontFamily: 'Eina03',
            fontWeight: 600,
            lineHeight: 1.6,
          }}
        >
          {content.slice(0, 280)}
          {content.length > 280 && '...'}
        </p>
      )}
    </div>
  )
}
