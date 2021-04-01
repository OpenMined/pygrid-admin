import type {FunctionComponent} from 'react'
import {Right} from '@/components/icons/arrows'
import {MissingUserAvatar} from '@/components/icons/user'

const UserListItem: FunctionComponent<{avatar?: string; email: string; userRole: string; onClick: () => void}> = ({
  avatar,
  email,
  userRole,
  onClick
}) => {
  return (
    <li>
      <button className="block w-full hover:bg-gray-50" onClick={onClick}>
        <div className="flex items-center px-4 py-4 sm:px-6">
          <div className="flex items-center flex-1 min-w-0">
            <div className="flex-shrink-0 align-start">
              {avatar && <img className="object-cover object-center w-12 h-12 rounded-full" alt="" />}
              {!avatar && <MissingUserAvatar className="w-12 h-12 text-gray-600 rounded-full bg-gray-50" />}
            </div>
            <div className="flex-1 min-w-0 px-4 md:grid md:grid-cols-2 md:gap-4">
              <div className="text-left">
                <p className="text-sm font-medium text-indigo-600 truncate">{email}</p>
                <div className="tag">{userRole}</div>
              </div>
            </div>
          </div>
          <Right className="w-5 h-5 text-gray-400" />
        </div>
      </button>
    </li>
  )
}

export {UserListItem}
