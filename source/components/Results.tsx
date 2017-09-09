import {h} from 'preact'
import {ResetIcon} from './ResetIcon'
import {StarIcon} from './StarIcon'
import {QuizStatus} from './Quiz'

export function Results({onReset, questionsData, selectedChoiceIndeces, status}:ResultsProps):JSX.Element
{
  const stars:JSX.Element[] = []

  for (let i = 0; i < questionsData.length; i++)
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
            selectedChoiceIndeces.reduce((c:number, selectedChoiceIndex:number, index:number):number => selectedChoiceIndex === questionsData[index].answerIndex ? ++c : c, 0)
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
