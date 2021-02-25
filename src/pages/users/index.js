import React from 'react'
import Modal from '../../components/modals'

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
      <Modal
        isOpen={openCreateUserModal}
        onClose={() => setOpenCreateUserModal(false)}
        onConfirm={() => setOpenCreateUserModal(false)}>
        <p className="my-4 text-gray-600 text-lg leading-relaxed">
          I always felt like I could do anything. That’s the main thing people are controlled by! Thoughts- their
          perception of themselves! slowed down by their perception of themselves. If taught you can’t do anything, you
          won’t do anything. I was taught I could do everything.
        </p>
      </Modal>
    </>
  )
}

export default Users
