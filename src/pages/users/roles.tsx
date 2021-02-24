import type {FunctionComponent} from 'react'
import {useQuery} from 'react-query'
import {Accordion} from '@reach/accordion'

import {RoleCard} from '@/components/pages/users/cards/roles'
import {fetchRoles} from '@/pages/api/users'
import {IRole} from '@/types'

const Users: FunctionComponent = () => {
  const {isLoading, data} = useQuery<Record<string, IRole>, Error>('users', fetchRoles)

  return (
    <main className="space-y-4">
      <div className="flex flex-col-reverse items-start space-y-4 space-y-reverse md:space-y-0 md:flex-row md:justify-between">
        <h1 className="pr-4 text-4xl leading-12">Roles</h1>
        <button className="btn" onClick={() => alert('Create new user')}>
          Create Role
        </button>
      </div>
      <p className="mt-3 mb-6 text-xl font-light text-gray-400">Manage all administrative user roles</p>
      {!isLoading && (
        <Accordion collapsible multiple className="space-y-6">
          {Object.keys(data).map(roleID => (
            <div key={`user-${roleID}`}>
              <RoleCard {...data[roleID]} />
            </div>
          ))}
        </Accordion>
      )}
    </main>
  )
}

export default Users
