import { Word } from '../types/words'

const allLessons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] as const

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
      {
        lesson: 10,
        type: 'pron.',
        definition: 'you (honorific second-person pronoun; contrast 汝 rǔ)',
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
      {
        lesson: 9,
        definition: '(marks expression being defined or characterized)',
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
      {
        lesson: 10,
        type: 'adv.',
        definition: 'how…? from where…?',
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
    definition: '(comes at the end of a sentence, makes it a question)',
    other: [
      {
        lesson: 8,
        definition: '(vocative particle; follows name of person addressed)',
      },
      {
        lesson: 9,
        definition: 'on, from, of (preposition)',
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
    other: [
      {
        lesson: 11,
        definition: 'to be bright',
      },
    ],
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
    other: [
      {
        lesson: 12,
        type: 't.v.',
        definition: 'to have faith in, to have confidence in, to believe in',
      },
    ],
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
    other: [
      {
        lesson: 10,
        type: 'adv.',
        definition: 'already',
      },
    ],
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
      {
        lesson: 13,
        type: 'g.p.',
        definition: '(sentence-final exclamatory)',
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
    other: [
      {
        lesson: 11,
        type: 'g.p.',
        definition:
          '-ingly (follows a stative verb, converting it into an adverb)',
      },
    ],
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
    other: [
      {
        lesson: 9,
        type: 't.v.',
        definition: 'to put into words, to create maxims',
      },
      {
        lesson: 9,
        type: 't.v.',
        definition: 'to mean',
      },
    ],
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

  // Lesson 9
  {
    hanzi: '文章',
    pinyin: 'wénzhāng',
    lesson: 9,
    type: 'other',
    definition: 'words and deeds',
  },
  {
    hanzi: '聞',
    simplified: '闻',
    pinyin: 'wén',
    lesson: 9,
    type: 't.v.',
    definition: 'to hear',
  },
  {
    hanzi: '天',
    pinyin: 'tiān',
    lesson: 9,
    type: 'n.',
    definition: 'Heaven (an impersonal higher power)',
    other: [
      {
        type: 's.v.',
        definition: 'to be of Heaven, Heavenly',
      },
    ],
  },
  {
    hanzi: '德',
    pinyin: 'dé',
    lesson: 9,
    type: 'n.',
    definition: 'virtue, political charisma generated by a good character',
  },
  {
    hanzi: '見',
    simplified: '见',
    pinyin: 'xiàn',
    lesson: 9,
    type: 's.v.',
    definition: 'to be visible',
    other: [
      {
        lesson: 12,
        pinyin: 'jiàn',
        type: 't.v.',
        definition: 'to see',
      },
    ],
  },
  {
    hanzi: '外',
    pinyin: 'wài',
    lesson: 9,
    type: 'n.',
    definition: 'the outside',
  },
  {
    hanzi: '威儀',
    simplified: '威仪',
    pinyin: 'wēiyí',
    lesson: 9,
    type: 'n.',
    definition: 'august bearing',
  },
  {
    hanzi: '文辭',
    pinyin: 'wéncí',
    lesson: 9,
    type: 'n.',
    definition: 'eloquent words',
  },
  {
    hanzi: '皆',
    pinyin: 'jiē',
    lesson: 9,
    type: 'adv.',
    definition: 'all',
  },
  {
    hanzi: '受',
    pinyin: 'shòu',
    lesson: 9,
    type: 't.v.',
    definition: 'to receive',
  },
  {
    hanzi: '理',
    pinyin: 'lǐ',
    lesson: 9,
    type: 'n.',
    definition:
      'Pattern, Principle (technical term in Confucian metaphysics for the underlying structure of the universe, fully complete in each thing that exists, but manifested differently due to the concrete embodiment of each thing)',
  },
  {
    hanzi: '自然',
    pinyin: 'zìrán',
    lesson: 9,
    type: 's.v.',
    definition: 'to be natural (literally, "self-so")',
    other: [
      {
        type: 'n.',
        definition: 'naturalness',
      },
    ],
  },
  {
    hanzi: '本',
    pinyin: 'běn',
    lesson: 9,
    type: 'n.',
    definition: 'root, basis',
    other: [
      {
        type: 's.v.',
        definition: 'to be fundamental',
      },
    ],
  },
  {
    hanzi: '體',
    simplified: '体',
    pinyin: 'tǐ',
    lesson: 9,
    type: 'n.',
    definition:
      'Substance (technical term in Confucian metaphysics; roughly, the 體 is what something is in itself, while its 用, Function, is how it manifests itself in action; the eye is 體, seeing is its 用; water is 體, waves are its 用)',
  },
  {
    hanzi: '實',
    simplified: '实',
    pinyin: 'shí',
    lesson: 9,
    type: 'n.',
    definition: 'reality (as opposed to appearance or manifestation)',
  },
  {
    hanzi: '日',
    pinyin: 'rì',
    lesson: 9,
    type: 'adv.',
    definition: 'daily',
  },
  {
    hanzi: '固',
    pinyin: 'gù',
    lesson: 9,
    type: 'adv.',
    definition: 'definitely',
  },
  {
    hanzi: '共',
    pinyin: 'gòng',
    lesson: 9,
    type: 'adv.',
    definition: 'jointly, as a group',
  },
  {
    hanzi: '至於',
    simplified: '至于',
    pinyin: 'zhìyú',
    lesson: 9,
    type: 'other',
    definition: 'When it comes to…',
  },
  {
    hanzi: '則',
    simplified: '则',
    pinyin: 'zé',
    lesson: 9,
    type: 'g.p.',
    definition: '(contrastive topic marker)',
    other: [
      {
        lesson: 13,
        type: 'conj.',
        definition: 'then',
      },
    ],
  },
  {
    hanzi: '罕',
    pinyin: 'hǎn',
    lesson: 9,
    type: 'adv.',
    definition: 'seldom',
  },

  // Lesson 10
  {
    hanzi: '莊',
    simplified: '庄',
    pinyin: 'zhuāng',
    lesson: 10,
    type: 'other',
    definition: '(family name)',
  },
  {
    hanzi: '惠',
    pinyin: 'huì',
    lesson: 10,
    type: 'other',
    definition: '(family name)',
  },
  {
    hanzi: '遊',
    simplified: '游',
    pinyin: 'yóu',
    lesson: 10,
    type: 'v.',
    definition: 'to roam, to wander',
  },
  {
    hanzi: '濠',
    pinyin: 'háo',
    lesson: 10,
    type: 'other',
    definition: '(name of a river; 濠。水名也。)',
  },
  {
    hanzi: '梁',
    pinyin: 'liáng',
    lesson: 10,
    type: 'n.',
    definition: 'roof beam, structural beam',
    other: [{ definition: 'bridge' }],
  },
  {
    hanzi: '上',
    pinyin: 'shàng',
    lesson: 10,
    type: 's.v.',
    definition: 'to be above (contrast 下 xià)',
  },
  {
    hanzi: '鯈',
    pinyin: 'tiáo',
    lesson: 10,
    type: 'n.',
    definition: 'freshwater minnow',
  },
  {
    hanzi: '魚',
    simplified: '鱼',
    pinyin: 'yú',
    lesson: 10,
    type: 'n.',
    definition: 'fish',
  },
  {
    hanzi: '從容',
    pinyin: 'cōngróng',
    lesson: 10,
    type: 's.v.',
    definition: 'to be easygoing',
  },
  {
    hanzi: '我',
    pinyin: 'wǒ',
    lesson: 10,
    type: 'pron.',
    definition: 'I, me',
    other: [{ definition: 'my, mine' }],
  },
  {
    hanzi: '請',
    simplified: '请',
    pinyin: 'qǐng',
    lesson: 10,
    type: 't.v.',
    definition: 'to request, to ask, to invite',
    other: [
      {
        definition: 'please do…',
      },
    ],
  },
  {
    hanzi: '循',
    pinyin: 'xún',
    lesson: 10,
    type: 't.v.',
    definition: 'follow, abide by',
  },
  {
    hanzi: '云',
    pinyin: 'yún',
    lesson: 10,
    type: 't.v.',
    definition: 'to say (often embedded quote)',
  },
  {
    hanzi: '云者',
    pinyin: 'yúnzhě',
    lesson: 10,
    type: 'other',
    definition: 'was said (used to mark the end of a quotation or paraphrase)',
  },
  {
    hanzi: '全',
    pinyin: 'quán',
    lesson: 10,
    type: 's.v.',
    definition: 'to be complete, to be whole',
    other: [
      {
        type: 'adv.',
        definition: 'all',
      },
    ],
  },
  {
    hanzi: '既',
    pinyin: 'jì',
    lesson: 10,
    type: 'adv.',
    definition: 'completely, fully, wholly',
    other: [
      {
        type: 'adv.',
        definition: 'already, since',
      },
    ],
  },

  // Lesson 11
  {
    hanzi: '床',
    pinyin: 'chuāng',
    lesson: 11,
    type: 'n.',
    definition: 'bed',
  },
  {
    hanzi: '前',
    pinyin: 'qián',
    lesson: 11,
    type: 'n.',
    definition: 'the front',
  },
  {
    hanzi: '月',
    pinyin: 'yuè',
    lesson: 11,
    type: 'n.',
    definition: 'moon',
  },
  {
    hanzi: '光',
    pinyin: 'guāng',
    lesson: 11,
    type: 's.v.',
    definition: 'to shine',
  },
  {
    hanzi: '疑',
    pinyin: 'yí',
    lesson: 11,
    type: 't.v.',
    definition: 'to suspect that, to wonder whether',
  },
  {
    hanzi: '地',
    pinyin: 'dì',
    lesson: 11,
    type: 'n.',
    definition: 'earth',
    other: [{ definition: 'ground' }],
  },
  {
    hanzi: '霜',
    pinyin: 'shuāng',
    lesson: 11,
    type: 'n.',
    definition: 'frost',
  },
  {
    hanzi: '舉',
    simplified: '举',
    pinyin: 'jǔ',
    lesson: 11,
    type: 't.v.',
    definition: 'to lift',
  },
  {
    hanzi: '頭',
    simplified: '头',
    pinyin: 'tóu',
    lesson: 11,
    type: 'n.',
    definition: 'head',
  },
  {
    hanzi: '望',
    pinyin: 'wàng',
    lesson: 11,
    type: 't.v.',
    definition: 'to look at',
  },
  {
    hanzi: '低',
    pinyin: 'dī',
    lesson: 11,
    type: 't.v.',
    definition: 'to lower',
  },
  {
    hanzi: '思',
    pinyin: 'sī',
    lesson: 11,
    type: 't.v.',
    definition: 'to think longingly of',
  },
  {
    hanzi: '故鄉',
    simplified: '故乡',
    pinyin: 'gùxiāng',
    lesson: 11,
    type: 'n.',
    definition: 'hometown (literally, old town)',
  },
  {
    hanzi: '世',
    pinyin: 'shì',
    lesson: 11,
    type: 'n.',
    definition: 'world',
    other: [{ definition: 'era' }],
  },
  {
    hanzi: '若',
    pinyin: 'ruò',
    lesson: 11,
    type: 's.v.',
    definition: 'to be like',
  },
  {
    hanzi: '大',
    pinyin: 'dà',
    lesson: 11,
    type: 's.v.',
    definition: 'to be big',
  },
  {
    hanzi: '夢',
    simplified: '梦',
    pinyin: 'mèng',
    lesson: 11,
    type: 'n.',
    definition: 'dream',
    other: [
      {
        lesson: 13,
        type: 't.v.',
        definition: 'to dream',
      },
    ],
  },
  {
    hanzi: '胡為',
    pinyin: 'húwèi',
    lesson: 11,
    type: 'other',
    definition: 'for what (reason)',
  },
  {
    hanzi: '勞',
    simplified: '劳',
    pinyin: 'láo',
    lesson: 11,
    type: 't.v.',
    definition: 'to belabor, to make work for',
  },
  {
    hanzi: '生',
    pinyin: 'shēng',
    lesson: 11,
    type: 'n.',
    definition: 'life',
  },
  {
    hanzi: '所以',
    pinyin: 'suǒyǐ',
    lesson: 11,
    type: 'conj.',
    definition: 'because of this, therefore',
    other: [
      {
        lesson: 12,
        type: 'n.',
        definition: 'that by means of which, the reason why',
      },
    ],
  },
  {
    hanzi: '終日',
    pinyin: 'zhōngrì',
    lesson: 11,
    type: 'adv.',
    definition: 'all day (literally, end day)',
  },
  {
    hanzi: '醉',
    pinyin: 'zuì',
    lesson: 11,
    type: 's.v.',
    definition: 'to be intoxicated',
  },
  {
    hanzi: '頹',
    simplified: '颓',
    pinyin: 'tuí',
    lesson: 11,
    type: 's.v.',
    definition: 'to slump, to sprawl',
  },
  {
    hanzi: '臥',
    pinyin: 'wò',
    lesson: 11,
    type: 's.v.',
    definition: 'to sleep',
  },
  {
    hanzi: '楹',
    pinyin: 'yíng',
    lesson: 11,
    type: 'n.',
    definition: 'pillar',
  },

  // Lesson 12
  {
    hanzi: '孟',
    pinyin: 'mèng',
    lesson: 12,
    type: 'other',
    definition: '(family name)',
  },
  {
    hanzi: '忍',
    pinyin: 'rěn',
    lesson: 12,
    type: 't.v.',
    definition: 'to be unfeeling toward',
  },
  {
    hanzi: '今',
    pinyin: 'jīn',
    lesson: 12,
    type: 'g.p.',
    definition: 'indicates a counterfactual mood',
  },
  {
    hanzi: '乍',
    pinyin: 'zhà',
    lesson: 12,
    type: 'adv.',
    definition: 'suddenly',
  },
  {
    hanzi: '孺子',
    pinyin: 'rúzǐ',
    lesson: 12,
    type: 'n.',
    definition: 'baby',
    other: [{ definition: 'toddler' }],
  },
  {
    hanzi: '將',
    pinyin: 'jiāng',
    lesson: 12,
    type: 'v.',
    definition: 'will, shall, going to',
  },
  {
    hanzi: '入',
    pinyin: 'rù',
    lesson: 12,
    type: 's.v.',
    definition: 'to enter',
  },
  {
    hanzi: '井',
    pinyin: 'jǐng',
    lesson: 12,
    type: 'n.',
    definition: 'well',
  },
  {
    hanzi: '怵惕',
    pinyin: 'chùtì',
    lesson: 12,
    type: 'n.',
    definition: 'alarm, fear',
  },
  {
    hanzi: '惻隱',
    simplified: '恻隐',
    pinyin: 'cèyǐn',
    lesson: 12,
    type: 'n.',
    definition: 'sympathy, compassion',
  },
  {
    hanzi: '心',
    pinyin: 'xīn',
    lesson: 12,
    type: 'n.',
    definition: 'heart',
    other: [{ definition: 'feeling' }],
  },
  {
    hanzi: '端',
    pinyin: 'duān',
    lesson: 12,
    type: 'n.',
    definition: 'tip',
    other: [{ definition: 'sprout' }],
  },
  {
    hanzi: '苟',
    pinyin: 'gǒu',
    lesson: 12,
    type: 'conj.',
    definition: 'if only',
  },
  {
    hanzi: '能',
    pinyin: 'néng',
    lesson: 12,
    type: 'v.',
    definition: 'to be able to',
  },
  {
    hanzi: '充',
    pinyin: 'chōng',
    lesson: 12,
    type: 't.v.',
    definition: 'to fill up',
    other: [{ definition: 'to make complete' }],
  },
  {
    hanzi: '足',
    pinyin: 'zú',
    lesson: 12,
    type: 's.v.',
    definition: 'to be sufficient',
  },
  {
    hanzi: '保',
    pinyin: 'bǎo',
    lesson: 12,
    type: 't.v.',
    definition: 'to protect',
  },
  {
    hanzi: '四海',
    pinyin: 'sìhǎi',
    lesson: 12,
    type: 'n.',
    definition: 'the Four Seas',
    other: [{ definition: 'the inhabited world' }],
  },
  {
    hanzi: '事',
    pinyin: 'shì',
    lesson: 12,
    type: 't.v.',
    definition: 'to serve (especially a superior)',
  },
  {
    hanzi: '盡',
    simplified: '尽',
    pinyin: 'jìn',
    lesson: 12,
    type: 'adv.',
    definition: 'wholly, completely, fully',
  },
  {
    hanzi: '書',
    pinyin: 'shū',
    lesson: 12,
    type: 'n.',
    definition: 'book, writings',
    other: [{ definition: 'the Documents' }],
  },

  // Lesson 13
  {
    hanzi: '昔者',
    pinyin: 'xī zhě',
    lesson: 13,
    type: 'adv.',
    definition: 'in the past, once upon a time',
  },
  {
    hanzi: '周',
    pinyin: 'zhōu',
    lesson: 13,
    type: 'other',
    definition: '(personal name)',
  },
  {
    hanzi: '胡蝶',
    pinyin: 'húdíe',
    lesson: 13,
    type: 'n.',
    definition: 'butterfly',
  },
  {
    hanzi: '栩栩',
    pinyin: 'xǔxǔ',
    lesson: 13,
    type: 's.v.',
    definition: 'to be lively',
  },
  {
    hanzi: '喻',
    pinyin: 'yù',
    lesson: 13,
    type: 't.v.',
    definition: 'to understand',
  },
  {
    hanzi: '適',
    pinyin: 'shì',
    lesson: 13,
    type: 't.v.',
    definition: 'to satisfy',
  },
  {
    hanzi: '志',
    pinyin: 'zhì',
    lesson: 13,
    type: 'n.',
    definition: 'intentions, goals',
  },
  {
    hanzi: '俄',
    pinyin: 'é',
    lesson: 13,
    type: 's.v.',
    definition: 'to be sudden',
  },
  {
    hanzi: '覺',
    simplified: '觉',
    pinyin: 'jué',
    lesson: 13,
    type: 's.v.',
    definition: 'to be conscious',
  },
  {
    hanzi: '蘧蘧',
    pinyin: 'qúqú',
    lesson: 13,
    type: 's.v.',
    definition: 'to be sudden',
  },
  {
    hanzi: '必',
    pinyin: 'bì',
    lesson: 13,
    type: 'adv.',
    definition: 'must, necessarily',
  },
  {
    hanzi: '分',
    pinyin: 'fēn',
    lesson: 13,
    type: 'n.',
    definition: 'distinction',
  },
  {
    hanzi: '此',
    pinyin: 'cǐ',
    lesson: 13,
    type: 'n.',
    definition: 'this',
  },
  {
    hanzi: '之謂',
    pinyin: 'zhī wèi',
    lesson: 13,
    type: 'other',
    definition: 'is what is called',
  },
  {
    hanzi: '化',
    pinyin: 'huà',
    lesson: 13,
    type: 'n.',
    definition: 'transformation',
  },
]

export default wordlist

export { allLessons, allClasses }
