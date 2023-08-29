import { useEffect, useRef } from 'react'

export type ButtonStyle = 'default' | 'green' | 'red'

export const getButtonClass = (style?: ButtonStyle) => {
  switch (style) {
    case 'green':
      return 'button--green'
    case 'red':
      return 'button--red'
    default:
      return ''
  }
}

export interface ButtonProps {
  style?: ButtonStyle
  circle?: boolean
  onClick: () => void
  error?: boolean | string
  children?: React.ReactNode
}

const Button = ({ style, circle, onClick, error, children }: ButtonProps) => {
  const button = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!button.current) return
    if (error) {
      const hasErrorMsg = typeof error === 'string'
      button.current.setCustomValidity(hasErrorMsg ? error : 'invalid')
      if (hasErrorMsg) button.current.reportValidity()
    } else {
      button.current.setCustomValidity('')
    }
  }, [error])

  return (
    <button
      ref={button}
      className={`button ${getButtonClass(style)}
        rounded-full leading-none duration-150
        ${circle ? 'aspect-square p-2' : 'px-3 py-2'}`}
      onClick={() => onClick()}
    >
      {children}
    </button>
  )
}

export default Button
