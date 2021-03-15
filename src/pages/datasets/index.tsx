import {FunctionComponent, useState} from 'react'
import {useQuery} from 'react-query'
import {DatasetCard} from '@/components/pages/datasets/cards/datasets'
import {ArrowForward} from '@/components/icons/arrows'
import {fetchDatasets, fetchRequests} from '@/pages/api/datasets'
import type {IDataset, IRequest} from '@/types/datasets'
import {Plus} from '@/components/icons/plus'
import {SearchBar} from '@/components/forms/searchbar'
import Link from 'next/link'

const Datasets: FunctionComponent = () => {
  const {isLoading, data: datasetsData, error} = useQuery<IDataset[], Error>('datasets', fetchDatasets)
  const {data: requests} = useQuery<IRequest[], Error>('requests', fetchRequests)
  const [searchText, setSearchText] = useState('')

  const sections = [
    {
      title: 'Permissions changes',
      value: requests
        ? requests.filter(x => {
            return x.requestType === 'permissions' && x.status === 'pending'
          }).length
        : 0,
      text: 'requests',
      link: '/datasets/requests'
    },
    {title: 'Tensors pending deletion', value: 3, text: 'tensors', link: '/datasets/tensors'}
  ]

  const datasets = [
    {
      name: 'Diabetes Study 01.289.301',
      description:
        'This was a double-blind diabetes study done in coordination with UC Santa Barbara between July 1st, 2017 and January 1st, 2019.',
      tags: ['diabetes', 'california', 'healthcare', 'UCSF', 'beekeeper'],
      tensors: 2
    },
    {
      name: 'Dementia MRI Scans (10k)',
      description:
        'Performed a database dump of exactly 10,000 patient records from our EMR. All patients were diagnosed with dementia within 10 years of the MRIs.',
      tags: ['dementia', 'mri', 'healthcare', 'UCSF'],
      tensors: 6
    },
    {
      name: 'Diabetes Study 01.289.301',
      description:
        'This was a double-blind diabetes study done in coordination with UC Santa Barbara between July 1st, 2017 and January 1st, 2019.',
      tags: ['diabetes', 'california', 'healthcare', 'UCSF', 'beekeeper'],
      tensors: 2
    },
    {
      name: 'Dementia MRI Scans (10k)',
      description:
        'Performed a database dump of exactly 10,000 patient records from our EMR. All patients were diagnosed with dementia within 10 years of the MRIs.',
      tags: ['dementia', 'mri', 'healthcare', 'UCSF'],
      tensors: 6
    }
  ]

  const DatasetsList = ({datasets}) => {
    return (
      <>
        {datasets.length > 0 ? (
          <>
            {datasets.map(dataset => (
              <div key={`dataset-${dataset.title}`}>
                <a href={`/datasets/${dataset.title}`}>
                  <DatasetCard {...dataset} />
                </a>
              </div>
            ))}
          </>
        ) : (
          <div>No matches found.</div>
        )}
      </>
    )
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
          <Plus className="h-4 w-4" />
          <span>New dataset</span>
        </button>
      </div>
      <p className="pb-4 mb-6 text-xl font-light text-gray-400">Manage all private data hosted in your node</p>
      {!isLoading && !error && (
        <>
          <Stats />
          <SearchBar placeholder={'Search Datasets'} search={searchText} onChange={text => setSearchText(text)} />
          <section className="space-y-6">
            <DatasetsList
              datasets={datasetsData.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()))}
            />
          </section>
        </>
      )}
    </main>
  )
}

export default Datasets
