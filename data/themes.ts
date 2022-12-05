import { Theme } from '../types/themes'
import themes from '../styles/themes'

export default themes as Record<Theme, {
  bg: string,
  tx: string,
  br: string,
  className: string
}>
