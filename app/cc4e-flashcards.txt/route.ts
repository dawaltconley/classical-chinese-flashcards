import wordlist from '../../data/wordlist'
import {
  toFlashcard,
  toTextLine,
  getCategories,
  type Category,
} from '../../utils/pleco'

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
