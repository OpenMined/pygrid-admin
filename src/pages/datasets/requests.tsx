import {useCallback} from 'react'
import {useQueryClient, useQuery} from 'react-query'
import {PermissionRequestCard} from '@/components/pages/datasets/cards/requests'
import {useFetch} from '@/utils/query-builder'
import api from '@/utils/api-axios'
import type {PyGridDataset, PyGridRequest} from '@/types'

const Requests = () => {
  const queryClient = useQueryClient()
  const {isLoading, data: requests, error} = useFetch<PyGridRequest[]>('/data-centric/requests')
  const {data: datasetsData} = useQuery<PyGridDataset[]>('/data-centric/datasets')

  const acceptOrDenyRequest = useCallback(
    (id, isAccepted) =>
      api.post(`/data-centric/requests/${id}`, {status: isAccepted ? 'accepted' : 'denied'}).then(() => {
        queryClient.invalidateQueries('/data-centric/requests')
      }),
    [queryClient]
  )

  if (!datasetsData) return null

  const getDatasetName = (objectId: string): string => {
    const dataset = datasetsData.find(x => x.id === objectId)
    return dataset !== undefined ? dataset.name : ' - '
  }

  return (
    <main className="space-y-4">
      <h1 className="text-4xl text-gray-800">Requests</h1>
      <p className="text-xl font-light text-gray-400">Accept or deny permissions</p>
      <section>
        <small className="font-semibold tracking-wide text-sm text-gray-800 uppercase">Permissions changes</small>
        <div className="pt-5 space-y-6 xl:space-y-6">
          {!isLoading &&
            !error &&
            requests
              .filter(x => x.status === 'pending')
              .sort((a, b) => {
                return new Date(b.date).getTime() - new Date(a.date).getTime()
              })
              .map(permission => (
                <PermissionRequestCard
                  {...permission}
                  tensors={'data.target'}
                  dataset={getDatasetName(permission.objectId)}
                  retrieving={'requesting tensor'}
                  key={`permission-card-${permission.objectId}-${permission.userId}`}
                  onClickAccept={() => acceptOrDenyRequest(permission.id, true)}
                  onClickReject={() => acceptOrDenyRequest(permission.id, false)}
                />
              ))}
        </div>
      </section>
    </main>
  )
}

export default Requests
