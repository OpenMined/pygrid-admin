import {ButtonRound} from '@/components/lib'
import {toSentence} from '@/lib/utils'
import {createRole} from '@/pages/api/roles'
import {FunctionComponent, useState} from 'react'
import {Modal} from '../../modal'

interface ICreateRoleModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

const CreateRoleModal: FunctionComponent<ICreateRoleModalProps> = ({isOpen, onClose, onConfirm}) => {
  const [name, setName] = useState('')
  const [canTriageRequests, setCanTriageRequests] = useState(false)
  const [canEditSettings, setCanEditSettings] = useState(false)
  const [canCreateUsers, setCanCreateUsers] = useState(false)
  const [canCreateGroups, setCanCreateGroups] = useState(false)
  const [canEditRoles, setCanEditRoles] = useState(false)
  const [canManageInfrastructure, setCanManageInfrastructure] = useState(false)
  const [canUploadData, setCanUploadData] = useState(false)

  const isValid = () => {
    return name !== ''
  }

  const handleSubmit = () => {
    const role = {
      name,
      canTriageRequests,
      canEditSettings,
      canCreateUsers,
      canCreateGroups,
      canEditRoles,
      canManageInfrastructure,
      canUploadData
    }

    createRole(role).then(() => {
      onConfirm()
    })
  }

  const Footer = () => (
    <>
      <ButtonRound
        className="text-red-500 bg-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-3 mb-1"
        onClick={onClose}>
        Cancel
      </ButtonRound>
      <ButtonRound
        disabled={!isValid()}
        className="bg-green-500 text-white active:bg-green-600 disabled:opacity-50 font-bold uppercase text-sm px-6 py-3 shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
        onClick={handleSubmit}>
        Create
      </ButtonRound>
    </>
  )

  const permissions = [
    {id: 'canTriageRequests', value: canTriageRequests, setter: setCanTriageRequests},
    {id: 'canEditSettings', value: canEditSettings, setter: setCanEditSettings},
    {id: 'canCreateUsers', value: canCreateUsers, setter: setCanCreateUsers},
    {id: 'canCreateGroups', value: canCreateGroups, setter: setCanCreateGroups},
    {id: 'canEditRoles', value: canEditRoles, setter: setCanEditRoles},
    {id: 'canManageInfrastructure', value: canManageInfrastructure, setter: setCanManageInfrastructure},
    {id: 'canUploadData', value: canUploadData, setter: setCanUploadData}
  ]

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} header="Create Role" footer={<Footer />}>
        <form autoComplete="off" className="m-5">
          <div>
            <label htmlFor="name" className="text-sm block font-bold  pb-2">
              Role Name
            </label>
            <input
              type="text"
              name="name"
              id="user_name"
              autoComplete="off"
              className="shadow appearance-none border rounded w-full py-2 mb-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300 "
              placeholder="User"
              onChange={e => setName(e.target.value)}
            />
          </div>
          <span className="text-sm block font-bold">Permissions</span>
          {permissions.map(({id, value, setter}) => (
            <div key={id} className="mt-2">
              {/* eslint-disable-next-line jsx-a11y/no-onchange */}
              <input type="checkbox" name={id} id={id} checked={value} onClick={() => setter(!value)}></input>
              <label htmlFor={id} className="text-sm pl-2">
                {toSentence(id)}
              </label>
            </div>
          ))}
        </form>
      </Modal>
    </>
  )
}

export {CreateRoleModal}
