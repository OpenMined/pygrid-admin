import {useState} from 'react'
import Link from 'next/link'
import VisuallyHidden from '@reach/visually-hidden'
import {useDisclosure} from 'react-use-disclosure'
import {useForm} from 'react-hook-form'
import {Alert, Input, Select} from '@/components/lib'
import {Spinner} from '@/components/icons/spinner'
import {Right} from '@/components/icons/arrows'
import {UserListItem} from '@/components/pages/users/user-list-item'
import {SidePanel} from '@/components/side-panel'
import {Notification} from '@/components/notifications'
import {useFetch, useMutate} from '@/utils/query-builder'
import {Ban} from '@/components/icons/marks'
import type {PyGridUser, PyGridUserRole, PyGridUserGroup} from '@/types/users'
import type {FunctionComponent} from 'react'

const Users: FunctionComponent = () => {
  const [user, setUser] = useState<PyGridUser>(null)
  const {open, close, isOpen} = useDisclosure()
  const {register, handleSubmit} = useForm()
  const {isLoading, error, isError, data: users} = useFetch<Array<PyGridUser>>('/users')
  const {isLoading: rolesLoading, error: rolesError, data: roles} = useFetch<Array<PyGridUserRole>>('/roles')
  const {isLoading: groupsLoading, error: groupsError, data: groups} = useFetch<Array<PyGridUserGroup>>('/groups')
  const createUser = useMutate<Partial<PyGridUser>, PyGridUser>({url: `/users`, invalidate: '/users'})
  const deleteUser = useMutate({url: `/users/${user?.id}`, method: 'delete', invalidate: '/users'})
  const editUser = useMutate<Partial<PyGridUser>, PyGridUser>({
    url: `users/${user?.id}`,
    method: 'put',
    invalidate: '/users'
  })

  const submit = (values: Omit<PyGridUser, 'id' | 'createdAt'>) => {
    createUser.mutate({...values, role: Number(values.role)}, {onSuccess: close})
  }
  const edit = values => {
    editUser.mutate(values as Partial<PyGridUser>, {onSuccess: () => setUser(null)})
  }

  const remove = () => {
    deleteUser.mutate(null, {onSuccess: () => setUser(null)})
  }

  const closePanel = () => {
    setUser(null)
    close()
    createUser.reset()
    editUser.reset()
    deleteUser.reset()
  }

  return (
    <article>
      <div className="flex flex-col sm:flex-row sm:justify-between">
        <header>
          <h1>Users</h1>
          <p className="subtitle">
            Manage all users (internal and external) <br className="sm:hidden" />
            in your Domain
          </p>
        </header>
      </div>
      <section className="mt-6">
        <div className="flex flex-row justify-between max-w-xs text-sm text-gray-600 uppercase leading-6 hover:text-gray-800 focus:text-gray-800 active:text-gray-800">
          <Link href="/users/groups">
            <a>
              {groupsLoading ? <Spinner className="h-3 mr-4" /> : groups?.length} Group{groups?.length !== 1 && 's'}
              <Right className="w-4 h-4" />
            </a>
          </Link>
          <Link href="/users/roles">
            <a>
              {rolesLoading ? <Spinner className="h-3 mr-4" /> : roles?.length} Role{roles?.length !== 1 && 's'}
              <Right className="w-4 h-4" />
            </a>
          </Link>
        </div>
        {(!rolesLoading || !groupsLoading) && (rolesError || groupsError) && (
          <Alert
            className="mt-4"
            error="Unable to fetch groups or roles data"
            description={(rolesError?.message || groupsError?.message) ?? 'Check your connection status'}
          />
        )}
      </section>
      <section className="mt-6 overflow-hidden bg-white shadow sm:rounded-md">
        <header>
          <div className="flex items-center justify-between px-4 py-4 text-xs font-medium tracking-wider text-gray-500 uppercase bg-gray-100 border-b border-gray-200 sm:px-6">
            <div className="flex flex-col sm:flex-row">
              <h2 className="flex-shrink-0 mr-2">Domain user list</h2>
              <div className="flex-shrink-0">
                {users?.length > 0 && (
                  <p>
                    ({users.length} user{users.length !== 1 && 's'})
                  </p>
                )}
                {isLoading && <Spinner className="w-4" />}
              </div>
            </div>
            <div className="text-right">
              <button className="btn" onClick={open}>
                <span className="hidden sm:inline-block">Add Member</span>
                <span className="sm:hidden">Add</span>
              </button>
            </div>
          </div>
        </header>
        <ul className="divide-y divide-gray-200">
          {users?.map(user => (
            <UserListItem
              key={user.email}
              email={user.email}
              userRole={roles?.find(role => role.id === user.role)?.name}
              onClick={() => setUser(user)}
            />
          ))}
        </ul>
      </section>
      {!isLoading && isError && (
        <div className="mt-4">
          <VisuallyHidden>An error occurred.</VisuallyHidden>
          <Alert
            error="It was not possible to get the user list. Please check if the Domain API is reachable."
            description={error.message ?? 'Check your connection status'}
          />
        </div>
      )}
      <SidePanel isOpen={isOpen} close={closePanel}>
        <article className="p-4 pr-8 space-y-6">
          <section>
            <header>
              <h3 className="text-2xl font-medium text-gray-900 leading-6">Create a new user</h3>
              <p className="mt-2 text-sm text-gray-500">Set up a new user for this PyGrid Domain.</p>
            </header>
          </section>
          <form onSubmit={handleSubmit(submit)}>
            <section className="flex flex-col space-y-4">
              <Input name="email" label="Email" ref={register} placeholder="valid@email.com" />
              <Input name="password" label="Password" ref={register} placeholder="Password" type="password" />
              <p className="text-sm text-gray-400">
                Roles specifically define what a user is capable of in the PyGrid system. Every user must have a role.
              </p>
              <Select
                name="role"
                label="User role"
                ref={register}
                placeholder="Select a role"
                defaultValue=""
                required
                options={roles?.map(role => ({value: role.id, label: role.name}))}
              />
              <p className="text-sm text-gray-400">
                User groups are used to easily manage permissions and access control
              </p>
              <Select
                name="groups"
                label="User group (optional)"
                ref={register}
                placeholder="No group selected"
                defaultValue=""
                options={groups?.map(group => ({value: group.id, label: group.name}))}
              />
              <div className="w-full sm:text-right">
                <button
                  className="w-full btn lg:w-auto transition-all ease-in-out duration-700"
                  disabled={createUser.isLoading}>
                  {createUser.isLoading ? <Spinner className="w-4 text-white" /> : 'Create a new user'}
                </button>
              </div>
              {createUser.isError && (
                <div>
                  <Alert error="There was an error creating the user" description={createUser.error.message} />
                </div>
              )}
            </section>
          </form>
        </article>
      </SidePanel>
      <SidePanel isOpen={Boolean(user)} close={() => setUser(null)}>
        <article className="p-4 pr-8 space-y-6">
          <section>
            <header>
              <h3 className="text-2xl font-medium text-gray-900 leading-6">Modify an existing user</h3>
              <p className="mt-2 text-sm text-gray-500">Change email, user role or group association.</p>
            </header>
          </section>
          <form onSubmit={handleSubmit(edit)}>
            <section className="flex flex-col space-y-4">
              <Input
                name="email"
                label="Email"
                ref={register}
                placeholder="valid@email.com"
                defaultValue={user?.email}
              />
              <p className="text-sm text-gray-400">
                Roles specifically define what a user is capable of in the PyGrid system. Every user must have a role.
              </p>
              <Select
                name="role"
                label="User role"
                ref={register}
                placeholder="Select a role"
                defaultValue={`${user?.role}`}
                options={roles?.map(role => ({value: role.id, label: role.name}))}
              />
              {/* <p className="text-sm text-gray-400"> */}
              {/*   User groups are used to easily manage permissions and access control */}
              {/* </p> */}
              {/* <Select */}
              {/*   name="groups" */}
              {/*   label="User groups (optional)" */}
              {/*   ref={register} */}
              {/*   placeholder="Select a group" */}
              {/*   options={groups?.map(group => ({value: group.id, label: group.name}))} */}
              {/* /> */}
              <div className="flex flex-col text-right lg:flex-row-reverse">
                <button className="lg:ml-4 btn transition-all ease-in-out duration-700" disabled={editUser.isLoading}>
                  {editUser.isLoading || deleteUser.isLoading ? <Spinner className="w-4 text-white" /> : 'Edit'}
                </button>
                <button
                  type="button"
                  className="mt-4 font-normal text-red-600 bg-white shadow-none lg:mt-0 btn transition-all ease-in-out duration-700 hover:bg-red-400 hover:text-white active:bg-red-700"
                  disabled={deleteUser.isLoading}
                  onClick={remove}>
                  {editUser.isLoading || deleteUser.isLoading ? <Spinner className="w-4 text-white" /> : 'Delete'}
                </button>
              </div>
              {editUser.isError && (
                <div>
                  <Alert error="There was an error editing the user" description={editUser.error.message} />
                </div>
              )}
            </section>
          </form>
        </article>
      </SidePanel>
      {createUser.isSuccess && <Notification>User successfully {user ? 'created' : 'modified'}</Notification>}
      {editUser.isSuccess && (
        <Notification title="Successfully saved!">
          <p>User successfully edited</p>
        </Notification>
      )}
      {deleteUser.isSuccess && (
        <Notification title="Successfully removed!" Icon={<Ban className="text-red-700 w-5" />}>
          <p>User successfully delete</p>
        </Notification>
      )}
    </article>
  )
}

export default Users
