import {FunctionComponent} from 'react'
import {useQuery} from 'react-query'
import {IDataset, IRequest} from '@/types/datasets'
import {PermissionRequestCard} from '@/components/pages/datasets/cards/requests'
import {fetchRequests, fetchDatasets, denyRequest, acceptRequest} from '@/pages/api/datasets'

const Requests: FunctionComponent = () => {
  const {isLoading, data: requests, error} = useQuery<IRequest[], Error>('requests', fetchRequests)
  const {data: datasetsData} = useQuery<IDataset[], Error>('datasets', fetchDatasets)

  if (!datasetsData) return null

  const getDatasetName = (objectId: string): string => {
    const dataset = datasetsData.find(x => x.id === objectId)
    return dataset !== undefined ? dataset.name : ' - '
  }

  // TODO : Add logic functionality to accept and reject permissions/budget'1s
  // TODO : Trigger accept and reject modals to onClickAccept and onClickReject
  // TODO : Hook to PyGrid API
  return (
    <main className="space-y-4">
      <h1 className="text-4xl text-gray-800">Requests</h1>
      <p className="text-xl font-light text-gray-400">Accept or deny permissions</p>
      <section>
        <small className="font-semibold tracking-wide text-sm text-gray-800 uppercase">Permissions changes</small>
        <div className="space-y-6 xl:space-y-6 pt-5">
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
                  onClickAccept={() => acceptRequest(permission.id)}
                  onClickReject={() => denyRequest(permission.id)}
                />
              ))}
        </div>
      </section>
    </main>
  )
}

export default Requests
