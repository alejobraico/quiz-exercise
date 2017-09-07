import {Component, h} from 'preact'
import {Header} from './Header'
import {Question} from './Question'
import {Results} from './Results'
import {Welcome} from './Welcome'

export enum QuizStatus {
  Inactive,
  Active,
  Complete
}

export class Quiz extends Component<{}, QuizState>
{
  public state:QuizState = {
    currentQuestionIndex: 0,
    questionsData: [],
    selectedChoiceIndeces: [],
    status: QuizStatus.Inactive
  }

  public shouldComponentUpdate({}, {status}:QuizState):boolean
  {
    return status !== QuizStatus.Inactive
  }

  public render({}, {currentQuestionIndex, questionsData, selectedChoiceIndeces, status}:QuizState):JSX.Element
  {
    if (status === QuizStatus.Inactive)
      return (
        <div class='quiz'>
          <Welcome {...{onReady:this.beginQuiz}} />
        </div>
      )

    const questionData:QuestionData = questionsData[currentQuestionIndex]

    return (
      <div class='quiz active'>
        <Header />
        <main class='quiz__contents'>
          {status === QuizStatus.Active &&
            <Question {...{
              key:`question-${currentQuestionIndex}`,
              questionData,
              onSelect:this.handleAnswerToCurrentQuestion,
              selectedChoiceIndex:selectedChoiceIndeces[currentQuestionIndex]
            }} />
          }
        </main>
        <Results {...{questionsData, selectedChoiceIndeces, status, onReset:this.reset}} />
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
          const {answer, choices, question}:QuestionDataRaw = questionDataRaw

          return {choices, question, answerIndex:answer - 1}
        })})
      )
  }

  private handleAnswerToCurrentQuestion = (selectedChoiceIndex:number):void =>
  {
    const {currentQuestionIndex, questionsData}:QuizState = this.state
    const selectedChoiceIndeces:number[] = this.state.selectedChoiceIndeces.concat()
    const nextQuestionIndex:number = currentQuestionIndex + 1
    const questionElement:Element = document.querySelector('.question')!

    selectedChoiceIndeces[currentQuestionIndex] = selectedChoiceIndex

    if (selectedChoiceIndex !== questionsData[currentQuestionIndex].answerIndex && 'vibrate' in navigator)
      navigator.vibrate(300)

    this.setState({selectedChoiceIndeces})

    questionElement.addEventListener('animationend', (event:AnimationEvent):void =>
    {
      if (event.target === questionElement)
        this.setState({currentQuestionIndex:nextQuestionIndex, status:nextQuestionIndex < questionsData.length ? QuizStatus.Active : QuizStatus.Complete})
    })
  }

  private reset = ():void =>
  {
    this.setState({currentQuestionIndex:0, selectedChoiceIndeces:[], status:QuizStatus.Active})
  }
}
