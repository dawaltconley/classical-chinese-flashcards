import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSunBright, faMoon } from '@fortawesome/pro-light-svg-icons'
import { useState, useEffect, useRef } from 'react'
import { useMediaQuery } from 'react-responsive'
import themes, { Theme, themeClasses, getOtherTheme } from '../data/themes'
import Head from 'next/head'
import dynamic from 'next/dynamic'

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

const useTheme = () => {
  const [manual, setManual] = useState<Theme>()
  const prefersDark = useMediaQuery({ query: '(prefers-color-scheme : dark)' })

  const theme: Theme = manual || (prefersDark ? 'dark' : 'light')

  useEffect(() => {
    if (manual) {
      document.body.classList.remove(themeClasses[getOtherTheme(manual)])
      document.body.classList.add(themeClasses[manual])
    }
  }, [manual])

  return [theme, setManual] as const
}

// disable ssr to avoid mismatch when user prefers dark theme
const ThemeIcon = dynamic(
  async () =>
    function ThemeIcon({ theme }: { theme: Theme }) {
      return (
        <FontAwesomeIcon
          className="aspect-square h-full w-full"
          icon={theme === 'dark' ? faMoon : faSunBright}
        />
      )
    },
  { ssr: false }
)

const ThemeToggle = ({
  handleToggle,
}: {
  handleToggle?: (newTheme: Theme) => void
}) => {
  const [theme, setTheme] = useTheme()

  const toggle = () => {
    const newTheme = getOtherTheme(theme)
    setTheme(newTheme)
    if (handleToggle) handleToggle(newTheme)
  }

  return (
    <>
      <Head>
        <meta name="theme-color" content={themes[theme].bg} />
      </Head>
      <button className="aspect-square h-full" onClick={toggle}>
        <ThemeIcon theme={theme} />
      </button>
    </>
  )
}

export { Button, Toggle, ThemeToggle }
