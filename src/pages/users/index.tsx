import {FunctionComponent, useState} from 'react'
import {useQuery} from 'react-query'

import {UserCard} from '@/components/pages/users/cards/users'
import {ArrowForward} from '@/components/icons/arrows'
import {fetchGroups, fetchRoles, fetchUsers} from '@/pages/api/users'

import type {IGroup, IRole, IUser} from '@/types/users'
import {CreateUserModal} from '@/components/modals/users/create'

const Users: FunctionComponent = () => {
  const [openCreateUserModal, setOpenCreateUserModal] = useState(false)

  const {isLoading, data: usersData, error} = useQuery<IUser[], Error>('users', fetchUsers)

  const {data: groupsData} = useQuery<IGroup[], Error>('groups', fetchGroups)
  const {data: rolesData} = useQuery<IRole[], Error>('roles', fetchRoles)

  const sections = [
    {title: 'Total users', value: usersData && usersData.length, text: 'users'},
    {title: 'Total groups', value: groupsData && groupsData.length, text: 'groups'},
    {title: 'Total roles', value: rolesData && Object.keys(rolesData).length, text: 'roles'}
  ]

  return (
    <main className="space-y-4">
      <div className="flex flex-col-reverse items-start space-y-4 space-y-reverse md:space-y-0 md:flex-row md:justify-between">
        <h1 className="pr-4 text-4xl leading-12">Users</h1>
        <button className="btn" onClick={() => setOpenCreateUserModal(true)}>
          Create User
        </button>
      </div>
      <p className="mt-3 mb-6 text-xl font-light text-gray-400">
        Manage all users (internal and external) in your Node
      </p>
      {!isLoading && !error && (
        <>
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {sections.map(({title, value, text}) => (
              <div key={`section-${title}`}>
                <small className="font-semibold tracking-wide text-gray-800 uppercase">{title}</small>
                <p className="my-3">
                  <span className="text-xl font-semibold text-gray-800">{value}</span>{' '}
                  <span className="text-gray-400">{text}</span> <ArrowForward className="w-4 h-4 text-blue-600" />
                </p>
              </div>
            ))}
          </section>
          <section className="space-y-6">
            {usersData?.map(user => (
              <div key={`user-${user.id}`}>
                <a href={`/users/${user.id}`}>
                  <UserCard {...user} />
                </a>
              </div>
            ))}
          </section>
        </>
      )}
      <CreateUserModal
        isOpen={openCreateUserModal}
        onClose={() => setOpenCreateUserModal(false)}
        onConfirm={() => setOpenCreateUserModal(false)}
      />
    </main>
  )
}

export default Users
