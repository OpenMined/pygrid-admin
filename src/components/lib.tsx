import type {FunctionComponent, PropsWithChildren, HTMLAttributes} from 'react'
import {Search} from '@/components/icons/search'
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
}) => <button className={cn('btn h-auto px-0 bg-transparent focus:outline-none', className)} {...props} />

export const ButtonRound: FunctionComponent<{className?: string} & HTMLAttributes<HTMLButtonElement>> = ({
  className,
  ...props
}) => <button className={cn('btn', 'rounded-md', className)} {...props} />

interface SearchBarProperties {
  search: string
  placeholder: string
  onChange: (text: string) => void
}

export const SearchBar: FunctionComponent<SearchBarProperties> = ({search, placeholder, onChange}) => {
  return (
    <div className="flex text-gray-800 bg-gray-50 container mx-auto border border-gray-200 rounded-md">
      <div className="flex">
        <Search className="m-auto h-4 w-4 fill-current" />
      </div>
      <input
        name="search"
        placeholder={placeholder}
        className="text-xl flex-1 bg-transparent h-12 px-5 rounded-full focus:outline-none"
        onChange={e => onChange(e.target.value)}
        value={search}
      />
    </div>
  )
}
