import {FunctionComponent, MouseEventHandler, useState} from 'react'
import Link from 'next/link'
import {Card, ButtonAsLink, ButtonAsIcon} from '@/components/lib'
import {CheckMark, XMark} from '@/components/icons/marks'
import {User} from '@/components/icons/user'
import {IAssociationRequest} from '@/types/infrastructure'
import Dialog from '@reach/dialog'

interface AssociationRequestProperties extends IAssociationRequest {
  onClickAccept: MouseEventHandler<HTMLButtonElement>
  onClickReject: MouseEventHandler<HTMLButtonElement>
}

const dateFormat = date =>
  date.getUTCFullYear() +
  '/' +
  (date.getUTCMonth() + 1) +
  '/' +
  date.getUTCDate() +
  ' ' +
  date.getUTCHours() +
  ':' +
  date.getUTCMinutes() +
  ':' +
  date.getUTCSeconds()

const ExpandRequestModal = ({isOpen, onClose, request, onClickAccept, onClickReject}) => (
  <Dialog
    isOpen={isOpen}
    onDismiss={onClose}
    className="relative w-auto my-6 mx-auto max-w-md border-b border-solid border-gray-300 rounded-t shadow-lg">
    <div className="flex items-start justify-between">
      <h3 className="text-3xl font-semibold">Association Request</h3>

      <button
        className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
        onClick={onClose}>
        <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
      </button>
    </div>
    <span className="max-w-lg font-light text-gray-400 xl:max-w-5xl">
      Request #{request.id} - {dateFormat(new Date(request.date))}
    </span>
    <div className="my-4">
      <div>
        <strong>Name</strong>: <span className="text-gray-400">{request.name}</span>
      </div>
      <div>
        <strong>Address</strong>: <span className="text-gray-400">{request.address}</span>
      </div>
      <div>
        <strong>Sender Address</strong>: <span className="text-gray-400">{request.senderAddress}</span>
      </div>
      <div>
        <strong>Accepted</strong>: <span className="text-gray-400">{request.accepted.toString()}</span>
      </div>
      <div>
        <strong>Pending</strong>: <span className="text-gray-400">{request.pending.toString()}</span>
      </div>
    </div>
    <div className="flex items-center justify-end pt-6 border-t border-solid border-gray-300 rounded-b">
      <button
        type="button"
        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm rounded-md outline-none focus:outline-none mr-3 mb-1"
        onClick={() => {
          onClickReject()
          onClose()
        }}>
        Deny
      </button>
      <button
        type="button"
        className="bg-green-500 text-white active:bg-green-600 disabled:opacity-50 font-bold uppercase text-sm px-6 py-3 rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
        onClick={() => {
          onClickAccept()
          onClose()
        }}>
        Accept
      </button>
    </div>
  </Dialog>
)

export const AssociationRequestCard: FunctionComponent<AssociationRequestProperties> = ({
  onClickAccept,
  onClickReject,
  ...request
}) => {
  const {id, date, name, address, sender_address, accepted, pending, handshake_value} = request

  const [openRequestModal, setOpenRequestModal] = useState(false)

  return (
    <Card className="flex flex-col font-light md:flex-row md:space-x-2 flex-nowrap">
      <div className="w-full">
        {/* <UserRequestingUI userEmail={userEmail} userId={userId} retrieving={retrieving} /> */}
        <div className="flex flex-col text-gray-800">
          <span className="max-w-lg font-light text-gray-400 xl:max-w-5xl">
            Request #{id} - {dateFormat(new Date(date))}
          </span>
          <div>
            <strong>Name</strong>: <span className="text-gray-400">{name}</span>
          </div>
          <div>
            <strong>Address</strong>: <span className="text-gray-400">{address}</span>
          </div>
          <span>
            <ButtonAsLink aria-label="View request details" onClick={() => setOpenRequestModal(true)}>
              Details...
            </ButtonAsLink>
          </span>
        </div>
      </div>
      <div className="self-end flex-shrink-0 text-gray-400 self-center flex-row flex space-x-6">
        <div className="flex flex-col m-auto">
          <ButtonAsIcon onClick={onClickAccept}>
            <CheckMark className="w-6 h-6 text-green-500" />
          </ButtonAsIcon>
        </div>
        <div className="flex flex-col m-auto">
          <ButtonAsIcon onClick={onClickReject}>
            <XMark className="w-6 h-6 text-red-500" />
          </ButtonAsIcon>
        </div>
      </div>
      <ExpandRequestModal
        isOpen={openRequestModal}
        request={request}
        onClickAccept={onClickAccept}
        onClickReject={onClickReject}
        onClose={() => setOpenRequestModal(false)}
      />
    </Card>
  )
}
