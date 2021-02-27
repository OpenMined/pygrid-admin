import React from 'react'
import Modal from '../../index'

const CreateUserModal = ({isOpen, onClose, onConfirm}) => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [role, setRole] = React.useState('User')

  const isValid = () => {
    return email !== '' && password !== ''
  }

  const handleSubmit = () => {
    const user = {email, password, role}
  }

  const Footer = () => (
    <>
      <button
        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-3 mb-1"
        type="button"
        style={{transition: 'all .15s ease'}}
        onClick={onClose}>
        Cancel
      </button>
      <button
        className="bg-green-500 text-white active:bg-green-600 disabled:opacity-50 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
        type="button"
        style={{transition: 'all .15s ease'}}
        onClick={handleSubmit}>
        Create
      </button>
    </>
  )

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} header="Create User" footer={<Footer />}>
        <form autoComplete="off" className="m-5">
          <div>
            <label htmlFor="email" className="text-sm block font-bold  pb-2">
              EMAIL ADDRESS
            </label>
            <input
              type="text"
              name="email"
              id="user_email"
              autoComplete="off"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300 "
              placeholder="user@email.com"
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="mt-5">
            <label htmlFor="password" className="text-sm block font-bold pb-2">
              PASSWORD
            </label>
            <input
              type="password"
              name="password"
              id="user_password"
              autoComplete="off"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300"
              placeholder="Enter your password"
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="mt-5">
            <label htmlFor="role" className="text-sm block font-bold pb-2">
              ROLE
            </label>
            {/* eslint-disable-next-line jsx-a11y/no-onchange */}
            <select
              name="role"
              id="user_role"
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300"
              value={role}
              onChange={e => setRole(e.target.value)}>
              <option value="User">User</option>
              <option value="Compliance Officer">Compliance Officer</option>
              <option value="Administrator">Administrator</option>
              <option value="Owner">Owner</option>
            </select>
          </div>
        </form>
      </Modal>
    </>
  )
}

export default CreateUserModal