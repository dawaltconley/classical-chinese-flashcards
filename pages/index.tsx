import { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'

import wordlist from '../data/wordlist'
import { Word, WordFilter } from '../types/words'
import { filterWords, allWordsFilter } from '../utils/words'
import Card from '../components/Card'
import Button from '../components/Button'
import ThemeToggle from '../components/ThemeToggle'
import ScoreDisplay from '../components/Score'
import Drawer from '../components/Drawer'
import Filters from '../components/Filters'

interface SaveGame {
  words: Word[]
  completed: Word[]
  missed: number
  filter?: WordFilter
}

let lastGame: string | null
if (typeof window !== 'undefined')
  lastGame = window.localStorage.getItem('flashcards')

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
  <div className="flex-center h-auto min-h-full flex-col pb-24">{children}</div>
)

const Home: NextPage = () => {
  const [words, setWords] = useState(wordlist)
  const [completed, setCompleted] = useState<Word[]>([])
  const [missed, setMissed] = useState(0)
  const [filter, setFilter] = useState<WordFilter>(allWordsFilter)
  const currentWord = words[0]

  const [drawerOpen, setDrawerOpen] = useState(false)

  const markCorrect = () => {
    setCompleted(completed => completed.concat(currentWord))
    setWords(words => words.slice(1))
  }
  const markIncorrect = () => {
    setMissed(missed => missed + 1)
    setWords(words => words.slice(1).concat(currentWord))
  }

  const handleFilter = (filter: WordFilter, preserveFirst = true) => {
    // get words that match the current filter and have not already been completed
    let newWords = filterWords(wordlist, filter).filter(word =>
      completed.every(({ hanzi }) => hanzi !== word.hanzi)
    )
    newWords = shuffle(newWords)

    // if newWords contains currentWord, keep that at the the front
    if (preserveFirst) {
      for (let i = 0; i < newWords.length; i++) {
        if (newWords[i].hanzi === currentWord.hanzi) {
          newWords[i] = newWords[0]
          newWords[0] = currentWord
          break
        }
      }
    }

    // update state
    setWords(newWords)
    setFilter(filter)
    setDrawerOpen(false)
  }

  const resetFlashcards = (filter: WordFilter = allWordsFilter) => {
    handleFilter(filter, false)
    setCompleted([])
    setMissed(0)
  }

  useEffect(() => {
    const save: SaveGame = {
      words,
      completed,
      missed,
      filter,
    }
    window.localStorage.setItem('flashcards', JSON.stringify(save))
  }, [words, completed, missed, filter])

  useEffect(() => {
    const save: SaveGame | null = lastGame && JSON.parse(lastGame)
    if (save) {
      const words = save.filter
        ? filterWords(save.words, save.filter)
        : save.words
      setWords(words)
      setFilter(save.filter || allWordsFilter)
      setCompleted(save.completed)
      setMissed(save.missed)
    } else {
      resetFlashcards()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container>
      <Head>
        <title>Classical Chinese Flashcards</title>
        <meta
          name="description"
          content='Flashcards for vocab in Van Norden&apos;s "Classical Chinese for Everyone"'
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="items center mb-8 flex h-16 w-full justify-between p-4">
        <div className="mx-auto flex items-center justify-between space-x-8">
          <ScoreDisplay
            correct={completed.length}
            incorrect={missed}
            remaining={words.length}
          />
        </div>
        <ThemeToggle />
      </header>

      <main className="my-auto">
        {currentWord ? (
          <Card
            word={currentWord}
            filters={filter || undefined}
            {...{ markCorrect, markIncorrect }}
          />
        ) : (
          <Button onClick={() => resetFlashcards(filter)}>Reset</Button>
        )}
      </main>

      <Drawer title="Filters" isOpen={drawerOpen} setIsOpen={setDrawerOpen}>
        <div className="mx-auto max-w-md px-4">
          <Filters
            activeFilters={filter}
            handleFilter={handleFilter}
            handleReset={resetFlashcards}
            isActive={drawerOpen}
          />
        </div>
      </Drawer>
    </Container>
  )
}

export default Home
