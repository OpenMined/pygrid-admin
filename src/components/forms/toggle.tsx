/* eslint-disable jsx-a11y/label-has-associated-control */
import {FunctionComponent} from 'react'
import {CheckMark, XMark} from '../icons/marks'

interface InputProps {
  value: boolean
  label: string
  hint?: string
  onChange(value: boolean): void
}

const Toggle: FunctionComponent<InputProps> = ({value, label, hint, onChange}) => {
  return (
    <div className="space-x-6">
      <div className="inline-block">
        <label className="block text-lg text-gray-700">{label}</label>
        {hint ? <p className="text-sm text-gray-500">{hint}</p> : null}
      </div>
      <div className="inline-block">
        <label className="cursor-pointer">
          <div className="relative">
            <input type="checkbox" className="hidden" checked={value} onChange={e => onChange(e.target.checked)} />
            <div className="toggle-line w-16 h-6 bg-gray-200 rounded-full shadow-inner border border-gray-400"></div>
            <div className="toggle-dot absolute w-8 h-8 bg-white rounded-full shadow -inset-y-1 left-0 inline-flex items-center">
              {value ? (
                <CheckMark className="w-4 h-4 mx-auto text-green-500" />
              ) : (
                <XMark className="w-4 h-4 mx-auto text-red-500" />
              )}
            </div>
          </div>
          <div className="ml-3 text-gray-700 font-medium"></div>
        </label>
      </div>
    </div>
  )
}

export {Toggle}
