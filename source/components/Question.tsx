import {h} from 'preact'
import {Answer} from './Answer'
import {QuestionData} from '../main'

interface QuestionProps {
  onAnswerSelect: (answer:number) => void
  questionData: QuestionData
}

export function Question({onAnswerSelect, questionData:{question, answers, correct}}:QuestionProps):JSX.Element
{
  return (
    <div class='question'>
      <div class='question__text'>{question}</div>
      {answers.map((answer:string, index:number):JSX.Element => <Answer {...{text:answer, onClick:():void => onAnswerSelect(index + 1)}} />)}
    </div>
  )
}
