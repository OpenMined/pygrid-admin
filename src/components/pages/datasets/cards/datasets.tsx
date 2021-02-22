import type {FunctionComponent} from 'react'
import {Card} from '@/components/lib'

interface IDatasetCard {
  title: string
  description: string
  tags: Array<string>
  tensors: number
}

const DatasetCard: FunctionComponent<IDatasetCard> = ({title, description, tags, tensors}) => (
  <Card className="space-y-2 cursor-pointer">
    <h2 className="text-xl text-gray-800 text-semibold">{title}</h2>
    <p className="max-w-lg font-light text-gray-400 xl:max-w-5xl line-clamp-2">{description}</p>
    <div className="flex flex-col justify-between text-sm text-gray-600 md:flex-row">
      <small>{tags.map(tag => `#${tag} `)}</small>
      <small>
        {tensors} tensor{tensors !== 1 && 's'}
      </small>
    </div>
  </Card>
)

export {DatasetCard}
