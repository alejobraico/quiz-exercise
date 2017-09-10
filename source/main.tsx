import {h, render} from 'preact'
import {Quiz} from './components/Quiz'

interface IOSSafariTouchEvent extends TouchEvent {
  scale: number
}

document.addEventListener('touchmove', (event:IOSSafariTouchEvent):void => event.preventDefault())

render(<Quiz />, document.body, document.querySelector('.quiz')!)
