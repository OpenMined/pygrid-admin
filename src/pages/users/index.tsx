import {FunctionComponent, useEffect, useState} from 'react'
import {useQuery} from 'react-query'

import {UserCard} from '@/components/pages/users/cards/users'
import {ArrowForward} from '@/components/icons/arrows'
import {fetchGroups, fetchRoles, fetchUsers} from '@/pages/api/users'

import type {IGroup, IRole, IUser} from '@/types'

const Users: FunctionComponent = () => {
  const [totalUsers, setTotalUsers] = useState(0)
  const [totalGroups, setTotalGroups] = useState(0)
  const [totalRoles, setTotalRoles] = useState(0)

  const {isLoading, data: usersData} = useQuery<Record<string, IUser>, Error>('users', fetchUsers)

  const {data: groupsData} = useQuery<Record<string, IGroup>, Error>('groups', fetchGroups)
  const {data: rolesData} = useQuery<Record<string, IRole>, Error>('roles', fetchRoles)

  useEffect(() => {
    usersData && setTotalUsers(Object.keys(usersData).length)
    groupsData && setTotalGroups(Object.keys(groupsData).length)
    rolesData && setTotalRoles(Object.keys(rolesData).length)
  }, [usersData, groupsData, rolesData])

  const sections = [
    {title: 'Total users', value: totalUsers, text: 'users'},
    {title: 'Total groups', value: totalGroups, text: 'groups'},
    {title: 'Total roles', value: totalRoles, text: 'roles'}
  ]

  return (
    <main className="space-y-4">
      <div className="flex flex-col-reverse items-start space-y-4 space-y-reverse md:space-y-0 md:flex-row md:justify-between">
        <h1 className="pr-4 text-4xl leading-12">Users</h1>
        <button className="btn" onClick={() => alert('Create new user')}>
          Create User
        </button>
      </div>
      <p className="mt-3 mb-6 text-xl font-light text-gray-400">
        Manage all users (internal and external) in your Node
      </p>
      {!isLoading && (
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
            {Object.keys(usersData).map(userId => (
              <div key={`user-${userId}`}>
                <a href={`/users/${userId}`}>
                  <UserCard {...usersData[userId]} />
                </a>
              </div>
            ))}
          </section>
        </>
      )}
    </main>
  )
}

export default Users
