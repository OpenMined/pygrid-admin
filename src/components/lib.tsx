import type {FunctionComponent, PropsWithChildren, HTMLAttributes} from 'react'
import cn from 'classnames'

export const Tag: FunctionComponent<PropsWithChildren<{className?: string}>> = ({className, children}) => (
  <div className={cn('px-2 font-light text-xs text-white bg-blue-500 rounded-sm whitespace-nowrap', className)}>
    #{children}
  </div>
)

export const Card: FunctionComponent<PropsWithChildren<{className?: string}>> = ({className, children}) => (
  <div className={cn('w-full p-6 rounded-md shadow-md bg-gray-50', className)}>{children}</div>
)

export const ButtonGhost: FunctionComponent<{className?: string} & HTMLAttributes<HTMLButtonElement>> = ({
  className,
  ...props
}) => <button className={cn('btn', 'text-red-500 bg-white', className)} {...props} />

export const ButtonAsLink: FunctionComponent<{className?: string} & HTMLAttributes<HTMLButtonElement>> = ({
  className,
  ...props
}) => (
  <button
    className={cn('btn', 'h-auto px-0 text-base leading-6 text-blue-400 normal-case bg-transparent', className)}
    {...props}
  />
)

export const ButtonAsIcon: FunctionComponent<{className?: string} & HTMLAttributes<HTMLButtonElement>> = ({
  className,
  ...props
}) => <button className={cn('btn', 'h-auto px-0 bg-transparent focus:outline-none', className)} {...props} />
