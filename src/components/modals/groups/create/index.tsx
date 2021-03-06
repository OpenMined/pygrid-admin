import {createGroup} from '@/pages/api/groups'
import {FunctionComponent, useState} from 'react'
import {Modal} from '../../modal'

interface ICreateGroupModal {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

const CreateGroupModal: FunctionComponent<ICreateGroupModal> = ({isOpen, onClose, onConfirm}) => {
  const [name, setName] = useState('')

  const isValid = () => {
    return name !== ''
  }

  const handleSubmit = () => {
    const group = {name}

    createGroup(group).then(() => {
      onConfirm()
    })
  }

  const Footer = () => (
    <>
      <button
        type="button"
        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-3 mb-1"
        onClick={onClose}>
        Cancel
      </button>
      <button
        type="button"
        disabled={!isValid()}
        className="bg-green-500 text-white active:bg-green-600 disabled:opacity-50 font-bold uppercase text-sm px-6 py-3 shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
        onClick={handleSubmit}>
        Create
      </button>
    </>
  )

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} header="Create Group" footer={<Footer />}>
        <form autoComplete="off" className="m-5">
          <div className="mt-5">
            <label htmlFor="name" className="text-sm block font-bold pb-2">
              GROUP NAME
            </label>
            <input
              type="text"
              name="name"
              id="group_name"
              autoComplete="off"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300"
              placeholder="Enter the group name"
              onChange={e => setName(e.target.value)}
            />
          </div>
        </form>
      </Modal>
    </>
  )
}

export {CreateGroupModal}
