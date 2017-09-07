import {h} from 'preact'
import {ResetIcon} from './ResetIcon'

export function Results({correctCount, questionCount, onResetButtonClick}:ResultsProps):JSX.Element
{
  const grade:string =
      correctCount === 0 ? 'F'
    : correctCount === questionCount ? 'A'
    : correctCount === questionCount - 1 ? 'B'
    : correctCount === questionCount - 2 ? 'C'
    : 'D'

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
