import type {FunctionComponent} from 'react'
import {Card} from '@/components/lib'
import {XMark} from '@/components/icons/marks'

// TODO: update types all over this file
// TODO: check tensors with Ionesio

const UserRequestingUI: FunctionComponent<{
  userAvatarURL: string
  userName: string
  userId: string | number
  downloadedAt: string
}> = ({userAvatarURL, userId, userName, downloadedAt}) => (
  <div className="flex flex-row items-center font-thin text-gray-400">
    <img className="inline w-6 h-6 mr-2 rounded-full" alt="" src={userAvatarURL} />
    <strong>
      {/* TODO: Change to a modal view here instead of linking to the profile in full */}
      <a href={`/users/u/${userId}`} target="blank">
        {userName}
      </a>{' '}
      downloaded this tensor <span className="text-gray-800">{downloadedAt} ago</span>
    </strong>
  </div>
)

export const TensorsCard: FunctionComponent<{
  id: string
  userAvatarURL: string
  userName: string
  userId: string | number
  tags: string[]
  downloadedAt: string
  description: string
  // TODO: Check the type in domain
  // tensorInformation: {
  //   downloadedAt: string
  //   tensors: Array<string>
  //   dataset: string
  //   epsilonUsed: number
  // }
  onDelete: (string) => void
}> = ({
  id,
  description,
  userAvatarURL,
  downloadedAt,
  userName,
  userId,
  tags,
  // tensorInformation,
  onDelete
}) => {
  const daysUntilDeletion = '8 days'
  return (
    <Card className="flex flex-col font-light md:flex-row md:space-x-2 flex-nowrap">
      <div className="w-full">
        <UserRequestingUI
          userAvatarURL={userAvatarURL}
          userName={userName}
          userId={userId}
          downloadedAt={downloadedAt}
        />
        <div className="flex flex-col my-2 text-gray-800">
          <span>
            <strong>Tensor ID</strong>: <span className="text-gray-400">{id}</span>
          </span>
          <span>
            <strong>Description</strong>: <span className="text-gray-400">{description}</span>
          </span>
          {/* <span>
              <strong>Tensors</strong>: <span className="text-gray-400">
                {tensorInformation.tensors.join(', ')}
              </span>
            </span>
            <span>
              <strong>Dataset</strong>: <span className="text-gray-400">
                {tensorInformation.dataset}
              </span>
            </span> */}
          <div className="flex flex-col justify-between text-sm text-gray-600 md:flex-row">
            <small>{tags.map(tag => `#${tag} `)}</small>
          </div>
          {/* <span>
            <strong>Epsilon used to create</strong>:{' '}
            <span className="text-gray-400">
              {tensorInformation.epsilonUsed} units
              </span>
          </span> */}
        </div>
      </div>
      <div className="self-end flex-shrink-0 text-gray-400 md:self-center">
        scheduled to delete in {daysUntilDeletion}
        <button className="w-4 mx-2 text-red-500 bg-transparent" onClick={onDelete} aria-label="Delete this tensor">
          <XMark />
        </button>
      </div>
    </Card>
  )
}
