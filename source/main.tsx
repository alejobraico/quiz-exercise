import {h, render} from 'preact'
import {Quiz} from './components/Quiz'

document.addEventListener('touchmove', (event:SafariTouchEvent):void => event.preventDefault())

render(<Quiz />, document.body, document.querySelector('.quiz')!)
