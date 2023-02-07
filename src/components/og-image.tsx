import { FC } from 'react'
import removeMarkdown from 'markdown-to-txt'

type Props = {
  title: string
  subtitle: string
  content?: string
  host: string
}

export const OgImage: FC<Props> = ({ title, subtitle, content, host }) => {
  return (
    <html lang="en">
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `html,body{font-family: 'Inter', sans-serif; margin:0; padding:0;}

            * {
              text-rendering: optimizeLegibility;
              font-smoothing: antialiased;
              -webkit-font-smoothing: antialiased;
            }
            
            
            @font-face {
              font-family: 'Eina03';
              font-style: normal;
              font-weight: 400;
              font-display: block;
              src: url('${host}/fonts/eina03/Eina03-Regular.woff2') format('woff2'),
                url('${host}/fonts/eina03/Eina03-Regular.woff') format('woff');
            }
            `,
          }}
        />
      </head>
      <body>
        <div
          style={{
            width: 1200,
            height: 630,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            alignItems: 'center',
            paddingLeft: 32,
            paddingRight: 64,
            overflow: 'hidden',
            color: 'white',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              zIndex: -1,
              width: '100vw',
              height: '100vh',
            }}
          >
            <img width="100%" src={`${host}/images/og-background.jpg`} />
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 64,
              width: '100%',
            }}
          >
            <div
              style={{
                display: 'grid',
                gap: 16,
                paddingRight: 64,
                paddingLeft: 38,
                paddingTop: 140,
              }}
            >
              <h1
                style={{
                  fontFamily: 'Eina03, Inter, sans-serif',
                  fontSize: 54,
                  margin: 0,
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
                  fontFamily: 'Eina03, Inter, sans-serif',
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
                    fontFamily: 'Eina03, Inter, sans-serif',
                    fontWeight: 600,
                    lineHeight: 1.6,
                  }}
                >
                  {removeMarkdown(content).slice(0, 280)}
                  {content.length > 280 && '...'}
                </p>
              )}
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
