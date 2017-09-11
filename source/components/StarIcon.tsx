import {h} from 'preact'

export function StarIcon({classes, pathClasses}:IconProps):JSX.Element
{
  return (
    <svg class={classes} viewBox='0 0 51 48'>
      <path class={pathClasses} d='M25 1l6 17h18L35 29l5 17-15-10-15 10 5-17L1 18h18z' />
    </svg>
  )
}
