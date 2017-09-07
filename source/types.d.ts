interface AnswerProps {
  onClick: () => void
  text: string
}

interface ProgressProps {
  currentQuestionIndex: number
  questionCount: number
}

interface QuestionDataRaw {
  answer: number
  options: string[]
  question: string
}

interface QuestionData {
  answerIndex: number
  options: string[]
  question: string
}

interface QuestionProps {
  onSelect: (answer: number) => void
  questionData: QuestionData
  selectedOptionIndex?: number
}

interface QuizState {
  currentQuestionIndex: number
  questionsData: QuestionData[]
  selectedOptionIndeces: number[]
  status: number
}

interface ResultsProps {
  correctCount: number
  questionCount: number
  onResetButtonClick: () => void
}

interface WelcomeProps {
  onReady: () => void
}
