import { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown } from '@fortawesome/pro-light-svg-icons'
import FlipTransition from './FlipTransition'

import type { Word, WordVariant, WordFilter } from '../types/words'
import { filterMatch, expandWordClass } from '../utils/words'
import Button from './Button'

const WordHanzi = ({ word }: { word: Word }) => (
  <div
    lang="zh-Hant"
    className="hanzi overflow-hidden whitespace-nowrap font-serif"
  >
    {word.hanzi}
  </div>
)

type Definition = WordVariant & Required<Pick<WordVariant, 'type' | 'lesson'>>

const WordDefinition = ({ definition: d }: { definition: Definition }) => (
  <li className="table-row">
    <abbr
      title={expandWordClass(d.type)}
      className="table-cell pr-2 text-right italic"
    >
      {d.type}
    </abbr>
    <div className="table-cell hyphens-auto">
      {' ' + d.definition}
      {d.pinyin && <span className="ml-2 font-bold">{d.pinyin}</span>}
    </div>
  </li>
)

/** returns a list of complete word variants based on a word's multiple meanings */
const getWordDefinitions = (word: Word): Definition[] => {
  const baseDefinition: Definition = {
    type: word.type,
    lesson: word.lesson,
    definition: word.definition,
  }
  return [
    baseDefinition,
    ...(word.other ?? []).map(variant => ({
      ...baseDefinition,
      ...variant,
    })),
  ]
}

const WordInfo = ({ word, filters }: { word: Word; filters?: WordFilter }) => {
  const defList1 = useRef<HTMLOListElement>(null)
  const defList2 = useRef<HTMLOListElement>(null)

  const definitions: JSX.Element[] = []
  const otherDefinitions: JSX.Element[] = []
  getWordDefinitions(word).forEach((def, i) => {
    const component = <WordDefinition key={i} definition={def} />
    if (!filters || filterMatch(def, filters)) {
      definitions.push(component)
    } else {
      otherDefinitions.push(component)
    }
  })

  // align the columns in the two definition lists
  useEffect(() => {
    const selector = 'abbr.table-cell'
    const col1 = defList1.current?.querySelector<HTMLElement>(selector)
    const col2 = defList2.current?.querySelector<HTMLElement>(selector)
    if (!col1 || !col2) return

    const width = Math.max(col1.clientWidth, col2.clientWidth)
    col1.style.width = `${width}px`
    col2.style.width = `${width}px`
  }, [])

  return (
    <div className="flex h-full w-full overflow-y-auto">
      <div className="m-auto table text-left font-serif">
        <dfn
          title={word.hanzi}
          className="mb-2 block text-center text-xl font-bold"
        >
          {word.pinyin}
        </dfn>
        <ul ref={defList1} className="list-decimal leading-snug">
          {definitions}
        </ul>
        {otherDefinitions.length > 0 && (
          <>
            <p className="my-2 text-center italic">also…</p>
            <ul ref={defList2} className="list-decimal leading-snug">
              {otherDefinitions}
            </ul>
          </>
        )}
      </div>
    </div>
  )
}

export interface CardProps {
  word: Word
  filters?: WordFilter
  markCorrect: () => void
  markIncorrect: () => void
  flipDur?: number
}

const Card = ({
  word,
  filters,
  markCorrect,
  markIncorrect,
  flipDur = 500,
}: CardProps) => {
  const [isFlipped, setIsFlipped] = useState(false)
  const [hasFlipped, setHasFlipped] = useState(false)

  const answerButtons = useRef<HTMLDivElement>(null)

  const flip = () => {
    setHasFlipped(true)
    setIsFlipped(show => !show)
  }

  /**
   * handles the answer
   */
  const handleAnswer = (answer: () => void) => {
    setIsFlipped(false)
    setHasFlipped(false)
    answer()
  }

  const front = useRef<HTMLHeadingElement>(null)

  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  // useEffect(() => {
  //   if (front.current) {
  //     setWidth(front.current.scrollWidth)
  //     setHeight(front.current.scrollHeight)
  //   }
  // }, [word])

  return (
    <>
      <FlipTransition
        as="button"
        duration={flipDur}
        unmount={false}
        className="flex-center tap-highlight-none relative mx-auto h-40"
        width={width}
        height={height}
        onClick={() => flip()}
      >
        {!isFlipped ? (
          <h1 key={word.hanzi} ref={front} className="card h-full p-4">
            <WordHanzi word={word} />
          </h1>
        ) : (
          <div key={word.hanzi} className="card absolute inset-0 h-full p-4">
            <WordInfo word={word} filters={filters} />
          </div>
        )}
      </FlipTransition>
      <div
        ref={answerButtons}
        className="mx-auto mt-4 w-1/2 min-w-[6rem] overflow-hidden"
        style={{
          transitionDuration: flipDur.toString() + 'ms',
          height:
            hasFlipped && answerButtons.current
              ? answerButtons.current.scrollHeight
              : '0px',
        }}
      >
        <div className="flex justify-between space-x-4 text-lg">
          <Button
            style="green"
            circle
            onClick={() => handleAnswer(markCorrect)}
          >
            <FontAwesomeIcon icon={faThumbsUp} className="h-[1em] w-[1em]" />
          </Button>
          <Button
            style="red"
            circle
            onClick={() => handleAnswer(markIncorrect)}
          >
            <FontAwesomeIcon icon={faThumbsDown} className="h-[1em] w-[1em]" />
          </Button>
        </div>
      </div>
    </>
  )
}

export default Card
