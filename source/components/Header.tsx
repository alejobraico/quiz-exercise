import {h} from 'preact'
import {Logo} from './Logo'

export function Header():JSX.Element
{
  return (
    <header class='header'>
      <Logo />
    </header>
  )
}
