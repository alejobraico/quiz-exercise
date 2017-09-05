import {h} from 'preact'
import {ResetIcon} from './ResetIcon'

interface ResultsProps {
  correctCount: number
  questionCount: number
  onResetButtonClick: () => void
}

export function Results({correctCount, questionCount, onResetButtonClick}:ResultsProps):JSX.Element
{
  const percentage:number = Math.round((correctCount / questionCount) * 100)
  const grade:string =
      percentage >= 90 ? 'A'
    : percentage >= 80 ? 'B'
    : percentage >= 70 ? 'C'
    : percentage >= 65 ? 'D'
    : 'F'


  return (
    <div class='results'>
      <div class='results__contents'>
        <div class={`results__grade results__grade--${grade}`}>{grade}</div>
        <div class='results__details'>You got {correctCount} out of {questionCount} questions correct.</div>
        <div {...{class:'results__reset-button', onClick:onResetButtonClick}}><ResetIcon /> Try again?</div>
      </div>
    </div>
  )
}
