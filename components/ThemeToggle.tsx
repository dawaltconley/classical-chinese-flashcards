import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSunBright, faMoon } from '@fortawesome/pro-light-svg-icons'
import { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import themes, { Theme, themeClasses, getOtherTheme } from '../data/themes'
import Head from 'next/head'
import dynamic from 'next/dynamic'

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

export interface ThemeToggleProps {
  handleToggle?: (newTheme: Theme) => void
}

const ThemeToggle = ({ handleToggle }: ThemeToggleProps) => {
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

export default ThemeToggle
