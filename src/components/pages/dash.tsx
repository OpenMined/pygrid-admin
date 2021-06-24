import {useMemo} from 'react'
import cn from 'classnames'
import Link from 'next/link'
import {dateFromNow, entityColors} from '@/utils'
import {Badge} from '@/components'
import {Spinner} from '@/components/icons/spinner'
import type {Tensor, Dataset, Model} from '@/types/grid-types'

function prepareTensorsForAssetList(tensor: Tensor) {
  return {
    title: tensor.name,
    id: tensor.id,
    description: tensor.description ?? tensor.tags ?? '',
    type: 'tensor',
    createdAt: ''
  }
}

function prepareDatasetForAssetList(dataset: Dataset) {
  return {
    title: dataset.name,
    description: dataset.description,
    id: dataset.id,
    createdAt: dateFromNow(dataset.createdAt),
    type: 'dataset'
  }
}

function prepareModelForAssetList(model: Model) {
  return {
    title: model.name,
    description: model.description,
    id: model.id,
    createdAt: dateFromNow(model.createAt),
    type: 'model'
  }
}

function AssetListItem({title, description, createdAt, type, id}) {
  return (
    <li key={id} className="col-span-full px-4 py-4 cursor-pointer hover:bg-gray-100">
      <div className="flex items-center justify-between space-x-4">
        <div className="flex items-center space-x-2">
          <span className="">{title || `Unknown ${type}`}</span>
          <Badge bgColor={entityColors[type]}>{type}</Badge>
        </div>
        <span className="text-sm text-gray-500">{createdAt}</span>
      </div>
      <div className="text-sm text-gray-500 overflow-ellipsis line-clamp-3 mt-1">{description}</div>
      <span className="text-xs text-gray-400">{id}</span>
    </li>
  )
}

export interface AssetList {
  datasets: Dataset[]
  models: Model[]
  tensors: Tensor[]
}

export function LatestAssetsList({datasets, models, tensors}) {
  const assets = useMemo(
    () => [
      ...datasets.map(prepareDatasetForAssetList),
      ...models.map(prepareModelForAssetList),
      ...tensors.map(prepareTensorsForAssetList)
    ],
    [datasets, models, tensors]
  )
  return <ul className="grid grid-cols-1 md:grid-cols-8 divide-y divide-gray-300">{assets.map(AssetListItem)}</ul>
}

export interface Card {
  link: string
  bgColor: string
  icon: React.ElementType
  main: string
  value: string | number
}

export function MiniCard({link, bgColor, icon: Icon, main, value}: Card) {
  return (
    <li key={link} className={`relative col-span-1 flex shadow-sm rounded-md hover:ring-2 hover:ring-${bgColor}-500`}>
      <div
        className={cn(
          bgColor ? `bg-${bgColor}-600` : 'bg-cyan-600',
          'flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md'
        )}>
        {Icon && <Icon className="text-white h-8 w-8" aria-hidden />}
      </div>
      <div className="flex-1 flex justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
        <div className="flex-1 px-4 py-2 text-sm truncate">
          <Link href={link}>
            <a className="text-gray-500 hover:text-gray-800">
              <span className="absolute inset-0" aria-hidden="true" />
              {main}
            </a>
          </Link>
          <p className="text-2xl font-semibold text-gray-900 truncate">
            {typeof value !== 'undefined' ? value : <Spinner className="w-3 h-3" />}
          </p>
        </div>
      </div>
    </li>
  )
}

export function DashboardCards({cards}: {cards: Card[]}) {
  return <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">{cards.map(MiniCard)}</ul>
}
