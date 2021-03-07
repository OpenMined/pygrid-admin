import {ButtonRound} from '@/components/lib'
import {editGroup} from '@/pages/api/groups'
import Router from 'next/router'
import {FunctionComponent, useState} from 'react'
import {Modal} from '../../modal'

interface IEditGroupModal {
  id: string
  name: string
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

const EditGroupModal: FunctionComponent<IEditGroupModal> = ({id, isOpen, onClose, onConfirm, ...group}) => {
  const [name, setName] = useState(group.name)

  const isValid = () => {
    return name !== ''
  }

  const handleSubmit = () => {
    const group = {id, name}

    editGroup(group).then(() => {
      onConfirm()
      Router.push('/users/groups')
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

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} header="Edit Group Group" footer={<Footer />}>
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
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
        </form>
      </Modal>
    </>
  )
}

export {EditGroupModal}
