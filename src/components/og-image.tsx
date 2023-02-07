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
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        <style
          dangerouslySetInnerHTML={{
            __html: `html,body{font-family: 'Inter', sans-serif; margin:0; padding:0;}@font-face {
              font-family: 'Eina03';
              font-style: normal;
              font-weight: 300;
              font-display: block;
              src: url('${host}/fonts/eina03/Eina03-Light.woff2') format('woff2'),
                url('${host}/fonts/eina03/Eina03-Light.woff') format('woff');
            }

            * {
              text-rendering: optimizeLegibility;
              font-smoothing: antialiased;
              -webkit-font-smoothing: antialiased;
            }
            
            @font-face {
              font-family: 'Eina03';
              font-style: italic;
              font-weight: 300;
              font-display: block;
              src: url('${host}/fonts/eina03/Eina03-LightItalic.woff2') format('woff2'),
                url('${host}/fonts/eina03/Eina03-LightItalic.woff') format('woff');
            }
            
            @font-face {
              font-family: 'Eina03';
              font-style: normal;
              font-weight: 400;
              font-display: block;
              src: url('${host}/fonts/eina03/Eina03-Regular.woff2') format('woff2'),
                url('${host}/fonts/eina03/Eina03-Regular.woff') format('woff');
            }
            
            @font-face {
              font-family: 'Eina03';
              font-style: italic;
              font-weight: 400;
              font-display: block;
              src: url('${host}/fonts/eina03/Eina03-RegularItalic.woff2') format('woff2'),
                url('${host}/fonts/eina03/Eina03-RegularItalic.woff') format('woff');
            }
            
            @font-face {
              font-family: 'Eina03';
              font-style: normal;
              font-weight: 600;
              font-display: block;
              src: url('${host}/fonts/eina03/Eina03-SemiBold.woff2') format('woff2'),
                url('${host}/fonts/eina03/Eina03-SemiBold.woff') format('woff');
            }
            
            @font-face {
              font-family: 'Eina03';
              font-style: italic;
              font-weight: 600;
              font-display: block;
              src: url('${host}/fonts/eina03/Eina03-SemiBoldItalic.woff2') format('woff2'),
                url('${host}/fonts/eina03/Eina03-SemiBoldItalic.woff') format('woff');
            }
            
            @font-face {
              font-family: 'Eina03';
              font-style: normal;
              font-weight: 700;
              font-display: block;
              src: url('${host}/fonts/eina03/Eina03-Bold.woff2') format('woff2'),
                url('${host}/fonts/eina03/Eina03-Bold.woff') format('woff');
            }
            
            @font-face {
              font-family: 'Eina03';
              font-style: italic;
              font-weight: 700;
              font-display: block;
              src: url('${host}/fonts/eina03/Eina03-BoldItalic.woff2') format('woff2'),
                url('${host}/fonts/eina03/Eina03-BoldItalic.woff') format('woff');
            }
            
            
            @font-face {
              font-family: Inter;
              font-weight: 100 900;
              font-display: block;
              font-style: normal;
              font-named-instance: 'Regular';
              src: url('${host}/fonts/inter/Inter-roman.var.woff2?v=3.15') format('woff2');
            }
            
            @font-face {
              font-family: Inter;
              font-weight: 100 900;
              font-display: block;
              font-style: italic;
              font-named-instance: 'Italic';
              src: url('${host}/fonts/inter/Inter-italic.var.woff2?v=3.15') format('woff2');
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
            <img width="100%" src={`${host}/img/og-image/bg.jpg`} />
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
                  fontFamily: 'Eina03',
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
