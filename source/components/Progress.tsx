import {h} from 'preact'

interface ProgressProps {
  currentQuestion: number
  questionCount: number
}

export function Progress({currentQuestion, questionCount}:ProgressProps):JSX.Element
{
  return <div class='progress'>Question {currentQuestion} of {questionCount}</div>
}
