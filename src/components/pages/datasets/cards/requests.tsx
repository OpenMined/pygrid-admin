import {FunctionComponent, MouseEventHandler, useState} from 'react'
import Dialog from '@reach/dialog'
import {Card, ButtonAsLink, ButtonAsIcon} from '@/components/lib'
import {Check} from '@/components/icons/check'
import {Close} from '@/components/icons/close'
import {User} from '@/components/icons/user'
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

interface BudgetChangesProperties {
  userName: string
  userId: string | number
  retrieving: string
  epsilonCurrent: number
  epsilonAfterChange: number
  onClickReason: MouseEventHandler<HTMLButtonElement>
  onClickAccept: MouseEventHandler<HTMLButtonElement>
  onClickReject: MouseEventHandler<HTMLButtonElement>
}

interface UserRquestingProps {
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
        className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
        onClick={onClose}>
        <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
      </button>
    </div>
    <div>
      <p className="py-4 text-lg">{reason}</p>
    </div>
    <div className="flex items-center justify-end pt-6 border-t border-solid border-gray-300 rounded-b">
      <button
        type="button"
        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm rounded-md outline-none focus:outline-none mr-3 mb-1"
        onClick={() => {
          onClickReject()
          onClose()
        }}>
        Reject
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

const UserRequestingUI: FunctionComponent<UserRquestingProps> = ({userId, userName, retrieving}) => (
  <div className="flex flex-row items-center">
    <User className="inline w-6 h-6 mr-2 rounded-full" />
    <span>
      {/* TODO: Change to a modal view here instead of linking to the profile in full */}
      <a href={`/users/u/${userId}`} target="blank">
        {userName}
      </a>{' '}
      wants to retrieve <a href={`/datasets/tensors/t/${retrieving}`}>{retrieving}</a>
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
    <Card>
      <UserRequestingUI userName={userName} userId={userId} retrieving={retrieving} />
      <div className="flex flex-row pr-4 mt-4 relative">
        <div className="flex flex-col font-light text-gray-800">
          <div>
            <strong>Tensors</strong>: <span className="text-gray-400">{tensors}</span>
          </div>
          <div>
            <strong>Dataset</strong>: <span className="text-gray-400">{dataset}</span>
          </div>
          <span>
            <strong>Reason</strong>:{' '}
            <ButtonAsLink
              aria-label="View permission request reason"
              onClick={() => {
                setOpenReasonModal(true)
              }}>
              Click to view
            </ButtonAsLink>
          </span>
        </div>
        <div className="flex flex-row space-x-6 pr-3 absolute right-0">
          <div className="flex flex-col m-auto">
            <ButtonAsIcon onClick={onClickAccept}>
              <Check className="w-6 h-6 text-green-500" />
            </ButtonAsIcon>
          </div>
          <div className="flex flex-col m-auto">
            <ButtonAsIcon onClick={onClickReject}>
              <Close className="w-5 h-5 text-red-500" />
            </ButtonAsIcon>
          </div>
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

export const BudgetChangesCard: FunctionComponent<BudgetChangesProperties> = ({
  userName,
  userId,
  retrieving,
  epsilonCurrent,
  epsilonAfterChange,
  onClickReason,
  onClickAccept,
  onClickReject
}) => {
  const increase = Math.round(((epsilonAfterChange - epsilonCurrent) / epsilonCurrent) * 100)

  return (
    <Card>
      <UserRequestingUI userName={userName} userId={userId} retrieving={retrieving} />
      <div className="flex flex-row pr-4 mt-4 relative">
        <div className="flex flex-col font-light text-gray-800">
          <div>
            <strong>Current epsilon</strong>: <span className="text-gray-400">{epsilonCurrent} units</span>
          </div>
          <div>
            <strong>Epsilon after change</strong>:{' '}
            <span className="text-gray-400">
              {epsilonAfterChange} units {epsilonCurrent > 0 && `(${increase}% increase)`}
            </span>
          </div>
          <span>
            <strong>Reason</strong>:{' '}
            <ButtonAsLink onClick={onClickReason} aria-label="View budget request reason">
              Click to view
            </ButtonAsLink>
          </span>
        </div>
        <div className="flex flex-row space-x-6 pr-3 absolute right-0">
          <div className="flex flex-col m-auto">
            <ButtonAsIcon onClick={onClickAccept}>
              <Check className="w-6 h-6 text-green-500" />
            </ButtonAsIcon>
          </div>
          <div className="flex flex-col m-auto">
            <ButtonAsIcon onClick={onClickReject}>
              <Close className="w-5 h-5 text-red-500" />
            </ButtonAsIcon>
          </div>
        </div>
      </div>
    </Card>
  )
}
