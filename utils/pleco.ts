import type { Word } from '../types/words'
import { markToNumber } from 'pinyin-utils'
import pinyinSplit from 'pinyin-split'
import { getDefinitions } from './words'

export interface Flashcard {
  hanzi: string
  pinyin: string
  definition: string
}

export interface Category {
  name: string
  order: number
  cards: Flashcard[]
}

export const getCategories = (word: Word): Category[] =>
  getDefinitions(word)
    .map<Category>(({ lesson }) => ({
      name: `// Classical Chinese For Everyone/Lesson ${lesson}`,
      order: lesson,
      cards: [],
    }))
    .filter((cat, i, arr) => arr.findIndex(c => c.name === cat.name) === i)

export const getDefinition = (word: Word): string => {
  const defs = getDefinitions(word)
  const lessons = defs
    .map(d => d.lesson)
    .filter((l, i, arr) => arr.indexOf(l) === i)

  let text: string = defs
    .map(
      ({ type, definition, pinyin }) =>
        `\ueab2${type}\ueab3 ${definition}` +
        (pinyin !== word.pinyin ? ` (${pinyin})` : '')
    )
    .join('\ueab1') // pleco newline char
  text += `\ueab1\ueab1\ueab2Lessons\ueab3 ${lessons.join(', ')}`
  return text
}

export const getNumberedPinyin = ({ pinyin }: Word): string =>
  pinyinSplit(pinyin)
    .map(p => markToNumber(p))
    .join('')

export const toFlashcard = (word: Word): Flashcard => ({
  hanzi: word.hanzi,
  pinyin: getNumberedPinyin(word),
  definition: getDefinition(word),
})

export const toTextLine = ({ hanzi, pinyin, definition }: Flashcard): string =>
  `${hanzi}\t${pinyin}\t${definition}`
