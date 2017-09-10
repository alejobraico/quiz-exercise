import {Component, h} from 'preact'
import {Header} from './Header'
import {Question} from './Question'
import {Results} from './Results'
import {Welcome} from './Welcome'

const OPEN_TRIVIA_API_URL:string = 'https://opentdb.com/api.php?amount=3&type=multiple'

export enum QuizStatus {
  Inactive,
  Active,
  Complete
}

const HtmlEntities:{[key:string]:string} = {
  '&quot;': "'",
  '&#039;': '"',
  '&eacute;': 'é',
  '&amp;': '&',
  '&Uuml;': "Ü"
}

function decodeSpecialCharacters(value:string):string
{
  Object.keys(HtmlEntities).forEach((key:string):void =>
  {
    if (value.includes(key))
      value = value.replace(new RegExp(key, 'g'), HtmlEntities[key])
  })

  return value
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
      <div class='quiz quiz--active'>
        <Header />
        <Results {...{questionsData, selectedChoiceIndeces, status, onReset:this.reset}} />
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

    return fetch(OPEN_TRIVIA_API_URL)
      .then((response:Response):{} => response.json())
      .then((data:{results:OpenTriviaQuestion[]}):void =>
        this.setState({questionsData:data.results.map(({correct_answer, incorrect_answers, question}:OpenTriviaQuestion):QuestionData =>
        {
          const answerCount:number = incorrect_answers.length + 1
          const answerIndex:number = Math.floor(Math.random() * answerCount)
          const choices:string[] = []

          for (let i:number = 0; i < answerCount; i++)
            choices.push(i === answerIndex ? decodeSpecialCharacters(correct_answer) : decodeSpecialCharacters(incorrect_answers.pop()!))

          return {answerIndex, choices, question: decodeSpecialCharacters(question)}
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
