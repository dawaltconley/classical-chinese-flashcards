import { allLessons, allClasses } from '../data/wordlist'

type LessonNumber = typeof allLessons[number]
type WordClass = typeof allClasses[number]

type Word = {
  hanzi: string
  pinyin: string
  type: WordClass
  lesson: LessonNumber
  definition: string
  other?: WordVariant[]
  simplified?: string
}

type WordVariant = Pick<Word, 'definition'> &
  Partial<Pick<Word, 'pinyin' | 'type' | 'lesson'>>

type WordFilter = Pick<
  {
    [Attribute in keyof Word]: Word[Attribute][]
  },
  'lesson' | 'type'
>

type VariantFilter = Pick<
  WordFilter,
  Extract<keyof WordFilter, keyof WordVariant>
>

export type {
  Word,
  WordVariant,
  LessonNumber,
  WordClass,
  WordFilter,
  VariantFilter,
}
