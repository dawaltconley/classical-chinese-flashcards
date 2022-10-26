type Word = {
  hanzi: string
  pinyin: string
  type: WordClass
  lesson: number
  definition: string
  other?: WordVariant[]
  simplified?: string
}

type WordVariant = Pick<Word, 'definition'> &
  Partial<Pick<Word, 'pinyin' | 'type'>>

type WordClass =
  | 'n.'
  | 'pron.'
  | 'v.'
  | 't.v.'
  | 's.v.'
  | 'adv.'
  | 'conj.'
  | 'g.p.'
  | 'other'

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
}

const expandWordClass = (wc: WordClass): string => wcDict[wc]

const wordlist: Word[] = [
  // Lesson 1
  {
    hanzi: '子',
    pinyin: 'zǐ',
    lesson: 1,
    type: 'n.',
    definition: 'Master / son',
    other: [
      {
        definition: 'daughter',
      },
      {
        type: 's.v.',
        definition: 'to be a son, to act as a son (should)',
      },
    ],
  },
  {
    hanzi: '性',
    pinyin: 'xìng',
    lesson: 1,
    type: 'n.',
    definition: 'nature',
  },
  {
    hanzi: '曰',
    pinyin: 'yūe',
    lesson: 1,
    type: 'v.',
    definition: 'to say',
  },
  {
    hanzi: '相',
    pinyin: 'xīang',
    lesson: 1,
    type: 'adv.',
    definition: 'to each other',
  },
  {
    hanzi: '近',
    pinyin: 'jìn',
    lesson: 1,
    type: 's.v.',
    definition: 'to be close',
  },
  {
    hanzi: '也',
    pinyin: 'yě',
    lesson: 1,
    type: 'g.p.',
    definition: '(marks nominal sentences)',
  },
  {
    hanzi: '習',
    simplified: '习',
    pinyin: 'xí',
    lesson: 1,
    type: 'n.',
    definition: 'practice',
  },
  {
    hanzi: '遠',
    simplified: '远',
    pinyin: 'yǔan',
    lesson: 1,
    type: 's.v.',
    definition: 'to be far',
  },

  // Lesson 2
  {
    hanzi: '齊',
    pinyin: 'Qí',
    lesson: 2,
    type: 'n.',
    definition: '(name of a state)',
  },
  {
    hanzi: '景',
    pinyin: 'jǐng',
    lesson: 2,
    type: 's.v.',
    definition: 'to be bright, shining',
    other: [
      {
        type: 'n.',
        definition: 'Jing (honorific posthumous name)',
      },
    ],
  },
  {
    hanzi: '公',
    pinyin: 'gōng',
    lesson: 2,
    type: 'n.',
    definition: 'duke',
  },
  {
    hanzi: '問',
    pinyin: 'wèn',
    lesson: 2,
    type: 't.v.',
    definition: 'to ask something of someone',
  },
  {
    hanzi: '政',
    pinyin: 'zhèng',
    lesson: 2,
    type: 'n.',
    definition: 'politics',
  },
  {
    hanzi: '於',
    simplified: '于',
    pinyin: 'yú',
    lesson: 2,
    type: 'g.p.',
    definition: 'from or of',
  },
  {
    hanzi: '孔',
    pinyin: 'Kǒng',
    lesson: 2,
    type: 'n.',
    definition: '(name)',
  },
  {
    hanzi: '對',
    simplified: '对',
    pinyin: 'dùi',
    lesson: 2,
    type: 'adv.',
    definition: 'respondingly, in response',
  },
  {
    hanzi: '君',
    pinyin: 'jūn',
    lesson: 2,
    type: 'n.',
    definition: 'ruler',
    other: [
      {
        type: 's.v.',
        definition: 'to be a ruler, to be a lord, to act as a ruler (should)',
      },
    ],
  },
  {
    hanzi: '臣',
    pinyin: 'chén',
    lesson: 2,
    type: 'n.',
    definition: 'minister',
    other: [
      {
        type: 's.v.',
        definition: 'to be a minister, to act as a minister (should)',
      },
    ],
  },
  {
    hanzi: '父',
    pinyin: 'fù',
    lesson: 2,
    type: 'n.',
    definition: 'father',
    other: [
      {
        type: 's.v.',
        definition: 'to be a father, to act as a father (should)',
      },
    ],
  },
  {
    hanzi: '不',
    pinyin: 'bù',
    lesson: 2,
    type: 'adv.',
    definition: 'not (negates verbs or verbal phrases)',
  },

  // Lesson 3
  {
    hanzi: '樊',
    pinyin: 'fán',
    lesson: 3,
    type: 'n.',
    definition: '(family name)',
  },
  {
    hanzi: '遲',
    simplified: '迟',
    pinyin: 'chí',
    lesson: 3,
    type: 'n.',
    definition: '(personal name)',
  },
  {
    hanzi: '仁',
    pinyin: 'rén',
    lesson: 3,
    type: 's.v.',
    definition: 'to be fully human, to be benevolent',
    other: [
      {
        type: 'n.',
        definition: 'humaneness; benevolence',
      },
    ],
  },
  {
    hanzi: '愛',
    simplified: '爱',
    pinyin: 'ài',
    lesson: 3,
    type: 'v.',
    definition: 'to love',
  },
  {
    hanzi: '人',
    pinyin: 'rén',
    lesson: 3,
    type: 'n.',
    definition: 'others, person',
  },
  {
    hanzi: '知',
    pinyin: 'zhī',
    lesson: 3,
    type: 't.v.',
    definition: 'to know, to understand, to appreciate',
    other: [
      {
        pinyin: 'zhì',
        type: 'n.',
        definition: 'wisdom',
      },
      {
        pinyin: 'zhì',
        type: 's.v.',
        definition: 'to be wise',
      },
    ],
  },
  {
    hanzi: '者',
    pinyin: 'zhě',
    lesson: 3,
    type: 'g.p.',
    definition: '(nominalizer / gerundizer)',
  },
  {
    hanzi: '安',
    pinyin: 'ān',
    lesson: 3,
    type: 'n.',
    definition: 'peace',
  },
  {
    hanzi: '利',
    pinyin: 'lì',
    lesson: 3,
    type: 'n.',
    definition: 'profit',
  },
  {
    hanzi: '樂',
    simplified: '乐',
    pinyin: 'lè',
    lesson: 3,
    type: 't.v.',
    definition: 'to delight in',
  },
  {
    hanzi: '水',
    pinyin: 'shǔi',
    lesson: 3,
    type: 'n.',
    definition: 'water',
  },
  {
    hanzi: '山',
    pinyin: 'shān',
    lesson: 3,
    type: 'n.',
    definition: 'mountains',
  },

  // Lesson 4
  {
    hanzi: '由',
    pinyin: 'yóu',
    lesson: 4,
    type: 'n.',
    definition: '(personal name)',
  },
  {
    hanzi: '誨',
    pinyin: 'hùi',
    lesson: 4,
    type: 't.v.',
    definition: 'to teach about',
  },
  {
    hanzi: '汝',
    pinyin: 'rǔ',
    lesson: 4,
    type: 'pron.',
    definition: 'you',
  },
  {
    hanzi: '之',
    pinyin: 'zhī',
    lesson: 4,
    type: 'pron.',
    definition: 'him, her, them, it (third person object)',
    other: [
      {
        type: 'v.',
        definition: '(subordinates Y to X)',
      },
    ],
  },
  {
    hanzi: '乎',
    pinyin: 'hū',
    lesson: 4,
    type: 'g.p.',
    definition: '(makes into a question)',
  },
  {
    hanzi: '為',
    simplified: '为',
    pinyin: 'wéi',
    lesson: 4,
    type: 't.v.',
    definition: 'to act as',
  },
  {
    hanzi: '是',
    pinyin: 'shì',
    lesson: 4,
    type: 'pron.',
    definition: 'this',
  },
  {
    hanzi: '自',
    pinyin: 'zì',
    lesson: 4,
    type: 'pron.',
    definition: 'oneself (reflexive pronoun)',
  },
  {
    hanzi: '明',
    pinyin: 'míng',
    lesson: 4,
    type: 's.v.',
    definition: 'to be enlightened',
  },
  {
    hanzi: '勝',
    simplified: '胜',
    pinyin: 'shèng',
    lesson: 4,
    type: 't.v.',
    definition: 'to defeat',
  },
  {
    hanzi: '有',
    pinyin: 'yǒu',
    lesson: 4,
    type: 't.v.',
    definition: 'to have',
    other: [
      {
        definition: 'there is, there exists',
      },
    ],
  },
  {
    hanzi: '力',
    pinyin: 'lì',
    lesson: 4,
    type: 'n.',
    definition: 'strength',
  },
  {
    hanzi: '強',
    simplified: '强',
    pinyin: 'qíang',
    lesson: 4,
    type: 's.v.',
    definition: 'to be strong',
  },

  // Lesson 5
  {
    hanzi: '善',
    pinyin: 'shàn',
    lesson: 5,
    type: 's.v.',
    definition: 'to be good',
  },
  {
    hanzi: '哉',
    pinyin: 'zāi',
    lesson: 5,
    type: 'g.p.',
    definition: '(makes an exclamation)',
  },
  {
    hanzi: '信',
    pinyin: 'xìn',
    lesson: 5,
    type: 'adv.',
    definition: 'truly',
  },
  {
    hanzi: '如',
    pinyin: 'rú',
    lesson: 5,
    type: 't.v.',
    definition: 'to be like, to be as good as',
    other: [
      {
        type: 'conj.',
        definition: 'if',
      },
    ],
  },
  {
    hanzi: '雖',
    simplified: '虽',
    pinyin: 'suī',
    lesson: 5,
    type: 'conj.',
    definition: 'although',
  },
  {
    hanzi: '粟',
    pinyin: 'sù',
    lesson: 5,
    type: 'n.',
    definition: 'grain',
  },
  {
    hanzi: '吾',
    pinyin: 'wú',
    lesson: 5,
    type: 'pron.',
    definition: 'I or my',
  },
  {
    hanzi: '得而',
    pinyin: 'dé ér',
    lesson: 5,
    type: 's.v.',
    definition: 'to succeed in V-ing',
  },
  {
    hanzi: '食',
    pinyin: 'shí',
    lesson: 5,
    type: 't.v.',
    definition: 'to eat',
  },
  {
    hanzi: '諸',
    pinyin: 'zhū',
    lesson: 5,
    type: 'g.p.',
    definition: 'contraction of 之乎 or 之於',
  },
  {
    hanzi: '好',
    pinyin: 'hào',
    lesson: 5,
    type: 't.v.',
    definition: 'to be fond of',
  },

  // Lesson 6
  {
    hanzi: '道',
    pinyin: 'dào',
    lesson: 6,
    type: 'n.',
    definition: 'path, way; a verbal account',
  },
  {
    hanzi: '可',
    pinyin: 'kě',
    lesson: 6,
    type: 'v.',
    definition: 'can be verb-ed',
  },
  {
    hanzi: '非',
    pinyin: 'fēi',
    lesson: 6,
    type: 'v.',
    definition: 'is-not (negates a nominal sentence)',
  },
  {
    hanzi: '恆',
    simplified: '恒',
    pinyin: 'héng',
    lesson: 6,
    type: 's.v.',
    definition: 'to be constant',
  },
  {
    hanzi: '名',
    pinyin: 'míng',
    lesson: 6,
    type: 'n.',
    definition: 'name',
  },
  {
    hanzi: '無',
    pinyin: 'wú',
    lesson: 6,
    type: 't.v.',
    definition: 'to lack',
  },
  {
    hanzi: '萬',
    pinyin: 'wàn',
    lesson: 6,
    type: 'n.',
    definition: '10,000, myriad',
  },
  {
    hanzi: '物',
    pinyin: 'wù',
    lesson: 6,
    type: 'n.',
    definition: 'thing',
  },
  {
    hanzi: '始',
    pinyin: 'shǐ',
    lesson: 6,
    type: 'n.',
    definition: 'beginning',
  },
  {
    hanzi: '母',
    pinyin: 'mǔ',
    lesson: 6,
    type: 'n.',
    definition: 'mother',
  },
  {
    hanzi: '謂',
    pinyin: 'wèi',
    lesson: 6,
    type: 't.v.',
    definition: 'to say something of/about',
  },
  {
    hanzi: '公冶',
    pinyin: 'gōngyě',
    lesson: 6,
    type: 'n.',
    definition: `(family name, literally "Duke's Smelter" or "Dukesmith"`,
  },
  {
    hanzi: '長',
    pinyin: 'cháng',
    lesson: 6,
    type: 'n.',
    definition: '(personal name)',
  },
  {
    hanzi: '妻',
    pinyin: 'qì',
    lesson: 6,
    type: 't.v.',
    definition: 'to give a wife to',
  },
  {
    hanzi: '在',
    pinyin: 'zài',
    lesson: 6,
    type: 't.v.',
    definition: 'to be in',
  },
  {
    hanzi: '縲絏',
    simplified: '缧绁',
    pinyin: 'léi xiè',
    lesson: 6,
    type: 'n.',
    definition: 'fetters, ropes for binding prisoners',
  },
  {
    hanzi: '中',
    pinyin: 'zhōng',
    lesson: 6,
    type: 'n.',
    definition: 'middle',
  },
  {
    hanzi: '其',
    pinyin: 'qí',
    lesson: 6,
    type: 'pron.',
    definition: 'his, her, its, their (third person possessive)',
  },
  {
    hanzi: '罪',
    pinyin: 'zùi',
    lesson: 6,
    type: 'n.',
    definition: 'crime, fault',
  },
  {
    hanzi: '以',
    pinyin: 'yǐ',
    lesson: 6,
    type: 't.v.',
    definition: 'using, by means of, in order to',
  },
  {
    hanzi: '士',
    pinyin: 'shì',
    lesson: 7,
    type: 'n.',
    definition: 'scholar',
  },
  {
    hanzi: '任',
    pinyin: 'rèn',
    lesson: 7,
    type: 'n.',
    definition: 'responsibility',
  },
  {
    hanzi: '己',
    pinyin: 'jǐ',
    lesson: 7,
    type: 'n.',
    definition: 'self',
  },
  {
    hanzi: '富',
    pinyin: 'fù',
    lesson: 7,
    type: 'n.',
    definition: 'wealth',
  },
  {
    hanzi: '貴',
    pinyin: 'gùi',
    lesson: 7,
    type: 'n.',
    definition: 'esteem',
  },
  {
    hanzi: '貧',
    pinyin: 'pín',
    lesson: 7,
    type: 'n.',
    definition: 'poverty',
  },
  {
    hanzi: '賤',
    pinyin: 'jiàn',
    lesson: 7,
    type: 'n.',
    definition: 'low prestige',
  },
  {
    hanzi: '可以',
    pinyin: 'kěyǐ',
    lesson: 7,
    type: 'v.',
    definition: 'can, may (coverb)',
  },
  {
    hanzi: '欲',
    pinyin: 'yù',
    lesson: 7,
    type: 't.v.',
    definition: 'to desire',
  },
  {
    hanzi: '得',
    pinyin: 'dé',
    lesson: 7,
    type: 't.v.',
    definition: 'to get, to succeed in',
  },
  {
    hanzi: '處',
    pinyin: 'chǔ',
    lesson: 7,
    type: 't.v.',
    definition: 'to dwell in',
  },
  {
    hanzi: '惡',
    pinyin: 'wù',
    lesson: 7,
    type: 't.v.',
    definition: 'to dislike',
  },
  {
    hanzi: '去',
    pinyin: 'qù',
    lesson: 7,
    type: 't.v.',
    definition: 'to abandon',
  },
  {
    hanzi: '弘',
    pinyin: 'hóng',
    lesson: 7,
    type: 's.v.',
    definition: 'to be broad',
  },
  {
    hanzi: '毅',
    pinyin: 'yì',
    lesson: 7,
    type: 's.v.',
    definition: 'to be resolute',
  },
  {
    hanzi: '重',
    pinyin: 'zhòng',
    lesson: 7,
    type: 's.v.',
    definition: 'to be heavy',
  },
  {
    hanzi: '死',
    pinyin: 'sǐ',
    lesson: 7,
    type: 's.v.',
    definition: 'to be dead',
  },
  {
    hanzi: '已',
    pinyin: 'yǐ',
    lesson: 7,
    type: 's.v.',
    definition: 'to be ended',
  },
  {
    hanzi: '而',
    pinyin: 'ér',
    lesson: 7,
    type: 'conj.',
    definition: 'and (for verbs)',
  },
  {
    hanzi: '而後',
    pinyin: 'érhòu',
    lesson: 7,
    type: 'conj.',
    definition: 'and only then',
  },
  {
    hanzi: '與',
    pinyin: 'yǔ',
    lesson: 7,
    type: 'conj.',
    definition: 'and (for nouns)',
  },
  {
    hanzi: '所',
    pinyin: 'sǔo',
    lesson: 7,
    type: 'g.p.',
    definition: 'nominalizes following verb',
  },
  {
    hanzi: '曾',
    pinyin: 'zēng',
    lesson: 7,
    type: 'other',
    definition: '(family name)',
  },
  {
    hanzi: '以爲',
    pinyin: 'yǐwéi',
    lesson: 7,
    type: 'other',
    definition: 'to regard it as',
  },
  {
    hanzi: '不亦⋯⋯乎',
    pinyin: 'búyì…hū',
    lesson: 7,
    type: 'other',
    definition: 'is it not…?',
  },
]

export default wordlist

export { expandWordClass }

export type { Word, WordClass, WordVariant }
