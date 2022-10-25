import { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown } from '@fortawesome/pro-light-svg-icons'

import type { Word, WordVariant } from '../data/wordlist'
import { Button } from './button'

const WordHanzi = ({ word }: { word: Word }) => (
  <div className="hanzi overflow-hidden whitespace-nowrap font-serif">
    {word.hanzi}
  </div>
)

const WordDefinition = ({
  word,
  variant,
}: {
  word: Word
  variant?: WordVariant
}) => (
  <li className="table-row">
    <abbr className="table-cell pr-2 text-right italic">
      {variant?.type || word.type}
    </abbr>
    <span className="table-cell">
      {' ' + (variant?.definition || word.definition)}
      {/* variant?.pinyin && ` (${variant.pinyin})` */}
      {variant?.pinyin && (
        <span className="ml-2 font-bold">({variant.pinyin})</span>
      )}
    </span>
  </li>
)

const WordInfo = ({ word }: { word: Word }) => {
  return (
    <div className="flex h-full w-full overflow-y-auto">
      <div className="m-auto text-left font-serif">
        <p className="mb-2 text-center text-xl font-bold">{word.pinyin}</p>
        <ol className="list-decimal leading-snug">
          <WordDefinition key={'main'} word={word} />
          {word.other
            ? word.other.map((variant, i) => (
                <WordDefinition key={i} {...{ word, variant }} />
              ))
            : null}
        </ol>
      </div>
    </div>
  )
}

interface CardProps {
  word: Word
  markCorrect: () => void
  markIncorrect: () => void
}
const Card = ({ word, markCorrect, markIncorrect }: CardProps) => {
  const defaultDur = 500

  const [isFlipped, setIsFlipped] = useState(false)
  const [hasFlipped, setHasFlipped] = useState(false)
  const [isFlipping, setIsFlipping] = useState(false)
  const [flipDur, setFlipDur] = useState(defaultDur)

  const [frontContent, setFrontContent] = useState(<WordHanzi word={word} />)
  const [backContent, setBackContent] = useState(<WordInfo word={word} />)

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
      setBackContent(<WordInfo word={word} />)
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
        <h1 className="flippable__front card-border bg-theme-bg p-4">
          {frontContent}
        </h1>
        <div className="flippable__back card-border absolute inset-0 bg-theme-bg p-4">
          {backContent}
        </div>
      </button>
      <div
        ref={answerButtons}
        className="mt-4 overflow-hidden"
        style={{
          transitionDuration: flipDur.toString() + 'ms',
          height:
            hasFlipped && answerButtons.current
              ? answerButtons.current.scrollHeight
              : '0px',
        }}
      >
        <div className="flex justify-around text-lg">
          <p>Rate yourself: </p>
          <span className="ml-2 inline-block space-x-2">
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
              <FontAwesomeIcon
                icon={faThumbsDown}
                className="h-[1em] w-[1em]"
              />
            </Button>
          </span>
        </div>
      </div>
    </div>
  )
}

export { Card }
export type { CardProps }
