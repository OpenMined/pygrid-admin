import type {FunctionComponent} from 'react'
import {PermissionRequestCard, BudgetChangesCard} from '@/components/pages/datasets/cards/requests'

const Requests: FunctionComponent = () => {
  const permissionChanges = [
    {
      userAvatarURL: 'https://ca.slack-edge.com/T6963A864-U6966R9BJ-gdec6e06f19e-512',
      userName: 'Patrick Cason',
      userId: 19239123,
      dataset: 'Diabetes Study 01.289.301',
      tensors: 'data.target',
      retrieving: 'requesting tensor'
    },
    {
      userAvatarURL: 'https://ca.slack-edge.com/T6963A864-UP9PYUFJT-614414739a77-512',
      userName: 'Hericles Emanuel',
      userId: 'asdasd19212312392',
      dataset: 'Diabetes Study 01.289.301',
      tensors: 'data.target',
      retrieving: ''
    }
  ]

  const budgetChanges = [
    {
      userAvatarURL: 'https://ca.slack-edge.com/T6963A864-U6966R9BJ-gdec6e06f19e-512',
      userName: 'Patrick Cason',
      userId: 19239123,
      retrieving: '',
      epsilonCurrent: 30,
      epsilonAfterChange: 50
    },
    {
      userAvatarURL: 'https://ca.slack-edge.com/T6963A864-UP9PYUFJT-614414739a77-512',
      userName: 'Hericles Emanuel',
      userId: 'asdasd19212312392',
      retrieving: '',
      epsilonCurrent: 0,
      epsilonAfterChange: 70
    }
  ]

  return (
    <main className="space-y-4">
      <h1 className="text-4xl text-gray-800">Requests</h1>
      <p className="text-xl font-light text-gray-400">Accept or deny any permissions or privacy budget changes</p>
      <div className="grid grid-cols-1 gap-6 xl:gap-8 lg:grid-cols-2">
        <section>
          <small className="font-semibold tracking-wide text-gray-800 uppercase">Permissions changes</small>
          <div className="space-y-6 xl:space-y-8">
            {permissionChanges.map(permission => (
              <PermissionRequestCard
                {...permission}
                key={`permission-card-${permission.dataset}-${permission.tensors}-${permission.userId}`}
                onClickReason={() => alert('View reason')}
              />
            ))}
          </div>
        </section>
        <section>
          <small className="font-semibold tracking-wide text-gray-800 uppercase">Budget changes</small>
          <div className="space-y-6 xl:space-y-8">
            {budgetChanges.map(budget => (
              <BudgetChangesCard
                {...budget}
                key={`budget-card-${budget.userId}-${budget.epsilonAfterChange}`}
                onClickReason={() => alert('View reason')}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

export default Requests
