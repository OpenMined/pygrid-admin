import React, {forwardRef} from 'react'
import cn from 'classnames'
import {Search} from '@/components/icons/search'
import {CloseCircle} from './icons/marks'
import type {ReactNode, FunctionComponent, PropsWithChildren, HTMLAttributes, ComponentPropsWithoutRef} from 'react'

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
        <Search className="w-4 h-4 m-auto fill-current" />
      </div>
      <input
        name="search"
        placeholder={placeholder}
        className="flex-1 h-12 px-5 text-xl bg-transparent rounded-full focus:outline-none"
        onChange={e => onChange(e.target.value)}
        value={search}
      />
    </div>
  )
}

export const Alert: FunctionComponent<{
  className?: string
  error: string
  description: string
}> = ({className, error, description}) => (
  <div className={cn('p-4 rounded-md bg-red-50', className)}>
    <div className="flex">
      <div className="flex-shrink-0">
        <CloseCircle className="w-5 h-5 text-red-500" />
      </div>
      <div className="ml-3">
        <h3 className="text-sm font-medium text-red-800">{error}</h3>
        {description && <div className="mt-2 text-sm text-red-700">{description}</div>}
      </div>
    </div>
  </div>
)

interface NormalInput {
  pre?: string
  type?: string
  label?: string
  hint?: string
  error?: string
  id: string
  className?: string
  placeholder?: string
  container?: string
}

function WrapComponent({container = '', id, label, hint, error, children}: PropsWithChildren<NormalInput>) {
  return (
    <div className={cn(container)}>
      {label && (
        <label htmlFor={id} className="block ml-1 text-sm font-medium text-gray-700 capitalize">
          {label}
        </label>
      )}
      {children}
      {hint && <p className="mt-1 ml-1 text-xs text-gray-400">{hint}</p>}
      {error && <p className="mt-1 ml-1 text-xs text-red-800">{error}</p>}
    </div>
  )
}

export const TextArea = forwardRef<HTMLTextAreaElement, NormalInput & ComponentPropsWithoutRef<'textarea'>>(
  function InputField(props, ref) {
    return (
      <WrapComponent {...props}>
        <textarea
          {...props}
          ref={ref}
          className={cn(
            'block w-full py-1.5 sm:py-2 border-gray-300 rounded-md shadow-sm sm:text-sm placeholder-gray-400',
            props.error ? 'focus:ring-red-500 focus:border-red-500' : 'focus:ring-indigo-500 focus:border-indigo-500',
            props.className
          )}
        />
      </WrapComponent>
    )
  }
)
function PreInput({children}: {children: ReactNode}) {
  return (
    <div className="inline-block mt-auto">
      <div className="border border-gray-300 bg-blueGray-200 border-r-0 rounded-l-md py-2 px-3 shadow-sm text-sm flex items-center px-2 text-gray-500">
        {children}
      </div>
    </div>
  )
}

export const Input = forwardRef<HTMLInputElement, NormalInput & ComponentPropsWithoutRef<'input'>>(function InputField(
  props,
  ref
) {
  return (
    <WrapComponent {...props}>
      <div className="flex">
        {props.pre && <PreInput>{props.pre}</PreInput>}
        <input
          {...props}
          type={props.type ?? 'text'}
          ref={ref}
          className={cn(
            'block py-1.5 sm:py-2 w-full border-gray-300 rounded-md shadow-sm sm:text-sm placeholder-gray-400',
            props.error ? 'focus:ring-red-500 focus:border-red-500' : 'focus:ring-indigo-500 focus:border-indigo-500',
            props.className
          )}
        />
      </div>
    </WrapComponent>
  )
})

interface SelectInput extends NormalInput {
  options: {value: string | number; label: string}[]
  defaultValue?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectInput & ComponentPropsWithoutRef<'select'>>(
  function SelectField(props, ref) {
    const {placeholder, options, ...selectProps} = props
    return (
      <WrapComponent {...props}>
        <select
          defaultValue={props.value ? undefined : ''}
          {...selectProps}
          ref={ref}
          placeholder="kakakaka"
          className="block w-full py-1.5 sm:py-2 pl-3 pr-10 mt-1 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md invalid:text-gray-400 placeholder-gray-50">
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          {options.map(({value, label}) => (
            <option key={`option-${value}`} value={value}>
              {label}
            </option>
          ))}
        </select>
      </WrapComponent>
    )
  }
)

function SectionHeaderRoot({children}) {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between">
      <header>{children}</header>
    </div>
  )
}

function SectionHeaderTitle({children}) {
  return <h1>{children}</h1>
}

function SectionHeaderDescription({children}) {
  return <p className="subtitle">{children}</p>
}

export const SectionHeader = Object.assign(SectionHeaderRoot, {
  Title: SectionHeaderTitle,
  Description: SectionHeaderDescription
})
