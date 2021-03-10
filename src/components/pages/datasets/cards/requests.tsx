import type {FunctionComponent, MouseEventHandler} from 'react'
import {Card, ButtonAsLink, ButtonAsIcon} from '@/components/lib'
import {Check} from '@/components/icons/check'
import {Close} from '@/components/icons/close'

// TODO: check permissions with Ionesio
// TODO: check budget logic with Ionesio

interface PermissionRequestProperties {
  userAvatarURL: string
  userName: string
  userId: string | number
  retrieving: string
  tensors: string
  dataset: string
  onClickReason: MouseEventHandler<HTMLButtonElement>
  onClickAccept: MouseEventHandler<HTMLButtonElement>
  onClickReject: MouseEventHandler<HTMLButtonElement>
}

interface BudgetChangesProperties {
  userAvatarURL: string
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
  userAvatarURL: string
  userName: string
  userId: string | number
  retrieving: string
}

const UserRequestingUI: FunctionComponent<UserRquestingProps> = ({userAvatarURL, userId, userName, retrieving}) => (
  <div className="flex flex-row items-center">
    <img className="inline w-6 h-6 mr-2 rounded-full" alt="" src={userAvatarURL} />
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
  userAvatarURL,
  userName,
  userId,
  retrieving,
  tensors,
  dataset,
  onClickReason,
  onClickAccept,
  onClickReject
}) => (
  <Card>
    <UserRequestingUI userAvatarURL={userAvatarURL} userName={userName} userId={userId} retrieving={retrieving} />
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
          <ButtonAsLink aria-label="View permission request reason" onClick={onClickReason}>
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

export const BudgetChangesCard: FunctionComponent<BudgetChangesProperties> = ({
  userAvatarURL,
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
      <UserRequestingUI userAvatarURL={userAvatarURL} userName={userName} userId={userId} retrieving={retrieving} />
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
