import {useCallback, useEffect, useState, useRef} from 'react'
import {useQueryClient, useQuery} from 'react-query'
import {PermissionRequestCard} from '@/components/pages/datasets/cards/requests'
import {useFetch} from '@/utils/query-builder'
import {Notification} from '@/components/notifications'
import api from '@/utils/api-axios'
import {Ban} from '@/components/icons/marks'
import type {PyGridDataset, PyGridRequest} from '@/types'

const Requests = () => {
  const queryClient = useQueryClient()
  const {isLoading, data: requests, error} = useFetch<PyGridRequest[]>('/data-centric/requests')
  const {data: datasets} = useQuery<PyGridDataset[]>('/data-centric/datasets')
  const [current, setCurrent] = useState(null)
  const timer = useRef()

  const acceptOrDenyRequest = useCallback(
    (id, accepted, user) =>
      api.put(`/data-centric/requests/${id}`, {status: accepted ? 'accepted' : 'denied'}).then(() => {
        queryClient.invalidateQueries('/data-centric/requests')
        setCurrent({id, user, accepted: accepted})
      }),
    [queryClient]
  )

  const getDatasetName = (objectId: string): string => {
    const dataset = datasets?.find(x => x.data?.find(d => d.id === objectId))
    console.log(dataset, objectId)
    return dataset !== undefined ? dataset.id : 'Dataset appears to be missing'
  }

  const filteredRequests = requests?.filter(r => r.status === 'pending')

  useEffect(() => {
    if (current) {
      clearTimeout(timer.current)
      timer.current = setTimeout(() => setCurrent(null), 2000)
    }
  }, [current])

  return (
    <article className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:justify-between">
        <header>
          <h1>Requests</h1>
          <p className="subtitle">Accept or deny permissions to data scientists</p>
        </header>
      </div>
      <section className="pt-4">
        <small className="font-semibold tracking-wide text-sm text-gray-800 uppercase">Permissions changes</small>
        <div className="pt-5 space-y-6 xl:space-y-6">
          {!requests || (filteredRequests?.length === 0 && <p>There are no pending requests</p>)}
          {!isLoading &&
            !error &&
            filteredRequests
              .sort((a, b) => {
                return new Date(b.date).getTime() - new Date(a.date).getTime()
              })
              .map(permission => (
                <PermissionRequestCard
                  request={permission}
                  dataset={getDatasetName(permission.objectId)}
                  key={`permission-card-${permission.objectId}-${permission.userId}`}
                  accept={() => acceptOrDenyRequest(permission.id, true, permission.userName)}
                  deny={() => acceptOrDenyRequest(permission.id, false, permission.userName)}
                />
              ))}
        </div>
      </section>
      {current?.id && (
        <Notification
          title={`Request ${current.accepted ? 'accepted' : 'denied'}!`}
          Icon={!current.accepted && <Ban className="w-5 text-red-700" />}>
          <p>
            Request {current.id} by {current.user} accepted
          </p>
        </Notification>
      )}
    </article>
  )
}

export default Requests
