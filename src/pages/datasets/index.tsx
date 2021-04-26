import {useState} from 'react'
import Link from 'next/link'
import {useForm} from 'react-hook-form'
import {useDisclosure} from 'react-use-disclosure'
import {useMutation} from 'react-query'
import {VisuallyHidden} from '@reach/visually-hidden'
import api from '@/utils/api-axios'
import {SidePanel} from '@/components/side-panel'
import {DatasetCard} from '@/components/pages/datasets/cards/datasets'
import {Right, ArrowForward} from '@/components/icons/arrows'
import {Plus} from '@/components/icons/marks'
import {Alert, Input, SearchBar} from '@/components/lib'
import {useFetch} from '@/utils/query-builder'
import {Spinner} from '@/components/icons/spinner'
import {getToken} from '@/lib/auth'

const Datasets = () => {
  const {open, close, isOpen} = useDisclosure()
  const {isLoading, data: datasets, error} = useFetch('/data-centric/datasets')
  const {isLoading: requestsLoading, data: requests, error: requestsError} = useFetch('/data-centric/requests')
  const {isLoading: tensorsLoading, data: tensors, error: tensorsError} = useFetch('/data-centric/tensors')
  const [searchText, setSearchText] = useState('')
  const {register, handleSubmit} = useForm()

  const createDataset = useMutation(data =>
    api.post('/data-centric/datasets', data, {
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
            <div key={`dataset-${dataset.id}`}>
              <a href={`/datasets/${dataset.id}`}>
                <DatasetCard {...dataset} numberTensors={Object.keys(dataset?.data).length} />
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
    <article>
      <div className="flex flex-col sm:flex-row sm:justify-between">
        <header>
          <h1>Datasets</h1>
          <p className="subtitle">Manage all private data hosted in your node</p>
        </header>
      </div>
      <section className="mt-6">
        <div className="flex flex-row justify-between max-w-xs text-sm text-gray-600 uppercase leading-6 hover:text-gray-800 focus:text-gray-800 active:text-gray-800">
          <Link href="/datasets/requests">
            <a>
              {requestsLoading ? <Spinner className="h-3 mr-4" /> : requests?.length} Request
              {requests?.length !== 1 && 's'}
              <Right className="w-4 h-4" />
            </a>
          </Link>
          <Link href="/datasets/tensors">
            <a>
              {tensorsLoading ? <Spinner className="h-3 mr-4" /> : tensors?.tensors.length} Tensor
              {tensors?.tensors.length !== 1 && 's'}
              <Right className="w-4 h-4" />
            </a>
          </Link>
        </div>
        {(!requestsLoading || !tensorsLoading) && (requestsError || tensorsError) && (
          <Alert
            className="mt-4"
            error="Unable to fetch groups or roles data"
            description={(requestsError?.message || tensorsError?.message) ?? 'Check your connection status'}
          />
        )}
      </section>
      <section className="mt-6 overflow-hidden bg-white shadow sm:rounded-md">
        <header>
          <div className="flex items-center justify-between px-4 py-4 text-xs font-medium tracking-wider text-gray-500 uppercase bg-gray-100 border-b border-gray-200 sm:px-6">
            <div className="flex flex-col sm:flex-row">
              <h2 className="flex-shrink-0 mr-2">Available datasets</h2>
              <div className="flex-shrink-0">
                {datasets?.length > 0 && (
                  <p>
                    ({datasets.length} user{datasets.length !== 1 && 's'})
                  </p>
                )}
                {isLoading && <Spinner className="w-4" />}
              </div>
            </div>
            <div className="text-right">
              <button className="btn" onClick={open}>
                <span className="hidden sm:inline-block">Create Dataset</span>
                <span className="sm:hidden">Create</span>
              </button>
            </div>
          </div>
        </header>
        <ul className="divide-y divide-gray-200">
          {datasets?.map(dataset => (
            // <UserListItem
            //   key={user.email}
            //   email={user.email}
            //   userRole={roles?.find(role => role.id === user.role)?.name}
            //   onClick={() => setUser(user)}
            // />
            <div />
          ))}
        </ul>
      </section>
      {!isLoading && error && (
        <div className="mt-4">
          <VisuallyHidden>An error occurred.</VisuallyHidden>
          <Alert
            error="It was not possible to get the user list. Please check if the Domain API is reachable."
            description={error.message ?? 'Check your connection status'}
          />
        </div>
      )}
      <p className="pb-4 mb-6 text-xl font-light text-gray-400"></p>
      {datasets?.length > 0 && (
        <>
          <section className="space-y-6">
            <DatasetsList
              datasets={datasets.filter(item => item.id?.toLowerCase().includes(searchText.toLowerCase()))}
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
    </article>
  )
}

export default Datasets
