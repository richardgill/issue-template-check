import { forwardRef } from 'react'

type SectionProps = {
  children: React.ReactNode
  className?: string
  id?: string
}

const Section = forwardRef<HTMLDivElement, SectionProps>(
  ({ children, className, id }, ref) => {
    return (
      <section className={className} id={id} ref={ref}>
        {children}
      </section>
    )
  }
)

Section.displayName = 'LayoutSection'

export default Section
