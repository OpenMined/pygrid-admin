import {FunctionComponent, useState} from 'react'
import cn from 'classnames'

interface InputProps {
  value: string
  label: string
  placeholder: string
  hint?: string
  required: boolean
  onChange(value: string): void
}

const Input: FunctionComponent<InputProps> = ({value, label, placeholder, hint, required, onChange}) => {
  const [isValid, setIsValid] = useState(value != '' || !required)

  return (
    <div className="space-y-2">
      <div className="space-x-2 inline-flex items-center">
        <label className="text-lg text-gray-700">{label}</label>
      </div>

      <div className="rounded-md">
        <input
          value={value}
          type="text"
          className={cn(
            'flex-1 block w-full shadow-sm rounded-none rounded-md sm:text-sm border-gray-300',
            isValid ? 'focus:ring-indigo-500 focus:border-indigo-500' : 'focus:ring-red-500 focus:border-red-500'
          )}
          onChange={e => {
            setIsValid(e.target.value != '' || !required)
            onChange(e.target.value)
          }}
          placeholder={placeholder}></input>
      </div>
      {isValid ? (
        hint ? (
          <p className="text-sm ml-1 text-gray-500">{hint}</p>
        ) : null
      ) : (
        <p className="text-sm ml-1 text-red-500">This field is required</p>
      )}
    </div>
  )
}

export {Input}
