import {h} from 'preact'

export function Progress({currentQuestionIndex, questionCount}:ProgressProps):JSX.Element
{
  return <div class='progress'>Question {currentQuestionIndex + 1} of {questionCount}</div>
}
