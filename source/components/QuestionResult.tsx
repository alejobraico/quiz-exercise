import {h} from 'preact'

interface QuestionResultProps {
  answer: string
  question: string
  incorrectAnswer?: string
}

export function QuestionResult({answer, incorrectAnswer, question}:QuestionResultProps):JSX.Element
{
  return (
    <div class='question-result'>
      <div class='question-result__question'>{question}</div>
      {incorrectAnswer && <div class='question-result__answer question-result__answer--incorrect'>{incorrectAnswer}</div>}
      <div class='question-result__answer question-result__answer--correct'>{answer}</div>
    </div>
  )
}
