import {Component, h} from 'preact'
import {Header} from './Header'
import {Progress} from './Progress'
import {Question} from './Question'
import {QuestionResult} from './QuestionResult'
import {Results} from './Results'
import {QuestionData} from '../main'

interface QuizProps {
  questionCount: number
  questionsData: QuestionData[]
}

interface QuizState {
  complete: boolean
  currentQuestion: number
  questionsData: QuestionData[]
  answers: number[]
}

export class Quiz extends Component<QuizProps, QuizState>
{
  public state:QuizState = {
    complete: false,
    currentQuestion: 1,
    questionsData: [],
    answers: []
  }

  public componentWillMount():void
  {
    if (this.props.questionsData.length > 0)
      this.setState({questionsData:this.props.questionsData})
  }

  public render({questionCount}:QuizProps, {answers, complete, currentQuestion, questionsData}:QuizState):JSX.Element
  {
    const questionData:QuestionData|undefined = !complete && questionsData.length >= currentQuestion ? questionsData[currentQuestion - 1] : undefined

    return (
      <div class='quiz'>
        <Header />
        <main class='quiz__contents'>
          <div class='quiz__questions'>
            {answers.length > 0 && answers.map((answer:number, index:number):JSX.Element =>
            {
              const data:QuestionData = questionsData[index]
              const {correct, question}:QuestionData = data
              const incorrectAnswer:string|undefined = answer !== correct ? data.answers[answer - 1] : undefined

              return <QuestionResult {...{key:`result-${index}`, incorrectAnswer, question, answer:data.answers[data.correct - 1]}} />
            })}
            {questionData && <Question {...{key: `question-${currentQuestion}`, questionData, onAnswerSelect:this.handleAnswerToCurrentQuestion}} />}
          </div>
        </main>
        {!complete && <Progress {...{currentQuestion, questionCount}} />}
        {complete && <Results {...{
          questionCount,
          correctCount:answers.reduce((value:number, answer:number, index:number):number => answer === questionsData[index].correct ? ++value : value, 0),
          onResetButtonClick:this.reset
        }} />}
      </div>
    )
  }

  public componentDidMount():void
  {
    if (this.state.currentQuestion > this.state.questionsData.length)
      this.loadCurrentQuestionData()
  }

  public componentDidUpdate():void
  {
    if (this.state.currentQuestion > this.state.questionsData.length)
      this.loadCurrentQuestionData()
  }

  private loadCurrentQuestionData():void
  {
    fetch(`/question-${this.state.currentQuestion}.json`)
      .then(response => response.json())
      .then((questionData:QuestionData):void =>
      {
        const questionsData = this.state.questionsData.concat()

        questionsData[this.state.currentQuestion - 1] = questionData

        this.setState({questionsData})
      })
  }

  private handleAnswerToCurrentQuestion = (answer:number):void =>
  {
    const {questionCount}:QuizProps = this.props
    const {currentQuestion}:QuizState = this.state
    const answers:number[] = this.state.answers.concat()

    answers[currentQuestion - 1] = answer

    if (currentQuestion < questionCount)
      this.setState({answers, currentQuestion:currentQuestion + 1})

    else
      this.setState({answers, complete:true})
  }

  private reset = ():void =>
  {
    this.setState({answers:[], complete:false, currentQuestion:1})
  }
}
