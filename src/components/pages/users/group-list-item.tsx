import type {FunctionComponent} from 'react'
import cn from 'classnames'
import {Right} from '@/components/icons/arrows'
import {MissingUserAvatar} from '@/components/icons/user'

const GroupListItem: FunctionComponent<{name: string; avatars: Array<string>; onClick: () => void}> = ({
  name,
  avatars,
  onClick
}) => {
  return (
    <li>
      <button className="block w-full hover:bg-gray-50" onClick={onClick}>
        <div className="flex items-center px-4 py-4 sm:px-6">
          <div className="flex-1 min-w-0 sm:flex sm:items-center sm:justify-between">
            <div className="flex flex-row truncate">
              <img className="w-8 h-8" src="/assets/logo.png" alt="" aria-hidden />
              <div className="self-center flex-1 min-w-0 px-4 md:grid md:grid-cols-2 md:gap-4">
                <div className="text-left">
                  <p className="text-sm font-medium text-indigo-600 truncate">{name}</p>
                </div>
              </div>
            </div>
            {avatars?.length > 0 && (
              <div className="flex-shrink-0 mt-4 sm:mt-0 sm:ml-5">
                <div className="flex overflow-hidden">
                  {avatars.map((avatar, index) =>
                    avatar ? (
                      <img
                        className={cn('inline-block w-6 h-6 rounded-full ring-2 ring-white', index && '-ml-1')}
                        src={avatar}
                        alt=""
                      />
                    ) : (
                      <MissingUserAvatar
                        className={cn('w-6 h-6 text-gray-600 rounded-full bg-gray-50', index && '-ml-1')}
                      />
                    )
                  )}
                </div>
              </div>
            )}
          </div>
          <Right className="w-5 h-5 text-gray-400" />
        </div>
      </button>
    </li>
  )
}

export {GroupListItem}
