import {h} from 'preact'

export function Welcome({onButtonClick}:WelcomeProps):JSX.Element
{
  return (
    <div class='welcome'>
      <div class='welcome__heading'>Welcome.</div>
      <div class='welcome__question'>Ready to take the quiz?</div>
      <div {...{class:'welcome__button', onClick:onButtonClick}}>Go!</div>
    </div>
  )
}
