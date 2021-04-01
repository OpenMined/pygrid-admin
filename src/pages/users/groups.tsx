import type {FunctionComponent} from 'react'
import {useState} from 'react'
import take from 'lodash.take'
import {useForm} from 'react-hook-form'
import VisuallyHidden from '@reach/visually-hidden'
import {useDisclosure} from 'react-use-disclosure'
import {Alert, Input} from '@/components/lib'
import {Spinner} from '@/components/icons/spinner'
import {GroupListItem} from '@/components/pages/users/group-list-item'
import {SidePanel} from '@/components/side-panel'
import {Notification} from '@/components/notifications'
import {useFetch, useMutate} from '@/utils/query-builder'
import type {PyGridUserGroup} from '@/types/users'
import {Ban} from '@/components/icons/marks'

const UserGroups: FunctionComponent = () => {
  const [group, setGroup] = useState(null)
  const {isOpen, open, close} = useDisclosure()
  const {register, handleSubmit} = useForm()
  const {data: groups, isLoading, isError, error} = useFetch('/groups')
  const create = useMutate<Pick<PyGridUserGroup, 'name'>, PyGridUserGroup>({url: '/groups', invalidate: '/groups'})
  const deleteGroup = useMutate({url: `/groups/${group?.id}`, method: 'delete', invalidate: '/groups'})
  const editGroup = useMutate<Partial<PyGridUserGroup>, PyGridUserGroup>({
    url: `groups/${group?.id}`,
    method: 'delete',
    invalidate: '/groups'
  })

  const closePanel = () => {
    close()
    create.reset()
    editGroup.reset()
    deleteGroup.reset()
  }

  const submit = values => {
    create.mutate(values as Pick<PyGridUserGroup, 'name'>, {onSuccess: close})
  }

  const edit = values => {
    editGroup.mutate(values as Partial<PyGridUserGroup>, {onSuccess: () => setGroup(null)})
  }

  const remove = () => {
    deleteGroup.mutate(null, {onSuccess: () => setGroup(null)})
  }

  return (
    <article>
      <header>
        <h1>User groups</h1>
        <p className="subtitle">Manage all user groups permissions</p>
      </header>
      <section className="mt-6 overflow-hidden bg-white shadow sm:rounded-md">
        <header>
          <div className="flex items-center justify-between px-4 py-4 text-xs font-medium tracking-wider text-gray-500 uppercase bg-gray-100 border-b border-gray-200 sm:px-6">
            <div className="flex flex-col sm:flex-row">
              <h2 className="flex-shrink-0 mr-2">User groups</h2>
              <div className="flex-shrink-0">
                {groups?.length > 0 && (
                  <p>
                    ({groups.length} group{groups.length > 1 && 's'})
                  </p>
                )}
                {isLoading && <Spinner className="w-4" />}
              </div>
            </div>
            <div className="text-right">
              <button className="btn" onClick={open}>
                <span className="hidden sm:inline-block">Add Group</span>
                <span className="sm:hidden">Add</span>
              </button>
            </div>
          </div>
        </header>
        <ul className="divide-y divide-gray-200">
          {groups?.map((group: PyGridUserGroup) => (
            <GroupListItem
              key={group.id}
              name={group.name}
              avatars={take(
                group.users.map(
                  ({email}) => `https://www.avatarapi.com/js.aspx?email=${email.trim().toLowerCase()}&size=128`
                ),
                4
              )}
              onClick={() => setGroup(group)}
            />
          ))}
        </ul>
      </section>
      {!isLoading && isError && (
        <div className="mt-4">
          <VisuallyHidden>An error occurred.</VisuallyHidden>
          <Alert
            error="It was not possible to get the list of user groups. Please check if the Domain API is reachable."
            description={error.message ?? 'Check your connection status'}
          />
        </div>
      )}
      <SidePanel isOpen={isOpen} close={closePanel}>
        <article className="p-4 pr-8 space-y-6">
          <section>
            <header>
              <h3 className="text-2xl font-medium text-gray-900 leading-6">Create a new group</h3>
              <p className="mt-2 text-sm text-gray-500">Add a name for the group.</p>
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
      <SidePanel isOpen={Boolean(group)} close={() => setGroup(null)}>
        <article className="p-4 pr-8 space-y-6">
          <section>
            <header>
              <h3 className="text-2xl font-medium text-gray-900 leading-6">Modify an existing group</h3>
              <p className="mt-2 text-sm text-gray-500">Change its name and purge users from the group.</p>
            </header>
          </section>
          <form onSubmit={handleSubmit(submit)}>
            <section className="flex flex-col space-y-4">
              <Input name="name" label="User Group" ref={register} defaultValue={group?.name} />
              <p className="text-sm text-gray-400">Users in this group:</p>
              <div className="flex flex-col text-right lg:flex-row-reverse">
                <button
                  className="lg:ml-4 btn transition-all ease-in-out duration-700"
                  disabled={editGroup.isLoading}
                  onClick={edit}>
                  {create.isLoading ? <Spinner className="w-4 text-white" /> : 'Edit'}
                </button>
                <button
                  className="mt-4 font-normal text-red-600 bg-white shadow-none lg:mt-0 btn transition-all ease-in-out duration-700 hover:bg-red-400 hover:text-white active:bg-red-700"
                  disabled={deleteGroup.isLoading}
                  type="button"
                  onClick={remove}>
                  {create.isLoading ? <Spinner className="w-4 text-white" /> : 'Delete'}
                </button>
              </div>
              {editGroup.isError && (
                <div>
                  <Alert error="There was an error creating the user" description={editGroup.error.message} />
                </div>
              )}
            </section>
          </form>
        </article>
      </SidePanel>
      {create.isSuccess && (
        <Notification>
          <p>Group successfully {group ? 'created' : 'modified'}</p>
        </Notification>
      )}{' '}
      {editGroup.isSuccess && (
        <Notification title="Successfully saved!">
          <p>Role successfully edited</p>
        </Notification>
      )}
      {deleteGroup.isSuccess && (
        <Notification title="Successfully removed!" Icon={<Ban className="text-red-700 w-5" />}>
          <p>Role successfully delete</p>
        </Notification>
      )}
    </article>
  )
}

export default UserGroups
