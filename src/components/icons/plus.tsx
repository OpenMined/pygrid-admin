import type {FunctionComponent} from 'react'
import cn from 'classnames'

const Plus: FunctionComponent<{className?: string}> = ({className}) => {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={cn('inline', className)}>
      <path fill="currentColor" d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"></path>
    </svg>
  )
}

export {Plus}
