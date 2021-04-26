import {useState} from 'react'
import cn from 'classNames'
import Link from 'next/link'
import {useForm} from 'react-hook-form'
import {useDisclosure} from 'react-use-disclosure'
import {useQueryClient, useMutation} from 'react-query'
import {VisuallyHidden} from '@reach/visually-hidden'
import api from '@/utils/api-axios'
import {SidePanel} from '@/components/side-panel'
import {DatasetCard} from '@/components/pages/datasets/cards/datasets'
import {Right, ArrowForward} from '@/components/icons/arrows'
import {Alert, Input, SearchBar} from '@/components/lib'
import {useFetch} from '@/utils/query-builder'
import {formatBytes} from '@/utils/common'
import {Spinner} from '@/components/icons/spinner'
import {getToken} from '@/lib/auth'

const Datasets = () => {
  const {open, close, isOpen} = useDisclosure()
  const {isLoading, data: datasets, error} = useFetch('/data-centric/datasets')
  const {isLoading: requestsLoading, data: requests, error: requestsError} = useFetch('/data-centric/requests')
  const {isLoading: tensorsLoading, data: tensors, error: tensorsError} = useFetch('/data-centric/tensors')
  const [searchText, setSearchText] = useState('')
  const {register, handleSubmit, watch} = useForm({mode: 'onBlur'})
  const [loading, setLoading] = useState(false)
  const [createError, setCreateError] = useState(null)
  const queryClient = useQueryClient()

  const datafile = watch('file')

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

  function submit(values) {
    const {file} = values
    const formData = new FormData()
    formData.append('file', file[0])
    setLoading(true)
    api
      .post('/data-centric/datasets', formData, {headers: {'Content-Type': 'multipart/form-data'}})
      .then(() => {
        queryClient.invalidateQueries('/data-centric/datasets')
        close()
      })
      .catch(err => setCreateError(err))
      .finally(() => setLoading(false))
  }

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
              {requestsLoading ? (
                <Spinner className="h-3 mr-4" />
              ) : (
                requests?.filter(r => r.status === 'pending').length
              )}{' '}
              Request
              {requests?.filter(r => r.status === 'pending').length !== 1 && 's'}
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
                    ({datasets.length} Dataset{datasets.length !== 1 && 's'})
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
      </section>
      {!isLoading && error && (
        <div className="mt-4">
          <VisuallyHidden>An error occurred.</VisuallyHidden>
          <Alert
            error="It was not possible to get the dataset list. Please check if the Domain API is reachable."
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
      <SidePanel isOpen={isOpen} close={close}>
        <article className="p-4 pr-8 space-y-6">
          <section>
            <header>
              <h3 className="text-2xl font-medium text-gray-900 leading-6">Create a new Dataset</h3>
              <p className="mt-2 text-sm text-gray-500">Upload a new dataset to this PyGrid Domain.</p>
            </header>
          </section>
          <form onSubmit={handleSubmit(submit)}>
            <section className="flex flex-col space-y-4">
              {datafile?.[0]?.name && (
                <div className="flex flex-col space-y-1 text-sm text-gray-600">
                  <span>Name: {datafile[0].name}</span>
                  <span>Size: {formatBytes(datafile[0].size, 0)}</span>
                  <span>Last modified: {datafile[0].lastModifiedDate?.toString()}</span>
                </div>
              )}
              <label
                htmlFor="file"
                className="relative font-medium text-indigo-600 bg-white cursor-pointer rounded-md hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                <input name="file" id="file" type="file" className="sr-only" ref={register} />
                <div
                  className={cn(
                    'w-full btn lg:w-auto transition-all ease-in-out duration-700',
                    datafile?.[0] && 'bg-gray-700'
                  )}>
                  {datafile?.[0] ? 'Change file' : 'Select dataset'}
                </div>
              </label>
              <p className="text-gray-500">
                If your compressed file already contains files named description, manifest and/or tags, you can ignore
                the fields below. Otherwise, we strongly suggest you add them.
              </p>
              <Input
                type="textarea"
                name="description"
                label="Description"
                ref={register}
                rows={3}
                placeholder="Description"
              />
              <Input type="textarea" name="manifest" label="Manifest" rows={3} ref={register} placeholder="Manifest" />
              <Input
                type="textarea"
                name="tags"
                label="Tags"
                ref={register}
                placeholder="Tags"
                hint="One tag per line"
              />
              <div className="w-full sm:text-right">
                <button className="w-full btn lg:w-auto transition-all ease-in-out duration-700" disabled={loading}>
                  {loading ? <Spinner className="w-4 text-white" /> : 'Create a new Dataset'}
                </button>
              </div>
              {createError && (
                <div>
                  <Alert error="There was an error creating the dataset" description={createError.error?.message} />
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
