import type { Word } from '../../types/words'
import { markToNumber } from 'pinyin-utils'
import pinyinSplit from 'pinyin-split'
import wordlist from '../../data/wordlist'
import { getDefinitions } from '../../utils/words'

interface Flashcard {
  hanzi: string
  pinyin: string
  definition: string
}

interface Category {
  name: string
  order: number
  cards: Flashcard[]
}

const getCategories = (word: Word): Category[] =>
  getDefinitions(word)
    .map<Category>(({ lesson }) => ({
      name: `// Classical Chinese For Everyone/Lesson ${lesson}`,
      order: lesson,
      cards: [],
    }))
    .filter((cat, i, arr) => arr.findIndex(c => c.name === cat.name) === i)

const getDefinition = (word: Word): string =>
  getDefinitions(word)
    .map(
      ({ type, definition, pinyin }) =>
        `${type} ${definition}` + (pinyin !== word.pinyin ? ` (${pinyin})` : '')
    )
    .join('\ueab1') // pleco newline char

const getNumberedPinyin = ({ pinyin }: Word): string =>
  pinyinSplit(pinyin)
    .map(p => markToNumber(p))
    .join('')

const toFlashcard = (word: Word): Flashcard => ({
  hanzi: word.hanzi,
  pinyin: getNumberedPinyin(word),
  definition: getDefinition(word),
})

const toTextLine = ({ hanzi, pinyin, definition }: Flashcard): string =>
  `${hanzi}\t${pinyin}\t${definition}`

const getFileContent = (): string => {
  const categories = new Map<string, Category>()

  for (let word of wordlist) {
    const card = toFlashcard(word)
    for (let category of getCategories(word)) {
      const saved = categories.get(category.name) || category
      saved.cards.push(card)
      categories.set(category.name, saved)
    }
  }

  return Array.from(categories.values())
    .sort((a, b) => a.order - b.order)
    .map(({ name: category, cards }) =>
      [category, ...cards.map(toTextLine)].join('\n')
    )
    .join('\n\n')
}

export function GET() {
  return new Response(getFileContent(), {
    headers: {
      'Content-Type': 'text/plain',
    },
  })
}
