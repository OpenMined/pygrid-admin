import type {FunctionComponent} from 'react'
import {PermissionRequestCard} from '@/components/pages/datasets/cards/requests'

const Requests: FunctionComponent = () => {
  const permissionChanges = [
    {
      userEmail: 'owner@openmined.com',
      userId: 19239123,
      dataset: 'Diabetes Study 01.289.301',
      tensors: 'data.target',
      retrieving: 'requesting tensor',
      createdAt: Date.now()
    },
    {
      userEmail: 'admin@openmined.com',
      userId: 'asdasd19212312392',
      dataset: 'Diabetes Study 01.289.301',
      tensors: 'data.target',
      retrieving: 'requesting tensor',
      createdAt: Date.now()
    }
  ]

  // TODO : Add logic functionality to accept and reject permissions/budgets
  // TODO : Trigger accept and reject modals to onClickAccept and onClickReject
  // TODO : Hook to PyGrid API
  return (
    <main className="space-y-4">
      <h1 className="text-4xl text-gray-800">Requests</h1>
      <p className="text-xl font-light text-gray-400">Accept or deny permissions</p>
      <section>
        <small className="font-semibold tracking-wide text-sm text-gray-800 uppercase">Permissions changes</small>
        <div className="space-y-6 pt-5">
          {permissionChanges
            .sort((a, b) => b.createdAt - a.createdAt)
            .map(permission => (
              <PermissionRequestCard
                {...permission}
                key={`permission-card-${permission.dataset}-${permission.tensors}-${permission.userId}`}
                onClickReason={() => alert('View reason')}
                onClickAccept={() => alert('Accept clicked')}
                onClickReject={() => alert('Reject clicked')}
              />
            ))}
        </div>
      </section>
    </main>
  )
}

export default Requests
