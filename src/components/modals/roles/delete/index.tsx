import {FunctionComponent} from 'react'
import Router from 'next/router'
import {deleteRole} from '@/pages/api/roles'
import {Modal} from '../../modal'

interface IDeleteRoleModalProps {
  id: string
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

const DeleteRoleModal: FunctionComponent<IDeleteRoleModalProps> = ({id, isOpen, onClose, onConfirm}) => {
  const handleSubmit = () => {
    deleteRole({id}).then(res => {
      onConfirm()
      console.log(res)
      Router.push('/users/roles')
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
      <Modal isOpen={isOpen} onClose={onClose} header="Delete Role" footer={<Footer />}>
        <p className="py-4 text-lg">Are you sure you want to delete this role? </p>
      </Modal>
    </>
  )
}

export {DeleteRoleModal}
