import type {FunctionComponent} from 'react'
import {useState} from 'react'
import {useForm} from 'react-hook-form'
import VisuallyHidden from '@reach/visually-hidden'
import {useDisclosure} from 'react-use-disclosure'
import {Alert, Input} from '@/components/lib'
import {Spinner} from '@/components/icons/spinner'
import {GroupListItem} from '@/components/pages/users/group-list-item'
import {SidePanel} from '@/components/side-panel'
import {Notification} from '@/components/notifications'
import {useFetch, useMutate} from '@/utils/query-builder'
import {Ban} from '@/components/icons/marks'
import type {PyGridUserRole} from '@/types/users'

const UserRoles: FunctionComponent = () => {
  const [role, setRole] = useState<PyGridUserRole>(null)
  const {isOpen, open, close} = useDisclosure()
  const {register, handleSubmit} = useForm()
  const {data: roles, isLoading, isError, error} = useFetch('/roles')
  const create = useMutate<Pick<PyGridUserRole, 'name'>, PyGridUserRole>({url: '/roles', invalidate: '/roles'})
  const deleteRole = useMutate({url: `/roles/${role?.id}`, method: 'delete', invalidate: '/roles'})
  const editRole = useMutate<Partial<PyGridUserRole>, PyGridUserRole>({
    url: `roles/${role?.id}`,
    method: 'put',
    invalidate: '/roles'
  })

  const closePanel = () => {
    setRole(null)
    close()
    create.reset()
    editRole.reset()
    deleteRole.reset()
  }

  const submit = values => {
    create.mutate(values as Pick<PyGridUserRole, 'name'>, {onSuccess: closePanel})
  }

  const edit = values => {
    editRole.mutate(values as Partial<PyGridUserRole>, {onSuccess: () => setRole(null)})
  }

  const remove = () => {
    deleteRole.mutate(null, {onSuccess: () => setRole(null)})
  }

  return (
    <article>
      <header>
        <h1>User roles</h1>
        <p className="subtitle">Manage all user roles</p>
      </header>
      <section className="mt-6 overflow-hidden bg-white shadow sm:rounded-md">
        <header>
          <div className="flex items-center justify-between px-4 py-4 text-xs font-medium tracking-wider text-gray-500 uppercase bg-gray-100 border-b border-gray-200 sm:px-6">
            <div className="flex flex-col sm:flex-row">
              <h2 className="flex-shrink-0 mr-2">User roles</h2>
              <div className="flex-shrink-0">
                {roles?.length > 0 && (
                  <p>
                    ({roles.length} group{roles.length > 1 && 's'})
                  </p>
                )}
                {isLoading && <Spinner className="w-4" />}
              </div>
            </div>
            <div className="text-right">
              <button className="btn" onClick={open}>
                <span className="hidden sm:inline-block">Add role</span>
                <span className="sm:hidden">Add</span>
              </button>
            </div>
          </div>
        </header>
        <ul className="divide-y divide-gray-200">
          {roles?.map(group => (
            <GroupListItem key={group.id} name={group.name} onClick={() => setRole(group)} />
          ))}
        </ul>
      </section>
      {!isLoading && isError && (
        <div className="mt-4">
          <VisuallyHidden>An error occurred.</VisuallyHidden>
          <Alert
            error="It was not possible to get the list of user roles. Please check if the Domain API is reachable."
            description={error.message ?? 'Check your connection status'}
          />
        </div>
      )}
      <SidePanel isOpen={isOpen} close={closePanel}>
        <article className="p-4 pr-8 space-y-6">
          <section>
            <header>
              <h3 className="text-2xl font-medium text-gray-900 leading-6">Create a new role</h3>
              <p className="mt-2 text-sm text-gray-500">Add a name for the role.</p>
            </header>
          </section>
          <form onSubmit={handleSubmit(submit)}>
            <section className="flex flex-col space-y-4">
              <Input name="name" label="Group name" ref={register} placeholder="Name" />
              <div className="w-full sm:text-right">
                <button
                  className="w-full btn lg:w-auto transition-all ease-in-out duration-700"
                  disabled={create.isLoading}>
                  {create.isLoading ? <Spinner className="w-4 text-white" /> : 'Create a new group'}
                </button>
              </div>
              {create.isError && (
                <div>
                  <Alert error="There was an error creating the group" description={create.error.message} />
                </div>
              )}
            </section>
          </form>
        </article>
      </SidePanel>
      <SidePanel isOpen={Boolean(role)} close={() => setRole(null)}>
        <article className="p-4 pr-8 space-y-6">
          <section>
            <header>
              <h3 className="text-2xl font-medium text-gray-900 leading-6">Modify an existing role</h3>
              <p className="mt-2 text-sm text-gray-500">Change its name and purge users from the role.</p>
            </header>
          </section>
          <form onSubmit={handleSubmit(edit)}>
            <section className="flex flex-col space-y-4">
              <Input name="name" label="User Role" ref={register} defaultValue={role?.name} />
              <div className="flex flex-col text-right lg:flex-row-reverse">
                <button
                  className="lg:ml-4 btn transition-all ease-in-out duration-700"
                  disabled={editRole.isLoading}
                  onClick={edit}>
                  {editRole.isLoading ? <Spinner className="w-4 text-white" /> : 'Edit'}
                </button>
                <button
                  className="mt-4 font-normal text-red-600 bg-white shadow-none lg:mt-0 btn transition-all ease-in-out duration-700 hover:bg-red-400 hover:text-white active:bg-red-700"
                  disabled={create.isLoading}
                  type="button"
                  onClick={remove}>
                  {editRole.isLoading ? <Spinner className="w-4 text-white" /> : 'Delete'}
                </button>
              </div>
              {editRole.isError && (
                <div>
                  <Alert error="There was an error creating the user" description={editRole.error.message} />
                </div>
              )}
            </section>
          </form>
        </article>
      </SidePanel>
      {create.isSuccess && (
        <Notification title="Successfully created!">
          <p>Role successfully created</p>
        </Notification>
      )}
      {editRole.isSuccess && (
        <Notification title="Successfully saved!">
          <p>Role successfully edited</p>
        </Notification>
      )}
      {deleteRole.isSuccess && (
        <Notification title="Successfully removed!" Icon={<Ban className="text-red-700 w-5" />}>
          <p>Role successfully delete</p>
        </Notification>
      )}
    </article>
  )
}

export default UserRoles
