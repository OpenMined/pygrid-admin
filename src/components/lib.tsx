import {FunctionComponent, PropsWithChildren} from 'react'
import cn from 'classnames'

export const Tag: FunctionComponent<PropsWithChildren<{className?: string}>> = ({className, children}) => (
  <div className={cn('px-2 font-light text-xs text-white bg-blue-500 rounded-sm whitespace-nowrap', className)}>
    #{children}
  </div>
)
