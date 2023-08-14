import { allLessons, allClasses } from '../data/wordlist'
import {
  Word,
  WordClass,
  WordFilter,
  WordVariant,
  VariantFilter,
} from '../types/words'

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

export const expandWordClass = (wc: WordClass): string => wcDict[wc]

export const allWordsFilter: WordFilter = {
  lesson: Array.from(allLessons),
  type: Array.from(allClasses),
}

export const completeVariant = (
  word: Word,
  variant?: WordVariant
): Omit<Word, 'other'> => {
  let definition = { ...word, ...variant }
  delete definition.other
  return definition
}

export const getDefinitions = (word: Word): Word[] =>
  [word, ...(word.other ?? [])].map(v => completeVariant(word, v))

/** determines whether a filter matches a specific word */
export function filterMatch(w: Word, f: WordFilter): boolean
export function filterMatch(w: WordVariant, f: VariantFilter): boolean
export function filterMatch(
  word: Word | WordVariant,
  filters: WordFilter | VariantFilter
): boolean {
  // check if ALL filters match the current word
  const wordMatch = Object.entries(filters).every(([attr, filter]) => {
    let comparison = word[attr as keyof typeof filters]
    return comparison !== undefined && filter?.some(f => f == comparison)
  })

  let variantMatch = false
  if ('other' in word) {
    // check if ALL filters match ANY word variant
    variantMatch =
      word.other?.some(variant =>
        filterMatch(completeVariant(word, variant), filters)
      ) ?? false
  }

  // false if no complete match in word or variants
  return wordMatch || variantMatch
}

export const filterWords = (words: Word[], filters: WordFilter): Word[] =>
  words.filter(word => filterMatch(word, filters))
