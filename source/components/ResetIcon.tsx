import {h} from 'preact'

const PATH:string =
`M12.083 1.887c-.795-.794-1.73-1.36-2.727-1.697v2.135c.48.24.935.55 1.334.95 1.993 1.994 1.993 5.236 0 7.23-1.993
1.99-5.233 1.99-7.23 0-1.99-1.996-1.99-5.236 0-7.23.006-.006.022-.016.03-.025l1.182 1.18L4.665.684.923.68 2.1
1.856c-.008.012-.02.024-.028.03C-.69 4.65-.69 9.13 2.072 11.893c2.767 2.765 7.245 2.765 10.01 0 2.762-2.762 2.765-7.243 0-10.005z
`

export function ResetIcon({classes, pathClasses}:IconProps):JSX.Element
{
  return (
    <svg class={classes} viewBox='0 0 14.155 14.155'>
      <path class={pathClasses} d={PATH} />
    </svg>
  )
}
