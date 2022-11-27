import { allLessons, allClasses } from '../data/wordlist'
import { Word, WordClass, WordFilter } from '../types/words'

const wcDict: Record<WordClass, string> = {
  'n.': 'noun',
  'pron.': 'pronoun',
  'v.': 'verb',
  't.v.': 'transitive verb',
  's.v.': 'stative verb',
  'adv.': 'adverb',
  'conj.': 'conjunction',
  'g.p.': 'grammatical particle',
  other: 'other',
} as const

const expandWordClass = (wc: WordClass): string => wcDict[wc]

const allWordsFilter: WordFilter = {
  lesson: Array.from(allLessons),
  type: Array.from(allClasses),
}

function getOptionsFromAttr<Attribute extends keyof Word>(
  items: Word[],
  attr: Attribute
): Word[Attribute][] {
  let options: Word[Attribute][] = []
  for (let item of items) {
    let value = item[attr]
    if (value && !options.some(opt => opt == value)) {
      options.push(value)
    }
  }
  return options
}

const getFilterFromWords = (words: Word[]): WordFilter => ({
  lesson: getOptionsFromAttr(words, 'lesson'),
  type: getOptionsFromAttr(words, 'type'),
})

const filterWords = (words: Word[], filters: WordFilter): Word[] =>
  words.filter(word => {
    for (let str in filters) {
      let attr = str as keyof WordFilter
      let valid = filters[attr]
      let value = word[attr]?.toString()
      if (value === undefined) return false
      if (!valid?.some(v => v == value)) return false
    }
    return true
  })

export { expandWordClass, allWordsFilter, getFilterFromWords, filterWords }
