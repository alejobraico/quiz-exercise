import {h} from 'preact'

interface AnswerProps {
  onClick: () => void
  text: string
}

export function Answer({onClick, text}:AnswerProps):JSX.Element
{
  return <div {...{class:'answer', onClick}}>{text}</div>
}
