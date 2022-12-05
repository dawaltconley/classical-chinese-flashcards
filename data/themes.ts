import themes from '../styles/themes'

export default themes

export type Theme = 'light' | 'dark'

interface ThemeDefinition {
  bg: string
  tx: string
  br: string
}

export type ThemeDefs = Record<Theme, ThemeDefinition>

export const themeClasses: Record<Theme, string> = {
  light: 'theme-light',
  dark: 'theme-dark',
} as const

export const getOtherTheme = (theme: Theme) =>
  theme === 'light' ? 'dark' : 'light'
