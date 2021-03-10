import {FunctionComponent, useState} from 'react'
import {useQuery} from 'react-query'
import {useRouter} from 'next/router'
import {ButtonGhost, ButtonRound} from '@/components/lib'
import {fetchGroup, fetchGroupMembers} from '@/pages/api/groups'
import {IRole, IUser} from '@/types/users'

import {DeleteGroupModal} from '@/components/modals/groups/delete'
import {EditGroupModal} from '@/components/modals/groups/edit'

const Group: FunctionComponent = () => {
  const router = useRouter()
  const {slug} = router.query

  const [openEditGroupModal, setOpenEditGroupModal] = useState(false)
  const [openDeleteGroupModal, setOpenDeleteGroupModal] = useState(false)
  const {isLoading, data} = useQuery<IRole, Error>(['group', slug], () => fetchGroup({id: slug}))
  const {isLoading: isLoadingMembers, data: membersData} = useQuery<IUser[], Error>(['members', slug], () =>
    fetchGroupMembers({id: slug})
  )

  if (isLoading || isLoadingMembers || data === undefined) return null

  const {id, name} = data

  return (
    <main className="space-y-8">
      <div className="space-y-6">
        <div className="flex flex-col-reverse items-start justify-between space-y-4 space-y-reverse md:flex-row md:space-y-0">
          <h1 className="pr-4 text-4xl leading-12">
            Group: {name} <span className="text-gray-300">#{id}</span>
          </h1>
          <div className="flex flex-row space-x-2">
            <ButtonRound onClick={() => setOpenEditGroupModal(true)}>Edit group</ButtonRound>
            <ButtonGhost className="text-sm" onClick={() => setOpenDeleteGroupModal(true)}>
              Delete group
            </ButtonGhost>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <h2 className="text-sm font-semibold tracking-widest uppercase">Members</h2>
        <hr />
        <ul className="mt-4 space-y-1">
          {membersData.map(member => (
            <li key={`member-${member.id}`}>
              - ID: {member.id} - {member.email}
            </li>
          ))}
        </ul>
      </div>
      <DeleteGroupModal
        id={id}
        onClose={() => setOpenDeleteGroupModal(false)}
        isOpen={openDeleteGroupModal}
        onConfirm={() => setOpenDeleteGroupModal(false)}
      />
      <EditGroupModal
        id={id}
        name={name}
        onClose={() => setOpenEditGroupModal(false)}
        isOpen={openEditGroupModal}
        onConfirm={() => setOpenEditGroupModal(false)}
      />
    </main>
  )
}

export default Group
