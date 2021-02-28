import type {FunctionComponent} from 'react'
import {Card} from '@/components/lib'

import {IUser} from '@/types/users'

const UserCard: FunctionComponent<IUser> = ({email, id, role}) => (
  <Card className="space-y-2 cursor-pointer">
    <span className="max-w-lg font-light text-gray-400 xl:max-w-5xl">
      ID: {id} - Role: {role}{' '}
    </span>
    <h2 className="text-xl text-gray-800 text-semibold">{email}</h2>
  </Card>
)

export {UserCard}
