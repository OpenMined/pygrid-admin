import {FunctionComponent, MouseEventHandler, useState} from 'react'
import Dialog from '@reach/dialog'
import Link from 'next/link'
import {Card, ButtonAsLink, ButtonAsIcon} from '@/components/lib'
import {CheckMark, XMark} from '@/components/icons/marks'
import {MissingUserAvatar} from '@/components/icons/user'
import '@reach/dialog/styles.css'

// TODO: check permissions with Ionesio
// TODO: check budget logic with Ionesio

interface PermissionRequestProperties {
  userName: string
  userId: string | number
  retrieving: string
  tensors: string
  dataset: string
  reason: string
  onClickAccept: MouseEventHandler<HTMLButtonElement>
  onClickReject: MouseEventHandler<HTMLButtonElement>
}

interface UserRequestingProps {
  userName: string
  userId: string | number
  retrieving: string
}

interface UserRequestingProps {
  userName: string
  userId: string | number
  retrieving: string
}

const RequestReasonModal = ({isOpen, onClose, reason, onClickAccept, onClickReject}) => (
  <Dialog
    isOpen={isOpen}
    onDismiss={onClose}
    className="relative w-auto my-6 mx-auto max-w-md border-b border-solid border-gray-300 rounded-t shadow-lg">
    <div className="flex items-start justify-between">
      <h3 className="text-3xl font-semibold">Request reason</h3>
      <button
        className="float-right p-1 ml-auto text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none focus:outline-none"
        onClick={onClose}>
        <span className="block w-6 h-6 text-2xl text-black bg-transparent outline-none focus:outline-none">×</span>
      </button>
    </div>
    <div>
      <p className="py-4 text-lg">{reason}</p>
    </div>
    <div className="flex items-center justify-end pt-6 border-t border-gray-300 border-solid rounded-b">
      <button
        type="button"
        className="px-6 py-2 mb-1 mr-3 text-sm font-bold text-red-500 uppercase outline-none background-transparent rounded-md focus:outline-none"
        onClick={() => {
          onClickReject()
          onClose()
        }}>
        Reject
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

const UserRequestingUI: FunctionComponent<UserRequestingProps> = ({userId, userName, retrieving}) => (
  <div className="flex flex-row items-center">
    <MissingUserAvatar className="inline w-6 h-6 mr-2 rounded-full" />
    <span>
      {/* TODO: Change to a modal view here instead of linking to the profile in full */}
      <Link href={`/users/u/${userId}`}>{userName}</Link> wants to retrieve{' '}
      <Link href={`/datasets/tensors/t/${retrieving}`}>{retrieving}</Link>
    </span>
  </div>
)

export const PermissionRequestCard: FunctionComponent<PermissionRequestProperties> = ({
  userName,
  userId,
  retrieving,
  reason,
  tensors,
  dataset,
  onClickAccept,
  onClickReject
}) => {
  const [openReasonModal, setOpenReasonModal] = useState(false)

  return (
    <Card className="flex flex-col font-light md:flex-row md:space-x-2 flex-nowrap">
      <div className="w-full">
        <UserRequestingUI userName={userName} userId={userId} retrieving={retrieving} />
        <div className="flex flex-col my-2 text-gray-800">
          <div>
            <strong>Tensors</strong>: <span className="text-gray-400">{tensors}</span>
          </div>
          <div>
            <strong>Dataset</strong>: <span className="text-gray-400">{dataset}</span>
          </div>
          <span>
            <strong>Reason</strong>:{' '}
            <ButtonAsLink aria-label="View permission request reason" onClick={() => setOpenReasonModal(true)}>
              Click to view
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
      <RequestReasonModal
        isOpen={openReasonModal}
        reason={reason}
        onClickAccept={onClickAccept}
        onClickReject={onClickReject}
        onClose={() => setOpenReasonModal(false)}
      />
    </Card>
  )
}
