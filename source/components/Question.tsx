import {Component, h} from 'preact'
import {Answer} from './Answer'

export class Question extends Component<QuestionProps, {}>
{
  public render({onSelect, questionData:{answerIndex, options, question}, selectedOptionIndex}:QuestionProps):JSX.Element
  {
    const answerText:string = options[answerIndex]

    if (selectedOptionIndex !== undefined && selectedOptionIndex > -1)
      return (
        <div class='question answered'>
          <div class='question__text'>{question}</div>
          {selectedOptionIndex !== answerIndex && <div class='question__answer question__answer--incorrect'>{options[selectedOptionIndex]}</div>}
          <div class='question__answer question__answer--correct'>{answerText}</div>
        </div>
      )

    return (
      <div class='question'>
        <div class='question__text'>{question}</div>
        {options.map((option:string, index:number):JSX.Element => <Answer {...{text:option, onClick:():void => this.handleSelect(index)}} />)}
      </div>
    )
  }

  private handleSelect = (selectedOptionIndex:number):void =>
  {
    this.props.onSelect(selectedOptionIndex)

    this.setState({selectedOptionIndex})
  }
}
