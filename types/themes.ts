type Theme = 'light' | 'dark'
const themeClasses: Record<Theme, string> = {
  light: 'theme-light',
  dark: 'theme-dark',
} as const

export type { Theme }
export { themeClasses }
