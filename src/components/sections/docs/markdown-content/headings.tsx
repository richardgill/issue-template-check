import { kebab, title } from 'case'
import { FC, HTMLAttributes } from 'react'

import { Anchor } from './anchor'

type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export const Heading: FC<HeadingProps> = ({
  children,
  as = 'h2',
  ...props
}) => {
  const slug = kebab(String(children))

  switch (as) {
    case 'h3':
      return (
        <h3 {...props} className={props.className}>
          {typeof children === 'string' ? title(children) : children}
          <Anchor slug={slug} />
        </h3>
      )

    case 'h4':
      return (
        <h4 {...props} className={props.className}>
          {typeof children === 'string' ? title(children) : children}
          <Anchor slug={slug} />
        </h4>
      )

    case 'h5':
      return (
        <h5 {...props} className={props.className}>
          {typeof children === 'string' ? title(children) : children}
          <Anchor slug={slug} />
        </h5>
      )
    case 'h6':
      return (
        <h6 {...props} className={props.className}>
          {typeof children === 'string' ? title(children) : children}
          <Anchor slug={slug} />
        </h6>
      )

    case 'h2':
    default:
      return (
        <h2 {...props} className={props.className}>
          {typeof children === 'string' ? title(children) : children}
          <Anchor slug={slug} />
        </h2>
      )
  }
}
