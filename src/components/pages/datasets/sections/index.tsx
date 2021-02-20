import {FunctionComponent} from 'react'
import {ArrowForward} from '@/components/icons/arrows'

const Section: FunctionComponent<{title: string; value: string | number; text: string}> = ({title, value, text}) => (
  <div>
    <small className="font-semibold tracking-wide text-gray-800 uppercase">{title}</small>
    <p className="my-3">
      <span className="text-xl font-semibold text-gray-800">{value}</span> <span className="text-gray-400">{text}</span>{' '}
      <ArrowForward className="w-4 h-4 text-blue-600" />
    </p>
  </div>
)

export {Section}
