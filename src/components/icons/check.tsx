import type {FunctionComponent} from 'react'
import cn from 'classnames'

const Check: FunctionComponent<{className?: string}> = ({className}) => {
  return (
    <svg
      className={cn('inline h-full', className)}
      aria-hidden="true"
      focusable="false"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24">
      <path fill="currentColor" d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
    </svg>
  )
}

export {Check}
