import {useCallback} from 'react'
import {useQueryClient} from 'react-query'
import {TensorsCard} from '@/components/pages/datasets/cards/tensors'
import {ArrowForward} from '@/components/icons/arrows'
import {useFetch} from '@/utils/query-builder'
import api from '@/utils/api-axios'
import type {PyGridRequest, PyGridTensor} from '@/types'

const Tensors = () => {
  const queryClient = useQueryClient()
  const {isLoading, data: tensorsData, error} = useFetch<PyGridTensor[]>('/data-centric/tensors')
  const {isLoading: isLoadingRequests, data: requests} = useFetch<PyGridRequest[]>('/data-centric/requests')

  const deleteTensor = useCallback(
    id =>
      api.delete(`/data-centric/tensors/${id}`).then(res => {
        queryClient.invalidateQueries('/data-centric/tensors')
        return res
      }),
    [queryClient]
  )

  if (isLoading || isLoadingRequests || error) return null

  return (
    <main className="space-y-8">
      <div>
        <h1 className="text-4xl text-gray-800">Tensors</h1>
        <p className="mt-4 text-xl font-light text-gray-400">View all tensors resulting from your private data</p>
      </div>
      <section>
        <small className="font-semibold tracking-wide text-gray-800 uppercase">Retrieve permissions changes</small>
        <div className="mt-2">
          <a href="/datasets/requests">
            <span className="text-xl font-semibold text-gray-800">
              {requests.filter(x => x.requestType === 'permissions' && x.status === 'pending').length}
            </span>{' '}
            <span className="text-gray-400">requests</span> <ArrowForward className="w-4 h-4 text-blue-600" />
          </a>
        </div>
      </section>
      <p className="font-thin text-gray-400">
        According to{' '}
        <a href="/settings" target="blank">
          your settings
        </a>
        , tensors are automatically deleted <strong>{settings?.tensorsExpiry}</strong> after being downloaded.
      </p>
      <section className="grid grid-cols-1 gap-4 xl:gap-4">
        <div className="space-y-6 xl:space-y-8">
          {!isLoading &&
            !error &&
            tensorsData.map(tensor => (
              <TensorsCard
                {...tensor}
                key={`tensor-${tensor.id}`}
                onDelete={() => deleteTensor(tensor.id).then(msg => alert(msg))}
              />
            ))}
        </div>
      </section>
    </main>
  )
}

export default Tensors
