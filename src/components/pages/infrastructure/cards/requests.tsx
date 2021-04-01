import {FunctionComponent, MouseEventHandler, useState} from 'react'
import {Card, ButtonAsLink, ButtonAsIcon} from '@/components/lib'
import {CheckMark, XMark} from '@/components/icons/marks'
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
        className="float-right p-1 ml-auto text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none focus:outline-none"
        onClick={onClose}>
        <span className="block w-6 h-6 text-2xl text-black bg-transparent outline-none focus:outline-none">×</span>
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
    <div className="flex items-center justify-end pt-6 border-t border-gray-300 border-solid rounded-b">
      <button
        type="button"
        className="px-6 py-2 mb-1 mr-3 text-sm font-bold text-red-500 uppercase outline-none background-transparent rounded-md focus:outline-none"
        onClick={() => {
          onClickReject()
          onClose()
        }}>
        Deny
      </button>
      <button
        type="button"
        className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase bg-green-500 shadow outline-none active:bg-green-600 disabled:opacity-50 rounded-md hover:shadow-lg focus:outline-none"
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
  // sender_address, accepted, pending, handshake_value
  const {id, date, name, address} = request

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
      <div className="flex flex-row self-center self-end flex-shrink-0 text-gray-400 space-x-6">
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
