/** @jsxImportSource @emotion/react */
import { Box } from '@chakra-ui/react'
import { css } from '@emotion/react'
import mermaid from 'mermaid'
import { FC, PropsWithChildren, useEffect } from 'react'

export const Mermaid: FC<PropsWithChildren> = ({ children }) => {
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      fontFamily: 'inherit'
    })
    mermaid.contentLoaded()
  }, [children])

  return (
    <Box
      as="figure"
      className="mermaid"
      m="auto"
      css={css`
        svg {
          margin: auto;
        }
        .node {
          rect {
            fill: var(--chakra-colors-contrastLow) !important;
            stroke: var(--chakra-colors-contrastMedium) !important;
          }

          div {
            font-size: var(--chakra-fontSizes-md);
            font-family: var(--chakra-fonts-body);
            border-radius: var(--charka-raddii-md) !important;
          }
        }

        .label,
        .nodeLabel {
          font-family: var(--chakra-fonts-body);
          color: var(--chakra-colors-text) !important;
        }

        .edgeLabel {
          font-family: var(--font-body);
          font-size: 12px;
          color: var(--chakra-colors-text) !important;

          span {
            color: var(--chakra-colors-text) !important;
            background-color: unset !important;
          }

          rect {
            fill: none !important;
            border-radius: var(--charka-raddii-md);
          }

          foreignObject {
            overflow: visible;

            div {
              width: 35px;
              height: 20px;

              span {
                text-transform: uppercase;
                padding: 4px 8px;
                border-radius: var(--charka-raddii-md);
                background-color: var(--chakra-colors-primary) !important;
                color: var(--chakra-colors-textInvert) !important;
              }
            }
          }
        }

        g.edgePath {
          path {
            stroke: #606060 !important;
          }
        }
      `}
    >
      {children}
    </Box>
  )
}
