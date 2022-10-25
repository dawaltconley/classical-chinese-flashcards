import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSunBright, faMoon } from '@fortawesome/pro-light-svg-icons'
import { useState, useEffect, useRef } from 'react'
import { useMediaQuery } from 'react-responsive'

type ButtonStyle = 'default' | 'green' | 'red'
type Button = (props: {
  style?: ButtonStyle
  circle?: boolean
  onClick: () => void
  error?: boolean | string
  children?: React.ReactNode
}) => JSX.Element

const getButtonClass = (style?: ButtonStyle) => {
  switch (style) {
    case 'green':
      return 'button--green'
    case 'red':
      return 'button--red'
    default:
      return ''
  }
}

const Button: Button = ({ style, circle, onClick, error, children }) => {
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

const Toggle = ({
  name,
  text,
  onToggle,
  watchState = false,
}: {
  name: string
  text: string
  onToggle: (state: boolean) => void
  style?: ButtonStyle
  watchState?: boolean
}) => {
  const checkbox = useRef<HTMLInputElement>(null)
  const [isOn, setIsOn] = useState(watchState)

  useEffect(() => {
    setIsOn(watchState)
    if (checkbox.current) checkbox.current.checked = watchState
  }, [watchState])

  return (
    <label
      className={`button ${isOn ? 'button--active' : ''}
        relative inline-block cursor-pointer rounded-full
        px-3 py-2 leading-none duration-150`}
    >
      {text}
      <input
        ref={checkbox}
        className="absolute h-0 w-0 opacity-0"
        type="checkbox"
        defaultChecked={watchState}
        onChange={event => {
          let state = event.target.checked
          setIsOn(state)
          onToggle(state)
        }}
        name={name}
      />
    </label>
  )
}

type Theme = 'light' | 'dark'
const themeClasses: Record<Theme, string> = {
  light: 'theme-light',
  dark: 'theme-dark',
}

const getOtherTheme = (theme: Theme) => (theme === 'light' ? 'dark' : 'light')

const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>('light')
  const [isOverride, setIsOverride] = useState(false)

  const prefersDark = useMediaQuery({ query: '(prefers-color-scheme : dark)' })

  useEffect(() => {
    if (isOverride) {
      document.body.classList.remove(themeClasses[getOtherTheme(theme)])
      document.body.classList.add(themeClasses[theme])
    }
  }, [theme, isOverride])

  useEffect(() => {
    const pref = prefersDark ? 'dark' : 'light'
    if (!isOverride) setTheme(pref)
  }, [prefersDark, isOverride])

  const toggle = () => {
    const newTheme = getOtherTheme(theme)
    console.log({ theme, newTheme, isOverride })
    setTheme(newTheme)
    setIsOverride(true)
  }

  return (
    <button className="aspect-square h-full" onClick={toggle}>
      <FontAwesomeIcon
        className="aspect-square h-full w-full"
        icon={theme === 'dark' ? faMoon : faSunBright}
      />
    </button>
  )
}

export { Button, Toggle, ThemeToggle }
