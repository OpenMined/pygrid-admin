import type {FunctionComponent} from 'react'
import {useState} from 'react'
import {useQuery} from 'react-query'
import {Accordion} from '@reach/accordion'

import {RoleCard} from '@/components/pages/users/cards/roles'
import {fetchRoles} from '@/pages/api/users'
import {IRole} from '@/types/users'
import {CreateRoleModal} from '@/components/modals/roles/create'

const Roles: FunctionComponent = () => {
  const [openCreateRoleModal, setOpenCreateRoleModal] = useState(false)
  const {isLoading, data} = useQuery<IRole[], Error>('roles', fetchRoles)

  return (
    <main className="space-y-4">
      <div className="flex flex-col-reverse items-start space-y-4 space-y-reverse md:space-y-0 md:flex-row md:justify-between">
        <h1 className="pr-4 text-4xl leading-12">Roles</h1>
        <button className="btn" onClick={() => setOpenCreateRoleModal(true)}>
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
      <CreateRoleModal
        onClose={() => setOpenCreateRoleModal(false)}
        isOpen={openCreateRoleModal}
        onConfirm={() => setOpenCreateRoleModal(false)}
      />
    </main>
  )
}

export default Roles
