import clsx from 'clsx'
import { forwardRef } from 'react'

import s from './input.module.scss'

type InputProps = {
  type: 'text' | 'email' | 'password'
  placeholder: string
  disabled?: boolean
  className?: string
  name?: string
  id?: string
  autoFocus?: boolean
  smallPadding?: boolean
  value?: string
  rounded?: boolean
  readOnly?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClick?: (e: React.FocusEvent<HTMLInputElement>) => void
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type,
      placeholder,
      disabled = false,
      className = '',
      id,
      name,
      autoFocus,
      rounded = true,
      value,
      smallPadding = false,
      readOnly = false,
      onChange,
    },
    ref
  ) => (
    <span
      ref={ref}
      aria-label="Border"
      className={clsx(
        rounded ? s['input--rounded'] : s['input'],
        disabled && s['input--disabled'],
        className
      )}
    >
      <input
        aria-label={name}
        className={clsx(
          smallPadding ? 'py-[10px] md:py-2' : 'py-3 md:py-[14px]'
        )}
        onChange={onChange}
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        disabled={disabled}
        autoFocus={autoFocus}
        value={value}
        readOnly={readOnly}
      />
      <span />
    </span>
  )
)

Input.displayName = 'PrimitiveInput'
