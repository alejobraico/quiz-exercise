import {h} from 'preact'

export function Question({onSelect, questionData:{answerIndex, choices, question}, selectedChoiceIndex}:QuestionProps):JSX.Element
{
  return (
    <div class={`question${selectedChoiceIndex !== undefined ? ' question--answered' : ''}`}>
      <div class='question__text'>{question}</div>
      {choices.map((option:string, index:number):JSX.Element =>
        <div {...{
          class:`question__option question__option--${index}${
            selectedChoiceIndex !== undefined
              ? index === answerIndex
                ? ' question__option--correct'
                : index == selectedChoiceIndex
                  ? ' question__option--incorrect'
                  : ''
              : ''
          }`,
          onClick:():void => onSelect(index)
        }}>{option}</div>
      )}
    </div>
  )
}
