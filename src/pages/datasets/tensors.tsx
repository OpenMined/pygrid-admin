import type {FunctionComponent} from 'react'
import {TensorsCard} from '@/components/pages/datasets/cards/tensors'
import {ArrowForward} from '@/components/icons/arrows'
import {useQuery} from 'react-query'
import {PyGridRequest, PygridTensor} from '@/types'
import {deleteTensor, fetchRequests, fetchTensors} from '@/pages/api/datasets'

const Tensors: FunctionComponent = () => {
  const {isLoading, data: tensorsData, error} = useQuery<PygridTensor[], Error>('tensors', fetchTensors)
  const {isLoading: isLoadingRequests, data: requests} = useQuery<PyGridRequest[], Error>('requests', fetchRequests)

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
