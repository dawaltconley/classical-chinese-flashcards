import { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faXmark } from '@fortawesome/pro-solid-svg-icons'
import type { NextPage } from 'next'
import Head from 'next/head'

import wordlist, { Word } from '../data/wordlist'

var shuffle = <T extends any>(arr: T[]): T[] => {
  const len = arr.length
  const remaining: T[] = [...arr]
  const shuffled: T[] = []
  while (shuffled.length < len) {
    let i = Math.floor(Math.random() * remaining.length)
    let item = remaining.splice(i, 1)[0]
    shuffled.push(item)
  }
  return shuffled
}

const Container = ({ children }: { children: React.ReactNode }) => (
  <div className="flex-center h-screen w-screen flex-col">{children}</div>
)

type Button = (props: {
  onClick: () => void
  children?: React.ReactNode
}) => JSX.Element
const Button: Button = ({ onClick, children }) => {
  return (
    <button
      className="rounded-full bg-gray-200 px-2 py-1"
      onClick={() => onClick()}
    >
      {children}
    </button>
  )
}
const ButtonCircle: Button = ({ onClick, children }) => {
  return (
    <button
      className="aspect-square rounded-full bg-gray-200 p-1"
      onClick={() => onClick()}
    >
      {children}
    </button>
  )
}

const WordHanzi = ({ word }: { word: Word }) => (
  <div className="writing-vertical-rl overflow-hidden whitespace-nowrap font-serif text-9xl">
    {word.hanzi}
  </div>
)

const WordInfo = ({ word }: { word: Word }) =>
  word ? (
    <div className="inline-block h-full overflow-y-scroll text-left font-serif">
      <p className="text-center text-xl font-bold">{word.pinyin}</p>
      <p className="leading-snug">
        <span className="italic">{word.type}</span> {word.definition}
      </p>
    </div>
  ) : null

interface ScoreDisplayProps {
  correct: number
  incorrect: number
  remaining: number
}
const ScoreDisplay = ({ correct, incorrect, remaining }: ScoreDisplayProps) => (
  <div className="mx-auto flex max-w-md justify-evenly p-4">
    <span className="text-green-700">
      <span>{correct}</span>
      <FontAwesomeIcon
        icon={faCheck}
        className="align-text-middle ml-1 inline-block aspect-square h-[0.9em]"
      />
    </span>
    <span className="text-red-700">
      <span>{incorrect}</span>
      <FontAwesomeIcon
        icon={faXmark}
        className="align-text-middle ml-1 inline-block aspect-square h-[0.9em]"
      />
    </span>
    <span>{remaining} remaining</span>
  </div>
)

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
        className={`flex-center flippable ${
          isFlipped ? 'flippable--flipped' : ''
        } mx-auto rounded-2xl border-8 border-slate-500/10 p-4 text-slate-800`}
        style={{
          transitionDuration: flipDur.toString() + 'ms',
        }}
        onClick={() => flip()}
      >
        <h1 className="flippable__front">{frontContent}</h1>
        <div className="flippable__back absolute inset-4 text-center">
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
            <ButtonCircle onClick={() => handleAnswer(markCorrect)}>
              <FontAwesomeIcon icon={faCheck} className="h-[1em] w-[1em]" />
            </ButtonCircle>
            <ButtonCircle onClick={() => handleAnswer(markIncorrect)}>
              <FontAwesomeIcon icon={faXmark} className="h-[1em] w-[1em]" />
            </ButtonCircle>
          </span>
        </div>
      </div>
    </div>
  )
}

const Home: NextPage = () => {
  const [words, setWords] = useState(wordlist)
  const [completed, setCompleted] = useState<Word[]>([])
  const [missed, setMissed] = useState(0)
  const currentWord = words[0]

  const resetFlashcards = () => {
    setWords(shuffle(wordlist))
    setCompleted([])
  }
  useEffect(resetFlashcards, [])

  const markCorrect = () => {
    setCompleted(completed => completed.concat(currentWord))
    setWords(words => words.slice(1))
  }
  const markIncorrect = () => {
    setMissed(missed => missed + 1)
    setWords(words => words.slice(1).concat(currentWord))
  }

  return (
    <Container>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="fixed top-0 left-0 right-0 w-full">
        <ScoreDisplay
          correct={completed.length}
          incorrect={missed}
          remaining={words.length}
        />
      </header>

      <main>
        {<Card word={currentWord} {...{ markCorrect, markIncorrect }} />}
      </main>
    </Container>
  )
}

export default Home
