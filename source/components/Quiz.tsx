import {Component, h} from 'preact'
import {Header} from './Header'
import {Progress} from './Progress'
import {Question} from './Question'
import {Results} from './Results'
import {Welcome} from './Welcome'

enum QuizStatus {
  Inactive,
  Active,
  Complete
}

export class Quiz extends Component<{}, QuizState>
{
  public state:QuizState = {
    currentQuestionIndex: 0,
    questionsData: [],
    selectedOptionIndeces: [],
    status: QuizStatus.Inactive
  }

  public shouldComponentUpdate({}, {status}:QuizState):boolean
  {
    return status !== QuizStatus.Inactive
  }

  public render({}, {currentQuestionIndex, questionsData, selectedOptionIndeces, status}:QuizState):JSX.Element
  {
    console.log('render')

    if (status === QuizStatus.Inactive)
      return (
        <div class='quiz'>
          <Welcome {...{onReady:this.beginQuiz}} />
        </div>
      )

    const questionCount:number = questionsData.length
    const questionComponents:JSX.Element[] = []
    let index:number = 0

    while (index <= currentQuestionIndex)
    {
      const questionData:QuestionData|undefined = questionsData[index]
      let questionComponent:JSX.Element|undefined

      if (questionData)
        questionComponent = <Question {...{key: `question-${index}`, questionData, onSelect:this.handleAnswerToCurrentQuestion, selectedOptionIndex:selectedOptionIndeces[index]}} />

      if (questionComponent)
        questionComponents.push(questionComponent)

      index++
    }

    return (
      <div class='quiz active'>
        <Header />
        <main class='quiz__contents'>
          <div class='quiz__questions'>
            {questionComponents}
          </div>
        </main>
        {currentQuestionIndex < questionCount && <Progress {...{currentQuestionIndex, questionCount}} />}
        {currentQuestionIndex >= questionCount  && <Results {...{
          questionCount,
          correctCount:selectedOptionIndeces.reduce((value:number, selectedOptionIndex:number, index:number):number => selectedOptionIndex === questionsData[index].answerIndex ? ++value : value, 0),
          onResetButtonClick:this.reset
        }} />}
      </div>
    )
  }

  public componentDidMount():void
  {
    this.confirmQuestionDataLoaded()
  }

  private beginQuiz = ():void =>
  {
    this.confirmQuestionDataLoaded().then(():void => this.setState({status:QuizStatus.Active}))
  }

  private handleAnswerToCurrentQuestion = (selectedOptionIndex:number):void =>
  {
    const {currentQuestionIndex, questionsData}:QuizState = this.state
    const selectedOptionIndeces:number[] = this.state.selectedOptionIndeces.concat()
    const nextQuestionIndex:number = currentQuestionIndex + 1

    selectedOptionIndeces[currentQuestionIndex] = selectedOptionIndex

    this.setState({selectedOptionIndeces, currentQuestionIndex:nextQuestionIndex, status:nextQuestionIndex < questionsData.length ? QuizStatus.Active : QuizStatus.Complete})
  }

  private confirmQuestionDataLoaded():Promise<void>
  {
    if (this.state.questionsData.length > 0)
      return Promise.resolve()

    return fetch(`/questions.json`)
      .then((response:Response):{} => response.json())
      .then(({data}:{data:QuestionDataRaw[]}):QuestionDataRaw[] => data)
      .then((questionsDataRaw:QuestionDataRaw[]):void =>
        this.setState({questionsData:questionsDataRaw.map((questionDataRaw:QuestionDataRaw):QuestionData =>
        {
          const {answer, options, question}:QuestionDataRaw = questionDataRaw

          return {options, question, answerIndex:answer - 1}
        })})
      )
  }

  private reset = ():void =>
  {
    this.setState({currentQuestionIndex:0, selectedOptionIndeces:[]})
  }
}
