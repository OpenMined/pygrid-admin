import React from 'react'
import CreateUserModal from '../../components/modals/users/create/index'

const Users = () => {
  const [openCreateUserModal, setOpenCreateUserModal] = React.useState(false)

  return (
    <>
      <button
        className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
        type="button"
        style={{transition: 'all .15s ease'}}
        onClick={() => setOpenCreateUserModal(true)}>
        Create User
      </button>
      <CreateUserModal
        isOpen={openCreateUserModal}
        onClose={() => setOpenCreateUserModal(false)}
        onConfirm={() => setOpenCreateUserModal(false)}
      />
    </>
  )
}

export default Users
