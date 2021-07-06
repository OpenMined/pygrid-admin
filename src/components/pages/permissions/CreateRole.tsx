import {useCallback, useState} from 'react'
import {useForm} from 'react-hook-form'
import {Input, NormalButton, ToggleablePermissionsList} from '@/components'
import {gridPermissions} from '@/utils'
import {useRoles} from '@/lib/data/useMe'
import type {Role} from '@/types/grid-types'

const getBlankRole = () => ({
  ...Object.keys(gridPermissions)
    .map(permission => ({permission}))
    .reduce((prev, curr) => {
      prev[curr.permission] = false
      return prev
    }, {}),
  name: ''
})

export function CreateRole({onClose}: {onClose: () => void}) {
  const [newRole, setNewRole] = useState<Partial<Role>>(getBlankRole)

  const {create} = useRoles()
  const mutation = create()

  const {
    register,
    handleSubmit,
    formState: {errors, isValid}
  } = useForm({mode: 'onTouched'})

  const onSubmit = ({name}) => {
    mutation.mutate({...newRole, name}, {onSuccess: onClose})
  }

  const changePermission = useCallback(
    (permission, enabled) => setNewRole(role => ({...role, [permission]: enabled})),
    []
  )

  return (
    <div className="bg-blueGray-200 rounded-md p-8 space-y-6">
      <header className="space-y-2 max-w-xl">
        <h2 className="text-xl font-medium">Create a new role</h2>
        <p>Combine the permissions for creating a new role for your Domain.</p>
      </header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <ToggleablePermissionsList
            onChange={(permission, enabled) => changePermission(permission, enabled)}
            id="create-new-role"
            defaultPermissions={newRole}
          />
          <div className="max-w-md">
            <Input
              id="create-role-name"
              label="Role Name"
              name="name"
              ref={register}
              error={errors?.name}
              required
              placeholder="Role names are unique"
            />
          </div>
          <NormalButton
            className="mr-4 w-24 flex-shrink-0 mt-auto bg-gray-700 text-gray-50 bg-opacity-80 hover:bg-opacity-100"
            disabled={!isValid || mutation.isLoading}
            isLoading={mutation.isLoading}>
            Submit
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
