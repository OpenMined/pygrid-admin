import type {FunctionComponent} from 'react'
import {useState} from 'react'
import {useQuery} from 'react-query'
import {CreateRoleModal} from '@/components/modals/roles/create'
import {CheckMark, XMark} from '@/components/icons/marks'
import {ButtonRound} from '@/components/lib'
import {fetchRoles} from '@/pages/api/roles'
import {IRole} from '@/types/users'
import {permissions} from '@/lib/user-permissions'
import {toSentence} from '@/lib/utils'

const Roles: FunctionComponent = () => {
  const [openCreateRoleModal, setOpenCreateRoleModal] = useState(false)
  const {isLoading, data} = useQuery<IRole[], Error>('roles', fetchRoles)

  const TableHead = () => (
    <thead>
      <tr className="bg-gray-100 rounded-lg text-sm font-medium text-gray-700 text-center">
        <th className="my-4 px-4 py-2">ID</th>
        <th className="my-4 px-4 py-2 text-left">Role Name</th>
        {permissions.map(permission => (
          <th key={`th-${permission}`} className="my-4 px-4 py-2">
            {toSentence(permission)}
          </th>
        ))}
      </tr>
    </thead>
  )

  return (
    <main className="space-y-4">
      <div className="flex flex-col-reverse items-start space-y-4 space-y-reverse md:space-y-0 md:flex-row md:justify-between">
        <h1 className="pr-4 text-4xl leading-12">Roles</h1>
        <ButtonRound onClick={() => setOpenCreateRoleModal(true)}>Create Role</ButtonRound>
      </div>
      <p className="mt-3 mb-6 text-xl font-light text-gray-400">Manage all administrative user roles</p>
      {!isLoading && (
        <table className="table-auto border-collapse w-full">
          <TableHead />
          <tbody className="text-sm font-normal text-gray-700">
            {data.map(role => (
              <tr key={`role-${role.id}`} className="hover:bg-gray-50 border-b border-gray-200 py-10">
                <td className="px-4 py-4">{role.id}</td>
                <td className="px-4 py-4 text-left">
                  <a href={`/users/roles/${role.id}`}>{role.name}</a>
                </td>
                {permissions.map(permission => (
                  <td key={`tr-${permission}`} className="px-2 py-4 text-center">
                    {role[permission] ? (
                      <CheckMark className="w-3 h-3 text-green-600" />
                    ) : (
                      <XMark className="w-3 h-3 text-red-600" />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
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
