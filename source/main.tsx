import {h, render} from 'preact'
import {Quiz} from './components/Quiz'

export interface QuestionData {
  question: string
  answers: string[]
  correct: number
}

const questionCount:number = 0
const questionsData:QuestionData[] = []

render(<Quiz {...{questionCount, questionsData}} />, document.body, document.querySelector('.quiz') as HTMLElement)
