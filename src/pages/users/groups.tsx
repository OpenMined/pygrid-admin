import type {FunctionComponent} from 'react'
import {useQuery} from 'react-query'
import {Accordion} from '@reach/accordion'

import {GroupCard} from '@/components/pages/users/cards/groups'
import {fetchGroups} from '@/pages/api/users'
import {IGroup} from '@/types/users'

const Groups: FunctionComponent = () => {
  const {isLoading, data, error} = useQuery<IGroup[], Error>('groups', fetchGroups)

  return (
    <main className="space-y-4">
      <div className="flex flex-col-reverse items-start space-y-4 space-y-reverse md:space-y-0 md:flex-row md:justify-between">
        <h1 className="pr-4 text-4xl leading-12">Groups</h1>
        <button className="btn" onClick={() => alert('Create new user')}>
          Create Group
        </button>
      </div>
      <p className="mt-3 mb-6 text-xl font-light text-gray-400">Manage and permission all user groups</p>
      {!isLoading && !error && (
        <Accordion collapsible multiple className="space-y-6">
          {Object.keys(data).map(roleID => (
            <div key={`user-${roleID}`}>
              <GroupCard {...data[roleID]} />
            </div>
          ))}
        </Accordion>
      )}
    </main>
  )
}

export default Groups
