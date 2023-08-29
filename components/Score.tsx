import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown } from '@fortawesome/pro-light-svg-icons'

export interface ScoreDisplayProps {
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

export default ScoreDisplay
