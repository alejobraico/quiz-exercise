import {Component, h} from 'preact'

export class Welcome extends Component<WelcomeProps, {}>
{
  public render({onReady}:WelcomeProps):JSX.Element
  {
    return (
      <div class='welcome'>
        <div class='welcome__contents'>
          <div class='welcome__heading'>Welcome.</div>
          <div class='welcome__question'>Ready to take the quiz?</div>
          <div {...{onClick:this.handleButtonClick, class:'welcome__button'}}>Go!</div>
        </div>
      </div>
    )
  }

  private handleButtonClick = ():void =>
  {
    const button:Element = document.querySelector('.welcome__button')!

    button.classList.add('clicked')

    button.addEventListener('animationend', this.props.onReady)
  }
}
