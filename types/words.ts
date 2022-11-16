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

type LessonNumber = typeof allLessons[number]
const allLessons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const

type WordClass = typeof allClasses[number]
const allClasses = [
  'n.',
  'pron.',
  'v.',
  't.v.',
  's.v.',
  'adv.',
  'conj.',
  'g.p.',
  'other',
] as const

type WordFilter = Pick<
  {
    [Attribute in keyof Word]: Word[Attribute][]
  },
  'lesson' | 'type'
>

export { allLessons, allClasses }
export type { Word, WordVariant, LessonNumber, WordClass, WordFilter }
