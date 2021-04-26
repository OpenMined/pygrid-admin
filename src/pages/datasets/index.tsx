import {useState} from 'react'
import Link from 'next/link'
import {useDisclosure} from 'react-use-disclosure'
import {SidePanel} from '@/components/side-panel'
import {useForm} from 'react-hook-form'
import {DatasetCard} from '@/components/pages/datasets/cards/datasets'
import {ArrowForward} from '@/components/icons/arrows'
import {Plus} from '@/components/icons/marks'
import {Alert, Input, SearchBar} from '@/components/lib'
import {useFetch} from '@/utils/query-builder'
import {useMutation} from 'react-query'
import {Spinner} from '@/components/icons/spinner'
import axios from 'axios'
import {getToken} from '@/lib/auth'

const Datasets = () => {
  const {open, close, isOpen} = useDisclosure()
  const {data: datasets} = useFetch('/data-centric/datasets')
  const {data: requests} = useFetch('/data-centric/requests')
  const {data: tensors} = useFetch('/data-centric/tensors')
  const [searchText, setSearchText] = useState('')
  const {register, handleSubmit} = useForm()

  const createDataset = useMutation(data =>
    axios.post('/data-centric/datasets', data, {
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      headers: {
        'Content-Type': 'multipart/form-data',
        token: getToken()
      }
    })
  )

  const closePanel = () => {
    close()
    createDataset.reset()
  }

  const sections = [
    {
      title: 'Permissions changes',
      value: requests ? requests.filter(x => x.requestType === 'permissions' && x.status === 'pending').length : 0,
      text: 'requests',
      link: '/datasets/requests'
    },
    {title: 'Tensors pending deletion', value: tensors?.tensors.length, text: 'tensors', link: '/datasets/tensors'}
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
        <button className="inline-flex items-center btn hover:bg-blue-600 hover:shadow-sm space-x-6" onClick={open}>
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
              datasets={datasets.filter(item => item.name?.toLowerCase().includes(searchText.toLowerCase()))}
            />
          </section>
        </>
      )}
      <SidePanel isOpen={isOpen} close={closePanel}>
        <article className="p-4 pr-8 space-y-6">
          <section>
            <header>
              <h3 className="text-2xl font-medium text-gray-900 leading-6">Create a new Dataset</h3>
              <p className="mt-2 text-sm text-gray-500">Upload a new dataset to this PyGrid Domain.</p>
            </header>
          </section>
          <form onSubmit={handleSubmit(() => {})}>
            <section className="flex flex-col space-y-4">
              <Input name="name" label="Dataset Name" ref={register} placeholder="Name" />
              <Input name="description" label="Description" ref={register} placeholder="Description" type="text" />
              <Input name="manifest" label="Manifest" ref={register} placeholder="Manifest" type="text" />
              <Input name="tags" label="Tags" ref={register} placeholder="Tags" type="text" />
              <div className="w-full sm:text-right">
                <button
                  className="w-full btn lg:w-auto transition-all ease-in-out duration-700"
                  disabled={createDataset.isLoading}>
                  {createDataset.isLoading ? <Spinner className="w-4 text-white" /> : 'Create a new Dataset'}
                </button>
              </div>
              {createDataset.isError && (
                <div>
                  <Alert error="There was an error creating the dataset" description={createDataset.error.message} />
                </div>
              )}
            </section>
          </form>
        </article>
      </SidePanel>
    </main>
  )
}

export default Datasets
