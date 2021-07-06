import {createContext, useContext, useState} from 'react'
import Link from 'next/link'
import {useQueryClient, useMutation, useQuery} from 'react-query'
import {useForm} from 'react-hook-form'
import {XIcon, CheckIcon} from '@heroicons/react/outline'
import {NormalButton, DeleteButton, Input, Select, Badge, List, AccordionListItem} from '@/components'
import {Spinner} from '@/components/icons/spinner'
import {entityColors, gridPermissions, cacheKeys} from '@/utils'
import api from '@/utils/api-axios'
import type {ChangeEvent} from 'react'
import type {EnhancedUser, User, Role, Me} from '@/types/grid-types'

interface UsersAsProp {
  users: EnhancedUser[]
}

const UserListContext = createContext(null)

export function UserList({users, me}: UsersAsProp & {me: Me}) {
  return (
    <List>
      {users.map(({user, role, permissions}: EnhancedUser) => (
        <UserListContext.Provider value={{user, role, permissions, me}} key={`list-${user.email}`}>
          <AccordionListItem>
            <UserInfoTitle />
            <UserInfoPanel />
          </AccordionListItem>
        </UserListContext.Provider>
      ))}
    </List>
  )
}

function UserInfoTitle() {
  const {user, role} = useContext(UserListContext)
  return (
    <div className="flex truncate space-x-2">
      <p className="font-medium truncate">{user.email}</p>
      <Badge bgColor={entityColors.roles}>{role.name}</Badge>
    </div>
  )
}

function ShowPermissions() {
  return (
    <div className="max-w-xl">
      <h3 className="font-medium text-base">User permissions</h3>
      <div className="space-y-2">
        <p>Permissions are set by roles and they are used for managing the domain.</p>
        <p>
          For example, a Data Scientist is not expected to have any managerial permissions such as editing users or
          uploading datasets, while a Data Compliance Office should have at least the permission to triage requests. A
          Data Owner has all permissions.
        </p>
        <p>
          If you want to modify the permissions, you can change the user role or{' '}
          <Link href="/permissions">
            <a className="underline">reorganize the permissions</a>
          </Link>
          .
        </p>
        <PermissionsList />
      </div>
    </div>
  )
}

