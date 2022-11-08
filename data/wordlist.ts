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
  Partial<Pick<Word, 'pinyin' | 'type' | 'lesson'>>

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
    definition: '-master (honorific title following a family name)',
    other: [
      {
        lesson: 2,
        definition: 'son',
      },
      {
        lesson: 2,
        type: 's.v.',
        definition: 'to be a son, to act as a son (should)',
      },
      {
        lesson: 6,
        definition: 'daughter',
      },
    ],
  },
  {
    hanzi: '曰',
    pinyin: 'yūe',
    lesson: 1,
    type: 'v.',
    definition: 'to say (used to introduce a direct quotation)',
  },
  {
    hanzi: '性',
    pinyin: 'xìng',
    lesson: 1,
    type: 'n.',
    definition: 'nature (as in "human nature" or "the natures of humans")',
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
    definition:
      '(comes at the end of sentences to mark nominal sentences; often indicates a generalization)',
    other: [
      {
        lesson: 8,
        definition: '(vocative particle; follows name of person addressed)',
      },
    ],
  },
  {
    hanzi: '習',
    simplified: '习',
    pinyin: 'xí',
    lesson: 1,
    type: 'n.',
    definition: 'practices',
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
    simplified: '齐',
    pinyin: 'Qí',
    lesson: 2,
    type: 'other',
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
        type: 'other',
        definition: 'Jing (honorific posthumous name)',
      },
    ],
  },
  {
    hanzi: '公',
    pinyin: 'gōng',
    lesson: 2,
    type: 'n.',
    definition: 'duke (highest heriditary title below the king)',
  },
  {
    hanzi: '問',
    simplified: '问',
    pinyin: 'wèn',
    lesson: 2,
    type: 't.v.',
    definition: 'to ask something of someone',
    other: [
      {
        lesson: 8,
        type: 'adv.',
        definition: 'questioningly, as a question',
      },
    ],
  },
  {
    hanzi: '政',
    pinyin: 'zhèng',
    lesson: 2,
    type: 'n.',
    definition: 'government, governing',
  },
  {
    hanzi: '於',
    simplified: '于',
    pinyin: 'yú',
    lesson: 2,
    type: 'g.p.',
    definition: 'from, of (marks the indirect object of a verb)',
  },
  {
    hanzi: '孔',
    pinyin: 'Kǒng',
    lesson: 2,
    type: 'n.',
    definition: '(the family name of 孔子 Kǒngzǐ, aka Confucius)',
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
    definition: 'ruler, lord',
    other: [
      {
        type: 's.v.',
        definition: 'to be a ruler, to act as a ruler (should)',
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
    type: 'other',
    definition: '(family name)',
  },
  {
    hanzi: '遲',
    simplified: '迟',
    pinyin: 'chí',
    lesson: 3,
    type: 'other',
    definition: '(personal name)',
  },
  {
    hanzi: '仁',
    pinyin: 'rén',
    lesson: 3,
    type: 'n.',
    definition: 'humaneness; benevolence',
    other: [
      {
        type: 's.v.',
        definition: 'to be fully human, to be benevolent',
      },
    ],
  },
  {
    hanzi: '愛',
    simplified: '爱',
    pinyin: 'ài',
    lesson: 3,
    type: 't.v.',
    definition: 'to love',
  },
  {
    hanzi: '人',
    pinyin: 'rén',
    lesson: 3,
    type: 'n.',
    definition: 'other people',
    other: [
      {
        lesson: 7,
        definition: 'people, persons',
      },
    ],
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
    definition:
      '(follows a verbal phrase, transforming into a nominal phrase describing the subject of the verbal phrase: "those who…" or "that which…")',
    other: [
      {
        lesson: 5,
        type: 'g.p.',
        definition: '(transforms verbal phrase, V, into a gerund, V-ing)',
      },
    ],
  },
  {
    hanzi: '安',
    pinyin: 'ān',
    lesson: 3,
    type: 'n.',
    definition: 'peace, safety',
    other: [
      {
        type: 't.v.',
        definition: 'to regard as peaceful',
      },
    ],
  },
  {
    hanzi: '利',
    pinyin: 'lì',
    lesson: 3,
    type: 'n.',
    definition: 'profit, benefit',
    other: [
      {
        type: 't.v.',
        definition: 'to treat as profitable, to treat as beneficial',
      },
    ],
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
    other: [{ definition: 'rivers' }],
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
    type: 'other',
    definition: '(personal name)',
  },
  {
    hanzi: '誨',
    pinyin: 'huì',
    lesson: 4,
    type: 't.v.',
    definition: 'to teach someone about something',
  },
  {
    hanzi: '汝',
    pinyin: 'rǔ',
    lesson: 4,
    type: 'pron.',
    definition: 'you (addresses subordinates)',
  },
  {
    hanzi: '之',
    pinyin: 'zhī',
    lesson: 4,
    type: 'pron.',
    definition: 'him, her, them, it (object of verb or preposition)',
    other: [
      {
        lesson: 6,
        type: 'g.p.',
        definition:
          '(subordinates object to subject, possession or specification)',
      },
    ],
  },
  {
    hanzi: '乎',
    pinyin: 'hū',
    lesson: 4,
    type: 'g.p.',
    definition: '(makes into a question)',
    other: [
      {
        lesson: 8,
        definition: '(vocative particle; follows name of person addressed)',
      },
    ],
  },
  {
    hanzi: '為',
    simplified: '为',
    pinyin: 'wéi',
    lesson: 4,
    type: 'v.',
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
    definition: 'to defeat, to conquer',
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
    definition: 'strength, power',
  },
  {
    hanzi: '強',
    simplified: '强',
    pinyin: 'qiáng',
    lesson: 4,
    type: 's.v.',
    definition: 'to be strong, to be powerful',
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
    definition: '(exclamatory particle; usually ends a sentence)',
  },
  {
    hanzi: '信',
    pinyin: 'xìn',
    lesson: 5,
    type: 'adv.',
    definition: 'truly, genuinely',
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
    definition: 'although, even though',
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
    definition: 'I',
    other: [{ definition: 'my, mine' }],
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
    definition: 'path, way',
    other: [
      {
        definition: 'the right way to follow (the Way)',
      },
      {
        definition: 'a linquistic account of a way',
      },
      {
        definition: 'the metaphysical foundation of the universe',
      },
      {
        type: 't.v.',
        definition: 'to give a linquistic account of something',
      },
    ],
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
    other: [
      {
        lesson: 8,
        type: 's.v.',
        definition: 'to be wrong',
      },
    ],
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
    other: [
      {
        type: 't.v.',
        definition: 'to give a name to',
      },
    ],
  },
  {
    hanzi: '無',
    simplified: '无',
    pinyin: 'wú',
    lesson: 6,
    type: 't.v.',
    definition: 'to lack, to not have',
  },
  {
    hanzi: '萬',
    simplified: '万',
    pinyin: 'wàn',
    lesson: 6,
    type: 'n.',
    definition: 'ten thousand, myriad',
  },
  {
    hanzi: '物',
    pinyin: 'wù',
    lesson: 6,
    type: 'n.',
    definition: 'thing',
    other: [{ definition: 'kind of thing' }],
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
    simplified: '谓',
    pinyin: 'wèi',
    lesson: 6,
    type: 't.v.',
    definition: 'to say something of/about',
  },
  {
    hanzi: '公冶',
    pinyin: 'gōngyě',
    lesson: 6,
    type: 'other',
    definition: `(family name, literally "Duke's Smelter" or "Dukesmith"`,
  },
  {
    hanzi: '長',
    pinyin: 'cháng',
    lesson: 6,
    type: 'other',
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
    pinyin: 'léixiè',
    lesson: 6,
    type: 'other',
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
    other: [
      {
        lesson: 7,
        type: 'n.',
        definition: 'the (as in "the Way")',
      },
    ],
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
    type: 'v.',
    definition: 'using, by means of, in order to',
  },

  // Lesson 7
  {
    hanzi: '曾',
    pinyin: 'zēng',
    lesson: 7,
    type: 'other',
    definition: '(family name)',
  },
  {
    hanzi: '士',
    pinyin: 'shì',
    lesson: 7,
    type: 'n.',
    definition: 'aristocrat, scholar, warrior',
  },
  {
    hanzi: '可以',
    pinyin: 'kěyǐ',
    lesson: 7,
    type: 'v.',
    definition: 'can, may (coverb)',
  },
  {
    hanzi: '弘',
    pinyin: 'hóng',
    lesson: 7,
    type: 's.v.',
    definition: 'to be broad (metaphorically or literally)',
  },
  {
    hanzi: '毅',
    pinyin: 'yì',
    lesson: 7,
    type: 's.v.',
    definition: 'to be resolute',
  },
  {
    hanzi: '任',
    pinyin: 'rèn',
    lesson: 7,
    type: 'n.',
    definition: 'responsibility',
  },
  {
    hanzi: '重',
    pinyin: 'zhòng',
    lesson: 7,
    type: 's.v.',
    definition: 'to be heavy',
  },
  {
    hanzi: '而',
    pinyin: 'ér',
    lesson: 7,
    type: 'conj.',
    definition: 'and (for verbs)',
  },
  {
    hanzi: '以爲',
    simplified: '以为',
    pinyin: 'yǐwéi',
    lesson: 7,
    type: 'other',
    definition: 'to take it as, to regard it as',
  },
  {
    hanzi: '己',
    pinyin: 'jǐ',
    lesson: 7,
    type: 'pron.',
    definition: 'self, oneself (can be used attributively of nouns)',
  },
  {
    hanzi: '不亦⋯⋯乎',
    pinyin: 'búyì…hū',
    lesson: 7,
    type: 'other',
    definition: 'is it not…?',
  },
  {
    hanzi: '死',
    pinyin: 'sǐ',
    lesson: 7,
    type: 's.v.',
    definition: 'to die, to be dead',
  },
  {
    hanzi: '而後',
    pinyin: 'érhòu',
    lesson: 7,
    type: 'conj.',
    definition: 'and only then',
  },
  {
    hanzi: '已',
    pinyin: 'yǐ',
    lesson: 7,
    type: 's.v.',
    definition: 'to stop, to be ended',
  },
  {
    hanzi: '富',
    pinyin: 'fù',
    lesson: 7,
    type: 'n.',
    definition: 'wealth',
  },
  {
    hanzi: '與',
    simplified: '与',
    pinyin: 'yǔ',
    lesson: 7,
    type: 'conj.',
    definition: 'and (for nouns)',
    other: [
      {
        lesson: 8,
        type: 'g.p.',
        definition: '(comes at the end of a sentence, makes it a question)',
      },
    ],
  },
  {
    hanzi: '貴',
    simplified: '贵',
    pinyin: 'gùi',
    lesson: 7,
    type: 'n.',
    definition: 'esteem',
  },
  {
    hanzi: '所',
    pinyin: 'sǔo',
    lesson: 7,
    type: 'g.p.',
    definition:
      '(transforms following transitive verb into a nominal phrase describing the object of the verb)',
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
    definition: 'to get, to obtain',
    other: [
      {
        type: 'v.',
        definition: 'to succeed in',
      },
    ],
  },
  {
    hanzi: '處',
    simplified: '处',
    pinyin: 'chǔ',
    lesson: 7,
    type: 't.v.',
    definition: 'to dwell in, to remain in',
  },
  {
    hanzi: '貧',
    simplified: '贫',
    pinyin: 'pín',
    lesson: 7,
    type: 'n.',
    definition: 'poverty',
  },
  {
    hanzi: '賤',
    simplified: '贱',
    pinyin: 'jiàn',
    lesson: 7,
    type: 'n.',
    definition: 'low prestige, low social status',
  },
  {
    hanzi: '惡',
    simplified: '恶',
    pinyin: 'wù',
    lesson: 7,
    type: 't.v.',
    definition: 'to dislike, to hate',
  },
  {
    hanzi: '去',
    pinyin: 'qù',
    lesson: 7,
    type: 't.v.',
    definition: 'to forsake, to abandon',
  },

  // Lesson 8
  {
    hanzi: '賜',
    simplified: '赐',
    pinyin: 'cì',
    lesson: 8,
    type: 'other',
    definition: '(name)',
  },
  {
    hanzi: '予',
    pinyin: 'yú',
    lesson: 8,
    type: 'pron.',
    definition: 'I',
  },
  {
    hanzi: '多',
    pinyin: 'duō',
    lesson: 8,
    type: 'adv.',
    definition: 'disparately; to do V of many things',
  },
  {
    hanzi: '學',
    simplified: '学',
    pinyin: 'xué',
    lesson: 8,
    type: 't.v.',
    definition: 'to study',
    other: [
      {
        type: 's.v.',
        definition: 'to be learned',
      },
    ],
  },
  {
    hanzi: '識',
    simplified: '识',
    pinyin: 'zhì',
    lesson: 8,
    type: 't.v.',
    definition: 'to remember',
  },
  {
    hanzi: '然',
    pinyin: 'rán',
    lesson: 8,
    type: 's.v.',
    definition: 'to be so, to be this way',
  },
  {
    hanzi: '一',
    pinyin: 'yī',
    lesson: 8,
    type: 'n.',
    definition: 'one',
  },
  {
    hanzi: '貫',
    pinyin: 'guàn',
    lesson: 8,
    type: 't.v.',
    definition: 'to bind together',
  },
  {
    hanzi: '子貢',
    pinyin: 'zǐgòng',
    lesson: 8,
    type: 'other',
    definition: '(name)',
  },
  {
    hanzi: '言',
    pinyin: 'yán',
    lesson: 8,
    type: 'n.',
    definition: 'words, maxim',
  },
  {
    hanzi: '終身',
    pinyin: 'zhōngshēn',
    lesson: 8,
    type: 'other',
    definition: 'one’s whole life (literally, "end self")',
  },
  {
    hanzi: '行',
    pinyin: 'xíng',
    lesson: 8,
    type: 't.v.',
    definition: 'to put into effect',
  },
  {
    hanzi: '其⋯⋯乎',
    pinyin: 'qí…hū',
    lesson: 8,
    type: 'other',
    definition: 'is it not…?',
  },
  {
    hanzi: '恕',
    pinyin: 'shù',
    lesson: 8,
    type: 'n.',
    definition: 'reciprocity, sympathy',
  },
  {
    hanzi: '勿',
    pinyin: 'wù',
    lesson: 8,
    type: 'adv.',
    definition: 'do not…it (imperative)',
  },
  {
    hanzi: '施',
    pinyin: 'shī',
    lesson: 8,
    type: 't.v.',
    definition:
      'to bestow something on someone (usually done by a superior to a subordinate)',
  },
  {
    hanzi: '參',
    simplified: '参',
    pinyin: 'shēn',
    lesson: 8,
    type: 'other',
    definition: '(name)',
  },
  {
    hanzi: '唯',
    pinyin: 'wéi',
    lesson: 8,
    type: 't.v.',
    definition: 'is-so, yes (agreeing)',
  },
  {
    hanzi: '出',
    pinyin: 'chū',
    lesson: 8,
    type: 's.v.',
    definition: 'to be out',
    other: [
      {
        type: 'v.',
        definition: 'to go out, to leave',
      },
    ],
  },
  {
    hanzi: '門人',
    simplified: '门人',
    pinyin: 'ménrén',
    lesson: 8,
    type: 'n.',
    definition: 'disciples (literally, "gate people")',
  },
  {
    hanzi: '何',
    pinyin: 'hé',
    lesson: 8,
    type: 'pron.',
    definition: 'what',
  },
  {
    hanzi: '夫子',
    pinyin: 'fūzǐ',
    lesson: 8,
    type: 'other',
    definition: 'the Master',
  },
  {
    hanzi: '忠',
    pinyin: 'zhōng',
    lesson: 8,
    type: 'n.',
    definition: 'loyalty; dutifulness',
  },
  {
    hanzi: '而已矣',
    pinyin: 'éryǐyǐ',
    lesson: 8,
    type: 'other',
    definition: 'and that is all',
  },
]

export default wordlist

export { expandWordClass }

export type { Word, WordClass, WordVariant }
