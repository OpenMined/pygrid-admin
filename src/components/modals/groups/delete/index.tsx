import {FunctionComponent} from 'react'
import Router from 'next/router'
import {deleteGroup} from '@/pages/api/groups'
import {Modal} from '../../modal'

interface IDeleteGroupModalProps {
  id: string
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

const DeleteGroupModal: FunctionComponent<IDeleteGroupModalProps> = ({id, isOpen, onClose, onConfirm}) => {
  const handleSubmit = () => {
    deleteGroup({id}).then(res => {
      onConfirm()
      console.log(res)
      Router.push('/users/groups')
    })
  }

  const Footer = () => (
    <>
      <button
        type="button"
        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm rounded-md outline-none focus:outline-none mr-3 mb-1"
        onClick={onClose}>
        Cancel
      </button>
      <button
        type="button"
        className="bg-red-500 text-white active:bg-red-600 disabled:opacity-50 font-bold uppercase text-sm px-6 py-3 rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
        onClick={handleSubmit}>
        Delete
      </button>
    </>
  )
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} header="Delete Group" footer={<Footer />}>
        <p className="py-4 text-lg">Are you sure you want to delete this group? </p>
      </Modal>
    </>
  )
}

export {DeleteGroupModal}
