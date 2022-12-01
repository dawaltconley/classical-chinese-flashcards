import { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown } from '@fortawesome/pro-light-svg-icons'

import type { Word, WordVariant, WordFilter } from '../types/words'
import { filterMatch, expandWordClass } from '../utils/words'
import { Button } from './button'

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
    <span className="table-cell">
      {' ' + d.definition}
      {d.pinyin && <span className="ml-2 font-bold">{d.pinyin}</span>}
    </span>
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

interface CardProps {
  word: Word
  filters?: WordFilter
  markCorrect: () => void
  markIncorrect: () => void
}
const Card = ({ word, filters, markCorrect, markIncorrect }: CardProps) => {
  const defaultDur = 500

  const [isFlipped, setIsFlipped] = useState(false)
  const [hasFlipped, setHasFlipped] = useState(false)
  const [isFlipping, setIsFlipping] = useState(false)
  const [flipDur, setFlipDur] = useState(defaultDur)

  const [frontContent, setFrontContent] = useState(<WordHanzi word={word} />)
  const [backContent, setBackContent] = useState(
    <WordInfo word={word} filters={filters} />
  )

  const answerButtons = useRef<HTMLDivElement>(null)

  const flip = () => {
    if (isFlipping) return
    setIsFlipped(show => !show)
    if (flipDur > 0) {
      setIsFlipping(true)
      setTimeout(() => {
        setIsFlipping(false)
      }, flipDur)
    }
  }

  /**
   * handles the answer
   */
  const handleAnswer = (answer: () => void) => {
    if (isFlipping) return
    if (!isFlipped) {
      // if card is front-side up, secretly flip it first
      setBackContent(frontContent)
      setFlipDur(0)
      setIsFlipped(true)
    }

    // handle the answer and get a new word
    answer()
  }

  useEffect(() => {
    if (isFlipped) setHasFlipped(true)
  }, [isFlipped])

  /** reset the card to its initial state whenever it recieves a new word */
  useEffect(() => {
    setFrontContent(<WordHanzi word={word} />)
    setIsFlipped(false)
    setHasFlipped(false)
    setFlipDur(defaultDur)
    setIsFlipping(true)
    setTimeout(() => {
      setBackContent(<WordInfo word={word} filters={filters} />)
      setIsFlipping(false)
    }, defaultDur)
  }, [word])

  return (
    <div className="context-3d">
      <button
        className={`flippable ${isFlipped ? 'flippable--flipped' : ''}
          flex-center relative mx-auto`}
        style={{
          transitionDuration: flipDur.toString() + 'ms',
        }}
        onClick={() => flip()}
      >
        <h1 className="flippable__front card p-4">{frontContent}</h1>
        <div className="flippable__back card absolute inset-0 p-4">
          {backContent}
        </div>
      </button>
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
    </div>
  )
}

export { Card }
export type { CardProps }
