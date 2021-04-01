import {useState} from 'react'
import Link from 'next/link'
import {DatasetCard} from '@/components/pages/datasets/cards/datasets'
import {ArrowForward} from '@/components/icons/arrows'
import {Plus} from '@/components/icons/marks'
import {SearchBar} from '@/components/lib'
import {useFetch} from '@/utils/query-builder'
import type {FunctionComponent} from 'react'

const Datasets: FunctionComponent = () => {
  const {data: datasets} = useFetch('/datasets')
  const {data: requests} = useFetch('/requests')
  const [searchText, setSearchText] = useState('')

  const sections = [
    {
      title: 'Permissions changes',
      value: requests ? requests.filter(x => x.requestType === 'permissions' && x.status === 'pending').length : 0,
      text: 'requests',
      link: '/datasets/requests'
    },
    {title: 'Tensors pending deletion', value: 3, text: 'tensors', link: '/datasets/tensors'}
  ]

  const DatasetsList = ({datasets}) => {
    if (datasets.length > 0) {
      return (
        <>
          {datasets.map(dataset => (
            <div key={`dataset-${dataset.name}`}>
              <a href={`/datasets/${dataset.name}`}>
                <DatasetCard {...dataset} numberTensors={Object.keys(dataset.tensors).length} />
              </a>
            </div>
          ))}
        </>
      )
    } else {
      return <div>No matches found.</div>
    }
  }

  const Stats = () => {
    return (
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {sections.map(({title, value, text, link}) => (
          <div key={`section-${title}`}>
            <small className="font-semibold tracking-wide text-gray-800 uppercase">{title}</small>
            <p className="my-3">
              <span className="text-xl font-semibold text-gray-800">{value}</span>{' '}
              <span className="text-gray-400">{text}</span>
              <Link href={link}>
                <a>
                  <ArrowForward className="w-4 h-4 text-blue-600" />
                </a>
              </Link>
            </p>
          </div>
        ))}
      </section>
    )
  }

  // TODO : Support pagination.
  // TODO : Filter datasets by tags
  return (
    <main className="space-y-4">
      <div className="flex flex-col-reverse items-start space-y-4 space-y-reverse md:space-y-0 md:flex-row md:justify-between">
        <h1 className="pr-4 text-4xl leading-12">Datasets</h1>
        <button
          className="btn hover:bg-blue-600 hover:shadow-sm inline-flex items-center space-x-6"
          onClick={() => alert('Create new dataset')}>
          <Plus className="w-4 h-4" />
          <span>New dataset</span>
        </button>
      </div>
      <p className="pb-4 mb-6 text-xl font-light text-gray-400">Manage all private data hosted in your node</p>
      {datasets?.length > 0 && (
        <>
          <Stats />
          <SearchBar placeholder={'Search Datasets'} search={searchText} onChange={text => setSearchText(text)} />
          <section className="space-y-6">
            <DatasetsList
              datasets={datasets.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()))}
            />
          </section>
        </>
      )}
    </main>
  )
}

export default Datasets
