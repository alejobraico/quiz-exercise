import {h} from 'preact'

export function Answer({onClick, text}:AnswerProps):JSX.Element
{
  return <div {...{class:'answer', onClick}}>{text}</div>
}
