import {useQuery} from 'react-query'
import {Spinner} from '@/components/icons/spinner'
import {SectionHeader} from '@/components/lib'

export default function Dashboard() {
  // Only the main sections have loading information. If we are unable to load
  // the requests, tensors, roles or groups, that's ok.
  const {data: datasets, isLoading: loadingDatasets} = useQuery('/data-centric/datasets')
  const {data: requests} = useQuery('/data-centric/requests')
  const {data: tensors} = useQuery('/data-centric/tensors')
  const {data: users, isLoading: loadingUsers} = useQuery('/users')
  const {data: roles} = useQuery('/roles')
  const {data: groups} = useQuery('/groups')

  return (
    <article className="space-y-8">
      <SectionHeader>
        <SectionHeader.Title>Dashboard</SectionHeader.Title>
        <SectionHeader.Description>An overview of your PyGrid Domain</SectionHeader.Description>
      </SectionHeader>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        <div>
          <h2 className="flex text-xl text-gray-600 items-center tracking-tighter">
            Datasets information
            {loadingDatasets && <Spinner className="w-4 h-4 mx-2 ml-2 text-gray-400" />}
          </h2>
          <div className="mt-2">
            {datasets && (
              <p>
                <span className="font-bold">{datasets.length ?? 0}</span> total datasets
              </p>
            )}
            {requests && (
              <p>
                <span className="font-bold">{requests?.filter(r => r.status === 'pending').length ?? 0}</span> pending
                requests
              </p>
            )}
            {tensors?.tensors && (
              <p>
                <span className="font-bold">{tensors.tensors.length ?? 0}</span> tensors available
              </p>
            )}
          </div>
        </div>
        <div>
          <h2 className="flex text-xl tracking-tighter text-gray-600 iterms-center">
            Users {loadingUsers && <Spinner className="w-4 h-4 mx-2 ml-2 text-gray-400" />}
          </h2>
          <div className="mt-2">
            {users && (
              <p>
                <span className="font-bold">{users.length ?? 0}</span> total users
              </p>
            )}
            {roles && (
              <p>
                <span className="font-bold">{roles.length ?? 0}</span> user roles
              </p>
            )}
            {groups && (
              <p>
                <span className="font-bold">{groups.length ?? 0}</span> groups
              </p>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
