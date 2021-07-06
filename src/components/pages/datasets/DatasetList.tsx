import Link from 'next/link'
import {dateFromNow} from '@/utils'
import type {Dataset} from '@/types/grid-types'

export function DatasetList({datasets}: {datasets: Dataset[]}) {
  return (
    <ul className="grid grid-cols-1 divide-y divide-gray-200 border border-gray-200 rounded-lg">
      {datasets.map(DatasetListItem)}
    </ul>
  )
}

function DatasetListItem(dataset: Dataset) {
  return (
    <Link key={dataset.id} href={`/datasets3?d=${dataset.id}`}>
      <a>
        <li className="px-4 py-5 cursor-pointer hover:bg-sky-100">
          <div className="flex items-center justify-between truncate space-x-6">
            <p className="font-medium truncate">{dataset.name || 'Unnamed dataset'}</p>
            <div className="text-sm text-gray-500">{dateFromNow(dataset.createdAt)}</div>
          </div>
          <p className="text-sm text-gray-600">{dataset.data?.length} tensors</p>
          <p className="text-xs text-gray-500">{dataset.id}</p>
          <div className="text-sm text-gray-700">
            <p className="mt-4 overflow-ellipsis line-clamp-3 pr-12 text-sm text-gray-700">{dataset.description}</p>
            <p className="mt-2">{dataset.tags?.join(', ')}</p>
          </div>
        </li>
      </a>
    </Link>
  )
}
