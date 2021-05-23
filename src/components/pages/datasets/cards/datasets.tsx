import type {FunctionComponent} from 'react'
import {Card} from '@/components/lib'
import {PyGridDataset} from '@/types/datasets'

interface IDatasetCard extends PyGridDataset {
  numberTensors: number
}

const DatasetCard: FunctionComponent<IDatasetCard> = ({id, description, tags, numberTensors}) => (
  <Card className="space-y-2 cursor-pointer">
    <h2 className="text-xl text-gray-800 truncate text-semibold">{id}</h2>
    <p className="mr-4 font-light text-gray-400 line-clamp-2">{description}</p>
    <div className="flex flex-col justify-between text-sm text-gray-600 md:flex-row">
      <small>{tags.map(tag => `${tag} `)}</small>
      <small>
        {numberTensors} tensor{numberTensors !== 1 && 's'}
      </small>
    </div>
  </Card>
)

export {DatasetCard}
