import wordlist from '../../data/wordlist'
import { toFlashcard, toTextLine } from '../../utils/pleco'

const getFileContent = (): string =>
  wordlist.map(toFlashcard).map(toTextLine).join('\n')

export function GET() {
  return new Response(getFileContent(), {
    headers: {
      'Content-Type': 'text/plain',
    },
  })
}
