import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown } from '@fortawesome/pro-light-svg-icons'
import type { NextPage } from 'next'
import Head from 'next/head'

import wordlist, { Word } from '../data/wordlist'
import { Card } from '../components/card'
import { ThemeToggle } from '../components/button'
import { Drawer } from '../components/settings'

const shuffle = <T extends any>(arr: T[]): T[] => {
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

interface ScoreDisplayProps {
  correct: number
  incorrect: number
  remaining: number
}
const ScoreDisplay = ({ correct, incorrect, remaining }: ScoreDisplayProps) => (
  <>
    <span className="text-theme-green">
      <span>{correct}</span>
      <FontAwesomeIcon
        icon={faThumbsUp}
        className="align-text-middle ml-1 inline-block aspect-square h-[0.9em]"
      />
    </span>
    <span className="text-theme-red">
      <span>{incorrect}</span>
      <FontAwesomeIcon
        icon={faThumbsDown}
        className="align-text-middle ml-1 inline-block aspect-square h-[0.9em]"
      />
    </span>
    <span>{remaining} remaining</span>
  </>
)

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

      <header className="items center fixed top-0 left-0 right-0 flex h-16 w-full justify-between p-4">
        <div className="mx-auto flex items-center justify-between space-x-8">
          <ScoreDisplay
            correct={completed.length}
            incorrect={missed}
            remaining={words.length}
          />
        </div>
        <ThemeToggle />
      </header>

      <main>
        {<Card word={currentWord} {...{ markCorrect, markIncorrect }} />}
      </main>

      <Drawer title="Filters" />
    </Container>
  )
}

export default Home
