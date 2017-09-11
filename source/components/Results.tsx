import {h} from 'preact'
import {QuizStatus} from '../shared/QuizStatus'
import {ResetIcon} from './ResetIcon'
import {StarIcon} from './StarIcon'

export function Results({onReset, questionsData, selectedChoiceIndeces, status}:ResultsProps):JSX.Element
{
  const stars:JSX.Element[] = []

  for (let i:number = 0; i < questionsData.length; i++)
    stars.push(<StarIcon {...{
      classes: `results__star${selectedChoiceIndeces[i] !== undefined ? ` results__star--${selectedChoiceIndeces[i] !== questionsData[i].answerIndex ? 'in' : ''}correct` : ''}`,
      pathClasses: `results__star-path`
    }} />)

  return (
    <div class={`results${status === QuizStatus.Complete ? ' results--complete' : ''}`}>
      <div class='results__stars'>
        {stars}
      </div>
      {status === QuizStatus.Complete && (
        <div class='results__details'>
          You got {
            selectedChoiceIndeces.reduce((count:number, selectedChoiceIndex:number, index:number):number => selectedChoiceIndex === questionsData[index].answerIndex ? count + 1 : count, 0)
          } out of {
            questionsData.length
          } questions correct.</div>
      )}
      {status === QuizStatus.Complete &&
        <div {...{class:'results__reset-button', onClick:onReset}}><ResetIcon {...{classes:'results__reset-icon'}} /> Try again?</div>
      }
    </div>
  )
}
