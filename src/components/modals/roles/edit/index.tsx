import {ButtonRound} from '@/components/lib'
import {toSentence} from '@/lib/utils'
import {editRole} from '@/pages/api/roles'
import {FunctionComponent, useState} from 'react'
import {Modal} from '../../modal'

interface IEditRoleModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  id: string
  name: string
  canTriageRequests: boolean
  canEditSettings: boolean
  canCreateUsers: boolean
  canCreateGroups: boolean
  canEditRoles: boolean
  canManageInfrastructure: boolean
  canUploadData: boolean
}

const EditRoleModal: FunctionComponent<IEditRoleModalProps> = ({id, isOpen, onClose, onConfirm, ...role}) => {
  const [name, setName] = useState(role.name)
  const [canTriageRequests, setCanTriageRequests] = useState(role.canTriageRequests)
  const [canEditSettings, setCanEditSettings] = useState(role.canEditSettings)
  const [canCreateUsers, setCanCreateUsers] = useState(role.canCreateUsers)
  const [canCreateGroups, setCanCreateGroups] = useState(role.canCreateGroups)
  const [canEditRoles, setCanEditRoles] = useState(role.canEditRoles)
  const [canManageInfrastructure, setCanManageInfrastructure] = useState(role.canManageInfrastructure)
  const [canUploadData, setCanUploadData] = useState(role.canUploadData)

  const isValid = () => {
    return name !== ''
  }

  const handleSubmit = () => {
    const role = {
      id,
      name,
      canTriageRequests,
      canEditSettings,
      canCreateUsers,
      canCreateGroups,
      canEditRoles,
      canManageInfrastructure,
      canUploadData
    }

    editRole(role).then(res => {
      onConfirm()
      console.log(res)
    })
  }

  const Footer = () => (
    <>
      <ButtonRound
        className="text-red-500 bg-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-3 mb-1"
        onClick={onClose}>
        Discard
      </ButtonRound>
      <ButtonRound
        disabled={!isValid()}
        className="bg-green-500 text-white active:bg-green-600 disabled:opacity-50 font-bold uppercase text-sm px-6 py-3 shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
        onClick={handleSubmit}>
        Save Changes
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
      <Modal isOpen={isOpen} onClose={onClose} header="Edit Role" footer={<Footer />}>
        <form autoComplete="off" className="m-5">
          <div>
            <label htmlFor="name" className="text-sm block font-bold  pb-2">
              Edit Role Name
            </label>
            <input
              type="text"
              name="name"
              id="user_name"
              autoComplete="off"
              className="shadow appearance-none border rounded w-full py-2 mb-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300 "
              placeholder="User"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <span className="text-sm block font-bold">Edit Permissions</span>
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

export {EditRoleModal}
