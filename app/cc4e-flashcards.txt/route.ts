import type { Word } from '../../types/words'
import wordlist from '../../data/wordlist'
import { getDefinitions } from '../../utils/words'

interface Flashcard {
  hanzi: string
  pinyin: string
  definition: string
  categories: string[]
}

const getCategories = (word: Word): string[] =>
  getDefinitions(word)
    .map(w => w.lesson)
    .filter((l, i, lessons) => lessons.indexOf(l) === i)
    .map(l => `Classical Chinese For Everyone/Lesson ${l}`)

const getDefinition = (word: Word): string =>
  getDefinitions(word)
    .map(
      ({ type, definition, pinyin }) =>
        `${type} ${definition}` + (pinyin !== word.pinyin ? ` (${pinyin})` : '')
    )
    .join('\ueab1') // pleco newline char

const toFlashcard = (word: Word): Flashcard => ({
  hanzi: word.hanzi,
  pinyin: word.pinyin,
  definition: getDefinition(word),
  categories: getCategories(word),
})

const toTextLine = ({ hanzi, pinyin, definition }: Flashcard): string =>
  `${hanzi}\t${pinyin}\t${definition}`

const getFileContent = (): string => {
  const categories = new Map<string, Flashcard[]>()

  for (let word of wordlist) {
    const card = toFlashcard(word)
    for (let category of card.categories) {
      const saved = categories.get(category) || []
      categories.set(category, [...saved, card])
    }
  }

  return Array.from(categories.entries())
    .sort((a, b) => (a[0] < b[0] ? -1 : 1))
    .map(([category, cards]) => [category, ...cards.map(toTextLine)].join('\n'))
    .join('\n\n')
}

export function GET() {
  return new Response(getFileContent(), {
    headers: {
      'Content-Type': 'text/plain',
    },
  })
}
