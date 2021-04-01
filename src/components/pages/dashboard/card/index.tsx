import type {FunctionComponent, ReactElement} from 'react'

interface Item {
  value: number | string
  description: string
  icon?: ReactElement
}

interface CardItems {
  title: string
  main: Item
  items: Array<Item>
}
const Card: FunctionComponent<CardItems> = ({title, main, items}) => (
  <div>
    <small className="font-semibold tracking-wide text-gray-800 uppercase">{title}</small>
    <p className="my-3">
      <span className="text-3xl font-semibold text-gray-800">{main.value}</span>{' '}
      <span className="text-gray-500">{main.description}</span> {main.icon}
    </p>
    <div>
      {items.map(({value, description, icon: Icon}) => (
        <div key={`${title}-${description}`} className="my-1 text-gray-800">
          <strong>{value}</strong> {description} {Icon}
        </div>
      ))}
    </div>
  </div>
)

export {Card}
