import type {FunctionComponent, MouseEventHandler} from 'react'
import Link from 'next/link'
import {Card, ButtonAsLink, ButtonAsIcon} from '@/components/lib'
import {CheckMark, XMark} from '@/components/icons/marks'
import {User} from '@/components/icons/user'
// TODO: check permissions with Ionesio
// TODO: check budget logic with Ionesio

interface PermissionRequestProperties {
  userEmail: string
  userId: string | number
  retrieving: string
  tensors: string
  dataset: string
  onClickReason: MouseEventHandler<HTMLButtonElement>
  onClickAccept: MouseEventHandler<HTMLButtonElement>
  onClickReject: MouseEventHandler<HTMLButtonElement>
}

interface UserRequestingProps {
  userEmail: string
  userId: string | number
  retrieving: string
}

const UserRequestingUI: FunctionComponent<UserRequestingProps> = ({userId, userEmail, retrieving}) => (
  <div className="flex flex-row items-center">
    <User className="inline w-6 h-6 mr-2 rounded-full" />
    <span>
      {/* TODO: Change to a modal view here instead of linking to the profile in full */}
      <Link href={`/users/u/${userId}`}>{userEmail}</Link> wants to retrieve{' '}
      <Link href={`/datasets/tensors/t/${retrieving}`}>{retrieving}</Link>
    </span>
  </div>
)

export const PermissionRequestCard: FunctionComponent<PermissionRequestProperties> = ({
  userEmail,
  userId,
  retrieving,
  tensors,
  dataset,
  onClickReason,
  onClickAccept,
  onClickReject
}) => (
  <Card className="flex flex-col font-light md:flex-row md:space-x-2 flex-nowrap">
    <div className="w-full">
      <UserRequestingUI userEmail={userEmail} userId={userId} retrieving={retrieving} />
      <div className="flex flex-col my-2 text-gray-800">
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
  </Card>
)
