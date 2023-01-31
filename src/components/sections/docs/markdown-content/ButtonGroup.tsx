import clsx from 'clsx'
import { FC, PropsWithChildren } from 'react'

type Props = {
  buttons: string[]
  generateButtonTestId?: (button: string) => string
  activeButtonIndex: number
  onButtonClick: (index: number) => void
  formatButtonLabel?: (label: string) => string
}

export const ButtonGroup: FC<PropsWithChildren<Props>> = ({
  buttons,
  formatButtonLabel,
  onButtonClick,
  generateButtonTestId,
  activeButtonIndex
}) => (
  <ul className="flex items-center p-[1px] gap-[4px] ml-auto text-sm bg-rainbow-radial-gradient-diagonal font-inter rounded-sm">
    {buttons.map((button, i) => (
      <li key={button}>
        <button
          data-testid={generateButtonTestId?.(button)}
          className={clsx(
            activeButtonIndex === i ? '' : 'outline outline-black',
            'px-1 font-semibold hover:bg-black hover:bg-opacity-70 transition bg-black'
          )}
          onClick={() => onButtonClick(i)}
        >
          {formatButtonLabel ? formatButtonLabel(button) : button}
        </button>
      </li>
    ))}
  </ul>
)