function PermissionsList() {
  const {permissions} = useContext(UserListContext)
  return (
    <div className="space-y-1 my-4 mx-2">
      {Object.keys(permissions).map(permission => (
        <div key={permission}>
          <div className="flex items-center space-x-2">
            {permissions[permission] ? (
              <>
                <CheckIcon className="mr-2 w-4 h-4" />
                <p className="italic font-medium">{gridPermissions[permission]?.name}</p>
              </>
            ) : (
              <>
                <XIcon className="mr-2 w-3 h-3 text-red-700" />
                <p>{gridPermissions[permission]?.name}</p>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

function ChangeRole() {
  const {user, role: userRole} = useContext(UserListContext)
  const [newRole, chooseNewRole] = useState<string>(String(userRole.id))
  const queryClient = useQueryClient()
  const invalidate = () => queryClient.invalidateQueries(cacheKeys.users)
  const {data: allRoles} = useQuery<Role[]>(cacheKeys.roles)
  const mutation = useMutation(() => api.put(`${cacheKeys.users}/${user.id}/role`, {role: newRole}), {
    onSuccess: invalidate
  })

  return (
    <div className="max-w-xl flex space-x-4">
      <Select
        id="user-roles"
        label="Change user role"
        container="flex-grow w-full"
        options={allRoles.map(role => ({value: String(role.id), label: role.name}))}
        className="truncate overflow-hidden"
        value={newRole}
        onChange={e => chooseNewRole(e.target.value)}
      />
      <NormalButton
        onClick={() => mutation.mutate()}
        className="w-24 flex-shrink-0 mt-auto hover:bg-trueGray-200"
        disabled={mutation.isLoading}>
        {mutation.isLoading ? <Spinner className="w-3 h-3" /> : 'Submit'}
      </NormalButton>
    </div>
  )
}

function ChangePassword() {
  const {user} = useContext(UserListContext)
  const [password, setPassword] = useState<string>('')
  const queryClient = useQueryClient()
  const invalidate = () => queryClient.invalidateQueries(cacheKeys.users)
  const mutation = useMutation(() => api.put(`${cacheKeys.users}/${user.id}/password`, {password}), {
    onSuccess: invalidate
  })

  return (
    <div className="flex max-w-xl space-x-4">
      <Input
        id={`user-password-${user.id}`}
        type="password"
        placeholder="This overrides the user password"
        label="Change user password"
        container="flex-grow w-full"
        onChange={e => setPassword(e.target.value)}
        value={password}
      />
      <NormalButton
        className="w-24 flex-shrink-0 mt-auto hover:bg-trueGray-200"
        disabled={mutation.isLoading}
        onClick={() => mutation.mutate()}>
        {mutation.isLoading ? <Spinner className="w-3 h-3" /> : 'Submit'}
      </NormalButton>
    </div>
  )
}

function ChangeEmail() {
  const {user} = useContext(UserListContext)
  const [email, setEmail] = useState<string>(user.email)
  const queryClient = useQueryClient()
  const invalidate = () => queryClient.invalidateQueries(cacheKeys.users)
  const mutation = useMutation(() => api.put(`${cacheKeys.users}/${user.id}/email`, {email}), {onSuccess: invalidate})

  return (
    <div className="flex max-w-xl space-x-4">
      <Input
        id={`user-email-${user.email}`}
        label="Change user email"
        container="flex-grow w-full"
        onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        value={email}
      />
      <NormalButton
        className="w-24 flex-shrink-0 mt-auto hover:bg-trueGray-200"
        disabled={mutation.isLoading}
        onClick={() => mutation.mutate()}>
        {mutation.isLoading ? <Spinner className="w-3 h-3" /> : 'Submit'}
      </NormalButton>
    </div>
  )
}

function useInvalidate(queries: string | string[]) {
  const queryClient = useQueryClient()
  return () => queryClient.invalidateQueries(queries)
}

function DeleteUser() {
  const {user} = useContext(UserListContext)
  const invalidate = useInvalidate(cacheKeys.users)
  const mutation = useMutation(() => api.delete(`${cacheKeys.users}/${user.id}`), {onSuccess: invalidate})

  return (
    <div>
      <DeleteButton
        className="w-32"
        isLoading={mutation.isLoading}
        disabled={mutation.isLoading}
        onClick={() => mutation.mutate()}>
        Delete User
      </DeleteButton>
    </div>
  )
}

function UserInfoPanel() {
  const {user, permissions, me} = useContext(UserListContext)
  return (
    <div className="py-6 pl-16 pr-4 text-sm border-t border-gray-100 bg-blueGray-100 space-y-6">
      <ShowPermissions {...permissions} />
      {me.permissions.canEditRoles && <ChangeRole />}
      {(user.id === me.id || me.permissions.canCreateUsers) && (
        <>
          <ChangeEmail />
          <ChangePassword />
        </>
      )}
      {user.id !== 1 && me.permissions.canCreateUsers && <DeleteUser />}
    </div>
  )
}

interface UserSignUp {
  email: string
  password: string
  roleId: string
}

export function UserCreate({onClose}: {onClose: () => void}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors, isValid}
  } = useForm({mode: 'onTouched'})
  const {data: allRoles} = useQuery<Role[]>(cacheKeys.roles)
  const options = allRoles?.map(role => ({value: String(role.id), label: role.name}))
  const queryClient = useQueryClient()
  const invalidate = () => queryClient.invalidateQueries([cacheKeys.users])

  const mutation = useMutation(
    (user: UserSignUp) =>
      api.post<User>(cacheKeys.users, user).then(() =>
        api.get<User[]>(cacheKeys.users).then(res => {
          const userList = res.data
          const newUser = userList.find(u => u.email === user.email)
          return api.put(`${cacheKeys.users}/${newUser.id}/role`, {role: parseInt(user.roleId)})
        })
      ),
    {
      onSuccess: () => {
        invalidate()
        reset()
        typeof onClose === 'function' && onClose()
      }
    }
  )

  const onSubmit = (values: UserSignUp) => {
    mutation.mutate(values)
  }

  return (
    <div className="bg-blueGray-200 rounded-md p-8 space-y-6">
      <header className="space-y-2 max-w-xl">
        <h2 className="text-xl font-medium">Create a new user</h2>
        <p>
          PyGrid utilizes users and roles to appropriately permission data at a higher level. All users with the
          permission{' '}
          <span className="bg-gray-100 uppercase text-trueGray-800 text-xs tracker-tighter p-1">Can create users</span>{' '}
          are allowed to create new users in the domain.
        </p>
      </header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="max-w-md space-y-4">
          <Input id="create-user-email" label="User email" name="email" ref={register} error={errors.email} required />
          <Input
            id="create-user-password"
            type="password"
            label="User Password"
            name="password"
            ref={register}
            error={errors.password}
            required
          />
          <Select
            id="create-user-roles"
            label="Change user role"
            name="roleId"
            placeholder="Select a role"
            options={options}
            className="truncate overflow-hidden"
            error={errors.role}
            ref={register}
            required
          />
          <NormalButton
            className="mr-4 w-24 flex-shrink-0 mt-auto bg-gray-700 text-gray-50 bg-opacity-80 hover:bg-opacity-100"
            disabled={!isValid || mutation.isLoading}>
            {mutation.isLoading ? <Spinner className="w-3 h-3" /> : 'Submit'}
          </NormalButton>
          <NormalButton
            type="button"
            className="flex-shrink-0 mt-auto hover:bg-trueGray-200"
            onClick={() => typeof onClose === 'function' && onClose()}>
            Close Panel
          </NormalButton>
        </div>
      </form>
    </div>
  )
}
