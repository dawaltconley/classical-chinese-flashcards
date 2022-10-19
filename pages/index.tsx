import type { NextPage } from 'next'
import { useState } from 'react'
import Head from 'next/head'

import wordlist, { Word } from '../data/wordlist'

const Container = ({ children }: { children: React.ReactNode }) => (
  <div className="flex-center h-screen w-screen flex-col">{children}</div>
)

const Card = ({ word }: { word: Word }) => {
  const [showAnswer, setShowAnswer] = useState(false)
  const flip = () => setShowAnswer(show => !show)

  return (
    <button
      className="flex-center h-40 w-40 rounded-2xl border-4 border-slate-500/10 text-slate-800"
      onClick={flip}
    >
      <h1 className={`text-8xl ${showAnswer ? 'hidden' : ''}`}>{word.hanzi}</h1>
      <div className={`text-left ${showAnswer ? '' : 'hidden'}`}>
        <p>
          <span className="bold">pinyin:</span> {word.pinyin}
        </p>
        <p>
          <span className="bold">{word.type}</span> {word.definition}
        </p>
      </div>
    </button>
  )
}

const Home: NextPage = () => {
  let word = wordlist[0]
  return (
    <Container>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>{<Card word={word} />}</main>
    </Container>
  )
}

export default Home
