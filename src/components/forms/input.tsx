import {FunctionComponent, useState} from 'react'
import cn from 'classnames'

interface InputProps {
  value: string
  label: string
  placeholder: string
  hint?: string
  onChange: (value: any) => void
}

const Input: FunctionComponent<InputProps> = ({value, label, placeholder, hint, onChange}) => {
  return (
    <div className="space-y-2">
      <div className="inline-block space-x-2">
        <label className="text-lg text-gray-700">{label}</label>
      </div>

      <div className="rounded-md">
        <input
          value={value}
          type="text"
          className={cn(
            'flex-1 block w-full shadow-sm rounded-none rounded-md sm:text-sm border-gray-300',
            'focus:ring-indigo-500 focus:border-indigo-500 '
          )}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}></input>
      </div>
      {hint ? <p className="text-sm ml-1 text-gray-500">{hint}</p> : null}
    </div>
  )
}

export {Input}
