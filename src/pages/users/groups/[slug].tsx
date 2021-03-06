import {FunctionComponent, useState} from 'react'
import {useQuery} from 'react-query'
import {useRouter} from 'next/router'
import {ButtonGhost, ButtonRound} from '@/components/lib'
import {fetchGroup} from '@/pages/api/groups'
import {IRole} from '@/types/users'

import {permissions} from '@/lib/user-permissions'
import {toSentence} from '@/lib/utils'
import {DeleteRoleModal} from '@/components/modals/roles/delete'

const Group: FunctionComponent = () => {
  const router = useRouter()
  const {slug} = router.query

  const [openDeleteRoleModal, setOpenDeleteRoleModal] = useState(false)
  const {isLoading, data} = useQuery<IRole, Error>(['role', slug], () => fetchGroup({id: slug}))

  if (isLoading || data === undefined) return null

  const {id, name, ...userPermissions} = data

  return (
    <main className="space-y-8">
      <div className="space-y-6">
        <div className="flex flex-col-reverse items-start justify-between space-y-4 space-y-reverse md:flex-row md:space-y-0">
          <h1 className="pr-4 text-4xl leading-12">
            Group: {name} <span className="text-gray-300">#{id}</span>
          </h1>
          <div className="flex flex-row space-x-2">
            <ButtonRound onClick={() => alert('Edit Role')}>Edit Role</ButtonRound>
            <ButtonGhost className="text-sm" onClick={() => setOpenDeleteRoleModal(true)}>
              Delete role
            </ButtonGhost>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <h2 className="text-sm font-semibold tracking-widest uppercase">Permissions</h2>
        <hr />
        <div className="flex flex-col mt-4 space-y-1">
          {permissions.map(permission => (
            <span key={`prm-${permission}`}>
              <strong>{toSentence(permission)}</strong>: <span>{userPermissions[permission] ? 'YES' : 'NO'}</span>
            </span>
          ))}
        </div>
      </div>
      <DeleteRoleModal
        id={id}
        onClose={() => setOpenDeleteRoleModal(false)}
        isOpen={openDeleteRoleModal}
        onConfirm={() => setOpenDeleteRoleModal(false)}
      />
    </main>
  )
}

export default Group
