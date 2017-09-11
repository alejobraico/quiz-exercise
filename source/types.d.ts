interface AnswerProps {
  onClick():void
  text: string
}

interface IconProps {
  classes?: string
  pathClasses?: string
}

interface OpenTriviaQuestion {
  correct_answer: string
  incorrect_answers: string[]
  question: string
}

interface QuestionDataRaw {
  answer: number
  choices: string[]
  question: string
}

interface QuestionData {
  answerIndex: number
  choices: string[]
  question: string
}

interface QuestionProps {
  onSelect(answer: number):void
  questionData: QuestionData
  selectedChoiceIndex: number
}

interface QuizState {
  currentQuestionIndex: number
  questionsData: QuestionData[]
  selectedChoiceIndeces: number[]
  status: number
}

interface ResultsProps {
  onReset():void
  questionsData: QuestionData[]
  selectedChoiceIndeces: number[]
  status: number
}

interface SafariTouchEvent extends TouchEvent {
  scale: number
}

interface WelcomeProps {
  onReady():void
}
